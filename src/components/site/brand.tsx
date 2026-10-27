import React from "react";

/* Small brand pieces shared by every page. */

export const DEMO_VIDEO = "https://www.youtube.com/watch?v=1yyZPRn243U";
export const TAGLINE = "Agents That Eliminate Your Infrastructure Waste";

export const mono = "font-mono";
export const eyebrow = "m-0 font-mono text-[13px] uppercase tracking-[0.04em] text-[#D2401A]";
export const h2 = "m-0 font-semibold leading-[1.1] tracking-[-0.02em]";

export const Logo = ({ dark = false, size = 30 }: { dark?: boolean; size?: number }) => (
  <span className={`flex items-center gap-2 font-semibold tracking-[-0.01em] ${dark ? "text-white text-[19px]" : "text-[#111214] text-[17px]"}`}>
    {/* The whole head at the given height (229×278 viewBox, nothing cropped). */}
    <img src="/brand/martian-mark.svg" alt="" width={Math.round((size * 229) / 278)} height={size} className="block flex-none" decoding="async" />
    Martian
  </span>
);

export const PlayIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4.5v15l13-7.5z" />
  </svg>
);

/** Arrow for buttons and links; inside a .btn it nudges right on hover. */
export const ArrowIcon = ({ size = 16 }: { size?: number }) => (
  <svg className="btn-arrow flex-none" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D2401A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-none">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

/** A short accent tick used as a list marker (in place of dashes). */
export const Tick = () => <span aria-hidden="true" className="mt-[0.6em] h-[2px] w-3 flex-none rounded-full bg-[#D2401A]" />;
