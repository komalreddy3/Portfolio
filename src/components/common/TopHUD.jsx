import React from 'react';
import { useGameState } from '../../hooks/useGameState';
import { portfolioData } from '../../data/portfolioData';
import { Terminal, Volume2, VolumeX, Briefcase, Gamepad2, MapPin, HelpCircle, RotateCcw } from 'lucide-react';
import './TopHUD.css';

export default function TopHUD() {
  const {
    xp,
    level,
    levelProgressPercent,
    audioEnabled,
    toggleAudio,
    mode,
    setMode,
    toggleTerminal,
    toggleHelp,
    xpNotification,
    resetProgress
  } = useGameState();

  const { character } = portfolioData;

  return (
    <header className="top-hud-root">
      <div className="top-hud-container">
        {/* Left: Player ID & Status */}
        <div className="hud-player-identity">
          <div className="player-avatar-mini">
            <img src={`${process.env.PUBLIC_URL}${character.avatar}`} alt="Komal" />
            <span className="player-online-dot" />
          </div>
          <div className="player-info-text">
            <span className="player-name">{character.name}</span>
            <div className="player-subline">
              <span className="player-class">Full-Stack Engineer</span>
              <span className="location-pill">
                <MapPin size={11} /> Hyderabad, IN
              </span>
            </div>
          </div>
        </div>

        {/* Center: XP & Level Telemetry */}
        <div className="hud-level-telemetry">
          <div className="hud-level-badge">
            <span className="lvl-prefix">LVL</span>
            <span className="lvl-number">{level}</span>
          </div>
          <div className="hud-xp-meter">
            <div className="hud-xp-labels">
              <span className="xp-current">{xp} XP</span>
              <span className="xp-next">Next Lvl: {levelProgressPercent}%</span>
              <button className="reset-progress-btn" onClick={resetProgress} title="Reset All Progress">
                <RotateCcw size={12} /><span>Reset All</span>
              </button>
            </div>
            <div className="xp-bar-track">
              <div
                className="xp-bar-fill"
                style={{ width: `${levelProgressPercent}%` }}
              />
            </div>
          </div>

          {/* Dynamic Floating XP Gain Badge Indicator */}
          {xpNotification && (
            <div key={xpNotification.id} className="hud-xp-gain-bubble">
              <span className="gain-plus">+{xpNotification.amount} XP</span>
              {xpNotification.reason && <span className="gain-reason">{xpNotification.reason}</span>}
            </div>
          )}
        </div>

        {/* Right: Controls (SFX, Terminal, Mode Switch) */}
        <div className="hud-controls">
          {/* Audio Toggle */}
          <button
            className={`hud-btn hud-icon-btn ${audioEnabled ? 'active' : ''}`}
            onClick={toggleAudio}
            title={`Sound FX: ${audioEnabled ? 'ON' : 'OFF'} (Press M)`}
            aria-label="Toggle Sound Effects"
          >
            {audioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span className="hud-btn-text desktop-only">SFX</span>
          </button>

          {/* Terminal Launcher */}
          <button
            className="hud-btn hud-icon-btn"
            onClick={toggleTerminal}
            title="Open Developer Terminal (Press T or ~)"
            aria-label="Open Terminal"
          >
            <Terminal size={16} />
            <span className="hud-btn-text desktop-only">CLI</span>
          </button>

          {/* How to Play / Field Guide */}
          <button
            className="hud-btn hud-icon-btn"
            onClick={toggleHelp}
            title="Field Manual: How this RPG works (Press ?)"
            aria-label="How This Works Guide"
          >
            <HelpCircle size={16} />
            <span className="hud-btn-text desktop-only">Guide</span>
          </button>

          {/* Mode Switch: RPG vs Recruiter */}
          <div className="mode-toggle-group">
            <button
              className={`mode-btn ${mode === 'game' ? 'active-rpg' : ''}`}
              onClick={() => setMode('game')}
              title="Interactive Game Mode"
            >
              <Gamepad2 size={15} />
              <span>RPG Mode</span>
            </button>
            <button
              className={`mode-btn ${mode === 'recruiter' ? 'active-recruiter' : ''}`}
              onClick={() => setMode('recruiter')}
              title="Clean Recruiter Resume View"
            >
              <Briefcase size={15} />
              <span>Recruiter View</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
