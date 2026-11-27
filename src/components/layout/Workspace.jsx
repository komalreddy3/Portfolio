import React from "react";
import Explorer from "../explorer/Explorer";
import Terminal from "../terminal/Terminal";
import EditorPanel from "../editor/EditorPanel";

export default function Workspace() {
  return (
    <main className="workspace" role="main" aria-label="Developer Workspace">
      <Explorer />
      <div className="terminal-area">
        <Terminal />
      </div>
      <EditorPanel />
    </main>
  );
}
