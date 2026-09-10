import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useGameState } from '../../hooks/useGameState';
import { User, Sparkles, Quote as QuoteIcon } from 'lucide-react';
import './CharacterProfile.css';

export default function CharacterProfile() {
  const { character, quote } = portfolioData;
  const { unlockedAchievements, unlockAchievement, sound } = useGameState();
  const isBugLawUnlocked = unlockedAchievements.includes('bug-law');

  const handleAcknowledgeBug = () => {
    sound.playClick();
    unlockAchievement('bug-law');
  };

  return (
    <section id="profile" className="char-profile-root">
      <div className="char-profile-container">
        {/* Section Header */}
        <div className="section-title-header">
          <div className="title-tag">
            <span className="accent-bracket">&lt;</span>
            <span className="title-text">CharacterLore &amp; Traits</span>
            <span className="accent-bracket">&nbsp;/&gt;</span>
          </div>
          <p className="section-subtitle">
            Origin story, developer philosophy, and passive character buffs.
          </p>
        </div>

        {/* Backstory Panel */}
        <div className="lore-panel cyber-panel">
          <div className="lore-header">
            <div className="lore-badge">
              <User size={14} />
              <span>ORIGIN FILE // HYDERABAD_EXP</span>
            </div>
          </div>

          <div className="lore-text-content">
            {character.bio.map((paragraph, idx) => (
              <p key={idx} className="lore-p">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Lubarsky Quote Card with Intuitive Interactive Button */}
          <div className="lore-quote-card">
            <div className="lore-quote-left">
              <QuoteIcon size={24} className="lore-quote-icon" />
              <div className="lore-quote-text-wrap">
                <span className="lore-quote-quote">“{quote.text}”</span>
                <span className="lore-quote-author">— {quote.author}</span>
              </div>
            </div>

            <button
              className={`lore-bug-btn ${isBugLawUnlocked ? 'acknowledged' : ''}`}
              onClick={handleAcknowledgeBug}
              disabled={isBugLawUnlocked}
            >
              <span className="bug-icon">🐛</span>
              <span>{isBugLawUnlocked ? '✓ Law Acknowledged (+60 XP)' : 'Acknowledge Truth (+60 XP)'}</span>
            </button>
          </div>
        </div>

        {/* Character Traits / Fun Facts Grid */}
        <div className="traits-section-wrap">
          <h4 className="traits-heading">
            <Sparkles size={16} className="text-purple" />
            <span>PASSIVE TRAITS &amp; RUNTIME PERKS</span>
          </h4>

          <div className="traits-grid">
            {character.traits.map((trait) => (
              <div key={trait.id} className="trait-card cyber-panel">
                <div className="trait-top">
                  <span className="trait-emoji">{trait.emoji}</span>
                  <span className="trait-name">{trait.name}</span>
                </div>
                <pre className="trait-code">{trait.code}</pre>
                <div className="trait-footer">
                  <span className="trait-note">{'// '}{trait.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
