import React, { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { runCommand, commandRegistry } from "../../commands/registry";
import { listDirectory, resolvePath } from "../../virtualFS";

const WELCOME = [
  { text: "Developer Code Quest v1.0", type: "banner" },
  { text: "------------------------------------", type: "muted" },
  { text: "Type 'help' for available commands.", type: "muted" },
  { text: "Type 'whoami' to discover who I am.", type: "muted" },
  { text: "", type: "" },
];

export default function Terminal() {
  const { state, setState, unlockAchievement } = useAppContext();
  const [input, setInput] = useState("");
  const [localHistIdx, setLocalHistIdx] = useState(-1);
  const outputRef = useRef(null);
  const inputRef = useRef(null);

  // Initialise with welcome message
  useEffect(() => {
    if (state.terminalOutput.length === 0) {
      setState((prev) => ({ ...prev, terminalOutput: WELCOME }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [state.terminalOutput]);

  const submit = (cmd) => {
    if (!cmd.trim()) return;
    setInput("");
    setLocalHistIdx(-1);
    runCommand(cmd, { state, setState, unlockAchievement });

    // Achievement: first terminal command
    unlockAchievement("terminal-hacker", "Terminal Hacker", "Executed a command in the developer terminal.", "💻", 150);
  };

  const onKeyDown = (e) => {
    // History nav
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const h = state.commandHistory || [];
      const next = Math.min(localHistIdx + 1, h.length - 1);
      setLocalHistIdx(next);
      setInput(h[next] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = localHistIdx - 1;
      if (next < 0) {
        setLocalHistIdx(-1);
        setInput("");
      } else {
        setLocalHistIdx(next);
        setInput((state.commandHistory || [])[next] || "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      autocomplete();
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setState((prev) => ({ ...prev, terminalOutput: [] }));
    }
  };

  const autocomplete = () => {
    const parts = input.split(/\s+/);
    if (parts.length === 1) {
      // Complete command name
      const prefix = parts[0].toLowerCase();
      const match = Object.keys(commandRegistry).find((c) => c.startsWith(prefix) && c !== prefix);
      if (match) setInput(match);
    } else {
      // Complete path argument
      const pathArg = parts[parts.length - 1];
      const cwd = state.cwd || "/";
      let searchDir = cwd;
      let prefix = "";
      const lastSlash = pathArg.lastIndexOf("/");
      if (lastSlash >= 0) {
        const dirPart = pathArg.slice(0, lastSlash + 1);
        prefix = pathArg.slice(lastSlash + 1);
        searchDir = resolvePath(cwd, dirPart);
      } else {
        prefix = pathArg;
      }
      const entries = listDirectory(searchDir);
      const match = entries.find(
        (e) => e.name.startsWith(prefix) && e.name !== prefix
      );
      if (match) {
        const base = lastSlash >= 0 ? pathArg.slice(0, lastSlash + 1) : "";
        const completed = base + match.name + (match.isDir ? "/" : "");
        setInput(parts.slice(0, -1).concat(completed).join(" "));
      }
    }
  };

  const lineClass = (type) => `term-line${type ? ` ${type}` : ""}`;
  const displayCwd = state.cwd === "/" ? "~" : state.cwd;

  return (
    <div className="terminal-panel" data-testid="terminal">
      <div className="terminal-chrome">
        <span className="tc-dot red" />
        <span className="tc-dot yellow" />
        <span className="tc-dot green" />
        <span className="tc-title">komal@portfolio: {displayCwd}</span>
      </div>
      <div className="terminal-output" ref={outputRef} aria-live="polite" aria-atomic="false">
        {state.terminalOutput.map((line, i) => {
          const { text, type } = typeof line === "string"
            ? { text: line, type: "" }
            : line;
          return (
            <span key={i} className={lineClass(type)}>
              {text}
            </span>
          );
        })}
      </div>
      <div className="terminal-input-row">
        <span className="prompt-cwd">{displayCwd}</span>
        <span className="prompt-dollar">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          onKeyPress={(e) => { if (e.key === "Enter") { e.preventDefault(); submit(input); }}}
          className="terminal-input"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Terminal input"
          placeholder="type a command..."
        />
      </div>
    </div>
  );
}
