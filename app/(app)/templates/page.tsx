"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Crown, Users, Sparkles } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Topbar } from "@/components/shared/topbar";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { TextInput } from "@/components/ui/text-input";
import { templates, type Template } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const categories = [
  { id: "all", label: "All" },
  { id: "Dashboard", label: "Dashboards" },
  { id: "Landing", label: "Landing" },
  { id: "Mobile App", label: "Mobile" },
  { id: "E-commerce", label: "E-commerce" },
  { id: "Marketing", label: "Marketing" },
];

export default function TemplatesPage() {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchCat = cat === "all" || t.category === cat;
      const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [cat, search]);

  return (
    <PageShell>
      <Topbar className="absolute top-4 left-4 right-4 lg:top-[39px] lg:left-[39px] lg:right-[39px] z-10" />

      <div className="h-full overflow-y-auto pt-24 pb-12 lg:pt-[110px] px-4 lg:px-10">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium text-[#1A243A] leading-none">Templates</h1>
            <p className="mt-2 text-sm text-[#757E91]">Start from a proven design and customize with AI.</p>
          </div>
          <TextInput
            placeholder="Search templates"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={14} strokeWidth={1.5} />}
            className="w-full sm:w-[280px]"
          />
        </header>

        <Link
          href="/plans"
          className="mt-6 block relative overflow-hidden rounded-3xl bg-brand-gradient text-white p-5 sm:p-6 hover:brightness-105 transition"
        >
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur rounded-pill px-3 py-1 text-xs font-medium">
              <Sparkles size={12} strokeWidth={2} />
              Featured
            </div>
            <h2 className="mt-3 text-md sm:text-lg font-medium">Unlock 200+ Pro templates</h2>
            <p className="mt-1 text-sm text-white/90">Premium dashboards, landing pages, and full mobile flows — curated weekly.</p>
          </div>
          <div className="absolute inset-y-0 right-0 w-[400px] opacity-30 bg-[radial-gradient(circle_at_center,white,transparent)]" />
        </Link>

        <div className="mt-6 -mx-4 lg:mx-0 px-4 lg:px-0 overflow-x-auto">
          <SegmentedTabs tabs={categories} value={cat} onChange={setCat} />
        </div>

        {filtered.length === 0 ? (
          <div className="mt-12 py-24 text-center">
            <div className="text-md font-medium text-ink-900">No templates match your filters.</div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((t) => (
              <TemplateCard key={t.id} {...t} />
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}

function TemplateCard(t: Template) {
  const bg = t.imageBg ?? "#F9F9F9";
  const fit = t.imageFit ?? "top";
  return (
    <Link
      href={`/workspace/${t.id}`}
      className="group block bg-white rounded-2xl border border-line-200 overflow-hidden hover:shadow-lifted-md transition"
    >
      <div
        className="relative h-[200px] m-1 rounded-xl overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        {fit === "top" ? (
          <Image
            src={t.thumbnail}
            alt={t.title}
            fill
            quality={95}
            sizes="(min-width: 1280px) 720px, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[240px] h-[180px]">
              <Image
                src={t.thumbnail}
                alt={t.title}
                fill
                quality={95}
                sizes="480px"
                className="object-contain"
              />
            </div>
          </div>
        )}
        <div className="absolute top-2 left-2 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-2 py-1 rounded-pill text-xs font-medium backdrop-blur",
              t.tier === "Pro" ? "bg-ink-900/85 text-white" : "bg-white/90 text-ink-900"
            )}
          >
            {t.tier === "Pro" && <Crown size={10} strokeWidth={2} />}
            {t.tier}
          </span>
          <span className="bg-white/90 backdrop-blur text-ink-900 text-xs font-medium px-2 py-1 rounded-pill">
            {t.category}
          </span>
        </div>
      </div>
      <div className="px-4 py-3 flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-md font-medium text-ink-900 truncate">{t.title}</div>
          <div className="text-sm text-ink-500 mt-0.5 inline-flex items-center gap-1.5">
            <Users size={12} strokeWidth={1.5} />
            {t.uses.toLocaleString()} uses
          </div>
        </div>
        <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-pill bg-brand-gradient btn-glass-brand text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition">
          Use
        </button>
      </div>
    </Link>
  );
}
