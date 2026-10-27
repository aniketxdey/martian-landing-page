import React, { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Media } from "@/content/media";

/* Click a product shot and it grows out of the page into a full-screen view.
 *
 * Each MediaSlot registers itself here. Opening measures the tile, starts the
 * enlarged copy on top of it and lets it settle into place (FLIP); closing runs
 * the same motion backwards.
 * A recording keeps playing from the same frame. Esc or a click outside closes it,
 * the arrow keys move through every registered shot in page order, focus stays
 * inside while it's open and goes back to the shot afterwards. */

export type LightboxItem = {
  id: string;
  media: Media;
  /** The element the enlarged shot grows out of. */
  tile: () => HTMLElement | null;
  video: () => HTMLVideoElement | null;
  /** What gets focus back on close. */
  trigger: () => HTMLElement | null;
};

type LightboxApi = { register: (item: LightboxItem) => () => void; open: (id: string) => void };

const LightboxContext = createContext<LightboxApi | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLightbox = () => useContext(LightboxContext);

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const items = useRef(new Map<string, LightboxItem>());
  const [view, setView] = useState<{ order: LightboxItem[]; start: number } | null>(null);

  const register = useCallback((item: LightboxItem) => {
    items.current.set(item.id, item);
    return () => {
      items.current.delete(item.id);
    };
  }, []);

  const open = useCallback((id: string) => {
    const order = [...items.current.values()]
      .filter((i) => i.tile()?.isConnected)
      .sort((a, b) => (a.tile()!.compareDocumentPosition(b.tile()!) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    const start = order.findIndex((i) => i.id === id);
    if (start >= 0) setView({ order, start });
  }, []);

  const api = useMemo(() => ({ register, open }), [register, open]);

  return (
    <LightboxContext.Provider value={api}>
      {children}
      {view && <LightboxView order={view.order} start={view.start} onClosed={() => setView(null)} />}
    </LightboxContext.Provider>
  );
}

type Box = { left: number; top: number; width: number; height: number };

/** Where the enlarged shot sits: as large as fits, leaving room for the controls. */
function fit(media: Media): Box {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const small = vw < 640;
  const padX = small ? 12 : 92;
  const top = small ? 64 : 72;
  const bottom = small ? 128 : 100;
  const maxW = vw - padX * 2;
  const maxH = vh - top - bottom;
  const s = Math.min(maxW / media.width, maxH / media.height);
  const width = Math.round(media.width * s);
  const height = Math.round(media.height * s);
  return { left: Math.round((vw - width) / 2), top: Math.round(top + (maxH - height) / 2), width, height };
}

/** The transform that makes a box at `to` look like it sits at `from`. */
const flip = (from: DOMRect, to: Box) =>
  `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width}, ${from.height / to.height})`;

const onScreen = (r: DOMRect) => r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;

function LightboxView({ order, start, onClosed }: { order: LightboxItem[]; start: number; onClosed: () => void }) {
  const [index, setIndex] = useState(start);
  const [, setViewport] = useState(0);
  const closing = useRef(false);
  const direction = useRef<1 | -1>(1);
  const firstIndex = useRef(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const figureRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const chromeRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const opener = useRef(order[start].trigger());
  const captionId = useId();

  const item = order[index];
  const box = fit(item.media);
  const many = order.length > 1;
  const hasVideo = !!(item.media.video?.mp4 || item.media.video?.webm);

  // The rest of the page goes inert and stops scrolling while this is open.
  useLayoutEffect(() => {
    const html = document.documentElement;
    const app = document.getElementById("root");
    const gap = window.innerWidth - html.clientWidth;
    const prev = { overflow: html.style.overflow, padding: html.style.paddingRight };
    html.style.overflow = "hidden";
    if (gap > 0) html.style.paddingRight = `${gap}px`;
    app?.setAttribute("inert", "");
    const onResize = () => setViewport((n) => n + 1);
    window.addEventListener("resize", onResize);
    return () => {
      html.style.overflow = prev.overflow;
      html.style.paddingRight = prev.padding;
      app?.removeAttribute("inert");
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // The tile on the page hides while its enlarged copy is out.
  useLayoutEffect(() => {
    const tile = item.tile();
    tile?.setAttribute("data-lifted", "");
    return () => tile?.removeAttribute("data-lifted");
  }, [item]);

  // Opening: grow from the tile.
  useLayoutEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const figure = figureRef.current;
    const from = order[start].tile()?.getBoundingClientRect();
    if (!figure || !from || reducedMotion()) return;
    figure.animate([{ transform: flip(from, fit(order[start].media)) }, { transform: "none" }], { duration: 480, easing: EASE });
    backdropRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 280, easing: "ease-out" });
    chromeRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, delay: 220, easing: "ease-out", fill: "backwards" });
  }, [order, start]);

  // Moving between shots: the next one slides in from the side it came from.
  useLayoutEffect(() => {
    if (firstIndex.current) {
      firstIndex.current = false;
      return;
    }
    if (reducedMotion()) return;
    figureRef.current?.animate(
      [{ opacity: 0, transform: `translate3d(${direction.current * 28}px, 0, 0)` }, { opacity: 1, transform: "none" }],
      { duration: 320, easing: EASE },
    );
  }, [index]);

  const syncVideo = () => {
    const big = videoRef.current;
    const small = item.video();
    if (!big) return;
    if (small && small.readyState > 0) big.currentTime = small.currentTime;
    void big.play().catch(() => undefined);
  };

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    const big = videoRef.current;
    const small = item.video();
    if (big && small && small.readyState > 0) small.currentTime = big.currentTime;

    rootRef.current?.setAttribute("data-closing", "");
    window.dispatchEvent(new Event("cursor:refresh"));
    const finish = () => {
      document.getElementById("root")?.removeAttribute("inert");
      opener.current?.focus({ preventScroll: true });
      onClosed();
      window.dispatchEvent(new Event("cursor:refresh"));
    };
    const figure = figureRef.current;
    if (!figure || reducedMotion()) return finish();

    const to = fit(item.media);
    const from = item.tile()?.getBoundingClientRect();
    const back = from && onScreen(from);
    const run = figure.animate(
      back ? [{ transform: "none" }, { transform: flip(from, to) }] : [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translate3d(0, 12px, 0)" }],
      { duration: back ? 380 : 220, easing: EASE, fill: "forwards" },
    );
    backdropRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: "ease-in", fill: "forwards" });
    chromeRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: "forwards" });
    run.finished.then(finish, finish);
  }, [item, onClosed]);

  const go = useCallback(
    (step: 1 | -1) => {
      if (!many || closing.current) return;
      direction.current = step;
      setIndex((i) => (i + step + order.length) % order.length);
    },
    [many, order.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Tab") {
        const root = rootRef.current;
        if (!root) return;
        const stops = [...root.querySelectorAll<HTMLElement>("button:not([disabled]), [href], [tabindex]:not([tabindex='-1'])")];
        if (!stops.length) return;
        const first = stops[0];
        const last = stops[stops.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !root.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !root.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close, go]);

  const control =
    "btn pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white";

  return createPortal(
    <div
      ref={rootRef}
      className="lb-root"
      role="dialog"
      aria-modal="true"
      aria-label={many ? `Product shot ${index + 1} of ${order.length}` : "Product shot"}
      aria-describedby={captionId}
    >
      <div ref={backdropRef} className="lb-backdrop" data-cursor="Close" onClick={close} />

      <figure ref={figureRef} className="lb-figure" style={box}>
        {hasVideo ? (
          <video key={item.id} ref={videoRef} muted loop playsInline autoPlay poster={item.media.poster} aria-label={item.media.alt} onLoadedMetadata={syncVideo}>
            {item.media.video?.webm && <source src={item.media.video.webm} type="video/webm" />}
            {item.media.video?.mp4 && <source src={item.media.video.mp4} type="video/mp4" />}
          </video>
        ) : (
          <img key={item.id} src={item.media.poster} alt={item.media.alt} width={item.media.width} height={item.media.height} decoding="async" />
        )}
      </figure>

      <div ref={chromeRef} className="pointer-events-none absolute inset-0 text-white">
        <button ref={closeRef} type="button" onClick={close} aria-label="Close" className={`${control} absolute right-4 top-4`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {many && (
          <>
            <button type="button" onClick={() => go(-1)} aria-label="Previous shot" className={`${control} absolute left-4 max-sm:bottom-5 sm:top-1/2 sm:-mt-[22px]`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next shot" className={`${control} absolute right-4 max-sm:bottom-5 sm:top-1/2 sm:-mt-[22px]`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>
          </>
        )}
        <div className="absolute inset-x-0 flex flex-col items-center gap-1.5 px-16 text-center" style={{ top: box.top + box.height + 16 }}>
          <p id={captionId} className="m-0 max-w-[720px] text-sm leading-[1.5] text-[#C9CBD0]">
            {item.media.alt}
          </p>
          {many && (
            <p className="m-0 font-mono text-xs text-[#8E9198]" aria-hidden="true">
              {index + 1} / {order.length}
            </p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
