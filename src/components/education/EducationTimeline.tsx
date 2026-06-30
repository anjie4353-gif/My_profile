"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { ChapterTitle } from "@/components/ui/ChapterTitle";
import { EDUCATION_STAGES } from "@/lib/education-data";

const STAGE_COUNT = EDUCATION_STAGES.length;

export function EducationTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const pinWrap = pinRef.current;
    if (!section || !pinWrap) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinWrap,
        start: "top 72px",
        end: () => `+=${window.innerHeight * STAGE_COUNT}`,
        pin: true,
        pinSpacing: true,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);
          const stage = Math.min(
            Math.floor(progress * STAGE_COUNT),
            STAGE_COUNT - 1
          );
          setActiveStage(stage);
        },
      });
    }, section);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, []);

  const current = EDUCATION_STAGES[activeStage];

  return (
    <section
      id="education"
      ref={sectionRef}
      className="edu-section scroll-mt-[72px]"
    >
      <div className="edu-section__inner">
        <ChapterTitle
          chapter="—"
          title="EDUCATION"
          subtitle="Scroll through each academic milestone — then continue down the page"
        />

        <div ref={pinRef} className="edu-pin">
          <div className="edu-layout">
            <div className="edu-timeline">
              <div className="edu-timeline__track" aria-hidden>
                <div
                  className="edu-timeline__fill"
                  style={{ height: `${Math.max(8, scrollProgress * 100)}%` }}
                />
              </div>

              <p className="edu-timeline__hint">
                Scroll · {activeStage + 1} / {STAGE_COUNT}
              </p>

              {EDUCATION_STAGES.map((stage, i) => (
                <div
                  key={stage.id}
                  className={`edu-stage ${i === activeStage ? "edu-stage--active" : ""} ${i < activeStage ? "edu-stage--done" : ""}`}
                >
                  <div className="edu-stage__marker" aria-hidden />
                  <div className="edu-stage__content">
                    <p className="edu-stage__year">{stage.academicYear}</p>
                    <h3 className="edu-stage__title">{stage.title}</h3>
                    {"subtitle" in stage && stage.subtitle ? (
                      <p className="edu-stage__subtitle">{stage.subtitle}</p>
                    ) : null}
                    <p className="edu-stage__school">{stage.school}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="edu-display">
              <div className="edu-display__image-wrap">
                {EDUCATION_STAGES.map((stage, i) => (
                  <div
                    key={stage.id}
                    className={`edu-display__image-layer ${i === activeStage ? "is-active" : ""}`}
                  >
                    <Image
                      src={stage.image}
                      alt={`${stage.school} — ${stage.title}`}
                      fill
                      className="edu-display__image object-contain"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>

              <article className="edu-display__card" key={current.id}>
                <p className="edu-display__label">Academic Year</p>
                <p className="edu-display__year">{current.academicYear}</p>

                <p className="edu-display__label">Institution</p>
                <h3 className="edu-display__school">{current.school}</h3>

                <p className="edu-display__label">Address</p>
                <p className="edu-display__address">{current.address}</p>

                <p className="edu-display__desc">{current.description}</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}