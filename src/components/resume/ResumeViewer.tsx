"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import mammoth from "mammoth";
import { FileText, FileType, Download, ArrowLeft } from "lucide-react";
import { RESUME_FILES } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ResumeFormat = "pdf" | "docx";

export function ResumeViewer() {
  const [format, setFormat] = useState<ResumeFormat>("pdf");
  const [docHtml, setDocHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (format !== "docx") return;

    let cancelled = false;

    queueMicrotask(() => {
      if (!cancelled) {
        setLoading(true);
        setError(null);
      }
    });

    fetch(RESUME_FILES.docx)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load resume document");
        return res.arrayBuffer();
      })
      .then((buffer) => mammoth.convertToHtml({ arrayBuffer: buffer }))
      .then((result) => {
        if (cancelled) return;
        setDocHtml(result.value);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to render document");
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [format]);

  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Data Universe
            </Link>
            <div className="hidden sm:block w-px h-6 bg-white/10" />
            <h1 className="font-display text-lg font-semibold text-white">
              Anjaneyulu Pallepagu — Resume
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFormat("pdf")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-mono transition-all",
                format === "pdf"
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "glass-panel text-white/60 hover:text-white"
              )}
            >
              <FileText className="w-4 h-4" />
              PDF
            </button>
            <button
              onClick={() => setFormat("docx")}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm font-mono transition-all",
                format === "docx"
                  ? "bg-primary/20 text-primary border border-primary/40"
                  : "glass-panel text-white/60 hover:text-white"
              )}
            >
              <FileType className="w-4 h-4" />
              Word
            </button>
            <a
              href={format === "pdf" ? RESUME_FILES.pdf : RESUME_FILES.docx}
              download
              className="flex items-center gap-2 px-4 py-2 text-sm font-mono glass-panel text-white/60 hover:text-white transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8">
        {format === "pdf" ? (
          <div className="glass-panel overflow-hidden" style={{ height: "calc(100vh - 120px)" }}>
            <iframe
              src={`${RESUME_FILES.pdf}#toolbar=1&navpanes=0`}
              title="Resume PDF"
              className="w-full h-full border-0 bg-white"
            />
          </div>
        ) : (
          <div className="glass-panel p-6 md:p-10 min-h-[calc(100vh-120px)]">
            {loading && (
              <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  <p className="font-mono text-sm text-white/40">Rendering document...</p>
                </div>
              </div>
            )}
            {error && (
              <div className="text-center py-20">
                <p className="text-red-400 mb-4">{error}</p>
                <a
                  href={RESUME_FILES.docx}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 glass-panel text-primary hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download Word Document
                </a>
              </div>
            )}
            {!loading && !error && docHtml && (
              <article
                className="resume-doc-content prose prose-invert max-w-none
                  prose-headings:text-white prose-headings:font-display
                  prose-p:text-white/80 prose-li:text-white/80
                  prose-strong:text-white prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: docHtml }}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}