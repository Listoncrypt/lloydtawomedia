import React from 'react';

interface LaurelBadgeProps {
  type: string;
}

export const LaurelBadge: React.FC<LaurelBadgeProps> = ({ type }) => {
  const upper = type.toUpperCase();

  if (upper.includes('PALM SPRINGS') || upper.includes('SHORTFEST')) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-white select-none pointer-events-none p-1">
        <div className="flex items-center gap-2 opacity-95">
          <svg className="w-6 h-14 sm:w-8 sm:h-18 fill-white" viewBox="0 0 24 50">
            <path d="M12 2 C8 8, 4 14, 2 24 C4 20, 8 18, 12 16 C8 24, 6 30, 6 42 C10 38, 12 32, 14 26 C12 36, 14 44, 18 48 C16 38, 18 28, 22 18 C18 22, 16 12, 12 2 Z" opacity="0.9"/>
          </svg>
          <div className="flex flex-col items-center px-1">
            <span className="text-[7px] sm:text-[8px] font-mono tracking-widest uppercase">OFFICIAL SELECTION</span>
            <span className="text-[6px] sm:text-[7px] font-mono tracking-wider text-zinc-300">PALM SPRINGS INTERNATIONAL</span>
            <span className="text-sm sm:text-base font-extrabold tracking-[0.18em] font-mono leading-none my-0.5">SHORT</span>
            <span className="text-sm sm:text-base font-extrabold tracking-[0.18em] font-mono leading-none">FEST</span>
            <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-zinc-300 mt-0.5">2025</span>
          </div>
          <svg className="w-6 h-14 sm:w-8 sm:h-18 fill-white transform scale-x-[-1]" viewBox="0 0 24 50">
            <path d="M12 2 C8 8, 4 14, 2 24 C4 20, 8 18, 12 16 C8 24, 6 30, 6 42 C10 38, 12 32, 14 26 C12 36, 14 44, 18 48 C16 38, 18 28, 22 18 C18 22, 16 12, 12 2 Z" opacity="0.9"/>
          </svg>
        </div>
      </div>
    );
  }

  if (upper.includes('WHĀNAU') || upper.includes('WHANAU') || upper.includes('NZIFF')) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-white select-none pointer-events-none p-1">
        <div className="flex items-center gap-2 opacity-95">
          <svg className="w-5 h-12 sm:w-7 sm:h-16 fill-white" viewBox="0 0 24 50">
            <path d="M12 2 C8 8, 4 14, 2 24 C4 20, 8 18, 12 16 C8 24, 6 30, 6 42 C10 38, 12 32, 14 26 C12 36, 14 44, 18 48 C16 38, 18 28, 22 18 C18 22, 16 12, 12 2 Z" opacity="0.9"/>
          </svg>
          <div className="flex flex-col items-center px-1">
            <span className="text-[6px] sm:text-[7px] font-mono tracking-[0.25em] uppercase">SELECTION</span>
            <span className="text-[11px] sm:text-xs font-bold font-mono tracking-[0.2em] uppercase my-0.5">WHĀNAU</span>
            <span className="text-[11px] sm:text-xs font-bold font-mono tracking-[0.2em] uppercase mb-0.5">MĀRAMA</span>
            <span className="text-[6px] sm:text-[7px] font-mono tracking-wider text-zinc-300">NEW ZEALAND</span>
            <span className="text-[6px] sm:text-[7px] font-mono tracking-wider text-zinc-300">INTERNATIONAL</span>
            <span className="text-[6px] sm:text-[7px] font-mono tracking-wider text-zinc-300">FILM FESTIVAL</span>
            <span className="text-[7px] sm:text-[8px] font-mono tracking-widest text-zinc-300 mt-0.5">2025</span>
          </div>
          <svg className="w-5 h-12 sm:w-7 sm:h-16 fill-white transform scale-x-[-1]" viewBox="0 0 24 50">
            <path d="M12 2 C8 8, 4 14, 2 24 C4 20, 8 18, 12 16 C8 24, 6 30, 6 42 C10 38, 12 32, 14 26 C12 36, 14 44, 18 48 C16 38, 18 28, 22 18 C18 22, 16 12, 12 2 Z" opacity="0.9"/>
          </svg>
        </div>
      </div>
    );
  }

  if (upper.includes('SUNDANCE')) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-white select-none pointer-events-none p-1">
        <div className="flex items-center gap-1.5 opacity-90">
          <svg className="w-5 h-12 sm:w-6 sm:h-14 fill-white" viewBox="0 0 24 50">
            <path d="M12 2 C8 8, 4 14, 2 24 C4 20, 8 18, 12 16 C8 24, 6 30, 6 42 C10 38, 12 32, 14 26 C12 36, 14 44, 18 48 C16 38, 18 28, 22 18 C18 22, 16 12, 12 2 Z" opacity="0.85"/>
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-[7px] sm:text-[8px] font-mono tracking-widest uppercase">OFFICIAL SELECTION</span>
            <span className="text-sm sm:text-base font-bold tracking-[0.2em] font-mono">sundance</span>
            <span className="text-[6px] sm:text-[7px] font-mono tracking-wider">FILM FESTIVAL</span>
          </div>
          <svg className="w-5 h-12 sm:w-6 sm:h-14 fill-white transform scale-x-[-1]" viewBox="0 0 24 50">
            <path d="M12 2 C8 8, 4 14, 2 24 C4 20, 8 18, 12 16 C8 24, 6 30, 6 42 C10 38, 12 32, 14 26 C12 36, 14 44, 18 48 C16 38, 18 28, 22 18 C18 22, 16 12, 12 2 Z" opacity="0.85"/>
          </svg>
        </div>
      </div>
    );
  }

  if (upper.includes('MIFF')) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-white select-none pointer-events-none p-1">
        <div className="flex items-center gap-1.5 opacity-90">
          <svg className="w-4 h-10 sm:w-5 sm:h-12 fill-white" viewBox="0 0 24 50">
            <path d="M12 2 C8 8, 4 14, 2 24 C4 20, 8 18, 12 16 C8 24, 6 30, 6 42 C10 38, 12 32, 14 26 C12 36, 14 44, 18 48 C16 38, 18 28, 22 18 C18 22, 16 12, 12 2 Z" opacity="0.85"/>
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-[6px] sm:text-[7px] font-mono tracking-wider uppercase">Official Selection</span>
            <span className="text-xs sm:text-sm font-bold tracking-[0.15em] font-mono">MIFF</span>
            <span className="text-[6px] sm:text-[7px] font-mono tracking-wider">MELBOURNE INTL</span>
          </div>
          <svg className="w-4 h-10 sm:w-5 sm:h-12 fill-white transform scale-x-[-1]" viewBox="0 0 24 50">
            <path d="M12 2 C8 8, 4 14, 2 24 C4 20, 8 18, 12 16 C8 24, 6 30, 6 42 C10 38, 12 32, 14 26 C12 36, 14 44, 18 48 C16 38, 18 28, 22 18 C18 22, 16 12, 12 2 Z" opacity="0.85"/>
          </svg>
        </div>
      </div>
    );
  }

  if (upper.includes('SHOW ME') || upper.includes('SHORTS') || upper.includes('VISION')) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-white select-none pointer-events-none p-1">
        <div className="flex items-center gap-1.5 opacity-90">
          <svg className="w-4 h-10 sm:w-5 sm:h-12 fill-white" viewBox="0 0 24 50">
            <path d="M12 2 C8 8, 4 14, 2 24 C4 20, 8 18, 12 16 C8 24, 6 30, 6 42 C10 38, 12 32, 14 26 C12 36, 14 44, 18 48 C16 38, 18 28, 22 18 C18 22, 16 12, 12 2 Z" opacity="0.85"/>
          </svg>
          <div className="flex flex-col items-center">
            <span className="text-[6px] font-mono tracking-wider uppercase">OFFICIAL SELECTION</span>
            <span className="text-[8px] sm:text-[9px] font-bold font-mono tracking-wider">SHOW ME SHORTS</span>
            <span className="text-[6px] font-mono tracking-wider">FILM FESTIVAL</span>
          </div>
          <svg className="w-4 h-10 sm:w-5 sm:h-12 fill-white transform scale-x-[-1]" viewBox="0 0 24 50">
            <path d="M12 2 C8 8, 4 14, 2 24 C4 20, 8 18, 12 16 C8 24, 6 30, 6 42 C10 38, 12 32, 14 26 C12 36, 14 44, 18 48 C16 38, 18 28, 22 18 C18 22, 16 12, 12 2 Z" opacity="0.85"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 text-white/90 text-[9px] font-mono tracking-widest border border-white/40 px-2 py-0.5 bg-black/60 backdrop-blur-xs">
      <span>{type}</span>
    </div>
  );
};
