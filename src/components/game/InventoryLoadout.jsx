import React from 'react';
import { portfolioData } from '../../data/portfolioData';
import { Shield, Wrench, Crosshair, Cpu, Box } from 'lucide-react';
import './InventoryLoadout.css';

export default function InventoryLoadout() {
  const { loadout } = portfolioData;

  const slotIcons = {
    'Primary Weapon': <Crosshair size={18} className="loadout-icon text-amber" />,
    'Offhand Sidearm': <Cpu size={18} className="loadout-icon text-purple" />,
    'Defensive Armor': <Shield size={18} className="loadout-icon text-cyan" />,
    'Specialized Hardware': <Box size={18} className="loadout-icon text-green" />,
    'Utility Toolbelt': <Wrench size={18} className="loadout-icon text-dim" />
  };

  return (
    <section id="loadout" className="loadout-root">
      <div className="loadout-container">
        {/* Section Header */}
        <div className="section-title-header">
          <div className="title-tag">
            <span className="accent-bracket">&lt;</span>
            <span className="title-text">DeveloperLoadout</span>
            <span className="accent-bracket">&nbsp;/&gt;</span>
          </div>
          <p className="section-subtitle">
            Equipped developer inventory and runtime tools used on daily missions.
          </p>
        </div>

        {/* Inventory Cards Grid */}
        <div className="loadout-grid">
          {loadout.map((item, idx) => (
            <div key={idx} className="loadout-card cyber-panel">
              <div className="loadout-top-row">
                <span className="slot-badge">{item.slot}</span>
                <span className={`tier-badge ${item.tier.toLowerCase()}`}>{item.tier}</span>
              </div>

              <div className="loadout-main-row">
                <div className="loadout-icon-box">
                  {slotIcons[item.slot] || <Wrench size={18} />}
                </div>
                <h4 className="loadout-name">{item.name}</h4>
              </div>

              <p className="loadout-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
