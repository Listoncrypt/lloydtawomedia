import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  currentView: 'home' | 'work' | 'information' | 'contact' | 'project';
  setCurrentView: (view: 'home' | 'work' | 'information' | 'contact') => void;
  isOverlay?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  isOverlay = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (view: 'home' | 'work' | 'information' | 'contact') => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 text-white py-6 px-6 sm:px-10 lg:px-14 transition-colors duration-300 ${
        isOverlay ? 'bg-transparent' : 'bg-black'
      }`}
    >
      <div className="max-w-[1720px] mx-auto flex items-center justify-between">
        <button
          id="nav-brand-logo"
          onClick={() => handleNavClick('home')}
          className="text-left font-mono tracking-[0.24em] text-lg sm:text-xl lg:text-[22px] font-semibold uppercase text-white hover:text-zinc-300 transition-colors flex items-center cursor-pointer select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
        >
          LLOYD TAWO
        </button>

        <nav className="hidden md:flex items-center gap-10 lg:gap-12 font-mono text-xs tracking-[0.2em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <button
            id="nav-link-work"
            onClick={() => handleNavClick('work')}
            className={`transition-colors cursor-pointer py-1 ${
              currentView === 'work' || currentView === 'project'
                ? 'text-white font-medium'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            WORK
          </button>

          <button
            id="nav-link-information"
            onClick={() => handleNavClick('information')}
            className={`transition-colors cursor-pointer py-1 ${
              currentView === 'information'
                ? 'text-white font-medium'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            INFORMATION
          </button>

          <button
            id="nav-link-contact"
            onClick={() => handleNavClick('contact')}
            className={`transition-colors cursor-pointer py-1 ${
              currentView === 'contact'
                ? 'text-white font-medium'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            CONTACT
          </button>
        </nav>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-2 focus:outline-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden pt-6 pb-4 bg-black/95 backdrop-blur-md border-t border-zinc-900 mt-4 space-y-4 font-mono text-xs uppercase tracking-widest px-4">
          <button
            onClick={() => handleNavClick('home')}
            className={`block w-full text-left py-2 ${
              currentView === 'home' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            HOME
          </button>
          <button
            onClick={() => handleNavClick('work')}
            className={`block w-full text-left py-2 ${
              currentView === 'work' || currentView === 'project' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            WORK
          </button>
          <button
            onClick={() => handleNavClick('information')}
            className={`block w-full text-left py-2 ${
              currentView === 'information' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            INFORMATION
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`block w-full text-left py-2 ${
              currentView === 'contact' ? 'text-white font-bold' : 'text-zinc-400 hover:text-white'
            }`}
          >
            CONTACT
          </button>
        </div>
      )}
    </header>
  );
};
