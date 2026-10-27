import React, { useEffect, useRef } from "react";

/* Small looping scenes for the four "How it works" steps, drawn for the card's
 * size instead of screen recordings (a product screenshot would be unreadable at
 * ~230px wide). Plain SVG animated with CSS (index.css, "Step scenes"):
 * - each scene plays only while it's on screen;
 * - every element's resting style is the scene's last frame, so reduced motion
 *   (animations off) shows the finished picture;
 * - the step's caption stays in the page as screen-reader text. */

/** The Martian head traced from the brand PNG (viewBox 0 0 229 278). */
const MARK_PATH =
  "M111.9 277.7C111.5 277.6 110 277.3 108.6 277.1C93 274.5 75.2 261 53.5 235.4C39.4 218.8 37.9 216.9 29.1 205C7.8 176.3 1.1 154.7 1.1 114.5C1.1 98.1 1.3 96.6 3.6 84.9C11.1 48.1 35.9 18.7 68.8 7.7C81.4 3.4 86.6 2.2 98.9 0.9C99.7 0.8 100.8 0.5 101.2 0.4C102.5 -0.2 127.3 -0.2 128.5 0.4C129 0.6 130.1 0.8 131 0.9C134.6 1.3 141.7 2.3 143.4 2.6C165.1 7.6 180.8 15.4 194.7 28C213.6 45.2 226 72 228 100.2C228.1 102.2 228.4 104.9 228.6 106.1C229.1 108.8 229 127.8 228.5 130.4C228.4 131.2 228.1 133.4 228 135.2C227.1 147 224.5 159.4 220.6 169.8C213.9 187.6 200.1 207.9 175.1 236.8C153.9 261.3 136 274.7 121.5 277C120.6 277.2 119.2 277.4 118.3 277.6C116.6 278 113.1 278.1 111.9 277.7ZM94.2 213.4C98.1 212.9 100 212.2 101.6 210.6C114.6 197.6 72.6 136.7 48.7 133.7C29.4 131.4 22.8 158.8 37.3 180.8C48.9 198.4 68.5 211.5 86.6 213.6C88.5 213.8 91.1 213.7 94.2 213.4ZM143.6 213.5C161.7 211.2 181.5 197.8 192.8 180.2C206.8 158.6 200.1 131.5 181.4 133.7C158.6 136.4 118.1 191.8 126.7 208.6C128.7 212.6 135.6 214.5 143.6 213.5Z";

