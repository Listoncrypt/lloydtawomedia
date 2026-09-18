import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { WorkGrid } from './components/WorkGrid';
import { WorkListView } from './components/WorkListView';
import { InformationSection } from './components/InformationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { PROJECTS_DATA } from './data/projectsData';
import { Project } from './types';

type ViewMode = 'home' | 'work' | 'information' | 'contact' | 'project';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const rawHash = window.location.hash.replace('#', '');
    
    if (rawHash.startsWith('work/')) {
      const projectId = rawHash.replace('work/', '');
      const found = PROJECTS_DATA.find((p) => p.id === projectId);
      if (found) {
        setSelectedProject(found);
        setCurrentView('project');
        return;
      }
    }

    if (rawHash === 'work' || rawHash === 'information' || rawHash === 'contact') {
      setCurrentView(rawHash as ViewMode);
    } else {
      setCurrentView('home');
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }

    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash.startsWith('work/')) {
        const projectId = newHash.replace('work/', '');
        const found = PROJECTS_DATA.find((p) => p.id === projectId);
        if (found) {
          setSelectedProject(found);
          setCurrentView('project');
          return;
        }
      }

      if (['home', 'work', 'information', 'contact'].includes(newHash)) {
        setCurrentView(newHash as ViewMode);
        setSelectedProject(null);
      } else if (!newHash) {
        setCurrentView('home');
        setSelectedProject(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSetView = (view: 'home' | 'work' | 'information' | 'contact') => {
    setCurrentView(view);
    setSelectedProject(null);
    if (view === 'home') {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } else {
      window.location.hash = view;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setCurrentView('project');
    window.location.hash = `work/${project.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-mono">
      <Navbar
        currentView={currentView}
        setCurrentView={handleSetView}
        isOverlay={currentView === 'project'}
      />

      <main className="bg-black">
        {currentView === 'home' && (
          <WorkGrid
            projects={PROJECTS_DATA}
            onSelectProject={handleSelectProject}
          />
        )}

        {currentView === 'work' && (
          <WorkListView
            onSelectProject={handleSelectProject}
          />
        )}

        {currentView === 'project' && selectedProject && (
          <ProjectDetailPage
            project={selectedProject}
            onNavigateBack={() => handleSetView('work')}
            onSelectProject={handleSelectProject}
          />
        )}

        {currentView === 'information' && (
          <InformationSection />
        )}

        {currentView === 'contact' && (
          <ContactSection />
        )}
      </main>

      <Footer
        onNavigate={handleSetView}
      />
    </div>
  );
}
