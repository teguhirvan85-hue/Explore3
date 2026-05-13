"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchNormal1, Mobile, Monitor, Grid6 } from "iconsax-react";
import { PageShell } from "@/components/shared/page-shell";
import { Topbar } from "@/components/shared/topbar";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { TextInput } from "@/components/ui/text-input";
import { generatedDesigns, type GeneratedDesign, projects } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const groupLabels: Record<GeneratedDesign["group"], string> = {
  today: "Today",
  yesterday: "Yesterday",
  "this-week": "Earlier this week",
  older: "Older",
};

export default function DesignsPage() {
  const [project, setProject] = useState("all");
  const [search, setSearch] = useState("");

  const projectFilters = useMemo(
    () => [{ id: "all", label: "All projects" }, ...projects.slice(0, 4).map((p) => ({ id: p.id, label: p.title }))],
    []
  );

  const filtered = useMemo(() => {
    return generatedDesigns.filter((d) => {
      const okProject = project === "all" || d.projectId === project;
      const okSearch = !search || d.title.toLowerCase().includes(search.toLowerCase()) || d.prompt.toLowerCase().includes(search.toLowerCase());
      return okProject && okSearch;
    });
  }, [project, search]);

  const groups = useMemo(() => {
    const map = new Map<GeneratedDesign["group"], GeneratedDesign[]>();
    for (const d of filtered) {
      if (!map.has(d.group)) map.set(d.group, []);
      map.get(d.group)!.push(d);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <PageShell>
      <Topbar className="absolute top-4 left-4 right-4 lg:top-[39px] lg:left-[39px] lg:right-[39px] z-10" />

      <div className="h-full overflow-y-auto pt-24 pb-12 lg:pt-[110px] px-4 lg:px-10">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium text-[#1A243A] leading-none">Designs</h1>
            <p className="mt-2 text-sm text-[#757E91]">Every screen and flow you've generated, across all projects.</p>
          </div>
          <TextInput
            placeholder="Search by prompt or title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<SearchNormal1 size={14} color="#757E91" variant="Outline" />}
            className="w-full sm:w-[320px]"
          />
        </header>

        <div className="mt-6 -mx-4 lg:mx-0 px-4 lg:px-0 overflow-x-auto">
          <SegmentedTabs tabs={projectFilters} value={project} onChange={setProject} />
        </div>

        {/* Stats row */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Stat label="Total designs" value="248" hint="↑ 18 this week" />
          <Stat label="Active projects" value="12" hint="across 4 teams" />
          <Stat label="Remixed by you" value="36" hint="from community" />
          <Stat label="Avg. generation time" value="4.2s" hint="↓ 0.3s vs last week" />
        </div>

        {/* Groups */}
        <div className="mt-10 space-y-10">
          {groups.length === 0 ? (
            <div className="py-24 text-center">
              <div className="text-md font-medium text-[#1A243A]">No designs match your filters.</div>
              <div className="text-sm text-[#757E91] mt-1">Try a different project or search term.</div>
            </div>
          ) : (
            groups.map(([group, items]) => (
              <section key={group}>
                <header className="flex items-baseline justify-between">
                  <h2 className="text-lg font-medium text-[#1A243A]">{groupLabels[group]}</h2>
                  <span className="text-sm text-[#757E91]">{items.length} {items.length === 1 ? "design" : "designs"}</span>
                </header>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {items.map((d) => (
                    <DesignTile key={d.id} d={d} />
                  ))}
                </div>
              </section>
            ))
          )}
        </div>
      </div>
    </PageShell>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-2xl p-4">
      <div className="text-xs text-[#757E91]">{label}</div>
      <div className="mt-1 text-[24px] font-medium text-[#1A243A] leading-none">{value}</div>
      <div className="text-xs text-[#757E91] mt-2">{hint}</div>
    </div>
  );
}

function DesignTile({ d }: { d: GeneratedDesign }) {
  const DeviceIcon = d.device === "mobile" ? Mobile : d.device === "desktop" ? Monitor : Grid6;
  return (
    <Link
      href={`/workspace/${d.projectId}`}
      className="group block bg-white border border-[#F0F0F0] rounded-2xl pt-1 px-1 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.04)] hover:drop-shadow-[0px_6px_10px_rgba(0,0,0,0.06)] transition"
    >
      <div
        className="relative h-[164px] w-full rounded-xl overflow-hidden"
        style={{ backgroundColor: d.imageBg }}
      >
        {d.imageFit === "top" ? (
          <Image
            src={d.thumbnail}
            alt={d.title}
            fill
            quality={95}
            sizes="(min-width: 1280px) 640px, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[200px] h-[150px]">
              <Image
                src={d.thumbnail}
                alt={d.title}
                fill
                quality={95}
                sizes="400px"
                className="object-contain"
              />
            </div>
          </div>
        )}
        <span className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/90 backdrop-blur grid place-items-center">
          <DeviceIcon size={12} color="#1A243A" variant="Outline" />
        </span>
      </div>
      <div className="px-2 py-3">
        <div className="text-[14px] font-medium text-[#1A243A] truncate">{d.title}</div>
        <div className="text-[12px] text-[#757E91] mt-1 truncate" title={d.prompt}>{d.prompt}</div>
        <div className="text-[11px] text-[#757E91] mt-2 flex items-center gap-1.5">
          <span>{d.generatedAt}</span>
          <span aria-hidden>·</span>
          <span className="truncate">{d.projectName}</span>
        </div>
      </div>
    </Link>
  );
}
