"use client";

/**
 * Escena 3D principal: Tierra + atmósfera real + ionosfera + aurora + rayos HF.
 * Ciclo de vida React: montaje único, actualizaciones por props, loop rAF.
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

import { getSunInfo } from "@/lib/iono/solar";
import { sampleGrid, GRID_W, GRID_H } from "@/lib/iono/ionomath";
import { buildLivePeakGrids, buildLiveVolume } from "@/lib/iono/profileGrid";
import { godraysPassState, mat4Mul, type Mat4 } from "@/lib/iono/godrays";
import { buildPngName, gridCsv } from "@/lib/iono/export";
import { computeLink, LinkResult } from "@/lib/iono/hf";
import {
  buildSliceGrid,
  resolveSliceEndpoints,
  sliceLabel,
  slicePositions,
  SLICE_SEG,
  SLICE_LVL,
} from "@/lib/iono/slice";
import {
  labelCulled,
  midnightLon,
  refAltitudes,
  refKey,
} from "@/lib/iono/refshells";
import {
  dipoleLinePoints,
  dynamicPressure,
  magnetoKey,
  magnetopauseMesh,
  shueRadius,
} from "@/lib/iono/magnetosphere";
import { cmeArrived, cmeEffectiveDp } from "@/lib/iono/cme";
import { flareState } from "@/lib/iono/flare";
import { bandColor } from "@/lib/iono/wspr";
import { greyRibbon, greylineLoop } from "@/lib/iono/greyline";
import {
  volumeModeIndex,
  volumeOpacityClamp,
} from "@/lib/iono/densityVolume";
import type { DensityVolume } from "@/lib/iono/densityVolume";
import { latLonToVec3, vec3ToLatLon } from "@/lib/iono/geo";
import { tourAdvance, tourEval } from "@/lib/iono/tour";

import {
  buildStars,
  buildEarth,
  buildAtmosphere,
  buildColormapTexture,
  buildIonShell,
  updateShellTextures,
  buildAurora,
  buildStations,
  buildLinkTube,
  buildRefShells,
  buildSunGlow,
  buildGodRaysPass,
  buildVolumeMesh,
  updateVolumeTextures,
} from "./builders";
import {
  SpaceWeatherData,
  CmeData,
  WsprData,
  AuroraData,
  IonosondeData,
  IonosondeStation,
  SceneSettings,
  sampleStationAt,
  stationPointSizeClamp,
} from "./types";

export interface SceneCallbacks {
  onStationPick?: (code: string | null) => void;
  onLinkResult?: (r: LinkResult | null) => void;
  onLegendRange?: (min: number, max: number) => void;
  onFps?: (fps: number) => void;
  // W-2 tour: tramo activo (texto del overlay), fin y aborto por click.
  onTourIndex?: (index: number) => void;
  onTourDone?: () => void;
  onTourAbort?: () => void;
  // W-4 B1 slice: readout "A->B pk X.X" (null = cortina apagada).
  onSlicePeak?: (label: string | null) => void;
}

interface Props {
  spaceWeather: SpaceWeatherData | null;
  cme: CmeData | null; // W-4 #1: pronostico ENLIL (encadenado O1.3)
  wspr: WsprData | null; // W-4 #5: spots vivos (arcos TX->RX)
  aurora: AuroraData | null;
  ionosondes: IonosondeData | null;
  settings: SceneSettings;
  txCode: string | null;
  rxCode: string | null;
  linkFreq: number;
  tourActive: boolean;
  callbacks: SceneCallbacks;
}

export default function IonosphereScene(props: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const propsRef = useRef(props);
  propsRef.current = props;

  // objetos mutables de escena (viven fuera de React)
  const S = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    controls: OrbitControls;
    composer: EffectComposer;
    bloom: UnrealBloomPass;
    godRays: ShaderPass;
    volumeObj: {
      mesh: THREE.Mesh;
      mat: THREE.ShaderMaterial;
      densityTex: THREE.Data3DTexture;
      layerTex: THREE.Data3DTexture;
      altMinKm: number;
      altMaxKm: number;
      ready: boolean;
    } | null;
    earthMat?: THREE.ShaderMaterial;
    atmoMat?: THREE.ShaderMaterial;
    shellObj?: { mesh: THREE.Mesh; mat: THREE.ShaderMaterial; foTex: THREE.DataTexture; hmTex: THREE.DataTexture };
    auroraObj?: { mesh: THREE.Mesh; mat: THREE.ShaderMaterial };
    stationsObj?: { points: THREE.Points; mat: THREE.ShaderMaterial; codes: string[] };
    rings?: THREE.Group;
    sunGlow?: { core: THREE.Sprite; halo: THREE.Sprite };
    starMat?: THREE.ShaderMaterial;
    linkObj?: { mesh: THREE.Mesh; mat: THREE.ShaderMaterial };
    // W-4 misc: el pase god-rays pinta su propio sol; los sprites se
    // apagan cuando él pinta (1 frame de retardo, imperceptible).
    godraysOn: boolean;
    // W-4 B1 slice: cortina QTH-DX (rebuild por clave endpoints+stamp).
    sliceObj?: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial; tex: THREE.DataTexture };
    sliceKey: string;
    lastVolume: DensityVolume | null;
    // W-4 F1: clave ref-shells + overlay de etiquetas imperativo.
    refKey: string;
    labelBox?: HTMLDivElement;
    labelEls?: { el: HTMLDivElement; dot: HTMLSpanElement; text: HTMLSpanElement }[];
    // W-4 #4 Magnetosfera v1 (ruling 252): burbuja a escala real R_E.
    magneto?: {
      group: THREE.Group;
      sunGroup: THREE.Group;
      river: THREE.Points;
      riverPos: Float32Array;
      mp: THREE.Line[];
      key: string;
    };
    // W-4 #5 WSPRnet (ruling 252): arcos TX->RX (rebuild por fetchedAt).
    wspr?: { group: THREE.Group; key: string };
    // W-4 #6 grey line (ruling 252): terminator overlay (rebuild/min).
    grey?: { group: THREE.Group; key: string };
    raycaster: THREE.Raycaster;
    gridState: {
      fo: Float32Array;
      hm: Float32Array;
      fMin: number;
      fMax: number;
      stamp: number;
    };
    // W-2 export: ultimo grid foF2 + epoch para el CSV (tecla E).
    lastFoGrid: { w: number; h: number; values: Float32Array } | null;
    lastEffMs: number;
    exportReq: boolean;
    disposables: ({ dispose(): void } | THREE.Group)[];
    lastLinkKey: string;
    lastGridStamp: number;
  } | null>(null);

  // ───────── montaje: construir escena una vez ─────────
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let disposed = false;

    const init = async () => {
      const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: "high-performance" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.12;

      const dayLoader = new THREE.TextureLoader().loadAsync("/textures/earth-day.jpg");
      // W-4 misc: noche hires del app (13500 px) con gate de capacidad
      // (espejo imageFitsGL); fallback a la de 3600 en GPU modestas.
      const hiresOk = renderer.capabilities.maxTextureSize >= 13500;
      const nightLoader = new THREE.TextureLoader()
        .loadAsync(hiresOk ? "/textures/earth-night-hires.jpg" : "/textures/earth-night.jpg")
        .catch(() => new THREE.TextureLoader().loadAsync("/textures/earth-night.jpg"));
      const [dayTex, nightTex] = await Promise.all([dayLoader, nightLoader]);
      if (disposed) {
        renderer.dispose();
        return;
      }
      dayTex.colorSpace = THREE.SRGBColorSpace;
      nightTex.colorSpace = THREE.SRGBColorSpace;
      dayTex.anisotropy = 8;
      nightTex.anisotropy = 4;
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x02040a);

      const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.05, 200);
      // vista inicial: Atlántico/Europa (lado diurno para el hemisferio N al mediodía UTC)
      const [cx, cy, cz] = latLonToVec3(28, -28, 3.3);
      camera.position.set(cx, cy, cz);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.minDistance = 1.12;
      // W-4 #4: la burbuja vive a ~10 R_E (escala real); zoom-out ampliado.
      controls.maxDistance = 30;
      controls.enablePan = false;
      controls.autoRotate = propsRef.current.settings.cinema;
      controls.autoRotateSpeed = 0.35;

      // post: composer con MSAA 4x en el target HDR
      const size = renderer.getDrawingBufferSize(new THREE.Vector2());
      const rt = new THREE.WebGLRenderTarget(size.x, size.y, {
        type: THREE.HalfFloatType,
        samples: 4,
      });
      const composer = new EffectComposer(renderer, rt);
      composer.addPass(new RenderPass(scene, camera));
      const bloom = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.55, 0.5, 0.72);
      composer.addPass(bloom);
      composer.addPass(new OutputPass());
      // W-3 god rays (P1-177): ultimo pase = post-ACES por construccion
      // (el composer vuelca a pantalla el ultimo pase activo). GAIN display.
      const godRays = buildGodRaysPass();
      composer.addPass(godRays);

      // objetos
      const stars = buildStars(Math.min(window.devicePixelRatio, 2));
      scene.add(stars.points);
      const earth = buildEarth(dayTex, nightTex);
      scene.add(earth.mesh);
      const atmo = buildAtmosphere();
      scene.add(atmo.mesh);
      const cmapTex = buildColormapTexture("viridis");
      const shell = buildIonShell(cmapTex);
      scene.add(shell.mesh);
      // W-3 P2-182: volumen Ne (raymarch). Texturas reales al publicar datos.
      const volume = buildVolumeMesh(cmapTex);
      scene.add(volume.mesh);
      const rings = buildRefShells({ e: 110, f1: 200, f2: 300 }, 2.2);
      scene.add(rings.group);
      const sunGlow = buildSunGlow();
      scene.add(sunGlow.core, sunGlow.halo);

      // W-4 #4: grupo magnetosfera (sol-orientado + dipolo GEO + río).
      const magnetoGroup = new THREE.Group();
      const magnetoSun = new THREE.Group();
      magnetoGroup.add(magnetoSun);
      const RN = 400;
      const riverPos = new Float32Array(RN * 3);
      for (let i = 0; i < RN; i++) {
        riverPos[i * 3] = 18 - Math.random() * 43;
        const a = Math.random() * Math.PI * 2;
        const rr = Math.sqrt(Math.random()) * 12;
        riverPos[i * 3 + 1] = Math.cos(a) * rr;
        riverPos[i * 3 + 2] = Math.sin(a) * rr;
      }
      const riverGeo = new THREE.BufferGeometry();
      riverGeo.setAttribute("position", new THREE.BufferAttribute(riverPos, 3));
      const riverMat = new THREE.PointsMaterial({
        color: 0x66ccff,
        size: 0.12,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const river = new THREE.Points(riverGeo, riverMat);
      river.frustumCulled = false;
      magnetoSun.add(river);
      // Líneas dipolares estáticas (L 3/4/5.6/8.5 × 6 meridianos; la cola
      // real exige Tsyganenko v2 — declarado, no se estiran aquí).
      {
        const dipMat = new THREE.LineBasicMaterial({
          color: 0x8a7bff,
          transparent: true,
          opacity: 0.45,
          depthWrite: false,
        });
        for (const L of [3, 4, 5.6, 8.5]) {
          for (let m = 0; m < 6; m++) {
            const pts = dipoleLinePoints(L, m * 60, 48).map(
              ([x, y, z]) => new THREE.Vector3(x, y, z),
            );
            const g = new THREE.BufferGeometry().setFromPoints(pts);
            magnetoGroup.add(new THREE.Line(g, dipMat));
          }
        }
      }
      magnetoGroup.visible = false;
      scene.add(magnetoGroup);

      // W-4 #5: grupo de arcos WSPR (rebuild por clave en el frame loop).
      const wsprGroup = new THREE.Group();
      wsprGroup.visible = false;
      scene.add(wsprGroup);

      // W-4 #6: overlay de linea gris (banda + terminador; el shader
      // sol/noche NO se toca — O6.2).
      const greyGroup = new THREE.Group();
      greyGroup.visible = false;
      scene.add(greyGroup);

      S.current = {
        renderer,
        scene,
        camera,
        controls,
        composer,
        bloom,
        godRays,
        volumeObj: {
          mesh: volume.mesh,
          mat: volume.mat as THREE.ShaderMaterial,
          densityTex: volume.densityTex,
          layerTex: volume.layerTex,
          altMinKm: 60,
          altMaxKm: 700,
          ready: false,
        },
        earthMat: earth.mat,
        atmoMat: atmo.mat,
        shellObj: shell,
        rings: rings.group,
        sunGlow,
        starMat: stars.mat,
        magneto: {
          group: magnetoGroup,
          sunGroup: magnetoSun,
          river,
          riverPos,
          mp: [],
          key: "",
        },
        wspr: { group: wsprGroup, key: "" },
        grey: { group: greyGroup, key: "" },
        raycaster: new THREE.Raycaster(),
        gridState: { fo: new Float32Array(GRID_W * GRID_H), hm: new Float32Array(GRID_W * GRID_H), fMin: 2, fMax: 10, stamp: 0 },
        disposables: [dayTex, nightTex, cmapTex, earth.mesh.geometry, earth.mat, atmo.mesh.geometry, atmo.mat, shell.mesh.geometry, shell.mat, shell.foTex, shell.hmTex, rings.group, stars.points.geometry, stars.mat],
        lastLinkKey: "",
        lastGridStamp: -1,
        lastFoGrid: null,
        lastEffMs: 0,
        exportReq: false,
        sliceKey: "",
        lastVolume: null,
        refKey: "",
        godraysOn: false,
      };

      // W-4 F1: overlay de etiquetas (3 divs imperativos, fuera de React).
      {
        const box = document.createElement("div");
        box.style.cssText =
          "position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:5;display:none;";
        const els = [0, 1, 2].map(() => {
          const el = document.createElement("div");
          el.style.cssText =
            "position:absolute;transform:translate(-50%,-50%);display:flex;align-items:center;gap:4px;";
          const dot = document.createElement("span");
          dot.style.cssText = "width:5px;height:5px;border-radius:50%;background:#fff;";
          const text = document.createElement("span");
          text.style.cssText =
            "font:10px ui-monospace,monospace;color:#ffe050;text-shadow:0 0 4px #000;white-space:nowrap;";
          el.appendChild(dot);
          el.appendChild(text);
          box.appendChild(el);
          return { el, dot, text };
        });
        mount.appendChild(box);
        S.current!.labelBox = box;
        S.current!.labelEls = els;
      }

      // resize
      const ro = new ResizeObserver(() => {
        const w = mount.clientWidth,
          h = mount.clientHeight;
        if (w === 0 || h === 0) return;
        renderer.setSize(w, h);
        composer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      });
      ro.observe(mount);

      // picking manual (proyección a pantalla — preciso con puntos custom)
      let downX = 0,
        downY = 0;
      // W-2 tour: cualquier click aborta y ese gesto no selecciona estacion.
      // Errata 158-n1: el C++ aborta en press pero SI pinea en el release
      // del gesto abortante; la supresion web es adaptacion Q1 declarada
      // (mas conservadora). La camara se queda donde esta en ambos.
      let tourAbortArmed = false;
      const onDown = (e: PointerEvent) => {
        downX = e.clientX;
        downY = e.clientY;
        if (propsRef.current.tourActive) {
          tourAbortArmed = true;
          propsRef.current.callbacks.onTourAbort?.();
        }
      };
      const onUp = (e: PointerEvent) => {
        if (tourAbortArmed) {
          tourAbortArmed = false;
          return;
        }
        if (Math.hypot(e.clientX - downX, e.clientY - downY) > 6) return; // drag
        const so = S.current;
        if (!so?.stationsObj) return;
        const rect = renderer.domElement.getBoundingClientRect();
        const px = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const py = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        const p = new THREE.Vector3();
        let bestIdx = -1,
          bestD = 24; // px umbral
        const codes = so.stationsObj.codes;
        const posAttr = so.stationsObj.points.geometry.attributes.position as THREE.BufferAttribute;
        const cands: { code: string; sx: number; sy: number; dd: number; vis: boolean }[] = [];
        for (let i = 0; i < codes.length; i++) {
          p.fromBufferAttribute(posAttr, i);
          p.project(camera);
          if (p.z > 1) continue;
          const sx = ((p.x + 1) / 2) * rect.width;
          const sy = ((1 - p.y) / 2) * rect.height;
          const dd = Math.hypot(sx - (e.clientX - rect.left), sy - (e.clientY - rect.top));
          // hemisferio visible: dot(dirección estación, dirección cámara)
          const world = p.clone().unproject(camera).normalize();
          const camDir = camera.position.clone().normalize();
          const vis = world.dot(camDir) >= 0.0;
          if (dd < 60) cands.push({ code: codes[i], sx: Math.round(sx), sy: Math.round(sy), dd: Math.round(dd), vis });
          if (dd < bestD) {
            if (!vis) continue; // hemisferio oculto tras el globo
            bestD = dd;
            bestIdx = i;
          }
        }
        (window as unknown as { __pickCands?: unknown[] }).__pickCands = cands;
        propsRef.current.callbacks.onStationPick?.(bestIdx >= 0 ? codes[bestIdx] : null);
        if ((window as unknown as { __debugPick?: boolean }).__debugPick) {
          console.log("[pick] click", e.clientX, e.clientY, "->", bestIdx >= 0 ? codes[bestIdx] : null, "candidates", (window as unknown as { __pickCands?: unknown[] }).__pickCands);
        }
      };
      renderer.domElement.addEventListener("pointerdown", onDown);
      renderer.domElement.addEventListener("pointerup", onUp);

      // W-2 export (tecla E, flanco): sin colision web (solo este listener
      // global de tecla suelta; carrusel/sidebar usan las suyas). Se ignoran
      // inputs de texto, modificadores y repeticiones.
      const onKey = (e: KeyboardEvent) => {
        if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
        const t = e.target as HTMLElement | null;
        const tag = t?.tagName ?? "";
        if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
        if ((e.key === "e" || e.key === "E") && S.current) S.current.exportReq = true;
      };
      window.addEventListener("keydown", onKey);

      // W-2 export: descarga via anchor (DOM; lo puro vive en lib/iono/export).
      const downloadDataUrl = (url: string, name: string) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
      };
      const downloadText = (text: string, name: string) => {
        const blob = new Blob([text], { type: "text/csv;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        downloadDataUrl(url, name);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
      };

      // loop
      let raf = 0;
      let lastT = performance.now();
      let fpsAcc = 0,
        fpsN = 0,
        fpsT = lastT;
      let elapsed = 0;
      // W-2 tour: reloj y base propios del loop (60 fps fuera de React).
      let tourT = 0;
      let tourBase: THREE.Vector3 | null = null;
      let tourLastIdx = -1;
      let tourDoneFired = false;

      // W-4 F1: etiquetas 3D (App.cpp:5470-5525: estacion F2, ovalo
      // auroral, shell TEC; cull de dorso + NDC, offset +12,-26).
      const updateLabels = () => {
        const so = S.current;
        if (!so || !so.labelBox || !so.labelEls) return;
        const st = propsRef.current.settings;
        const show = st.showLabels;
        so.labelBox.style.display = show ? "block" : "none";
        if (!show) return;
        const W = mount.clientWidth || 1;
        const H = mount.clientHeight || 1;
        const stations = propsRef.current.ionosondes?.stations ?? [];
        const tx = propsRef.current.txCode
          ? stations.find((s) => s.code === propsRef.current.txCode) ?? null
          : null;
        const rx = propsRef.current.rxCode
          ? stations.find((s) => s.code === propsRef.current.rxCode) ?? null
          : null;
        const pinned = tx ?? rx;
        const sun = getSunInfo((so.lastEffMs || Date.now()) / 1000);
        const mLon = midnightLon(sun.dir[0], sun.dir[1], sun.dir[2]);
        const camLL = vec3ToLatLon(
          so.camera.position.x, so.camera.position.y, so.camera.position.z,
        );
        const items: { lat: number; lon: number; alt: number; text: string; color: string }[] = [];
        if (pinned) {
          items.push({
            lat: pinned.lat,
            lon: pinned.lon,
            alt: pinned.hmF2 ?? 300,
            text: `${pinned.code} F2 ${(pinned.hmF2 ?? 300).toFixed(0)}km`,
            color: "#ffdc50",
          });
        }
        items.push({ lat: 67, lon: mLon, alt: 110, text: "Aurora oval", color: "#50ff88" });
        items.push({ lat: camLL.lat, lon: camLL.lon, alt: 300, text: "TEC shell", color: "#50a0ff" });
        const v = new THREE.Vector3();
        const toCam = new THREE.Vector3();
        const nrm = new THREE.Vector3();
        for (let k = 0; k < 3; k++) {
          const slot = so.labelEls[k];
          const it = items[k];
          if (!it) {
            slot.el.style.display = "none";
            continue;
          }
          const [x, y, z] = latLonToVec3(it.lat, it.lon, 1 + it.alt / 6371);
          v.set(x, y, z);
          nrm.set(x, y, z).normalize();
          toCam.copy(so.camera.position).sub(v).normalize();
          const facing = nrm.dot(toCam);
          v.project(so.camera);
          if (labelCulled(facing, v.x, v.y)) {
            slot.el.style.display = "none";
            continue;
          }
          slot.el.style.display = "flex";
          slot.el.style.left = `${(v.x * 0.5 + 0.5) * W + 12}px`;
          slot.el.style.top = `${(-v.y * 0.5 + 0.5) * H - 26}px`;
          slot.dot.style.background = it.color;
          slot.text.textContent = it.text;
          slot.text.style.color = it.color;
        }
      };

      const tick = () => {
        raf = requestAnimationFrame(tick);
        const now = performance.now();
        const dt = Math.min(0.1, (now - lastT) / 1000);
        lastT = now;
        fpsAcc += 1 / Math.max(dt, 1e-4);
        fpsN++;
        if (now - fpsT > 2000) {
          propsRef.current.callbacks.onFps?.(fpsAcc / fpsN);
          fpsAcc = 0;
          fpsN = 0;
          fpsT = now;
        }
        const t = elapsed;
        elapsed += dt;

        // sol por tiempo efectivo (live o replay -- mejora: el terminador sigue al dato)
        const { settings } = propsRef.current;
        const effMs = Date.now() - (settings.timeMode === "replay" ? settings.replayMinutes * 60_000 : 0);
        const sun = getSunInfo(effMs / 1000);
        const sunV = new THREE.Vector3(sun.dir[0], sun.dir[1], sun.dir[2]);

        // W-4 #4: magnetosfera viva — acople Bz/v/n en el mismo frame (O4.4).
        {
          const mg = S.current?.magneto;
          if (mg) {
            mg.group.visible = settings.showMagnetosphere;
            if (settings.showMagnetosphere) {
              const w = propsRef.current.spaceWeather?.wind;
              const Bz = w?.bz ?? 0;
              const v = w && w.speed > 0 ? w.speed : 400;
              const n = w && w.density > 0 ? w.density : 5;
              // W-4 #1: encadenado O1.3 — la llegada ENLIL geoefectiva
              // comprime #4 con el factor demo DECLARADO x1.6 (el CCMC no
              // publica Dp). El cambio de Dp re-talla la malla via
              // magnetoKey en el mismo frame; determinista en replay
              // porque effMs sigue a replayMinutes.
              const cmeD = propsRef.current.cme;
              const cmeE = cmeD?.status === "event" ? cmeD.event : null;
              const cmeHit =
                settings.showCme &&
                cmeE != null &&
                cmeE.earthGB &&
                cmeArrived(cmeE.start, cmeE.arrival, effMs);
              const Dp = cmeEffectiveDp(dynamicPressure(n, v), cmeHit, cmeE?.earthGB ?? false);
              const key = magnetoKey(Bz, Dp);
              if (key !== mg.key) {
                mg.key = key;
                for (const l of mg.mp) {
                  mg.sunGroup.remove(l);
                  l.geometry.dispose();
                  (l.material as THREE.Material).dispose();
                }
                mg.mp = [];
                const mesh = magnetopauseMesh(Bz, Dp);
                const mat = new THREE.LineBasicMaterial({
                  color: 0x66d9ff,
                  transparent: true,
                  opacity: 0.5,
                  depthWrite: false,
                });
                const addLines = (lists: [number, number, number][][]) => {
                  for (const pts of lists) {
                    const g = new THREE.BufferGeometry().setFromPoints(
                      pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
                    );
                    const line = new THREE.Line(g, mat);
                    mg.sunGroup.add(line);
                    mg.mp.push(line);
                  }
                };
                addLines(mesh.rings);
                addLines(mesh.meridians);
              }
              mg.sunGroup.quaternion.setFromUnitVectors(
                new THREE.Vector3(1, 0, 0),
                sunV.clone().normalize(),
              );
              // Río solar: deriva antisolar a v real ×60 declarado + desvío.
              // (×60 hace visible el flujo; la física va en shueRadius.)
              const step = (v / 6371) * 60 * dt;
              const pos = mg.riverPos;
              for (let i = 0; i < pos.length / 3; i++) {
                let x = pos[i * 3] - step;
                let y = pos[i * 3 + 1];
                let z = pos[i * 3 + 2];
                const r = Math.hypot(x, y, z);
                if (r > 1e-6) {
                  const th = Math.acos(Math.min(1, Math.max(-1, x / r)));
                  const rmp = shueRadius(th, Bz, Dp);
                  if (r < rmp * 0.98) {
                    const push = (rmp * 0.98) / r;
                    y *= push;
                    z *= push;
                  }
                }
                if (x < -28) {
                  x = 18;
                  const a = Math.random() * Math.PI * 2;
                  const rr = Math.sqrt(Math.random()) * 12;
                  y = Math.cos(a) * rr;
                  z = Math.sin(a) * rr;
                }
                pos[i * 3] = x;
                pos[i * 3 + 1] = y;
                pos[i * 3 + 2] = z;
              }
              (mg.river.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
            }
          }
        }

        // W-4 #5: arcos WSPR TX->RX (O5.2 geodesicos por banda; misma
        // lista que el panel O5.3; techo 40 + persistencia ~10 min
        // declarados en wspr.ts; rebuild solo al cambiar fetchedAt).
        {
          const wg = S.current?.wspr;
          if (wg) {
            const spots = propsRef.current.wspr?.spots ?? [];
            const fetched = propsRef.current.wspr?.fetchedAt ?? 0;
            wg.group.visible = settings.showWspr && spots.length > 0;
            const key = `${fetched}|${settings.showWspr ? 1 : 0}`;
            if (wg.group.visible && key !== wg.key) {
              wg.key = key;
              for (const ch of [...wg.group.children]) {
                wg.group.remove(ch);
                const line = ch as THREE.Line;
                line.geometry.dispose();
                (line.material as THREE.Material).dispose();
              }
              const SEG = 32;
              for (const s of spots) {
                const [ax, ay, az] = latLonToVec3(s.txLat, s.txLon, 1);
                const [bx, by, bz] = latLonToVec3(s.rxLat, s.rxLon, 1);
                const va = new THREE.Vector3(ax, ay, az);
                const vb = new THREE.Vector3(bx, by, bz);
                const ang = va.angleTo(vb);
                if (!(ang > 1e-4)) continue;
                const lift = Math.min(0.3, 0.03 + ang * 0.22);
                const pts: THREE.Vector3[] = [];
                for (let i = 0; i <= SEG; i++) {
                  const f = i / SEG;
                  // slerp + elevacion senoidal (arco sobre el globo).
                  const v = new THREE.Vector3()
                    .copy(va)
                    .multiplyScalar(Math.sin((1 - f) * ang))
                    .addScaledVector(vb, Math.sin(f * ang))
                    .divideScalar(Math.sin(ang));
                  v.multiplyScalar(1 + lift * Math.sin(Math.PI * f));
                  pts.push(v);
                }
                const [cr, cg, cb] = bandColor(s.band);
                const mat = new THREE.LineBasicMaterial({
                  color: new THREE.Color(cr, cg, cb),
                  transparent: true,
                  opacity: 0.55,
                  depthWrite: false,
                });
                wg.group.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
              }
            }
          }
        }

        // W-4 #6: grey-line overlay — terminator loop + band ribbon from
        // the program's own sun (O6.1, zero external sources). Rebuilt at
        // most once per minute (the terminator drifts slowly); plain
        // geometry, earth sun/night shader untouched (O6.2).
        {
          const gr = S.current?.grey;
          if (gr) {
            gr.group.visible = settings.showGreyline;
            const key = `${Math.floor(effMs / 60000)}`;
            if (gr.group.visible && key !== gr.key) {
              gr.key = key;
              for (const ch of [...gr.group.children]) {
                gr.group.remove(ch);
                const obj = ch as THREE.Line | THREE.Mesh;
                obj.geometry.dispose();
                (obj.material as THREE.Material).dispose();
              }
              const sec = effMs / 1000;
              const R = 1.004;
              // Band ribbon (triangle strip inner->outer).
              const { inner, outer } = greyRibbon(sec);
              const pos: number[] = [];
              for (let i = 0; i <= inner.length; i++) {
                const a = inner[i % inner.length];
                const b = outer[i % outer.length];
                pos.push(a[0] * R, a[1] * R, a[2] * R, b[0] * R, b[1] * R, b[2] * R);
              }
              const rg = new THREE.BufferGeometry();
              rg.setAttribute("position", new THREE.BufferAttribute(new Float32Array(pos), 3));
              const idx: number[] = [];
              for (let i = 0; i < inner.length; i++) {
                const k = i * 2;
                idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2);
              }
              rg.setIndex(idx);
              const rmat = new THREE.MeshBasicMaterial({
                color: 0xffc861,
                transparent: true,
                opacity: 0.16,
                side: THREE.DoubleSide,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
              });
              const ribbon = new THREE.Mesh(rg, rmat);
              ribbon.frustumCulled = false;
              gr.group.add(ribbon);
              // Crisp terminator line (closed loop).
              const loop = greylineLoop(sec);
              const lpts = loop.map((p) => {
                const [x, y, z] = latLonToVec3(p.lat, p.lon, R);
                return new THREE.Vector3(x, y, z);
              });
              lpts.push(lpts[0].clone());
              const lmat = new THREE.LineBasicMaterial({
                color: 0xffd9a0,
                transparent: true,
                opacity: 0.75,
                depthWrite: false,
              });
              const tline = new THREE.Line(new THREE.BufferGeometry().setFromPoints(lpts), lmat);
              tline.frustumCulled = false;
              gr.group.add(tline);
            }
          }
        }

        // uniforms
        if (S.current?.earthMat) {
          const u = S.current.earthMat.uniforms;
          u.uSunDir.value.copy(sunV);
          u.uCameraPos.value.copy(camera.position);
          u.uTime.value = t;
          u.uNight.value = propsRef.current.settings.nightLights;
          u.uCloudAmt.value = propsRef.current.settings.clouds ? 0.55 : 0;
          // W-4 #3: flash del flare con el XRS del epoch (O3.1/O3.3 —
          // mismo XRS en replay = mismo efecto; la serie decae sola en
          // horas = recuperacion visible sin relojes inventados).
          const xr = propsRef.current.spaceWeather?.xray.series ?? [];
          const fst = flareState(
            xr.map((p) => ({ t: p.t, f: p.f })),
            effMs
          );
          (u.uFlare as THREE.IUniform).value =
            propsRef.current.settings.showFlare && fst.isEvent ? fst.level : 0;
        }
        if (S.current?.atmoMat) {
          const u = S.current.atmoMat.uniforms;
          u.uSunDir.value.copy(sunV);
          u.uCameraPos.value.copy(camera.position);
          const q = propsRef.current.settings.atmoQuality;
          u.uSteps.value = q === "low" ? 6 : q === "medium" ? 10 : 14;
          u.uLightSteps.value = q === "low" ? 3 : q === "medium" ? 4 : 5;
        }
        if (S.current?.shellObj) {
          const u = S.current.shellObj.mat.uniforms;
          u.uSunDir.value.copy(sunV);
          u.uCameraPos.value.copy(camera.position);
          u.uTime.value = t;
          u.uKp.value = propsRef.current.spaceWeather?.kp.now ?? 2;
          u.uExaggeration.value = propsRef.current.settings.exaggeration;
          u.uOpacity.value = propsRef.current.settings.shellOpacity;
          S.current.shellObj.mesh.visible = propsRef.current.settings.showShell;
        }
        if (S.current?.auroraObj) {
          const u = S.current.auroraObj.mat.uniforms;
          u.uTime.value = t;
          // W-4 #1: la llegada ENLIL geoefectiva enciende el ovalo
          // OVATION vivo (O1.3); el dato auroral sigue siendo el real.
          const cmeS = propsRef.current.cme;
          const cmeSE = cmeS?.status === "event" ? cmeS.event : null;
          const cmeOval =
            propsRef.current.settings.showCme &&
            cmeSE != null &&
            cmeSE.earthGB &&
            cmeArrived(cmeSE.start, cmeSE.arrival, effMs);
          S.current.auroraObj.mesh.visible = propsRef.current.settings.showAurora || cmeOval;
        }
        if (S.current?.stationsObj) {
          S.current.stationsObj.mat.uniforms.uTime.value = t;
          S.current.stationsObj.points.visible = propsRef.current.settings.showStations;
        }
        if (S.current?.starMat) S.current.starMat.uniforms.uTime.value = t;
        if (S.current?.linkObj) {
          S.current.linkObj.mat.uniforms.uTime.value = t;
          S.current.linkObj.mesh.visible = propsRef.current.settings.showLink;
        }
        // W-4 E-tail o6: tamaño de punto desde settings.
        {
          const um = S.current?.stationsObj?.mat.uniforms as unknown as
            Record<string, THREE.IUniform> | undefined;
          if (um && um.uPointSize)
            um.uPointSize.value = stationPointSizeClamp(propsRef.current.settings.pointSize);
        }
        if (S.current?.rings) {
          S.current.rings.visible = propsRef.current.settings.showRings;
        }
        // W-4 F1: iso-bands del volumen (u_isoOn, como VolumeRenderer).
        // W-4 F2: modo Chapman + escala de opacidad (App.cpp:4219-4227).
        {
          const st = propsRef.current.settings;
          const vm = S.current?.volumeObj?.mat.uniforms as unknown as
            Record<string, THREE.IUniform> | undefined;
          if (vm && vm.u_isoOn) vm.u_isoOn.value = st.showIso ? 1 : 0;
          if (vm && vm.u_colorMode) vm.u_colorMode.value = volumeModeIndex(st.volumeMode);
          if (vm && vm.u_opacityScale) vm.u_opacityScale.value = volumeOpacityClamp(st.volumeOpacity);
        }
        // W-4 F1: overlay de etiquetas (App.cpp:5470-5525).
        updateLabels();
        // sol: sprites a 6.5 unidades (apagados si pinta god-rays).
        if (S.current?.sunGlow) {
          const p = sunV.clone().multiplyScalar(6.5);
          S.current.sunGlow.core.position.copy(p);
          S.current.sunGlow.halo.position.copy(p);
          const gr = S.current.godraysOn;
          S.current.sunGlow.core.visible = !gr;
          S.current.sunGlow.halo.visible = !gr;
        }
        // W-3 volumen: uniforms por frame + visibilidad reactiva al toggle.
        if (S.current?.volumeObj) {
          const vo = S.current.volumeObj;
          vo.mesh.visible = vo.ready && propsRef.current.settings.showVolume;
          if (vo.mesh.visible) {
            const vu = vo.mat.uniforms as Record<string, THREE.IUniform>;
            (vu.u_camPos.value as THREE.Vector3).copy(camera.position);
            (vu.u_sunDir.value as THREE.Vector3).copy(sunV);
          }
        }

        // W-2 tour: camara guiada (Tour.h del C++: ry/dist absolutos con
        // curva smoothstep; adaptacion Q2: ry rota el azimut orbital desde
        // la vista de activacion, dist fija el radio, el polar se conserva).
        // Al salir (fin o aborto) la camara se queda donde esta: continuidad.
        const Y_UP = new THREE.Vector3(0, 1, 0);
        if (propsRef.current.tourActive) {
          if (!tourBase) {
            tourBase = camera.position.clone();
            tourT = 0;
            tourLastIdx = -1;
            tourDoneFired = false;
          }
          const ready = propsRef.current.ionosondes != null;
          tourT = tourAdvance(tourT, dt, ready);
          const st = tourEval(tourT);
          camera.position.copy(tourBase).applyAxisAngle(Y_UP, st.ry).setLength(st.dist);
          controls.enabled = false;
          controls.autoRotate = false;
          if (st.index !== tourLastIdx) {
            tourLastIdx = st.index;
            propsRef.current.callbacks.onTourIndex?.(st.index);
          }
          if (st.done && !tourDoneFired) {
            tourDoneFired = true;
            propsRef.current.callbacks.onTourDone?.();
          }
        } else {
          if (tourBase) {
            tourBase = null;
            controls.enabled = true;
          }
          controls.autoRotate = propsRef.current.settings.cinema;
        }
        controls.update();
        // W-3 god rays (P1-177): puerta CPU + uniforms por frame con el
        // espejo (projectSun/gateSkip/rayHitsEarth). El sol es el MISMO
        // vector del sprite (motor-consistente con uSunDir): el pase se
        // alinea con el sol visual. Flare/xray NO entran aqui (el oraculo
        // modula D, no el pase). Aspecto del canvas real.
        const gp = S.current?.godRays;
        if (gp) {
          let show = propsRef.current.settings.showGodrays;
          if (show) {
            camera.updateMatrixWorld();
            const vp = mat4Mul(
              camera.projectionMatrix.elements as unknown as Mat4,
              camera.matrixWorldInverse.elements as unknown as Mat4
            );
            const st = godraysPassState(vp, [camera.position.x, camera.position.y, camera.position.z], [sunV.x, sunV.y, sunV.z]);
            show = st.visible;
            if (st.visible) {
              const u = (gp as unknown as { uniforms: Record<string, THREE.IUniform> }).uniforms;
              (u.u_sunUV.value as THREE.Vector2).set(st.sunUV[0], st.sunUV[1]);
              u.u_aspect.value = mount.clientWidth / Math.max(1, mount.clientHeight);
              // n1-178: la matriz es la INVERSA (oraculo: glm::inverse) -- sin
              // invertir, la mascara analitica falla en ~1/3 de los taps.
              (u.u_invViewProj.value as THREE.Matrix4)
                .multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
                .invert();
              (u.u_camPos.value as THREE.Vector3).copy(camera.position);
            }
          }
          gp.enabled = show;
          if (S.current) S.current.godraysOn = show;
        }
        composer.render();
        // W-2 export: captura sincrona en el mismo frame (buffer valido).
        const sox = S.current;
        if (sox?.exportReq) {
          sox.exportReq = false;
          try {
            const url = renderer.domElement.toDataURL("image/png");
            const sec = Math.floor((sox.lastEffMs || Date.now()) / 1000);
            downloadDataUrl(url, buildPngName(sec));
            if (sox.lastFoGrid) {
              const csv = gridCsv("foF2", { ...sox.lastFoGrid, valid: true }, sec);
              downloadText(csv, buildPngName(sec, "csv"));
            }
          } catch (err) {
            console.error("[export] failed", err);
          }
        }
      };
      tick();

      return () => {
        ro.disconnect();
        renderer.domElement.removeEventListener("pointerdown", onDown);
        renderer.domElement.removeEventListener("pointerup", onUp);
        window.removeEventListener("keydown", onKey);
        cancelAnimationFrame(raf);
      };
    };

    let cleanupScene: (() => void) | undefined;
    init()
      .then((c) => {
        cleanupScene = c;
      })
      .catch((err) => console.error("[scene] init failed", err));

    return () => {
      disposed = true;
      cleanupScene?.();
      const so = S.current;
      if (so) {
        so.controls.dispose();
        so.disposables.forEach((d) => {
          // Baseline W-1: rings.group no tiene dispose (era error de tipos y
          // TypeError en runtime al limpiar); guarda type-safe.
          if ("dispose" in d) d.dispose();
        });
        so.stationsObj?.points.geometry.dispose();
        so.stationsObj?.mat.dispose();
        if (so.labelBox) {
          so.labelBox.remove();
          so.labelBox = undefined;
          so.labelEls = undefined;
        }
        if (so.magneto) {
          so.scene.remove(so.magneto.group);
          so.magneto.group.traverse((o) => {
            const line = o as unknown as THREE.Line;
            if (line.isLine) {
              line.geometry.dispose();
              (line.material as THREE.Material).dispose();
            }
            const pts = o as unknown as THREE.Points;
            if ((pts as THREE.Points).isPoints) {
              pts.geometry.dispose();
              (pts.material as THREE.Material).dispose();
            }
          });
          so.magneto = undefined;
        }
        so.auroraObj?.mesh.geometry.dispose();
        so.auroraObj?.mat.dispose();
        so.linkObj?.mesh.geometry.dispose();
        so.linkObj?.mat.dispose();
        if (so.sliceObj) {
          so.scene.remove(so.sliceObj.mesh);
          so.sliceObj.mesh.geometry.dispose();
          so.sliceObj.mat.dispose();
          so.sliceObj.tex.dispose();
          so.sliceObj = undefined;
        }
        so.renderer.dispose();
        so.renderer.domElement.remove();
        S.current = null;
      }
    };
    
  }, []);

  // ----- datos: ionosondas -> rejilla viva -> shell derivada -----
  // W-3 (P1-172): el shell ya no se alimenta de la era (buildFoF2Grid), sino
  // de picos DERIVADOS del volumen (pin 158 sec.5.4): estaciones ->
  // stationToProfileSample -> interpProfiles -> buildDensityVolume ->
  // extractPeakGrids. Corre en useEffect por publicacion de datos, no por
  // frame. Quirk esquinas-vs-centros del oraculo preservado (NO corregir).
  // P5-176 (declarado, sin cambio): gridState (ahora derivado) tambien lo
  // muestrea el enlace HF (computeLink via foAt/hmAt); xray.now no esta en
  // las deps: el flare se cuantiza a la cadencia de publicacion de
  // ionosondas (el oraculo reconstruye cada 5 s).
  useEffect(() => {
    const so = S.current;
    if (!so || !props.ionosondes) return;
    const { settings } = props;
    const effMs = Date.now() - (settings.timeMode === "replay" ? settings.replayMinutes * 60_000 : 0);

    // estaciones muestreadas al tiempo efectivo
    const sampled: IonosondeStation[] = props.ionosondes.stations.map((s) => ({
      ...s,
      foF2: sampleStationAt(s, effMs),
    }));

    // sol en el marco del motor (ruling 174 n1, fix 175): sun.dir YA ES el
    // vector motor del oraculo (paridad <=4.6e-7 con getDirection); se pasa
    // directo, sin decodificar subsolar (la decodificacion escena sumaba 180
    // y el drape lo compensaba: doble espejo cancelado en el render).
    // uSunDir de los shaders se deja INTACTO (invariancia del ruling).
    const sun = getSunInfo(effMs / 1000);
    const [sunX, sunY, sunZ] = sun.dir;
    const f107 = props.spaceWeather?.f107.now ?? 110;
    const xray = props.spaceWeather?.xray.now ?? 0;
    const flare = Math.max(1, 1 + 20 * Math.log10(Math.max(xray, 1e-9) / 1e-6));
    // P3-174: dims del oraculo en produccion (App.cpp:2437 60/60/700,
    // plan 158 sec.5bis: en tormenta la hmF2 supera 500 km).
    const peaks = buildLivePeakGrids(
      sampled, GRID_W, GRID_H, sunX, sunY, sunZ, effMs / 1000, f107, 60, 60, 700, flare
    );
    const foGrid = { values: peaks.fo };
    const hmGrid = { values: peaks.hm };

    // rango robusto (percentiles para no romper el colormap con outliers)
    const sorted = [...foGrid.values].sort((a, b) => a - b);
    const fMin = sorted[Math.floor(sorted.length * 0.02)];
    const fMax = sorted[Math.floor(sorted.length * 0.98)];
    const span = Math.max(1.5, fMax - fMin);

    updateShellTextures(so.shellObj!.foTex, so.shellObj!.hmTex, foGrid.values, hmGrid.values, fMin, fMin + span);
    so.gridState = { fo: foGrid.values, hm: hmGrid.values, fMin, fMax: fMin + span, stamp: Date.now() };
    // W-2: snapshot para export (copia: el loop lo reescribe por frame).
    so.lastFoGrid = { w: GRID_W, h: GRID_H, values: foGrid.values.slice() };
    so.lastEffMs = effMs;
    props.callbacks.onLegendRange?.(fMin, fMin + span);

    // W-3 P2-182: volumen Ne vivo (misma cadena que los picos: rejilla 72x36
    // con applyDayNight + builder 60/60/700). Subida R8 + uniforms; visible
    // solo con el toggle (default OFF como visible_=false del oraculo).
    if (so.volumeObj) {
      const v = buildLiveVolume(
        sampled, GRID_W, GRID_H, sunX, sunY, sunZ, effMs / 1000, f107, 60, 60, 700, flare
      );
      if (v.valid) {
        // W-4 B1: retener el volumen para la cortina slice (no solo texturas).
        so.lastVolume = v;
        const tex = updateVolumeTextures(
          { densityTex: so.volumeObj.densityTex, layerTex: so.volumeObj.layerTex }, v
        );
        so.volumeObj.densityTex = tex.densityTex;
        so.volumeObj.layerTex = tex.layerTex;
        so.volumeObj.altMinKm = v.altMinKm;
        so.volumeObj.altMaxKm = v.altMaxKm;
        const u = so.volumeObj.mat.uniforms as Record<string, THREE.IUniform>;
        u.u_density.value = tex.densityTex;
        u.u_layer.value = tex.layerTex;
        const innerR = 1 + v.altMinKm / 6371;
        const outerR = 1 + v.altMaxKm / 6371;
        u.u_innerR.value = innerR;
        u.u_outerR.value = outerR;
        (u.u_volRes.value as THREE.Vector3).set(v.lonRes, v.latRes, v.altRes);
        so.volumeObj.mesh.scale.setScalar(outerR);
        so.volumeObj.mesh.visible = props.settings.showVolume;
        so.volumeObj.ready = true;
      } else {
        so.volumeObj.mesh.visible = false;
        so.volumeObj.ready = false;
        so.lastVolume = null;
      }
    }

    // rebuild estaciones (posiciones fijas, color por foF2)
    if (so.stationsObj) {
      so.scene.remove(so.stationsObj.points);
      so.stationsObj.points.geometry.dispose();
      so.stationsObj.mat.dispose();
    }
    if (so.auroraObj === undefined) {
      // nada
    }
    const cmapTex = so.disposables.find((d) => (d as THREE.DataTexture).isTexture && (d as THREE.DataTexture).image?.width === 256) as THREE.DataTexture;
    const st = buildStations(sampled, cmapTex, fMin, fMin + span);
    so.scene.add(st.points);
    so.stationsObj = st;
    so.lastGridStamp = so.gridState.stamp;

    // W-4 F1: ref-shells dinámicas (mediana hmF2, como App.cpp:2487).
    {
      const hms: number[] = [];
      for (const s of sampled) if ((s.hmF2 ?? 0) > 0) hms.push(s.hmF2 as number);
      const alts = refAltitudes(hms);
      const key = alts ? refKey(alts, settings.exaggeration) : "";
      if (key && key !== so.refKey) {
        so.refKey = key;
        if (so.rings) {
          so.scene.remove(so.rings);
          so.rings.traverse((o) => {
            const line = o as unknown as THREE.Line;
            if (line.isLine) {
              line.geometry.dispose();
              (line.material as THREE.Material).dispose();
            }
          });
        }
        const nb = buildRefShells(alts as { e: number; f1: number; f2: number }, settings.exaggeration);
        so.scene.add(nb.group);
        so.rings = nb.group;
      }
    }
  }, [props.ionosondes, props.spaceWeather?.f107.now, props.settings.timeMode, props.settings.replayMinutes]);

  // ───────── W-4 B1 slice QTH-DX: cortina Ne(h) ─────────
  // Espejo SliceLayer (SEG 64 x LVL 20, slerp A->B, viridis + alfa d*1.2).
  // Rebuild por clave endpoints+stamp (early-out como App.cpp:3160/3166);
  // declarado DESPUES del efecto de datos para ver el volumen fresco.
  useEffect(() => {
    const so = S.current;
    if (!so || !props.ionosondes) return;
    const st = props.settings;
    const stations = props.ionosondes.stations;
    const tx = props.txCode ? stations.find((s) => s.code === props.txCode) ?? null : null;
    const rx = props.rxCode ? stations.find((s) => s.code === props.rxCode) ?? null : null;
    const drop = () => {
      if (so.sliceObj) {
        so.scene.remove(so.sliceObj.mesh);
        so.sliceObj.mesh.geometry.dispose();
        so.sliceObj.mat.dispose();
        so.sliceObj.tex.dispose();
        so.sliceObj = undefined;
      }
      so.sliceKey = "";
      props.callbacks.onSlicePeak?.(null);
    };
    if (!st.showSlice || !so.lastVolume) {
      drop();
      return;
    }
    const ep = resolveSliceEndpoints(
      st.sliceSrc,
      tx ? { lat: tx.lat, lon: tx.lon } : null,
      rx ? { lat: rx.lat, lon: rx.lon } : null,
      { lat: st.sliceLatA, lon: st.sliceLonA },
      { lat: st.sliceLatB, lon: st.sliceLonB },
    );
    const stamp = so.lastVolume.timestamp;
    const grid = buildSliceGrid(so.lastVolume, ep, stamp);
    if (!grid || !ep) {
      drop();
      return;
    }
    if (grid.key === so.sliceKey && so.sliceObj) return; // early-out
    drop();
    const pos = slicePositions(ep, st.exaggeration);
    const uv = new Float32Array(SLICE_SEG * SLICE_LVL * 2);
    const idx: number[] = [];
    for (let j = 0; j < SLICE_LVL; j++)
      for (let i = 0; i < SLICE_SEG; i++) {
        const k = j * SLICE_SEG + i;
        uv[k * 2] = SLICE_SEG <= 1 ? 0 : i / (SLICE_SEG - 1);
        uv[k * 2 + 1] = SLICE_LVL <= 1 ? 0 : j / (SLICE_LVL - 1);
        if (i + 1 < SLICE_SEG && j + 1 < SLICE_LVL) {
          const a = k, b = k + 1, c = k + SLICE_SEG, d = k + SLICE_SEG + 1;
          idx.push(a, c, b, b, c, d);
        }
      }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
    geo.setIndex(idx);
    const tex = new THREE.DataTexture(grid.rgba, SLICE_SEG, SLICE_LVL, THREE.RGBAFormat);
    tex.needsUpdate = true;
    tex.colorSpace = THREE.SRGBColorSpace;
    // o4(c): GL_LINEAR del oraculo (no NearestFilter); o4(b): alfa x0.9.
    tex.magFilter = THREE.LinearFilter;
    tex.minFilter = THREE.LinearFilter;
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      opacity: 0.9,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    so.scene.add(mesh);
    so.sliceObj = { mesh, mat, tex };
    so.sliceKey = grid.key;
    const codeA = st.sliceSrc === "link" && props.txCode ? props.txCode : "A";
    const codeB = st.sliceSrc === "link" && props.rxCode ? props.rxCode : "B";
    // o4(e): en manual/fijo el oraculo muestra coordenadas, no codigos.
    // n1-208: en fijo el app muestra el CENTRO en ambos lados (:3146).
    const center = { lat: st.sliceLatA, lon: st.sliceLonA };
    const coords = st.sliceSrc === "link" || !ep ? null : st.sliceSrc === "fixed"
      ? { latA: center.lat, lonA: center.lon, latB: center.lat, lonB: center.lon }
      : { latA: ep.latA, lonA: ep.lonA, latB: ep.latB, lonB: ep.lonB };
    props.callbacks.onSlicePeak?.(sliceLabel(codeA, codeB, grid.peakLog, coords));
  }, [props.ionosondes, props.spaceWeather?.f107.now, props.settings.timeMode, props.settings.replayMinutes,
    props.settings.showSlice, props.settings.sliceSrc, props.settings.sliceLatA, props.settings.sliceLonA,
    props.settings.sliceLatB, props.settings.sliceLonB, props.settings.exaggeration, props.txCode, props.rxCode]);

  // ───────── datos: aurora → instancias ─────────
  useEffect(() => {
    const so = S.current;
    if (!so) return;
    if (so.auroraObj) {
      so.scene.remove(so.auroraObj.mesh);
      so.auroraObj.mesh.geometry.dispose();
      so.auroraObj.mat.dispose();
      so.auroraObj = undefined;
    }
    if (!props.aurora || !props.aurora.cells.length) return;
    const au = buildAurora(props.aurora.cells);
    so.scene.add(au.mesh);
    so.auroraObj = au;
    au.mesh.visible = props.settings.showAurora;
  }, [props.aurora]);

  // ───────── enlace HF (TX/RX/frecuencia/grid) ─────────
  useEffect(() => {
    const so = S.current;
    if (!so) return;
    const { txCode, rxCode, linkFreq, settings } = props;
    if (!txCode || !rxCode || !props.ionosondes) {
      if (so.linkObj) {
        so.scene.remove(so.linkObj.mesh);
        so.linkObj.mesh.geometry.dispose();
        so.linkObj.mat.dispose();
        so.linkObj = undefined;
      }
      props.callbacks.onLinkResult?.(null);
      return;
    }
    const tx = props.ionosondes.stations.find((s) => s.code === txCode);
    const rx = props.ionosondes.stations.find((s) => s.code === rxCode);
    if (!tx || !rx) return;

    const key = `${txCode}|${rxCode}|${linkFreq}|${settings.exaggeration}|${so.gridState.stamp}`;
    if (key === so.lastLinkKey) return;
    so.lastLinkKey = key;

    const foAt = (ll: { lat: number; lon: number }) =>
      sampleGrid({ w: GRID_W, h: GRID_H, values: so.gridState!.fo, min: 0, max: 0 }, ll.lat, ll.lon);
    const hmAt = (ll: { lat: number; lon: number }) =>
      sampleGrid({ w: GRID_W, h: GRID_H, values: so.gridState!.hm, min: 0, max: 0 }, ll.lat, ll.lon);

    const link = computeLink(
      { lat: tx.lat, lon: tx.lon },
      { lat: rx.lat, lon: rx.lon },
      foAt,
      hmAt,
      linkFreq
    );
    props.callbacks.onLinkResult?.(link);

    if (so.linkObj) {
      so.scene.remove(so.linkObj.mesh);
      so.linkObj.mesh.geometry.dispose();
      so.linkObj.mat.dispose();
      so.linkObj = undefined;
    }
    const tube = buildLinkTube(link.points3D, settings.exaggeration);
    so.scene.add(tube.mesh);
    tube.mesh.renderOrder = 5;
    so.linkObj = tube;
  }, [props.txCode, props.rxCode, props.linkFreq, props.ionosondes, props.settings.exaggeration, props.settings.timeMode, props.settings.replayMinutes]);

  return <div ref={mountRef} className="absolute inset-0" aria-label="Escena 3D del globo ionosférico" />;
}
