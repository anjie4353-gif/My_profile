"use client";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { FrostedNav } from "@/components/nav/FrostedNav";
import { HelpingAgent } from "@/components/hero/HelpingAgent";
import { EnterpriseIntro } from "@/components/hero/EnterpriseIntro";
import { AboutSection } from "@/components/about/AboutSection";
import { ProfessionalExperience } from "@/components/experience/ProfessionalExperience";
import { ContactSection } from "@/components/contact/ContactSection";
import { Chapter1Origin } from "@/components/chapters/Chapter1Origin";
import { Chapter2Enterprise } from "@/components/chapters/Chapter2Enterprise";
import { Chapter3Migration } from "@/components/chapters/Chapter3Migration";
import { Chapter5AIQuality } from "@/components/chapters/Chapter5AIQuality";
import { Chapter6TechConstellation } from "@/components/chapters/Chapter6TechConstellation";
import { Chapter7ThoughtLeadership } from "@/components/chapters/Chapter7ThoughtLeadership";
import { Chapter8CommandCenter } from "@/components/chapters/Chapter8CommandCenter";
import { EducationTimeline } from "@/components/education/EducationTimeline";
import { FinalScene } from "@/components/finale/FinalScene";

export function DataUniverse() {
  return (
    <SmoothScrollProvider>
      <FrostedNav />
      <HelpingAgent />

      <main className="enterprise-site relative">
        <EnterpriseIntro />
        <AboutSection />
        <ProfessionalExperience />
        <Chapter1Origin />
        <Chapter2Enterprise />
        <Chapter3Migration />
        <Chapter5AIQuality />
        <Chapter6TechConstellation />
        <Chapter7ThoughtLeadership />
        <Chapter8CommandCenter />
        <EducationTimeline />
        <FinalScene />
        <ContactSection />
      </main>
    </SmoothScrollProvider>
  );
}