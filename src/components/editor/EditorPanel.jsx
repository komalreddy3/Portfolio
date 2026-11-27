import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { challenges } from "../../data/challenges";
import MarkdownPreview from "./MarkdownPreview";

function runCodeTests(codeChallenge, source) {
  return new Promise((resolve) => {
    const runnerSource = `
      self.fetch = undefined;
      self.XMLHttpRequest = undefined;
      self.WebSocket = undefined;
      self.EventSource = undefined;
      self.importScripts = () => { throw new Error("External scripts are disabled"); };
      function equal(a, b) {
        if (Object.is(a, b)) return true;
        if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
        if (Array.isArray(a) !== Array.isArray(b)) return false;
        const aKeys = Object.keys(a).sort();
        const bKeys = Object.keys(b).sort();
        return aKeys.length === bKeys.length && aKeys.every((key, index) => key === bKeys[index] && equal(a[key], b[key]));
      }
      self.onmessage = ({ data }) => {
        try {
          const solve = new Function(data.parameterName, "\\"use strict\\";\\n" + data.source);
          const results = data.tests.map((test) => {
            try {
              const originalInput = JSON.parse(JSON.stringify(test.input));
              const output = solve(test.input);
              const unchanged = !test.unchanged || equal(test.input, originalInput);
              return { label: test.label, hidden: !!test.hidden, passed: equal(output, test.expected) && unchanged };
            } catch (error) {
              return { label: test.label, hidden: !!test.hidden, passed: false, error: error.message };
            }
          });
          self.postMessage({ results });
        } catch (error) {
          self.postMessage({ error: error.message });
        }
      };
    `;

    const url = URL.createObjectURL(new Blob([runnerSource], { type: "text/javascript" }));
    const worker = new Worker(url);
    const finish = (result) => {
      clearTimeout(timeoutId);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(result);
    };
    const timeoutId = setTimeout(() => finish({ error: "Execution timed out. Check for an unbounded loop." }), 1500);
    worker.onmessage = (event) => finish(event.data);
    worker.onerror = () => finish({ error: "The code runner could not execute this submission." });
    worker.postMessage({ parameterName: codeChallenge.parameterName, source, tests: codeChallenge.tests });
  });
}

