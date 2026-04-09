"use client";

import { useEffect, useRef } from "react";

const DENSITY = "  .:-=+*#%@";
const TARGET_FPS = 20;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function fract(value: number) {
  return value - Math.floor(value);
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function rotate(x: number, y: number, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: x * cos - y * sin,
    y: x * sin + y * cos,
  };
}

function renderFrame(cols: number, rows: number, time: number) {
  let output = "";
  const aspect = cols / rows;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const nx = ((col + 0.5) / cols - 0.5) * 2 * aspect;
      const ny = ((row + 0.5) / rows - 0.5) * 2;
      const radius = Math.hypot(nx, ny);

      let point = rotate(
        nx,
        ny,
        0.45 * Math.sin(time * 0.62 + radius * 2.6) * Math.min(radius, 1.35),
      );
      point = rotate(point.x, point.y, time * 0.18);

      const scale = 0.75 + 0.55 * ((Math.sin(time * 0.8) + 1) / 2);
      const tileX = fract(point.x * scale + 1.5) - 0.5;
      const tileY = fract(point.y * scale + 1.5) - 0.5;
      const wobble = 0.26 + 0.18 * ((Math.sin(time * 0.7 + nx * 1.1) + 1) / 2);
      const distance = Math.hypot(tileX, tileY) - wobble;

      const wave = Math.sin(10 * distance - time * 1.7);
      const band = smoothstep(-0.22, 0.88, wave);
      const centerFade = 1 - smoothstep(0.9, 1.7, radius);
      const rightBias = smoothstep(-0.2, 1.1, nx);
      const value = clamp(
        (1 - Math.exp(-3 * Math.abs(distance))) * band * centerFade * (0.45 + 0.55 * rightBias),
        0,
        1,
      );

      const index = Math.floor(value * (DENSITY.length - 1));
      output += DENSITY[index];
    }

    output += "\n";
  }

  return output;
}

function measureGrid(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const fontSize = Number.parseFloat(style.fontSize) || 11;
  const lineHeight = Number.parseFloat(style.lineHeight) || fontSize * 0.9;
  const charWidth = fontSize * 0.62;
  const cols = Math.max(34, Math.floor(element.clientWidth / charWidth));
  const rows = Math.max(16, Math.floor(element.clientHeight / lineHeight));

  return { cols, rows };
}

export function AsciiHeroBackground() {
  const preRef = useRef<HTMLPreElement | null>(null);

  useEffect(() => {
    const element = preRef.current;

    if (!element) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let dims = measureGrid(element);
    let lastFrame = 0;

    const paint = (timestamp: number) => {
      if (!element) {
        return;
      }

      if (mediaQuery.matches) {
        element.textContent = renderFrame(dims.cols, dims.rows, 1.6);
        return;
      }

      if (timestamp - lastFrame >= 1000 / TARGET_FPS) {
        element.textContent = renderFrame(dims.cols, dims.rows, timestamp * 0.001);
        lastFrame = timestamp;
      }

      frameId = window.requestAnimationFrame(paint);
    };

    const handleResize = () => {
      dims = measureGrid(element);
      element.textContent = renderFrame(dims.cols, dims.rows, lastFrame * 0.001);
    };

    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(element);
    handleResize();
    frameId = window.requestAnimationFrame(paint);

    const handleMotionChange = () => {
      handleResize();

      if (mediaQuery.matches) {
        window.cancelAnimationFrame(frameId);
        return;
      }

      frameId = window.requestAnimationFrame(paint);
    };

    mediaQuery.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.6) 38%, black 72%)",
        WebkitMaskImage: "linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.6) 38%, black 72%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 72% 46%, rgba(16, 185, 129, 0.14), transparent 34%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(250, 250, 250, 0.98) 0%, rgba(250, 250, 250, 0.94) 36%, rgba(250, 250, 250, 0.72) 58%, rgba(250, 250, 250, 0.24) 100%)",
        }}
      />
      <pre
        ref={preRef}
        className="absolute inset-y-0 right-[-6%] m-0 hidden h-full w-[76%] overflow-hidden whitespace-pre pt-8 text-[10px] leading-[0.78] tracking-[-0.06em] text-emerald-800/70 sm:block md:text-[11px] lg:text-[12px]"
      />
      <div
        className="absolute inset-y-0 right-0 w-40"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(250, 250, 250, 0.8) 100%)",
        }}
      />
    </div>
  );
}
