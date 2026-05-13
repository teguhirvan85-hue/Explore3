"use client";
import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Share2, MoreHorizontal, Star, Users, Calendar, Layers as LayersIcon, GitBranch, Activity, Plus } from "lucide-react";
import { PageShell } from "@/components/shared/page-shell";
import { Topbar } from "@/components/shared/topbar";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { Avatar } from "@/components/ui/avatar";
import { ShareDialog } from "@/components/ui/share-dialog";
import { useToast } from "@/components/ui/toast";
import { projects } from "@/lib/mock-data";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  const [tab, setTab] = useState("screens");
  const [shareOpen, setShareOpen] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { toast } = useToast();
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <PageShell>
      <Topbar className="absolute top-4 left-4 right-4 lg:top-[39px] lg:left-[39px] lg:right-[39px] z-10" />

      <div className="h-full overflow-y-auto pt-24 pb-12 lg:pt-[110px] px-4 lg:px-10">
        {/* Project header */}
        <section>
        <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
          <div className="relative w-full sm:w-[200px] h-[160px] sm:h-[140px] rounded-2xl overflow-hidden bg-surface-100 border border-line-200 flex-shrink-0">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              quality={95}
              sizes="(min-width: 640px) 400px, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-medium text-ink-900">{project.title}</h1>
              <button
                onClick={() => {
                  setFavorite((v) => !v);
                  toast({ title: favorite ? "Removed from favorites" : "Added to favorites" });
                }}
                aria-label="Favorite"
                className={favorite ? "text-amber-500" : "text-ink-500 hover:text-ink-900"}
              >
                <Star size={16} strokeWidth={1.5} fill={favorite ? "currentColor" : "none"} />
              </button>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-500">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} strokeWidth={1.5} />
                Edited {project.editedAt}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Users size={14} strokeWidth={1.5} />
                3 collaborators
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LayersIcon size={14} strokeWidth={1.5} />
                12 screens
              </span>
            </div>
            <p className="mt-3 text-sm text-ink-500 max-w-xl">
              A modern SaaS landing page for Zoromi analytics dashboard. Generated with AI and iterated to match the brand identity.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Link
                href={`/workspace/${project.id}`}
                className="h-9 px-4 inline-flex items-center gap-2 rounded-pill bg-brand-gradient btn-glass-brand text-white text-sm font-medium hover:brightness-110"
              >
                <Plus size={14} strokeWidth={1.5} />
                Continue Generating
              </Link>
              <button
                onClick={() => setShareOpen(true)}
                className="h-9 px-3 inline-flex items-center gap-2 rounded-pill bg-white border border-line-200 hover:bg-surface-50 text-sm font-medium text-ink-900"
              >
                <Share2 size={14} strokeWidth={1.5} />
                Share
              </button>
              <button
                onClick={() => toast({ tone: "info", title: "More actions", description: "Rename, duplicate, archive, delete." })}
                aria-label="More"
                className="h-9 w-9 rounded-pill inline-flex items-center justify-center bg-white border border-line-200 hover:bg-surface-50 text-ink-900"
              >
                <MoreHorizontal size={16} strokeWidth={1.5} />
              </button>
              <div className="ml-3 flex -space-x-2">
                <Avatar name="Jimmy Sullivan" tone="blue" size={28} className="ring-2 ring-surface-200" />
                <Avatar name="Lena Park" tone="violet" size={28} className="ring-2 ring-surface-200" />
                <Avatar name="Marc Olsen" tone="amber" size={28} className="ring-2 ring-surface-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 lg:mt-8 border-b border-line-200 -mx-4 lg:mx-0 px-4 lg:px-0 overflow-x-auto">
          <SegmentedTabs
            value={tab}
            onChange={setTab}
            tabs={[
              { id: "screens", label: "Screens", icon: <LayersIcon size={14} strokeWidth={1.5} /> },
              { id: "flows", label: "Flows", icon: <GitBranch size={14} strokeWidth={1.5} /> },
              { id: "activity", label: "Activity", icon: <Activity size={14} strokeWidth={1.5} /> },
            ]}
          />
        </div>

        {/* Tab content */}
        <div className="mt-6">
          {tab === "screens" && <ScreensTab project={project} />}
          {tab === "flows" && <EmptyState title="No flows yet" description="Generate connected screens to create a flow." />}
          {tab === "activity" && <ActivityTab />}
        </div>
        </section>
      </div>

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} title={project.title} url={url} />
    </PageShell>
  );
}

function ScreensTab({ project }: { project: { id: string; thumbnail: string } }) {
  const screens = [
    { id: "hero-v1", title: "Hero — V1", time: "3 min ago" },
    { id: "hero-v2", title: "Hero — V2 (bold)", time: "8 min ago" },
    { id: "features", title: "Features Grid", time: "12 min ago" },
    { id: "pricing", title: "Pricing Table", time: "18 min ago" },
    { id: "testimonials", title: "Testimonials Strip", time: "23 min ago" },
    { id: "faq", title: "FAQ Accordion", time: "27 min ago" },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {screens.map((s) => (
        <Link
          key={s.id}
          href={`/workspace/${project.id}`}
          className="block bg-white rounded-2xl border border-line-200 overflow-hidden hover:shadow-lifted-md transition"
        >
          <div className="relative h-[164px] m-1 rounded-xl overflow-hidden bg-surface-100">
            <Image
              src={project.thumbnail}
              alt={s.title}
              fill
              quality={95}
              sizes="(min-width: 1280px) 640px, 50vw"
              className="object-cover object-top"
            />
          </div>
          <div className="px-4 py-3">
            <div className="text-md font-medium text-ink-900 truncate">{s.title}</div>
            <div className="text-sm text-ink-500 mt-0.5">{s.time}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ActivityTab() {
  const items = [
    { time: "3 min ago", user: "Jimmy", tone: "blue" as const, action: "regenerated", target: "Hero V2 (bold variant)" },
    { time: "8 min ago", user: "Jimmy", tone: "blue" as const, action: "renamed", target: 'project to "Zoromi Landingpage"' },
    { time: "12 min ago", user: "Lena", tone: "violet" as const, action: "commented on", target: "Features Grid" },
    { time: "1 hour ago", user: "Marc", tone: "amber" as const, action: "shared", target: "the project with 2 people" },
    { time: "Yesterday", user: "Jimmy", tone: "blue" as const, action: "created", target: "the project" },
  ];
  return (
    <ol className="bg-white rounded-2xl border border-line-200 overflow-hidden divide-y divide-line-200">
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-3 px-4 py-3">
          <Avatar name={it.user} tone={it.tone} size={28} />
          <div className="flex-1 text-sm text-ink-900">
            <span className="font-medium">{it.user}</span> {it.action} <span className="text-ink-700">{it.target}</span>
          </div>
          <div className="text-xs text-ink-500">{it.time}</div>
        </li>
      ))}
    </ol>
  );
}

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="py-24 text-center">
      <div className="mx-auto w-12 h-12 rounded-2xl bg-surface-100 inline-flex items-center justify-center">
        <LayersIcon size={20} strokeWidth={1.5} className="text-ink-500" />
      </div>
      <div className="mt-4 text-md font-medium text-ink-900">{title}</div>
      <div className="text-sm text-ink-500 mt-1">{description}</div>
    </div>
  );
}
