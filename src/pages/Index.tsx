import React, { useEffect, useRef, useState } from "react";
import { DemoRequestButton } from "@/components/site/DemoRequest";
import { TransitionLink } from "@/components/site/transitions";
import { Reveal } from "@/components/site/Reveal";
import { MediaSlot } from "@/components/site/MediaSlot";
import { IntegrationsMarquee } from "@/components/site/IntegrationsMarquee";
import { ArrowIcon, CheckIcon, DEMO_VIDEO, eyebrow, h2, Logo, PlayIcon, TAGLINE, Tick } from "@/components/site/brand";
import { MEDIA, type Media } from "@/content/media";
import { preloadRoute } from "@/routes";

/* Homepage. Layout and colors follow the "Martian Website Redesign" design; copy
 * follows .claude/skills (rewrite-slop, anti-ai-slop-writing). Product claims stay
 * within what the platform does today. "Get a demo" opens the request form;
 * "Try it yourself" goes to the sandbox at /demo.
 *
 * Interaction hooks live in index.css: .btn / .btn-accent (hover into orange),
 * .link-u (center-out underline), .card-lift, and data-cursor regions for the
 * cursor follower. */

const btn = "btn inline-flex items-center justify-center gap-2 rounded-[10px] px-[22px] py-[15px] text-base";
const accentBtn = `${btn} btn-accent border border-[#D2401A] bg-[#D2401A] px-6 font-semibold text-white`;
const ghostDark = `${btn} gap-2.5 border border-[#34363B] font-medium text-white`;

const reducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/* ---------- navigation ---------- */

const NAV: [string, string][] = [
  ["Product", "product"],
  ["How it works", "how"],
  ["Security", "security"],
  ["Pricing", "pricing"],
];

/** Which of the nav's sections crosses the middle of the screen right now. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const inBand = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) inBand.set(e.target.id, e.isIntersecting);
        setActive(ids.find((id) => inBand.get(id)) ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const NAV_IDS = NAV.map(([, id]) => id);

function Nav() {
  const active = useActiveSection(NAV_IDS);
  return (
    <header className="sticky top-0 z-40 border-b border-[#1E1F22] bg-[#0A0A0B]">
      <nav aria-label="Primary" className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3.5 max-[420px]:gap-3 max-[420px]:px-4">
        <a href="#top" aria-label="Martian, back to top"><Logo dark /></a>
        <div className="flex items-center gap-7 text-sm max-md:hidden">
          {NAV.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className="link-u text-[#C9CBD0] transition-colors duration-200 hover:text-white aria-[current=location]:text-white"
            >
              {label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-2.5 max-[420px]:gap-2">
          <TransitionLink to="/demo" tone="orange" className="btn btn-fill inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#34363B] px-3.5 py-2.5 text-sm font-medium text-white max-[420px]:px-2.5 max-[420px]:text-[13px]">
            Try it yourself<span className="max-[420px]:hidden"><ArrowIcon size={14} /></span>
          </TransitionLink>
          <DemoRequestButton className="btn btn-fill whitespace-nowrap rounded-lg border border-[#34363B] px-3.5 py-2.5 text-sm font-medium text-white max-[420px]:px-2.5 max-[420px]:text-[13px]">
            Get a demo
          </DemoRequestButton>
        </div>
      </nav>
    </header>
  );
}

/* ---------- hero ---------- */

/** A dim 56px grid (CSS) with a canvas on top that lights the outlines of a few
 * squares around the pointer. It attaches to whatever section it's placed in.
 * - Each time the pointer crosses into a new square, a random connected group
 *   of 3 to 7 squares within two squares of it lights up, fading in.
 * - Lit groups fade out over about two seconds, so moving through an area
 *   leaves a loose trail of lit squares behind the pointer.
 * - The square under the pointer stays lit, so once the pointer rests the rest
 *   fades away and only that square's outline remains.
 * Lines only, no fills. The loop runs only while something is changing. Touch
 * screens and reduced motion get just the dim grid. */