/** The Martian head, `h` units tall, with its top-left at (x, y). */
function Mark({ x, y, h }: { x: number; y: number; h: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${h / 278})`}>
      <use href="#sc-mark" />
    </g>
  );
}

/** Shared pattern and mark for every scene, rendered once by the section. */
export function StepSceneDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        <pattern id="sc-grid" width="15" height="15" patternUnits="userSpaceOnUse">
          <path d="M15 0H0V15" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="1" />
        </pattern>
        <path id="sc-mark" fill="#FF593C" fillRule="evenodd" d={MARK_PATH} />
      </defs>
    </svg>
  );
}

function Scene({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      el.dataset.play = "";
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.dataset.play = "";
      else delete el.dataset.play;
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="scene">
      <svg viewBox="0 0 240 150" aria-hidden="true" focusable="false">
        <rect width="240" height="150" fill="url(#sc-grid)" />
        {children}
      </svg>
    </div>
  );
}

/* 01: a connector inside your network sends traffic out to Martian over TLS. */
export function ConnectorScene() {
  return (
    <Scene>
      <rect x="10" y="14" width="112" height="122" rx="10" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.16)" strokeDasharray="3 3" />
      <text x="20" y="29" className="sc-label">YOUR NETWORK</text>
      {[48, 92].map((y) => (
        <g key={y}>
          <rect x="20" y={y} width="30" height="22" rx="3" fill="#16171A" stroke="#2A2C30" />
          <path d={`M25 ${y + 7}h13M25 ${y + 14}h9`} stroke="#3A3C41" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="44" cy={y + 7} r="1.6" fill="#4ADE80" />
          <path d={`M50 ${y + 11}C64 ${y + 11} 66 75 80 75`} fill="none" stroke="#2E3034" />
        </g>
      ))}
      <circle className="s1-ring" cx="95" cy="75" r="21" fill="none" stroke="#FF6B3D" strokeWidth="1.5" pathLength="1" transform="rotate(-90 95 75)" />
      <g className="s1-node">
        <rect x="80" y="60" width="30" height="30" rx="7" fill="#1A1B1E" stroke="#FF6B3D" />
        <Mark x={88.4} y={67} h={16} />
      </g>
      <text x="95" y="108" textAnchor="middle" className="sc-label">CONNECTOR</text>
      <line className="s1-link" x1="110" y1="75" x2="188" y2="75" stroke="#FF6B3D" strokeWidth="1.2" pathLength="1" />
      <g className="s1-flow">
        {[0, 1, 2].map((i) => (
          <circle key={i} className="s1-pkt" style={{ animationDelay: `${-i * 0.47}s` }} cx="113" cy="75" r="2" fill="#FFB08F" />
        ))}
        <circle className="s1-ping" cx="206" cy="75" r="17" fill="none" stroke="#FF6B3D" />
      </g>
      <g className="s1-badge">
        <rect x="111" y="80" width="26" height="14" rx="4" fill="#0E0F11" stroke="#3A3C41" />
        <path d="M116.5 86v-1.5a2 2 0 0 1 4 0V86" fill="none" stroke="#C9CBD0" strokeWidth="1" />
        <rect x="115.5" y="86" width="6" height="4.5" rx="1" fill="#C9CBD0" />
        <text x="124" y="90" className="sc-tiny" fill="#C9CBD0">TLS</text>
      </g>
      <circle cx="206" cy="75" r="17" fill="#1A1B1E" stroke="#3A3C41" />
      <Mark x={198.6} y={66} h={18} />
      <text x="206" y="106" textAnchor="middle" className="sc-label">MARTIAN</text>
      <text x="230" y="134" textAnchor="end" className="sc-label s1-chip" fill="#FF8A5C">OUTBOUND ONLY →</text>
    </Scene>
  );
}

/* 02: three accounts connect one by one, each read-only. */
export function ReadOnlyScene() {
  const rows = [
    { y: 20, name: "AWS", logo: "/logos/aws.svg" },
    { y: 60, name: "Azure", logo: "/logos/azure.svg" },
    { y: 100, name: "vCenter", logo: "/logos/vmware.svg" },
  ];
  return (
    <Scene>
      {rows.map((r, i) => (
        <g key={r.name} style={{ ["--d" as string]: `${i * 0.9}s` }}>
          <path className="s2-link" d={`M126 ${r.y + 13}C160 ${r.y + 13} 160 75 189 75`} fill="none" stroke="#FF6B3D" strokeWidth="1.1" pathLength="1" />
          <rect x="12" y={r.y} width="114" height="26" rx="6" fill="#16171A" stroke="#26282C" />
          <image href={r.logo} x="19" y={r.y + 6} width="14" height="14" />
          <text x="38" y={r.y + 16.5} className="sc-name">{r.name}</text>
          <g className="s2-wait">
            <rect x="76" y={r.y + 7} width="44" height="12" rx="6" fill="none" stroke="#3A3C41" />
            <text x="98" y={r.y + 15.3} textAnchor="middle" className="sc-tiny" fill="#8E9198">LINKING</text>
          </g>
          <g className="s2-ok">
            <rect x="76" y={r.y + 7} width="44" height="12" rx="6" fill="rgba(74,222,128,0.08)" stroke="rgba(74,222,128,0.55)" />
            <text x="98" y={r.y + 15.3} textAnchor="middle" className="sc-tiny" fill="#4ADE80">READ-ONLY</text>
          </g>
          <circle className="s2-ping" cx="206" cy="75" r="17" fill="none" stroke="#FF6B3D" />
        </g>
      ))}
      <circle cx="206" cy="75" r="17" fill="#1A1B1E" stroke="#3A3C41" />
      <Mark x={198.6} y={66} h={18} />
      <text x="206" y="106" textAnchor="middle" className="sc-label">MARTIAN</text>
      <text x="178" y="138" textAnchor="middle" className="sc-tiny s2-note" fill="#8E9198">SEES ALL · CHANGES NOTHING</text>
    </Scene>
  );
}

/* 03: a scan finishes and findings arrive with their savings and evidence. */
export function FindingsScene() {
  const rows = [
    { y: 34, amount: "$3,815/mo", w: 64 },
    { y: 72, amount: "$1,542/mo", w: 74 },
    { y: 110, amount: "$996/mo", w: 56 },
  ];
  return (
    <Scene>
      <text x="12" y="22" className="sc-label">SCAN</text>
      <circle cx="221" cy="18" r="6" fill="none" stroke="#26282C" strokeWidth="2" />
      <circle className="s3-scan" cx="221" cy="18" r="6" fill="none" stroke="#FF6B3D" strokeWidth="2" pathLength="1" transform="rotate(-90 221 18)" />
      <text x="210" y="21.5" textAnchor="end" className="sc-tiny" fill="#8E9198">EVERY 6H</text>
      {rows.map((r, i) => (
        <g key={r.y} className="s3-row" style={{ ["--d" as string]: `${i * 0.45}s` }}>
          <rect x="12" y={r.y} width="216" height="30" rx="6" fill="#16171A" stroke="#26282C" />
          <rect x="21" y={r.y + 9} width={r.w} height="5" rx="2.5" fill="#3A3C41" />
          <rect x="21" y={r.y + 18} width={r.w * 0.6} height="4" rx="2" fill="#2A2C30" />
          <text x="220" y={r.y + 18.5} textAnchor="end" className="sc-amount">{r.amount}</text>
        </g>
      ))}
      <g className="s3-evidence">
        <text x="94" y="42" className="sc-tiny" fill="#8E9198">CPU</text>
        <line x1="94" y1="55" x2="146" y2="55" stroke="#5B5F66" strokeDasharray="2 2" />
        <text x="149" y="57" className="sc-tiny" fill="#5B5F66">5%</text>
        <path className="s3-spark" d="M94 60l6-1 6 1.5 6-1 6 .5 6-1.5 6 1 6-.5 4 1" fill="none" stroke="#FF6B3D" strokeWidth="1.2" pathLength="1" />
      </g>
    </Scene>
  );
}

/* 04: approve, Martian applies and verifies, and the approval lands in the audit log. */
export function ApproveScene() {
  return (
    <Scene>
      <rect x="12" y="14" width="216" height="74" rx="8" fill="#16171A" stroke="#26282C" />
      <rect x="22" y="26" width="86" height="6" rx="3" fill="#3A3C41" />
      <rect x="22" y="38" width="58" height="4" rx="2" fill="#2A2C30" />
      <text x="218" y="32" textAnchor="end" className="sc-amount">$996/mo</text>
      <g className="s4-approve">
        <rect x="148" y="56" width="70" height="22" rx="6" fill="#1F2023" stroke="#3A3C41" />
        <text x="183" y="70" textAnchor="middle" className="sc-name">Approve</text>
      </g>
      <g className="s4-applying">
        <rect x="148" y="56" width="70" height="22" rx="6" fill="#D2401A" stroke="#E9592B" />
        <text x="183" y="68" textAnchor="middle" className="sc-name" fill="#fff">Applying</text>
        <rect x="156" y="72" width="54" height="2" rx="1" fill="rgba(255,255,255,0.25)" />
        <rect className="s4-bar" x="156" y="72" width="54" height="2" rx="1" fill="#fff" />
      </g>
      <g className="s4-done">
        <rect x="148" y="56" width="70" height="22" rx="6" fill="rgba(74,222,128,0.1)" stroke="rgba(74,222,128,0.6)" />
        <text x="183" y="70" textAnchor="middle" className="sc-name" fill="#4ADE80">Verified ✓</text>
      </g>
      <g className="s4-audit">
        <rect x="12" y="98" width="216" height="38" rx="8" fill="#111214" stroke="#26282C" />
        <circle cx="26" cy="111" r="4.5" fill="none" stroke="#4ADE80" />
        <path d="M24 111l1.5 1.5 2.6-2.8" fill="none" stroke="#4ADE80" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
        <text x="36" y="113.5" className="sc-name">Approved by Priya Raman</text>
        <text x="36" y="127" className="sc-tiny" fill="#8E9198">AUDIT LOG · 10:42 AM</text>
      </g>
      <g className="s4-cursor">
        <path d="M0 0l11 8-4.8.8 2.8 5.4-2.2 1.1-2.8-5.4L0 13.6z" fill="#fff" stroke="#0A0A0B" strokeWidth="0.8" strokeLinejoin="round" />
      </g>
    </Scene>
  );
}

