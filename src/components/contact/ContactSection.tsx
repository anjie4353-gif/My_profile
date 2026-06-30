"use client";

import { SITE } from "@/lib/site-config";
import { CONTACT_CHANNELS } from "@/lib/contact-channels";
import { useReveal } from "@/lib/hooks/useReveal";

export function ContactSection() {
  const revealRef = useReveal(35);

  return (
    <section
      id="contact"
      className="contact-section scroll-mt-[72px]"
      ref={revealRef}
      aria-labelledby="contact-heading"
    >
      <div className="contact-section__inner">
        <p className="contact-section__kicker" data-reveal>
          Get in Touch
        </p>
        <div className="contact-section__rule" data-reveal aria-hidden />
        <h2 id="contact-heading" className="contact-section__title" data-reveal>
          Contact
        </h2>
        <p className="contact-section__sub" data-reveal>
          Connect on your preferred platform
        </p>

        <div className="contact-section__grid" data-reveal>
          {CONTACT_CHANNELS.map((ch) => (
            <a
              key={ch.id}
              href={ch.href}
              className="contact-chip"
              {...(ch.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              aria-label={
                ch.id === "call"
                  ? `Call ${SITE.phone.display}`
                  : ch.id === "whatsapp"
                    ? `WhatsApp ${SITE.phone.display}`
                    : ch.label
              }
            >
              {ch.label}
            </a>
          ))}
        </div>

        <p className="contact-section__phone" data-reveal>
          {SITE.phone.display}
        </p>
      </div>
    </section>
  );
}