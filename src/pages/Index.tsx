import React, { useEffect } from "react";
import { DemoRequestButton } from "@/components/site/DemoRequest";
import { TransitionLink } from "@/components/site/transitions";
import { Reveal } from "@/components/site/Reveal";
import { MediaSlot } from "@/components/site/MediaSlot";
import { IntegrationsMarquee } from "@/components/site/IntegrationsMarquee";
import { AgentsPreview } from "@/components/site/AgentsPreview";
import { ArrowIcon, CheckIcon, DEMO_VIDEO, eyebrow, h2, Logo, PlayIcon, TAGLINE, Tick } from "@/components/site/brand";
import { MEDIA, type Media } from "@/content/media";
import { preloadRoute } from "@/routes";

/* Homepage. Layout and colors follow the "Martian Website Redesign" design; copy
 * follows .claude/skills (rewrite-slop, anti-ai-slop-writing). Product claims stay
 * within what the platform does today. "Get a demo" opens the request form;
 * "Try it yourself" goes to the sandbox at /demo. */

const accentBtn = "inline-flex items-center justify-center gap-2 rounded-[10px] bg-[#D2401A] px-6 py-[15px] text-base font-semibold text-white transition-[background-color,transform] duration-200 hover:bg-[#B9361A] active:scale-[0.98]";
const ghostDark = "inline-flex items-center gap-2.5 rounded-[10px] border border-[#34363B] px-[22px] py-[15px] text-base font-medium text-white transition-colors duration-200 hover:border-[#6B6F76] hover:bg-white/[0.04]";
const ghostLight = "inline-flex items-center gap-2 rounded-[10px] border border-[#D4D4D0] px-[22px] py-[15px] text-base font-medium text-[#111214] transition-colors duration-200 hover:border-[#111214]";

/* ---------- navigation ---------- */

function Nav() {
  const links = [
    ["Product", "#product"],
    ["How it works", "#how"],
    ["Security", "#security"],
    ["Pricing", "#pricing"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-[#1E1F22] bg-[#0A0A0B]">
      <nav aria-label="Primary" className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3.5 max-[420px]:gap-3 max-[420px]:px-4">
        <a href="#top" aria-label="Martian, back to top"><Logo dark /></a>
        <div className="flex items-center gap-7 text-sm max-md:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[#C9CBD0] transition-colors hover:text-white">{label}</a>
          ))}
        </div>
        <div className="flex items-center gap-2.5 max-[420px]:gap-2">
          <TransitionLink to="/demo" tone="orange" className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#34363B] px-3.5 py-2.5 text-sm font-medium text-white transition-colors hover:border-[#FF6B3D] max-[420px]:px-2.5 max-[420px]:text-[13px]">
            Try it yourself<span className="max-[420px]:hidden"><ArrowIcon size={14} /></span>
          </TransitionLink>
          <DemoRequestButton className="whitespace-nowrap rounded-lg bg-white px-[18px] py-2.5 text-sm font-semibold text-[#0A0A0B] transition-colors hover:bg-[#EDEEF0] max-[420px]:px-3 max-[420px]:text-[13px]">
            Get a demo
          </DemoRequestButton>
        </div>
      </nav>
    </header>
  );
}

/* ---------- hero ---------- */

