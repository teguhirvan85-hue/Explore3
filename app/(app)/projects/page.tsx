"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowUpDown, Grid2x2, List, Plus } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Topbar } from "@/components/shared/topbar";
import { ProjectCard } from "@/components/ui/project-card";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { TextInput } from "@/components/ui/text-input";
import { Dropdown } from "@/components/ui/dropdown";
import { projects } from "@/lib/mock-data";

const filters = [
  { id: "all", label: "All" },
  { id: "mine", label: "Mine" },
  { id: "shared", label: "Shared" },
  { id: "archived", label: "Archived" },
];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("recent");
  const [view, setView] = useState("grid");

  const filtered = useMemo(() => {
    return projects.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <PageShell>
      <Topbar className="absolute top-4 left-4 right-4 lg:top-[39px] lg:left-[39px] lg:right-[39px] z-10" />

      <div className="h-full overflow-y-auto pt-24 pb-12 lg:pt-[110px] px-4 lg:px-10">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium text-[#1A243A] leading-none">Projects</h1>
            <p className="mt-2 text-sm text-[#757E91]">{filtered.length} projects · last edited May 12, 2026</p>
          </div>
          <Link
            href="/workspace/new"
            className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-pill bg-brand-gradient btn-glass-brand text-white text-sm font-medium hover:brightness-110 self-start sm:self-auto"
          >
            <Plus size={16} strokeWidth={1.5} />
            New Project
          </Link>
        </header>

        {/* Toolbar — wraps on mobile */}
        <div className="mt-6 lg:mt-8 flex flex-col lg:flex-row lg:flex-wrap lg:items-center gap-3">
          <div className="-mx-4 lg:mx-0 px-4 lg:px-0 overflow-x-auto">
            <SegmentedTabs tabs={filters} value={filter} onChange={setFilter} />
          </div>
          <div className="lg:ml-auto flex flex-wrap items-center gap-3">
            <TextInput
              placeholder="Search projects"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              leftIcon={<Search size={14} strokeWidth={1.5} />}
              className="flex-1 sm:w-[280px] sm:flex-none"
            />
            <Dropdown
              prefix={<ArrowUpDown size={14} strokeWidth={1.5} />}
              value={sort}
              onChange={setSort}
              options={[
                { value: "recent", label: "Recently edited" },
                { value: "created", label: "Date created" },
                { value: "name", label: "Name (A–Z)" },
              ]}
            />
            <div className="hidden sm:inline-flex items-center bg-white border border-line-200 rounded-pill p-1">
              <button
                onClick={() => setView("grid")}
                aria-label="Grid view"
                className={`w-8 h-8 rounded-pill inline-flex items-center justify-center ${
                  view === "grid" ? "bg-surface-100 text-ink-900" : "text-ink-500"
                }`}
              >
                <Grid2x2 size={14} strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setView("list")}
                aria-label="List view"
                className={`w-8 h-8 rounded-pill inline-flex items-center justify-center ${
                  view === "list" ? "bg-surface-100 text-ink-900" : "text-ink-500"
                }`}
              >
                <List size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 py-24 text-center">
            <div className="mx-auto w-12 h-12 rounded-2xl bg-surface-100 inline-flex items-center justify-center">
              <Search size={20} strokeWidth={1.5} className="text-ink-500" />
            </div>
            <div className="mt-4 text-md font-medium text-ink-900">No projects match "{search}"</div>
            <div className="text-sm text-ink-500 mt-1">Try a different search or create a new project.</div>
          </div>
        ) : view === "grid" ? (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filtered.map((p) => (
              <ProjectCard key={p.id} {...p} />
            ))}
          </div>
        ) : (
          <ProjectList items={filtered} />
        )}
      </div>
    </PageShell>
  );
}

import Image from "next/image";
import type { Project } from "@/lib/mock-data";

function ProjectList({ items }: { items: Project[] }) {
  return (
    <div className="mt-6 bg-white rounded-2xl border border-line-200 divide-y divide-line-200 overflow-hidden">
      {items.map((p) => (
        <Link key={p.id} href={`/workspace/${p.id}`} className="flex items-center gap-4 px-4 py-3 hover:bg-surface-50 transition">
          <div
            className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0"
            style={{ backgroundColor: p.imageBg ?? "#F9F9F9" }}
          >
            <Image
              src={p.thumbnail}
              alt={p.title}
              fill
              quality={90}
              sizes="128px"
              className={p.imageFit === "center" ? "object-contain p-1" : "object-cover object-top"}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-ink-900 truncate">{p.title}</div>
            <div className="text-xs text-ink-500 mt-0.5">Edited {p.editedAt}</div>
          </div>
          <div className="text-xs text-ink-500">Private</div>
        </Link>
      ))}
    </div>
  );
}
