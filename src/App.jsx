import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CameraFeedView from './components/edge/CameraFeedView';
import AuditDashboard from './components/audit/AuditDashboard';
import MinistryConsole from './components/msde/MinistryConsole';
import { TRAINING_CENTRES } from './data/centerMockData';

/**
 * App — Master Application Component for KausalyaDrishti
 */
function App() {
  const [activeTab, setActiveTab] = useState('camera');
  const [selectedCentre, setSelectedCentre] = useState(TRAINING_CENTRES[0]);

  return (
    <div className="kd-root-layout">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="kd-main-stage">
        {activeTab === 'camera' && (
          <CameraFeedView 
            centre={selectedCentre} 
            setCentre={setSelectedCentre} 
          />
        )}

        {activeTab === 'audit' && (
          <AuditDashboard 
            selectedCentre={selectedCentre} 
            setSelectedCentre={setSelectedCentre} 
          />
        )}

        {activeTab === 'ministry' && (
          <MinistryConsole />
        )}
      </main>

      <footer className="kd-footer">
        <div className="kd-flex-between">
          <span>
            <strong>KausalyaDrishti (ಕೌಶಲ್ಯ ದೃಷ್ಟಿ)</strong> • Smart India Hackathon 2026 • Team Elite Evolvers
          </span>
          <span className="kd-text-muted">
            Problem Statement ID: 26245 • Ministry of Skill Development & Entrepreneurship (MSDE)
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