function QuestCardView({ meta, state, setState, unlockAchievement }) {
  const isCompleted = !!state.completedChallenges?.[meta.id];
  const [feedback, setFeedback] = useState(null);
  const [code, setCode] = useState(meta.codeChallenge.starterCode);
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const starterCode = meta.codeChallenge.starterCode;

  useEffect(() => {
    setFeedback(null);
    setCode(starterCode);
    setTestResults(null);
    setShowHint(false);
    setShowSolution(false);
  }, [meta.id, starterCode]);

  const criteriaStatus = (meta.criteria || []).map((criterion) => ({
    ...criterion,
    passed: criterion.check(state),
  }));
  const codePassed = testResults?.results?.length === meta.codeChallenge.tests.length && testResults.results.every((result) => result.passed);
  const completedEvidence = criteriaStatus.filter((criterion) => criterion.passed).length;
  const totalSteps = meta.codeChallenge.tests.length;
  const completedSteps = testResults?.results?.filter((result) => result.passed).length || 0;
  const allPassed = codePassed;

  const handleRunTests = async () => {
    setIsRunning(true);
    setFeedback(null);
    setTestResults(await runCodeTests(meta.codeChallenge, code));
    setIsRunning(false);
  };

  const handleVerify = () => {
    if (allPassed) {
      const xp = meta.xpReward || 100;
      setState((prev) => ({
        ...prev,
        completedChallenges: { ...prev.completedChallenges, [meta.id]: true },
        terminalOutput: [
          ...prev.terminalOutput,
              { text: `✅ Challenge Verified & Solved: "${meta.title}"! (+${xp} XP)`, type: "success" },
        ],
      }));
      unlockAchievement(`quest-${meta.id}`, meta.title, `Completed: ${meta.title}`, "🏆", xp);
      setFeedback({ type: "success", msg: `All tests pass. Challenge complete. +${xp} XP earned.` });
      return;
    }

    setFeedback({
      type: "error",
      msg: "Run the tests and pass every case to finish this challenge.",
    });
    setState((prev) => ({
      ...prev,
      terminalOutput: [
        ...prev.terminalOutput,
        { text: `⚠️ Verification check failed for "${meta.title}": code challenge tests are incomplete.`, type: "warn" },
      ],
    }));
  };

  return (
    <div className="quest-card">
      <div className="challenge-topline">
        <div className="quest-badge">{meta.badge}</div>
        <span className="challenge-xp">+{meta.xpReward} XP</span>
      </div>

      <h2 className="quest-title">{meta.title}</h2>
      <div className="challenge-level">{meta.difficulty}</div>

      <div className="challenge-progress-label">
        <span>Test Progress</span>
        <span>{completedSteps}/{totalSteps} passing</span>
      </div>
      <div className="challenge-progress" role="progressbar" aria-label="Test progress" aria-valuemin={0} aria-valuemax={totalSteps} aria-valuenow={completedSteps}>
        <span style={{ width: `${totalSteps ? (completedSteps / totalSteps) * 100 : 0}%` }} />
      </div>

      <section className="challenge-brief">
        <div className="quest-section-label">The Situation</div>
        <p className="challenge-scenario">{meta.description}</p>
        <div className="challenge-objective">
          <span>Your Task</span>
          <p>{meta.objective}</p>
        </div>
        <div className="challenge-constraints">
          <div className="quest-section-label">Rules</div>
          <ul>{meta.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}</ul>
        </div>
      </section>

      <section className="challenge-code">
        <div className="challenge-code-heading">
          <div>
            <div className="quest-section-label">Write Code</div>
            <code>function {meta.codeChallenge.functionName}({meta.codeChallenge.parameterName})</code>
            <p className="challenge-code-instructions">Finish the function below. The input is already provided.</p>
          </div>
          <div className="challenge-code-meta">
            <span>{meta.codeChallenge.tests.length} test cases</span>
          </div>
        </div>
        <div className="challenge-code-toolbar">
          <span className="challenge-language">{meta.codeChallenge.language}</span>
          <span className="challenge-code-toolbar-label">Function body</span>
        </div>
        <textarea
          className="challenge-code-input"
          value={code}
          onChange={(event) => { setCode(event.target.value); setTestResults(null); setFeedback(null); }}
          spellCheck={false}
          aria-label="Challenge code editor"
        />
        <div className="challenge-run-row">
          <button className="quest-btn primary" onClick={handleRunTests} disabled={isRunning}>
            {isRunning ? "Running Tests..." : "Run Tests"}
          </button>
          <button className="quest-btn" onClick={() => { setCode(starterCode); setTestResults(null); setFeedback(null); }}>
            Reset Code
          </button>
          {testResults?.results && (
            <span className={codePassed ? "challenge-test-summary passed" : "challenge-test-summary failed"} role="status">
              {testResults.results.filter((result) => result.passed).length}/{testResults.results.length} passing
            </span>
          )}
        </div>
        {testResults?.error && <p className="challenge-test-error" role="alert">{testResults.error}</p>}
        {testResults?.results && (
          <div className="challenge-test-list" aria-label="Test results">
            {testResults.results.filter((result) => !result.hidden).map((result) => (
              <div key={result.label} className={`challenge-test-result${result.passed ? " passed" : " failed"}`}>
                <span>{result.passed ? "PASS" : "FAIL"}</span>
                <span>{result.label}</span>
              </div>
            ))}
            {meta.codeChallenge.tests.some((test) => test.hidden) && (
              <div className="challenge-test-result hidden-case">
                <span>{testResults.results.filter((result) => result.hidden && result.passed).length}/{testResults.results.filter((result) => result.hidden).length}</span>
                <span>Hidden edge cases</span>
              </div>
            )}
          </div>
        )}
        {codePassed && (
          <div className="challenge-reveal">
            <div className="quest-section-label">About Komal</div>
            <p>{meta.codeChallenge.reveal}</p>
          </div>
        )}
        <div className="challenge-help-actions">
          <button
            className="quest-btn"
            onClick={() => setShowHint((visible) => !visible)}
            aria-expanded={showHint}
          >
            {showHint ? "Hide Hint" : "Show Hint"}
          </button>
          <button
            className="quest-btn"
            onClick={() => setShowSolution((visible) => !visible)}
            aria-expanded={showSolution}
          >
            {showSolution ? "Hide Solution" : "Show Answer"}
          </button>
        </div>
        {showHint && <p className="challenge-hint" role="note">{meta.codeChallenge.hint}</p>}
        {showSolution && (
          <div className="challenge-solution">
            <div className="challenge-solution-heading">
              <span>Example Answer · {meta.codeChallenge.language}</span>
              <button
                type="button"
                className="quest-btn"
                onClick={() => { setCode(meta.codeChallenge.solution); setTestResults(null); setFeedback(null); }}
              >
                Use Solution
              </button>
            </div>
            <pre>{meta.codeChallenge.solution}</pre>
            <p>Using this answer will not finish the challenge. Run the tests to check it.</p>
          </div>
        )}
      </section>

      <section className="challenge-evidence">
        <div className="challenge-evidence-heading">
          <div className="quest-section-label">More to Discover · Optional</div>
          <span>{completedEvidence}/{criteriaStatus.length} confirmed</span>
        </div>
        <div className="challenge-criteria-list">
          {criteriaStatus.map((criterion) => (
            <div key={criterion.id} className={`challenge-criterion${criterion.passed ? " passed" : ""}`}>
              <span className="challenge-criterion-mark">{criterion.passed ? "✓" : "○"}</span>
              <span>{criterion.label}</span>
            </div>
          ))}
        </div>
      </section>

      {meta.hint && (
        <div className="challenge-hint-label">
          <button
            className="quest-btn"
            onClick={() => setState((prev) => ({
              ...prev,
              terminalOutput: [...prev.terminalOutput, { text: `Hint [${meta.title}]: ${meta.hint}`, type: "warn" }],
            }))}
          >More About This Challenge</button>
        </div>
      )}

      {feedback && (
        <div className={`challenge-feedback ${feedback.type}`} role="status">
          {feedback.msg}
        </div>
      )}

      {isCompleted ? (
        <div className="quest-completed" style={{ marginTop: "6px" }}>
          ✓ Complete · +{meta.xpReward} XP earned
        </div>
      ) : (
        <div className="quest-actions">
          <button className="quest-btn primary" onClick={handleVerify}>Finish Challenge</button>
        </div>
      )}
    </div>
  );
}

