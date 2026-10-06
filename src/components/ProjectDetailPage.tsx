import React, { useEffect, useRef, useState } from 'react';
import { Project, ProjectVideo } from '../types';
import { LaurelBadge } from './LaurelBadge';
import { ArrowLeft, Play } from 'lucide-react';
import { ExpandableDescription } from './ExpandableDescription';

interface ProjectDetailPageProps {
  project: Project;
  onNavigateBack: () => void;
  onSelectProject: (project: Project) => void;
}

const SectionVideo: React.FC<{
  video: ProjectVideo;
  projectTitle: string;
  inGrid?: boolean;
}> = ({ video, projectTitle, inGrid = false }) => {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const isPortrait = video.orientation === 'portrait';
  const revealStills = video.revealStills || [];

  return (
    <figure
      className={`space-y-3 ${
        isPortrait && !inGrid ? 'max-w-[340px] sm:max-w-[420px] mx-auto' : ''
      }`}
    >
      {video.title && (
        <figcaption className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-zinc-500">
          {video.title}
        </figcaption>
      )}

      <div
        className={`relative w-full overflow-hidden bg-zinc-950 border border-zinc-900 ${
          isPortrait ? 'aspect-[9/16]' : 'aspect-video'
        }`}
      >
        <video
          ref={ref}
          src={video.url}
          poster={video.poster}
          preload="metadata"
          controls={isPlaying}
          playsInline
          className={`w-full h-full ${isPlaying ? 'object-contain' : 'object-cover'}`}
          onEnded={() => setIsPlaying(false)}
        />

        {!isPlaying && (
          <button
            type="button"
            aria-label={`Play ${video.title || projectTitle}`}
            onClick={() => {
              setIsPlaying(true);
              setHasPlayed(true);
              const el = ref.current;
              if (el) {
                el.muted = false;
                el.currentTime = 0;
                el.play().catch(() => {});
              }
            }}
            className="absolute inset-0 flex items-center justify-center cursor-pointer group"
          >
            <span className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
            <span className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
              <Play className="w-6 h-6 sm:w-8 sm:h-8 text-black fill-current translate-x-0.5" />
            </span>
            <span className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-[10px] font-mono tracking-[0.3em] uppercase group-hover:text-white transition-colors z-10">
              PLAY WITH SOUND
            </span>
          </button>
        )}
      </div>

      {video.description && (
        <div className="border border-zinc-900 bg-zinc-950/70 p-4">
          <ExpandableDescription
            description={video.description}
            label={video.title ? `${video.title} — NOTES` : 'VIDEO DESCRIPTION'}
          />
        </div>
      )}

      {hasPlayed && revealStills.length > 0 && (
        <div
          className={`grid gap-4 sm:gap-6 pt-2 animate-fadeIn ${
            revealStills.length === 1
              ? 'grid-cols-1'
              : revealStills.length === 2 || inGrid
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {revealStills.map((still, idx) => (
            <div
              key={still}
              className="relative w-full overflow-hidden bg-zinc-950 aspect-video"
            >
              <img
                src={still}
                alt={`${video.title || projectTitle} frame ${idx + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      )}
    </figure>
  );
};

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onNavigateBack,
  onSelectProject,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsPlaying(false);
  }, [project.id]);

  const director = project.director;
  const producer = project.producer;
  const productionCompany = project.productionCompany;
  const writer = project.writer;
  const camera = project.camera;
  const lenses = project.lenses;

  const hasCrew = Boolean(director || producer || productionCompany || writer);
  const hasEquipment = Boolean(camera || lenses);

  const festivalsList: { name: string; year: string | number }[] = (project.awards || []).map(
    (award) => ({ name: award.toUpperCase(), year: project.year }),
  );

  const heroPortrait = project.heroOrientation === 'portrait';
  const heroFit = isPlaying || heroPortrait ? 'object-contain' : 'object-cover';

  const additionalVideos: ProjectVideo[] = project.additionalVideos || [];
  const videosBeforeStills = additionalVideos.filter((v) => v.position === 'before-stills');
  const videosAfterStills = additionalVideos.filter((v) => v.position === 'after-stills');

  const portraitCols = (n: number) => {
    if (n === 1) return 'grid-cols-1 max-w-[420px] mx-auto';
    if (n === 2) return 'grid-cols-1 sm:grid-cols-2 max-w-[900px] mx-auto';
    if (n === 3) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    if (n === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
    if (n <= 6) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
    return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4';
  };

  const renderVideoGroup = (videos: ProjectVideo[]) => {
    const landscape = videos.filter((v) => v.orientation !== 'portrait');
    const portrait = videos.filter((v) => v.orientation === 'portrait');

    return (
      <>
        {landscape.length === 1 && (
          <SectionVideo
            key={`${project.id}-${landscape[0].url}`}
            video={landscape[0]}
            projectTitle={project.title}
          />
        )}

        {landscape.length > 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {landscape.map((video) => (
              <SectionVideo
                key={`${project.id}-${video.url}`}
                video={video}
                projectTitle={project.title}
                inGrid
              />
            ))}
          </div>
        )}

        {portrait.length > 0 && (
          <div className={`grid gap-8 sm:gap-10 ${portraitCols(portrait.length)}`}>
            {portrait.map((video) => (
              <SectionVideo
                key={`${project.id}-${video.url}`}
                video={video}
                projectTitle={project.title}
                inGrid
              />
            ))}
          </div>
        )}
      </>
    );
  };

  const displayStills = project.stills || [];
  const portraitStills = project.portraitStills || [];

  return (
    <article
      id={`project-page-${project.id}`}
      className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black font-mono w-full"
    >
      {/* Hero media */}
      <section className="relative w-full h-[85vh] sm:h-[90vh] lg:h-[94vh] overflow-hidden bg-black flex items-center justify-center">
        {project.previewVideo ? (
          <>
            <video
              ref={videoRef}
              src={project.previewVideo}
              poster={project.thumbnail}
              preload="metadata"
              controls={isPlaying}
              playsInline
              className={`w-full h-full ${heroFit}`}
              onEnded={() => setIsPlaying(false)}
            />
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group z-10"
                onClick={() => {
                  setIsPlaying(true);
                  if (videoRef.current) {
                    videoRef.current.muted = false;
                    videoRef.current.currentTime = 0;
                    videoRef.current.play().catch(() => {});
                  }
                }}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-black fill-current translate-x-0.5" />
                </div>
                <span className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/70 text-xs font-mono tracking-[0.3em] uppercase group-hover:text-white transition-colors z-10">
                  PLAY WITH SOUND
                </span>
              </div>
            )}
          </>
        ) : (
          <img
            src={project.thumbnail}
            alt={project.title}
            style={{ objectPosition: project.thumbnailPosition || 'center' }}
            className={`w-full h-full ${
              heroPortrait ? 'object-contain' : 'object-cover'
            }`}
            referrerPolicy="no-referrer"
          />
        )}

        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none" />

        {project.laurels && project.laurels.length > 0 && (
          <div className="absolute inset-0 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 pointer-events-none flex flex-col justify-center items-end">
            <div className="flex flex-col items-center gap-8 sm:gap-10 mr-2 sm:mr-6 md:mr-14 lg:mr-20 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              {project.laurels.map((laurel, idx) => (
                <LaurelBadge key={idx} type={laurel} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Metadata strip */}
      <section className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 pt-8 sm:pt-10 pb-16 sm:pb-24">
        <button
          type="button"
          onClick={onNavigateBack}
          className="group mb-5 sm:mb-6 inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-zinc-500 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>ALL WORK</span>
        </button>

        <div className="border-t border-b border-white py-5 sm:py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start text-xs sm:text-[13px] tracking-wider uppercase">
            <div className="md:col-span-6 lg:col-span-3 flex items-baseline justify-between gap-4">
              <span className="font-bold text-white text-sm sm:text-base tracking-[0.16em] truncate">
                {project.title}
              </span>
              <span className="text-zinc-300 text-xs shrink-0">
                {project.categoryLabel || 'SHORT FILM'}
              </span>
              <span className="text-zinc-400 text-xs shrink-0">{project.year}</span>
            </div>

            {hasCrew && (
              <div className="md:col-span-6 lg:col-span-3 border-t md:border-t-0 md:border-l border-zinc-800 md:pl-6 pt-4 md:pt-0 space-y-2">
                <div className="text-[10px] text-zinc-500 tracking-[0.2em] mb-2 font-semibold">CREW</div>
                {productionCompany && (
                  <div className="flex justify-between gap-4 text-xs">
                    <span className="text-zinc-400">PRODUCTION</span>
                    <span className="text-white text-right font-medium">{productionCompany}</span>
                  </div>
                )}
                {writer && (
                  <div className="flex justify-between gap-4 text-xs">
                    <span className="text-zinc-400">WRITER</span>
                    <span className="text-white text-right font-medium">{writer}</span>
                  </div>
                )}
                {director && (
                  <div className="flex justify-between gap-4 text-xs">
                    <span className="text-zinc-400">DIRECTOR</span>
                    <span className="text-white text-right font-medium">{director}</span>
                  </div>
                )}
                {producer && (
                  <div className="flex justify-between gap-4 text-xs">
                    <span className="text-zinc-400">PRODUCER</span>
                    <span className="text-white text-right font-medium">{producer}</span>
                  </div>
                )}
              </div>
            )}

            {festivalsList.length > 0 && (
              <div className="md:col-span-6 lg:col-span-3 border-t md:border-t-0 md:border-l border-zinc-800 md:pl-6 pt-4 md:pt-0 space-y-2">
                <div className="text-[10px] text-zinc-500 tracking-[0.2em] mb-2 font-semibold">FESTIVALS</div>
                {festivalsList.map((fest, idx) => (
                  <div key={idx} className="flex justify-between gap-3 text-xs">
                    <span className="text-zinc-200 truncate">{fest.name}</span>
                    <span className="text-zinc-400 shrink-0">{fest.year}</span>
                  </div>
                ))}
              </div>
            )}

            {hasEquipment && (
              <div className="md:col-span-6 lg:col-span-3 border-t md:border-t-0 md:border-l border-zinc-800 md:pl-6 pt-4 md:pt-0 space-y-2">
                <div className="text-[10px] text-zinc-500 tracking-[0.2em] mb-2 font-semibold">EQUIPMENT</div>
                {camera && (
                  <div className="flex justify-between gap-4 text-xs">
                    <span className="text-zinc-400">CAMERA</span>
                    <span className="text-white text-right font-medium">{camera}</span>
                  </div>
                )}
                {lenses && (
                  <div className="flex justify-between gap-4 text-xs">
                    <span className="text-zinc-400">LENSES</span>
                    <span className="text-white text-right font-medium">{lenses}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {project.description && (
          <div className="mt-6 sm:mt-8 border border-zinc-800 bg-zinc-950/70 p-5 sm:p-7">
            <ExpandableDescription
              description={project.description}
              label="PROJECT OVERVIEW"
            />
          </div>
        )}
      </section>

      {/* Stills & media gallery */}
      <section className="w-full max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 pb-32 space-y-12 sm:space-y-16">
        {renderVideoGroup(videosBeforeStills)}

        {displayStills.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-14">
            {displayStills.map((still, idx) => (
              <div
                key={idx}
                className="relative w-full overflow-hidden bg-zinc-950 aspect-[16/10] sm:aspect-video"
              >
                <img
                  src={still}
                  alt={`${project.title} still ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        )}

        {portraitStills.length > 0 && (
          <div className={`grid gap-8 sm:gap-10 ${portraitCols(portraitStills.length)}`}>
            {portraitStills.map((still, idx) => (
              <div
                key={idx}
                className="relative w-full overflow-hidden bg-zinc-950 aspect-[9/16]"
              >
                <img
                  src={still}
                  alt={`${project.title} vertical still ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        )}

        {renderVideoGroup(videosAfterStills)}
      </section>
    </article>
  );
};
