import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useGameState } from '../../hooks/useGameState';
import { CheckCircle2, ChevronRight, Building, Calendar, MapPin } from 'lucide-react';
import './CareerMap.css';

export default function CareerMap() {
  const { careerPath } = portfolioData;
  const { inspectCareerNode, sound } = useGameState();
  const [selectedIdx, setSelectedIdx] = useState(0); // Default to Level 1 (NIT Manipur)

  const activeStage = careerPath[selectedIdx];

  const handleSelect = (idx) => {
    sound.playClick();
    setSelectedIdx(idx);
    inspectCareerNode(careerPath[idx].id);
  };

  return (
    <section id="career" className="career-map-root">
      <div className="career-container">
        {/* Section Header */}
        <div className="section-header-wrapper"><div className="section-title-header">
          <div className="title-tag">
            <span className="accent-bracket">&lt;</span>
            <span className="title-text">CareerProgression</span>
            <span className="accent-bracket">&nbsp;/&gt;</span>
          </div>
          <p className="section-subtitle">
            Walkthrough of levels cleared, bosses defeated, and production clusters survived.
          </p>
        </div></div>

        {/* Progression Checkpoints Map / Stepper */}
        <div className="career-stepper-bar">
          {careerPath.map((stage, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={stage.id}
                className={`stepper-node ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelect(idx)}
              >
                <div className="stepper-dot">
                  <span className="stepper-level-num">L{stage.level}</span>
                </div>
                <div className="stepper-meta">
                  <span className="stepper-company">{stage.company}</span>
                  <span className="stepper-role">{stage.role}</span>
                </div>
                {idx < careerPath.length - 1 && <ChevronRight className="stepper-arrow" size={16} />}
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Card with Cyber Holo Frame */}
        <div className="career-card-wrapper">
          <div className="career-holo-frame">
            <span className="corner-bracket top-left" />
            <span className="corner-bracket top-right" />
            <span className="corner-bracket bottom-left" />
            <span className="corner-bracket bottom-right" />

            <div className="career-card-inner cyber-panel">
              {/* Card Top Row */}
              <div className="stage-header-row">
                <div className="stage-title-block">
                  <div className="stage-level-tag">
                    <span>LEVEL 0{activeStage.level} {'//'} {activeStage.badge}</span>
                    {activeStage.isCurrent && (
                      <span className="current-badge">
                        <CheckCircle2 size={12} /> ACTIVE BOSS STAGE
                      </span>
                    )}
                  </div>
                  <h3 className="stage-role-title">{activeStage.role}</h3>
                  <div className="stage-company-meta">
                    <span className="company-name">
                      <Building size={14} /> @ {activeStage.company}
                    </span>
                    <span className="stage-duration">
                      <Calendar size={13} /> {activeStage.period}
                    </span>
                    <span className="stage-location">
                      <MapPin size={13} /> {activeStage.location}
                    </span>
                  </div>
                </div>

                {activeStage.logo && (
                  <div className="company-logo-box">
                    <img
                      src={`${process.env.PUBLIC_URL}${activeStage.logo}`}
                      alt={activeStage.company}
                      className="stage-logo-img"
                    />
                  </div>
                )}
              </div>

              {/* Stage Summary */}
              <p className="stage-summary-text">{activeStage.summary}</p>

              {/* Commit Log / Mission Actions */}
              <div className="stage-commit-block">
                <div className="commit-log-header">
                  <span>RELEASE NOTES &amp; COMMIT LOG:</span>
                </div>
                <ul className="stage-commits-list">
                  {activeStage.commitLog.map((log, i) => (
                    <li key={i} className="commit-item">
                      <span className="commit-hash">#0{i + 1}</span>
                      <span className="commit-text">{log}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack Loot Pills */}
              <div className="stage-tech-footer">
                <span className="tech-footer-label">STACK &amp; TOOLS:</span>
                <div className="stage-tech-tags">
                  {activeStage.techStack.map((tech, i) => (
                    <span key={i} className="tech-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