const GRID = 56;
const LINE = "255, 118, 78";
const STEPS: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
function useCellGrid(canvas: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const cv = canvas.current;
    const host = cv?.parentElement;
    const ctx = cv?.getContext("2d");
    if (!cv || !host || !ctx) return;
    const live = !reducedMotion() && !!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;

    let W = 0;
    let H = 0;
    let gx = 0;
    let cols = 0;
    let rows = 0;
    let dpr = 1;
    let level = new Float32Array(0); // where each square is heading, 0..1
    let shown = new Float32Array(0); // what's drawn, easing toward level
    let cc = -1;
    let cr = -1;
    let raf = 0;

    // Square (c, r) has its left edge at gx + (c - 1) * GRID, so c = 0 is the
    // partial square left of the first line. Lines match the CSS grid exactly.
    const colOf = (x: number) => Math.floor((x - gx) / GRID) + 1;
    const rowOf = (y: number) => Math.floor(y / GRID);
    const inGrid = (c: number, r: number) => c >= 0 && r >= 0 && c < cols && r < rows;

    const draw = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const at = (c: number, r: number) => (inGrid(c, r) ? shown[r * cols + c] : 0);
      const line = (a: number) => `rgba(${LINE}, ${(0.5 * a).toFixed(3)})`;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const e = shown[r * cols + c];
          // An edge is as bright as the brighter of the two squares it borders.
          const top = Math.max(e, at(c, r - 1));
          const left = Math.max(e, at(c - 1, r));
          const corner = Math.max(top, left, at(c - 1, r - 1));
          if (corner < 0.004) continue;
          const x = gx + (c - 1) * GRID;
          const y = r * GRID;
          if (top > 0.004) {
            ctx.fillStyle = line(top);
            ctx.fillRect(x + 1, y, GRID - 1, 1);
          }
          if (left > 0.004) {
            ctx.fillStyle = line(left);
            ctx.fillRect(x, y + 1, 1, GRID - 1);
          }
          ctx.fillStyle = line(corner);
          ctx.fillRect(x, y, 1, 1);
        }
      }
    };

    // A random connected group of squares, grown one neighbour at a time from
    // the pointer's square and kept within two squares of it.
    const lightAround = (c0: number, r0: number) => {
      const size = 3 + Math.floor(Math.random() * 5);
      const group: [number, number][] = [[c0, r0]];
      const seen = new Set([`${c0},${r0}`]);
      for (let tries = 0; group.length < size && tries < 60; tries++) {
        const [c, r] = group[Math.floor(Math.random() * group.length)];
        const [dc, dr] = STEPS[Math.floor(Math.random() * 4)];
        const nc = c + dc;
        const nr = r + dr;
        const key = `${nc},${nr}`;
        if (seen.has(key) || !inGrid(nc, nr) || Math.max(Math.abs(nc - c0), Math.abs(nr - r0)) > 2) continue;
        seen.add(key);
        group.push([nc, nr]);
      }
      for (const [c, r] of group) level[r * cols + c] = 1;
    };

    const step = () => {
      raf = 0;
      const cur = inGrid(cc, cr) ? cr * cols + cc : -1;
      let busy = false;
      for (let i = 0; i < level.length; i++) {
        if (i === cur) level[i] = 1;
        else if (level[i] > 0) {
          level[i] *= 0.972;
          if (level[i] < 0.004) level[i] = 0;
          busy = true;
        }
        const d = level[i] - shown[i];
        if (Math.abs(d) < 0.003) shown[i] = level[i];
        else {
          // Fade in over about a sixth of a second; fade out with the level.
          shown[i] += d * (d > 0 ? 0.2 : 0.5);
          busy = true;
        }
      }
      draw();
      if (busy) raf = requestAnimationFrame(step);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };

    const resize = () => {
      W = host.clientWidth;
      H = host.clientHeight;
      // A grid line runs down the middle of the section at any width.
      gx = Math.round((W / 2) % GRID);
      host.style.setProperty("--gx", `${gx}px`);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      cols = Math.ceil((W - gx) / GRID) + 2;
      rows = Math.ceil(H / GRID) + 1;
      level = new Float32Array(cols * rows);
      shown = new Float32Array(cols * rows);
      cc = cr = -1;
      if (live) draw();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    if (!live) return () => ro.disconnect();

    const onMove = (e: PointerEvent) => {
      const b = host.getBoundingClientRect();
      const c = colOf(e.clientX - b.left);
      const r = rowOf(e.clientY - b.top);
      if (c === cc && r === cr) return;
      cc = c;
      cr = r;
      if (inGrid(c, r)) lightAround(c, r);
      kick();
    };
    const onLeave = () => {
      cc = cr = -1;
      kick();
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      ro.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [canvas]);
}

