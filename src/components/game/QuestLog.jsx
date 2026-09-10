import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useGameState } from '../../hooks/useGameState';
import { ExternalLink, Github, Sparkles, Filter, ChevronRight } from 'lucide-react';
import './QuestLog.css';

export default function QuestLog() {
  const { quests } = portfolioData;
  const { inspectQuest, sound } = useGameState();
  const [filter, setFilter] = useState('ALL');

  const categories = ['ALL', 'Main Quests (Core Systems)', 'Side Quests (Arcade & Tools)'];

  const filteredQuests = filter === 'ALL'
    ? quests
    : quests.filter((q) => q.category === filter);

  return (
    <section id="quests" className="quest-log-root">
      <div className="quest-container">
        {/* Section Header */}
        <div className="section-header-wrapper"><div className="quest-header-row">
          <div className="quest-title-wrap">
            <div className="title-tag">
              <span className="accent-bracket">&lt;</span>
              <span className="title-text">ActiveQuests</span>
              <span className="accent-bracket">&nbsp;/&gt;</span>
            </div>
            <p className="section-subtitle">
              Interactive quest log of deployed software, web applications, and experimental prototypes.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="quest-filter-tabs">
            <Filter size={14} className="filter-icon" />
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => {
                  sound.playClick();
                  setFilter(cat);
                }}
              >
                {cat === 'ALL' ? 'All Quests' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Quests Grid */}
        <div className="quests-grid">
          {filteredQuests.map((quest) => (
            <article
              key={quest.id}
              className="quest-card cyber-panel"
              onClick={() => inspectQuest(quest)}
            >
              {/* Card Image / Placeholder */}
              <div className="quest-thumbnail-box">
                {quest.img ? (
                  <img
                    src={`${process.env.PUBLIC_URL}${quest.img}`}
                    alt={quest.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="thumbnail-fallback">
                    <Sparkles size={20} />
                    <span>Go / K8s Microservice</span>
                  </div>
                )}
                <div className={`quest-card-diff-tag ${quest.difficulty.toLowerCase()}`}>
                  {quest.difficulty}
                </div>
              </div>

              {/* Card Content */}
              <div className="quest-card-content">
                <div className="quest-tier-meta">{quest.tier}</div>
                <h4 className="quest-card-title">{quest.title}()</h4>
                <p className="quest-card-desc">
                  {quest.desc.length > 110 ? `${quest.desc.slice(0, 110)}...` : quest.desc}
                </p>

                {/* Tech Pills */}
                <div className="quest-card-tech">
                  {quest.techList ? (
                    quest.techList.slice(0, 3).map((t, idx) => (
                      <span key={idx} className="card-tech-pill">
                        {t}
                      </span>
                    ))
                  ) : (
                    <span className="card-tech-pill">{quest.tech.slice(0, 30)}</span>
                  )}
                  {quest.techList && quest.techList.length > 3 && (
                    <span className="card-tech-more">+{quest.techList.length - 3}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="quest-card-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className="btn-inspect-quest"
                    onClick={() => inspectQuest(quest)}
                  >
                    <span>Inspect Brief</span>
                    <ChevronRight size={14} />
                  </button>

                  <div className="quest-quick-links">
                    {quest.rolllink && (
                      <a
                        href={quest.rolllink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="quick-link-btn"
                        title="Live Demo"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                    {quest.codeLink && (
                      <a
                        href={quest.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="quick-link-btn"
                        title="View Code"
                      >
                        <Github size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}