import React, { useEffect, useRef } from "react";

/* Fades and lifts content into place the first time it scrolls into view.
 * With `stagger`, the block itself stays put and its direct children (eyebrow,
 * heading, paragraph, list...) come in one after another, each lifting and
 * un-blurring. One shared IntersectionObserver serves every instance. */

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).dataset.shown = "";
          observer?.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  return observer;
}

type Props<T extends React.ElementType> = {
  as?: T;
  /** Delay in ms, for staggering siblings. */
  delay?: number;
  /** Fade only, no lift. */
  fade?: boolean;
  /** Bring the direct children in one after another instead of as one block. */
  stagger?: boolean;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Reveal<T extends React.ElementType = "div">({ as, delay = 0, fade, stagger, className = "", style, children, ...rest }: Props<T>) {
  const Tag = (as ?? "div") as React.ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (stagger) Array.from(el.children).forEach((c, i) => (c as HTMLElement).style.setProperty("--i", String(i)));
    const io = getObserver();
    if (!io) {
      el.dataset.shown = "";
      return;
    }
    io.observe(el);
    return () => io.unobserve(el);
  }, [stagger]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${stagger ? "reveal-stagger" : fade ? "reveal-fade" : ""} ${className}`}
      style={{ ...(style as React.CSSProperties), ["--reveal-delay" as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
