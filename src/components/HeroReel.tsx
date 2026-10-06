import React from 'react';
import { Play, Sparkles, Award, ArrowDown, ChevronRight } from 'lucide-react';

interface HeroReelProps {
  onOpenReel: () => void;
  onExploreWork: () => void;
  onOpenAiStudio: () => void;
}

export const HeroReel: React.FC<HeroReelProps> = ({
  onOpenReel,
  onExploreWork,
  onOpenAiStudio,
}) => {
  return (
    <section id="hero-section" className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-16 overflow-hidden border-b border-[#E2E2DF] gallery-grid">
      {/* Featured Showcase: Artistic Flair Layout */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-end">
          
          {/* Main Visual Frame (Large 8-col architectural container) */}
          <div className="lg:col-span-8 relative">
            <div
              id="hero-reel-card"
              onClick={onOpenReel}
              className="group relative aspect-[16/10] overflow-hidden bg-[#E8E8E6] border border-[#DCDCD9] shadow-sm cursor-pointer"
            >
              {/* Inner framing line */}
              <div className="absolute inset-4 border border-[#D1D1CF]/70 z-10 pointer-events-none transition-all group-hover:inset-3 group-hover:border-white/80" />

              {/* Cinema Still / Showcase Image */}
              <img
                src="/assets/selected_work_montage_poster.webp"
                alt="Lloyd Tawo Cinematography Showreel Preview"
                className="w-full h-full object-cover grayscale-[15%] contrast-105 group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />

              {/* Case Study Tag Badge */}
              <div className="absolute bottom-8 left-8 z-20">
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] bg-white/90 text-[#1A1A1A] px-3.5 py-1.5 backdrop-blur-sm border border-[#DDD] shadow-xs">
                  Featured Reel / 2026
                </span>
              </div>

              {/* Hover Play Prompt */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-20">
                <div className="w-16 h-16 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current translate-x-0.5" />
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Title & Architectural Metadata (4-col) */}
          <div className="lg:col-span-4 flex flex-col justify-end space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-[#888]">
                <Award className="w-3.5 h-3.5 text-[#B47822]" />
                <span>NZ Screen Awards 2025 Winner</span>
              </div>

              {/* Editorial Serif Italic Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-editorial italic text-[#1A1A1A] leading-[1.08] tracking-tight">
                Crafting visual rhythm, light & emotive cinema.
              </h1>

              <p className="text-sm leading-relaxed text-[#555] font-light max-w-sm pt-2 font-sans-ui">
                Lloyd Tawo is a Cinematographer and founder of LLoyd Tawo Films with over 15 years of experience across narrative features, drama series (<em className="italic text-[#1A1A1A]">Kura</em>), documentaries, and music videos.
              </p>
            </div>

            {/* Architectural Spec Rows (From Artistic Flair design pattern) */}
            <div className="flex flex-col gap-3 font-mono text-[10px] uppercase tracking-widest text-[#777]">
              <div className="flex justify-between border-t border-[#DDD] pt-3">
                <span>Location</span>
                <span className="text-[#1A1A1A] font-semibold">Auckland, NZ (Global)</span>
              </div>
              <div className="flex justify-between border-t border-[#DDD] pt-3">
                <span>Core Glass</span>
                <span className="text-[#1A1A1A] font-semibold">Panavision Anamorphic</span>
              </div>
              <div className="flex justify-between border-t border-[#DDD] pt-3">
                <span>Accolades</span>
                <span className="text-[#1A1A1A] font-semibold">NZCS Gold & Best Camerawork</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-play-reel-btn"
                onClick={onOpenReel}
                className="px-5 py-2.5 rounded-full bg-[#1A1A1A] text-[#F7F7F5] text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-black transition-all flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Watch Reel</span>
              </button>

              <button
                id="hero-explore-work-btn"
                onClick={onExploreWork}
                className="px-4 py-2.5 rounded-full border border-[#CCC] bg-white/80 hover:bg-white text-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Works (12)</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#888]" />
              </button>

              <button
                id="hero-ai-lab-btn"
                onClick={onOpenAiStudio}
                className="px-4 py-2.5 rounded-full border border-[#D9C4A1] bg-[#F4EDE0] hover:bg-[#EFE3CF] text-[#7A4B0E] text-[10px] uppercase tracking-[0.2em] font-medium transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#B47822]" />
                <span>AI Lab</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll / Archive indicator bar */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#888]">
        <div className="flex items-center gap-3">
          <span>Case Studies & Archive</span>
          <span>—</span>
          <span>2013 — 2026</span>
        </div>
        <button
          onClick={onExploreWork}
          className="flex items-center gap-2 hover:text-[#1A1A1A] transition-colors cursor-pointer"
        >
          <span>Scroll for Gallery View</span>
          <ArrowDown className="w-3 h-3 animate-bounce" />
        </button>
      </div>
    </section>
  );
};
