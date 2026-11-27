import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export const AppContext = createContext(null);

const STORAGE_KEY = "dcq_state";

const DEFAULT_STATE = {
  mode: "game",        // "game" | "recruiter"
  darkMode: false,
  cwd: "/",
  terminalOutput: [],
  commandHistory: [],
  historyIdx: -1,
  editorFile: null,
  editorContent: "",
  explorerOpen: true,
  editorOpen: true,
  discovered: {},
  completedChallenges: {},
  questProgress: {},
  xp: 0,
  achievements: [],
  resetModalOpen: false,
  pendingAchievement: null,
};

function loadPersisted() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return {
      mode:               parsed.mode || "game",
      darkMode:           !!parsed.darkMode,
      cwd:                parsed.cwd || "/",
      discovered:         parsed.discovered || {},
      completedChallenges: parsed.completedChallenges || {},
      questProgress:      parsed.questProgress || {},
      xp:                 parsed.xp || 0,
      achievements:       parsed.achievements || [],
    };
  } catch {
    return {};
  }
}

export function AppContextProvider({ children }) {
  const persisted = loadPersisted();
  const [state, _setState] = useState({ ...DEFAULT_STATE, ...persisted });

  // Apply theme on mount and whenever darkMode changes
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      state.darkMode ? "dark" : "light"
    );
  }, [state.darkMode]);

  // Persist selected slices
  useEffect(() => {
    const toSave = {
      mode:               state.mode,
      darkMode:           state.darkMode,
      cwd:                state.cwd,
      discovered:         state.discovered,
      completedChallenges: state.completedChallenges,
      questProgress:      state.questProgress,
      xp:                 state.xp,
      achievements:       state.achievements,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }, [
    state.mode, state.darkMode, state.cwd,
    state.discovered, state.completedChallenges,
    state.questProgress, state.xp, state.achievements,
  ]);

  const setState = useCallback((updater) => {
    _setState((prev) =>
      typeof updater === "function" ? updater(prev) : { ...prev, ...updater }
    );
  }, []);

  const toggleDarkMode = useCallback(() => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  }, [setState]);

  const setMode = useCallback((m) => {
    setState((prev) => ({ ...prev, mode: m }));
  }, [setState]);

  const resetAll = useCallback(() => {
    _setState((prev) => ({
      ...DEFAULT_STATE,
      mode:     prev.mode,
      darkMode: prev.darkMode,
    }));
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const unlockAchievement = useCallback((id, title, desc, icon, xpAmt = 0) => {
    _setState((prev) => {
      if (prev.achievements.includes(id)) return prev;
      return {
        ...prev,
        xp:             prev.xp + xpAmt,
        achievements:   [...prev.achievements, id],
        pendingAchievement: { id, title, desc, icon, xp: xpAmt },
      };
    });
  }, []);

  const clearAchievementToast = useCallback(() => {
    setState((prev) => ({ ...prev, pendingAchievement: null }));
  }, [setState]);

  return (
    <AppContext.Provider value={{
      state,
      setState,
      toggleDarkMode,
      setMode,
      resetAll,
      unlockAchievement,
      clearAchievementToast,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used inside AppContextProvider");
  return ctx;
}
