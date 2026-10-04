import React from 'react';
import { MapPin, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';
import { NATIONAL_MSDE_STATS } from '../../data/centerMockData';

/**
 * MsdeDistrictDashboard — State & District-wise compliance analytics
 */
function MsdeDistrictDashboard() {
  const districtCompliance = [
    { district: "Bengaluru Urban", compliance: "94.2%", centres: 420, flagged: 18, color: "var(--kd-green)" },
    { district: "Mysuru", compliance: "96.8%", centres: 180, flagged: 4, color: "var(--kd-green)" },
    { district: "Dharwad / Hubballi", compliance: "78.4%", centres: 140, flagged: 32, color: "var(--kd-red)" },
    { district: "Kalaburagi", compliance: "91.0%", centres: 110, flagged: 8, color: "var(--kd-green)" },
    { district: "Dakshina Kannada", compliance: "86.5%", centres: 95, flagged: 12, color: "var(--kd-amber)" }
  ];

  return (
    <div className="kd-grid-3col kd-mb-4">
      {/* 1. National Overview */}
      <div className="kd-card">
        <div className="kd-card-header kd-flex-between">
          <h3 className="kd-card-title">National PMKVY Verification</h3>
          <span className="kd-badge badge-green">92.4% Match</span>
        </div>

        <div className="kd-stat-box-inner kd-mb-3">
          <div className="kd-stat-label">Total Public Grants Protected</div>
          <div className="kd-stat-value text-purple">{NATIONAL_MSDE_STATS.disbursementSavedCr}</div>
          <div className="kd-stat-desc">Fraudulent claims withheld via Edge AI</div>
        </div>

        <div className="kd-stat-box-inner">
          <div className="kd-stat-label">Total Ghost Trainees Detected</div>
          <div className="kd-stat-value text-red">{NATIONAL_MSDE_STATS.ghostTraineesDetected.toLocaleString()}</div>
          <div className="kd-stat-desc">Aadhaar biometric spoof attempts</div>
        </div>
      </div>

      {/* 2. District Heatmap Index */}
      <div className="kd-card">
        <div className="kd-card-header kd-flex-between">
          <h3 className="kd-card-title">Karnataka District Compliance</h3>
          <span className="kd-badge badge-blue">5 Key Hubs</span>
        </div>

        <div className="kd-district-list">
          {districtCompliance.map((d) => (
            <div key={d.district} className="kd-district-item">
              <div className="kd-flex-between">
                <span className="kd-text-bold">{d.district}</span>
                <span style={{ color: d.color }} className="kd-text-bold">{d.compliance}</span>
              </div>
              <div className="kd-progress-bar kd-mt-1">
                <div 
                  className="kd-progress-fill" 
                  style={{ width: d.compliance, background: d.color }}
                ></div>
              </div>
              <div className="kd-flex-between kd-text-xs kd-text-muted kd-mt-1">
                <span>{d.centres} Centres Active</span>
                <span className={d.flagged > 15 ? 'kd-text-red' : ''}>{d.flagged} Flagged for Audit</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. DBT Grant Disbursement Engine */}
      <div className="kd-card">
        <div className="kd-card-header kd-flex-between">
          <h3 className="kd-card-title">Direct Benefit Transfer (DBT) Shield</h3>
          <span className="kd-badge badge-green">Smart Auto-Disburse</span>
        </div>

        <div className="kd-dbt-checklist">
          <div className="kd-dbt-item">
            <ShieldCheck size={18} className="kd-text-green" />
            <div>
              <strong>Rule 1: Zero Ghost Tolerance (D_att ≤ 5%)</strong>
              <div className="kd-text-xs kd-text-muted">Centers exceeding 5% discrepancy are locked automatically.</div>
            </div>
          </div>

          <div className="kd-dbt-item">
            <ShieldCheck size={18} className="kd-text-green" />
            <div>
              <strong>Rule 2: Lab Infrastructure Baseline (C_infra ≥ 80%)</strong>
              <div className="kd-text-xs kd-text-muted">Mandatory tooling must be present in visual bay.</div>
            </div>
          </div>

          <div className="kd-dbt-item">
            <ShieldCheck size={18} className="kd-text-green" />
            <div>
              <strong>Rule 3: DPDP Act Anonymized Audit Trail</strong>
              <div className="kd-text-xs kd-text-muted">SHA-256 integrity logs verifiable by CAG auditors.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MsdeDistrictDashboard;
