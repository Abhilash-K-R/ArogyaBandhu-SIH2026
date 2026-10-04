import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  ShieldAlert, 
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import AttendanceDiscrepancyCard from './AttendanceDiscrepancyCard';
import InfraComplianceWidget from './InfraComplianceWidget';
import SanctionedEquipList from './SanctionedEquipList';
import { TRAINING_CENTRES } from '../../data/centerMockData';
import { calculateAttendanceDiscrepancy } from '../../services/complianceRules';

/**
 * AuditDashboard — Centre Compliance & Discrepancy Register
 */
function AuditDashboard({ selectedCentre, setSelectedCentre }) {
  const [filter, setFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCentres = TRAINING_CENTRES.filter(c => {
    const disc = calculateAttendanceDiscrepancy(c.biometricClaimed, c.defaultAiDetected);
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.district.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'RISK_HIGH') return disc.riskTier === 'HIGH' || disc.riskTier === 'CRITICAL';
    if (filter === 'COMPLIANT') return disc.riskTier === 'LOW';
    return true;
  });

  return (
    <div className="kd-page-container">
      <div className="kd-page-header">
        <div>
          <h2 className="kd-page-title">Center Audit & Discrepancy Register</h2>
          <p className="kd-page-subtitle">Cross-verification of Aadhaar Biometrics vs. Edge Computer Vision across PMKVY hubs</p>
        </div>
        <div className="kd-actions-row">
          <button className="kd-btn kd-btn-primary">
            <FileSpreadsheet size={18} />
            <span>Export Master Audit CSV</span>
          </button>
        </div>
      </div>

      <div className="kd-grid-2col">
        {/* Left Column: Center Selection Table */}
        <div className="kd-card">
          <div className="kd-card-header kd-flex-between">
            <h3 className="kd-card-title">Training Centres Registry ({filteredCentres.length})</h3>
            <div className="kd-filter-btn-group">
              <button 
                className={`kd-filter-btn ${filter === 'ALL' ? 'active' : ''}`}
                onClick={() => setFilter('ALL')}
              >
                All
              </button>
              <button 
                className={`kd-filter-btn ${filter === 'RISK_HIGH' ? 'active' : ''}`}
                onClick={() => setFilter('RISK_HIGH')}
              >
                High Risk
              </button>
              <button 
                className={`kd-filter-btn ${filter === 'COMPLIANT' ? 'active' : ''}`}
                onClick={() => setFilter('COMPLIANT')}
              >
                Compliant
              </button>
            </div>
          </div>

          <div className="kd-search-box kd-mb-3">
            <Search size={16} className="kd-text-muted" />
            <input 
              type="text" 
              placeholder="Search by center name, ID, or district..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="kd-search-input"
            />
          </div>

          <div className="kd-centre-list-scroll">
            {filteredCentres.map((c) => {
              const disc = calculateAttendanceDiscrepancy(c.biometricClaimed, c.defaultAiDetected);
              const isSelected = c.id === selectedCentre.id;

              return (
                <div 
                  key={c.id} 
                  className={`kd-centre-row-item ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedCentre(c)}
                >
                  <div className="kd-flex-between">
                    <div>
                      <div className="kd-text-bold">{c.name}</div>
                      <div className="kd-text-muted kd-text-xs">{c.id} • {c.district}, {c.state}</div>
                    </div>
                    <span className={`kd-badge ${
                      disc.riskTier === 'CRITICAL' ? 'badge-red' :
                      disc.riskTier === 'HIGH' ? 'badge-amber' :
                      disc.riskTier === 'MEDIUM' ? 'badge-blue' : 'badge-green'
                    }`}>
                      {disc.riskTier}
                    </span>
                  </div>

                  <div className="kd-centre-row-stats kd-mt-2">
                    <span>Aadhaar: <strong>{c.biometricClaimed}</strong></span>
                    <span>CCTV: <strong>{c.defaultAiDetected}</strong></span>
                    <span className={disc.isGhostFraud ? 'kd-text-red kd-text-bold' : 'kd-text-green'}>
                      {disc.isGhostFraud ? `+${disc.delta} Ghost` : '0 Deficit'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep-Dive Audit for Selected Center */}
        <div className="kd-column-stack">
          <div className="kd-selected-banner">
            <Building2 size={20} className="kd-text-blue" />
            <div>
              <strong>Auditing: {selectedCentre.name}</strong>
              <div className="kd-text-xs kd-text-muted">{selectedCentre.trade}</div>
            </div>
          </div>

          <AttendanceDiscrepancyCard centre={selectedCentre} />
          <InfraComplianceWidget centre={selectedCentre} />
          <SanctionedEquipList equipmentList={selectedCentre.sanctionedEquipment} />
        </div>
      </div>
    </div>
  );
}

export default AuditDashboard;
