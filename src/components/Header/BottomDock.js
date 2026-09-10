import React from 'react';
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
import './BottomDock.css';

export default function BottomDock() {
  const { mode, toggleTerminal, sound } = useGameState();
  const [activeSection, setActiveSection] = React.useState('character');

  React.useEffect(() => {
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
    <nav className="dock-root" aria-label="Quick Navigation Dock">
      {/* Home / Character */}
      <button
        className={`dock-item ${activeSection === 'character' || activeSection === 'summary' ? 'active' : ''}`}
        onClick={() => scrollToSection(isGame ? 'character' : 'summary')}
        title={isGame ? 'Character Screen (Home)' : 'Executive Summary'}
        aria-label="Home"
      >
        <Home className="dock-icon" />
        <span className="dock-label">Home</span>
      </button>

      {/* Career / Experience */}
      <button
        className={`dock-item ${activeSection === 'career' || activeSection === 'experience' ? 'active' : ''}`}
        onClick={() => scrollToSection(isGame ? 'career' : 'experience')}
        title={isGame ? 'Career Progression Map' : 'Work Experience'}
        aria-label="Career"
      >
        <Briefcase className="dock-icon" />
        <span className="dock-label">Career</span>
      </button>

      {/* Quests / Projects */}
      <button
        className={`dock-item ${activeSection === 'quests' || activeSection === 'projects' ? 'active' : ''}`}
        onClick={() => scrollToSection(isGame ? 'quests' : 'projects')}
        title={isGame ? 'Active Quests (Projects)' : 'Software Projects'}
        aria-label="Projects"
      >
        <FolderKanban className="dock-icon" />
        <span className="dock-label">Quests</span>
      </button>

      {/* Skills */}
      <button
        className={`dock-item ${activeSection === 'skills' ? 'active' : ''}`}
        onClick={() => scrollToSection('skills')}
        title="Technical Skills"
        aria-label="Skills"
      >
        <Cpu className="dock-icon" />
        <span className="dock-label">Skills</span>
      </button>

      {/* About / Lore */}
      <button
        className={`dock-item ${activeSection === 'profile' || activeSection === 'education' ? 'active' : ''}`}
        onClick={() => scrollToSection(isGame ? 'profile' : 'education')}
        title={isGame ? 'Character Lore & Perks' : 'Education'}
        aria-label="About"
      >
        <User className="dock-icon" />
        <span className="dock-label">Lore</span>
      </button>

      {/* Trophies (Game mode only) */}
      {isGame && (
        <button
          className={`dock-item ${activeSection === 'achievements' ? 'active' : ''}`}
          onClick={() => scrollToSection('achievements')}
          title="Trophy Room & Badges"
          aria-label="Achievements"
        >
          <Award className="dock-icon" />
          <span className="dock-label">Badges</span>
        </button>
      )}

      {/* Terminal CLI Quick Trigger */}
      <button
        className="dock-item dock-item-terminal"
        onClick={toggleTerminal}
        title="Open Developer Terminal (T)"
        aria-label="Terminal"
      >
        <Terminal className="dock-icon text-cyan" />
        <span className="dock-label">CLI</span>
      </button>

      {/* Contact */}
      <button
        className={`dock-item ${activeSection === 'contact' ? 'active' : ''}`}
        onClick={() => scrollToSection('contact')}
        title="Transmit Signal / Contact"
        aria-label="Contact"
      >
        <Send className="dock-icon" />
        <span className="dock-label">Contact</span>
      </button>
    </nav>
  );
}
