import React, { useEffect, useId, useRef, useState } from "react";
import type { Media } from "@/content/media";
import { useLightbox } from "@/components/site/Lightbox";

/* A product screenshot that can become a looping recording.
 *
 * Without `media.video` it's a plain responsive image (eager + high priority for
 * the hero, lazy everywhere else). With a video, nothing downloads until the slot
 * is about one screen away; then the clip loads, plays muted while it's visible and
 * pauses when it scrolls off. Reduced motion keeps the poster and offers a play
 * button instead of autoplaying.
 *
 * Inside a LightboxProvider the shot is also a button that opens it full screen. */

const reduced = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** `cursor={false}` keeps the native zoom-in pointer instead of the orange circle. */
export function MediaSlot({ media, priority = false, zoom = true, cursor = true, className = "" }: { media: Media; priority?: boolean; zoom?: boolean; cursor?: boolean; className?: string }) {
  const lightbox = useLightbox();
  const id = useId();
  const videoRef = useRef<HTMLVideoElement>(null);
  const tileRef = useRef<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [near, setNear] = useState(false);
  const [visible, setVisible] = useState(false);
  const [userPlay, setUserPlay] = useState(false);
  const hasVideo = !!(media.video?.mp4 || media.video?.webm);
  const zoomable = zoom && !!lightbox;

  useEffect(() => {
    if (!zoomable || !lightbox) return;
    return lightbox.register({ id, media, tile: () => tileRef.current, video: () => videoRef.current, trigger: () => triggerRef.current });
  }, [zoomable, lightbox, id, media]);

  // Watch the slot: "near" (about a screen away) loads the clip once, "visible" plays it.
  useEffect(() => {
    const el = videoRef.current;
    if (!hasVideo || !el) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      setVisible(true);
      return;
    }
    const nearIo = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "100% 0px" });
    const visIo = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    nearIo.observe(el);
    visIo.observe(el);
    return () => {
      nearIo.disconnect();
      visIo.disconnect();
    };
  }, [hasVideo]);

  // Sources are added once the slot is near; tell the element to pick them up.
  useEffect(() => {
    if (near) videoRef.current?.load();
  }, [near]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !near) return;
    if (visible && (!reduced() || userPlay)) void el.play().catch(() => undefined);
    else el.pause();
  }, [near, visible, userPlay]);

  const setTile = (el: HTMLElement | null) => {
    tileRef.current = el;
  };

  const visual = hasVideo ? (
    <div ref={setTile} className="relative" style={{ aspectRatio: `${media.width} / ${media.height}` }}>
      <video
        ref={videoRef}
        className="block h-full w-full object-cover"
        poster={media.poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={media.alt}
        width={media.width}
        height={media.height}
      >
        {near && media.video?.webm && <source src={media.video.webm} type="video/webm" />}
        {near && media.video?.mp4 && <source src={media.video.mp4} type="video/mp4" />}
      </video>
    </div>
  ) : (
    <img
      ref={setTile}
      src={media.poster}
      width={media.width}
      height={media.height}
      alt={media.alt}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      // @ts-expect-error fetchpriority is valid HTML; React 18 types lag behind.
      fetchpriority={priority ? "high" : "auto"}
      className="block h-auto w-full"
    />
  );

  return (
    <div className={`relative ${className}`}>
      {zoomable ? (
        <button
          ref={triggerRef}
          type="button"
          onClick={() => lightbox?.open(id)}
          aria-haspopup="dialog"
          aria-label={`Enlarge: ${media.alt}`}
          data-cursor={cursor ? "Zoom" : undefined}
          className="zoom-trigger block w-full p-0 text-left"
        >
          {visual}
        </button>
      ) : (
        visual
      )}
      {hasVideo && reduced() && !userPlay && (
        <button
          type="button"
          onClick={() => {
            setUserPlay(true);
            void videoRef.current?.play();
          }}
          className="btn absolute bottom-3 right-3 rounded-full border border-transparent bg-[#0A0A0B]/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur"
        >
          Play recording
        </button>
      )}
    </div>
  );
}
