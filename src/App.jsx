import React, { useMemo, useState, useEffect } from "react";
import {
  Menu,
  MessageCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  PlayCircle,
  Clock,
  Image as ImageIcon,
  Video as VideoIcon,
  Filter,
  SlidersHorizontal,
  ThumbsUp,
  Eye,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

// Helper to generate recent timestamps
const minutesAgo = (mins) => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - mins);
  return d.toISOString();
};

// Base mock items without the Concept Art tag
const BASE_MOCK_ITEMS = [
  {
    id: 1,
    type: "post",
    category: "Brand Identity",
    title: "Cold Brew Brand Grid",
    subtitle: "Instagram carousel for a coffee startup.",
    imageUrl:
      "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1000&q=80",
    layout: "carousel",
    createdAt: minutesAgo(130), // Simulating a 2h 10m gap
    likes: 420,
    views: 1800,
  },
  {
    id: 2,
    type: "post",
    category: "Social Design",
    title: "Quarterly Launch Highlights",
    subtitle: "Static post series for SaaS dashboard.",
    imageUrl:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1000&q=80",
    layout: "static",
    createdAt: minutesAgo(12),
    likes: 310,
    views: 1320,
  },
  {
    id: 3,
    type: "story",
    category: "Story Series",
    title: "D2C Skincare Launch Story",
    subtitle: "9:16 story pack with CTA frames.",
    imageUrl:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=900&q=80",
    layout: "story",
    createdAt: minutesAgo(22),
    likes: 280,
    views: 980,
  },
  {
    id: 4,
    type: "reel",
    category: "Reel / Short",
    title: "Before / After Brand Glow-Up",
    subtitle: "Vertical reel edit with motion graphics.",
    videoUrl:
      "https://images.unsplash.com/photo-1516031190212-da133013de50?auto=format&fit=crop&w=900&q=80",
    createdAt: minutesAgo(28),
    likes: 960,
    views: 4200,
  },
  {
    id: 5,
    type: "post",
    category: "Carousel",
    title: "Founder Story Swipe Series",
    subtitle: "Carousel optimized for LinkedIn & Instagram.",
    imageUrl:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1100&q=80",
    layout: "carousel",
    createdAt: minutesAgo(35),
    likes: 510,
    views: 2100,
  },
  {
    id: 6,
    type: "post",
    category: "Ad Creative",
    title: "Performance Ad Variations",
    subtitle: "A/B test-ready static ad set.",
    imageUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1100&q=80",
    layout: "static",
    createdAt: minutesAgo(48),
    likes: 640,
    views: 2600,
  },
  {
    id: 7,
    type: "story",
    category: "Story Series",
    title: "Launch Countdown Story Kit",
    subtitle: "Teasers, countdown & reveal frames.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=80",
    layout: "story",
    createdAt: minutesAgo(60),
    likes: 330,
    views: 1120,
  },
  {
    id: 8,
    type: "reel",
    category: "Reel / Short",
    title: "UI Animation Teaser",
    subtitle: "App walkthrough with smooth micro-interactions.",
    videoUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80",
    createdAt: minutesAgo(72),
    likes: 870,
    views: 3890,
  },
  {
    id: 9,
    type: "post",
    category: "Case Study",
    title: "30-Day Content Sprint",
    subtitle: "Results-focused carousel breakdown.",
    imageUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1100&q=80",
    layout: "carousel",
    createdAt: minutesAgo(95),
    likes: 720,
    views: 3050,
  },
  {
    id: 10,
    type: "reel",
    category: "Reel / Short",
    title: "Client Testimonial Snippets",
    subtitle: "Vertical testimonial edit with subtitles.",
    videoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    createdAt: minutesAgo(120),
    likes: 690,
    views: 2760,
  },
  {
    id: 11,
    type: "post",
    category: "Grid Design",
    title: "Minimal Agency Grid",
    subtitle: "3x3 grid for Instagram home feed.",
    imageUrl:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1100&q=80",
    layout: "static",
    createdAt: minutesAgo(180),
    likes: 410,
    views: 1540,
  },
  {
    id: 12,
    type: "story",
    category: "Story Series",
    title: "Template Pack Story Preview",
    subtitle: "Story launch for Notion + Canva pack.",
    imageUrl:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1000&q=80",
    layout: "story",
    createdAt: minutesAgo(210),
    likes: 295,
    views: 970,
  },
  {
    id: 13,
    type: "reel",
    category: "Reel / Short",
    title: "Logo Reveal Animation",
    subtitle: "Short logo sting with sound design.",
    videoUrl:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1000&q=80",
    createdAt: minutesAgo(260),
    likes: 820,
    views: 3420,
  },
  {
    id: 14,
    type: "post",
    category: "Social Design",
    title: "Product Drop Announcement",
    subtitle: "Static drop announcement for streetwear brand.",
    imageUrl:
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1100&q=80",
    layout: "static",
    createdAt: minutesAgo(300),
    likes: 540,
    views: 2210,
  },
  {
    id: 15,
    type: "reel",
    category: "Reel / Short",
    title: "Behind-the-Scenes Snippets",
    subtitle: "Studio BTS cuts for Instagram Reels.",
    videoUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
    createdAt: minutesAgo(360),
    likes: 760,
    views: 2980,
  },
];

