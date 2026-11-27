import React from "react";
import { useAppContext } from "../../context/AppContext";

export default function TopHUD() {
  const { state, setState, toggleDarkMode, setMode } = useAppContext();
  const { mode, darkMode, explorerOpen, editorOpen, editorFile } = state;

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
        >
          ⌨ Workspace
        </button>
        <button
          className={`mode-btn${mode === "recruiter" ? " active" : ""}`}
          onClick={() => setMode("recruiter")}
          role="tab"
          aria-selected={mode === "recruiter"}
          title="Recruiter-friendly view (press R)"
        >
          📋 Recruiter
        </button>
      </div>

      {/* Controls */}
      <div className="hud-controls">
        {mode === "game" && (
          <>
            <button
              className={`hud-btn${explorerOpen ? " active" : ""}`}
              onClick={() => setState((p) => ({ ...p, explorerOpen: !p.explorerOpen }))}
              title="Toggle Explorer (Ctrl+E)"
              aria-pressed={explorerOpen}
            >
              📂 Explorer
            </button>
            {editorFile && (
              <button
                className={`hud-btn${editorOpen ? " active" : ""}`}
                onClick={() => setState((p) => ({ ...p, editorOpen: !p.editorOpen }))}
                title="Toggle Editor (Ctrl+O)"
                aria-pressed={editorOpen}
              >
                📄 Editor
              </button>
            )}
          </>
        )}
        <button
          className="hud-btn"
          onClick={toggleDarkMode}
          title="Toggle dark mode"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>
        {mode === "recruiter" && (
          <a
            href="mailto:workwithkomalreddy@gmail.com"
            className="hud-btn cta"
          >
            ✉ Hire Me
          </a>
        )}
      </div>
    </header>
  );
}
