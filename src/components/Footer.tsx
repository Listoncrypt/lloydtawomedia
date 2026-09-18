import React from 'react';
import { ArrowUp } from 'lucide-react';
import { SITE, HAS_DIRECT_CONTACT, telHref } from '../data/siteConfig';

interface FooterProps {
  onNavigate?: (view: 'home' | 'work' | 'information' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-zinc-900 text-zinc-400 py-16 text-xs font-mono">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-base font-bold tracking-[0.25em] uppercase text-white block">
                LLOYD TAWO
              </span>
              <span className="text-[10px] text-zinc-500 border border-zinc-700 px-1.5 py-0.5">
                FILMS
              </span>
            </div>

            <p className="text-zinc-400 font-mono text-xs leading-relaxed max-w-sm">
              LLoyd Tawo Films — Director of Photography and cinematic production. Working across narrative features, TV drama, feature documentaries, commercials, and music videos.
            </p>

            <div className="text-[11px] text-zinc-500 space-y-0.5 font-mono">
              <div>LLOYD TAWO FILMS</div>
              <div>WORLDWIDE AVAILABILITY & CO-PRODUCTIONS</div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="text-white uppercase tracking-[0.2em] text-[10px] block font-bold">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-zinc-400 font-mono text-xs">
              <li>
                <button
                  onClick={() => onNavigate?.('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left uppercase"
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('work')}
                  className="hover:text-white transition-colors cursor-pointer text-left uppercase"
                >
                  WORK (INDEX)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('information')}
                  className="hover:text-white transition-colors cursor-pointer text-left uppercase"
                >
                  INFORMATION & AWARDS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left uppercase"
                >
                  CONTACT
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3">
            <span className="text-white uppercase tracking-[0.2em] text-[10px] block font-bold">
              DIRECT CONTACT
            </span>
            <div className="space-y-2 text-zinc-400 font-mono text-xs">
              {SITE.contact.email && (
                <div>
                  <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">EMAIL</span>
                  <a href={`mailto:${SITE.contact.email}`} className="text-white hover:underline">
                    {SITE.contact.email}
                  </a>
                </div>
              )}

              {SITE.contact.phone && (
                <div>
                  <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">MOBILE / WHATSAPP</span>
                  <a href={telHref(SITE.contact.phone)} className="text-white hover:underline">
                    {SITE.contact.phone}
                  </a>
                </div>
              )}

              {SITE.contact.instagram && (
                <div>
                  <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">INSTAGRAM</span>
                  <a
                    href={`https://instagram.com/${SITE.contact.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    @{SITE.contact.instagram}
                  </a>
                </div>
              )}

              {SITE.contact.linkedin && (
                <div>
                  <span className="text-zinc-600 block text-[9px] uppercase tracking-wider">LINKEDIN</span>
                  <a
                    href={SITE.contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:underline"
                  >
                    LLOYD TAWO
                  </a>
                </div>
              )}

              {!HAS_DIRECT_CONTACT && (
                <button
                  onClick={() => onNavigate?.('contact')}
                  className="text-white hover:underline cursor-pointer text-left uppercase tracking-wider"
                >
                  SEND A PROJECT BRIEF →
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-[11px]">
          <div>
            © {new Date().getFullYear()} LLOYD TAWO FILMS. ALL RIGHTS RESERVED.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-zinc-400 uppercase tracking-widest text-[10px]"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
