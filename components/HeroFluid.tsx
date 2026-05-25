'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Real WebGL fluid-noise hero background.
 *
 * A domain-warped fbm noise field driven by time + cursor "heat". The cursor
 * pushes warm energy into the field; the shader bends the noise field around
 * those hot spots so it feels like a liquid responding to touch.
 *
 * Falls back to a static gradient when WebGL isn't available, on
 * prefers-reduced-motion, or on touch-only devices.
 */
export function HeroFluid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [usable, setUsable] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Reduced-motion users get the static fallback.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setUsable(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext('webgl', { premultipliedAlpha: true, antialias: false, alpha: true }) as WebGLRenderingContext | null) ||
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
      uniform vec2  u_mouse;     // 0..1
      uniform float u_heat;      // 0..1 — driven up by cursor movement
      uniform float u_scroll;    // 0..1 — page scroll progress through hero

      // Hash & noise helpers
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
        for (int i = 0; i < 5; i++) {
          v += a * noise(p);
          p *= 2.02;
          a *= 0.55;
        }
        return v;
      }

      // Smooth radial falloff
      float halo(vec2 uv, vec2 c, float r) {
        float d = length(uv - c);
        return smoothstep(r, 0.0, d);
      }

      void main() {
        // Square-corrected uv so circular shapes stay circular
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_res.x / u_res.y, 1.0);
        vec2 puv = (uv - 0.5) * aspect;

        // Mouse in puv space
        vec2 m = (u_mouse - 0.5) * aspect;

        float t = u_time * 0.07;

        // Two layers of fbm — second one drives the warp on the first
        vec2 q = vec2(fbm(puv * 1.2 + t),
                      fbm(puv * 1.2 - t + 5.0));
        vec2 r = vec2(fbm(puv * 1.6 + q + vec2(1.7, 9.2) + 0.15 * t),
                      fbm(puv * 1.6 + q + vec2(8.3, 2.8) + 0.126 * t));

        // Heat from the cursor warps the field harder near the mouse
        float md = length(puv - m);
        float pull = exp(-md * 1.8) * (0.35 + u_heat * 1.2);
        r += pull * (m - puv);

        float f = fbm(puv * 1.8 + r);
        f = pow(f * 0.55 + 0.55, 1.6);

        // Base brand palette — deep paper background, lime, hot red, warm gold
        vec3 paper  = vec3(0.039, 0.035, 0.031);
        vec3 lime   = vec3(0.784, 0.996, 0.239);
        vec3 hotRed = vec3(1.000, 0.361, 0.267);
        vec3 gold   = vec3(1.000, 0.761, 0.278);
        vec3 violet = vec3(0.420, 0.357, 1.000);

        // Mix in palette by fbm value
        vec3 col = paper;
        col = mix(col, gold,   smoothstep(0.05, 0.55, f) * 0.32);
        col = mix(col, hotRed, smoothstep(0.30, 0.85, f) * 0.42);
        col = mix(col, lime,   smoothstep(0.55, 1.10, f) * 0.55);

        // Lime spotlight under the cursor
        float spot = halo(puv, m, 0.42);
        col += lime * spot * (0.18 + u_heat * 0.45);

        // Cool violet floating in the upper right — depth
        col += violet * halo(puv, vec2(0.55, -0.25) * aspect, 0.55) * 0.18;

        // Vignette so the type stays anchored
        float vig = smoothstep(1.05, 0.10, length(puv));
        col *= vig;

        // Fade as we scroll past the hero
        col *= 1.0 - clamp(u_scroll, 0.0, 1.0) * 0.85;

        // Subtle grain
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
    if (!vs || !fs) {
      setUsable(false);
      return;
    }
    const prog = gl.createProgram();
    if (!prog) {
      setUsable(false);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setUsable(false);
      return;
    }

    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const aPos = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes    = gl.getUniformLocation(prog, 'u_res');
    const uTime   = gl.getUniformLocation(prog, 'u_time');
    const uMouse  = gl.getUniformLocation(prog, 'u_mouse');
    const uHeat   = gl.getUniformLocation(prog, 'u_heat');
    const uScroll = gl.getUniformLocation(prog, 'u_scroll');

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      if (!canvas || !gl) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const W = Math.floor(w * dpr);
      const H = Math.floor(h * dpr);
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
        gl.viewport(0, 0, W, H);
      }
    }
    resize();
    window.addEventListener('resize', resize);

    // Mouse + heat tracking
    let mx = 0.5;
    let my = 0.4;
    let tmx = 0.5;
    let tmy = 0.4;
    let heat = 0;
    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();

    function onMove(e: MouseEvent) {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      // Only react when over the hero
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      const nx = (e.clientX - r.left) / r.width;
      const ny = 1.0 - (e.clientY - r.top) / r.height;
      tmx = nx;
      tmy = ny;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      const speed = Math.hypot(e.clientX - lastX, e.clientY - lastY) / dt;
      heat = Math.min(1, heat + speed * 0.05);
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
    }
    window.addEventListener('mousemove', onMove, { passive: true });

    let scrollNorm = 0;
    function onScroll() {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      const h = r.height;
      // 0 when hero is fully in view, 1 when hero is fully scrolled past
      scrollNorm = Math.min(1, Math.max(0, -r.top / Math.max(1, h)));
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const start = performance.now();
    let raf = 0;
    let running = true;
    let lastFrame = start;

    function tick() {
      if (!running || !gl) return;
      const now = performance.now();
      const elapsed = (now - start) / 1000;
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;

      mx += (tmx - mx) * 0.08;
      my += (tmy - my) * 0.08;
      heat *= Math.pow(0.06, dt); // exponential decay — heat fades when still

      resize();
      if (canvas) {
        gl.uniform2f(uRes, canvas.width, canvas.height);
      }
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uHeat, heat);
      gl.uniform1f(uScroll, scrollNorm);
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
      try {
        gl.deleteProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buf);
      } catch {}
    };
  }, []);

  if (!usable) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(at 20% 30%, rgba(200,254,61,0.10) 0%, transparent 45%), radial-gradient(at 80% 80%, rgba(255,92,68,0.08) 0%, transparent 50%), radial-gradient(at 60% 100%, rgba(255,194,71,0.06) 0%, transparent 55%)',
        }}
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
