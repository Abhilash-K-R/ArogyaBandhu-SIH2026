import React from 'react';
import { ShieldCheck, UserCheck, UserX } from 'lucide-react';
import { calculateInfraCompliance } from '../../services/complianceRules';

/**
 * InfraComplianceWidget — Displays total C_infra score and trainer presence verification
 */
function InfraComplianceWidget({ centre }) {
  const infra = calculateInfraCompliance(centre.sanctionedEquipment);

  return (
    <div className="kd-card">
      <div className="kd-card-header kd-flex-between">
        <div className="kd-flex-align">
          <ShieldCheck size={18} className="kd-text-green" />
          <h3 className="kd-card-title">Infrastructure & Safety Metric (C_infra)</h3>
        </div>
        <span className="kd-badge badge-green">{infra.score}% Active</span>
      </div>

      <div className="kd-progress-box">
        <div className="kd-flex-between kd-mb-1">
          <span className="kd-text-muted kd-text-xs">Overall Lab Readiness Score</span>
          <strong className="kd-text-green">{infra.score}%</strong>
        </div>
        <div className="kd-progress-bar">
          <div 
            className="kd-progress-fill" 
            style={{ 
              width: `${infra.score}%`,
              background: infra.score > 85 ? 'var(--kd-green)' : 'var(--kd-amber)'
            }}
          ></div>
        </div>
      </div>

      <div className="kd-trainer-status-box kd-mt-3">
        <div className="kd-flex-between">
          <div className="kd-flex-align">
            {centre.trainer?.present ? (
              <UserCheck size={20} className="kd-text-green" />
            ) : (
              <UserX size={20} className="kd-text-red" />
            )}
            <div>
              <div className="kd-text-bold">
                Certified Trainer: {centre.trainer?.name || 'Unassigned'}
              </div>
              <div className="kd-text-muted kd-text-xs">
                TOT ID: {centre.trainer?.certNumber || 'N/A'}
              </div>
            </div>
          </div>

          <span className={`kd-badge ${centre.trainer?.present ? 'badge-green' : 'badge-red'}`}>
            {centre.trainer?.present ? 'In-Bay Verified' : 'ABSENT'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default InfraComplianceWidget;
