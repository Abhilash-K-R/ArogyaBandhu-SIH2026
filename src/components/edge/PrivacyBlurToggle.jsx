import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

/**
 * PrivacyBlurToggle — Toggles DPDP Act 2023 Face Masking
 */
function PrivacyBlurToggle({ isPrivacyOn, setIsPrivacyOn }) {
  return (
    <div className="kd-privacy-widget">
      <button 
        className={`kd-btn ${isPrivacyOn ? 'kd-btn-success' : 'kd-btn-secondary'}`}
        onClick={() => setIsPrivacyOn(!isPrivacyOn)}
      >
        {isPrivacyOn ? (
          <>
            <ShieldCheck size={18} />
            <span>🛡️ DPDP Privacy Mask: ON</span>
          </>
        ) : (
          <>
            <ShieldAlert size={18} />
            <span>🔓 Privacy Mask: OFF (Raw)</span>
          </>
        )}
      </button>
      <span className="kd-text-muted kd-text-xs">
        {isPrivacyOn 
          ? 'Compliant with Section 8, DPDP Act 2023 (Local anonymization before packet transmission).'
          : '⚠️ Warning: Unmasked camera stream active (Inspection mode only).'}
      </span>
    </div>
  );
}

export default PrivacyBlurToggle;
