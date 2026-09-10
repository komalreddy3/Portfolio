import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolioData';
import { useGameState } from '../../hooks/useGameState';
import { Mail, MessageSquare, Github, Linkedin, Copy, Check, Send, MapPin } from 'lucide-react';
import './MissionControlContact.css';

export default function MissionControlContact() {
  const { character } = portfolioData;
  const { sound } = useGameState();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(character.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="contact-mission-root">
      <div className="contact-mission-container">
        {/* Section Header */}
        <div className="section-title-header text-center">
          <div className="title-tag">
            <span className="accent-bracket">&lt;</span>
            <span className="title-text">TransmitSignal // Ping</span>
            <span className="accent-bracket">&nbsp;/&gt;</span>
          </div>
          <p className="section-subtitle">
            Something cool to build or an engineering challenge to solve? Drop a message!
          </p>
        </div>

        {/* Contact Terminal Card */}
        <div className="contact-terminal-card cyber-panel">
          <div className="contact-prompt-block">
            <p className="contact-humor-text">
              "Something cool to share? Drop a message! I may not reply faster than your favorite delivery app, but hey, I try."
            </p>
            <div className="location-info">
              <MapPin size={14} className="text-purple" />
              <span>Operating from Sector Hyderabad, India</span>
            </div>
          </div>

          <div className="contact-channels-grid">
            {/* Email Channel */}
            <div className="channel-card">
              <div className="channel-icon-box">
                <Mail size={20} className="channel-icon text-cyan" />
              </div>
              <div className="channel-info">
                <span className="channel-label">ELECTRONIC DISPATCH (EMAIL)</span>
                <a href={`mailto:${character.email}`} className="channel-link">
                  {character.email}
                </a>
              </div>
              <button
                className="channel-copy-btn"
                onClick={copyEmail}
                title="Copy email to clipboard"
              >
                {copied ? <Check size={16} className="text-green" /> : <Copy size={16} />}
              </button>
            </div>

            {/* Discord Channel */}
            <div className="channel-card">
              <div className="channel-icon-box">
                <MessageSquare size={20} className="channel-icon text-purple" />
              </div>
              <div className="channel-info">
                <span className="channel-label">VOICE &amp; CHAT COMS (DISCORD)</span>
                <a
                  href={character.discordUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-link"
                >
                  {character.discord}
                </a>
              </div>
            </div>

            {/* GitHub Channel */}
            <div className="channel-card">
              <div className="channel-icon-box">
                <Github size={20} className="channel-icon text-green" />
              </div>
              <div className="channel-info">
                <span className="channel-label">CODE REPOSITORY (GITHUB)</span>
                <a
                  href={character.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-link"
                >
                  github.com/komalreddy3
                </a>
              </div>
            </div>

            {/* LinkedIn Channel */}
            <div className="channel-card">
              <div className="channel-icon-box">
                <Linkedin size={20} className="channel-icon text-amber" />
              </div>
              <div className="channel-info">
                <span className="channel-label">PROFESSIONAL NETWORK (LINKEDIN)</span>
                <a
                  href={character.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-link"
                >
                  linkedin.com/in/komalreddyk
                </a>
              </div>
            </div>
          </div>

          <div className="contact-footer-bar">
            <a
              href={`mailto:${character.email}?subject=Hello%20Komal!`}
              className="btn-cyber-primary"
              onClick={() => sound.playClick()}
            >
              <Send size={15} />
              <span>Send Direct Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
