import { Folder2 } from "iconsax-react";
import Link from "next/link";
import { PageShell } from "@/components/shared/page-shell";
import { Topbar } from "@/components/shared/topbar";
import { PromptInput } from "@/components/ui/prompt-input";
import { ProjectCard } from "@/components/ui/project-card";
import { projects } from "@/lib/mock-data";

export default function HomePage() {
  return (
    <PageShell>
      {/* Topbar — absolute on desktop, in-flow on mobile to keep padding consistent */}
      <Topbar className="absolute top-4 left-4 right-4 lg:top-[39px] lg:left-[39px] lg:right-[39px] z-10" />

      <div className="h-full flex flex-col items-center overflow-y-auto pt-24 pb-6 lg:pt-[180px] lg:pb-3 px-4 lg:px-10 lg:justify-between">
        {/* Hero + Generator card */}
        <div className="flex flex-col items-center gap-8 lg:gap-[60px] w-full">
          <div className="flex flex-col items-center gap-2 text-center px-2">
            <h1
              className="text-[28px] sm:text-[34px] lg:text-[40px] font-medium leading-[1.2]"
              style={{ color: "#1A243A" }}
            >
              <span>Good morning, </span>
              <span style={{ color: "#757E91" }}>Jimmy</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-[20px] leading-[1.2] text-[#757E91]">
              Start generating your designs
            </p>
          </div>

          <PromptInput />
        </div>

        {/* Project section */}
        <section className="w-full flex flex-col gap-4 pt-10 lg:pt-6">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Folder2 size={16} color="#1A243A" variant="Outline" />
              <span className="text-lg font-medium text-[#1A243A] leading-none">Project</span>
            </div>
            <Link
              href="/projects"
              className="text-sm text-[#757E91] hover:text-[#1A243A]"
            >
              See all →
            </Link>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
            {projects.slice(0, 4).map((p) => (
              <ProjectCard key={p.id} {...p} />
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
