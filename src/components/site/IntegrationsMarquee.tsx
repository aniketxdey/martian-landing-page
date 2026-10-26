import React, { useState } from "react";
import { ENVIRONMENTS, SERVICES } from "@/content/integrations";

/* Two rows of logos drifting in opposite directions. Each track holds the list
 * twice and slides by half its width, so the loop never shows a seam. Hover or
 * keyboard focus pauses it, there's an explicit pause button, and with reduced
 * motion the rows just wrap and sit still. Screen readers get one plain list; the
 * moving copies are hidden from them. */

function Track({ children, duration, reverse, label }: { children: React.ReactNode; duration: number; reverse?: boolean; label: string }) {
  return (
    <div className="marquee overflow-hidden" aria-hidden="true" data-label={label}>
      <div className="marquee-track gap-3 py-1.5" style={{ ["--marquee-duration" as string]: `${duration}s`, ["--marquee-direction" as string]: reverse ? "reverse" : "normal" }}>
        {children}
        {children}
      </div>
    </div>
  );
}

export function IntegrationsMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="flex flex-col gap-2">
      <ul className="sr-only">
        {ENVIRONMENTS.map((e) => <li key={e.name}>{e.name}: {e.detail}</li>)}
        {SERVICES.map((s, i) => <li key={`${s.name}-${i}`}>{s.env}: {s.name}</li>)}
      </ul>

      <div className="marquee-group flex flex-col gap-2" {...(paused ? { "data-paused": "" } : {})}>
        <Track duration={56} label="Environments">
          {ENVIRONMENTS.map((e) => (
            <div key={e.name} className="mr-3 flex w-[300px] flex-none items-center gap-3.5 rounded-2xl border border-[#E6E6E3] bg-white px-4 py-3.5 shadow-[0_1px_2px_rgba(17,18,20,0.04)]">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl border border-[#EFEFEC] bg-[#FBFBFA]">
                <img src={e.logo} alt="" width={30} height={30} loading="lazy" decoding="async" className="max-h-[30px] max-w-[30px] object-contain" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[15px] font-semibold text-[#111214]">{e.name}</span>
                <span className="truncate text-[13px] text-[#5B5F66]">{e.detail}</span>
              </span>
            </div>
          ))}
        </Track>
        <Track duration={72} reverse label="Services">
          {SERVICES.map((s, i) => (
            <div key={`${s.name}-${i}`} className="mr-2.5 flex flex-none items-center gap-2.5 rounded-full border border-[#E6E6E3] bg-white py-2 pl-2 pr-4">
              <img src={s.logo} alt="" width={22} height={22} loading="lazy" decoding="async" className="h-[22px] w-[22px] object-contain" />
              <span className="whitespace-nowrap text-[14px] font-medium text-[#2A2C30]">{s.name}</span>
              <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.04em] text-[#8E9198]">{s.env}</span>
            </div>
          ))}
        </Track>
      </div>

      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="rounded-full border border-[#D4D4D0] bg-white px-3 py-1.5 text-xs font-medium text-[#45484E] hover:border-[#111214] hover:text-[#111214]"
        >
          {paused ? "Resume scrolling" : "Pause scrolling"}
        </button>
      </div>
    </div>
  );
}
