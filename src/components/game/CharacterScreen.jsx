import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useGameState } from '../../hooks/useGameState';
import TextType from '../Hero/TextType';
import { ArrowDown, FileText, Send, Sparkles, Terminal, Code2, HelpCircle } from 'lucide-react';
import './CharacterScreen.css';

export default function CharacterScreen() {
  const { character } = portfolioData;
  const { toggleTerminal, setMode, toggleHelp, sound } = useGameState();

  return (
    <section id="character" className="character-screen-root">
      <div className="character-container">
        {/* Left Column: Character Card / Hologram Avatar */}
        <div className="character-card-wrap">
          <div className="character-avatar-frame cyber-panel">
            <div className="avatar-image-box">
              <img
                src={`${process.env.PUBLIC_URL}${character.avatar}`}
                alt={character.name}
                className="character-avatar-img"
              />
              <div className="avatar-status-badge">
                <span className="pulse-dot" />
                <span>Currently at &lt;{character.currentGuild} /&gt;</span>
              </div>
            </div>

            <div className="character-spec-sheet">
              <div className="spec-row">
                <span className="spec-label">OPERATOR:</span>
                <span className="spec-value">{character.name}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">BASE LOC:</span>
                <span className="spec-value">{character.location}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">GUILD:</span>
                <span className="spec-value text-purple">{character.currentGuild}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">STATUS:</span>
                <span className="spec-value text-green">ONLINE // DEPLOYED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Title, Typewriter Tagline, Focus Areas & Action CTAs */}
        <div className="character-intro-wrap">
          <div className="class-badge-pill">
            <Code2 size={13} />
            <span>{character.class}</span>
          </div>

          <h1 className="character-headline">
            useState(<span className="accent-name">"{character.name}"</span>);
          </h1>

          {/* Typing Tagline */}
          <div className="character-tagline-box">
            <TextType
              text={[character.tagline]}
              typingSpeed={35}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="█"
              deletingSpeed={10}
              variableSpeedEnabled={false}
              cursorBlinkDuration={0.6}
            />
          </div>

          {/* Core Engineering Focus Areas (Real skills, NO percentage bars!) */}
          <div className="character-focus-grid">
            {character.coreFocus.map((focus, idx) => (
              <div key={idx} className="focus-chip cyber-panel">
                <div className="focus-header">
                  <Sparkles size={13} className="focus-icon" />
                  <span className="focus-title">{focus.title}</span>
                </div>
                <p className="focus-desc">{focus.desc}</p>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="character-cta-group">
            <a
              href="#career"
              className="btn-cyber-primary"
              onClick={() => sound.playClick()}
            >
              <span>Explore Journey</span>
              <ArrowDown size={15} />
            </a>

            <button
              className="btn-cyber-ghost"
              onClick={() => setMode('recruiter')}
            >
              <FileText size={15} />
              <span>Recruiter Quick View</span>
            </button>

            <button
              className="btn-cyber-ghost"
              onClick={toggleTerminal}
            >
              <Terminal size={15} />
              <span>Launch Terminal</span>
            </button>

            <button
              className="btn-cyber-ghost"
              onClick={toggleHelp}
            >
              <HelpCircle size={15} />
              <span>How This Works (?)</span>
            </button>

            <a
              href="#contact"
              className="btn-cyber-ghost"
              onClick={() => sound.playClick()}
            >
              <Send size={14} />
              <span>Transmit Signal</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
