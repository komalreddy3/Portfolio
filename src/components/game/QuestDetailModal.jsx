import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { X, ExternalLink, Github, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';
import './QuestDetailModal.css';

export default function QuestDetailModal() {
  const { activeQuest, closeQuestModal, sound } = useGameState();

  if (!activeQuest) return null;

  return (
    <div className="quest-modal-overlay" onClick={closeQuestModal}>
      <div
        className="quest-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quest-modal-title"
      >
        {/* Modal Header */}
        <div className="quest-modal-header">
          <div className="quest-meta-top">
            <span className={`quest-diff-badge ${activeQuest.difficulty.toLowerCase()}`}>
              {activeQuest.difficulty}
            </span>
            <span className="quest-category-badge">{activeQuest.category}</span>
            <span className="quest-xp-badge">+{activeQuest.xpReward || 50} XP Claimed</span>
          </div>

          <button
            className="quest-modal-close"
            onClick={closeQuestModal}
            aria-label="Close quest details"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="quest-modal-body">
          <div className="quest-title-row">
            <h2 id="quest-modal-title" className="quest-modal-title">
              {activeQuest.title}()
            </h2>
            <div className="quest-status-chip">
              <CheckCircle2 size={13} />
              <span>{activeQuest.status}</span>
            </div>
          </div>

          {/* Optional Project Screenshot / Thumbnail */}
          {activeQuest.img ? (
            <div className="quest-modal-media">
              <img
                src={`${process.env.PUBLIC_URL}${activeQuest.img}`}
                alt={activeQuest.title}
                loading="lazy"
              />
            </div>
          ) : (
            <div className="quest-modal-placeholder">
              <Sparkles size={24} />
              <span>Backend & Microservice Architecture</span>
            </div>
          )}

          {/* Mission Briefing */}
          <div className="quest-section-block">
            <h4 className="block-label">MISSION BRIEFING</h4>
            <p className="block-text">{activeQuest.desc}</p>
          </div>

          {/* Engineering Challenges */}
          {activeQuest.challenges && (
            <div className="quest-section-block">
              <h4 className="block-label">
                <ShieldAlert size={14} /> KEY ENGINEERING CHALLENGES & HOW I SOLVED IT
              </h4>
              <p className="block-text">{activeQuest.challenges}</p>
            </div>
          )}

          {/* Tech Stack Loot */}
          <div className="quest-section-block">
            <h4 className="block-label">TECH LOOT & STACK</h4>
            <div className="quest-tech-tags">
              {activeQuest.techList
                ? activeQuest.techList.map((t, idx) => (
                    <span key={idx} className="tech-loot-pill">
                      {t}
                    </span>
                  ))
                : activeQuest.tech.split(' ').map((t, idx) => (
                    <span key={idx} className="tech-loot-pill">
                      {t}
                    </span>
                  ))}
            </div>
          </div>
        </div>

        {/* Modal Footer / Action Links */}
        <div className="quest-modal-footer">
          {activeQuest.rolllink ? (
            <a
              href={activeQuest.rolllink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-primary"
              onClick={() => sound.playClick()}
            >
              <span>Roll / Try Demo</span>
              <ExternalLink size={15} />
            </a>
          ) : (
            <span className="no-demo-hint">Backend / Local Service</span>
          )}

          {activeQuest.codeLink && (
            <a
              href={activeQuest.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cyber-ghost"
              onClick={() => sound.playClick()}
            >
              <Github size={15} />
              <span>Inspect Source Code</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
