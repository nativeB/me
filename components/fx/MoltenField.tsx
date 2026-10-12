"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** Where the orb of heat sits, in 0..1 of the canvas (y measured from the bottom). */
  center?: [number, number];
  /** Noise frequency. Higher reads as finer, busier flow. */
  scale?: number;
  /** Orb radius relative to the canvas' short side. */
  radius?: number;
  className?: string;
};

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Domain-warped fbm: noise fed back into its own coordinates three times
// reads as slow, molten flow. The pointer bends the domain toward itself
// and adds heat, so the field leans into the cursor like a fluid.
const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_energy;
uniform vec2 u_center;
uniform float u_scale;
uniform float u_radius;
uniform vec3 u_deep;
uniform vec3 u_mid;
uniform vec3 u_hot;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 r = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = r * p * 2.02 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float s = min(u_res.x, u_res.y);
  vec2 p = (frag - 0.5 * u_res) / s;
  vec2 m = (u_mouse - 0.5 * u_res) / s;
  float t = u_time * 0.05;

  vec2 dm = p - m;
  float md = length(dm);
  p -= dm * 0.32 * exp(-md * md * 4.0) * u_energy;

  vec2 sp = p * u_scale;
  vec2 q = vec2(fbm(sp + vec2(0.0, t)), fbm(sp + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(sp + 3.2 * q + vec2(1.7, 9.2) + 1.4 * t),
    fbm(sp + 3.2 * q + vec2(8.3, 2.8) - 1.1 * t)
  );
  float f = fbm(sp + 3.6 * r);

  vec2 c = (u_center - 0.5) * u_res / s + 0.07 * vec2(sin(t * 3.7), cos(t * 2.9));
  float orb = 1.0 - smoothstep(0.0, u_radius, length((p - c) * vec2(0.82, 1.0)));
  float heat = f * f * 2.1 * orb + 0.7 * exp(-md * md * 7.0) * u_energy * f;
  heat = clamp(heat * (0.85 + 0.3 * length(r)), 0.0, 1.0);

  vec3 col = mix(u_deep, u_mid, smoothstep(0.1, 0.5, heat));
  col = mix(col, u_hot, smoothstep(0.52, 0.95, heat));
  float alpha = smoothstep(0.03, 0.36, heat);

  float dither = (hash(frag + fract(u_time)) - 0.5) / 255.0;
  gl_FragColor = vec4(col * alpha + dither, alpha);
}
`;

// Fraction of CSS pixels rendered. The field is all soft gradients, so a
// half-resolution buffer upscaled by the compositor is indistinguishable
// and costs a quarter of the fragments.
const RESOLUTION = 0.5;

function readColor(styles: CSSStyleDeclaration, name: string): [number, number, number] {
  const hex = styles.getPropertyValue(name).trim().replace("#", "");
  const n = parseInt(hex.length === 3 ? hex.replace(/./g, "$&$&") : hex, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/**
 * A slow, molten heat field in the accent's own colour ramp, rendered with a
 * single fragment shader. It leans toward the pointer, idles when off screen
 * or in a hidden tab, renders one still frame under reduced motion, and falls
 * back to a CSS glow where WebGL is unavailable.
 */
export default function MoltenField({
  center = [0.7, 0.45],
  scale = 1.5,
  radius = 0.95,
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cx, cy] = center;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      canvas.dataset.fallback = "true";
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      canvas.dataset.fallback = "true";
      return;
    }
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uRes = u("u_res");
    const uTime = u("u_time");
    const uMouse = u("u_mouse");
    const uEnergy = u("u_energy");
    const uDeep = u("u_deep");
    const uMid = u("u_mid");
    const uHot = u("u_hot");
    gl.uniform2f(u("u_center"), cx, cy);
    gl.uniform1f(u("u_scale"), scale);
    gl.uniform1f(u("u_radius"), radius);

    const applyColors = () => {
      const styles = getComputedStyle(document.documentElement);
      gl.uniform3fv(uDeep, readColor(styles, "--field-deep"));
      gl.uniform3fv(uMid, readColor(styles, "--field-mid"));
      gl.uniform3fv(uHot, readColor(styles, "--field-hot"));
    };
    applyColors();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let width = 1;
    let height = 1;
    // Pointer in buffer pixels (y up), eased toward its target every frame.
    const mouse = { x: 0, y: 0, tx: 0, ty: 0, energy: 0, target: 0 };
    let raf = 0;
    let visible = false;
    let start = performance.now();
    // A fixed offset means the first frame is already a developed pattern.
    const timeOffset = 40;

    const draw = (time: number) => {
      gl.uniform1f(uTime, timeOffset + time);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uEnergy, mouse.energy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width * RESOLUTION));
      height = Math.max(1, Math.round(rect.height * RESOLUTION));
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uRes, width, height);
      if (!mouse.tx && !mouse.ty) {
        mouse.x = mouse.tx = width * cx;
        mouse.y = mouse.ty = height * cy;
      }
      if (reduce || !visible) draw(0);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      // Ease the pointer so the fluid follows with weight, and let the
      // energy decay so the field calms down when the cursor rests.
      mouse.x += (mouse.tx - mouse.x) * 0.06;
      mouse.y += (mouse.ty - mouse.y) * 0.06;
      mouse.energy += (mouse.target - mouse.energy) * 0.05;
      mouse.target *= 0.985;
      draw((now - start) / 1000);
      raf = requestAnimationFrame(frame);
    };

    const play = () => {
      if (reduce || raf || !visible || document.hidden) return;
      raf = requestAnimationFrame(frame);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!visible || e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) * RESOLUTION;
      mouse.ty = (rect.bottom - e.clientY) * RESOLUTION;
      mouse.target = 1;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // A fixed canvas (the contact curtain) always "intersects" the viewport,
    // so it can name an in-flow ancestor whose visibility stands in for its own.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
    });
    io.observe(canvas.closest<HTMLElement>("[data-field-root]") ?? canvas);

    const onVisibility = () => play();
    document.addEventListener("visibilitychange", onVisibility);

    // Theme changes swap the colour ramp in place.
    const onTheme = () => {
      applyColors();
      if (reduce) draw(0);
    };
    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", onTheme);

    if (finePointer && !reduce) window.addEventListener("pointermove", onPointerMove, { passive: true });

    resize();
    start = performance.now();
    canvas.dataset.ready = "true";

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      scheme.removeEventListener("change", onTheme);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [cx, cy, scale, radius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none block h-full w-full data-[fallback=true]:bg-[radial-gradient(60%_60%_at_70%_55%,var(--field-mid),transparent_70%)] data-[fallback=true]:opacity-40 ${className}`}
    />
  );
}
