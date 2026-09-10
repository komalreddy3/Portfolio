import React, { useState, useRef, useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { portfolioData } from '../../data/portfolioData';
import { Terminal as TermIcon, X, CornerDownLeft, Sparkles } from 'lucide-react';
import './TerminalModal.css';

export default function TerminalModal() {
  const { terminalOpen, setTerminalOpen, unlockAchievement, sound } = useGameState();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'system',
      text: 'Komal OS Shell [Version 2.4.0-release]\nLogged in as: guest@komal-workstation\nType "help" to see available commands or click buttons below.'
    }
  ]);

  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  // Auto focus input when terminal opens
  useEffect(() => {
    if (terminalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      unlockAchievement('terminal-hacker');
    }
  }, [terminalOpen, unlockAchievement]);

  // Scroll to bottom when history updates
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [history]);

  if (!terminalOpen) return null;

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    sound.playTerminalKey();

    if (cmd === 'exit' || cmd === 'quit') {
      setTerminalOpen(false);
      return;
    }

    if (cmd === 'clear') {
      setHistory([]);
      return;
    }

    let response = portfolioData.terminalCommands[cmd];

    if (!response) {
      if (cmd.startsWith('sudo hire')) {
        response = portfolioData.terminalCommands['sudo hire komal'];
      } else if (cmd.startsWith('sudo')) {
        response = portfolioData.terminalCommands.sudo;
      } else {
        response = `Command not recognized: "${cmd}". Type "help" for valid commands.`;
      }
    }

    // Check for VIP secret easter egg
    if (cmd === 'sudo hire komal' || cmd === 'hire') {
      unlockAchievement('easter-egg-hire');
    }

    setHistory((prev) => [
      ...prev,
      { type: 'user', text: `$ ${rawCmd}` },
      { type: 'output', text: response }
    ]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputVal) return;
    handleCommand(inputVal);
    setInputVal('');
  };

  const quickCommands = ['help', 'bio', 'exp', 'quests', 'skills', 'contact', 'sudo hire komal', 'clear'];

  return (
    <div className="terminal-overlay" onClick={() => setTerminalOpen(false)}>
      <div
        className="terminal-window"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="terminal-title"
      >
        {/* Terminal Header */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red" onClick={() => setTerminalOpen(false)} />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <div className="terminal-title" id="terminal-title">
            <TermIcon size={14} />
            <span>komal@production: ~ (bash)</span>
          </div>
          <button
            className="terminal-close-btn"
            onClick={() => setTerminalOpen(false)}
            aria-label="Close terminal"
          >
            <X size={15} />
          </button>
        </div>

        {/* Terminal Content Body */}
        <div className="terminal-body" ref={bodyRef}>
          {history.map((item, idx) => (
            <div key={idx} className={`terminal-line ${item.type}`}>
              <pre>{item.text}</pre>
            </div>
          ))}

          {/* Prompt line */}
          <form className="terminal-input-form" onSubmit={onSubmit}>
            <span className="terminal-prompt">guest@komalportfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type a command..."
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
            <button type="submit" className="terminal-submit-btn">
              <CornerDownLeft size={14} />
            </button>
          </form>
        </div>

        {/* Quick Command Suggestion Bar */}
        <div className="terminal-quick-bar">
          <span className="quick-label">
            <Sparkles size={12} /> Quick run:
          </span>
          <div className="quick-tags">
            {quickCommands.map((qc) => (
              <button
                key={qc}
                className="quick-cmd-pill"
                onClick={() => handleCommand(qc)}
              >
                {qc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
