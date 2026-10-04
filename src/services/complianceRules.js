/**
 * KausalyaDrishti — Core Compliance & Mathematical Evaluation Service
 * Evaluates attendance discrepancy, infrastructure deficit, and MSDE risk tier.
 */

/**
 * Calculates Attendance Discrepancy Percentage (D_att)
 * D_att = (|N_claimed - N_detected| / N_claimed) * 100
 */
export function calculateAttendanceDiscrepancy(biometricClaimed, aiDetected) {
  if (!biometricClaimed || biometricClaimed <= 0) return { delta: 0, discrepancyPct: 0, riskTier: 'LOW' };
  
  const delta = Math.max(0, biometricClaimed - aiDetected);
  const discrepancyPct = ((delta / biometricClaimed) * 100).toFixed(1);

  let riskTier = 'LOW';
  if (discrepancyPct > 20 || delta >= 10) {
    riskTier = 'CRITICAL';
  } else if (discrepancyPct > 10 || delta >= 5) {
    riskTier = 'HIGH';
  } else if (discrepancyPct > 4 || delta >= 2) {
    riskTier = 'MEDIUM';
  }

  return {
    delta,
    discrepancyPct: parseFloat(discrepancyPct),
    riskTier,
    isGhostFraud: delta > 0
  };
}

/**
 * Calculates Infrastructure Compliance Percentage (C_infra)
 */
export function calculateInfraCompliance(equipmentList = []) {
  if (!equipmentList.length) return { score: 100, compliantCount: 0, totalItems: 0, status: 'OPTIMAL' };

  let totalRequired = 0;
  let totalDetected = 0;

  equipmentList.forEach(eq => {
    totalRequired += eq.required || 1;
    totalDetected += Math.min(eq.detected || 0, eq.required || 1);
  });

  const score = totalRequired > 0 ? Math.round((totalDetected / totalRequired) * 100) : 100;
  let status = 'OPTIMAL';
  if (score < 75) status = 'CRITICAL_DEFICIT';
  else if (score < 90) status = 'MODERATE_DEFICIT';

  return {
    score,
    compliantCount: equipmentList.filter(e => e.status === 'COMPLIANT').length,
    totalItems: equipmentList.length,
    status
  };
}

/**
 * Generates an official MSDE / NSDC Show-Cause Notice letter text
 */
export function generateShowCauseNotice(centre, discrepancy, infra) {
  const dateStr = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  return `
================================================================================
GOVERNMENT OF INDIA
MINISTRY OF SKILL DEVELOPMENT & ENTREPRENEURSHIP (MSDE)
NATIONAL SKILL DEVELOPMENT CORPORATION (NSDC)
NEW DELHI — 110001
================================================================================
NOTICE REF: MSDE/KD/AUDIT/2026/${centre.id}
DATE: ${dateStr}

TO:
The Center In-Charge / Principal,
${centre.name} (${centre.id})
${centre.district}, ${centre.state}

SUBJECT: SHOW-CAUSE NOTICE FOR ATTENDANCE DISCREPANCY & INFRASTRUCTURE DEFICIT

Sir/Madam,

This is an automated regulatory notice issued under the National PMKVY Real-Time
Monitoring & Anti-Fraud Protocol (KausalyaDrishti AI Framework).

1. ATTENDANCE FRAUD AUDIT:
   - Aadhaar Biometric Attendance Claimed: ${centre.biometricClaimed} Trainees
   - Edge Computer Vision Verified Count: ${discrepancy.aiDetected || (centre.biometricClaimed - discrepancy.delta)} Trainees
   - Unaccounted / Ghost Trainees (Δ): ${discrepancy.delta} Trainees (${discrepancy.discrepancyPct}%)
   - Assigned Risk Classification: ${discrepancy.riskTier}

2. INFRASTRUCTURE & FACILITY COMPLIANCE:
   - Mandatory Equipment Compliance Score: ${infra.score}% (${infra.status})
   - Trainer In-Frame Verification: ${centre.trainer?.present ? 'VERIFIED' : 'ABSENT / NOT IN FRAME'}

3. REGULATORY ACTION TRIGGERED:
   In accordance with MSDE Scheme Guidelines, disbursement of training grant
   amounting to INR ${(centre.grantAmount / 100000).toFixed(2)} Lakhs has been
   placed under TEMPORARY SUSPENSION.

You are hereby directed to submit a written explanation along with unedited CCTV
footage records within SEVEN (7) working days, failing which accreditation for
Scheme Trade "${centre.trade}" shall be revoked.

BY ORDER OF THE COMPETENT AUTHORITY,
Director General of Training (DGT), MSDE, New Delhi.
================================================================================
`.trim();
}
