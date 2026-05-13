"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Copy, MessageText, ArrowRight2, UserAdd, Star1 } from "iconsax-react";
import { PageShell } from "@/components/shared/page-shell";
import { Topbar } from "@/components/shared/topbar";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { Avatar } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/toast";
import { communityPosts, communityFeatured, type CommunityPost } from "@/lib/mock-data";
import { cn } from "@/lib/cn";

const feedTabs = [
  { id: "trending", label: "Trending" },
  { id: "following", label: "Following" },
  { id: "latest", label: "Latest" },
];

export default function CommunityPage() {
  const [feed, setFeed] = useState("trending");

  return (
    <PageShell>
      <Topbar className="absolute top-4 left-4 right-4 lg:top-[39px] lg:left-[39px] lg:right-[39px] z-10" />

      <div className="h-full overflow-y-auto pt-24 pb-12 lg:pt-[110px] px-4 lg:px-10">
        <header>
          <h1 className="text-[24px] sm:text-[28px] lg:text-[32px] font-medium text-[#1A243A] leading-none">Community</h1>
          <p className="mt-2 text-sm text-[#757E91]">See what other designers are shipping with UX Pilot.</p>
        </header>

        <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
          {/* Main feed */}
          <main className="space-y-6 min-w-0">
            <div className="-mx-4 lg:mx-0 px-4 lg:px-0 overflow-x-auto">
              <SegmentedTabs tabs={feedTabs} value={feed} onChange={setFeed} />
            </div>
            {communityPosts.map((p) => (
              <PostCard key={p.id} post={p} />
            ))}
            <div className="py-6 text-center">
              <LoadMoreButton />
            </div>
          </main>

          {/* Right rail — moves below feed on mobile */}
          <aside className="space-y-6">
            <FeaturedDesigners />
            <CommunityStats />
            <ShareYourWork />
          </aside>
        </div>
      </div>
    </PageShell>
  );
}

