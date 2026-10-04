import React from 'react';
import { Camera, FileBarChart, Landmark, ShieldCheck, Activity } from 'lucide-react';

/**
 * Navbar — Master Top Navigation with Portal Switching & System Health
 */
function Navbar({ activeTab, setActiveTab }) {
  return (
    <header className="kd-navbar">
      <div className="kd-navbar-brand">
        <div className="kd-logo-emblem">🏛️</div>
        <div>
          <div className="kd-brand-flex">
            <h1 className="kd-brand-title">KausalyaDrishti</h1>
            <span className="kd-kannada-subtitle">ಕೌಶಲ್ಯ ದೃಷ್ಟಿ</span>
          </div>
          <p className="kd-brand-desc">
            AI-Based Real-Time Monitoring • Ministry of Skill Development & Entrepreneurship (MSDE)
          </p>
        </div>
      </div>

      <nav className="kd-nav-tabs">
        <button 
          className={`kd-tab-btn ${activeTab === 'camera' ? 'active' : ''}`}
          onClick={() => setActiveTab('camera')}
        >
          <Camera size={16} />
          <span>1. Edge Camera AI Stream</span>
        </button>

        <button 
          className={`kd-tab-btn ${activeTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveTab('audit')}
        >
          <FileBarChart size={16} />
          <span>2. Centre Audit & Discrepancies</span>
        </button>

        <button 
          className={`kd-tab-btn ${activeTab === 'ministry' ? 'active' : ''}`}
          onClick={() => setActiveTab('ministry')}
        >
          <Landmark size={16} />
          <span>3. National Command Console</span>
        </button>
      </nav>

      <div className="kd-system-status">
        <span className="kd-pulse-green"></span>
        <div className="kd-status-text">
          <span className="kd-text-bold">Edge Active</span>
          <span className="kd-text-muted kd-text-xs">5 KB Sync / MQTT</span>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
