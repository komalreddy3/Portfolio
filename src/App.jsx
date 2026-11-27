import React from "react";
import { useAppContext } from "./context/AppContext";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";
import TopHUD from "./components/common/TopHUD";
import Workspace from "./components/layout/Workspace";
import RecruiterView from "./components/recruiter/RecruiterView";
import ResetModal from "./components/common/ResetModal";
import AchievementToast from "./components/common/AchievementToast";

export default function App() {
  const { state } = useAppContext();

  // Register global hotkeys: R (toggle mode), T (toggle theme), Ctrl+E, Ctrl+O, Esc
  useKeyboardShortcuts();

  return (
    <div className="app-root">
      <TopHUD />
      {state.mode === "game" ? <Workspace /> : <RecruiterView />}
      <ResetModal />
      <AchievementToast />
    </div>
  );
}
