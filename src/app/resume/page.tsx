import type { Metadata } from "next";
import { ResumeViewer } from "@/components/resume/ResumeViewer";

export const metadata: Metadata = {
  title: "Resume | Anjaneyulu Pallepagu",
  description: "Senior Data & AI Engineer — Enterprise Resume",
};

export default function ResumePage() {
  return <ResumeViewer />;
}