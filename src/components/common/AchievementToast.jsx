import React, { useEffect } from 'react';
import { useGameState } from '../../hooks/useGameState';
import { Award, X } from 'lucide-react';
import './AchievementToast.css';

export default function AchievementToast() {
  const { recentAchievement, dismissAchievementToast } = useGameState();

  useEffect(() => {
    if (!recentAchievement) return;
    const timer = setTimeout(() => {
      dismissAchievementToast();
    }, 4500);
    return () => clearTimeout(timer);
  }, [recentAchievement, dismissAchievementToast]);

  if (!recentAchievement) return null;

  return (
    <aside className="achievement-toast-container" role="status" aria-live="polite">
      <div className="achievement-toast-card">
        <div className="toast-icon-badge">
          <span className="toast-emoji">{recentAchievement.icon || '🏆'}</span>
        </div>
        <div className="toast-body">
          <div className="toast-tag">
            <Award size={12} />
            <span>ACHIEVEMENT UNLOCKED</span>
          </div>
          <h4 className="toast-title">{recentAchievement.title}</h4>
          <p className="toast-desc">{recentAchievement.desc}</p>
        </div>
        <div className="toast-xp-pill">+{recentAchievement.xp} XP</div>
        <button
          className="toast-close-btn"
          onClick={dismissAchievementToast}
          aria-label="Close notification"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
}
