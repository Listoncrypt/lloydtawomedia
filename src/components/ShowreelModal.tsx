import React from 'react';
import { X, Film, Award } from 'lucide-react';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="showreel-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="showreel-modal-container"
        className="relative w-full max-w-5xl bg-[#1A1A1A] border border-[#333] shadow-2xl flex flex-col text-white"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#333] bg-[#161616]">
          <div className="flex items-center gap-3">
            <Film className="w-4 h-4 text-[#D9C4A1]" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-semibold text-[#F7F7F5]">
              LLOYD TAWO — CINEMATOGRAPHY SHOWREEL
            </span>
          </div>

          <button
            id="showreel-close-btn"
            onClick={onClose}
            className="p-1.5 text-[#AAA] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black">
          <iframe
            src="https://player.vimeo.com/video/76979871?autoplay=1&muted=0&loop=1&title=0&byline=0&portrait=0"
            className="w-full h-full border-0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Lloyd Tawo Cinematographer Showreel"
          />
        </div>

        {/* Reel Highlights footer */}
        <div className="p-6 bg-[#161616] border-t border-[#333] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#AAA]">
          <div className="space-y-1">
            <div className="text-white font-medium text-xs">Featured Productions:</div>
            <div className="text-[#888] font-sans-ui text-xs">
              Kura (Seasons 1–3) • Marlon Williams: Ngā Ao E Rua • A Century in Sound • Breathe • I Love Ugly
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[#D9C4A1] flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#B47822]" />
              <span>NZCS & Screen Awards Honored</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
