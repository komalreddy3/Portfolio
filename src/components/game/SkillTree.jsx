import React, { useState, useEffect } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useGameState } from '../../hooks/useGameState';
import { Code2, Globe, Database, Cloud, Activity, CheckCircle2, Sparkles, Terminal } from 'lucide-react';
import './SkillTree.css';

export default function SkillTree() {
  const { skillCategories } = portfolioData;
  const { inspectSkillBranch, sound } = useGameState();
  const [activeCategoryId, setActiveCategoryId] = useState(skillCategories[0].id);
  const [selectedSkill, setSelectedSkill] = useState(skillCategories[0].skills[0]);

  // Ensure default branch is registered so inspecting another category unlocks Skill Tree Master immediately!
  useEffect(() => {
    inspectSkillBranch(skillCategories[0].id);
  }, [inspectSkillBranch, skillCategories]);

  const categoryIcons = {
    languages: <Code2 size={16} />,
    'web-tech': <Globe size={16} />,
    databases: <Database size={16} />,
    'devops-cloud': <Cloud size={16} />,
    'medical-imaging': <Activity size={16} />
  };

  const handleCategoryClick = (cat) => {
    sound.playClick();
    setActiveCategoryId(cat.id);
    setSelectedSkill(cat.skills[0]);
    inspectSkillBranch(cat.id);
  };

  const handleSkillClick = (skill) => {
    sound.playClick();
    setSelectedSkill(skill);
  };

  const activeCategory = skillCategories.find((c) => c.id === activeCategoryId) || skillCategories[0];

  return (
    <section id="skills" className="skill-tree-root">
      <div className="skill-tree-container">
        {/* Section Header */}
        <div className="section-title-header">
          <div className="title-tag">
            <span className="accent-bracket">&lt;</span>
            <span className="title-text">SkillTree</span>
            <span className="accent-bracket">&nbsp;/&gt;</span>
          </div>
          <p className="section-subtitle">
            Technical ability matrix backed by actual production deployments. No fake percentage bars.
          </p>
        </div>

        {/* Category Branch Selector */}
        <div className="skill-branch-tabs">
          {skillCategories.map((cat) => {
            const isActive = cat.id === activeCategoryId;
            return (
              <button
                key={cat.id}
                className={`branch-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <span className="branch-icon">{categoryIcons[cat.id] || <Sparkles size={16} />}</span>
                <span className="branch-name">{cat.title}</span>
                <span className="branch-count">{cat.skills.length}</span>
              </button>
            );
          })}
        </div>

        {/* Interactive Ability Grid & Context Inspector */}
        <div className="skill-matrix-layout">
          {/* Left Column: Skill Nodes Grid */}
          <div className="skill-nodes-column">
            <h4 className="column-label">
              <span>{activeCategory.title.toUpperCase()} ABILITIES</span>
              <span className="label-subtext">Click any node to inspect production context</span>
            </h4>

            <div className="skill-nodes-grid">
              {activeCategory.skills.map((skill) => {
                const isSelected = selectedSkill && selectedSkill.name === skill.name;
                return (
                  <button
                    key={skill.name}
                    className={`skill-node-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSkillClick(skill)}
                  >
                    <div className="node-status-circle">
                      <CheckCircle2 size={13} className="node-check-icon" />
                    </div>
                    <div className="node-info">
                      <span className="node-name">{skill.name}</span>
                      <span className="node-scope">Battle-Tested</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Real Production Evidence Dossier (NO PERCENTAGES!) */}
          <div className="skill-dossier-column cyber-panel">
            <div className="dossier-header">
              <div className="dossier-tag">
                <Terminal size={13} />
                <span>PRODUCTION DOSSIER</span>
              </div>
              <span className="dossier-status-pill">Active Tool</span>
            </div>

            {selectedSkill ? (
              <div className="dossier-content">
                <h3 className="dossier-skill-name">{selectedSkill.name}</h3>

                <div className="dossier-field">
                  <span className="field-label">PRODUCTION EVIDENCE &amp; USE CASE:</span>
                  <p className="field-value">{selectedSkill.role}</p>
                </div>

                <div className="dossier-field">
                  <span className="field-label">CATEGORY:</span>
                  <span className="field-tag">{activeCategory.title}</span>
                </div>

                <div className="dossier-tip-box">
                  <Sparkles size={14} className="tip-icon" />
                  <span>
                    Zero arbitrary "90%" ratings here. Genuine engineering capability demonstrated in code and shipped deployments.
                  </span>
                </div>
              </div>
            ) : (
              <div className="dossier-empty">Select a skill node to inspect</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