// Logic to inject auto-generated content if gap > 2 hours (10 AM - 8 PM)
const injectAutoGeneratedContent = (items) => {
  const now = new Date();
  const hour = now.getHours();

  // Only run between 10 AM and 8 PM
  if (hour < 10 || hour >= 20) return items;

  const latestItem = items[0];
  if (!latestItem) return items;

  const latestTime = new Date(latestItem.createdAt);
  const diffMs = now - latestTime;
  const diffMins = Math.round(diffMs / 60000);

  // If gap is greater than 120 minutes (2 hours)
  if (diffMins > 120) {
    const autoItem = {
      id: "auto-ai-1",
      type: "post",
      category: "Concept Art",
      title: "Auto-Generated Concept",
      subtitle: "AI filling the gap to keep the feed alive.",
      imageUrl:
        "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=1000&q=80", // AI/Abstract image
      layout: "static",
      createdAt: minutesAgo(0), // Just now
      likes: 0,
      views: 0,
      isConceptArt: true,
    };
    return [autoItem, ...items];
  }

  return items;
};

// Enhance with a random 10% "Concept Art" tag to simulate AI generated backup
// And apply auto-post logic
const MOCK_ITEMS = injectAutoGeneratedContent(
  BASE_MOCK_ITEMS.map((item) => ({
    ...item,
    isConceptArt: Math.random() < 0.1,
  }))
);

const getLiveStatusLabel = () => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 10 && hour < 20) {
    const options = ["Just uploaded", "Updated 12 mins ago", "Updated 5 mins ago"];
    return options[now.getMinutes() % options.length];
  }

  const lastUpdate = new Date();
  lastUpdate.setHours(19, 55, 0, 0);
  const timeStr = lastUpdate.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return `Last updated today at ${timeStr}`;
};

const formatRelativeTime = (isoString) => {
  const now = new Date();
  const then = new Date(isoString);
  const diffMs = now - then;
  const diffMins = Math.round(diffMs / 60000);

  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
};

const typeLabelMap = {
  post: "Post",
  story: "Story",
  reel: "Reel",
};

// Normalize media URLs (e.g., Google Drive links -> direct download)
const normalizeMediaUrl = (url) => {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    const isDrive = host.includes("drive.google.com") || host.includes("docs.google.com");
    if (isDrive) {
      const idFromQuery = parsed.searchParams.get("id");
      const idFromPath = parsed.pathname.split("/d/")[1]?.split("/")[0];
      const fileId = idFromQuery || idFromPath;
      if (fileId) {
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
    }
    return url;
  } catch {
    return url;
  }
};

function Header({ onToggleFilters, isFilterOpen, liveStatus }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 shadow-sm shadow-slate-200/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-slate-50">
              DM
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-slate-900">
                  Diviner Media
                </span>
                <span className="inline-flex items-center rounded-full bg-slate-900/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
                  Live Portfolio
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Creative studio for high-converting social design.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50/80 px-3 py-1 text-xs text-emerald-700 sm:flex">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium">Feed active</span>
            <span className="h-4 w-px bg-emerald-200" />
            <span className="flex items-center gap-1 text-[11px] text-emerald-700/80">
              <Clock className="h-3 w-3" /> {liveStatus}
            </span>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:border-slate-300 hover:bg-slate-50"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>New project slot open</span>
          </button>

          <button
            type="button"
            className="ml-1 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm hover:bg-slate-100 lg:hidden"
            onClick={onToggleFilters}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mobile live status */}
      <div className="border-t border-slate-200 bg-white/90 sm:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-emerald-700">Feed active</span>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-slate-500">
            <Clock className="h-3 w-3" />
            {liveStatus}
          </span>
        </div>

        {isFilterOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-2 text-xs text-slate-600 lg:hidden">
            <p className="text-[11px] text-slate-500">
              Use the filter below to view Posts, Stories, or Reels.
            </p>
          </div>
        )}
      </div>
    </header>
  );
}

