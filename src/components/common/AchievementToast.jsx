import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext";

export default function AchievementToast() {
  const { state, clearAchievementToast } = useAppContext();
  const { pendingAchievement } = state;

  useEffect(() => {
    if (!pendingAchievement) return;
    const timer = setTimeout(clearAchievementToast, 4000);
    return () => clearTimeout(timer);
  }, [pendingAchievement, clearAchievementToast]);

  if (!pendingAchievement) return null;
  const { title, desc, icon, xp } = pendingAchievement;

  return (
    <div className="achievement-toast" role="alert" aria-live="polite">
      <span className="achievement-icon">{icon}</span>
      <div className="achievement-text">
        <div className="at-title">🏆 {title}</div>
        <div className="at-desc">{desc} {xp > 0 && `(+${xp} XP)`}</div>
      </div>
    </div>
  );
}