function PostCard({ post }: { post: CommunityPost }) {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  const { toast } = useToast();
  return (
    <article className="bg-white border border-[#F0F0F0] rounded-2xl overflow-hidden drop-shadow-[0px_4px_6px_rgba(0,0,0,0.04)]">
      {/* Author header */}
      <header className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <Avatar name={post.author} tone={post.authorTone} size={36} />
          <div>
            <div className="text-sm font-medium text-[#1A243A]">{post.author}</div>
            <div className="text-xs text-[#757E91]">{post.postedAt}</div>
          </div>
        </div>
        <button
          onClick={() => {
            setFollowing((v) => !v);
            toast({ title: following ? `Unfollowed ${post.author}` : `Now following ${post.author}` });
          }}
          className={cn(
            "h-8 px-3 inline-flex items-center gap-1.5 rounded-pill text-xs font-medium transition",
            following ? "bg-[#1A243A] text-white" : "border border-[#E1E1E1] bg-white text-[#1A243A] hover:bg-[#F5F5F5]"
          )}
        >
          <UserAdd size={12} variant={following ? "Bold" : "Outline"} color={following ? "#fff" : undefined} />
          {following ? "Following" : "Follow"}
        </button>
      </header>

      {/* Image */}
      <Link href={`/workspace/${post.id}`} className="block px-1">
        <div
          className="relative w-full h-[220px] sm:h-[300px] lg:h-[360px] rounded-xl overflow-hidden"
          style={{ backgroundColor: post.imageBg }}
        >
          {post.imageFit === "top" ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              quality={95}
              sizes="(min-width: 1280px) 1400px, 80vw"
              className="object-cover object-top"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[55%] h-[80%]">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  quality={95}
                  sizes="760px"
                  className="object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="px-5 pt-4 pb-5">
        <h3 className="text-md font-medium text-[#1A243A]">{post.title}</h3>
        <p className="mt-1 text-sm text-[#1A243A]">{post.caption}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <ActionButton
              onClick={() => setLiked((v) => !v)}
              active={liked}
              icon={<Heart size={14} variant={liked ? "Bold" : "Outline"} color={liked ? "#FF3B30" : "#1A243A"} />}
              label={(post.likes + (liked ? 1 : 0)).toLocaleString()}
            />
            <ActionButton
              onClick={() => toast({ tone: "info", title: "Comments", description: "Threaded replies launch soon." })}
              icon={<MessageText size={14} variant="Outline" />}
              label={post.comments.toString()}
            />
            <ActionButton
              onClick={() => toast({ tone: "info", title: "Opening remix workspace…" })}
              icon={<Copy size={14} variant="Outline" />}
              label={`${post.remixes} remixes`}
            />
          </div>
          <Link href={`/workspace/${post.id}`} className="h-9 px-3 inline-flex items-center gap-1 rounded-pill bg-brand-gradient btn-glass-brand text-white text-xs font-medium hover:brightness-110">
            Remix
            <ArrowRight2 size={12} variant="Bold" color="#fff" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function LoadMoreButton() {
  const { toast } = useToast();
  return (
    <button
      onClick={() => toast({ tone: "info", title: "Loading more posts…" })}
      className="h-9 px-4 rounded-pill border border-[#E1E1E1] bg-white text-sm font-medium text-[#1A243A] hover:bg-[#F5F5F5]"
    >
      Load older posts
    </button>
  );
}

function ActionButton({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "h-9 px-3 inline-flex items-center gap-1.5 rounded-pill text-xs font-medium transition",
        active ? "text-[#FF3B30] bg-[#FF3B30]/8" : "text-[#1A243A] hover:bg-[#F5F5F5]"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function FeaturedDesigners() {
  const { toast } = useToast();
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-2xl p-5 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#1A243A]">Featured designers</h3>
        <Link href="#" className="text-xs text-[#757E91] hover:text-[#1A243A]">See all</Link>
      </div>
      <ul className="mt-3 -mx-2 divide-y divide-[#F1F1F1]">
        {communityFeatured.map((d) => (
          <li key={d.id} className="px-2 py-3 flex items-center gap-3">
            <Avatar name={d.name} tone={d.tone} size={36} />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-[#1A243A] truncate">{d.name}</div>
              <div className="text-xs text-[#757E91] truncate">{d.designs} designs · {d.followers} followers</div>
            </div>
            <button
              onClick={() => toast({ title: `Now following ${d.name}` })}
              className="h-8 px-3 rounded-pill border border-[#E1E1E1] text-xs font-medium text-[#1A243A] hover:bg-[#F5F5F5]"
            >
              Follow
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CommunityStats() {
  return (
    <div className="bg-white border border-[#F0F0F0] rounded-2xl p-5 drop-shadow-[0px_4px_6px_rgba(0,0,0,0.04)]">
      <h3 className="text-sm font-medium text-[#1A243A]">This week in community</h3>
      <ul className="mt-3 space-y-3">
        <StatRow label="New designs shared" value="1,248" />
        <StatRow label="Total remixes" value="4,920" />
        <StatRow label="Designers joined" value="312" />
      </ul>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-center justify-between text-sm">
      <span className="text-[#757E91]">{label}</span>
      <span className="font-medium text-[#1A243A]">{value}</span>
    </li>
  );
}

function ShareYourWork() {
  const { toast } = useToast();
  return (
    <div className="relative overflow-hidden rounded-2xl bg-brand-gradient text-white p-5">
      <Star1 size={28} variant="Bold" color="#fff" />
      <h3 className="mt-3 text-md font-medium">Share your latest design</h3>
      <p className="mt-1 text-sm text-white/90">Get featured by the community and earn remix credits.</p>
      <button
        onClick={() => toast({ tone: "info", title: "Pick a design to share", description: "Opening your gallery…" })}
        className="mt-4 h-9 px-3 rounded-pill bg-white text-[#0099FF] text-xs font-medium hover:brightness-95"
      >
        Share a design
      </button>
      <div className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
    </div>
  );
}
