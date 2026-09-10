import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGameState } from './hooks/useGameState';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';

// Layout & Common Components
import BackgroundGrid from './components/layout/BackgroundGrid';
import TopHUD from './components/common/TopHUD';
import BottomDock from './components/Header/BottomDock';
import AchievementToast from './components/common/AchievementToast';
import TerminalModal from './components/common/TerminalModal';
import QuestDetailModal from './components/game/QuestDetailModal';
import HelpGuideModal from './components/common/HelpGuideModal';

// Dual Mode Views
import GameModeView from './components/game/GameModeView';
import RecruiterView from './components/recruiter/RecruiterView';

import './App.css';

function App() {
  const { mode } = useGameState();
  const location = useLocation();

  // Enable global keyboard hotkeys (R, T, M, Esc)
  useKeyboardShortcuts();

  // Scroll to relevant section if navigating via legacy hash routes (e.g. /projects, /experience)
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    let targetId = '';

    if (path.includes('project')) {
      targetId = mode === 'game' ? 'quests' : 'projects';
    } else if (path.includes('experience')) {
      targetId = mode === 'game' ? 'career' : 'experience';
    } else if (path.includes('about')) {
      targetId = mode === 'game' ? 'profile' : 'education';
    } else if (path.includes('contact')) {
      // When switching back to game mode, never scroll to contact — go to top instead
      if (mode === 'game') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      targetId = 'contact';
    }

    if (targetId) {
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location.pathname, mode]);

  return (
    <div className="app-root">
      <BackgroundGrid />
      <TopHUD />

      {/* Dual Mode: Immersive RPG vs Clean Recruiter View */}
      {mode === 'game' ? <GameModeView /> : <RecruiterView />}

      <BottomDock />
      <AchievementToast />
      <TerminalModal />
      <QuestDetailModal />
      <HelpGuideModal />
    </div>
  );
}

export default App;
