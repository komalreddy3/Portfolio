import { useEffect } from 'react';
import { useGameState } from './useGameState';

export function useKeyboardShortcuts() {
  const {
    toggleMode,
    toggleTerminal,
    toggleAudio,
    activeQuest,
    closeQuestModal,
    terminalOpen,
    setTerminalOpen,
    helpOpen,
    setHelpOpen,
    toggleHelp
  } = useGameState();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger hotkeys if user is actively typing inside an input or textarea
      const targetTag = e.target.tagName ? e.target.tagName.toLowerCase() : '';
      const isInput = targetTag === 'input' || targetTag === 'textarea';

      if (e.key === 'Escape') {
        if (activeQuest) {
          closeQuestModal();
        }
        if (terminalOpen) {
          setTerminalOpen(false);
        }
        if (helpOpen) {
          setHelpOpen(false);
        }
        return;
      }

      if (isInput) return;

      if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        toggleMode();
      } else if (e.key === 't' || e.key === 'T' || e.key === '`') {
        e.preventDefault();
        toggleTerminal();
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleAudio();
      } else if (e.key === '?') {
        e.preventDefault();
        toggleHelp();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    toggleMode,
    toggleTerminal,
    toggleAudio,
    activeQuest,
    closeQuestModal,
    terminalOpen,
    setTerminalOpen,
    helpOpen,
    setHelpOpen,
    toggleHelp
  ]);
}
