import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { challenges } from "../../data/challenges";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun, faEnvelope, faFolder, faFileAlt, faTerminal, faBriefcase, faKeyboard } from "@fortawesome/free-solid-svg-icons";

export default function TopHUD() {
  const { state, setState, toggleDarkMode, setMode } = useAppContext();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const { mode, darkMode, explorerOpen, editorOpen, editorFile } = state;
  const maxChallengeXp = challenges.reduce((total, challenge) => total + challenge.xpReward, 0);
  const earnedChallengeXp = challenges.reduce(
    (total, challenge) => total + (state.completedChallenges?.[challenge.id] ? challenge.xpReward : 0),
    0
  );

  useEffect(() => {
    const handleShortcutGuideKey = (event) => {
      const targetTag = event.target?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea" || event.target?.isContentEditable) return;

      if (event.key === "?") {
        event.preventDefault();
        setShortcutsOpen((isOpen) => !isOpen);
      } else if (event.key === "Escape") {
        setShortcutsOpen(false);
      }
    };

    window.addEventListener("keydown", handleShortcutGuideKey);
    return () => window.removeEventListener("keydown", handleShortcutGuideKey);
  }, []);

  return (
    <header className="top-hud" role="banner">
      {/* Brand */}
      <div className="hud-brand">
        <div className="hud-logo" aria-hidden="true">KR</div>
        <div>
          <div className="hud-name">Komal Reddy</div>
          <div className="hud-role">Full-Stack Engineer</div>
        </div>
      </div>

      {/* Mode toggle (center) */}
      <div className="mode-pill" role="tablist" aria-label="View mode">
        <button
          className={`mode-btn${mode === "game" ? " active" : ""}`}
          onClick={() => setMode("game")}
          role="tab"
          aria-selected={mode === "game"}
          title="Interactive workspace mode (press R)"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <FontAwesomeIcon icon={faTerminal} style={{ fontSize: "0.74rem" }} />
          <span>Workspace</span>
        </button>
        <button
          className={`mode-btn${mode === "recruiter" ? " active" : ""}`}
          onClick={() => setMode("recruiter")}
          role="tab"
          aria-selected={mode === "recruiter"}
          title="Recruiter executive view (press R)"
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <FontAwesomeIcon icon={faBriefcase} style={{ fontSize: "0.74rem" }} />
          <span>Recruiter</span>
        </button>
      </div>

      {/* Controls */}
      <div className="hud-controls">
        <button
          className={`hud-btn shortcuts-trigger${shortcutsOpen ? " active" : ""}`}
          onClick={() => setShortcutsOpen((isOpen) => !isOpen)}
          aria-label="Keyboard shortcuts"
          aria-expanded={shortcutsOpen}
          aria-haspopup="dialog"
          title="Keyboard shortcuts (?)"
        >
          <FontAwesomeIcon icon={faKeyboard} style={{ fontSize: "0.76rem" }} />
          <span>Keys</span>
        </button>
        {shortcutsOpen && (
          <div className="shortcut-popover" role="dialog" aria-label="Keyboard shortcuts">
            <div className="shortcut-popover-heading">
              <strong>Keyboard shortcuts</strong>
              <button className="shortcut-close" onClick={() => setShortcutsOpen(false)} aria-label="Close shortcuts">×</button>
            </div>
            <div className="shortcut-list">
              <div><kbd>R</kbd><span>Switch Workspace / Recruiter</span></div>
              <div><kbd>T</kbd><span>Switch light / dark theme</span></div>
              <div><kbd>Ctrl</kbd><kbd>E</kbd><span>Show / hide Explorer</span></div>
              <div><kbd>Ctrl</kbd><kbd>O</kbd><span>Show / hide Editor (when a file is open)</span></div>
              <div><kbd>Ctrl</kbd><kbd>L</kbd><span>Clear Terminal (when typing)</span></div>
              <div><kbd>Esc</kbd><span>Close a dialog or Editor (when not typing)</span></div>
              <div><kbd>?</kbd><span>Show / hide this guide</span></div>
            </div>
          </div>
        )}
        <div
          className="hud-xp"
          title="Total XP includes achievements; challenge XP is tracked separately"
          aria-label={`${state.xp} total XP. ${earnedChallengeXp} of ${maxChallengeXp} challenge XP earned.`}
        >
          <span className="hud-xp-metric">
            <span className="hud-xp-label">Total XP</span>
            <strong>{state.xp}</strong>
          </span>
          <span className="hud-xp-metric">
            <span className="hud-xp-label">Challenges</span>
            <strong>{earnedChallengeXp}/{maxChallengeXp}</strong>
          </span>
        </div>
        {mode === "game" && (
          <>
            <button
              className={`hud-btn${explorerOpen ? " active" : ""}`}
              onClick={() => setState((p) => ({ ...p, explorerOpen: !p.explorerOpen }))}
              title="Toggle Explorer (Ctrl+E)"
              aria-pressed={explorerOpen}
              style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}
            >
              <FontAwesomeIcon icon={faFolder} style={{ fontSize: "0.74rem" }} />
              <span>Explorer</span>
            </button>
            {editorFile && (
              <button
                className={`hud-btn${editorOpen ? " active" : ""}`}
                onClick={() => setState((p) => ({ ...p, editorOpen: !p.editorOpen }))}
                title="Toggle Editor (Ctrl+O)"
                aria-pressed={editorOpen}
                style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}
              >
                <FontAwesomeIcon icon={faFileAlt} style={{ fontSize: "0.74rem" }} />
                <span>Editor</span>
              </button>
            )}
          </>
        )}
        <button
          className="hud-btn"
          onClick={toggleDarkMode}
          title="Toggle dark mode"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
        >
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} style={{ fontSize: "0.76rem" }} />
          <span>{darkMode ? "Light" : "Dark"}</span>
        </button>
        {mode === "recruiter" && (
          <a
            href="mailto:workwithkomalreddy@gmail.com"
            className="hud-btn cta"
            style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: "0.76rem" }} />
            <span>Contact</span>
          </a>
        )}
      </div>
    </header>
  );
}
