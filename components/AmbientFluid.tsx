'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { paletteFor, type Palette } from '@/lib/ambient-palette';

/**
 * Fixed-position, full-viewport WebGL fluid background.
 *
 * - Renders on every studio page (skipped on /preview/* since the demos
 *   have their own visual treatments).
 * - Each route picks its own 5-stop palette (defined in lib/ambient-palette)
 *   so scrolling slowly transitions the smoke through tones that fit the
 *   page's vibe.
 * - Cursor warms a hot spot in the field; scroll progress drives the
 *   palette walk.
 */

export function AmbientFluid() {
  const pathname = usePathname();
  const skip = !!pathname && pathname.startsWith('/preview/');

  const palette = useMemo(() => paletteFor(pathname), [pathname]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const paletteRef = useRef<Palette>(palette);
  const [usable, setUsable] = useState(true);

  // Keep palette ref fresh so the GL loop reads the latest values
  useEffect(() => {
    paletteRef.current = palette;
  }, [palette]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (skip) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setUsable(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true, preserveDrawingBuffer: true }) as WebGLRenderingContext | null) ||
      (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    if (!gl) {
      setUsable(false);
      return;
    }

    const vert = /* glsl */ `
      attribute vec2 a_pos;
      varying vec2 v_uv;
      void main() {
        v_uv = a_pos * 0.5 + 0.5;
        gl_Position = vec4(a_pos, 0.0, 1.0);
      }
    `;

    const frag = /* glsl */ `
      precision highp float;
      varying vec2 v_uv;
      uniform vec2  u_res;
      uniform float u_time;
      uniform vec2  u_mouse;
      uniform float u_heat;
      uniform float u_progress;
      uniform vec3  u_palA[5];
      uniform vec3  u_palB[5];

      vec2 hash22(vec2 p) {
        p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(dot(hash22(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)),
              dot(hash22(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x),
          mix(dot(hash22(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)),
              dot(hash22(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x),
          u.y);
      }
      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        // 4 octaves — one less than the studio default; the smoke still
        // reads soft and broken-up but costs ~20% fewer samples per frame.
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p *= 2.02;
          a *= 0.55;
        }
        return v;
      }
      float halo(vec2 uv, vec2 c, float r) {
        float d = length(uv - c);
        return smoothstep(r, 0.0, d);
      }

      // Smooth interpolation between 5 palette stops by progress t (0..1)
      vec3 pickFromStops(vec3 stops[5], float t) {
        float scaled = clamp(t, 0.0, 0.9999) * 4.0;
        int idx = int(floor(scaled));
        float frac = fract(scaled);
        // Manual unroll because WebGL 1 can't index arrays with non-const
        if (idx == 0) return mix(stops[0], stops[1], frac);
        if (idx == 1) return mix(stops[1], stops[2], frac);
        if (idx == 2) return mix(stops[2], stops[3], frac);
        return mix(stops[3], stops[4], frac);
      }

      void main() {
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
        vec2 puv = (uv - 0.5) * aspect;
        vec2 m = (u_mouse - 0.5) * aspect;

        float t = u_time * 0.06;

        vec2 q = vec2(fbm(puv * 1.1 + t),
                      fbm(puv * 1.1 - t + 5.0));
        vec2 r = vec2(fbm(puv * 1.5 + q + vec2(1.7, 9.2) + 0.12 * t),
                      fbm(puv * 1.5 + q + vec2(8.3, 2.8) + 0.10 * t));

        float md = length(puv - m);
        float pull = exp(-md * 1.6) * (0.30 + u_heat * 1.0);
        r += pull * (m - puv);

        float f = fbm(puv * 1.7 + r);
        f = pow(f * 0.55 + 0.55, 1.55);

        vec3 paper = vec3(0.039, 0.035, 0.031);
        vec3 cA = pickFromStops(u_palA, u_progress);
        vec3 cB = pickFromStops(u_palB, u_progress);

        vec3 col = paper;
        col = mix(col, cA, smoothstep(0.05, 0.55, f) * 0.32);
        col = mix(col, cB, smoothstep(0.30, 0.85, f) * 0.42);
        col = mix(col, cA, smoothstep(0.55, 1.10, f) * 0.55);

        float spot = halo(puv, m, 0.40);
        col += cA * spot * (0.16 + u_heat * 0.40);

        float vig = smoothstep(1.10, 0.10, length(puv));
        col *= vig;

        float g = fract(sin(dot(uv * u_res, vec2(12.9898, 78.233))) * 43758.5453);
        col += (g - 0.5) * 0.025;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type: number, src: string) {
      if (!gl) return null;
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    }

    const vs = compile(gl.VERTEX_SHADER, vert);
    const fs = compile(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) { setUsable(false); return; }
    const prog = gl.createProgram();
    if (!prog) { setUsable(false); return; }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { setUsable(false); return; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes      = gl.getUniformLocation(prog, 'u_res');
    const uTime     = gl.getUniformLocation(prog, 'u_time');
    const uMouse    = gl.getUniformLocation(prog, 'u_mouse');
    const uHeat     = gl.getUniformLocation(prog, 'u_heat');
    const uProgress = gl.getUniformLocation(prog, 'u_progress');
    const uPalA     = gl.getUniformLocation(prog, 'u_palA');
    const uPalB     = gl.getUniformLocation(prog, 'u_palB');

    // Smoothed palette — interpolates toward the current pathname's palette
    const smoothA: number[] = paletteRef.current.a.flat();
    const smoothB: number[] = paletteRef.current.b.flat();

    // Cap to 1.25× so a retina laptop renders ~6 MP instead of ~14 MP
    // per frame. The smoke is intentionally soft and blurry — the
    // extra resolution is invisible but the perf cost is huge.
    let dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    function resize() {
      if (!canvas || !gl) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const W = Math.floor(w * dpr);
      const H = Math.floor(h * dpr);
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        gl.viewport(0, 0, W, H);
      }
    }
    resize();
    window.addEventListener('resize', resize);

    // Pause the loop when the tab is hidden — saves battery and reduces
    // background CPU on inactive tabs.
    let docVisible = !document.hidden;
    function onVisibility() { docVisible = !document.hidden; }
    document.addEventListener('visibilitychange', onVisibility);

    let mx = 0.5, my = 0.4, tmx = 0.5, tmy = 0.4;
    let heat = 0;
    let lastX = 0, lastY = 0, lastT = performance.now();
    function onMove(e: MouseEvent) {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width;
      const ny = 1.0 - (e.clientY - r.top) / r.height;
      tmx = nx;
      tmy = ny;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const speed = Math.hypot(e.clientX - lastX, e.clientY - lastY) / dt;
      heat = Math.min(1, heat + speed * 0.04);
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    }
    window.addEventListener('mousemove', onMove, { passive: true });

    let progress = 0;
    let tProgress = 0;
    function onScroll() {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      tProgress = Math.min(1, Math.max(0, window.scrollY / max));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const start = performance.now();
    let raf = 0;
    let running = true;
    let lastFrame = start;

    // Sample the currently-dominant palette color at the given progress
    // (mirrors the GLSL pickFromStops). Used to publish a CSS var so other
    // UI (cursor trail, etc.) can match the smoke.
    function publishCurrentColor() {
      // Match the GLSL pickFromStops using the JS-side smoothed palette
      const scaled = Math.max(0, Math.min(0.9999, progress)) * 4;
      const idx = Math.floor(scaled);
      const frac = scaled - idx;
      const a0 = idx * 3;
      const a1 = Math.min(4, idx + 1) * 3;
      const r = smoothA[a0 + 0] + (smoothA[a1 + 0] - smoothA[a0 + 0]) * frac;
      const g = smoothA[a0 + 1] + (smoothA[a1 + 1] - smoothA[a0 + 1]) * frac;
      const b = smoothA[a0 + 2] + (smoothA[a1 + 2] - smoothA[a0 + 2]) * frac;
      const R = Math.round(Math.max(0, Math.min(1, r)) * 255);
      const G = Math.round(Math.max(0, Math.min(1, g)) * 255);
      const B = Math.round(Math.max(0, Math.min(1, b)) * 255);
      document.documentElement.style.setProperty('--ambient-color', `${R} ${G} ${B}`);
    }

    // ~30fps target. The smoke moves slowly, so halving the draw rate is
    // imperceptible visually but halves the GPU + JS budget — meaning the
    // browser composite thread has more headroom for scroll.
    const FRAME_INTERVAL = 1000 / 30;
    let nextFrameAt = start;

    function tick() {
      if (!running || !gl) return;
      if (!docVisible) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const now = performance.now();
      if (now < nextFrameAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      nextFrameAt = now + FRAME_INTERVAL;
      const elapsed = (now - start) / 1000;
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;

      // Ease cursor + scroll
      mx += (tmx - mx) * 0.08;
      my += (tmy - my) * 0.08;
      progress += (tProgress - progress) * 0.04;  // slow walk
      heat *= Math.pow(0.06, dt);

      // Ease palette toward current pathname's palette
      const targetA = paletteRef.current.a;
      const targetB = paletteRef.current.b;
      const lerpRate = 0.02;
      for (let i = 0; i < 5; i++) {
        const ta = targetA[i];
        const tb = targetB[i];
        smoothA[i * 3 + 0] += (ta[0] - smoothA[i * 3 + 0]) * lerpRate;
        smoothA[i * 3 + 1] += (ta[1] - smoothA[i * 3 + 1]) * lerpRate;
        smoothA[i * 3 + 2] += (ta[2] - smoothA[i * 3 + 2]) * lerpRate;
        smoothB[i * 3 + 0] += (tb[0] - smoothB[i * 3 + 0]) * lerpRate;
        smoothB[i * 3 + 1] += (tb[1] - smoothB[i * 3 + 1]) * lerpRate;
        smoothB[i * 3 + 2] += (tb[2] - smoothB[i * 3 + 2]) * lerpRate;
      }

      // Publish the dominant color so other components can sync
      publishCurrentColor();

      resize();
      if (canvas) gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uHeat, heat);
      gl.uniform1f(uProgress, progress);
      gl.uniform3fv(uPalA, new Float32Array(smoothA));
      gl.uniform3fv(uPalB, new Float32Array(smoothB));
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      try {
        gl.deleteProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buf);
      } catch {}
    };
  }, [skip]);

  if (skip) return null;

  if (!usable) {
    return (
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          zIndex: 0,
          background:
            'radial-gradient(at 20% 20%, rgba(200,254,61,0.14) 0%, transparent 45%), radial-gradient(at 80% 60%, rgba(255,92,68,0.10) 0%, transparent 50%), radial-gradient(at 40% 100%, rgba(255,194,71,0.08) 0%, transparent 55%), #0A0908',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}
