"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type ContactSignal =
  | { kind: "activation"; level: number }
  | { kind: "pulse" }
  | { kind: "transmit" };

/** Dispatch a signal that the ContactCore scene reacts to. */
export function emitContact(detail: ContactSignal) {
  window.dispatchEvent(new CustomEvent("mba:contact", { detail }));
}

/**
 * Simplified "connection core" for the contact section: nested wireframe
 * icosahedrons, orbital rings, orbiting nodes with edges + packets, and a
 * drifting particle fog. Reacts to form activity (focus/typing/submit) via
 * the `mba:contact` event, and to accent changes via `themechange`.
 */
export default function ContactCore() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const css = (n: string, f: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(n).trim() || f;
    const small = window.innerWidth < 768;

    const accent = new THREE.Color(css("--accent", "#a160c5"));
    const lav = new THREE.Color(css("--color-secondary-light", "#8c93cf"));
    const bg = new THREE.Color("#060815");

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
    scene.fog = new THREE.Fog(bg, 18, 80);
    const camera = new THREE.PerspectiveCamera(50, host.clientWidth / host.clientHeight, 0.1, 200);
    camera.position.set(0, 1.4, 16);
    camera.lookAt(0, 0, 0);

    const coreGroup = new THREE.Group();
    scene.add(coreGroup);
    const innerCore = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(0.95, 1)),
      new THREE.LineBasicMaterial({ color: accent.clone(), transparent: true, opacity: 0.85 })
    );
    const outerCore = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.6, 0)),
      new THREE.LineBasicMaterial({ color: lav.clone(), transparent: true, opacity: 0.35 })
    );
    const coreGlow = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 24, 24),
      new THREE.MeshBasicMaterial({
        color: accent.clone(),
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    coreGroup.add(innerCore, outerCore, coreGlow);

    const ringSpecs = [
      { radius: 2.6, tilt: Math.PI / 2, spin: 0.1, tube: 0.012, color: accent, opacity: 0.55 },
      { radius: 3.5, tilt: Math.PI / 2.4, spin: -0.16, tube: 0.009, color: lav, opacity: 0.4 },
      { radius: 4.6, tilt: Math.PI / 1.85, spin: 0.07, tube: 0.007, color: accent, opacity: 0.32 },
    ];
    const rings = ringSpecs.map((s) => {
      const r = new THREE.Mesh(
        new THREE.TorusGeometry(s.radius, s.tube, 12, 140),
        new THREE.MeshBasicMaterial({ color: s.color.clone(), transparent: true, opacity: s.opacity })
      );
      r.rotation.x = s.tilt;
      r.userData = s;
      scene.add(r);
      return r;
    });

    const NODE_COUNT = small ? 9 : 14;
    type N = {
      group: THREE.Group;
      halo: THREE.Mesh;
      mesh: THREE.Mesh;
      edge: THREE.Line;
      baseAngle: number;
      radius: number;
      yOff: number;
      speed: number;
    };
    const nodes: N[] = [];
    const nodeGeom = new THREE.SphereGeometry(0.07, 10, 10);
    const haloGeom = new THREE.SphereGeometry(0.18, 10, 10);
    for (let i = 0; i < NODE_COUNT; i++) {
      const color = i % 3 === 0 ? accent.clone() : lav.clone();
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(nodeGeom, new THREE.MeshBasicMaterial({ color: color.clone() }));
      const halo = new THREE.Mesh(
        haloGeom,
        new THREE.MeshBasicMaterial({
          color: color.clone(),
          transparent: true,
          opacity: 0.22,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      group.add(mesh, halo);
      scene.add(group);
      const edge = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(), new THREE.Vector3()]),
        new THREE.LineBasicMaterial({
          color: color.clone(),
          transparent: true,
          opacity: 0.15,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      scene.add(edge);
      nodes.push({
        group,
        mesh,
        halo,
        edge,
        baseAngle: (i / NODE_COUNT) * Math.PI * 2 + Math.random() * 0.4,
        radius: 2 + Math.random() * 3,
        yOff: (Math.random() - 0.5) * 1.6,
        speed: 0.06 + Math.random() * 0.08,
      });
    }

    const FOG = small ? 120 : 220;
    const fogGeom = new THREE.BufferGeometry();
    const fogPos = new Float32Array(FOG * 3);
    for (let i = 0; i < FOG; i++) {
      fogPos[i * 3] = (Math.random() - 0.5) * 26;
      fogPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      fogPos[i * 3 + 2] = (Math.random() - 0.5) * 18 - 4;
    }
    fogGeom.setAttribute("position", new THREE.BufferAttribute(fogPos, 3));
    const fogMat = new THREE.PointsMaterial({
      color: lav.clone(),
      size: 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fog = new THREE.Points(fogGeom, fogMat);
    scene.add(fog);

    // ---- State / signals ----------------------------------------------------
    let t = 0, activation = 0, activationTarget = 0, transmission = 0, pulseShot = 0;
    let pTX = 0, pTY = 0, pX = 0, pY = 0;
    const onPointer = (e: PointerEvent) => {
      pTX = (e.clientX / window.innerWidth - 0.5) * 2;
      pTY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    const transmitTimers: ReturnType<typeof setTimeout>[] = [];
    const onSignal = (e: Event) => {
      const d = (e as CustomEvent<ContactSignal>).detail;
      if (d.kind === "activation") activationTarget = Math.max(0, Math.min(1, d.level));
      else if (d.kind === "pulse") pulseShot = Math.min(1, pulseShot + 0.3);
      else if (d.kind === "transmit") {
        transmission = 1;
        activationTarget = 1;
        transmitTimers.push(setTimeout(() => (activationTarget = 0.4), 1800));
        transmitTimers.push(setTimeout(() => (activationTarget = 0), 3000));
      }
    };
    window.addEventListener("mba:contact", onSignal);

    const onTheme = () => {
      accent.set(css("--accent", "#a160c5"));
      (innerCore.material as THREE.LineBasicMaterial).color.copy(accent);
      (coreGlow.material as THREE.MeshBasicMaterial).color.copy(accent);
      rings.forEach((r, i) => ((r.material as THREE.MeshBasicMaterial).color.copy(i === 1 ? lav : accent)));
      nodes.forEach((n, i) => {
        const c = i % 3 === 0 ? accent : lav;
        (n.mesh.material as THREE.MeshBasicMaterial).color.copy(c);
        (n.halo.material as THREE.MeshBasicMaterial).color.copy(c);
        (n.edge.material as THREE.LineBasicMaterial).color.copy(c);
      });
    };
    window.addEventListener("themechange", onTheme);

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

    const fp = fogGeom.attributes.position.array as Float32Array;

    function loop() {
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }
      t += 0.012;
      pX += (pTX - pX) * 0.06;
      pY += (pTY - pY) * 0.06;
      activation += (activationTarget - activation) * 0.07;
      transmission *= 0.94;
      pulseShot *= 0.88;
      const energy = Math.min(1, activation + pulseShot + transmission * 2);
      const rot = transmission * 2;

      coreGroup.rotation.y = t * (0.18 + rot * 0.4);
      coreGroup.rotation.x = Math.sin(t * 0.2) * 0.1 + pY * 0.08;
      (innerCore.material as THREE.LineBasicMaterial).opacity = 0.6 + energy * 0.35;
      (outerCore.material as THREE.LineBasicMaterial).opacity = 0.25 + energy * 0.35;
      (coreGlow.material as THREE.MeshBasicMaterial).opacity = 0.18 + energy * 0.35 + Math.sin(t * 2.4) * 0.04;
      coreGlow.scale.setScalar(1 + Math.sin(t * 2.4) * 0.08 + transmission * 0.6);

      rings.forEach((r) => {
        const s = r.userData as (typeof ringSpecs)[number];
        r.rotation.z += s.spin * 0.012 * (1 + rot * 1.6);
        (r.material as THREE.MeshBasicMaterial).opacity = s.opacity + energy * 0.25;
      });

      nodes.forEach((n, i) => {
        const a = n.baseAngle + t * n.speed * (1 + rot * 0.8);
        const r = n.radius + Math.sin(t * 0.6 + i) * 0.08;
        n.group.position.set(Math.cos(a) * r, n.yOff + Math.sin(t * 0.7 + i) * 0.12, Math.sin(a) * r);
        const pos = n.edge.geometry.attributes.position.array as Float32Array;
        pos[3] = n.group.position.x;
        pos[4] = n.group.position.y;
        pos[5] = n.group.position.z;
        n.edge.geometry.attributes.position.needsUpdate = true;
        (n.edge.material as THREE.LineBasicMaterial).opacity = 0.12 + energy * 0.45;
        (n.halo.material as THREE.MeshBasicMaterial).opacity = 0.18 + energy * 0.3;
        n.halo.scale.setScalar(1 + energy * 0.5);
      });

      for (let i = 0; i < FOG; i++) {
        fp[i * 3 + 1] += 0.003 + energy * 0.005;
        if (fp[i * 3 + 1] > 8) fp[i * 3 + 1] = -8;
      }
      fogGeom.attributes.position.needsUpdate = true;
      fogMat.opacity = 0.45 + energy * 0.2;

      camera.position.x += (pX * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (pY * 0.4 + 1.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

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
      transmitTimers.forEach(clearTimeout);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("mba:contact", onSignal);
      window.removeEventListener("themechange", onTheme);
      window.removeEventListener("resize", onResize);
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
  }, []);

  return <div className="contact-canvas-host" ref={hostRef} aria-hidden="true" />;
}
