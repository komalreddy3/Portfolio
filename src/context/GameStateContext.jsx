import React, { createContext, useState, useEffect, useCallback } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useSoundEffects } from '../hooks/useSoundEffects';

export const GameStateContext = createContext(null);

const STORAGE_KEY = 'komal_rpg_state_v1';

export function GameStateProvider({ children }) {
  // Load saved state or defaults
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            xp: parsed.xp ?? 50,
            unlockedAchievements: parsed.unlockedAchievements || ['first-contact'],
            audioEnabled: parsed.audioEnabled ?? false,
            // Force RPG mode on load regardless of persisted value
            mode: 'game',
            inspectedQuests: parsed.inspectedQuests || [],
            inspectedCareerNodes: parsed.inspectedCareerNodes || [],
            inspectedSkillBranches: parsed.inspectedSkillBranches || [],
            // Flag to manage reset XP reward gating
            justReset: false
          };
      }
    } catch (e) {
      console.warn('LocalStorage unavailable:', e);
    }
    return {
      xp: 1500,
      unlockedAchievements: ['first-contact'],
      audioEnabled: false,
      mode: 'game',
      inspectedQuests: [],
      inspectedCareerNodes: [],
      inspectedSkillBranches: [],
      // Ensure justReset flag exists
      justReset: false
    };
  });

  const [recentAchievement, setRecentAchievement] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [activeQuest, setActiveQuest] = useState(null);
  const [helpOpen, setHelpOpen] = useState(false);
  const [xpNotification, setXpNotification] = useState(null);

  // Sound generator
  const sound = useSoundEffects(state.audioEnabled);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }, [state]);

  // Level calculation (adjusted for custom start XP)
  const startXp = 50;
  const level = 24 + Math.floor(Math.max(0, state.xp - startXp) / 250);
  const nextLevelXp = startXp + (level - 23) * 250; // XP needed for next level
  const currentLevelBaseXp = startXp + (level - 24) * 250; // XP threshold for current level
  const denom = nextLevelXp - currentLevelBaseXp;
  const progress = denom > 0
    ? Math.round(((state.xp - currentLevelBaseXp) / denom) * 100)
    : 0;
  const levelProgressPercent = Math.min(100, Math.max(0, progress));

  // Add XP with visual pulse and sound effect
  const triggerXpGain = useCallback((amount, reason = '') => {
    sound.playXpGain();
    setXpNotification({ amount, reason, id: Date.now() });
    setTimeout(() => {
      setXpNotification(null);
    }, 2200);
  }, [sound]);

  const addXp = useCallback((amount, reason = '') => {
    triggerXpGain(amount, reason);
    setState((prev) => ({
      ...prev,
      xp: prev.xp + amount
    }));
  }, [triggerXpGain]);

  // Unlock Achievement
  const unlockAchievement = useCallback(
    (achievementId) => {
      setState((prev) => {
        if (prev.unlockedAchievements.includes(achievementId)) {
          return prev;
        }
        const badge = portfolioData.achievements.find((a) => a.id === achievementId);
        if (badge) {
          setRecentAchievement(badge);
          sound.playUnlock();
          triggerXpGain(badge.xp || 50, badge.title);
          return {
            ...prev,
            xp: prev.xp + (badge.xp || 50),
            unlockedAchievements: [...prev.unlockedAchievements, achievementId]
          };
        }
        return prev;
      });
    },
    [sound, triggerXpGain]
  );

  // Clear recent achievement toast
  const dismissAchievementToast = useCallback(() => {
    setRecentAchievement(null);
  }, []);

  // Toggle Audio
  const toggleAudio = useCallback(() => {
    setState((prev) => {
      const next = !prev.audioEnabled;
      if (next) {
        setTimeout(() => sound.playUnlock(), 50);
        unlockAchievement('audio-enthusiast');
      }
      return { ...prev, audioEnabled: next };
    });
  }, [sound, unlockAchievement]);

  // Toggle Mode (Game vs Recruiter)
  const setMode = useCallback(
    (newMode) => {
      sound.playClick();
      if (newMode === 'recruiter') {
        unlockAchievement('recruiter-speedrun');
      }
      setState((prev) => ({ ...prev, mode: newMode }));
    },
    [sound, unlockAchievement]
  );

  const toggleMode = useCallback(() => {
    sound.playClick();
    setState((prev) => {
      const newMode = prev.mode === 'game' ? 'recruiter' : 'game';
      if (newMode === 'recruiter') {
        unlockAchievement('recruiter-speedrun');
      }
      return { ...prev, mode: newMode };
    });
  }, [sound, unlockAchievement]);

  // Inspect Quest - unlocks on FIRST quest inspection as requested!
  const inspectQuest = useCallback(
    (quest) => {
      sound.playOpenModal();
      setActiveQuest(quest);
      setState((prev) => {
        if (!prev.inspectedQuests.includes(quest.id)) {
          const nextList = [...prev.inspectedQuests, quest.id];
          // User asked: when clicked on inspect brief for first time, trigger Quest Inspector!
          if (!prev.unlockedAchievements.includes('quest-inspector')) {
            unlockAchievement('quest-inspector');
          }
          triggerXpGain(40, `Quest: ${quest.shortTitle || quest.title}`);
          return {
            ...prev,
            xp: prev.xp + 40,
            inspectedQuests: nextList
          };
        }
        return prev;
      });
    },
    [sound, unlockAchievement, triggerXpGain]
  );

  // Inspect Career Node
  const inspectCareerNode = useCallback(
    (nodeId) => {
      sound.playClick();
      setState((prev) => {
        if (!prev.inspectedCareerNodes.includes(nodeId)) {
          const nextList = [...prev.inspectedCareerNodes, nodeId];
          if (nextList.length >= portfolioData.careerPath.length) {
            unlockAchievement('career-traveler');
          }
          triggerXpGain(50, 'Career Stage Unlocked');
          return {
            ...prev,
            xp: prev.xp + 50,
            inspectedCareerNodes: nextList
          };
        }
        return prev;
      });
    },
    [sound, unlockAchievement, triggerXpGain]
  );

  // Inspect Skill Branch - unlock Skill Tree Master when exploring branches (requires 2 or more categories)
  const inspectSkillBranch = useCallback(
    (branchId) => {
      sound.playClick();
      setState((prev) => {
        if (!prev.inspectedSkillBranches.includes(branchId)) {
          const nextList = [...prev.inspectedSkillBranches, branchId];
          if (nextList.length >= 2 && !prev.unlockedAchievements.includes('tree-climber')) {
            unlockAchievement('tree-climber');
          }
          // Suppress XP reward if just reset
          if (prev.justReset) {
            return { ...prev, inspectedSkillBranches: nextList };
          }
          triggerXpGain(30, 'Ability Branch Analyzed');
          return {
            ...prev,
            xp: prev.xp + 30,
            inspectedSkillBranches: nextList
          };
        }
        return prev;
      });
    },
    [sound, unlockAchievement, triggerXpGain]
  );

  // Reset Progress (Developer/Tester feature)
  const resetProgress = useCallback(() => {
    const fresh = {
      xp: 50,
      unlockedAchievements: ['first-contact'],
      audioEnabled: false,
      mode: 'game',
      inspectedQuests: [],
      inspectedCareerNodes: [],
      inspectedSkillBranches: [],
      // Set justReset true to block skill branch XP on immediate inspection
      justReset: true
    };
    setState(fresh);
    // Clear justReset after short delay to re‑enable normal rewards
    setTimeout(() => {
      setState(prev => ({ ...prev, justReset: false }));
    }, 500);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }, []);

  return (
    <GameStateContext.Provider
      value={{
        ...state,
        level,
        nextLevelXp,
        levelProgressPercent,
        recentAchievement,
        terminalOpen,
        activeQuest,
        sound,
        addXp,
        unlockAchievement,
        dismissAchievementToast,
        toggleAudio,
        setMode,
        toggleMode,
        inspectQuest,
        closeQuestModal: () => setActiveQuest(null),
        inspectCareerNode,
        inspectSkillBranch,
        setTerminalOpen,
        toggleTerminal: () => {
          sound.playClick();
          setTerminalOpen((prev) => !prev);
        },
        helpOpen,
        setHelpOpen,
        toggleHelp: () => {
          sound.playClick();
          setHelpOpen((prev) => !prev);
        },
        xpNotification,
        resetProgress
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
}
