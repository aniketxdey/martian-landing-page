import React from "react";
import DemoRequestDialog from "@/components/DemoRequestDialog";

/* Homepage: built from the "Martian Website Redesign" design (Website page).
 * Colors, type scale and spacing follow that design 1:1. Every "Get a demo"
 * opens the existing demo request form (Supabase function send-demo-request). */

const DEMO_VIDEO = "https://www.youtube.com/watch?v=1yyZPRn243U";

const mono = "font-[Geist_Mono,ui-monospace,monospace]";
const eyebrow = `${mono} m-0 text-[13px] uppercase tracking-[0.04em] text-[#D2401A]`;
const h2 = "m-0 font-semibold leading-[1.1] tracking-[-0.03em]";

const PlayIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 4.5v15l13-7.5z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D2401A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="mt-0.5 flex-none">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

const Logo = ({ dark = false, size = 30 }: { dark?: boolean; size?: number }) => (
  <span className={`flex items-center gap-2 font-semibold tracking-[-0.01em] ${dark ? "text-white text-[19px]" : "text-[#111214] text-[17px]"}`}>
    <img src="/home/martian-mark.png" alt="" width={size} height={size} className="block flex-none" />
    Martian
  </span>
);

const AccentButton = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <DemoRequestDialog>
    <button type="button" className={`rounded-[10px] bg-[#D2401A] px-6 py-[15px] text-base font-semibold text-white transition-colors hover:bg-[#B9361A] ${className}`}>
      {children}
    </button>
  </DemoRequestDialog>
);

function Nav() {
  const links = [
    ["Product", "#product"],
    ["How it works", "#how"],
    ["Security", "#security"],
    ["Pricing", "#pricing"],
  ];
  return (
    <header className="border-b border-[#1E1F22] bg-[#0A0A0B]">
      <nav aria-label="Primary" className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-6 py-4">
        <a href="#top" aria-label="Martian home"><Logo dark /></a>
        <div className="flex flex-wrap items-center gap-7 text-sm max-md:hidden">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-[#C9CBD0] hover:text-white">{label}</a>
          ))}
          <a href={DEMO_VIDEO} target="_blank" rel="noreferrer" className="text-[#C9CBD0] hover:text-white">Watch demo</a>
        </div>
        <DemoRequestDialog>
          <button type="button" className="rounded-lg bg-white px-[18px] py-3 text-sm font-semibold text-[#0A0A0B] hover:bg-[#EDEEF0]">Get a demo</button>
        </DemoRequestDialog>
      </nav>
    </header>
  );
}

