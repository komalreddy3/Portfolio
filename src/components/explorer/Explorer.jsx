import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import { listDirectory, getNode } from "../../virtualFS";

function TreeNode({ path, name, level, selectedPath, onSelect, showHidden }) {
  const isDir = getNode(path) === "DIR";
  const [expanded, setExpanded] = useState(level === 0);
  const isSelected = selectedPath === path;
  const isHidden = name.startsWith(".");

  if (isHidden && !showHidden && level > 0) return null;

  const children = isDir ? listDirectory(path).filter(e => showHidden || !e.isHidden) : [];

  const handleClick = (e) => {
    e.stopPropagation();
    if (isDir) {
      setExpanded((x) => !x);
      onSelect(path, true);
    } else {
      onSelect(path, false);
    }
  };

  const icon = isDir
    ? (expanded ? "▾" : "▸")
    : getFileIcon(name);

  return (
    <div>
      <div
        className={`tree-row${isSelected ? " selected" : ""}`}
        style={{ paddingLeft: `${8 + level * 14}px` }}
        onClick={handleClick}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={isDir ? expanded : undefined}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(e); }}}
      >
        <span className="tree-icon">{icon}</span>
        <span className="tree-name">{name}</span>
      </div>
      {isDir && expanded && children.map((child) => (
        <TreeNode
          key={child.path}
          path={child.path}
          name={child.name}
          level={level + 1}
          selectedPath={selectedPath}
          onSelect={onSelect}
          showHidden={showHidden}
        />
      ))}
    </div>
  );
}

function getFileIcon(name) {
  if (name.endsWith(".md")) return "📄";
  if (name.endsWith(".js") || name.endsWith(".jsx") || name.endsWith(".ts")) return "📜";
  if (name.endsWith(".json")) return "{}";
  if (name.endsWith(".txt")) return "📝";
  if (name.startsWith(".")) return "🔒";
  return "📄";
}

export default function Explorer() {
  const { state, setState, unlockAchievement } = useAppContext();
  const [showHidden, setShowHidden] = useState(false);

  const handleSelect = (path, isDir) => {
    if (isDir) {
      setState((prev) => ({ ...prev, cwd: path }));
      return;
    }
    const node = getNode(path);
    if (typeof node === "string" && node !== "DIR") {
      setState((prev) => ({
        ...prev,
        editorFile: path,
        editorContent: node,
        editorOpen: true,
        discovered: { ...prev.discovered, [path]: true },
      }));
      // Achievement: explored tree
      unlockAchievement("tree-climber", "Skill Tree Master", "Explored the file explorer.", "🌳", 75);
    }
  };

  const rootEntries = listDirectory("/").filter(e => showHidden || !e.isHidden);

  return (
    <aside
      className={`explorer${!state.explorerOpen ? " collapsed" : ""}`}
      aria-label="File Explorer"
      role="tree"
    >
      <div className="explorer-header">
        <span>EXPLORER</span>
        <button
          className="hud-btn"
          style={{ padding: "2px 6px", fontSize: "0.68rem" }}
          onClick={() => setShowHidden((x) => !x)}
          title={showHidden ? "Hide hidden files" : "Show hidden files"}
        >
          {showHidden ? "hide ." : "show ."}
        </button>
      </div>
      <div className="explorer-tree">
        {rootEntries.map((entry) => (
          <TreeNode
            key={entry.path}
            path={entry.path}
            name={entry.name}
            level={0}
            selectedPath={state.editorFile}
            onSelect={handleSelect}
            showHidden={showHidden}
          />
        ))}
      </div>
    </aside>
  );
}
