"use client";

import { useEffect, useRef } from "react";

const DENSITY = "▀▄▚▐─═0123.+?";
const TARGET_FPS = 20;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function fract(value: number) {
  return value - Math.floor(value);
}

function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
) {
  if (inMax === inMin) {
    return outMin;
  }

  const t = (value - inMin) / (inMax - inMin);
  return outMin + (outMax - outMin) * t;
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

function sdCircle(x: number, y: number, radius: number) {
  return Math.hypot(x, y) - radius;
}

function renderFrame(cols: number, rows: number, time: number, charAspect: number) {
  let output = "";
  const minGrid = Math.min(cols, rows);

  for (let row = 0; row < rows; row += 1) {
    let run = "";
    let currentColor = "";

    for (let col = 0; col < cols; col += 1) {
      let st = {
        x: (2 * (col - cols / 2) / minGrid) * charAspect,
        y: (2 * (row - rows / 2)) / minGrid,
      };

      st = rotate(
        st.x,
        st.y,
        0.6 * Math.sin(0.62 * time) * Math.hypot(st.x, st.y) * 2.5,
      );
      st = rotate(st.x, st.y, time * 0.2);

      const scale = mapRange(Math.sin(time), -1, 1, 0.5, 1.8);
      const point = {
        x: fract(st.x * scale) - 0.5,
        y: fract(st.y * scale) - 0.5,
      };

      const radius = 0.5 * Math.sin(0.5 * time + st.x * 0.2) + 0.5;
      const distance = sdCircle(point.x, point.y, radius);
      const width = 0.05 + 0.3 * Math.sin(time);
      const band = smoothstep(width, width + 0.2, Math.sin(10 * distance + time));
      const value = clamp((1 - Math.exp(-3 * Math.abs(distance))) * band, 0, 1);
      const index = Math.floor(value * (DENSITY.length - 1));
      const char = DENSITY[index];
      const color = band === 0 ? "#8ec5ff" : "#2563eb";

      if (currentColor && color !== currentColor) {
        output += `<span style="color:${currentColor}">${run}</span>`;
        run = "";
      }

      currentColor = color;
      run += char;
    }

    if (run) {
      output += `<span style="color:${currentColor}">${run}</span>`;
    }

    output += "\n";
  }

  return output;
}

function measureGrid(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const fontSize = Number.parseFloat(style.fontSize) || 11;
  const lineHeight = Number.parseFloat(style.lineHeight) || fontSize * 0.9;
  const charWidth = fontSize * 0.5;
  const cols = Math.max(34, Math.floor(element.clientWidth / charWidth));
  const rows = Math.max(16, Math.floor(element.clientHeight / lineHeight));
  const charAspect = charWidth / lineHeight;

  return { cols, rows, charAspect };
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
        element.innerHTML = renderFrame(dims.cols, dims.rows, 1.6, dims.charAspect);
        return;
      }

      if (timestamp - lastFrame >= 1000 / TARGET_FPS) {
        element.innerHTML = renderFrame(
          dims.cols,
          dims.rows,
          timestamp * 0.001,
          dims.charAspect,
        );
        lastFrame = timestamp;
      }

      frameId = window.requestAnimationFrame(paint);
    };

    const handleResize = () => {
      dims = measureGrid(element);
      element.innerHTML = renderFrame(
        dims.cols,
        dims.rows,
        lastFrame * 0.001,
        dims.charAspect,
      );
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
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.68) 24%, rgba(0, 0, 0, 0.9) 55%, black 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.68) 24%, rgba(0, 0, 0, 0.9) 55%, black 100%)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 72% 46%, rgba(16, 185, 129, 0.18), transparent 42%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(250, 250, 250, 0.9) 0%, rgba(250, 250, 250, 0.76) 34%, rgba(250, 250, 250, 0.34) 54%, rgba(250, 250, 250, 0.08) 100%)",
        }}
      />
      <pre
        ref={preRef}
        className="absolute inset-0 m-0 hidden h-full w-full overflow-hidden whitespace-pre px-4 pt-8 text-[10px] leading-[0.78] tracking-[-0.06em] text-black sm:block md:px-6 md:text-[11px] lg:text-[12px]"
      />
      <div
        className="absolute inset-y-0 left-0 w-[34%]"
        style={{
          background: "linear-gradient(90deg, rgba(250, 250, 250, 0.38) 0%, rgba(250, 250, 250, 0.14) 62%, transparent 100%)",
        }}
      />
    </div>
  );
}
