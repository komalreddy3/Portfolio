import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useGameState } from '../../hooks/useGameState';
import { Award, Lock, CheckCircle2, RotateCcw } from 'lucide-react';
import './AchievementHall.css';

export default function AchievementHall() {
  const { achievements } = portfolioData;
  const { unlockedAchievements, resetProgress, sound } = useGameState();

  const unlockedCount = unlockedAchievements.length;

  return (
    <section id="achievements" className="achievement-hall-root">
      <div className="achievement-hall-container">
        {/* Section Header */}
        <div className="hall-header-row">
          <div className="section-title-header">
            <div className="title-tag">
              <span className="accent-bracket">&lt;</span>
              <span className="title-text">TrophyRoom &amp; Badges</span>
              <span className="accent-bracket">&nbsp;/&gt;</span>
            </div>
            <p className="section-subtitle">
              Milestone badges unlocked by exploring the portfolio, testing terminal commands, and inspecting code.
            </p>
          </div>

          <div className="hall-stats-bar">
            <div className="badges-counter-pill">
              <Award size={14} className="text-purple" />
              <span>{unlockedCount} / {achievements.length} Unlocked</span>
            </div>

            <button
              className="reset-progress-btn"
              onClick={() => {
                sound.playClick();
                if (window.confirm('Reset your portfolio exploration XP and badges?')) {
                  resetProgress();
                }
              }}
              title="Reset progress to initial state"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="badges-grid">
          {achievements.map((badge) => {
            const isUnlocked = unlockedAchievements.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`badge-trophy-card cyber-panel ${isUnlocked ? 'unlocked' : 'locked'}`}
              >
                <div className="badge-icon-box">
                  <span className="badge-emoji">{badge.icon}</span>
                  {!isUnlocked && (
                    <div className="lock-overlay">
                      <Lock size={14} />
                    </div>
                  )}
                </div>

                <div className="badge-info-block">
                  <div className="badge-title-row">
                    <h4 className="badge-name">{badge.title}</h4>
                    {isUnlocked ? (
                      <span className="unlocked-pill">
                        <CheckCircle2 size={11} /> Unlocked
                      </span>
                    ) : (
                      <span className="locked-pill">Locked</span>
                    )}
                  </div>
                  <p className="badge-desc">{badge.desc}</p>
                </div>

                <div className="badge-xp-tag">+{badge.xp} XP</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
