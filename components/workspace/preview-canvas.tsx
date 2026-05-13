"use client";
import { useState } from "react";
import Image from "next/image";
import { ZoomIn, ZoomOut, Maximize2, Code2, Eye, Palette } from "lucide-react";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { DeviceToggle } from "@/components/ui/device-toggle";
import type { Project } from "@/lib/mock-data";

interface PreviewCanvasProps {
  project: Project;
}

export function PreviewCanvas({ project }: PreviewCanvasProps) {
  const [view, setView] = useState("design");
  const [zoom, setZoom] = useState(100);
  const isMobile = project.imageFit === "center";

  // Canvas natural sizing — mobile devices show 3-up phone mockup, desktop shows landscape
  const naturalW = isMobile ? 880 : 1240;
  const naturalH = isMobile ? 660 : 760;
  const scaledW = naturalW * (zoom / 100);
  const scaledH = naturalH * (zoom / 100);

  return (
    <div className="flex-1 min-w-0 h-full flex flex-col bg-white rounded-3xl border border-line-200 shadow-edge overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-line-200">
        <SegmentedTabs
          value={view}
          onChange={setView}
          tabs={[
            { id: "design", label: "Design", icon: <Palette size={14} strokeWidth={1.5} /> },
            { id: "code", label: "Code", icon: <Code2 size={14} strokeWidth={1.5} /> },
            { id: "preview", label: "Preview", icon: <Eye size={14} strokeWidth={1.5} /> },
          ]}
        />
        <div className="flex items-center gap-3">
          <DeviceToggle value={isMobile ? "mobile" : "desktop"} />
          <div className="flex items-center gap-1 bg-surface-100 rounded-pill px-1 h-[33px] border border-line-200">
            <button
              aria-label="Zoom out"
              onClick={() => setZoom((z) => Math.max(25, z - 10))}
              className="w-7 h-7 rounded-pill inline-flex items-center justify-center text-ink-500 hover:bg-white hover:text-ink-900"
            >
              <ZoomOut size={14} strokeWidth={1.5} />
            </button>
            <div className="text-xs font-medium text-ink-900 w-10 text-center">{zoom}%</div>
            <button
              aria-label="Zoom in"
              onClick={() => setZoom((z) => Math.min(200, z + 10))}
              className="w-7 h-7 rounded-pill inline-flex items-center justify-center text-ink-500 hover:bg-white hover:text-ink-900"
            >
              <ZoomIn size={14} strokeWidth={1.5} />
            </button>
          </div>
          <button
            aria-label="Fullscreen"
            className="h-[33px] w-[33px] rounded-pill inline-flex items-center justify-center bg-surface-100 border border-line-200 text-ink-900 hover:bg-white"
          >
            <Maximize2 size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Canvas viewport */}
      <div className="flex-1 overflow-auto bg-surface-100 grid place-items-center p-10">
        <div
          className="relative rounded-xl shadow-lifted-md border border-line-200 overflow-hidden"
          style={{
            width: scaledW,
            height: scaledH,
            backgroundColor: project.imageBg ?? "#F9F9F9",
            transition: "all .15s",
          }}
        >
          {view === "design" && (
            <div className="relative w-full h-full">
              {project.imageFit === "top" ? (
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  quality={95}
                  sizes="(min-width: 1280px) 1400px, 80vw"
                  className="object-cover object-top"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="relative w-full h-full max-w-[700px] max-h-[520px]">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      quality={95}
                      sizes="(min-width: 1280px) 1000px, 60vw"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {view === "code" && <CodeView project={project} />}
          {view === "preview" && (
            <div className="grid place-items-center h-full text-ink-500 text-sm">
              Interactive preview will render here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CodeView({ project }: { project: Project }) {
  return (
    <pre className="text-xs font-mono p-6 overflow-auto h-full text-ink-900 bg-[#FAFAFA]">
      <code>{`<section className="hero">
  <div className="container mx-auto px-6 py-24 grid grid-cols-2 gap-12">
    <div>
      <h1 className="text-5xl font-medium text-ink-900">
        ${project.title} <span className="text-brand-500">that</span> ships.
      </h1>
      <p className="mt-4 text-lg text-ink-500">
        Generated with UX Pilot — adapt copy and brand to taste.
      </p>
      <div className="mt-8 flex gap-3">
        <Button variant="primary">Start free</Button>
        <Button variant="ghost-pill">Book a demo</Button>
      </div>
    </div>
    <div className="relative">
      <Image src="${project.thumbnail}" alt="Product" fill />
    </div>
  </div>
</section>`}</code>
    </pre>
  );
}
