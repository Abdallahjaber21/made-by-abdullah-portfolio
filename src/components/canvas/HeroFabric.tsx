"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Simplified, mobile-friendly distillation of the original Compute-Fabric
 * hero scene: a sine-displaced point manifold + sparse line grid, a floating
 * wireframe "core" with orbiting service nodes, and a few request packets.
 * Accent-reactive (listens for the `themechange` event) and paused when the
 * hero is off-screen or the tab is hidden. Skipped under reduced-motion.
 */
export default function HeroFabric() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const css = (n: string, f: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(n).trim() || f;

    const small = window.innerWidth < 768;
    const GRID = small ? 26 : 40;
    const SPAN = 80;
    const STEP = SPAN / GRID;
    const HALF = SPAN / 2;

    const accent = new THREE.Color(css("--accent", "#a160c5"));
    const lav = new THREE.Color(css("--color-secondary-light", "#8c93cf"));
    const hot = accent.clone().lerp(new THREE.Color("#ffffff"), 0.3);
    const bg = new THREE.Color(css("--bg", "#0d0f24"));

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !small,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      // No WebGL available — the CSS gradient background stands in for the scene.
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));
    renderer.setSize(host.clientWidth, host.clientHeight);
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(bg, 16, 70);

    const camera = new THREE.PerspectiveCamera(
      58,
      host.clientWidth / host.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 4.2, 13);
    camera.lookAt(0, 1, 0);

    // ---- Fabric: points + line grid ----------------------------------------
    const fabricGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(GRID * GRID * 3);
    const colors = new Float32Array(GRID * GRID * 3);
    let p = 0;
    for (let i = 0; i < GRID; i++) {
      for (let j = 0; j < GRID; j++) {
        positions[p * 3] = -HALF + i * STEP;
        positions[p * 3 + 1] = 0;
        positions[p * 3 + 2] = -HALF + j * STEP;
        colors[p * 3] = accent.r;
        colors[p * 3 + 1] = accent.g;
        colors[p * 3 + 2] = accent.b;
        p++;
      }
    }
    fabricGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    fabricGeom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pointMat = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fabric = new THREE.Points(fabricGeom, pointMat);
    scene.add(fabric);

    const NTH = small ? 4 : 3;
    const lineSegs: number[] = [];
    for (let i = 0; i < GRID; i += NTH)
      for (let j = 0; j < GRID - 1; j++) lineSegs.push(i * GRID + j, i * GRID + j + 1);
    for (let j = 0; j < GRID; j += NTH)
      for (let i = 0; i < GRID - 1; i++) lineSegs.push(i * GRID + j, (i + 1) * GRID + j);
    const lineGeom = new THREE.BufferGeometry();
    const linePos = new Float32Array(lineSegs.length * 3);
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    const lineMat = new THREE.LineBasicMaterial({
      color: lav.clone(),
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeom, lineMat);
    scene.add(lines);

    // ---- Hot spots ----------------------------------------------------------
    const HOTSPOTS = small ? 6 : 10;
    const hotspots = Array.from({ length: HOTSPOTS }, () => {
      const gi = Math.floor(6 + Math.random() * (GRID - 12));
      const gj = Math.floor(6 + Math.random() * (GRID - 12));
      return {
        x: -HALF + gi * STEP,
        z: -HALF + gj * STEP,
        phase: Math.random() * Math.PI * 2,
        freq: 0.6 + Math.random() * 0.7,
        intensity: 0.6 + Math.random() * 0.4,
      };
    });

    // ---- Floating topology --------------------------------------------------
    const topology = new THREE.Group();
    topology.position.set(0, 4.6, 0);
    scene.add(topology);

    const core = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.DodecahedronGeometry(0.85, 0)),
      new THREE.LineBasicMaterial({ color: accent.clone(), transparent: true, opacity: 0.8 })
    );
    topology.add(core);

    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 20, 20),
      new THREE.MeshBasicMaterial({
        color: accent.clone(),
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    topology.add(coreGlow);

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.5, 0.012, 12, 120),
      new THREE.MeshBasicMaterial({ color: accent.clone(), transparent: true, opacity: 0.5 })
    );
    ring.rotation.x = Math.PI / 2;
    topology.add(ring);

    const NODES = small ? 5 : 8;
    type SvcNode = {
      group: THREE.Group;
      halo: THREE.Mesh;
      mesh: THREE.Mesh;
      edge: THREE.Line;
      baseAngle: number;
      radius: number;
      height: number;
      orbit: number;
    };
    const services: SvcNode[] = [];
    for (let i = 0; i < NODES; i++) {
      const angle = (i / NODES) * Math.PI * 2;
      const radius = 4.0 + (i % 2) * 0.4;
      const height = ((i % 4) - 1.5) * 0.4;
      const color = i % 3 === 0 ? accent.clone() : lav.clone();
      const group = new THREE.Group();
      group.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 12, 12),
        new THREE.MeshBasicMaterial({ color })
      );
      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 12, 12),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.22,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      group.add(mesh, halo);
      const edge = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), group.position.clone()]),
        new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity: 0.25,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      topology.add(group, edge);
      services.push({ group, mesh, halo, edge, baseAngle: angle, radius, height, orbit: 0.08 + (i % 3) * 0.03 });
    }

    // ---- Request packets ----------------------------------------------------
    const PACKETS = small ? 8 : 16;
    const packetGeom = new THREE.BufferGeometry();
    const packetPos = new Float32Array(PACKETS * 3);
    packetGeom.setAttribute("position", new THREE.BufferAttribute(packetPos, 3));
    const packetMat = new THREE.PointsMaterial({
      color: accent.clone(),
      size: 0.22,
      sizeAttenuation: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: dotTexture(),
    });
    const packets = new THREE.Points(packetGeom, packetMat);
    scene.add(packets);
    const rc = () => [
      Math.floor(2 + Math.random() * (GRID - 4)),
      Math.floor(2 + Math.random() * (GRID - 4)),
    ];
    type Pk = { ax: number; az: number; bx: number; bz: number; prog: number; speed: number };
    const newPacket = (prog = 0): Pk => {
      const [ax, az] = rc();
      const [bx, bz] = rc();
      return { ax, az, bx, bz, prog, speed: 0.003 + Math.random() * 0.004 };
    };
    const pkState: Pk[] = Array.from({ length: PACKETS }, () => newPacket(Math.random()));

    // ---- Pointer + scroll ---------------------------------------------------
    let pTX = 0, pTY = 0, pX = 0, pY = 0, scrollProg = 0;
    const onPointer = (e: PointerEvent) => {
      pTX = (e.clientX / window.innerWidth - 0.5) * 2;
      pTY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scrollProg = (window.scrollY || 0) / window.innerHeight;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    const waveAt = (x: number, z: number, t: number, d: number) =>
      Math.sin(x * 0.18 + t * 0.7) * 0.35 +
      Math.cos(z * 0.22 + t * 0.55) * 0.3 +
      Math.sin(d * 0.18 - t * 0.8) * 0.45 +
      Math.sin((x + z) * 0.13 + t * 0.4) * 0.22;

    // ---- Theme reactivity ---------------------------------------------------
    const onTheme = () => {
      accent.set(css("--accent", "#a160c5"));
      hot.copy(accent).lerp(new THREE.Color("#ffffff"), 0.3);
      pointMat.color.copy(accent);
      packetMat.color.copy(accent);
      (core.material as THREE.LineBasicMaterial).color.copy(accent);
      (coreGlow.material as THREE.MeshBasicMaterial).color.copy(accent);
      (ring.material as THREE.MeshBasicMaterial).color.copy(accent);
      services.forEach((s, i) => {
        if (i % 3 === 0) {
          (s.mesh.material as THREE.MeshBasicMaterial).color.copy(accent);
          (s.halo.material as THREE.MeshBasicMaterial).color.copy(accent);
          (s.edge.material as THREE.LineBasicMaterial).color.copy(accent);
        }
      });
    };
    window.addEventListener("themechange", onTheme);

    // ---- Loop (paused off-screen / hidden) ----------------------------------
    let t = 0;
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) loop();
      },
      { threshold: 0 }
    );
    io.observe(host);

    const fpArr = fabricGeom.attributes.position.array as Float32Array;
    const fcArr = fabricGeom.attributes.color.array as Float32Array;
    const lpArr = lineGeom.attributes.position.array as Float32Array;
    const ppArr = packetGeom.attributes.position.array as Float32Array;

    function loop() {
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }
      t += 0.012;
      pX += (pTX - pX) * 0.06;
      pY += (pTY - pY) * 0.06;
      const intensity = 1 + scrollProg * 1.2;

      let k = 0;
      for (let i = 0; i < GRID; i++) {
        const x = -HALF + i * STEP;
        for (let j = 0; j < GRID; j++) {
          const z = -HALF + j * STEP;
          const d = Math.sqrt(x * x + z * z);
          fpArr[k * 3 + 1] = waveAt(x, z, t, d) * intensity;
          let h = 0;
          for (let s = 0; s < hotspots.length; s++) {
            const hs = hotspots[s];
            const dx = x - hs.x, dz = z - hs.z, dd = dx * dx + dz * dz;
            if (dd < 16) h += Math.max(0, 1 - dd / 16) * ((Math.sin(t * hs.freq + hs.phase) * 0.5 + 0.5) * hs.intensity);
          }
          const m = Math.min(1, h);
          fcArr[k * 3] = accent.r * (1 - m) + hot.r * m;
          fcArr[k * 3 + 1] = accent.g * (1 - m) + hot.g * m;
          fcArr[k * 3 + 2] = accent.b * (1 - m) + hot.b * m;
          k++;
        }
      }
      fabricGeom.attributes.position.needsUpdate = true;
      fabricGeom.attributes.color.needsUpdate = true;

      for (let s = 0; s < lineSegs.length; s++) {
        const idx = lineSegs[s];
        lpArr[s * 3] = fpArr[idx * 3];
        lpArr[s * 3 + 1] = fpArr[idx * 3 + 1];
        lpArr[s * 3 + 2] = fpArr[idx * 3 + 2];
      }
      lineGeom.attributes.position.needsUpdate = true;

      for (let i = 0; i < PACKETS; i++) {
        const s = pkState[i];
        s.prog += s.speed;
        if (s.prog >= 1) pkState[i] = newPacket(0);
        const cur = pkState[i];
        const cx = cur.ax + (cur.bx - cur.ax) * cur.prog;
        const cz = cur.az + (cur.bz - cur.az) * cur.prog;
        const wx = -HALF + cx * STEP;
        const wz = -HALF + cz * STEP;
        ppArr[i * 3] = wx;
        ppArr[i * 3 + 1] = waveAt(wx, wz, t, Math.sqrt(wx * wx + wz * wz)) * intensity + 0.1;
        ppArr[i * 3 + 2] = wz;
      }
      packetGeom.attributes.position.needsUpdate = true;

      // Topology
      topology.rotation.y = t * 0.16 + pX * 0.22;
      topology.rotation.x = Math.sin(t * 0.13) * 0.06 + pY * 0.1;
      core.rotation.y = -t * 0.4;
      core.rotation.x = t * 0.25;
      ring.rotation.z = t * 0.16;
      services.forEach((s) => {
        const a = s.baseAngle + t * s.orbit;
        s.group.position.set(Math.cos(a) * s.radius, s.height + Math.sin(t * 0.8) * 0.05, Math.sin(a) * s.radius);
        const pos = s.edge.geometry.attributes.position.array as Float32Array;
        pos[3] = s.group.position.x;
        pos[4] = s.group.position.y;
        pos[5] = s.group.position.z;
        s.edge.geometry.attributes.position.needsUpdate = true;
      });

      const dissolve = Math.min(1, scrollProg * 0.85);
      topology.position.y = 4.6 + scrollProg * 5;
      topology.scale.setScalar(Math.max(0.001, 1 - dissolve * 0.7));
      const pulse = 0.5 + Math.sin(t * 2.4) * 0.18;
      coreGlow.scale.setScalar(1 + pulse * 0.3);
      (coreGlow.material as THREE.MeshBasicMaterial).opacity = (0.16 + pulse * 0.1) * (1 - dissolve);

      // Camera descent + parallax
      camera.position.x += (pX * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (4.2 - scrollProg * 3 + pY * 0.3 - camera.position.y) * 0.04;
      camera.position.z += (13 - scrollProg * 7 - camera.position.z) * 0.04;
      camera.lookAt(0, 1 - scrollProg * 1.4, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    }
    loop();

    const onResize = () => {
      renderer.setSize(host.clientWidth, host.clientHeight);
      camera.aspect = host.clientWidth / host.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);
    const onVis = () => {
      if (!document.hidden && visible && !raf) loop();
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", onTheme);
      document.removeEventListener("visibilitychange", onVis);
      renderer.dispose();
      scene.traverse((o) => {
        const any = o as unknown as { geometry?: THREE.BufferGeometry; material?: THREE.Material | THREE.Material[] };
        any.geometry?.dispose?.();
        const mat = any.material;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose?.();
      });
      if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
    };

    function dotTexture() {
      const c = document.createElement("canvas");
      c.width = c.height = 64;
      const g = c.getContext("2d")!;
      const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, "rgba(255,255,255,1)");
      grad.addColorStop(0.4, "rgba(255,255,255,0.6)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, 64, 64);
      const tex = new THREE.CanvasTexture(c);
      tex.minFilter = THREE.LinearFilter;
      return tex;
    }
  }, []);

  return <div className="hero-bg" ref={hostRef} aria-hidden="true" />;
}
