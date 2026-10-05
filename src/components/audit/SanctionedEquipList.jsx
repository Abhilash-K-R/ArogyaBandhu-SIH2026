import React from 'react';
import { Wrench, CheckCircle, XCircle } from 'lucide-react';

/**
 * SanctionedEquipList — Equipment checklist comparing required vs AI detected kits
 */
function SanctionedEquipList({ equipmentList }) {
  return (
    <div className="kd-card">
      <div className="kd-card-header kd-flex-between">
        <div className="kd-flex-align">
          <Wrench size={18} className="kd-text-blue" />
          <h3 className="kd-card-title">Sanctioned Lab Equipment Inventory Check</h3>
        </div>
        <span className="kd-badge badge-blue">YOLO Model v8-Infra</span>
      </div>

      <div className="kd-equip-list">
        {equipmentList.map((eq) => (
          <div key={eq.id} className="kd-equip-item">
            <div className="kd-flex-align">
              {eq.status === 'COMPLIANT' ? (
                <CheckCircle size={18} className="kd-text-green" />
              ) : (
                <XCircle size={18} className="kd-text-red" />
              )}
              <div className="kd-equip-details">
                <div className="kd-equip-name">{eq.name}</div>
                <div className="kd-equip-count">
                  Required: <strong>{eq.required}</strong> • Detected in Frame: <strong>{eq.detected}</strong>
                </div>
              </div>
            </div>

            <span className={`kd-badge ${eq.status === 'COMPLIANT' ? 'badge-green' : 'badge-red'}`}>
              {eq.status === 'COMPLIANT' ? '100% Verified' : 'DEFICIT ALERT'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SanctionedEquipList;
