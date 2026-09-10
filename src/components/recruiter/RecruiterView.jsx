import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useGameState } from '../../hooks/useGameState';
import {
  Briefcase,
  FolderKanban,
  GraduationCap,
  Wrench,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  MapPin,
  Gamepad2,
  Calendar
} from 'lucide-react';
import './RecruiterView.css';

export default function RecruiterView() {
  const { character, careerPath, quests, skillCategories } = portfolioData;
  const { setMode, inspectQuest, sound } = useGameState();

  const jobs = careerPath.filter((c) => c.id !== 'nit-manipur');
  const education = careerPath.find((c) => c.id === 'nit-manipur');

  return (
    <div className="recruiter-view-root">
      {/* Subnav Anchor Header */}
      <nav className="recruiter-subnav">
        <div className="recruiter-subnav-inner">
          <span className="recruiter-pill-label">
            <Briefcase size={14} /> RECRUITER EXECUTIVE VIEW
          </span>
          <div className="recruiter-anchors">
            <a href="#summary">Summary</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </div>
          <button
            className="btn-switch-rpg"
            onClick={() => setMode('game')}
            title="Switch back to interactive game mode"
          >
            <Gamepad2 size={14} />
            <span>Switch to RPG Mode</span>
          </button>
        </div>
      </nav>

      <main className="recruiter-document-body">
        {/* Header / Summary Section */}
        <section id="summary" className="recruiter-section recruiter-summary-card">
          <div className="recruiter-header-top">
            <div className="recruiter-name-block">
              <h1 className="recruiter-name">{character.name}</h1>
              <h2 className="recruiter-role-subtitle">{character.role}</h2>
              <div className="recruiter-meta-row">
                <span><MapPin size={14} /> {character.location}</span>
                <span>•</span>
                <a href={`mailto:${character.email}`}>{character.email}</a>
                <span>•</span>
                <a href={character.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                <span>•</span>
                <a href={character.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </div>
            </div>

            <div className="recruiter-resume-cta">
              <a
                href={`mailto:${character.email}?subject=Interview%20Inquiry%20-%20Komal%20Reddy`}
                className="btn-recruiter-primary"
                onClick={() => sound.playClick()}
              >
                <Mail size={15} />
                <span>Contact for Opportunities</span>
              </a>
            </div>
          </div>

          <div className="recruiter-bio-box">
            <p>
              Full-Stack Engineer with hands-on production experience in <strong>event-driven microservices</strong>, 
              <strong>cloud container orchestration (Docker/Kubernetes)</strong>, and <strong>healthcare technology pipelines (DICOM/HL7)</strong>. 
              Graduated from NIT Manipur with a 9+ CGPA. Proven ability to write reliable backend services in Go and Python, 
              and build modern, reactive web frontends in React.js paired with Node.js APIs.
            </p>
          </div>

          {/* Quick Snapshot Focus Areas */}
          <div className="recruiter-snapshot-grid">
            {character.coreFocus.map((f, i) => (
              <div key={i} className="snapshot-item">
                <span className="snapshot-title">{f.title}</span>
                <span className="snapshot-desc">{f.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="recruiter-section">
          <div className="recruiter-section-header">
            <Briefcase size={20} className="section-header-icon" />
            <h3 className="section-title">Professional Experience</h3>
          </div>

          <div className="recruiter-timeline">
            {jobs.map((job) => (
              <article key={job.id} className="recruiter-job-card">
                <div className="job-card-header">
                  <div>
                    <h4 className="job-title">{job.role}</h4>
                    <span className="job-company">{job.company}</span>
                    <span className="job-location"> — {job.location}</span>
                  </div>
                  <span className="job-period">
                    <Calendar size={13} /> {job.period}
                  </span>
                </div>

                <p className="job-summary">{job.summary}</p>

                <ul className="job-bullet-list">
                  {job.commitLog.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>

                <div className="job-tech-pills">
                  {job.techStack.map((tech, idx) => (
                    <span key={idx} className="r-tech-tag">{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="recruiter-section">
          <div className="recruiter-section-header">
            <FolderKanban size={20} className="section-header-icon" />
            <h3 className="section-title">Key Projects &amp; Software Systems</h3>
          </div>

          <div className="recruiter-projects-table-wrap">
            <div className="recruiter-projects-grid">
              {quests.map((project) => (
                <div key={project.id} className="recruiter-project-card">
                  <div className="r-proj-top">
                    <h4 className="r-proj-title">{project.title}</h4>
                    <span className="r-proj-tier">{project.tier}</span>
                  </div>

                  <p className="r-proj-desc">{project.desc}</p>

                  <div className="r-proj-tech">
                    <strong>Stack:</strong> {project.tech}
                  </div>

                  <div className="r-proj-actions">
                    <button
                      className="r-inspect-btn"
                      onClick={() => inspectQuest(project)}
                    >
                      View Details
                    </button>
                    {project.rolllink && (
                      <a
                        href={project.rolllink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="r-action-link"
                      >
                        <ExternalLink size={13} /> Demo
                      </a>
                    )}
                    {project.codeLink && (
                      <a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="r-action-link"
                      >
                        <Github size={13} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section (NO FAKE PERCENTAGES!) */}
        <section id="skills" className="recruiter-section">
          <div className="recruiter-section-header">
            <Wrench size={20} className="section-header-icon" />
            <h3 className="section-title">Technical Skills &amp; Domain Expertise</h3>
          </div>

          <div className="recruiter-skills-matrix">
            {skillCategories.map((category) => (
              <div key={category.id} className="skills-category-row">
                <span className="category-row-name">{category.title}:</span>
                <div className="category-skills-tags">
                  {category.skills.map((s) => (
                    <span key={s.name} className="skill-matrix-tag" title={s.role}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        {education && (
          <section id="education" className="recruiter-section">
            <div className="recruiter-section-header">
              <GraduationCap size={20} className="section-header-icon" />
              <h3 className="section-title">Education</h3>
            </div>

            <div className="recruiter-education-card">
              <div className="edu-top-row">
                <div>
                  <h4 className="edu-degree">{education.role}</h4>
                  <span className="edu-school">{education.company}</span>
                </div>
                <span className="edu-period">{education.period}</span>
              </div>
              <p className="edu-desc">{education.summary}</p>
              <div className="edu-coursework">
                <strong>Key Coursework:</strong> {education.techStack.join(', ')}
              </div>
            </div>
          </section>
        )}

        {/* Contact Footer */}
        <section id="contact" className="recruiter-section recruiter-contact-section">
          <h3 className="section-title">Let's Connect</h3>
          <p className="contact-lead-text">
            Available for software engineering roles, distributed systems work, and full-stack development.
          </p>
          <div className="recruiter-contact-actions">
            <a href={`mailto:${character.email}`} className="btn-recruiter-primary">
              <Mail size={15} />
              <span>{character.email}</span>
            </a>
            <a
              href={character.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-recruiter-secondary"
            >
              <Linkedin size={15} />
              <span>LinkedIn Profile</span>
            </a>
            <a
              href={character.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-recruiter-secondary"
            >
              <Github size={15} />
              <span>GitHub Repositories</span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