function AgentCard({ label, amount, quote, tone, delay, children }: { label: string; amount: string; quote: string; tone: 0 | 1 | 2; delay: number; children?: React.ReactNode }) {
  const styles = [
    "bg-[#141517] border-[#26282C] py-5 text-base text-[#EDEEF0]",
    "bg-[#111214] border-[#222428] py-[18px] text-[15px] text-[#C9CBD0]",
    "bg-[#0F1011] border-[#1E2023] py-[18px] text-[15px] text-[#A9ACB2]",
  ][tone];
  const money = amount.startsWith("$");
  return (
    <div className={`rise flex flex-col gap-2.5 rounded-[14px] border px-[22px] ${styles}`} style={{ ["--rise-delay" as string]: `${delay}ms` }}>
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
  const rise = (ms: number) => ({ ["--rise-delay" as string]: `${ms}ms` }) as React.CSSProperties;
  return (
    <section id="top" className="relative overflow-hidden bg-[#0A0A0B] px-6 pt-[88px] text-white max-md:pt-14">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-16">
        <div className="flex flex-wrap items-center gap-14">
          <div className="flex min-w-0 flex-[1.3_1_520px] flex-col gap-7">
            <div className="rise inline-flex items-center gap-2 self-start rounded-full border border-[#2A2C30] px-3.5 py-1.5 text-[13px] text-[#C9CBD0]" style={rise(0)}>
              <span className="pulse-dot h-[7px] w-[7px] rounded-full bg-[#4ADE80]" />
              Works across your cloud accounts and your own data centers
            </div>
            <h1 className="rise m-0 text-[clamp(38px,4.4vw,60px)] font-semibold leading-[1.04] tracking-[-0.035em] [text-wrap:balance]" style={rise(70)}>
              Agents That Eliminate <span className="text-[#FF6B3D]">Your Infrastructure Waste</span>
            </h1>
            <p className="rise m-0 max-w-[560px] text-[19px] leading-[1.6] text-[#B4B7BD]" style={rise(140)}>
              Martian's agents find the machines and disks you pay for but don't use, whether they live in AWS, Azure, Google Cloud or the VMware cluster in your own racks. You see what each one costs before anything happens, and Martian won't stop or delete anything until someone on your team approves it.
            </p>
            <div className="rise flex flex-wrap gap-3" style={rise(210)}>
              <DemoRequestButton className={accentBtn}>Get a demo</DemoRequestButton>
              <TransitionLink to="/demo" tone="orange" className={ghostDark}>
                Try it yourself <ArrowIcon />
              </TransitionLink>
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-3">
            <AgentCard tone={0} delay={260} label="Idle EC2 instances" amount="$7,297/mo" quote="47 instances in us-east-1 have stayed under 5% CPU for two weeks. Want me to stop them? I'll snapshot their volumes first.">
              <div className="mt-1 flex flex-wrap gap-2" aria-hidden="true">
                <span className="inline-flex min-h-[44px] items-center rounded-lg bg-white px-3.5 text-sm font-semibold text-[#0A0A0B]">Review and approve</span>
                <span className="inline-flex min-h-[44px] items-center rounded-lg border border-[#34363B] px-3.5 text-sm text-[#EDEEF0]">Show the evidence</span>
              </div>
            </AgentCard>
            <AgentCard tone={1} delay={340} label="Unattached EBS volumes" amount="$945/mo" quote="23 volumes have sat detached for more than a week. I'll take a final snapshot of each one before I delete it." />
            <AgentCard tone={2} delay={420} label="Oversized RDS" amount="Needs review" quote="8 RDS instances never get past 15% capacity. Resizing a database is your call, so I've written up the change and left it for you." />
            <p className="rise m-0 mt-1 text-xs text-[#7C7F86]" style={rise(500)}>Example findings from Martian's sandbox environment.</p>
          </div>
        </div>

        <Reveal className="relative">
          <div className="hero-glow" aria-hidden="true" />
          <div className="relative rounded-t-2xl border border-b-0 border-[#2A2C30] bg-[#161719] px-2.5 pt-2.5 shadow-[0_-20px_80px_rgba(210,64,26,0.12)]">
            <div className="flex gap-1.5 px-1.5 pb-3 pt-1" aria-hidden="true">
              {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#3A3C41]" />)}
            </div>
            <div className="overflow-hidden rounded-t-lg">
              <MediaSlot media={MEDIA.hero!} priority />
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
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex max-w-[620px] flex-col gap-3">
            <p className={eyebrow}>Integrations</p>
            <h2 id="integrations-title" className={`${h2} text-[clamp(28px,3vw,36px)]`}>Supported end to end</h2>
          </div>
          <p className="m-0 max-w-[460px] text-[16px] leading-[1.6] text-[#45484E]">
            Everything in these rows works all the way through: Martian finds the waste in it and can make the approved change itself. If a tool you rely on isn't here, you can point Martian at any MCP server.
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

type Feature = { id?: string; n: string; tag: string; title: string; body: string; bullets: string[]; media: Media | null; flip?: boolean };

const FEATURES: Feature[] = [
  {
    n: "01", tag: "Discover", title: "Every resource, with its cost next to it.",
    body: "Agents inventory each account and data center you connect, down to the instances, volumes, snapshots, databases, hosts and datastores. Each resource comes back with 14 days of utilization and a monthly cost, grouped by where it runs, so you can tell which environment is expensive before you start asking why.",
    bullets: ["A health score from 0 to 100 that falls as waste piles up", "CPU history for every machine and database it finds"],
    media: MEDIA.discover,
  },
  {
    n: "02", tag: "Optimize", title: "Findings ranked by what they save.", flip: true,
    body: "Martian checks the inventory against rules you can read: an instance under 5% CPU for two weeks is idle, a volume nobody has attached in seven days is waste, a database averaging under 15% CPU is too big, and a snapshot older than 90 days with no image behind it can go. Each finding shows its monthly savings and how long the fix takes. Approve one and Martian makes the change; it keeps what it needs to undo it, and if a later step fails it rolls back the ones before.",
    bullets: [
      "Quick wins are marked as quick wins, and anything riskier waits for review",
      "Each integration runs read-only, asks before every change, or approves low-risk changes on its own",
      "Every approval lands in a hash-chained audit log",
      "Martian measures the savings after the change instead of estimating them",
    ],
    media: MEDIA.optimize,
  },
  {
    n: "03", tag: "Quick Chat", title: "Ask your infrastructure a question in plain English.",
    body: "Quick Chat runs on Claude and calls the same tools the agents use, so asking “which VMs are idle?” gets you the actual instances along with what stopping them would save. Engineers can read the trace, while finance gets a straight answer without learning what an EBS volume is. If an answer involves changing something, the chat stops and asks you first.",
    bullets: ["Every answer shows the tool calls behind it", "Changes pause on an approval card until you decide"],
    media: MEDIA.converse,
  },
  {
    n: "04", tag: "Agents", title: "See exactly what each agent did.", flip: true,
    body: "Every run lands on the Agents page with a map of the clusters and integrations it touched and a step-by-step trace underneath, covering the plan each agent made and every tool call it ran with the result. Open any run and you can keep asking questions about it, or start a new one from there.",
    bullets: [],
    media: MEDIA.agents,
  },
];

function FeatureRow({ f }: { f: Feature }) {
  return (
    <div className={`flex flex-wrap items-center gap-14 ${f.flip ? "flex-row-reverse" : ""}`}>
      <Reveal className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
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
      <Reveal delay={120} className="min-w-0 flex-[1.4_1_520px] overflow-hidden rounded-[14px] border border-[#E6E6E3] bg-white shadow-[0_24px_60px_rgba(17,18,20,0.08)] transition-transform duration-500 hover:-translate-y-1">
        {f.media ? <MediaSlot media={f.media} /> : <AgentsPreview />}
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
    ["02", "Connect accounts read-only", "Add AWS roles, Azure subscriptions, Google Cloud projects or vCenter. Before every scan, the agents check each credential."],
    ["03", "Review what they found", "Scans repeat every six hours by default. Each finding carries the evidence behind it and a savings estimate you can check."],
    ["04", "Approve the changes you want", "Martian makes the change, then reads the resources again to confirm it worked. Your approval goes in the audit log with your name on it."],
  ];
  return (
    <section id="how" className="mt-[72px] scroll-mt-20 bg-[#F7F7F5] px-6 py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14">
        <Reveal className="max-w-[720px]">
          <p className={`${eyebrow} mb-4`}>How it works</p>
          <h2 className={`${h2} mb-4 text-[clamp(32px,3.6vw,44px)]`}>From first scan to first savings.</h2>
          <p className="m-0 text-[17px] leading-[1.65] text-[#45484E]">There's no migration. Martian connects to what you already run and starts by reading it.</p>
        </Reveal>
        <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] gap-5 p-0">
          {steps.map(([n, title, body], i) => (
            <Reveal as="li" key={n} delay={i * 90} className="flex flex-col gap-3.5 rounded-[14px] border border-[#E6E6E3] bg-white p-7 transition-[border-color,box-shadow] duration-300 hover:border-[#D2401A]/40 hover:shadow-[0_12px_32px_rgba(210,64,26,0.08)]">
              <span className="font-mono text-sm text-[#D2401A]">{n}</span>
              <h3 className="m-0 text-[20px] font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-[#45484E]">{body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- demo video ---------- */

function DemoVideo() {
  return (
    <section aria-labelledby="watch-title" className="relative overflow-hidden bg-[#0A0A0B] px-6 py-24 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(210,64,26,0.28),rgba(210,64,26,0))]" />
      <Reveal className="relative mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-10">
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-4">
          <h2 id="watch-title" className={`${h2} text-[clamp(30px,3.4vw,42px)]`}>Watch it run.</h2>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.65] text-[#B4B7BD]">
            A recorded walkthrough: the agents map a running environment, then clean up the waste they found once someone approves it. Or skip the video and use the sandbox yourself; there's nothing to sign up for.
          </p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <a href={DEMO_VIDEO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3.5 rounded-full bg-white py-3.5 pl-3.5 pr-6 text-base font-semibold text-[#0A0A0B] transition-colors hover:bg-[#EDEEF0]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D2401A] text-white"><PlayIcon /></span>
            Watch on YouTube
          </a>
          <TransitionLink to="/demo" tone="orange" className="inline-flex items-center gap-2.5 rounded-full border border-[#34363B] py-3.5 pl-5 pr-6 text-base font-medium text-white transition-colors hover:border-[#FF6B3D]">
            Try the live demo <ArrowIcon />
          </TransitionLink>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------- security ---------- */

function Security() {
  const items = [
    ["Read-only until you say otherwise", "Discovery runs on read-only credentials, and the agents check each one before every scan."],
    ["Credentials stay in your network", "The connector uses your own IAM roles, managed identities or workload identity. Anything you type into Martian, like an SSH password, is encrypted with AES-256-GCM and only ever sent to your connector."],
    ["An audit log nobody can quietly edit", "Every approval and every change goes into an append-only log, with each entry hash-chained to the one before it."],
    ["Changes you can undo", "Martian saves what it needs to roll each change back, and if one step of a plan fails, it undoes the steps that already ran."],
  ];
  return (
    <section id="security" className="scroll-mt-20 px-6 py-28">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-14">
        <Reveal className="min-w-0 flex-[1_1_400px]">
          <p className={`${eyebrow} mb-4`}>Security and control</p>
          <h2 className={`${h2} mb-4 text-[clamp(32px,3.6vw,44px)]`}>Agents do the work, and your team signs off.</h2>
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
        <Reveal className="flex flex-col items-center gap-3 text-center">
          <p className={eyebrow}>Pricing</p>
          <h2 className={`${h2} text-[clamp(32px,3.6vw,44px)]`}>Two plans, priced per user.</h2>
        </Reveal>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          <Reveal className="flex flex-col gap-[22px] rounded-2xl border border-[#E6E6E3] bg-white p-9">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 text-lg font-semibold">Mid-Market</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-[#5B5F66]">For companies with one platform team and a cloud bill that keeps growing.</p>
            </div>
            <p className="m-0 flex items-baseline gap-1.5"><span className="text-5xl font-semibold tracking-[-0.04em]">$1,000</span><span className="text-[15px] text-[#5B5F66]">per user / month</span></p>
            <DemoRequestButton className="rounded-[10px] border border-[#D4D4D0] p-3.5 text-[15px] font-semibold text-[#111214] transition-colors hover:border-[#111214]">Get started</DemoRequestButton>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[15px] text-[#2A2C30]">
              {["Up to 100 TB of storage analyzed", "1,000+ virtual machines", "Cloud and on-premises environments", "Scheduled scans every six hours", "Usually around 10 users"].map((x) => <li key={x}>{x}</li>)}
            </ul>
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-[22px] rounded-2xl border border-[#0A0A0B] bg-[#0A0A0B] p-9 text-white">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="m-0 text-lg font-semibold">Large Enterprise</h3>
                <span className="rounded-full bg-[#FF6B3D] px-2.5 py-1 text-xs font-semibold text-[#0A0A0B]">Everything included</span>
              </div>
              <p className="m-0 text-[15px] leading-[1.55] text-[#B4B7BD]">For enterprises running several clouds next to their own data centers.</p>
            </div>
            <p className="m-0 flex items-baseline gap-1.5"><span className="text-5xl font-semibold tracking-[-0.04em]">$3,000</span><span className="text-[15px] text-[#B4B7BD]">per user / month</span></p>
            <DemoRequestButton className="rounded-[10px] bg-[#D2401A] p-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#B9361A]">Contact sales</DemoRequestButton>
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
      <Reveal className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 text-center">
        <h2 className="m-0 max-w-[780px] text-[clamp(34px,4vw,52px)] font-semibold leading-[1.06] tracking-[-0.035em]">Find out what your infrastructure is wasting.</h2>
        <p className="m-0 max-w-[600px] text-lg leading-[1.6] text-[#45484E]">Book a demo and we'll walk your team through a full scan, from the first inventory to the first approved change. Or open the sandbox and click around on your own first.</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <DemoRequestButton className={accentBtn}>Get a demo</DemoRequestButton>
          <TransitionLink to="/demo" tone="orange" className={ghostLight}>Try it yourself <ArrowIcon /></TransitionLink>
        </div>
      </Reveal>
    </section>
  );
}

export function SiteFooter() {
  const link = "text-[#5B5F66] transition-colors hover:text-[#D2401A]";
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
