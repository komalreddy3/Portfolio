import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import {
  Home,
  Briefcase,
  FolderKanban,
  Cpu,
  User,
  Award,
  Terminal,
  Send
} from 'lucide-react';
import './DesktopNav.css';

export default function DesktopNav() {
  const { mode, toggleTerminal, sound } = useGameState();
  const [activeSection, setActiveSection] = React.useState('character');

  // Update active section based on scroll (same logic as BottomDock)
  useEffect(() => {
    const sections = ['character', 'summary', 'career', 'experience', 'quests', 'projects', 'skills', 'profile', 'education', 'achievements', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    sound.playClick();
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isGame = mode === 'game';

  return (
    <nav className="desktop-nav" aria-label="Desktop Navigation Bar">
      {/* Home / Character */}
      <button
        className={`nav-item ${activeSection === 'character' || activeSection === 'summary' ? 'active' : ''}`}
        onClick={() => scrollToSection(isGame ? 'character' : 'summary')}
        title={isGame ? 'Character Screen (Home)' : 'Executive Summary'}
        aria-label="Home"
      >
        <Home className="nav-icon" />
        <span className="nav-label">Home</span>
      </button>

      {/* Career / Experience */}
      <button
        className={`nav-item ${activeSection === 'career' || activeSection === 'experience' ? 'active' : ''}`}
        onClick={() => scrollToSection(isGame ? 'career' : 'experience')}
        title={isGame ? 'Career Progression Map' : 'Work Experience'}
        aria-label="Career"
      >
        <Briefcase className="nav-icon" />
        <span className="nav-label">Career</span>
      </button>

      {/* Quests / Projects */}
      <button
        className={`nav-item ${activeSection === 'quests' || activeSection === 'projects' ? 'active' : ''}`}
        onClick={() => scrollToSection(isGame ? 'quests' : 'projects')}
        title={isGame ? 'Active Quests (Projects)' : 'Software Projects'}
        aria-label="Projects"
      >
        <FolderKanban className="nav-icon" />
        <span className="nav-label">Projects</span>
      </button>

      {/* Skills */}
      <button
        className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`}
        onClick={() => scrollToSection('skills')}
        title="Technical Skills"
        aria-label="Skills"
      >
        <Cpu className="nav-icon" />
        <span className="nav-label">Skills</span>
      </button>

      {/* Lore / About */}
      <button
        className={`nav-item ${activeSection === 'profile' || activeSection === 'education' ? 'active' : ''}`}
        onClick={() => scrollToSection(isGame ? 'profile' : 'education')}
        title={isGame ? 'Character Lore & Perks' : 'Education'}
        aria-label="About"
      >
        <User className="nav-icon" />
        <span className="nav-label">About</span>
      </button>

      {/* Badges / Trophies (Game only) */}
      {isGame && (
        <button
          className={`nav-item ${activeSection === 'achievements' ? 'active' : ''}`}
          onClick={() => scrollToSection('achievements')}
          title="Trophy Room & Badges"
          aria-label="Achievements"
        >
          <Award className="nav-icon" />
          <span className="nav-label">Badges</span>
        </button>
      )}

      {/* Terminal */}
      <button
        className="nav-item terminal-item"
        onClick={toggleTerminal}
        title="Open Developer Terminal (T)"
        aria-label="Terminal"
      >
        <Terminal className="nav-icon" />
        <span className="nav-label">CLI</span>
      </button>

      {/* Contact */}
      <button
        className={`nav-item ${activeSection === 'contact' ? 'active' : ''}`}
        onClick={() => scrollToSection('contact')}
        title="Transmit Signal / Contact"
        aria-label="Contact"
      >
        <Send className="nav-icon" />
        <span className="nav-label">Contact</span>
      </button>
    </nav>
  );
}
