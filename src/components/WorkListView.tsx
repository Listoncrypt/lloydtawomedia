import React, { useState } from 'react';
import { PROJECTS_DATA, CATEGORY_ORDER, CATEGORY_LABELS } from '../data/projectsData';
import { Project, ProjectCategory } from '../types';

interface WorkListViewProps {
  onSelectProject: (project: Project) => void;
}

export const WorkListView: React.FC<WorkListViewProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('all');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const availableCategories = CATEGORY_ORDER.filter((category) =>
    PROJECTS_DATA.some((project) => project.category === category),
  );

  const filteredItems = PROJECTS_DATA
    .filter((project) => activeFilter === 'all' || project.category === activeFilter)
    .sort((a, b) => (a.itemNumber || '').localeCompare(b.itemNumber || ''));

  const handleRowMouseEnter = (id: string) => {
    setHoveredProjectId(id);
    setIsHovering(true);
  };

  const handleListMouseLeave = () => {
    setIsHovering(false);
    setHoveredProjectId(null);
  };

  return (
    <section
      id="work-page"
      className="relative min-h-screen pt-32 sm:pt-36 pb-28 max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-14 bg-black text-white selection:bg-white selection:text-black"
    >
      {/* Full-page background hover preview */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-black">
        {PROJECTS_DATA.map((proj) => {
          const isCurrent = isHovering && hoveredProjectId === proj.id;
          return (
            <div
              key={proj.id}
              className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                isCurrent ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={proj.thumbnail}
                alt={proj.title}
                style={{ objectPosition: proj.thumbnailPosition || 'center' }}
                className={`w-full h-full object-cover filter brightness-[0.75] contrast-[1.05] ${
                  proj.id === 'socks-short' ? 'grayscale contrast-125' : ''
                }`}
                referrerPolicy="no-referrer"
              />

              {(proj.previewLoop || proj.previewVideo) && isCurrent && (
                <video
                  src={proj.previewLoop || proj.previewVideo}
                  poster={proj.thumbnail}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  style={{ objectPosition: proj.thumbnailPosition || 'center' }}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75] contrast-[1.05]"
                />
              )}
            </div>
          );
        })}

        <div
          className={`absolute inset-0 bg-black/55 transition-opacity duration-500 ${
            isHovering ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start">
        {/* Filters */}
        <div className="w-full lg:w-[320px] shrink-0 mb-10 lg:mb-0">
          <div className="font-mono text-[11px] sm:text-xs text-white uppercase tracking-[0.2em] mb-1.5 font-normal">
            FILTERS
          </div>
          <div className="font-mono text-[11px] sm:text-xs tracking-[0.18em] uppercase text-zinc-400 flex flex-wrap items-center gap-x-1.5 gap-y-1">
            {availableCategories.map((category, idx) => (
              <React.Fragment key={category}>
                {idx > 0 && <span className="text-zinc-600">,</span>}
                <button
                  id={`filter-${category}`}
                  onClick={() => setActiveFilter(activeFilter === category ? 'all' : category)}
                  className={`transition-colors cursor-pointer ${
                    activeFilter === category
                      ? 'text-white underline underline-offset-4'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {CATEGORY_LABELS[category]}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Project archive table */}
        <div
          className="w-full lg:w-[54%] xl:w-[52%] lg:ml-auto"
          onMouseLeave={handleListMouseLeave}
        >
          <div className="border-t border-white">
            {filteredItems.map((project) => {
              const isHovered = isHovering && hoveredProjectId === project.id;

              return (
                <div
                  key={project.id}
                  id={`work-row-${project.itemNumber}`}
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => handleRowMouseEnter(project.id)}
                  className={`group relative flex items-center justify-between py-2 sm:py-2.5 border-b border-white cursor-pointer transition-colors duration-150 ${
                    isHovered ? 'bg-white/10' : ''
                  }`}
                >
                  <span className="w-8 sm:w-10 shrink-0 font-mono text-[11px] sm:text-xs text-white">
                    {project.itemNumber}
                  </span>
                  <span className="flex-1 pr-3 sm:pr-6 font-mono text-[11px] sm:text-xs font-normal uppercase tracking-wider text-white truncate">
                    {project.title}
                  </span>
                  <span className="w-36 sm:w-52 md:w-60 shrink-0 font-mono text-[11px] sm:text-xs font-normal uppercase tracking-wider text-left text-white truncate">
                    {project.format || project.categoryLabel}
                  </span>
                  <span className="w-16 sm:w-20 shrink-0 font-mono text-[11px] sm:text-xs font-normal text-right text-white">
                    {project.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
