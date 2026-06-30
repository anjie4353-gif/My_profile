"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { ChapterTitle } from "@/components/ui/ChapterTitle";
import { COMMAND_KPIS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const HEALTH_WIDTHS = [97.2, 98.5, 96.8, 99.1];

export function Chapter8CommandCenter() {
  const sectionRef = useRef<HTMLElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const [liveTime, setLiveTime] = useState<string | null>(null);

  useEffect(() => {
    const update = () => setLiveTime(new Date().toLocaleTimeString());
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const dashboard = dashboardRef.current;
    if (!dashboard) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        dashboard.querySelectorAll(".kpi-panel"),
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: dashboard, start: "top 92%" },
        }
      );

      const bars = dashboard.querySelectorAll(".activity-bar");
      bars.forEach((bar, i) => {
        gsap.fromTo(
          bar,
          { scaleY: 0 },
          {
            scaleY: 0.3 + Math.random() * 0.7,
            transformOrigin: "bottom",
            duration: 0.5,
            delay: i * 0.05,
            scrollTrigger: { trigger: dashboard, start: "top 90%" },
          }
        );

        gsap.to(bar, {
          scaleY: 0.2 + Math.random() * 0.8,
          duration: 1 + Math.random(),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1,
        });
      });
    }, dashboard);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="chapter-section relative z-10 px-6 md:px-12 lg:px-20 py-32">
      <ChapterTitle
        chapter="08"
        title="COMMAND CENTER"
        subtitle="Fortune 500 operations dashboard — live intelligence"
      />

      <div ref={dashboardRef} className="glass-panel p-6 md:p-10 border-primary/10">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="font-mono text-xs text-white/50 uppercase tracking-widest">
              Systems Operational
            </span>
          </div>
          <span className="font-mono text-[10px] text-white/30" suppressHydrationWarning>
            LIVE • {liveTime ?? "--:--:--"}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {COMMAND_KPIS.map((kpi) => (
            <div key={kpi.label} className="kpi-panel p-4 border border-white/5 bg-white/[0.02]">
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-2">
                {kpi.label}
              </p>
              <div className="text-xl md:text-2xl font-bold text-white">
                <AnimatedCounter
                  value={kpi.value}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                  decimals={kpi.label === "Uptime" ? 2 : 0}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border border-white/5">
            <p className="font-mono text-[10px] text-white/40 uppercase mb-4">
              Data Throughput — 24h
            </p>
            <div className="flex items-end gap-1 h-32">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className="activity-bar flex-1 bg-gradient-to-t from-primary/60 to-highlight/40 rounded-t-sm"
                  style={{ transform: "scaleY(0)" }}
                />
              ))}
            </div>
          </div>
          <div className="p-4 border border-white/5">
            <p className="font-mono text-[10px] text-white/40 uppercase mb-4">
              System Health
            </p>
            <div className="space-y-3">
              {["Data Pipeline", "Streaming Engine", "AI Quality", "Migration"].map((sys, i) => (
                <div key={sys} className="flex items-center gap-3">
                  <span className="text-xs text-white/60 w-32">{sys}</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      style={{ width: `${HEALTH_WIDTHS[i]}%` }}
                    />
                  </div>
                  <span className="text-xs text-accent font-mono">99.9%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}