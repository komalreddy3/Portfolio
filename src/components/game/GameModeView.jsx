import React from 'react';
import CharacterScreen from './CharacterScreen';
import CareerMap from './CareerMap';
import QuestLog from './QuestLog';
import SkillTree from './SkillTree';
import InventoryLoadout from './InventoryLoadout';
import CharacterProfile from './CharacterProfile';
import AchievementHall from './AchievementHall';
import MissionControlContact from './MissionControlContact';

export default function GameModeView() {
  return (
    <div className="game-mode-root">
      <CharacterScreen />
      <CareerMap />
      <QuestLog />
      <SkillTree />
      <InventoryLoadout />
      <CharacterProfile />
      <AchievementHall />
      <MissionControlContact />
    </div>
  );
}