function AgentCard({ label, amount, quote, tone, children }: { label: string; amount: string; quote: string; tone: 0 | 1 | 2; children?: React.ReactNode }) {
  const styles = [
    "bg-[#141517] border-[#26282C] py-5 text-base text-[#EDEEF0]",
    "bg-[#111214] border-[#222428] py-[18px] text-[15px] text-[#C9CBD0]",
    "bg-[#0F1011] border-[#1E2023] py-[18px] text-[15px] text-[#A9ACB2]",
  ][tone];
  return (
    <div className={`flex flex-col gap-2.5 rounded-[14px] border px-[22px] ${styles}`}>
      <div className="flex flex-wrap justify-between gap-3">
        <span className={`${mono} text-xs uppercase tracking-[0.05em] text-[#8E9198]`}>{label}</span>
        <span className={`${mono} text-[13px] ${amount.startsWith("$") ? "text-[#7FD1A8]" : "text-[#8E9198]"}`}>{amount}</span>
      </div>
      <p className="m-0 leading-[1.55]">“{quote}”</p>
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="bg-[#0A0A0B] px-6 pt-[88px] text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-16">
        <div className="flex flex-wrap items-center gap-14">
          <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-7">
            <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#2A2C30] px-3.5 py-1.5 text-[13px] text-[#C9CBD0]">
              <span className="h-[7px] w-[7px] rounded-full bg-[#4ADE80]" />
              For cloud, hybrid and on-premises infrastructure
            </div>
            <h1 className="m-0 text-[clamp(40px,5.2vw,66px)] font-semibold leading-[1.03] tracking-[-0.035em]">
              AI agents that eliminate <span className="text-[#FF6B3D]">infrastructure waste.</span>
            </h1>
            <p className="m-0 max-w-[560px] text-[19px] leading-[1.6] text-[#B4B7BD]">
              Martian deploys a team of agents across AWS, Azure, Google Cloud and your own data centers. They map every resource, find idle VMs, duplicate data and over-provisioned databases, and remove the waste once you approve. Ask a question in plain English and get an answer with the savings attached.
            </p>
            <div className="flex flex-wrap gap-3">
              <AccentButton>Get a demo</AccentButton>
              <a href={DEMO_VIDEO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2.5 rounded-[10px] border border-[#34363B] px-[22px] py-[15px] text-base font-medium text-white hover:border-[#5A5D63]">
                <PlayIcon />Watch the demo
              </a>
            </div>
          </div>

          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-3">
            <AgentCard tone={0} label="Virtual machines" amount="$97,500/mo" quote="I’ve found 847 idle VMs costing $1.2M a year. Want me to safely remove the unused resources?">
              <div className="mt-1 flex flex-wrap gap-2" aria-hidden="true">
                <span className="inline-flex min-h-[44px] items-center rounded-lg bg-white px-3.5 text-sm font-semibold text-[#0A0A0B]">Review and approve</span>
                <span className="inline-flex min-h-[44px] items-center rounded-lg border border-[#34363B] px-3.5 text-sm text-[#EDEEF0]">Show the evidence</span>
              </div>
            </AgentCard>
            <AgentCard tone={1} label="Physical storage" amount="$45,000/mo" quote="2.3 TB of duplicate files across your storage arrays. I can consolidate them without changing any access patterns." />
            <AgentCard tone={2} label="Databases" amount="Review needed" quote="15 database instances are sitting at 80% idle capacity. Shall I right-size them?" />
            <p className="m-0 mt-1 text-xs text-[#7C7F86]">Example agent findings from a demo environment.</p>
          </div>
        </div>

        <div className="rounded-t-2xl border border-b-0 border-[#2A2C30] bg-[#161719] px-2.5 pt-2.5 shadow-[0_-20px_80px_rgba(210,64,26,0.12)]">
          <div className="flex gap-1.5 px-1.5 pb-3 pt-1" aria-hidden="true">
            {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-[#3A3C41]" />)}
          </div>
          <img
            src="/home/dashboard.webp"
            width={2000}
            height={1250}
            alt="Martian dashboard showing infrastructure health of 67 out of 100, $156K monthly cost, $47K waste identified and optimization opportunities"
            className="block h-auto w-full rounded-t-lg"
          />
        </div>
      </div>
    </section>
  );
}

function Platforms() {
  return (
    <section aria-label="Supported platforms" className="border-b border-[#ECECE9] px-6 py-9">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-10 gap-y-5">
        <p className="m-0 text-sm text-[#5B5F66]">One view across every environment you run</p>
        <div className="flex flex-wrap gap-x-9 gap-y-3 text-[17px] font-semibold tracking-[-0.01em] text-[#2A2C30]">
          {["AWS", "Microsoft Azure", "Google Cloud", "VMware", "On-premises"].map((p) => <span key={p}>{p}</span>)}
        </div>
      </div>
    </section>
  );
}

type Feature = { n: string; tag: string; title: string; body: string; bullets: string[]; img: string; w: number; h: number; alt: string; flip?: boolean };

const FEATURES: Feature[] = [
  {
    n: "01", tag: "Discover", title: "See everything you run, and what it costs.",
    body: "Martian agents scan cloud accounts, data center racks, dev labs and edge sites, then map how every VM, database and storage system depends on the others. You get a single topology with cost and utilization on every node, so you know what's safe to change before anything changes.",
    bullets: ["Dependency mapping across cloud and on-premises", "Infrastructure health score from 0 to 100", "Cost broken down by environment, service and site"],
    img: "/home/topology.webp", w: 2000, h: 1250,
    alt: "Infrastructure topology view grouping cloud infrastructure, primary data center, development labs and edge sites with monthly cost per group",
  },
  {
    n: "02", tag: "Optimize", title: "Cut costs in hours, not quarters.", flip: true,
    body: "Every finding arrives ranked by savings and effort: runaway VMs, unattached volumes, orphaned snapshots, duplicate files, cold storage nobody reads, and expensive cross-region traffic. Quick wins are flagged as quick wins. Anything riskier is marked for review. One click launches an automated workflow to fix it.",
    bullets: ["Monthly savings and time-to-apply on every recommendation", "Right-sizing for compute, databases and storage", "Automated workflows with approval before every change"],
    img: "/home/optimizations.webp", w: 1920, h: 1104,
    alt: "Optimization opportunities list: unused EC2 instances, over-provisioned RDS, unused storage volumes and network costs, each with monthly savings and time to apply",
  },
  {
    n: "03", tag: "Converse", title: "Ask your infrastructure anything.",
    body: "Type “analyze my costs” or “find duplicate data” and Martian sends specialized agents to do the work, showing each step, what it discovered and how long it took. Engineers get the detail. Finance and leadership get a clear answer, without needing to know what an EBS volume is.",
    bullets: ["Cost, security, performance and compliance in one chat", "Live agent progress with every discovery shown", "Executive-ready summaries with ROI and timelines"],
    img: "/home/chat.webp", w: 1920, h: 1527,
    alt: "Martian chat running a performance optimization, with an agent progress panel showing initialization, resource discovery and data analysis steps",
  },
];

function Features() {
  return (
    <section id="product" className="scroll-mt-4 px-6 pb-10 pt-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-28">
        {FEATURES.map((f) => (
          <div key={f.n} className={`flex flex-wrap items-center gap-14 ${f.flip ? "flex-row-reverse" : ""}`}>
            <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-4">
              <p className={eyebrow}>{f.n} · {f.tag}</p>
              <h2 className={`${h2} text-[clamp(30px,3.2vw,40px)]`}>{f.title}</h2>
              <p className="m-0 text-[17px] leading-[1.65] text-[#45484E]">{f.body}</p>
              <ul className="m-0 mt-2 flex list-none flex-col gap-2.5 p-0 text-[15px] text-[#2A2C30]">
                {f.bullets.map((b) => (
                  <li key={b} className="flex gap-2.5"><span className="text-[#D2401A]" aria-hidden="true">—</span>{b}</li>
                ))}
              </ul>
            </div>
            <div className="min-w-0 flex-[1.4_1_520px] overflow-hidden rounded-[14px] border border-[#E6E6E3] bg-white shadow-[0_24px_60px_rgba(17,18,20,0.08)]">
              <img src={f.img} width={f.w} height={f.h} alt={f.alt} loading="lazy" className="block h-auto w-full" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    ["01", "Connect with read-only access", "Add AWS IAM roles, Azure service principals, GCP projects and VMware vCenter. Credentials are encrypted with AES-256, and agents verify access is read-only before they scan."],
    ["02", "Agents discover and analyze", "Specialized agents work in parallel to inventory resources, map connections and measure utilization, then rank every opportunity by savings and effort."],
    ["03", "Approve and launch", "Review the change, approve it, and Martian runs the optimization. Agents keep monitoring around the clock, so new waste is caught as it appears."],
  ];
  return (
    <section id="how" className="mt-[72px] scroll-mt-4 bg-[#F7F7F5] px-6 py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14">
        <div className="max-w-[720px]">
          <p className={`${eyebrow} mb-4`}>How it works</p>
          <h2 className={`${h2} mb-4 text-[clamp(32px,3.6vw,44px)]`}>From first scan to first savings.</h2>
          <p className="m-0 text-[17px] leading-[1.65] text-[#45484E]">No migration and no rip-and-replace. Martian connects to what you already run.</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          {steps.map(([n, title, body]) => (
            <div key={n} className="flex flex-col gap-3.5 rounded-[14px] border border-[#E6E6E3] bg-white p-8">
              <span className={`${mono} text-sm text-[#D2401A]`}>{n}</span>
              <h3 className="m-0 text-[22px] font-semibold tracking-[-0.02em]">{title}</h3>
              <p className="m-0 text-base leading-[1.6] text-[#45484E]">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoVideo() {
  return (
    <section aria-label="Demo video" className="bg-[#0A0A0B] px-6 py-24 text-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-10">
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-4">
          <h2 className={`${h2} text-[clamp(30px,3.4vw,42px)]`}>See Martian in action.</h2>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.65] text-[#B4B7BD]">Watch agents discover infrastructure dependencies, analyze optimization opportunities and remove wasted resources in a live environment.</p>
        </div>
        <a href={DEMO_VIDEO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3.5 rounded-full bg-white py-3.5 pl-3.5 pr-6 text-base font-semibold text-[#0A0A0B] hover:bg-[#EDEEF0]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D2401A] text-white"><PlayIcon /></span>
          Watch the demo on YouTube
        </a>
      </div>
    </section>
  );
}

function Security() {
  const items = [
    ["Read-only analysis", "Agents scan through read-only APIs. Nothing is modified during discovery."],
    ["AES-256 credential encryption", "Cloud keys and machine credentials are encrypted and connections are secured end to end."],
    ["Audit log for every action", "Every question, recommendation and optimization is recorded with who approved it."],
    ["Compliance checks built in", "Assess your environment against SOC 2, PCI DSS, GDPR and HIPAA controls alongside cost."],
  ];
  return (
    <section id="security" className="scroll-mt-4 px-6 py-28">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-start gap-14">
        <div className="min-w-0 flex-[1_1_400px]">
          <p className={`${eyebrow} mb-4`}>Security and control</p>
          <h2 className={`${h2} mb-4 text-[clamp(32px,3.6vw,44px)]`}>Autonomous agents. Human sign-off.</h2>
          <p className="m-0 text-[17px] leading-[1.65] text-[#45484E]">Martian is built for enterprises that can't afford surprises. It sees everything and changes nothing until you say so.</p>
        </div>
        <ul className="m-0 flex min-w-0 flex-[1_1_440px] list-none flex-col p-0">
          {items.map(([title, body], i) => (
            <li key={title} className={`flex gap-4 border-t border-[#E6E6E3] py-5 ${i === items.length - 1 ? "border-b" : ""}`}>
              <CheckIcon />
              <div>
                <h3 className="m-0 mb-1 text-[17px] font-semibold">{title}</h3>
                <p className="m-0 text-[15px] leading-[1.6] text-[#45484E]">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-4 bg-[#F7F7F5] px-6 py-28">
      <div className="mx-auto flex max-w-[1000px] flex-col gap-12">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className={eyebrow}>Pricing</p>
          <h2 className={`${h2} text-[clamp(32px,3.6vw,44px)]`}>Plans for every enterprise.</h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-5">
          <div className="flex flex-col gap-[22px] rounded-2xl border border-[#E6E6E3] bg-white p-9">
            <div className="flex flex-col gap-2">
              <h3 className="m-0 text-lg font-semibold">Mid-Market</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-[#5B5F66]">For growing companies with expanding infrastructure.</p>
            </div>
            <p className="m-0 flex items-baseline gap-1.5"><span className="text-5xl font-semibold tracking-[-0.04em]">$1,000</span><span className="text-[15px] text-[#5B5F66]">per user / month</span></p>
            <DemoRequestDialog>
              <button type="button" className="rounded-[10px] border border-[#D4D4D0] p-3.5 text-[15px] font-semibold text-[#111214] hover:border-[#111214]">Get started</button>
            </DemoRequestDialog>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[15px] text-[#2A2C30]">
              {["Up to 100 TB storage optimization", "1,000+ virtual machines", "Cloud and on-premises support", "24/7 AI agent monitoring", "Typically around 10 users"].map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
          <div className="flex flex-col gap-[22px] rounded-2xl border border-[#0A0A0B] bg-[#0A0A0B] p-9 text-white">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="m-0 text-lg font-semibold">Large Enterprise</h3>
                <span className="rounded-full bg-[#FF6B3D] px-2.5 py-1 text-xs font-semibold text-[#0A0A0B]">Most complete</span>
              </div>
              <p className="m-0 text-[15px] leading-[1.55] text-[#B4B7BD]">For enterprise-scale infrastructure with advanced requirements.</p>
            </div>
            <p className="m-0 flex items-baseline gap-1.5"><span className="text-5xl font-semibold tracking-[-0.04em]">$3,000</span><span className="text-[15px] text-[#B4B7BD]">per user / month</span></p>
            <DemoRequestDialog>
              <button type="button" className="rounded-[10px] bg-[#D2401A] p-3.5 text-[15px] font-semibold text-white hover:bg-[#B9361A]">Contact sales</button>
            </DemoRequestDialog>
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-[15px] text-[#E3E4E7]">
              {["Up to 1 PB storage optimization", "100,000+ virtual machines", "Cloud and on-premises support", "24/7 AI agent monitoring", "Typically around 30 users", "Multi-cloud orchestration", "Advanced analytics and reporting", "Dedicated success manager"].map((x) => <li key={x}>{x}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section id="demo" className="scroll-mt-4 px-6 py-28">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-5 text-center">
        <h2 className="m-0 max-w-[780px] text-[clamp(34px,4vw,52px)] font-semibold leading-[1.06] tracking-[-0.035em]">Find out what your infrastructure is wasting.</h2>
        <p className="m-0 max-w-[600px] text-lg leading-[1.6] text-[#45484E]">Book a demo and we'll walk through a scan of an environment like yours, from discovery to the first approved optimization.</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <AccentButton>Get a demo</AccentButton>
          <a href={DEMO_VIDEO} target="_blank" rel="noreferrer" className="rounded-[10px] border border-[#D4D4D0] px-[22px] py-[15px] text-base font-medium text-[#111214] hover:border-[#111214]">Watch the demo</a>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  const link = "text-[#5B5F66] hover:text-[#D2401A]";
  return (
    <footer className="border-t border-[#ECECE9] px-6 py-12">
      <div className="mx-auto flex max-w-[1200px] flex-wrap justify-between gap-8 text-sm text-[#5B5F66]">
        <div className="flex max-w-[320px] flex-col gap-3">
          <Logo size={26} />
          <span className="leading-[1.6]">AI agents that eliminate infrastructure waste across cloud and on-premises environments.</span>
        </div>
        <div className="flex flex-wrap gap-14">
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-[#111214]">Product</span>
            <a href="#product" className={link}>Overview</a>
            <a href="#how" className={link}>How it works</a>
            <a href="#pricing" className={link}>Pricing</a>
          </div>
          <div className="flex flex-col gap-2.5">
            <span className="font-semibold text-[#111214]">Resources</span>
            <a href={DEMO_VIDEO} target="_blank" rel="noreferrer" className={link}>Demo video</a>
            <a href="#security" className={link}>Security</a>
            <a href="#demo" className={link}>Contact</a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-[1200px] text-[13px] text-[#6B6F76]">© {new Date().getFullYear()} Martian. All rights reserved.</div>
    </footer>
  );
}

const Index = () => (
  <div className="min-h-screen w-full bg-white font-[Geist,ui-sans-serif,system-ui,sans-serif] text-[#111214] antialiased">
    <Nav />
    <main>
      <Hero />
      <Platforms />
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

export default Index;
