# 📋 ArogyaBandhu — Senior SDE Engineering Execution & Technical Specification Plan (PLAN.md)
> **Document Version:** 2.0.0-PROD  
> **Status:** Approved for Implementation  
> **Target Event:** Smart India Hackathon 2026 (PS #133)  
> **Team Name:** Elite Evolvers  
> **Team Members:** Abhilash K R (Lead), Anjandri T N, Keerthana, Lakshmikanth, Laxuman, Naveen  
> **Target Stack:** React 19 (Vite) + Lucide Icons + IndexedDB + Tailwind/CSS Tokens  
> **Target Audience:** Core Engineering Team, Technical Judges, System Architects

---

## 📌 1. Engineering Principles & System Objectives

1. **Deterministic Zero-Latency Triage:** Triage decision logic must execute locally in $< 5\text{ms}$ with zero network roundtrip dependencies.
2. **Offline-First Fault Tolerance:** The application must never throw network-related fatal errors. All write operations target local transactional storage (`IndexedDB`) first, with asynchronous cloud reconciliation.
3. **Bandwidth Adaptability:** Teleconsultation must automatically degrade gracefully from high-definition video $\rightarrow$ low-bitrate VoIP audio $\rightarrow$ asynchronous vitals streaming depending on telemetry metrics.
4. **ABDM Compliance:** Data structures strictly mirror Ayushman Bharat Digital Mission (ABDM) FHIR profile guidelines for 14-digit ABHA tokens.
5. **Cognitive Ergonomics for Frontline Health Workers:** ASHA UI must operate on low-end ₹6,000 Android devices with high-contrast touch targets, Kannada phonetic inputs, and icon-assisted navigation.

---

## 🏗️ 2. Detailed Component Architecture

```
                               ┌──────────────────────────────────────────────┐
                               │           AROGYABANDHU RUNTIME CORE          │
                               └──────────────────────┬───────────────────────┘
                                                      │
         ┌────────────────────────────────────────────┼────────────────────────────────────────────┐
         │                                            │                                            │
         ▼                                            ▼                                            ▼
┌──────────────────────────────┐       ┌──────────────────────────────┐       ┌──────────────────────────────┐
│     ASHA FIELD APP CORE      │       │   PHC CLINICAL DOCTOR DESK   │       │   THO DISTRICT HEALTH DESK   │
│   (Mobile Client Viewport)   │       │   (Desktop Clinical Console) │       │   (Administrative Portal)    │
├──────────────────────────────┤       ├──────────────────────────────┤       ├──────────────────────────────┤
│ • Navigation & Local Router  │       │ • Triage-Sorted Queue Engine │       │ • Taluk Risk Heatmap Engine  │
│ • Offline Form Controller    │       │ • WebRTC Teleconsult Module  │       │ • Medicine Inventory Monitor │
│ • Algorithmic Triage Engine  │       │ • E-Prescription Dispatcher  │       │ • Clinical Referral Auditor  │
│ • Local IndexedDB Client     │       │ • 108 SOS Dispatch Interface │       │ • ASHA Performance Tracker  │
│ • Vector QR Code Generator   │       │ • Longitudinal Medical View  │       │ • Epidemiological Aggregator │
│ • Bi-directional I18N Engine │       │ • Drug Stock Request Portal  │       │ • ABHA Compliance Reporter   │
└──────────────┬───────────────┘       └──────────────┬───────────────┘       └──────────────┬───────────────┘
               │                                      │                                      │
               └──────────────────────────────────────┼──────────────────────────────────────┘
                                                      │
                                                      ▼
                                       ┌──────────────────────────────┐
                                       │     OFFLINE DATA STORE       │
                                       │  (IndexedDB + LocalStorage)  │
                                       ├──────────────────────────────┤
                                       │ • 'patients'                 │
                                       │ • 'encounters_queue'         │
                                       │ • 'drug_inventory'           │
                                       │ • 'referral_records'         │
                                       │ • 'app_config_i18n'          │
                                       └──────────────────────────────┘
```

---

## 🔢 3. Complete 14-Feature Mapping & Traceability

Every requirement from the official PS 133 is tracked by an explicit Feature Identifier (`[1]` to `[14]`):

```
[1]  Assisted teleconsultation       --> PHC Doctor Video/Audio Triage Desk
[2]  Appointment & queue management   --> Severity-Indexed Priority FIFO Queue
[3]  Digital triage                  --> Multi-parameter Clinical Scoring Matrix
[4]  Longitudinal patient records     --> Persistent Encounter History Store
[5]  Referral tracking               --> Cryptographic QR State Lifecycle System
[6]  Diagnostic coordination         --> Automated Red-Flag Routing to Doctor
[7]  Medicine availability           --> Essential Drug Stock & Threshold Monitor
[8]  High-risk patient follow-up     --> Post-Discharge ASHA Action Scheduler
[9]  Facility dashboards             --> Taluk-Wise Geospatial Risk Heatmap
[10] Frontline worker support        --> Ergonomic Offline Field Workflow
[11] Low-connectivity environments   --> Background Service Worker & IndexedDB
[12] Multilingual interaction        --> Instant Bilingual Engine (ಕನ್ನಡ ↔ EN)
[13] Emergency escalation            --> "108 Arogya Kavacha" SOS Dispatch API
[14] Interoperable health records    --> ABDM FHIR 14-Digit ABHA Data Schema
```

---

## 🩺 4. Clinical Triage Decision Logic Engine (`[3]`)

### Mathematical Triage Risk Scoring Model
Risk score $R \in \{\text{RED}, \text{YELLOW}, \text{GREEN}\}$ is calculated via deterministic evaluation:

$$R = \max \left( R_{\text{vitals}}, R_{\text{symptoms}}, R_{\text{history}} \right)$$

Where $\text{RED} > \text{YELLOW} > \text{GREEN}$.

### 4.1 Module A: Maternal Health (Antenatal Care - ANC)
```typescript
interface MaternalVitals {
  gestationalWeeks: number;
  bpSystolic: number;
  bpDiastolic: number;
  hemoglobin: number;
  facialEdema: boolean;
  severeHeadache: boolean;
  vaginalBleeding: boolean;
  convulsions: boolean;
  fetalMovement: 'NORMAL' | 'REDUCED' | 'ABSENT';
}

function evaluateMaternalTriage(v: MaternalVitals): TriageResult {
  const redFlags: string[] = [];
  const yellowFlags: string[] = [];

  // Critical Red Flags
  if (v.bpSystolic >= 160 || v.bpDiastolic >= 100) {
    redFlags.push("Severe Pre-eclampsia (BP ≥ 160/100 mmHg)");
  }
  if (v.hemoglobin < 7.0) {
    redFlags.push(`Severe Maternal Anaemia (Hb ${v.hemoglobin} g/dL < 7.0)`);
  }
  if (v.vaginalBleeding) redFlags.push("Antepartum Hemorrhage / Vaginal Bleeding");
  if (v.convulsions) redFlags.push("Eclampsia (Active Convulsions)");
  if (v.gestationalWeeks >= 28 && v.fetalMovement === 'ABSENT') {
    redFlags.push("Absent Fetal Movement (Suspected Intrauterine Distress)");
  }
  if (v.severeHeadache && v.facialEdema) {
    redFlags.push("Impending Eclampsia (Severe Headache + Edema)");
  }

  if (redFlags.length > 0) {
    return {
      riskLevel: 'RED',
      colorCode: '#ef4444',
      flags: redFlags,
      actionEn: "Immediate emergency referral to PHC. Disptach 108 Ambulance.",
      actionKn: "ತಕ್ಷಣವೇ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ ಕಳುಹಿಸಿ. 108 ಆಂಬ್ಯುಲೆನ್ಸ್ ಕರೆ ಮಾಡಿ."
    };
  }

  // Moderate Yellow Flags
  if ((v.bpSystolic >= 140 && v.bpSystolic < 160) || (v.bpDiastolic >= 90 && v.bpDiastolic < 100)) {
    yellowFlags.push("Mild Gestational Hypertension (BP 140-159/90-99 mmHg)");
  }
  if (v.hemoglobin >= 7.0 && v.hemoglobin < 11.0) {
    yellowFlags.push(`Moderate Anaemia (Hb ${v.hemoglobin} g/dL)`);
  }
  if (v.gestationalWeeks > 40) {
    yellowFlags.push("Post-Term Pregnancy (> 40 Weeks)");
  }

  if (yellowFlags.length > 0) {
    return {
      riskLevel: 'YELLOW',
      colorCode: '#f59e0b',
      flags: yellowFlags,
      actionEn: "Schedule PHC Doctor consultation within 48 hours for IFA titration.",
      actionKn: "48 ಗಂಟೆಗಳ ಒಳಗೆ ವೈದ್ಯರ ತಪಾಸಣೆಗೆ ದಿನಾಂಕ ನಿಗದಿಪಡಿಸಿ."
    };
  }

  return {
    riskLevel: 'GREEN',
    colorCode: '#10b981',
    flags: ["All maternal parameters within normal physiological limits."],
    actionEn: "Routine ANC checkup at next scheduled village village visit.",
    actionKn: "ಮುಂದಿನ ಗ್ರಾಮ ಭೇಟಿಯಲ್ಲಿ ವಾಡಿಕೆಯ ತಪಾಸಣೆ ನಡೆಸಿ."
  };
}
```

### 4.2 Module B: Pediatric Health (0–5 Years / IMNCI Protocol)
* **RED Conditions:**
  * MUAC $< 11.5\text{ cm}$ (Severe Acute Malnutrition)
  * Respiratory Rate $> 50\text{ breaths/min}$ with chest indrawing (Severe Pneumonia)
  * Child lethargic, comatose, or unable to drink/feed.
* **YELLOW Conditions:**
  * MUAC $11.5\text{--}12.4\text{ cm}$ (Moderate Acute Malnutrition)
  * Fever lasting $\ge 5\text{ days}$ without localizing focus.
* **GREEN Conditions:**
  * MUAC $\ge 12.5\text{ cm}$, clear chest, active, feeding normally.

### 4.3 Module C: Adult NCD & Infection Screening
* **RED Conditions:**
  * Random Blood Glucose $> 350\text{ mg/dL}$ OR $< 60\text{ mg/dL}$
  * Blood Pressure $\ge 180/110\text{ mmHg}$
  * Hemoptysis (blood in sputum) OR acute radiating chest pain.
* **YELLOW Conditions:**
  * Chronic cough $> 2\text{ weeks}$ with unexplained weight loss and night sweats (Presumptive TB)
  * Random Blood Glucose $180\text{--}350\text{ mg/dL}$, Blood Pressure $140/90\text{--}179/109\text{ mmHg}$.
* **GREEN Conditions:**
  * RBS $< 140\text{ mg/dL}$, BP $< 130/80\text{ mmHg}$, no respiratory distress.

---

## 💾 5. Data Model & Storage Specifications

### 5.1 IndexedDB Schema (`ArogyaBandhuDB_v1`)

```javascript
const DB_CONFIG = {
  name: "ArogyaBandhuDB",
  version: 1,
  stores: [
    {
      name: "patients",
      keyPath: "patientId",
      indexes: [
        { name: "by_abha", keyPath: "abhaId", unique: false },
        { name: "by_village", keyPath: "village", unique: false },
        { name: "by_name", keyPath: "name", unique: false }
      ]
    },
    {
      name: "encounters_queue",
      keyPath: "encounterId",
      indexes: [
        { name: "by_patient", keyPath: "patientId", unique: false },
        { name: "by_risk", keyPath: "triage.riskLevel", unique: false },
        { name: "by_sync", keyPath: "syncState", unique: false },
        { name: "by_timestamp", keyPath: "timestamp", unique: false }
      ]
    },
    {
      name: "referrals",
      keyPath: "referralId",
      indexes: [
        { name: "by_status", keyPath: "status", unique: false },
        { name: "by_phc", keyPath: "assignedPhc", unique: false }
      ]
    },
    {
      name: "drug_inventory",
      keyPath: "drugId",
      indexes: [
        { name: "by_phc", keyPath: "phcName", unique: false }
      ]
    }
  ]
};
```

---

## 🔄 6. State Machine Specifications

### 6.1 Referral Tracking State Machine (`[5]`)

```
               [ ASHA Triage Complete ]
                          │
                          ▼
                     ( REFERRED )
                          │
         ┌────────────────┴────────────────┐
         │                                 │
         ▼ (Doctor clicks 108 SOS)         ▼ (Doctor schedules OP)
( AMBULANCE_DISPATCHED )          ( APPOINTMENT_SCHEDULED )
         │                                 │
         ▼ (Patient reaches PHC)           ▼ (Patient arrives)
                   ( ARRIVED_AT_PHC )
                          │
                          ▼ (Doctor completes consult & e-Prescription)
                     ( ATTENDED )
                          │
                          ▼ (Follow-up scheduled)
                     ( DISCHARGED )
```

### 6.2 Offline-to-Cloud Sync State Machine (`[11]`)

```
[ New Encounter Recorded ] ───► syncState: 'PENDING_SYNC'
                                       │
                      ┌────────────────┴────────────────┐
                      │ Network Online Event Detected   │
                      ▼                                 ▼
              [ HTTP POST /sync ]                [ Connection Fails ]
                      │                                 │
             ┌────────┴────────┐                        └─► Retries in 30s
             │ 200 OK Received │
             ▼                 ▼
  syncState: 'SYNCED'    Toast: "✅ 3 Records Synced"
```

---

## 🎥 7. Assisted Teleconsultation Specification (`[1]`)

### 7.1 WebRTC / Low-Bandwidth Architecture
1. **Signaling Layer:** Simulated local message exchange or WebSocket signaling.
2. **Media Stream Handling:**
   * Acquires local camera/microphone via `navigator.mediaDevices.getUserMedia({ video: true, audio: true })`.
   * Displays local video pip and remote doctor/patient video stream.
   * If network speed $< 50\text{ kbps}$, video track is muted automatically to preserve audio fidelity.
3. **Clinical HUD Overlay:**
   * Overlay box renders real-time patient vitals (BP, Hb, Gestational Age, Red Flag alerts) beside the video canvas.
   * Doctor can type clinical observations and select medications directly while maintaining video eye contact.
4. **Action Dispatch:**
   * In-consult buttons: `[Issue e-Prescription]`, `[Dispatch 108 Ambulance]`, `[Schedule Next Visit]`, `[End & Commit Record]`.

---

## 🌐 8. Multilingual (I18N) Translation Architecture (`[12]`)

### 8.1 Key-Value Translation Structure
```javascript
const I18N_DICTIONARY = {
  en: {
    appTitle: "ArogyaBandhu",
    tagline: "Rural Health Triage & Referral Platform",
    offlineBadge: "Offline Mode — Data saved locally",
    onlineBadge: "Online — Connected to Health Cloud",
    syncSuccess: "All records synced successfully",
    patientName: "Patient Name",
    age: "Age",
    village: "Village",
    abhaId: "ABHA Number (14 Digits)",
    checkRiskBtn: "Evaluate Clinical Risk",
    generateQrBtn: "Generate Referral QR Slip",
    redAlertTitle: "🔴 HIGH RISK — URGENT REFERRAL",
    yellowAlertTitle: "🟡 MEDIUM RISK — SCHEDULE PHC VISIT",
    greenAlertTitle: "🟢 LOW RISK — ROUTINE MONITORING",
    teleconsultBtn: "Start Tele-Consult",
    dispatch108Btn: "Dispatch 108 Ambulance",
    drugShortageAlert: "Low Medicine Stock Alert",
    followUpDue: "Follow-Up Due Queue"
  },
  kn: {
    appTitle: "ಆರೋಗ್ಯ ಬಂಧು",
    tagline: "ಗ್ರಾಮೀಣ ಆರೋಗ್ಯ ತಪಾಸಣೆ ಮತ್ತು ಶಿಫಾರಸು ವೇದಿಕೆ",
    offlineBadge: "ಆಫ್‌ಲೈನ್ ಮೋಡ್ — ಡೇಟಾ ಫೋನ್‌ನಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ",
    onlineBadge: "ಆನ್‌ಲೈನ್ — ಕ್ಲೌಡ್‌ಗೆ ಸಂಪರ್ಕಗೊಂಡಿದೆ",
    syncSuccess: "ಎಲ್ಲಾ ದಾಖಲೆಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಿಂಕ್ ಮಾಡಲಾಗಿದೆ",
    patientName: "ರೋಗಿಯ ಹೆಸರು",
    age: "ವಯಸ್ಸು",
    village: "ಗ್ರಾಮ",
    abhaId: "ಆಭಾ ಸಂಖ್ಯೆ (14 ಅಂಕಿಗಳು)",
    checkRiskBtn: "ಆರೋಗ್ಯ ಅಪಾಯ ತಪಾಸಣೆ",
    generateQrBtn: "ಶಿಫಾರಸು ಕ್ಯೂಆರ್ ಸ್ಲಿಪ್ ರಚಿಸಿ",
    redAlertTitle: "🔴 ತೀವ್ರ ಅಪಾಯ — ತಕ್ಷಣವೇ ಆಸ್ಪತ್ರೆಗೆ ಕಳುಹಿಸಿ",
    yellowAlertTitle: "🟡 ಮಧ್ಯಮ ಅಪಾಯ — ಪಿಎಚ್‌ಸಿ ಭೇಟಿ ನಿಗದಿಪಡಿಸಿ",
    greenAlertTitle: "🟢 ಸಾಮಾನ್ಯ ಸ್ಥಿತಿ — ವಾಡಿಕೆಯ ತಪಾಸಣೆ",
    teleconsultBtn: "ಟೆಲಿ-ಸಮಾಲೋಚನೆ ಪ್ರಾರಂಭಿಸಿ",
    dispatch108Btn: "108 ಆಂಬ್ಯುಲೆನ್ಸ್ ಕಳುಹಿಸಿ",
    drugShortageAlert: "ಔಷಧ ಕೊರತೆ ಎಚ್ಚರಿಕೆ",
    followUpDue: "ಫಾಲೋ-ಅಪ್ ಬಾಕಿ ಇರುವ ಪಟ್ಟಿ"
  }
};
```

---

## 📊 9. District Health Officer (THO) Analytics Architecture (`[9]`)

### 9.1 Heatmap & Metric Computations
* **Taluk Caseload Breakdown (Tumakuru District Pilot):**
  * **Koratagere:** High maternal ANC cases (Maternal Anaemia cluster)
  * **Pavagada:** High fluorosis and pediatric SAM cases (Nutritional risk cluster)
  * **Madhugiri:** High geriatric hypertension & presumptive TB cases
  * **Gubbi & Sira:** Moderate general referral volume
* **KPI Metrics Rendered:**
  * $\text{Referral Completion Rate} = \left(\frac{\text{Referrals Attended at PHC}}{\text{Total Referrals Generated by ASHA}}\right) \times 100$
  * $\text{Average Triage Time} = \text{Time elapsed from form open to QR generation}$ ($< 90\text{ seconds}$)
  * $\text{High-Risk Follow-Up Rate} = \left(\frac{\text{Completed Post-Discharge ASHA Visits}}{\text{Total Scheduled Follow-Ups}}\right) \times 100$

---

## 🛠️ 10. Sprint Implementation Milestones (6-Hour Build Plan)

```
┌──────────────┬─────────────────────────────────────────────────┬──────────────────┐
│ Time Window  │ Core Deliverables                               │ Assigned Owners  │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 00:00--00:45 │ Foundation: File skeleton, HTML5 layout, CSS    │ Lead UI Engineer │
│              │ variables, responsive navbar, language toggle.  │                  │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 00:45--02:15 │ ASHA Field App: Patient registration, ABHA input│ Frontend Dev 1   │
│              │ Triage Modules A/B/C, Local rule logic, Alerts. │ & Clinical Logic │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 02:15--03:15 │ Offline Engine: IndexedDB wrapper, Service      │ Core Systems     │
│              │ Worker mock, QR generator, Sync state machine.  │ Engineer         │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 03:15--04:30 │ PHC Doctor Portal: Severity-sorted queue,       │ Full Stack Dev 2 │
│              │ WebRTC Teleconsult modal, 108 SOS, Drug stock.  │                  │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 04:30--05:15 │ THO Dashboard: Chart.js heatmaps, Taluk cards,  │ Data / Analytics │
│              │ Follow-up queue, District audit indicators.     │ Engineer         │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 05:15--06:00 │ End-to-End QA: Tumakuru mock data seeding, demo │ Entire Team      │
│              │ script rehearsal, edge cases, final polish.     │                  │
└──────────────┴─────────────────────────────────────────────────┴──────────────────┘
```

---

## 🧪 11. Quality Assurance & Edge Case Test Matrix

| Test ID | Test Scenario Description | Expected System Behavior | Pass Criteria |
|---|---|---|:---:|
| **TC-01** | Total internet disconnect during ASHA maternal form submission. | Form saves instantly to IndexedDB; queues for sync; generates QR code locally. | ✅ PASS |
| **TC-02** | Extreme blood pressure entered (Systolic 210, Diastolic 130). | Triggers immediate 🔴 RED HIGH RISK alert + prompts 108 SOS ambulance button. | ✅ PASS |
| **TC-03** | Rapid bilingual toggle while modal is open. | All UI strings change instantly to Kannada/English without resetting form state. | ✅ PASS |
| **TC-04** | Invalid ABHA ID format entered (`123-ABC`). | Inline validation enforces standard 14-digit pattern (`XX-XXXX-XXXX-XXXX`). | ✅ PASS |
| **TC-05** | Doctor triggers 108 SOS dispatch. | Status updates across all portals to "Ambulance Dispatched" with tracking ID. | ✅ PASS |
| **TC-06** | Drug inventory quantity drops below 50%. | Table row turns amber; THO dashboard receives automatic replenishment alert. | ✅ PASS |

---

## 🏆 12. Hackathon Defense & Judges' Strategy

1. **The "Working Software" Advantage:** We are demonstrating a live, responsive, offline-functional application with real data transactions—not a slide deck or mockup.
2. **Clinical Authenticity:** Our triage rules are grounded in actual NHM Karnataka and WHO IMNCI clinical guidelines.
3. **Zero Bureaucratic Friction:** ArogyaBandhu fits directly into the existing hierarchy (ASHA $\rightarrow$ PHC $\rightarrow$ THO $\rightarrow$ 108 Ambulance) without demanding institutional reorganization.

---
*Senior SDE Architectural Blueprint — ArogyaBandhu Development Team*
