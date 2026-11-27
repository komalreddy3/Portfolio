import React from "react";
import { portfolioData as pd } from "../../data/portfolioData";
import { useAppContext } from "../../context/AppContext";

export default function RecruiterView() {
  const { setMode } = useAppContext();
  const { character, careerPath, quests, skillCategories } = pd;

  return (
    <div className="recruiter-view" role="region" aria-label="Recruiter View">
      {/* Hero section */}
      <section className="rv-hero">
        <div className="rv-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h1 className="rv-name">{character.name}</h1>
              <div className="rv-role">{character.role} · {character.location}</div>
              <p className="rv-bio">{character.tagline}</p>
            </div>
            <button
              className="hud-btn"
              onClick={() => setMode("game")}
              style={{ marginTop: "8px" }}
            >
              ⌨ Switch to Interactive Quest Mode
            </button>
          </div>

          <div className="rv-links">
            <a href={`mailto:${character.email}`} className="rv-link">✉ {character.email}</a>
            <a href={character.github} target="_blank" rel="noopener noreferrer" className="rv-link">🐙 GitHub</a>
            <a href={character.linkedin} target="_blank" rel="noopener noreferrer" className="rv-link">💼 LinkedIn</a>
            <a href={`https://discord.com/users/880422564332208168`} target="_blank" rel="noopener noreferrer" className="rv-link">💬 Discord: {character.discord}</a>
          </div>
        </div>
      </section>

      <div className="rv-container" style={{ paddingTop: "32px", paddingBottom: "64px" }}>
        {/* Core Focus */}
        <section className="rv-section">
          <h2 className="rv-section-title">Core Engineering Focus</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "14px" }}>
            {character.coreFocus.map((focus, i) => (
              <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "14px" }}>
                <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>{focus.title}</h3>
                <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", margin: 0 }}>{focus.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="rv-section">
          <h2 className="rv-section-title">Professional Experience</h2>
          <div>
            {careerPath.slice().reverse().map((exp) => (
              <div key={exp.id} className="rv-career-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap" }}>
                  <h3 className="rv-career-role">{exp.role}</h3>
                  <span className="rv-career-period">{exp.period}</span>
                </div>
                <div className="rv-career-company">{exp.company} {exp.location ? `· ${exp.location}` : ""}</div>
                <p className="rv-career-summary" style={{ marginTop: "6px" }}>{exp.summary}</p>
                <div className="rv-tags">
                  {exp.techStack.map((tech) => (
                    <span key={tech} className="rv-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className="rv-section">
          <h2 className="rv-section-title">Technical Skills & Abilities</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {skillCategories.map((cat) => (
              <div key={cat.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "16px" }}>
                <h3 style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--accent)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  {cat.title}
                </h3>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {cat.skills.map((s) => (
                    <li key={s.name} style={{ marginBottom: "8px", fontSize: "0.82rem" }}>
                      <strong style={{ color: "var(--text)" }}>{s.name}</strong>
                      <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>{s.role}</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="rv-section">
          <h2 className="rv-section-title">Featured Projects & Architecture</h2>
          <div className="rv-projects-grid">
            {quests.map((p) => (
              <div key={p.id} className="rv-project-card">
                <h3 className="rv-project-title">{p.title}</h3>
                <div style={{ fontSize: "0.72rem", color: "var(--accent)", fontFamily: "var(--font-mono)", marginBottom: "6px" }}>
                  {p.tier} · {p.difficulty}
                </div>
                <p className="rv-project-desc">{p.desc}</p>
                <div className="rv-tags" style={{ marginBottom: "12px" }}>
                  {p.techList.map((t) => (
                    <span key={t} className="rv-tag">{t}</span>
                  ))}
                </div>
                <div className="rv-project-links">
                  {p.codeLink && (
                    <a href={p.codeLink} target="_blank" rel="noopener noreferrer" className="rv-project-link">
                      Source Code →
                    </a>
                  )}
                  {p.rolllink && (
                    <a href={p.rolllink} target="_blank" rel="noopener noreferrer" className="rv-project-link">
                      Live App →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
