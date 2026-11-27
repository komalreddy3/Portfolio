import React from "react";
import { useAppContext } from "../../context/AppContext";

// Quest metadata for each quest file
const QUEST_META = {
  "/quests/01-identity.md": {
    id: "01-identity",
    badge: "QUEST 1",
    unlockCondition: (state) =>
      !!state.discovered["/about.md"] && !!state.discovered["/hidden/.secret"],
  },
  "/quests/02-techstack.md": {
    id: "02-techstack",
    badge: "QUEST 2",
    unlockCondition: (state) =>
      !!state.discovered["/skills.md"] &&
      Object.keys(state.discovered).some((k) => k.startsWith("/experience/")),
  },
  "/quests/03-projects.md": {
    id: "03-projects",
    badge: "QUEST 3",
    unlockCondition: (state) =>
      Object.keys(state.discovered).filter((k) => k.startsWith("/projects/")).length >= 3,
  },
  "/quests/04-career.md": {
    id: "04-career",
    badge: "QUEST 4",
    unlockCondition: (state) =>
      Object.keys(state.discovered).filter((k) => k.startsWith("/experience/")).length >= 4,
  },
  "/quests/05-hidden.md": {
    id: "05-hidden",
    badge: "QUEST 5",
    unlockCondition: (state) => !!state.discovered["/hidden/.fun_facts.md"],
  },
};

function extractQuestClues(content) {
  const clues = [];
  const lines = content.split("\n");
  let inClues = false;
  for (const line of lines) {
    if (line.startsWith("## Clues")) { inClues = true; continue; }
    if (inClues && line.startsWith("## ")) break;
    if (inClues && /^\d+\./.test(line.trim())) {
      clues.push(line.trim().replace(/^\d+\.\s*/, ""));
    }
  }
  return clues;
}

function extractQuestHint(content) {
  const lines = content.split("\n");
  let inHint = false;
  for (const line of lines) {
    if (line.startsWith("## Hint")) { inHint = true; continue; }
    if (inHint && line.trim()) return line.trim();
  }
  return "";
}

function QuestView({ file, content, meta, state, setState, unlockAchievement }) {
  const isCompleted = !!state.completedChallenges?.[meta.id];
  const isUnlockable = meta.unlockCondition && meta.unlockCondition(state);
  const clues = extractQuestClues(content);
  const hint = extractQuestHint(content);
  const title = (content.split("\n")[0] || "").replace(/^#\s*/, "");
  const descLine = (content.split("\n").slice(1).find((l) => l.trim() && !l.startsWith("#")) || "");

  const complete = () => {
    setState((prev) => ({
      ...prev,
      completedChallenges: { ...prev.completedChallenges, [meta.id]: true },
      xp: prev.xp + 100,
      terminalOutput: [
        ...prev.terminalOutput,
        { text: `✅ Quest "${title}" completed! +100 XP`, type: "success" },
      ],
    }));
    unlockAchievement(`quest-${meta.id}`, title, `Completed quest: ${title}`, "🏆", 100);
  };

  const showHint = () => {
    setState((prev) => ({
      ...prev,
      terminalOutput: [
        ...prev.terminalOutput,
        { text: `Hint [${meta.id}]: ${hint}`, type: "warn" },
      ],
    }));
  };

  return (
    <div className="quest-card">
      <div className="quest-badge">{meta.badge}</div>
      <h2 className="quest-title">{title}</h2>
      <p className="quest-desc">{descLine}</p>
      {clues.length > 0 && (
        <>
          <div className="quest-section-label">Clues</div>
          <div className="quest-clues">
            {clues.map((c, i) => (
              <div key={i} className="quest-clue">
                <span className="clue-num">{i + 1}.</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </>
      )}
      {isCompleted ? (
        <div className="quest-completed">✓ Quest Completed</div>
      ) : (
        <div className="quest-actions">
          {hint && (
            <button className="quest-btn" onClick={showHint}>💡 Show Hint</button>
          )}
          {isUnlockable && (
            <button className="quest-btn primary" onClick={complete}>
              ✅ Mark Complete
            </button>
          )}
          {!isUnlockable && (
            <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Complete the clues above to unlock this quest.
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default function EditorPanel() {
  const { state, setState, unlockAchievement } = useAppContext();
  const { editorFile, editorContent, editorOpen } = state;

  const close = () =>
    setState((prev) => ({ ...prev, editorFile: null, editorContent: "", editorOpen: false }));

  if (!editorFile || !editorOpen) return null;

  const questMeta = QUEST_META[editorFile];
  const filename = editorFile.split("/").pop() || editorFile;

  return (
    <aside
      className={`editor-panel${!editorOpen ? " collapsed" : ""}`}
      aria-label="Editor Panel"
    >
      <div className="editor-header">
        <div className="editor-tabs">
          <span className={`editor-tab active`}>{filename}</span>
        </div>
        <button className="editor-close-btn" onClick={close} title="Close (Escape)" aria-label="Close editor">
          ✕
        </button>
      </div>
      <div className="editor-content">
        {questMeta ? (
          <QuestView
            file={editorFile}
            content={editorContent}
            meta={questMeta}
            state={state}
            setState={setState}
            unlockAchievement={unlockAchievement}
          />
        ) : (
          <pre className="editor-pre">{editorContent}</pre>
        )}
      </div>
    </aside>
  );
}
