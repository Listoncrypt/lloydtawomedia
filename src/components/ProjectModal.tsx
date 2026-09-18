import React, { useState } from 'react';
import { Project } from '../types';
import { X, Play, Award, Aperture, Share2, Check } from 'lucide-react';
import { LaurelBadge } from './LaurelBadge';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  allProjects: Project[];
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
  allProjects,
}) => {
  const [activeStillIndex, setActiveStillIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);

  if (!project) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Find related projects in same category
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id && p.category === project.category)
    .slice(0, 2);

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="project-modal-container"
        className="relative w-full max-w-5xl bg-black border border-white shadow-2xl my-8 text-white max-h-[92vh] flex flex-col overflow-hidden font-mono"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white bg-black sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase font-bold text-white">
              {project.itemNumber || '01'} &nbsp;{project.title}
            </span>
            <span className="text-xs text-zinc-500">•</span>
            <span className="text-xs text-zinc-400">
              {project.year}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="modal-share-btn"
              onClick={handleCopyLink}
              className="px-3 py-1 bg-zinc-950 border border-zinc-700 hover:border-white text-zinc-300 hover:text-white transition-colors text-xs flex items-center gap-1.5 cursor-pointer"
              title="Share Project"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[10px] uppercase tracking-wider">{copied ? 'COPIED' : 'SHARE'}</span>
            </button>

            <button
              id="modal-close-btn"
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Project Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 bg-black">
          {/* Main Media Player / Showcase */}
          <div className="relative overflow-hidden border border-white bg-black aspect-video">
            {isPlayingVideo && project.videoUrl ? (
              <iframe
                src={project.videoUrl}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={project.title}
              />
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={project.stills[activeStillIndex] || project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button
                    onClick={() => setIsPlayingVideo(true)}
                    className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-2xl cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-current translate-x-0.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Overlay Laurels */}
            {project.laurels && project.laurels.length > 0 && (
              <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-3 pointer-events-none drop-shadow-lg">
                {project.laurels.map((laurel, idx) => (
                  <LaurelBadge key={idx} type={laurel} />
                ))}
              </div>
            )}
          </div>

          {/* Title & Core Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-5 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">PROJECT TITLE</span>
                <h2 className="text-2xl sm:text-3xl font-mono uppercase font-bold text-white tracking-tight">
                  {project.title}
                </h2>
              </div>

              <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
                {project.description}
              </p>

              {project.synopsis && (
                <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em]">
                    SYNOPSIS
                  </div>
                  <p className="text-xs text-zinc-300">
                    "{project.synopsis}"
                  </p>
                </div>
              )}

              {/* Awards List */}
              {project.awards && project.awards.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-1.5 font-bold">
                    <Award className="w-3.5 h-3.5 text-white" />
                    <span>HONORS & OFFICIAL SELECTIONS</span>
                  </div>
                  <div className="space-y-1">
                    {project.awards.map((award, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs text-white bg-zinc-950 border border-zinc-800 px-3 py-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                        <span>{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Technical Camera & Production Specs */}
            <div className="lg:col-span-4 bg-zinc-950 border border-zinc-800 p-5 space-y-4 text-xs font-mono">
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-800 pb-2 flex items-center gap-2 font-bold">
                <Aperture className="w-3.5 h-3.5 text-white" />
                <span>TECHNICAL SPECIFICATIONS</span>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">CAMERA SYSTEM</span>
                  <span className="text-white font-medium">{project.camera}</span>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">OPTICS / LENSES</span>
                  <span className="text-white font-medium">{project.lenses}</span>
                </div>

                <div>
                  <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">ASPECT RATIO</span>
                  <span className="text-white font-medium">{project.aspectRatio}</span>
                </div>

                {project.director && (
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">DIRECTOR</span>
                    <span className="text-white font-medium">{project.director}</span>
                  </div>
                )}

                {project.productionCompany && (
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">PRODUCTION / NETWORK</span>
                    <span className="text-white font-medium">{project.productionCompany}</span>
                  </div>
                )}

                {project.client && (
                  <div>
                    <span className="text-zinc-500 block text-[9px] uppercase tracking-wider">CLIENT</span>
                    <span className="text-white font-medium">{project.client}</span>
                  </div>
                )}
              </div>

              {/* Color Palette Swatches */}
              {project.colorPalette && (
                <div className="pt-3 border-t border-zinc-800 space-y-1.5">
                  <span className="text-zinc-500 text-[9px] uppercase tracking-wider block">COLOR PALETTE</span>
                  <div className="flex items-center gap-1.5">
                    {project.colorPalette.map((color, idx) => (
                      <div
                        key={idx}
                        className="w-5 h-5 border border-zinc-700"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stills Gallery */}
          {project.stills && project.stills.length > 0 && (
            <div className="space-y-3 pt-6 border-t border-zinc-900">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                  <span>CINEMATOGRAPHY STILLS ({project.stills.length})</span>
                </div>
                <span className="text-[10px] text-zinc-500">Click to preview</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {project.stills.map((still, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveStillIndex(idx);
                      setIsPlayingVideo(false);
                    }}
                    className={`relative overflow-hidden border cursor-pointer aspect-video group transition-all bg-zinc-950 ${
                      !isPlayingVideo && activeStillIndex === idx
                        ? 'border-white ring-1 ring-white'
                        : 'border-zinc-800 hover:border-zinc-500'
                    }`}
                  >
                    <img
                      src={still}
                      alt={`${project.title} still ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute bottom-1 right-1 px-1 py-0.2 text-[8px] font-mono bg-black/90 text-white font-bold">
                      0{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="pt-6 border-t border-zinc-900 space-y-3">
              <div className="text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                MORE IN {project.categoryLabel.toUpperCase()}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedProjects.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectProject(rel)}
                    className="flex items-center gap-4 p-3 bg-zinc-950 hover:bg-zinc-900 border border-zinc-800 hover:border-white cursor-pointer transition-all group"
                  >
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-20 h-14 object-cover border border-zinc-800"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase group-hover:underline">
                        {rel.title}
                      </h4>
                      <p className="text-[10px] text-zinc-500">
                        {rel.year} • {rel.camera.split(' ')[0]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
