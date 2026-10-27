import React, { useCallback } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import { preloadRoute } from "@/routes";

/* Page-to-page motion.
 *
 * With the View Transitions API the old page fades and settles back, the screen
 * passes through a brand color, and the new page rises in (CSS in index.css).
 * Older browsers get the same idea from a full-screen curtain. With reduced motion
 * on, navigation is instant. */

export type Tone = "orange" | "dark";

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => Promise<void> | void) => { finished: Promise<void> };
};

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function useTransitionNavigate() {
  const navigate = useNavigate();
  return useCallback(
    async (to: string, opts: { tone?: Tone } = {}) => {
      const tone = opts.tone ?? "dark";
      const swap = () => {
        flushSync(() => navigate(to));
        window.scrollTo(0, 0);
      };

      if (reducedMotion()) {
        await preloadRoute(to);
        swap();
        return;
      }

      const doc = document as ViewTransitionDoc;
      if (doc.startViewTransition) {
        const root = document.documentElement;
        root.dataset.vt = tone;
        // The callback waits for the next page's code, so the new snapshot is the
        // real page and not a loading state.
        const t = doc.startViewTransition(async () => {
          await preloadRoute(to);
          swap();
        });
        t.finished.finally(() => {
          delete root.dataset.vt;
        });
        return;
      }

      const curtain = document.getElementById("route-curtain");
      if (!curtain) {
        await preloadRoute(to);
        swap();
        return;
      }
      curtain.dataset.tone = tone;
      curtain.classList.add("on");
      await Promise.all([preloadRoute(to), wait(240)]);
      swap();
      requestAnimationFrame(() => requestAnimationFrame(() => curtain.classList.remove("on")));
    },
    [navigate],
  );
}

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; tone?: Tone };

/** An internal link that animates the route change and prefetches on intent. */
export const TransitionLink = React.forwardRef<HTMLAnchorElement, LinkProps>(function TransitionLink(
  { to, tone, onClick, onPointerEnter, onFocus, children, ...rest },
  ref,
) {
  const go = useTransitionNavigate();
  return (
    <a
      ref={ref}
      href={to}
      onPointerEnter={(e) => {
        void preloadRoute(to);
        onPointerEnter?.(e);
      }}
      onFocus={(e) => {
        void preloadRoute(to);
        onFocus?.(e);
      }}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        void go(to, { tone });
      }}
      {...rest}
    >
      {children}
    </a>
  );
});
