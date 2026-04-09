"use client";

import { useLayoutEffect, useRef } from "react";

const DENSITY = "▀▄▚▐─═0123.+?";
const TARGET_FPS = 20;
const INITIAL_FRAME_TIME = 1.6;
const INITIAL_COLS = 96;
const INITIAL_ROWS = 28;
const INITIAL_CHAR_ASPECT = 0.52;
const BOOT_COLS = 12;
const BOOT_ROWS = 8;
const BOOT_CHAR_ASPECT = 0.52;

const PALETTES = [
  // Previous palette:
  // { soft: "#8ec5ff", strong: "#2563eb" },
  { color: "#d9e4f2" },
  { color: "#d6dee8" },
  { color: "#dbe7f5" },
  { color: "#d7e6f7" },
  { color: "#dde4ec" },
  { color: "#d4dfeb" },
] as const;

const PALETTE_CYCLE_SECONDS = 4;

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

function getPalette(time: number) {
  const index = Math.floor(time / PALETTE_CYCLE_SECONDS) % PALETTES.length;
  return PALETTES[index];
}

function renderFrame(cols: number, rows: number, time: number, charAspect: number) {
  const minGrid = Math.min(cols, rows);
  const palette = getPalette(time);
  const lines: string[] = [];

  for (let row = 0; row < rows; row += 1) {
    let run = "";
    let currentColor = "";
    const segments: string[] = [];

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
      const color = palette.color;

      if (currentColor && color !== currentColor) {
        segments.push(`<span style="color:${currentColor}">${run}</span>`);
        run = "";
      }

      currentColor = color;
      run += char;
    }

    if (run) {
      segments.push(`<span style="color:${currentColor}">${run}</span>`);
    }

    lines.push(segments.join(""));
  }

  return lines.join("\n");
}

const INITIAL_FRAME_HTML = renderFrame(
  INITIAL_COLS,
  INITIAL_ROWS,
  INITIAL_FRAME_TIME,
  INITIAL_CHAR_ASPECT,
);
const BOOT_FRAME_HTML = renderFrame(
  BOOT_COLS,
  BOOT_ROWS,
  INITIAL_FRAME_TIME,
  BOOT_CHAR_ASPECT,
);

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

export function AsciiBootPreview() {
  const bootRef = useRef<HTMLPreElement | null>(null);

  useLayoutEffect(() => {
    const element = bootRef.current;

    if (!element) {
      return;
    }

    let frameId = 0;
    let lastPaintAt = 0;

    const paint = (timestamp: number) => {
      if (document.hidden) {
        return;
      }

      if (timestamp - lastPaintAt >= 1000 / TARGET_FPS) {
        element.innerHTML = renderFrame(
          BOOT_COLS,
          BOOT_ROWS,
          timestamp * 0.001,
          BOOT_CHAR_ASPECT,
        );
        lastPaintAt = timestamp;
      }

      frameId = window.requestAnimationFrame(paint);
    };

    element.innerHTML = BOOT_FRAME_HTML;
    frameId = window.requestAnimationFrame(paint);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId);
        return;
      }

      frameId = window.requestAnimationFrame(paint);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <pre
      ref={bootRef}
      className="m-0 overflow-hidden whitespace-pre text-[8px] leading-[0.82] tracking-[-0.03em] text-black"
      dangerouslySetInnerHTML={{ __html: BOOT_FRAME_HTML }}
      suppressHydrationWarning
    />
  );
}

export function AsciiHeroBackground({
  onReady,
}: {
  onReady?: () => void;
}) {
  const preRef = useRef<HTMLPreElement | null>(null);
  const hasNotifiedReadyRef = useRef(false);

  useLayoutEffect(() => {
    const element = preRef.current;

    if (!element) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let dims = measureGrid(element);
    let lastPaintAt = 0;
    let lastSceneTime = INITIAL_FRAME_TIME;

    const draw = (sceneTime: number) => {
      element.innerHTML = renderFrame(
        dims.cols,
        dims.rows,
        sceneTime,
        dims.charAspect,
      );
      lastSceneTime = sceneTime;
    };

    const notifyReady = () => {
      if (hasNotifiedReadyRef.current) {
        return;
      }

      hasNotifiedReadyRef.current = true;
      onReady?.();
    };

    const paint = (timestamp: number) => {
      if (!element) {
        return;
      }

      if (document.hidden) {
        return;
      }

      if (mediaQuery.matches) {
        draw(INITIAL_FRAME_TIME);
        notifyReady();
        return;
      }

      if (timestamp - lastPaintAt >= 1000 / TARGET_FPS) {
        draw(timestamp * 0.001);
        lastPaintAt = timestamp;
        notifyReady();
      }

      frameId = window.requestAnimationFrame(paint);
    };

    const handleResize = () => {
      const nextDims = measureGrid(element);

      if (
        nextDims.cols === dims.cols &&
        nextDims.rows === dims.rows &&
        nextDims.charAspect === dims.charAspect
      ) {
        return;
      }

      dims = nextDims;
      draw(lastSceneTime);
    };

    resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(element);
    draw(lastSceneTime);
    notifyReady();
    frameId = window.requestAnimationFrame(paint);

    const handleMotionChange = () => {
      draw(lastSceneTime);
      notifyReady();

      if (mediaQuery.matches) {
        window.cancelAnimationFrame(frameId);
        return;
      }

      frameId = window.requestAnimationFrame(paint);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(frameId);
        return;
      }

      draw(lastSceneTime);
      notifyReady();
      frameId = window.requestAnimationFrame(paint);
    };

    mediaQuery.addEventListener("change", handleMotionChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      mediaQuery.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [onReady]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[1] overflow-hidden"
    >
      <pre
        ref={preRef}
        className="absolute inset-0 m-0 h-full w-full overflow-hidden whitespace-pre px-0 pt-0 text-[11px] leading-[0.84] tracking-[-0.02em] text-black sm:text-[15px] sm:leading-[0.88] md:text-[18px] md:leading-[0.9] lg:text-[19px]"
        dangerouslySetInnerHTML={{ __html: INITIAL_FRAME_HTML }}
        suppressHydrationWarning
      />
    </div>
  );
}
