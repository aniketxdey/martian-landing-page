import React from "react";

/* A small HTML rendition of an agent run on the Agents page, used until a real
 * recording replaces it. Tool names are the platform's real MCP tools, and the
 * figures come from the sandbox environment the hero cards quote. */

type Step = { agent: string; tool: string; note: string; time?: string; state: "done" | "running" | "waiting" };

const STEPS: Step[] = [
  { agent: "Discovery", tool: "aws_inventory", note: "Mapped the instances and volumes in us-east-1", time: "3.8s", state: "done" },
  { agent: "Utilization analyst", tool: "aws_get_cpu_series", note: "47 instances averaged under 5% CPU for 14 days", time: "2.1s", state: "done" },
  { agent: "Cost analyst", tool: "aws_cost_by_service", note: "Pricing the change: about $7,297 a month", state: "running" },
  { agent: "Remediator", tool: "aws_stop_instances", note: "Waiting for your approval", state: "waiting" },
];

const Dot = ({ state }: { state: Step["state"] }) =>
  state === "done" ? (
    <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-[#15803D] text-white">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5" /></svg>
    </span>
  ) : state === "running" ? (
    <span className="relative flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 border-[#D2401A]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#D2401A]" />
    </span>
  ) : (
    <span className="h-5 w-5 flex-none rounded-full border-2 border-dashed border-[#C9CBD0]" />
  );

export function AgentsPreview() {
  return (
    <div className="flex flex-col gap-0 bg-white" role="img" aria-label="An agent run on the Agents page: Discovery and the utilization analyst have finished, the cost analyst is running, and the remediator is waiting for approval to stop 47 idle EC2 instances">
      <div className="flex items-center justify-between gap-3 border-b border-[#EFEFEC] px-5 py-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-[15px] font-semibold text-[#111214]">Investigate: idle EC2 instances</span>
          <span className="font-mono text-[12px] text-[#6B6F76]">4 agents · AWS · started 42s ago</span>
        </div>
        <span className="flex flex-none items-center gap-1.5 rounded-full bg-[#FBEDE7] px-2.5 py-1 text-xs font-medium text-[#8A3412]">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#D2401A]" />
          Running
        </span>
      </div>
      <ol className="m-0 flex list-none flex-col p-0">
        {STEPS.map((s, i) => (
          <li key={s.tool} className="relative flex gap-3.5 px-5 py-3.5">
            {i < STEPS.length - 1 && <span aria-hidden="true" className="absolute left-[29px] top-[38px] h-[calc(100%-26px)] w-px bg-[#E6E6E3]" />}
            <Dot state={s.state} />
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="text-[14px] font-semibold text-[#111214]">{s.agent}</span>
                <span className="font-mono text-[12px] text-[#8E9198]">{s.time ?? (s.state === "running" ? "running" : "next")}</span>
              </div>
              <span className="inline-flex w-fit rounded-md bg-[#F2F2EF] px-1.5 py-0.5 font-mono text-[12px] text-[#2A2C30]">{s.tool}</span>
              <span className="text-[13px] text-[#45484E]">{s.note}</span>
              {s.state === "running" && <span aria-hidden="true" className="trace-run mt-1 h-[3px] w-full rounded-full" />}
              {s.state === "waiting" && (
                <span className="mt-1 flex flex-wrap gap-2">
                  <span className="rounded-lg bg-[#D2401A] px-3 py-1.5 text-[12px] font-semibold text-white">Approve and run</span>
                  <span className="rounded-lg border border-[#D4D4D0] px-3 py-1.5 text-[12px] text-[#2A2C30]">Decline</span>
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
