import React from 'react';
import { AlertOctagon } from 'lucide-react';
import { calculateAttendanceDiscrepancy } from '../../services/complianceRules';

/**
 * AttendanceDiscrepancyCard — Mathematical breakdown of Biometric vs Computer Vision Count
 */
function AttendanceDiscrepancyCard({ centre }) {
  const discrepancy = calculateAttendanceDiscrepancy(centre.biometricClaimed, centre.defaultAiDetected);

  return (
    <div className={`kd-card ${discrepancy.riskTier === 'CRITICAL' ? 'kd-card-danger-border' : ''}`}>
      <div className="kd-card-header kd-flex-between">
        <div className="kd-flex-align">
          <AlertOctagon size={20} className={discrepancy.isGhostFraud ? 'kd-text-red' : 'kd-text-green'} />
          <h3 className="kd-card-title">Attendance Discrepancy Audit (D_att)</h3>
        </div>
        <span className={`kd-badge ${
          discrepancy.riskTier === 'CRITICAL' ? 'badge-red' :
          discrepancy.riskTier === 'HIGH' ? 'badge-amber' :
          discrepancy.riskTier === 'MEDIUM' ? 'badge-blue' : 'badge-green'
        }`}>
          {discrepancy.riskTier} RISK
        </span>
      </div>

      <div className="kd-discrepancy-formula-box">
        <div className="kd-formula-label">Mathematical Verification Formula:</div>
        <div className="kd-formula-text">
          D_att = (|{centre.biometricClaimed} [Portal] - {centre.defaultAiDetected} [CCTV]| / {centre.biometricClaimed}) × 100% = <strong>{discrepancy.discrepancyPct}%</strong>
        </div>
      </div>

      <div className="kd-grid-3col kd-mt-3">
        <div className="kd-mini-stat">
          <div className="kd-mini-label">Aadhaar Claimed</div>
          <div className="kd-mini-val text-blue">{centre.biometricClaimed} Trainees</div>
        </div>
        <div className="kd-mini-stat">
          <div className="kd-mini-label">CCTV Visual Headcount</div>
          <div className="kd-mini-val text-purple">{centre.defaultAiDetected} Trainees</div>
        </div>
        <div className="kd-mini-stat">
          <div className="kd-mini-label">Ghost Trainee Deficit</div>
          <div className="kd-mini-val text-red">+{discrepancy.delta} Phantoms</div>
        </div>
      </div>
    </div>
  );
}

export default AttendanceDiscrepancyCard;
