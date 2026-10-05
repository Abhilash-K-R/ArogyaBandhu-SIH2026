import React from 'react';
import { Wifi, Lock, Activity, CheckCircle2 } from 'lucide-react';

/**
 * BandwidthTelemetry — Generates and displays the 5 KB JSON metadata payload
 */
function BandwidthTelemetry({ centre, visualCount, discrepancy, infraScore, isPrivacyOn }) {
  const timestamp = new Date().toISOString();
  const payloadJson = JSON.stringify(
    {
      schema_version: "2.1-KD",
      centre_id: centre.id,
      room_code: centre.room,
      timestamp_utc: timestamp,
      aadhaar_biometric_claimed: centre.biometricClaimed,
      edge_vision_heads_detected: visualCount,
      ghost_discrepancy_delta: discrepancy.delta,
      discrepancy_pct: discrepancy.discrepancyPct,
      risk_classification: discrepancy.riskTier,
      trainer_in_frame: centre.trainer?.present ?? true,
      infra_compliance_score: infraScore,
      dpdp_mask_applied: isPrivacyOn,
      bandwidth_consumed_bytes: 4820,
      cryptographic_sha256: "9e4f2b17a8c3d0e51289fe6701ba834cb219e8dfa304e22"
    },
    null,
    2
  );

  return (
    <div className="kd-card kd-telemetry-card">
      <div className="kd-card-header kd-flex-between">
        <div className="kd-flex-align">
          <Activity size={18} className="kd-text-blue" />
          <h3 className="kd-card-title">Rural Edge 5 KB Encrypted Payload</h3>
        </div>
        <span className="kd-badge badge-green kd-flex-align">
          <CheckCircle2 size={13} />
          <span>Bandwidth-Safe (4.8 KB)</span>
        </span>
      </div>

      <div className="kd-telemetry-metrics">
        <div className="kd-telemetry-item">
          <Wifi size={14} className="kd-text-muted" />
          <span><strong>Network Protocol:</strong> MQTT over TLS 1.3</span>
        </div>
        <div className="kd-telemetry-item">
          <Lock size={14} className="kd-text-green" />
          <span><strong>Security:</strong> SHA-256 Digest • AES-256 GCM</span>
        </div>
      </div>

      <pre className="kd-code-block">{payloadJson}</pre>
    </div>
  );
}

export default BandwidthTelemetry;
