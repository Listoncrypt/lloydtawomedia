import React from 'react';
import { SITE } from '../data/siteConfig';

export const InformationSection: React.FC = () => {
  return (
    <section id="information" className="pt-28 pb-24 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 bg-black text-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5 flex flex-col">
          <div className="relative border border-white bg-black p-1">
            <div className="relative w-full aspect-3/4 sm:aspect-4/5 overflow-hidden bg-zinc-950">
              <img
                src="/assets/FUFUA_collection_full_poster.webp"
                alt="Frame from Fufua Collection — Lloyd Tawo Films"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6 border-t border-zinc-900">
                <span className="text-[10px] font-mono tracking-[0.25em] text-zinc-400 uppercase block">
                  LLOYD TAWO FILMS
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-12">
          <div className="font-mono text-sm sm:text-base md:text-lg leading-relaxed text-zinc-200 uppercase tracking-wide space-y-4">
            <p>
              Lloyd Tawo is a cinematographer and founder of LLoyd Tawo Films, working across
              brand and commercial films, travel, corporate, and long-form interview.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between text-zinc-600 text-[11px] font-mono tracking-widest border-t border-zinc-900">
            <span>{SITE.location || 'WORLDWIDE AVAILABILITY'}</span>
            <span>© LLOYD TAWO FILMS {new Date().getFullYear()}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
