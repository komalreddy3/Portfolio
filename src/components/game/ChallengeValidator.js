// src/components/game/ChallengeValidator.js
// Utility to validate and unlock challenges

export const validateChallenge = (state, setState, challengeId) => {
  // Dynamically import challenges to avoid circular dependency
  // eslint-disable-next-line import/no-dynamic-require
  const { challenges } = require('../../data/challenges');
  const ch = challenges.find(c => c.id === challengeId);
  if (!ch) {
    setState(prev => ({
      ...prev,
      terminalOutput: [...prev.terminalOutput, `Challenge ${challengeId} not found`]
    }));
    return;
  }
  // Check if unlock condition is satisfied
  const canUnlock = ch.unlockCondition(state);
  if (!canUnlock) {
    setState(prev => ({
      ...prev,
      terminalOutput: [...prev.terminalOutput, `Challenge ${challengeId} cannot be unlocked yet`]
    }));
    return;
  }
  // Run onUnlock side effects if provided
  if (typeof ch.onUnlock === 'function') {
    ch.onUnlock(state, setState);
  }
  // Mark as completed and report success
  setState(prev => ({
    ...prev,
    completedChallenges: { ...prev.completedChallenges, [challengeId]: true },
    terminalOutput: [...prev.terminalOutput, `Challenge ${challengeId} completed!`]
  }));
};