export default function EditorPanel() {
  const { state, setState, unlockAchievement } = useAppContext();
  const { editorFile, editorContent, editorOpen } = state;
  const [viewMode, setViewMode] = useState("preview"); // "preview" | "raw"

  const close = () =>
    setState((prev) => ({ ...prev, editorFile: null, editorContent: "", editorOpen: false }));

  if (!editorFile || !editorOpen) return null;

  const questMeta = challenges.find((c) => c.questFilePath === editorFile);
  const isMarkdown = editorFile.endsWith(".md");
  const filename = editorFile.split("/").pop() || editorFile;

  return (
    <aside
      className={`editor-panel${!editorOpen ? " collapsed" : ""}`}
      aria-label="Editor Panel"
    >
      <div className="editor-header">
        <div className="editor-tabs">
          <span className="editor-tab active">{filename}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {/* Toggle between rendered Markdown preview and Raw source for .md files */}
          {isMarkdown && !questMeta && (
            <div style={{ display: "flex", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "2px" }}>
              <button
                style={{
                  padding: "2px 6px",
                  fontSize: "0.68rem",
                  fontFamily: "var(--font-mono)",
                  background: viewMode === "preview" ? "var(--surface)" : "transparent",
                  color: viewMode === "preview" ? "var(--accent)" : "var(--text-muted)",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
                onClick={() => setViewMode("preview")}
                title="Rendered Markdown Preview"
              >
                Preview
              </button>
              <button
                style={{
                  padding: "2px 6px",
                  fontSize: "0.68rem",
                  fontFamily: "var(--font-mono)",
                  background: viewMode === "raw" ? "var(--surface)" : "transparent",
                  color: viewMode === "raw" ? "var(--accent)" : "var(--text-muted)",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
                onClick={() => setViewMode("raw")}
                title="Raw Document Source"
              >
                Raw
              </button>
            </div>
          )}

          <button className="editor-close-btn" onClick={close} title="Close (Escape)" aria-label="Close editor">
            ✕
          </button>
        </div>
      </div>

      <div className="editor-content">
        {questMeta ? (
          <QuestCardView
            meta={questMeta}
            state={state}
            setState={setState}
            unlockAchievement={unlockAchievement}
          />
        ) : isMarkdown && viewMode === "preview" ? (
          <MarkdownPreview content={editorContent} />
        ) : (
          <pre className="editor-pre">{editorContent}</pre>
        )}
      </div>
    </aside>
  );
}
