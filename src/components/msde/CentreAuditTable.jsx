import React from 'react';
import { FileText, CheckCircle2 } from 'lucide-react';
import { calculateAttendanceDiscrepancy, calculateInfraCompliance } from '../../services/complianceRules';

/**
 * CentreAuditTable — Master MSDE Ministry Table with Automated Regulatory Actions
 */
function CentreAuditTable({ centres, onGenerateNotice }) {
  return (
    <div className="kd-card">
      <div className="kd-card-header kd-flex-between">
        <h3 className="kd-card-title">National Training Centre Compliance Ledger</h3>
        <span className="kd-badge badge-blue">Live DBT Shield Active</span>
      </div>

      <div className="kd-table-responsive">
        <table className="kd-table">
          <thead>
            <tr>
              <th>Centre ID & Name</th>
              <th>District / State</th>
              <th>Aadhaar Claim</th>
              <th>CCTV AI</th>
              <th>Ghost (Δ)</th>
              <th>Infra (C_infra)</th>
              <th>Grant Status</th>
              <th>Regulatory Action</th>
            </tr>
          </thead>
          <tbody>
            {centres.map((c) => {
              const disc = calculateAttendanceDiscrepancy(c.biometricClaimed, c.defaultAiDetected);
              const infra = calculateInfraCompliance(c.sanctionedEquipment);

              return (
                <tr key={c.id}>
                  <td>
                    <strong>{c.name}</strong>
                    <div className="kd-text-muted kd-text-xs">{c.id}</div>
                  </td>
                  <td>{c.district}, {c.state}</td>
                  <td><span className="kd-pill pill-blue">{c.biometricClaimed}</span></td>
                  <td><span className="kd-pill pill-purple">{c.defaultAiDetected}</span></td>
                  <td>
                    {disc.isGhostFraud ? (
                      <span className="kd-text-red kd-text-bold">+{disc.delta} Phantoms</span>
                    ) : (
                      <span className="kd-text-green">0 (Exact)</span>
                    )}
                  </td>
                  <td><strong>{infra.score}%</strong></td>
                  <td>
                    <span className={`kd-risk-tag ${
                      c.grantStatus === 'SUSPENDED' ? 'risk-critical' :
                      c.grantStatus === 'UNDER_AUDIT' || c.grantStatus === 'FLAGGED_FOR_INSPECTION' ? 'risk-high' : 'risk-low'
                    }`}>
                      {c.grantStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td>
                    {disc.isGhostFraud ? (
                      <button 
                        className="kd-btn kd-btn-xs kd-btn-danger"
                        onClick={() => onGenerateNotice(c)}
                      >
                        <FileText size={13} />
                        <span>Issue Notice</span>
                      </button>
                    ) : (
                      <span className="kd-text-green kd-text-xs kd-flex-align">
                        <CheckCircle2 size={14} />
                        <span>Auto-Approved</span>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CentreAuditTable;
