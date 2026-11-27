import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

export function useKeyboardShortcuts() {
  const { state, setState, setMode, toggleDarkMode } = useAppContext();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if user is typing in input or textarea
      const targetTag = e.target?.tagName?.toLowerCase();
      const isInput = targetTag === "input" || targetTag === "textarea";

      // Global Esc: close modals or editor
      if (e.key === "Escape") {
        if (state.resetModalOpen) {
          setState((prev) => ({ ...prev, resetModalOpen: false }));
          return;
        }
        if (state.editorOpen && !isInput) {
          setState((prev) => ({ ...prev, editorOpen: false }));
          return;
        }
      }

      // Ctrl hotkeys
      if (e.ctrlKey && !e.shiftKey && !e.altKey) {
        if (e.key.toLowerCase() === "e") {
          e.preventDefault();
          setState((prev) => ({ ...prev, explorerOpen: !prev.explorerOpen }));
          return;
        }
        if (e.key.toLowerCase() === "o") {
          e.preventDefault();
          if (state.editorFile) {
            setState((prev) => ({ ...prev, editorOpen: !prev.editorOpen }));
          }
          return;
        }
      }

      if (isInput) return;

      // Mode toggle hotkey: 'r' or 'R'
      if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        setMode(state.mode === "game" ? "recruiter" : "game");
      }

      // Theme toggle hotkey: 't' or 'T'
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        toggleDarkMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.mode, state.resetModalOpen, state.editorOpen, state.editorFile, setState, setMode, toggleDarkMode]);
}
