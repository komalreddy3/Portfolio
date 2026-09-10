import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import {
  HelpCircle,
  X,
  Zap,
  Briefcase,
  Terminal,
  Keyboard,
  Award,
  Gamepad2,
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import './HelpGuideModal.css';

export default function HelpGuideModal() {
  const { helpOpen, setHelpOpen, setMode, toggleTerminal, sound } = useGameState();

  if (!helpOpen) return null;

  return (
    <div className="help-modal-overlay" onClick={() => setHelpOpen(false)}>
      <div
        className="help-modal-window"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-guide-title"
      >
        {/* Header */}
        <div className="help-modal-header">
          <div className="help-title-block">
            <HelpCircle size={18} className="text-cyan" />
            <h3 id="help-guide-title" className="help-modal-title">
              FIELD MANUAL // HOW THIS RPG WORKS
            </h3>
          </div>
          <button
            className="help-close-btn"
            onClick={() => setHelpOpen(false)}
            aria-label="Close field manual"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content Body */}
        <div className="help-modal-body">
          {/* Intro Card */}
          <div className="help-card-tip">
            <Gamepad2 size={24} className="text-purple flex-shrink-0" />
            <div>
              <strong>Welcome, Visitor!</strong>
              <p>
                This website is Komal Reddy's real software engineering portfolio, redesigned as an interactive
                RPG character sheet. Everything you see—projects, jobs, skills, and code—is 100% real.
              </p>
            </div>
          </div>

          {/* 4 Quick Guide Columns */}
          <div className="help-guide-grid">
            {/* 1. Recruiter View */}
            <div className="help-guide-col cyber-panel">
              <div className="col-header text-cyan">
                <Briefcase size={16} />
                <span>1. NEED JUST THE FACTS?</span>
              </div>
              <p>
                In a hurry before a meeting? Click <strong>[ 📄 Recruiter View ]</strong> in the top-right (or press <strong>R</strong>).
                It converts the entire site into a clean, distraction-free resume document.
              </p>
              <button
                className="help-action-link"
                onClick={() => {
                  setHelpOpen(false);
                  setMode('recruiter');
                }}
              >
                Switch to Recruiter Mode &rarr;
              </button>
            </div>

            {/* 2. XP & Levels */}
            <div className="help-guide-col cyber-panel">
              <div className="col-header text-purple">
                <Zap size={16} />
                <span>2. HOW XP &amp; LEVELS WORK</span>
              </div>
              <p>
                You start at <strong>Level 24</strong>. You earn exploration XP by interacting with the portfolio:
              </p>
              <ul className="help-bullet-list">
                <li><CheckCircle2 size={12} className="text-green" /> Inspect project briefs (<strong>+40 XP</strong>)</li>
                <li><CheckCircle2 size={12} className="text-green" /> Walk career timeline stages (<strong>+50 XP</strong>)</li>
                <li><CheckCircle2 size={12} className="text-green" /> Test skill tree nodes (<strong>+30 XP</strong>)</li>
                <li><CheckCircle2 size={12} className="text-green" /> Run terminal commands (<strong>+150 XP</strong>)</li>
              </ul>
            </div>

            {/* 3. Developer Terminal */}
            <div className="help-guide-col cyber-panel">
              <div className="col-header text-green">
                <Terminal size={16} />
                <span>3. THE CLI TERMINAL</span>
              </div>
              <p>
                Press <strong>T</strong> or <strong>~</strong> to open the developer CLI. Type <code>help</code>, <code>quests</code>, 
                <code>skills</code>, or try the secret command <code>sudo hire komal</code> to initialize the VIP Hiring Protocol!
              </p>
              <button
                className="help-action-link text-green"
                onClick={() => {
                  setHelpOpen(false);
                  toggleTerminal();
                }}
              >
                Launch Terminal CLI &rarr;
              </button>
            </div>

            {/* 4. Badges & Trophies */}
            <div className="help-guide-col cyber-panel">
              <div className="col-header text-amber">
                <Award size={16} />
                <span>4. TROPHY ROOM</span>
              </div>
              <p>
                There are <strong>9 unlockable badges</strong> hidden across the portfolio. Unlocking an achievement pops up a notification toast on the top-right and saves your progress in your browser!
              </p>
            </div>
          </div>
{/* All Badges & Milestones */}
<div className="guide-achievements-section">
  <h4 className="guide-section-title">All Badges &amp; Milestones</h4>
  <div className="guide-achievements-grid">
    {portfolioData.achievements.map((badge) => (
      <div key={badge.id} className="guide-badge-card">
        <span className="badge-emoji">{badge.icon}</span>
        <div className="badge-info">
          <span className="badge-name">{badge.title}</span>
          <span className="badge-xp">+{badge.xp} XP</span>
        </div>
      </div>
    ))}
  </div>
</div>

          {/* Keyboard Shortcuts Bar */}
          <div className="help-shortcuts-footer cyber-panel">
            <div className="shortcuts-title">
              <Keyboard size={15} />
              <span>KEYBOARD HOTKEYS:</span>
            </div>
            <div className="shortcuts-pills">
              <span className="key-pill"><kbd>R</kbd> Toggle Recruiter Mode</span>
              <span className="key-pill"><kbd>T</kbd> Open Terminal</span>
              <span className="key-pill"><kbd>M</kbd> Toggle Sound FX</span>
              <span className="key-pill"><kbd>?</kbd> Help Manual</span>
              <span className="key-pill"><kbd>Esc</kbd> Close Modals</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="help-modal-footer">
          <button
            className="btn-cyber-primary"
            onClick={() => {
              sound.playClick();
              setHelpOpen(false);
            }}
          >
            <span>Got it, Let's Play!</span>
          </button>
        </div>
      </div>
    </div>
  );
}
