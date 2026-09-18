import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { SITE } from '../data/siteConfig';
import { LaurelBadge } from './LaurelBadge';

interface WorkGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenAiStudio?: () => void;
}

interface GridCardProps {
  project: Project;
  orderIndex: string;
  onSelect: (p: Project) => void;
  className?: string;
  startDelay: number;
}

const GridCard: React.FC<GridCardProps> = ({
  project,
  orderIndex,
  onSelect,
  className = '',
  startDelay,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasRevealed, setHasRevealed] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const hoverSrc = project.previewLoop || project.previewVideo;
  const objectPosition = project.thumbnailPosition || 'center';

  const cornerDelay = startDelay;
  const lineDrawDelay = startDelay + 0.12;
  const imageDelay = startDelay + 0.75;
  const textDelay = startDelay + 0.95;

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      id={`work-item-${project.id}`}
      onClick={() => onSelect(project)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-black group cursor-pointer flex flex-col w-full h-full select-none overflow-hidden ${className}`}
    >
      {/* Frame construction animation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible"
        style={{ width: '100%', height: '100%' }}
      >
        <motion.path
          d="M 0 14 L 0 0 L 14 0"
          fill="none"
          stroke="white"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: cornerDelay }}
        />
        <motion.path
          d="M calc(100% - 14px) 0 L 100% 0 L 100% 14"
          fill="none"
          stroke="white"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: cornerDelay + 0.04 }}
        />
        <motion.path
          d="M 100% calc(100% - 14px) L 100% 100% L calc(100% - 14px) 100%"
          fill="none"
          stroke="white"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: cornerDelay + 0.08 }}
        />
        <motion.path
          d="M 14 100% L 0 100% L 0 calc(100% - 14px)"
          fill="none"
          stroke="white"
          strokeWidth="1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: cornerDelay + 0.06 }}
        />

        <motion.line
          x1="0%" y1="0" x2="100%" y2="0"
          stroke="white" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: lineDrawDelay, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.line
          x1="100%" y1="0" x2="100%" y2="100%"
          stroke="white" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: lineDrawDelay + 0.08, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.line
          x1="100%" y1="100%" x2="0%" y2="100%"
          stroke="white" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: lineDrawDelay + 0.16, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.line
          x1="0%" y1="100%" x2="0%" y2="0%"
          stroke="white" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.45, delay: lineDrawDelay + 0.22, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* Header bar */}
      <div className="relative px-3 sm:px-3.5 py-1.5 sm:py-2 bg-black flex items-center justify-between z-20 shrink-0 border-b border-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: textDelay }}
          className="flex items-center gap-2 min-w-0"
        >
          <span className="text-[10px] sm:text-xs font-mono tracking-[0.18em] font-semibold text-white uppercase truncate">
            {project.itemNumber || orderIndex} &nbsp;{project.title}
          </span>
        </motion.div>
      </div>

      {/* Media area */}
      <div className="relative w-full flex-1 overflow-hidden bg-black flex items-center justify-center min-h-0">
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)', scale: 1.03 }}
          animate={
            hasRevealed
              ? { opacity: 1, scale: 1, filter: 'none' }
              : { opacity: 1, scale: 1, filter: 'blur(0px)' }
          }
          transition={{ duration: 0.8, delay: imageDelay, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => setHasRevealed(true)}
          className="w-full h-full"
        >
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{ objectPosition }}
            className={`w-full h-full object-cover transition-transform duration-700 ${
              project.id === 'socks-short' ? 'grayscale contrast-125' : ''
            } ${isHovered ? 'scale-105' : 'scale-100'}`}
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div
          className={`absolute inset-0 pointer-events-none bg-black transition-opacity duration-700 ${
            isHovered ? 'opacity-0' : 'opacity-[0.06]'
          }`}
        />

        {hoverSrc && (
          <video
            ref={videoRef}
            src={hoverSrc}
            muted
            playsInline
            loop
            preload="metadata"
            style={{ objectPosition }}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-400 ease-in-out ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {project.laurels && project.laurels.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: textDelay + 0.15 }}
            className={`absolute inset-x-0 bottom-2.5 sm:bottom-3.5 flex items-center justify-center gap-3 z-10 pointer-events-none drop-shadow-lg transition-opacity duration-300 ${
              isHovered ? 'opacity-40' : 'opacity-100'
            }`}
          >
            {project.laurels.map((laurel, idx) => (
              <LaurelBadge key={idx} type={laurel} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export const WorkGrid: React.FC<WorkGridProps> = ({
  projects,
  onSelectProject,
}) => {
  const slot = (n: string, fallbackIndex: number) =>
    projects.find((p: Project) => p.itemNumber === n) || projects[fallbackIndex];

  const p01 = slot('01', 0);
  const p02 = slot('02', 1);
  const p03 = slot('03', 2);
  const p04 = slot('04', 3);
  const p05 = slot('05', 4);
  const p06 = slot('06', 5);
  const p07 = slot('07', 6);
  const p08 = slot('08', 7);
  const p09 = slot('09', 8);
  const p10 = slot('10', 9);

  const DELAYS: Record<string, number> = {
    '01': 0.25, '02': 0.35, '03': 0.44, '04': 0.52, '05': 0.60,
    '06': 0.68, '07': 0.76, '08': 0.84, '09': 0.92, '10': 1.00,
  };

  return (
    <section
      id="selected-work"
      className="relative pt-24 sm:pt-28 pb-20 max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 bg-black text-white"
    >
      <div className="flex gap-3 sm:gap-5 lg:gap-6 items-start relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex flex-col items-center justify-start shrink-0 select-none pt-1 pr-1"
        >
          <span className="[writing-mode:vertical-lr] font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-white uppercase select-none font-medium whitespace-nowrap">
            SELECTED WORK
          </span>
        </motion.div>

        <div className="flex-1 space-y-4 sm:space-y-6">
          {/* Top section: [01 large] + [2x2: 02, 03, 04, 05] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            <div className="lg:col-span-6 flex flex-col h-full min-h-[460px] lg:min-h-[500px] xl:min-h-[540px]">
              <GridCard project={p01} orderIndex="01" onSelect={onSelectProject} startDelay={DELAYS['01']} className="h-full" />
            </div>
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="min-h-[220px] lg:min-h-[238px] xl:min-h-[258px]">
                <GridCard project={p02} orderIndex="02" onSelect={onSelectProject} startDelay={DELAYS['02']} className="h-full" />
              </div>
              <div className="min-h-[220px] lg:min-h-[238px] xl:min-h-[258px]">
                <GridCard project={p03} orderIndex="03" onSelect={onSelectProject} startDelay={DELAYS['03']} className="h-full" />
              </div>
              <div className="min-h-[220px] lg:min-h-[238px] xl:min-h-[258px]">
                <GridCard project={p04} orderIndex="04" onSelect={onSelectProject} startDelay={DELAYS['04']} className="h-full" />
              </div>
              <div className="min-h-[220px] lg:min-h-[238px] xl:min-h-[258px]">
                <GridCard project={p05} orderIndex="05" onSelect={onSelectProject} startDelay={DELAYS['05']} className="h-full" />
              </div>
            </div>
          </div>

          {/* Bottom section: [2x2: 06, 07, 09, 10] + [08 large] */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="min-h-[220px] lg:min-h-[238px] xl:min-h-[258px]">
                <GridCard project={p06} orderIndex="06" onSelect={onSelectProject} startDelay={DELAYS['06']} className="h-full" />
              </div>
              <div className="min-h-[220px] lg:min-h-[238px] xl:min-h-[258px]">
                <GridCard project={p07} orderIndex="07" onSelect={onSelectProject} startDelay={DELAYS['07']} className="h-full" />
              </div>
              <div className="min-h-[220px] lg:min-h-[238px] xl:min-h-[258px]">
                <GridCard project={p09} orderIndex="09" onSelect={onSelectProject} startDelay={DELAYS['09']} className="h-full" />
              </div>
              <div className="min-h-[220px] lg:min-h-[238px] xl:min-h-[258px]">
                <GridCard project={p10} orderIndex="10" onSelect={onSelectProject} startDelay={DELAYS['10']} className="h-full" />
              </div>
            </div>
            <div className="lg:col-span-6 flex flex-col h-full min-h-[460px] lg:min-h-[500px] xl:min-h-[540px]">
              <GridCard project={p08} orderIndex="08" onSelect={onSelectProject} startDelay={DELAYS['08']} className="h-full" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.8 }}
            className="pt-6 flex flex-col sm:flex-row items-center justify-between text-zinc-400 text-xs font-mono tracking-widest border-t border-zinc-900 mt-8 gap-3"
          >
            <div className="flex items-center gap-3 text-[11px]">
              {SITE.location && (
                <>
                  <span>{SITE.location}</span>
                  <span>•</span>
                </>
              )}
              <span>{SITE.role}</span>
            </div>
            <div className="text-[11px] tracking-wider text-zinc-400">
              © LLOYD TAWO FILMS {new Date().getFullYear()}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