/** The grid for a dark section: drop it in as the section's first children. */
function CellGrid({ variant, className = "" }: { variant: "hero" | "watch"; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useCellGrid(canvas);
  return (
    <>
      <div className={`grid-lines grid-lines--${variant} ${className}`} aria-hidden="true" />
      <canvas ref={canvas} className={`grid-cells ${className}`} aria-hidden="true" />
    </>
  );
}

function AgentCard({ label, amount, quote, tone, delay, children }: { label: string; amount: string; quote: string; tone: 0 | 1 | 2; delay: number; children?: React.ReactNode }) {
  const styles = [
    "bg-[#141517] border-[#26282C] py-5 text-base text-[#EDEEF0]",
    "bg-[#111214] border-[#222428] py-[18px] text-[15px] text-[#C9CBD0]",
    "bg-[#0F1011] border-[#1E2023] py-[18px] text-[15px] text-[#A9ACB2]",
  ][tone];
  const money = amount.startsWith("$");
  return (
    <div className={`rise card-lift flex flex-col gap-2.5 rounded-[14px] border px-[22px] ${styles}`} style={{ ["--rise-delay" as string]: `${delay}ms` }}>
      <div className="flex flex-wrap justify-between gap-3">
        <span className="font-mono text-xs uppercase tracking-[0.05em] text-[#8E9198]">{label}</span>
        <span className={`font-mono text-[13px] ${money ? "text-[#7FD1A8]" : "text-[#8E9198]"}`}>{amount}</span>
      </div>
      <p className="m-0 leading-[1.55]">“{quote}”</p>
      {children}
    </div>
  );
}

function Hero() {
  const section = useRef<HTMLElement>(null);
  const rise = (ms: number) => ({ ["--rise-delay" as string]: `${ms}ms` }) as React.CSSProperties;
  return (
    <section ref={section} id="top" className="relative overflow-hidden bg-[#0A0A0B] px-6 pt-[88px] text-white max-md:pt-14">
      <CellGrid variant="hero" />
      <div className="relative mx-auto flex max-w-[1200px] flex-col gap-16">
        <div className="flex flex-wrap items-center gap-14">
          <div className="flex min-w-0 flex-[1.3_1_520px] flex-col gap-7">
            <h1 className="rise m-0 text-[clamp(38px,4.4vw,60px)] font-semibold leading-[1.04] tracking-[-0.025em] [text-wrap:balance]" style={rise(70)}>
              Infrastructure Intelligence <span className="text-[#FF6B3D]">From Another World</span>
            </h1>
            <div className="rise flex max-w-[560px] flex-col gap-3 text-[19px] leading-[1.6] text-[#B4B7BD]" style={rise(140)}>
              <p className="m-0">Martian uses agents to optimize machines and disks that you don't use, whether they sit in an AWS account or in a VMware cluster in your own racks.</p>
              <p className="m-0">You see what each one costs before anything happens; nothing gets stopped or deleted until someone on your team approves it.</p>
            </div>
            <div className="rise flex flex-wrap gap-3" style={rise(210)}>
              <DemoRequestButton className={`${ghostDark} btn-fill`}>Get a demo</DemoRequestButton>
              <TransitionLink to="/demo" tone="orange" className={`${ghostDark} btn-fill`}>
                Try it yourself <ArrowIcon />
              </TransitionLink>
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-3">
            <div className="rise mb-1 inline-flex items-center gap-2 self-start rounded-full border border-[#2A2C30] px-3.5 py-1.5 text-[13px] text-[#C9CBD0] max-[420px]:px-3 max-[420px]:text-[12px]" style={rise(200)}>
              <span className="pulse-dot h-[7px] w-[7px] rounded-full bg-[#4ADE80]" />
              Working across cloud accounts and data centers
            </div>
            <AgentCard tone={0} delay={260} label="Idle developer environments" amount="$3,815/mo" quote="60 dev instances in us-west-2 have stayed under 5% CPU for 14 days. Want me to stop them? I'll snapshot their volumes first.">
              <div className="mt-1 flex flex-wrap gap-2" aria-hidden="true">
                <span className="inline-flex min-h-[44px] items-center rounded-lg bg-white px-3.5 text-sm font-semibold text-[#0A0A0B]">Review and approve</span>
                <span className="inline-flex min-h-[44px] items-center rounded-lg border border-[#34363B] px-3.5 text-sm text-[#EDEEF0]">Show the evidence</span>
              </div>
            </AgentCard>
            <AgentCard tone={1} delay={340} label="Cold data in product media" amount="$996/mo" quote="61 TB of product media hasn't been read in 90 days and still sits on a hot tier. I'll add a lifecycle rule that moves it to infrequent access. Nothing gets deleted." />
            <AgentCard tone={2} delay={420} label="Warehouse management servers" amount="Needs review" quote="The Reno servers run under 20% CPU. Rebalancing would free 3 of them, but powering hosts down in your own racks is your call, so I've written up the plan and left it for you." />
          </div>
        </div>

        <Reveal className="relative">
          <div className="hero-glow" aria-hidden="true" />
          <div className="relative rounded-t-2xl border border-b-0 border-[#2A2C30] bg-[#161719] px-2.5 pt-2.5 shadow-[0_-20px_80px_rgba(210,64,26,0.12)]">
            <div className="flex gap-1.5 px-1.5 pb-3 pt-1" aria-hidden="true">
              {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#3A3C41]" />)}
            </div>
            <div className="overflow-hidden rounded-t-lg">
              <MediaSlot media={MEDIA.hero} priority />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- integrations ---------- */

function Integrations() {
  return (
    <section aria-labelledby="integrations-title" className="border-b border-[#ECECE9] px-6 pb-14 pt-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-10">
        <Reveal stagger className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[620px] flex-col gap-3">
            <p className={eyebrow}>Integrations</p>
            <h2 id="integrations-title" className={`${h2} text-[clamp(28px,3vw,36px)]`}>Supported end to end</h2>
          </div>
          <p className="m-0 max-w-[460px] text-[16px] leading-[1.6] text-[#45484E]">
            Don't see a tool you rely on? No worries, just plug in its MCP and you're good to go.
          </p>
        </Reveal>
        <Reveal delay={120} fade>
          <IntegrationsMarquee />
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- feature rows ---------- */

type Feature = { n: string; tag: string; title: string; body: string; bullets: string[]; media: Media; flip?: boolean };

const FEATURES: Feature[] = [
  {
    n: "01", tag: "Discover", title: "Telemetry across every resource you have",
    body: "Agents search through every account and data center you connect, down to single volumes and snapshots. Each resource comes back with its monthly cost and 14 days of utilization, so you can see which environment is expensive before you start asking why.",
    bullets: ["A 100-point health score that drops as waste piles up", "CPU history for every machine and database it finds"],
    media: MEDIA.discover,
  },
  {
    n: "02", tag: "Clean up", title: "Findings ranked by what they save", flip: true,
    body: "Martian checks inventory against rules you can read. Each finding shows what it saves per month and how long the fix takes, making the easy ones obvious. Approve one and Martian makes the change itself, no hands-on work in the cloud required.",
    bullets: [
      "You choose, per integration, whether low-risk fixes can run without a person",
      "Martian measures the savings after the change instead of estimating them",
    ],
    media: MEDIA.optimize,
  },
  {
    n: "03", tag: "Quick Chat", title: "Ask your infrastructure a question in plain English",
    body: "Martian's memory evolves with your topology, so asking “which VMs are idle?” gets you actual instances along with what stopping them would save. Engineers can read the trace, while finance gets a straight answer without learning what an EBS volume is.",
    bullets: [
      "Every answer shows the tool calls behind it",
      "Answers that call tools also show up on the Agents page as runs you can reopen",
    ],
    media: MEDIA.converse,
  },
  {
    n: "04", tag: "Agents", title: "See what each agent did and why", flip: true,
    body: "Every run shows up on the Agents page with a map of what it touched, and underneath it a trace that pairs each tool call with its result. If something looks off, open the run and keep asking questions about it.",
    bullets: [
      "Filter by scheduled scans, chat requests, approved changes or failures",
      "Ask a run's chat to start a follow-up workflow or run it again",
    ],
    media: MEDIA.agents,
  },
];

function FeatureRow({ f }: { f: Feature }) {
  return (
    <div className={`flex flex-wrap items-center gap-14 ${f.flip ? "flex-row-reverse" : ""}`}>
      <Reveal stagger className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
        <p className={eyebrow}>{f.n} · {f.tag}</p>
        <h2 className={`${h2} text-[clamp(30px,3.2vw,40px)]`}>{f.title}</h2>
        <p className="m-0 text-[17px] leading-[1.65] text-[#45484E]">{f.body}</p>
        {f.bullets.length > 0 && (
          <ul className="m-0 mt-2 flex list-none flex-col gap-2.5 p-0 text-[15px] text-[#2A2C30]">
            {f.bullets.map((b) => (
              <li key={b} className="flex gap-3"><Tick />{b}</li>
            ))}
          </ul>
        )}
      </Reveal>
      <Reveal delay={120} className="card-lift min-w-0 flex-[1.4_1_520px] overflow-hidden rounded-[14px] border border-[#E6E6E3] bg-white shadow-[0_24px_60px_rgba(17,18,20,0.08)]">
        <MediaSlot media={f.media} />
      </Reveal>
    </div>
  );
}

function Features() {
  return (
    <section id="product" className="scroll-mt-20 px-6 pb-10 pt-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-28 max-md:gap-20">
        {FEATURES.map((f) => <FeatureRow key={f.n} f={f} />)}
      </div>
    </section>
  );
}

/* ---------- how it works ---------- */

function HowItWorks() {
  const steps = [
    ["01", "Install the connector", "A small service runs inside your network and dials out to Martian over TLS, so you don't open inbound ports and your cloud credentials stay on your side."],
    ["02", "Connect accounts read‑only","Start with a read-only role in each cloud account, plus vCenter credentials for the hardware you run yourself. At this point Martian can see everything and change nothing."],
    ["03", "Review what they found", "Scans repeat every six hours by default. Each finding carries the evidence behind it and a savings estimate you can check."],
    ["04", "Approve the changes you want", "Martian makes the change, then reads the resources again to confirm it worked. Your approval goes in the audit log with your name on it."],
  ];
  return (
    <section id="how" className="mt-[72px] scroll-mt-20 bg-[#F7F7F5] px-6 py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14">
        <Reveal stagger className="max-w-[720px]">
          <p className={`${eyebrow} mb-4`}>How it works</p>
          <h2 className={`${h2} mb-4 text-[clamp(32px,3.6vw,44px)]`}>Nothing to migrate</h2>
          <p className="m-0 text-[17px] leading-[1.65] text-[#45484E]">Martian connects to what you already run and starts by reading it.</p>
        </Reveal>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-5 p-0">
          {steps.map(([n, title, body], i) => (
            <Reveal as="li" key={n} delay={i * 90} className="card-lift flex flex-col gap-3.5 rounded-[14px] border border-[#E6E6E3] bg-white p-7">
              <span className="font-mono text-sm text-[#D2401A]">{n}</span>
              <h3 className="m-0 text-[20px] font-semibold tracking-[-0.01em]">{title}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-[#45484E]">{body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- demo video ---------- */

/** The video section arrives in the light color around it and fades to dark once a
 * third of it is on screen; it resets when it has fully left. */
function useCrossfade(ref: React.RefObject<HTMLElement>) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined" || reducedMotion()) {
      setDark(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        const tall = e.intersectionRect.height >= window.innerHeight * 0.45;
        if (e.intersectionRatio >= 0.3 || (e.isIntersecting && tall)) setDark(true);
        else if (!e.isIntersecting) setDark(false);
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.45, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return dark;
}

function DemoVideo() {
  const ref = useRef<HTMLElement>(null);
  const dark = useCrossfade(ref);
  return (
    <section
      ref={ref}
      aria-labelledby="watch-title"
      {...(dark ? { "data-dark": "" } : {})}
      className="relative overflow-hidden bg-[linear-gradient(#F7F7F5,#ffffff)] px-6 py-24 text-white"
    >
      <div className="xfade-layer" aria-hidden="true" />
      <CellGrid variant="watch" className="xfade-follow" />
      <div className="xfade-content relative mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(210,64,26,0.28),rgba(210,64,26,0))]" />
        <Reveal stagger className="relative flex min-w-0 flex-col gap-4">
          <h2 id="watch-title" className={`${h2} text-[clamp(30px,3.4vw,42px)]`}>Watch it run</h2>
          <p className="m-0 max-w-[520px] text-[17px] leading-[1.65] text-[#B4B7BD]">
            A recorded walkthrough of one scan: the agents map a running environment, then clean up what they found once someone approves it. If you'd rather click around yourself, the sandbox needs no sign-up.
          </p>
          <div className="mt-3 flex flex-col items-start gap-3">
            <a href={DEMO_VIDEO} target="_blank" rel="noreferrer" className="btn inline-flex items-center gap-3.5 rounded-full border border-white bg-white py-3.5 pl-3.5 pr-6 text-base font-semibold text-[#0A0A0B]">
              <span className="btn-disc flex h-10 w-10 items-center justify-center rounded-full bg-[#D2401A] text-white"><PlayIcon /></span>
              Watch on YouTube
            </a>
            <TransitionLink to="/demo" tone="orange" className="btn inline-flex items-center gap-2.5 rounded-full border border-[#34363B] bg-[#1a1b1e] py-3.5 pl-5 pr-6 text-base font-medium text-white">
              Try the live demo <ArrowIcon />
            </TransitionLink>
          </div>
        </Reveal>
        <Reveal delay={140}>
        <a
          href={DEMO_VIDEO}
          target="_blank"
          rel="noreferrer"
          aria-label="Play the walkthrough on YouTube (opens in a new tab)"
          className="card-lift group relative block overflow-hidden rounded-2xl border border-[#2A2C30] bg-[#161719]"
        >
          <img src="/media/agents.webp" alt="" width={2560} height={1600} loading="lazy" decoding="async" className="block aspect-[16/10] w-full object-cover object-top opacity-60 transition-[opacity,transform] duration-500 group-hover:scale-[1.015] group-hover:opacity-75" />
          <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,0.1)_0%,rgba(10,10,11,0.25)_50%,rgba(10,10,11,0.94)_100%)]" />
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D2401A] text-white shadow-[0_0_0_10px_rgba(210,64,26,0.18)] transition-transform duration-300 group-hover:scale-105">
              <PlayIcon size={22} />
            </span>
          </span>
          <span aria-hidden="true" className="absolute bottom-4 left-5 font-mono text-xs uppercase tracking-[0.05em] text-[#C9CBD0]">Recorded walkthrough · YouTube</span>
        </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- security ---------- */

function Security() {
  const items = [
    ["Read-only until you say otherwise", "Discovery runs on read-only credentials, and the agents check each one before every scan."],
    ["Credentials stay in your network", "The connector signs in with identities you already manage, like an IAM role or an Azure managed identity. Anything you type into Martian, such as an SSH password, is encrypted with AES-256-GCM and only ever sent to your connector."],
    ["An audit log nobody can quietly edit", "Every approval and every change goes into an append-only log, with each entry hash-chained to the one before it."],
    ["Changes you can undo", "Martian saves what it needs to roll each change back, and if one step of a plan fails, it undoes the steps that already ran."],
  ];
  return (
    <section id="security" className="scroll-mt-20 px-6 py-28">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-14">
        <Reveal stagger className="min-w-0 flex-[1_1_400px]">
          <p className={`${eyebrow} mb-4`}>Security and control</p>
          <h2 className={`${h2} mb-4 text-[clamp(32px,3.6vw,44px)]`}>Agents do the work, and your team signs off</h2>
          <p className="m-0 text-[17px] leading-[1.65] text-[#45484E]">Martian can read everything you connect to it, but it doesn't change a thing until someone approves.</p>
        </Reveal>
        <ul className="m-0 flex min-w-0 flex-[1_1_440px] list-none flex-col p-0">
          {items.map(([title, body], i) => (
            <Reveal as="li" key={title} delay={i * 80} className={`flex gap-4 border-t border-[#E6E6E3] py-5 ${i === items.length - 1 ? "border-b" : ""}`}>
              <CheckIcon />
              <div>
                <h3 className="m-0 mb-1 text-[17px] font-semibold">{title}</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-[#45484E]">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- pricing ---------- */

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 bg-[#F7F7F5] px-6 py-28">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-12">
        <Reveal stagger className="flex flex-col items-center gap-3 text-center">
          <p className={eyebrow}>Pricing</p>
          <h2 className={`${h2} text-[clamp(32px,3.6vw,44px)]`}>Two plans, priced per user</h2>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          <Reveal className="card-lift flex flex-col gap-[22px] rounded-2xl border border-[#E6E6E3] bg-white p-9">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 text-lg font-semibold">Mid-Market</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-[#5B5F66]">For companies with one platform team and a cloud bill that keeps growing.</p>
            </div>
            <p className="m-0 flex items-baseline gap-1.5"><span className="text-5xl font-semibold tracking-[-0.04em]">$1,000</span><span className="text-[15px] text-[#5B5F66]">per user / month</span></p>
            <DemoRequestButton className="btn rounded-[10px] border border-[#D4D4D0] p-3.5 text-[15px] font-semibold text-[#111214]">Get started</DemoRequestButton>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[15px] text-[#2A2C30]">
              {["Up to 100 TB of storage analyzed", "1,000+ virtual machines", "Cloud and on-premises environments", "Scheduled scans every six hours", "Usually around 10 users"].map((x) => <li key={x}>{x}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={100} className="card-lift flex flex-col gap-[22px] rounded-2xl border border-[#0A0A0B] bg-[#0A0A0B] p-9 text-white">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="m-0 text-lg font-semibold">Large Enterprise</h3>
                <span className="rounded-full bg-[#FF6B3D] px-2.5 py-1 text-xs font-semibold text-[#0A0A0B]">Everything included</span>
              </div>
              <p className="m-0 text-[15px] leading-[1.55] text-[#B4B7BD]">For enterprises running several clouds next to their own data centers.</p>
            </div>
            <p className="m-0 flex items-baseline gap-1.5"><span className="text-5xl font-semibold tracking-[-0.04em]">$3,000</span><span className="text-[15px] text-[#B4B7BD]">per user / month</span></p>
            <DemoRequestButton className="btn btn-accent rounded-[10px] border border-[#D2401A] bg-[#D2401A] p-3.5 text-[15px] font-semibold text-white">Contact sales</DemoRequestButton>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[15px] text-[#E3E4E7]">
              {["Up to 1 PB of storage analyzed", "100,000+ virtual machines", "Cloud and on-premises environments", "Scan schedules you set", "Usually around 30 users", "All your clouds in one view", "Reports for finance and leadership", "A dedicated success manager"].map((x) => <li key={x}>{x}</li>)}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- closing ---------- */

function FinalCta() {
  return (
    <section id="demo" className="scroll-mt-20 px-6 py-28">
      <Reveal stagger className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 text-center">
        <h2 className="m-0 max-w-[780px] text-[clamp(34px,4vw,52px)] font-semibold leading-[1.06] tracking-[-0.025em]">Find out what your infrastructure is wasting</h2>
        <p className="m-0 max-w-[600px] text-lg leading-[1.6] text-[#45484E]">Book a demo and we'll walk your team through a full scan, up to the moment someone approves the first change.</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <DemoRequestButton className={accentBtn}>Get a demo</DemoRequestButton>
        </div>
      </Reveal>
    </section>
  );
}

export function SiteFooter() {
  const link = "link-u self-start text-[#5B5F66] transition-colors duration-200 hover:text-[#111214]";
  return (
    <footer className="border-t border-[#ECECE9] px-6 py-12">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-8 text-sm text-[#5B5F66]">
        <div className="flex max-w-[320px] flex-col gap-3">
          <Logo size={26} />
          <span className="leading-[1.6]">{TAGLINE}</span>
        </div>
        <div className="flex flex-wrap gap-14">
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-[#111214]">Product</span>
            <a href="/#product" className={link}>Overview</a>
            <a href="/#how" className={link}>How it works</a>
            <a href="/#pricing" className={link}>Pricing</a>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-[#111214]">Resources</span>
            <TransitionLink to="/demo" tone="orange" className={link}>Live demo</TransitionLink>
            <a href={DEMO_VIDEO} target="_blank" rel="noreferrer" className={link}>Demo video</a>
            <a href="/#security" className={link}>Security</a>
            <DemoRequestButton className={`${link} text-left`}>Contact</DemoRequestButton>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1200px] text-[13px] text-[#6B6F76]">© {new Date().getFullYear()} Martian. All rights reserved.</div>
    </footer>
  );
}

const Index = () => {
  // Fetch the sandbox page's code once the homepage has settled, so "Try it
  // yourself" opens without a wait.
  useEffect(() => {
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const run = () => void preloadRoute("/demo");
    if (idle) idle(run);
    else setTimeout(run, 1500);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white font-sans text-[#111214] antialiased">
      <a href="#product" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-[#111214]">Skip to content</a>
      <Nav />
      <main>
        <Hero />
        <Integrations />
        <Features />
        <HowItWorks />
        <DemoVideo />
        <Security />
        <Pricing />
        <FinalCta />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