function MasonryItemCard({ item, isLatest, liveStatus, onOpen, onRegisterView }) {
  const handleClick = () => {
    onRegisterView?.(item.id);
    onOpen?.(item);
  };

  const handleMouseEnter = () => {
    onRegisterView?.(item.id);
  };

  const handleImgError = (e) => {
    if (e.currentTarget.dataset.fallback) return;
    e.currentTarget.dataset.fallback = "true";
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1200&q=80";
  };

  return (
    <article
      className="mb-4 break-inside-avoid cursor-pointer rounded-3xl border border-slate-200 bg-white shadow-md shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-lg"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative overflow-hidden rounded-t-3xl bg-slate-100">
        {item.type === "story" ? (
          <div className="relative w-full aspect-[9/16] overflow-hidden bg-slate-100">
            <img
              src={normalizeMediaUrl(item.imageUrl)}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={handleImgError}
            />
            <div className="absolute inset-x-3 top-3 flex items-center justify-between">
              <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-50">
                Story Series
              </span>
              <span className="flex gap-0.5">
                <span className="h-0.5 w-5 rounded-full bg-slate-50/80" />
                <span className="h-0.5 w-5 rounded-full bg-slate-50/40" />
                <span className="h-0.5 w-5 rounded-full bg-slate-50/20" />
              </span>
            </div>
          </div>
        ) : (
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-100">
            <img
              src={normalizeMediaUrl(item.imageUrl)}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={handleImgError}
            />
            {item.layout === "carousel" && (
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-1 text-[10px] font-medium text-slate-50">
                <ImageIcon className="h-3 w-3" />
                <span>Carousel preview</span>
              </div>
            )}
          </div>
        )}

        {isLatest && (
          <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white shadow shadow-emerald-500/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/80 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            <span>Just in</span>
          </div>
        )}
      </div>

      <div className="space-y-2 px-3.5 py-3.5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-900/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                {item.category}
              </span>
              <span className="rounded-full bg-slate-900/5 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                {typeLabelMap[item.type]}
              </span>
            </div>
            <h3 className="mt-1 text-sm font-semibold tracking-tight text-slate-900">
              {item.title}
            </h3>
          </div>
        </div>
        <p className="text-xs text-slate-500">{item.subtitle}</p>
        <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatRelativeTime(item.createdAt)}</span>
          </span>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
              <Eye className="h-3 w-3" />
              {item.totalViews.toLocaleString()}
            </span>
            {isLatest ? (
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                {liveStatus}
              </span>
            ) : item.isConceptArt ? (
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500">
                AI Used
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function ReelCard({ item, isLatest, onOpen, onRegisterView }) {
  const handleClick = () => {
    onRegisterView?.(item.id);
    onOpen?.(item);
  };

  const handleMouseEnter = () => {
    onRegisterView?.(item.id);
  };

  const coverSrc = normalizeMediaUrl(item.videoUrl || item.imageUrl);

  const handleImgError = (e) => {
    if (e.currentTarget.dataset.fallback) return;
    e.currentTarget.dataset.fallback = "true";
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80";
  };

  return (
    <article
      className="flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/70 shadow-lg shadow-slate-900/60 backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400/60 hover:shadow-cyan-500/40"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative">
        <div className="aspect-[9/16] w-full overflow-hidden bg-slate-900">
          <img
            src={coverSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImgError}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/60 backdrop-blur">
              <PlayCircle className="h-7 w-7 text-slate-50" />
            </div>
          </div>
          {isLatest && (
            <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white">
              Live reel
            </div>
          )}
        </div>
      </div>
      <div className="space-y-1.5 px-3 py-3 text-slate-50">
        <div className="flex items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="rounded-full bg-slate-900/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-200">
                {item.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/40 px-2 py-0.5 text-[10px] text-slate-200">
                <VideoIcon className="h-3 w-3" /> Reel
              </span>
            </div>
            <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-50">
              {item.title}
            </h3>
          </div>
        </div>
        <p className="line-clamp-2 text-xs text-slate-300">{item.subtitle}</p>
        <div className="mt-2 flex items-center justify-between text-[11px] text-slate-300">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> {formatRelativeTime(item.createdAt)}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] font-medium">
              <Eye className="h-3 w-3" />
              {item.totalViews.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

function MobileFeedItem({ item, onOpen, onRegisterView }) {
  const isReel = item.type === "reel";
  const mediaAspectClass =
    item.type === "story"
      ? "w-full aspect-[9/16]"
      : item.layout === "carousel"
        ? "aspect-[4/5]"
        : "aspect-[4/5]";

  const handleClick = () => {
    onRegisterView?.(item.id);
    onOpen?.(item);
  };

  const handleMouseEnter = () => {
    onRegisterView?.(item.id);
  };

  const totalViews = item.totalViews ?? item.views ?? 0;
  const likes = item.likes ?? 0;
  const mediaSrc = isReel
    ? normalizeMediaUrl(item.videoUrl || item.imageUrl)
    : normalizeMediaUrl(item.imageUrl);
  const handleImgError = (e) => {
    if (e.currentTarget.dataset.fallback) return;
    e.currentTarget.dataset.fallback = "true";
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1529101091764-c3526daf38fe?auto=format&fit=crop&w=1200&q=80";
  };

  return (
    <article
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md shadow-slate-200/60 transition hover:-translate-y-0.5 hover:shadow-lg"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
    >
      <div
        className={`relative overflow-hidden ${isReel ? "aspect-[9/16] w-full bg-slate-900" : `bg-slate-100 ${mediaAspectClass}`
          }`}
      >
        {isReel ? (
          <>
            <img
              src={mediaSrc}
              alt={item.title}
              className="h-full w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={handleImgError}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 backdrop-blur">
                <PlayCircle className="h-7 w-7 text-slate-50" />
              </div>
            </div>
          </>
        ) : (
          <img
            src={mediaSrc}
            alt={item.title}
            className="h-full w-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={handleImgError}
          />
        )}
        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-50">
          <span className="flex items-center gap-1">
            {isReel ? <VideoIcon className="h-3 w-3" /> : <ImageIcon className="h-3 w-3" />}
            {typeLabelMap[item.type]}
          </span>
        </div>
      </div>
      <div className="space-y-1.5 px-3.5 py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-slate-900/5 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
              {item.category}
            </span>
          </div>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <Clock className="h-3 w-3" /> {formatRelativeTime(item.createdAt)}
          </span>
        </div>
        <h3 className="text-sm font-semibold tracking-tight text-slate-900">
          {item.title}
        </h3>
        <p className="text-xs text-slate-500">{item.subtitle}</p>
        <div className="mt-1 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            <span>{likes.toLocaleString()} likes</span>
          </span>
          <span className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{totalViews.toLocaleString()} views</span>
          </span>
        </div>
      </div>
    </article>
  );
}

function FooterCTA() {
  return (
    <footer className="border-t border-slate-200 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-300">
            Let&apos;s add your brand to this feed
          </p>
          <p className="mt-1 max-w-md text-sm text-slate-300/90">
            Share a quick brief on WhatsApp or explore our microservices menu. We reply
            fast during working hours.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-orange-500/40 hover:bg-orange-600"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Share your experience on WhatsApp</span>
          </a>

          <a
            href="/microservices"
            className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-50 shadow-sm hover:bg-slate-800"
          >
            <span>View our services</span>
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function FilterBar({
  topCategories,
  allCategories,
  activeCategory,
  onCategoryChange,
  showAllCategories,
  onToggleShowAll,
  timeFilter,
  onTimeFilterChange,
  sortMode,
  onSortModeChange,
}) {
  const timeOptions = [
    { value: "all", label: "All time" },
    { value: "1w", label: "1 week" },
    { value: "2w", label: "2 weeks" },
    { value: "3w", label: "3 weeks" },
    { value: "4w", label: "4 weeks" },
    { value: "1m", label: "1 month" },
  ];

  const sortOptions = [
    { value: "latest", label: "Latest updated" },
    { value: "views", label: "Most viewed" },
    { value: "best", label: "Best collection" },
  ];

  const renderCategoryPill = (category, key) => (
    <button
      key={key || category}
      type="button"
      onClick={() => onCategoryChange(category)}
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition ${activeCategory === category
        ? "border-slate-900 bg-slate-900 text-slate-50"
        : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
        }`}
    >
      {category === "all" && <Sparkles className="h-3 w-3" />}
      <span>{category === "all" ? "All categories" : category}</span>
    </button>
  );

  return (
    <section className="mb-4 mt-2 rounded-3xl border border-slate-200 bg-white/95 px-3.5 py-3.5 shadow-md shadow-slate-200/60">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2">
          <div className="mt-0.5 rounded-full bg-slate-900/5 p-1.5">
            <Filter className="h-3.5 w-3.5 text-slate-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Live feed filters
            </p>
            <p className="text-xs text-slate-500">
              Tune what you see across posts, stories & reels in one go.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleShowAll}
          className="inline-flex items-center justify-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:bg-slate-100"
        >
          <span>{showAllCategories ? "Collapse" : "See all"}</span>
          {showAllCategories ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </button>
      </div>

      {/* Top categories row */}
      <div className="mt-3 flex flex-wrap gap-1.5">
        {renderCategoryPill("all", "all")}
        {topCategories.map((cat) => renderCategoryPill(cat))}
      </div>

      {/* Expanded categories + sort controls */}
      {showAllCategories && (
        <div className="mt-3 space-y-3 border-t border-slate-200 pt-3">
          <div className="flex flex-wrap gap-1.5">
            {allCategories.map((cat) =>
              topCategories.includes(cat) ? null : renderCategoryPill(cat)
            )}
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/5 px-2 py-0.5 font-medium text-slate-600">
                <Clock className="h-3 w-3" />
                Duration
              </span>
              {timeOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => onTimeFilterChange(opt.value)}
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition ${timeFilter === opt.value
                    ? "bg-slate-900 text-slate-50"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ItemModal({ item, isLatest, liveStatus, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  if (!item) return null;

  const isReel = item.type === "reel";
  const isCarousel = item.layout === "carousel";
  const isStory = item.layout === "story";

  const slideCount = isCarousel ? 5 : isStory ? 4 : 1;

  const handlePrev = () => {
    if (slideCount <= 1) return;
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handleNext = () => {
    if (slideCount <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX == null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };

  const formattedExactTime = new Date(item.createdAt).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const mediaSrc = isReel
    ? normalizeMediaUrl(item.videoUrl || item.imageUrl)
    : normalizeMediaUrl(item.imageUrl);
  const handleImgError = (e) => {
    if (e.currentTarget.dataset.fallback) return;
    e.currentTarget.dataset.fallback = "true";
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&w=1200&q=80";
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 px-3 py-6 sm:px-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50 shadow-2xl shadow-slate-900/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3 sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Piece overview
            </p>
            <h2 className="text-sm font-semibold text-slate-50 sm:text-base">
              {item.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-200 hover:bg-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-1 flex-col gap-4 overflow-hidden p-4 sm:flex-row sm:p-6">
          {/* Media area */}
          <div className="flex-1 flex items-center justify-center">
            {item.type === "reel" || item.type === "story" ? (
              <div
                className="relative mx-auto aspect-[9/16] max-h-full w-full max-w-sm overflow-hidden bg-black rounded-2xl"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={mediaSrc}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={handleImgError}
                />
                {item.type === "reel" && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 backdrop-blur">
                      <PlayCircle className="h-8 w-8 text-slate-50" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                className="relative mx-auto w-full max-w-xl max-h-full overflow-hidden bg-black rounded-2xl"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <img
                  src={mediaSrc}
                  alt={item.title}
                  className="h-full w-full object-contain"
                  referrerPolicy="no-referrer"
                  onError={handleImgError}
                />

                {slideCount > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-slate-50 backdrop-blur hover:bg-black/70"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-slate-50 backdrop-blur hover:bg-black/70"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {Array.from({ length: slideCount }).map((_, idx) => (
                        <span
                          key={idx}
                          className={`h-0.5 rounded-full transition-all ${idx === currentSlide ? "w-5 bg-orange-400" : "w-3 bg-slate-500/60"
                            }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          {isStory && (
            <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between">
              <div className="flex flex-1 gap-1">
                {Array.from({ length: slideCount }).map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-0.5 flex-1 rounded-full ${idx <= currentSlide ? "bg-orange-400" : "bg-slate-600"
                      }`}
                  />
                ))}
              </div>
            </div>
          )}


          {/* Info area */}
          <aside className="flex w-full flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-3 text-xs sm:w-72 sm:p-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-200">
                {item.category}
              </span>
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                {typeLabelMap[item.type]} • {item.layout}
              </span>
              {item.isConceptArt && (
                <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-medium text-violet-100">
                  <Sparkles className="h-3 w-3" /> Concept art
                </span>
              )}
              {isLatest && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Live in feed
                </span>
              )}
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Snapshot
              </p>
              <p className="mt-1 text-xs text-slate-200">{item.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-900/80 p-2">
              <div className="space-y-0.5">
                <p className="text-[10px] text-slate-500">Created</p>
                <p className="text-[11px] font-medium text-slate-100">
                  {formattedExactTime}
                </p>
                <p className="text-[10px] text-slate-500">
                  {formatRelativeTime(item.createdAt)}
                </p>
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] text-slate-500">Engagement</p>
                <p className="text-[11px] text-slate-100">
                  <span className="inline-flex items-center gap-1">
                    <ThumbsUp className="h-3 w-3" /> {item.likes.toLocaleString()} likes
                  </span>
                </p>
                <p className="text-[11px] text-slate-100">
                  <span className="inline-flex items-center gap-1">
                    <Eye className="h-3 w-3" /> {item.totalViews.toLocaleString()} views
                  </span>
                </p>
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Meta
              </p>
              <dl className="space-y-1 text-[11px] text-slate-300">
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">ID</dt>
                  <dd className="font-mono text-[10px] text-slate-300">#{item.id}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Format</dt>
                  <dd className="text-right">{item.type}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Layout</dt>
                  <dd className="text-right">{item.layout || "single"}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Status</dt>
                  <dd className="text-right">{isLatest ? liveStatus : "In production"}</dd>
                </div>
              </dl>
            </div>

            <div className="mt-1 rounded-xl bg-slate-900/80 p-2 text-[11px] text-slate-300">
              <p>
                This view aggregates everything we track live for this piece: timing,
                format, category, engagement and whether it&apos;s being surfaced in the
                active feed right now.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div >
  );
}

function AdminPanel({ onAddItem }) {
  const [type, setType] = useState("post");
  const [category, setCategory] = useState("Social Design");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [layout, setLayout] = useState("static");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const nowIso = new Date().toISOString();

    const newItem = {
      id: Date.now(),
      type,
      category: category.trim() || "Social Design",
      title: title.trim(),
      subtitle: subtitle.trim(),
      imageUrl: type === "reel" ? undefined : imageUrl.trim(),
      videoUrl: type === "reel" ? videoUrl.trim() : undefined,
      layout: type === "story" ? "story" : layout,
      createdAt: nowIso,
      likes: 0,
      views: 0,
      isConceptArt: false,
    };

    onAddItem(newItem);

    setTitle("");
    setSubtitle("");
    setImageUrl("");
    setVideoUrl("");
  };

  return (
    <section className="mt-8 mb-10 rounded-3xl border border-slate-200 bg-white px-4 py-4 text-xs shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
            Admin upload panel
          </p>
          <p className="text-xs text-slate-500">
            Paste your hosted image / reel URLs to push new work into the live feed.
          </p>
        </div>
        <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] font-medium text-slate-50">
          Local only
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        <div className="space-y-2">
          <label className="block text-[11px] font-medium text-slate-600">
            Format
          </label>
          <div className="flex flex-wrap gap-1.5">
            {["post", "story", "reel"].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setType(val)}
                className={`rounded-full px-3 py-1 text-[11px] font-medium ${type === val
                  ? "bg-slate-900 text-slate-50"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                {val === "post" && "Post"}
                {val === "story" && "Story"}
                {val === "reel" && "Reel / Short"}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-600">
            Category
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
            placeholder="e.g. Social Design, Brand Identity"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-600">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
            placeholder="Project name or hook"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-[11px] font-medium text-slate-600">
            Subtitle
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
            placeholder="Short context, result or niche"
          />
        </div>

        {type !== "reel" && (
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-600">
              Image URL
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
              placeholder="https://.../your-design.jpg"
            />
            <p className="text-[10px] text-slate-400">
              Upload to /public/uploads or a free host and paste the link.
            </p>
          </div>
        )}

        {type === "reel" && (
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-600">
              Vertical video / reel URL
            </label>
            <input
              type="url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
              placeholder="https://.../vertical-reel.mp4"
            />
          </div>
        )}

        {type === "post" && (
          <div className="space-y-1">
            <label className="block text-[11px] font-medium text-slate-600">
              Layout
            </label>
            <select
              value={layout}
              onChange={(e) => setLayout(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-slate-900 focus:ring-1 focus:ring-slate-900/40"
            >
              <option value="static">Static</option>
              <option value="carousel">Carousel</option>
            </select>
          </div>
        )}

        <div className="flex items-end justify-end sm:col-span-2">
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-xs font-semibold text-slate-50 hover:bg-slate-800"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Push to live feed</span>
          </button>
        </div>
      </form>
    </section>
  );
}

function App() {
  const [activeMobileFilter, setActiveMobileFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [items, setItems] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("dm_live_items");
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch {
          // ignore parse error and fall back to seed
        }
      }
    }
    return MOCK_ITEMS;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("dm_live_items", JSON.stringify(items));
    }
  }, [items]);

  const [driveItems, setDriveItems] = useState([]);

  useEffect(() => {
    async function loadDriveFeed() {
      try {
        const res = await fetch("/api/portfolio-feed-placeholder.json");
        if (!res.ok) return;
        const data = await res.json();
        if (Array.isArray(data.items)) {
          setDriveItems(data.items);
        }
      } catch (err) {
        console.error("Failed to fetch Drive feed", err);
      }
    }
    loadDriveFeed();
  }, []);

  const handleAddItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  const [activeCategory, setActiveCategory] = useState("all");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [timeFilter, setTimeFilter] = useState("all");
  const [sortMode, setSortMode] = useState("latest");
  const [viewCounts, setViewCounts] = useState(() => {
    const initial = {};
    MOCK_ITEMS.forEach((item) => {
      initial[item.id] = item.views || 0;
    });
    return initial;
  });
  const [activeItem, setActiveItem] = useState(null);

  const registerView = (id) => {
    setViewCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const itemsWithViews = useMemo(
    () =>
      items.map((item) => ({
        ...item,
        totalViews: viewCounts[item.id] ?? item.views ?? 0,
      })),
    [items, viewCounts]
  );

  const combinedItems = useMemo(() => {
    const original = itemsWithViews || [];
    const fromDrive = driveItems || [];

    // Override by ID (Drive wins if IDs clash)
    const map = new Map();
    original.forEach((i) => map.set(String(i.id), i));
    fromDrive.forEach((i) => {
      map.set(String(i.id), {
        ...i,
        totalViews: i.views ?? 0,
      });
    });
    return Array.from(map.values());
  }, [itemsWithViews, driveItems]);

  const latestItemId = useMemo(() => {
    if (!combinedItems.length) return null;
    return combinedItems.reduce((latest, current) =>
      new Date(current.createdAt) > new Date(latest.createdAt) ? current : latest
    ).id;
  }, [combinedItems]);

  const liveStatusLabel = useMemo(() => getLiveStatusLabel(), []);

  const { allCategories, topCategories } = useMemo(() => {
    const counts = {};
    combinedItems.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    const allCategoriesArr = Object.keys(counts).sort();
    const topCategoriesArr = [...allCategoriesArr]
      .sort((a, b) => counts[b] - counts[a])
      .slice(0, 5);
    return { allCategories: allCategoriesArr, topCategories: topCategoriesArr };
  }, [combinedItems]);

  const filteredItems = useMemo(() => {
    let items = [...combinedItems];

    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory);
    }

    if (timeFilter !== "all") {
      const now = new Date();
      let daysBack = 0;
      if (timeFilter === "1w") daysBack = 7;
      else if (timeFilter === "2w") daysBack = 14;
      else if (timeFilter === "3w") daysBack = 21;
      else if (timeFilter === "4w") daysBack = 28;
      else if (timeFilter === "1m") daysBack = 30;

      if (daysBack > 0) {
        const threshold = new Date(now);
        threshold.setDate(now.getDate() - daysBack);
        items = items.filter((item) => new Date(item.createdAt) >= threshold);
      }
    }

    items = [...items].sort((a, b) => {
      if (sortMode === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortMode === "views") {
        const vA = a.totalViews || 0;
        const vB = b.totalViews || 0;
        if (vB !== vA) return vB - vA;
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortMode === "best") {
        const scoreA = (a.likes || 0) * 2 + (a.totalViews || 0);
        const scoreB = (b.likes || 0) * 2 + (b.totalViews || 0);
        if (scoreB !== scoreA) return scoreB - scoreA;
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    return items;
  }, [combinedItems, activeCategory, timeFilter, sortMode]);

  const reels = useMemo(
    () => filteredItems.filter((item) => item.type === "reel"),
    [filteredItems]
  );

  const desktopMasonryItems = useMemo(
    () => filteredItems.filter((item) => item.type !== "reel"),
    [filteredItems]
  );

  const mobileFeedItems = useMemo(() => {
    let items = [...filteredItems];
    if (activeMobileFilter === "posts") items = items.filter((i) => i.type === "post");
    if (activeMobileFilter === "stories") items = items.filter((i) => i.type === "story");
    if (activeMobileFilter === "reels") items = items.filter((i) => i.type === "reel");
    return items;
  }, [filteredItems, activeMobileFilter]);

  return (
    <div
      className="flex min-h-screen flex-col text-slate-900
      bg-[#f8fafc]
      [background-image:radial-gradient(circle_at_1px_1px,#e2e8f0_1px,transparent_0)]
      [background-size:16px_16px]"
    >
      <Header
        onToggleFilters={() => setIsFilterOpen((prev) => !prev)}
        isFilterOpen={isFilterOpen}
        liveStatus={liveStatusLabel}
      />

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pb-10 pt-4 lg:pt-6">
        <FilterBar
          topCategories={topCategories}
          allCategories={allCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          showAllCategories={showAllCategories}
          onToggleShowAll={() => setShowAllCategories((prev) => !prev)}
          timeFilter={timeFilter}
          onTimeFilterChange={setTimeFilter}
          sortMode={sortMode}
          onSortModeChange={setSortMode}
        />

        {/* Desktop split layout */}
        <div className="hidden gap-6 lg:flex">
          {/* Left: Masonry grid */}
          <section className="w-2/3">
            <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
              {desktopMasonryItems.map((item) => (
                <MasonryItemCard
                  key={item.id}
                  item={item}
                  isLatest={item.id === latestItemId}
                  liveStatus={liveStatusLabel}
                  onOpen={setActiveItem}
                  onRegisterView={registerView}
                />
              ))}
            </div>
          </section>

          {/* Right: Sticky reels feed - visually distinct with aqua stroke */}
          <aside className="sticky top-24 flex h-[calc(100vh-8rem)] w-1/3 flex-col gap-3 overflow-y-auto rounded-3xl border border-cyan-400/60 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950/95 p-3 shadow-xl shadow-cyan-500/30">
            <div className="mb-1 flex items-center justify-between px-1">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-300">
                  Reels & Video Room
                </p>
                <p className="text-xs text-slate-400">
                  Vertical-first edits, pinned in a dedicated lane.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/80 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Live lane
              </span>
            </div>
            <div className="flex flex-1 flex-col gap-3 pb-2">
              {reels.map((item) => (
                <ReelCard
                  key={item.id}
                  item={item}
                  isLatest={item.id === latestItemId}
                  onOpen={setActiveItem}
                  onRegisterView={registerView}
                />
              ))}
            </div>
          </aside>
        </div>

        {/* Mobile mixed feed */}
        <div className="flex flex-col gap-3 lg:hidden">
          {mobileFeedItems.map((item) => (
            <MobileFeedItem
              key={item.id}
              item={item}
              onOpen={setActiveItem}
              onRegisterView={registerView}
            />
          ))}
        </div>


        <AdminPanel onAddItem={handleAddItem} />
      </main >

      <FooterCTA />

      {
        activeItem && (
          <ItemModal
            item={activeItem}
            isLatest={activeItem.id === latestItemId}
            liveStatus={liveStatusLabel}
            onClose={() => setActiveItem(null)}
          />
        )
      }
    </div >
  );
}

export default App;
