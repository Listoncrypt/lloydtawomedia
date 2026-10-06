import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableDescriptionProps {
  description: string;
  className?: string;
  label?: string;
}

export const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
  description,
  className = '',
  label,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description || !description.trim()) return null;

  const isLong = description.length > 130 || description.includes('\n');

  return (
    <div className={`font-mono ${className}`}>
      {label && (
        <div className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-500 mb-2 font-semibold flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full" />
          <span>{label}</span>
        </div>
      )}

      <div className="relative">
        <div
          className={`text-xs sm:text-[13px] text-zinc-300 leading-relaxed transition-all duration-300 whitespace-pre-line ${
            !isExpanded && isLong ? 'line-clamp-2' : ''
          }`}
        >
          {description}
        </div>

        {!isExpanded && isLong && (
          <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />
        )}
      </div>

      {isLong && (
        <div className="pt-2 sm:pt-3">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-white hover:text-zinc-300 border border-zinc-700 hover:border-white px-3 py-1.5 bg-zinc-950/80 transition-colors cursor-pointer select-none"
            aria-expanded={isExpanded}
          >
            <span>{isExpanded ? 'SEE LESS' : 'SEE MORE'}</span>
            {isExpanded ? (
              <ChevronUp className="w-3 h-3 text-zinc-400" />
            ) : (
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
