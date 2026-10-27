import React, { useEffect, useRef, useState } from "react";
import { DemoRequestButton } from "@/components/site/DemoRequest";
import { TransitionLink } from "@/components/site/transitions";
import { DEMO_VIDEO, PlayIcon } from "@/components/site/brand";

/* The sandbox: the real Martian console, built as a static bundle that runs on
 * sample data with no sign-in (see public/demo-app/README.md for how it gets
 * there). The page checks for public/demo-app/embed.json first, because a missing
 * bundle would otherwise come back as this site's own index.html. */

const APP_URL = "/demo-app/index.html?embed=1";
const MANIFEST_URL = "/demo-app/embed.json";

type State = "checking" | "ready" | "missing";

export default function Demo() {
  const [state, setState] = useState<State>("checking");
  const [loaded, setLoaded] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    document.title = "Try Martian | Live sandbox";
    let alive = true;
    fetch(MANIFEST_URL, { cache: "no-store" })
      .then(async (r) => {
        if (!r.ok) throw new Error(String(r.status));
        await r.json();
        if (alive) setState("ready");
      })
      .catch(() => alive && setState("missing"));
    return () => {
      alive = false;
      document.title = "Martian | Agents That Eliminate Your Infrastructure Waste";
    };
  }, []);

  return (
    <div className="flex h-[100dvh] min-h-[560px] flex-col bg-[#0A0A0B] font-sans text-white">
      <a
        href="#sandbox"
        onClick={(e) => {
          e.preventDefault();
          frame.current?.focus();
        }}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#111214]"
      >
        Skip to the sandbox
      </a>

      <header className="flex flex-none items-center justify-center gap-2.5 border-b border-[#1E1F22] px-5 py-2.5">
        <TransitionLink to="/" tone="dark" className="btn inline-flex items-center gap-2 rounded-lg border border-[#34363B] px-3.5 py-2 text-sm text-white">
          <span aria-hidden="true">←</span> Back to the site
        </TransitionLink>
        {state === "ready" && (
          <a href={APP_URL} target="_blank" rel="noreferrer" className="btn inline-flex items-center gap-2 rounded-lg border border-[#34363B] px-3.5 py-2 text-sm text-white">
            Open full screen <span aria-hidden="true">↗</span>
          </a>
        )}
      </header>

      <main id="sandbox" className="relative min-h-0 flex-1 bg-[#F7F7F5]">
        {state === "ready" && (
          <iframe
            ref={frame}
            src={APP_URL}
            title="Martian sandbox"
            onLoad={() => setLoaded(true)}
            allow="clipboard-write; fullscreen"
            className={`block h-full w-full border-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        )}

        {(state === "checking" || (state === "ready" && !loaded)) && (
          <div role="status" aria-live="polite" className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0A0A0B] text-[#C9CBD0]">
            <span className="h-9 w-9 animate-spin rounded-full border-2 border-[#2A2C30] border-t-[#FF6B3D]" aria-hidden="true" />
            <span className="text-sm">Starting the sandbox…</span>
          </div>
        )}

        {state === "missing" && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0B] px-6">
            <div className="flex max-w-[520px] flex-col items-start gap-5">
              <h1 className="m-0 text-[clamp(28px,3vw,36px)] font-semibold leading-[1.15] tracking-[-0.02em]">The sandbox isn't available right now.</h1>
              <p className="m-0 text-[17px] leading-[1.6] text-[#B4B7BD]">
                You can still watch the recorded walkthrough, or book a demo and we'll take you through the real console with your own questions.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={DEMO_VIDEO} target="_blank" rel="noreferrer" className="btn inline-flex items-center gap-3 rounded-full border border-white bg-white py-3 pl-3 pr-5 text-[15px] font-semibold text-[#0A0A0B]">
                  <span className="btn-disc flex h-8 w-8 items-center justify-center rounded-full bg-[#D2401A] text-white"><PlayIcon size={14} /></span>
                  Watch the walkthrough
                </a>
                <DemoRequestButton className="btn rounded-full border border-[#34363B] px-5 py-3 text-[15px] font-medium text-white">
                  Book a demo
                </DemoRequestButton>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
