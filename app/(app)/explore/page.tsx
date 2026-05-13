"use client";
import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { SearchNormal1, Heart, Copy, ArrowRight2 } from "iconsax-react";
import { PageShell } from "@/components/shared/page-shell";
import { Topbar } from "@/components/shared/topbar";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { TextInput } from "@/components/ui/text-input";
import { Avatar } from "@/components/ui/avatar";
import { publicDesigns, type PublicDesign } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const filters = [
  { id: "trending", label: "Trending" },
  { id: "recent", label: "Recent" },
  { id: "Dashboard", label: "Dashboards" },
  { id: "Landing", label: "Landing" },
  { id: "Mobile App", label: "Mobile" },
  { id: "Marketing", label: "Marketing" },
];

export default function ExplorePage() {
  const [filter, setFilter] = useState("trending");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = publicDesigns;
    if (filter !== "trending" && filter !== "recent") {
      list = list.filter((d) => d.category === filter);
    }
    if (filter === "trending") list = [...list].sort((a, b) => b.likes - a.likes);
    if (filter === "recent") list = [...list].sort((a, b) => a.daysAgo - b.daysAgo);
    if (search) list = list.filter((d) => d.title.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [filter, search]);

  const hero = publicDesigns[0];

  return (
    <PageShell>
      <Topbar className="absolute top-4 left-4 right-4 lg:top-[39px] lg:left-[39px] lg:right-[39px] z-10" />

      <div className="h-full overflow-y-auto pt-24 pb-12 lg:pt-[110px] px-4 lg:px-10">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium text-[#1A243A] leading-none">Explore</h1>
            <p className="mt-2 text-sm text-[#757E91]">Trending generations from the community. Remix anything to make it yours.</p>
          </div>
          <TextInput
            placeholder="Search public designs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<SearchNormal1 size={14} color="#757E91" variant="Outline" />}
            className="w-full sm:w-[280px]"
          />
        </header>

        <section className="mt-6 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4">
          <FeaturedCard design={hero} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-4">
            {publicDesigns.slice(1, 3).map((d) => (
              <FeaturedCard key={d.id} design={d} compact />
            ))}
          </div>
        </section>

        <section className="mt-6 lg:mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="-mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto">
            <SegmentedTabs tabs={filters} value={filter} onChange={setFilter} />
          </div>
          <div className="text-sm text-[#757E91]">{filtered.length} designs</div>
        </section>

        <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d) => (
            <DesignCard key={d.id} design={d} />
          ))}
        </section>
      </div>
    </PageShell>
  );
}

function FeaturedCard({ design, compact = false }: { design: PublicDesign; compact?: boolean }) {
  return (
    <Link
      href={`/workspace/${design.id}`}
      className="group relative block bg-white border border-[#F0F0F0] rounded-2xl pt-1 px-1 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.04)] hover:drop-shadow-[0px_6px_10px_rgba(0,0,0,0.06)] transition overflow-hidden"
    >
      <div
        className={cn("relative w-full rounded-xl overflow-hidden", compact ? "h-[140px]" : "h-[320px]")}
        style={{ backgroundColor: design.imageBg }}
      >
        {design.imageFit === "top" ? (
          <Image
            src={design.thumbnail}
            alt={design.title}
            fill
            quality={95}
            sizes="(min-width: 1280px) 900px, 60vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[60%] h-[80%]">
              <Image
                src={design.thumbnail}
                alt={design.title}
                fill
                quality={95}
                sizes="500px"
                className="object-contain"
              />
            </div>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[#1A243A] text-[11px] font-medium px-2 py-1 rounded-pill">
          {design.category}
        </span>
      </div>
      <div className="flex items-center justify-between px-2 py-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar name={design.author} tone={design.authorTone} size={24} />
          <div className="min-w-0">
            <div className="text-[14px] font-medium text-[#1A243A] truncate">{design.title}</div>
            <div className="text-[12px] text-[#757E91] truncate">by {design.author}</div>
          </div>
        </div>
        <div className="flex items-center gap-3 text-[#757E91] text-[12px]">
          <span className="inline-flex items-center gap-1"><Heart size={12} variant="Outline" />{design.likes.toLocaleString()}</span>
          <span className="inline-flex items-center gap-1"><Copy size={12} variant="Outline" />{design.remixes}</span>
        </div>
      </div>
    </Link>
  );
}

function DesignCard({ design }: { design: PublicDesign }) {
  return (
    <Link
      href={`/workspace/${design.id}`}
      className="group block bg-white border border-[#F0F0F0] rounded-2xl pt-1 px-1 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.04)] hover:drop-shadow-[0px_6px_10px_rgba(0,0,0,0.06)] transition"
    >
      <div
        className="relative h-[200px] w-full rounded-xl overflow-hidden"
        style={{ backgroundColor: design.imageBg }}
      >
        {design.imageFit === "top" ? (
          <Image
            src={design.thumbnail}
            alt={design.title}
            fill
            quality={95}
            sizes="(min-width: 1280px) 720px, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[180px] h-[140px]">
              <Image
                src={design.thumbnail}
                alt={design.title}
                fill
                quality={95}
                sizes="360px"
                className="object-contain"
              />
            </div>
          </div>
        )}
        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-[#1A243A] text-[11px] font-medium px-2 py-1 rounded-pill">
          {design.category}
        </span>
        <button className="absolute bottom-3 right-3 h-8 px-3 inline-flex items-center gap-1 rounded-pill bg-[#1A243A] text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition">
          Remix <ArrowRight2 size={12} variant="Bold" />
        </button>
      </div>
      <div className="flex items-center justify-between px-2 py-3 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar name={design.author} tone={design.authorTone} size={22} />
          <div className="min-w-0">
            <div className="text-[14px] font-medium text-[#1A243A] truncate">{design.title}</div>
            <div className="text-[12px] text-[#757E91] truncate">by {design.author}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#757E91] text-[12px]">
          <span className="inline-flex items-center gap-1"><Heart size={12} variant="Outline" />{design.likes > 999 ? `${(design.likes / 1000).toFixed(1)}k` : design.likes}</span>
        </div>
      </div>
    </Link>
  );
}
