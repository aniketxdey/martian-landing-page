import { useEffect, useRef } from "react";

/* An orange ring that follows the pointer over the parts of the page you can
 * click into, with a word for what the click does ("Zoom", "Play", "Try it").
 * Regions opt in with data-cursor="Label" and the native cursor hides only inside
 * them. It only runs for a mouse-like pointer with motion allowed, so touch
 * screens and reduced-motion setups keep the normal cursor everywhere. */

const FOLLOW = 0.3; // share of the remaining distance covered each frame

export function CursorFollower() {
  const dot = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop: (() => void) | undefined;

    const start = () => {
      stop?.();
      stop = undefined;
      const el = dot.current;
      const label = text.current;
      if (!el || !label || !fine.matches || reduce.matches) return;

      const root = document.documentElement;
      root.classList.add("has-cursor");
      let x = 0;
      let y = 0;
      let tx = 0;
      let ty = 0;
      let raf = 0;
      let current = "";

      const place = () => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      const tick = () => {
        x += (tx - x) * FOLLOW;
        y += (ty - y) * FOLLOW;
        place();
        raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.25 ? requestAnimationFrame(tick) : 0;
      };
      const show = (name: string) => {
        if (!name) {
          if (current) {
            delete el.dataset.on;
            current = "";
          }
          return;
        }
        if (!current) {
          // Appear where the pointer is instead of sliding in from the last spot.
          x = tx;
          y = ty;
          place();
          el.dataset.on = "";
        }
        if (name !== current) label.textContent = name;
        current = name;
      };
      const regionAt = (target: EventTarget | Element | null) => {
        const region = target instanceof Element ? target.closest<HTMLElement>("[data-cursor]") : null;
        // Something on its way out (a closing lightbox) doesn't get a label.
        return region && !region.closest("[data-closing]") ? region.dataset.cursor ?? "" : "";
      };
      // What's under a resting pointer can change without it moving: a click opens
      // the lightbox, Esc closes it. Look again once the page has caught up.
      const recheck = () =>
        requestAnimationFrame(() => requestAnimationFrame(() => {
          if (tx || ty) show(regionAt(document.elementFromPoint(tx, ty)));
        }));

      const onMove = (e: PointerEvent) => {
        if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen") return;
        tx = e.clientX;
        ty = e.clientY;
        show(regionAt(e.target));
        if (current && !raf) raf = requestAnimationFrame(tick);
      };
      // Content can scroll under a resting pointer, so check again after scrolling.
      const onScroll = () => {
        if (!tx && !ty) return;
        show(regionAt(document.elementFromPoint(tx, ty)));
      };
      const hide = () => show("");
      const onDown = () => (el.dataset.down = "");
      const onUp = () => {
        delete el.dataset.down;
        recheck();
      };

      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerdown", onDown, { passive: true });
      document.addEventListener("pointerup", onUp, { passive: true });
      document.addEventListener("keyup", recheck, { passive: true });
      document.addEventListener("scroll", onScroll, { passive: true, capture: true });
      window.addEventListener("cursor:refresh", recheck);
      root.addEventListener("pointerleave", hide);
      window.addEventListener("blur", hide);

      stop = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerdown", onDown);
        document.removeEventListener("pointerup", onUp);
        document.removeEventListener("keyup", recheck);
        document.removeEventListener("scroll", onScroll, { capture: true });
        window.removeEventListener("cursor:refresh", recheck);
        root.removeEventListener("pointerleave", hide);
        window.removeEventListener("blur", hide);
        cancelAnimationFrame(raf);
        hide();
        root.classList.remove("has-cursor");
      };
    };

    start();
    fine.addEventListener?.("change", start);
    reduce.addEventListener?.("change", start);
    return () => {
      stop?.();
      fine.removeEventListener?.("change", start);
      reduce.removeEventListener?.("change", start);
    };
  }, []);

  return (
    <div ref={dot} className="cursor-dot" aria-hidden="true">
      <span ref={text} />
    </div>
  );
}
