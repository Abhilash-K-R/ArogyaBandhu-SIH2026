# 🏥 ArogyaBandhu (ಆರೋಗ್ಯ ಬಂಧು)
> **Smart India Hackathon 2026 | Problem Statement #133 | Theme: MedTech / BioTech / HealthTech**  
> **Team Name:** Elite Evolvers  
> **Agency:** Government of Maharashtra / National Health Mission (NHM)  
> **Pilot Region:** Tumakuru District, Karnataka  
> **Tech Stack:** React (Vite) + Lucide Icons + IndexedDB + Tailwind/CSS Tokens  

---

## 📌 Executive Summary

**ArogyaBandhu** is an **offline-first, bilingual (Kannada + English), AI-assisted tele-triage and referral coordination platform**. It is engineered to empower frontline healthcare workers (ASHAs and ANMs) in low-connectivity rural villages to detect high-risk clinical conditions at the patient's doorstep, generate cryptographic QR referral slips, and seamlessly connect with Primary Health Centre (PHC) Medical Officers and Taluk Health Officers (THO)—even in total internet blackout zones.

Unlike existing retrospective data-entry systems (such as RCH Portal or Poshan Tracker), ArogyaBandhu is a **point-of-care clinical decision support system (CDSS)** operating directly on client devices without mandatory cloud connectivity.

---

## 👥 Team Elite Evolvers & Module Ownership

| # | Team Member | Primary Role | Git Feature Branch | Owned Components / Modules |
|---|---|---|---|---|
| **1** | **Abhilash K R** *(Lead)* | Lead Integrator & Architecture | `main` & `lead/integration` | `App.jsx`, `Navbar.jsx`, `db.js`, `mockData.js`, Integration & Master State |
| **2** | **Anjandri T N** | Frontend Dev (ASHA Intake) | `feature/asha-triage-form` | `AshaPatientForm.jsx`, `VitalsInput.jsx`, ABHA ID Validation `[14]` |
| **3** | **Keerthana** | Clinical Logic & QR Systems | `feature/triage-engine-qr` | `triageEngine.js`, `TriageResultCard.jsx`, `QrSlipModal.jsx` `[3, 5]` |
| **4** | **Lakshmikanth** | Clinical UI & Teleconsultation | `feature/doctor-queue-tele` | `DoctorReferralQueue.jsx`, `TeleconsultModal.jsx` (WebRTC + HUD) `[1, 2]` |
| **5** | **Laxuman** | Emergency & Supply Chain | `feature/doctor-actions-sos` | `DoctorActionPanel.jsx`, `SosAmbulanceModal.jsx`, `DrugStockWidget.jsx` `[7, 8, 13]` |
| **6** | **Naveen** | District Analytics & I18N | `feature/tho-dashboard-i18n` | `ThoDistrictDashboard.jsx`, `TalukHeatmap.jsx`, `i18n.js` (Kannada Engine) `[9, 12]` |

---

## 🏗️ System Architecture & 3-Tier Portal Design

```
                                  ┌─────────────────────────────────────────┐
                                  │       AROGYABANDHU CLOUD GATEWAY        │
                                  │  (Sync Engine, ABHA FHIR Vault, Queue)  │
                                  └────────────────────┬────────────────────┘
                                                       │
                     ▲ (Batch Auto-Sync on 2G/Wi-Fi)   │ (Real-Time Websocket Push)
                     │                                 ▼
┌───────────────────────────────────────────┐    ┌───────────────────────────────────────────┐
│       PORTAL 1: ASHA FIELD APP            │    │      PORTAL 2: PHC DOCTOR PORTAL          │
│   (Mobile View • 100% Offline-First)      │    │      (Desktop Clinical Console)           │
├───────────────────────────────────────────┤    ├───────────────────────────────────────────┤
│ • Module A: Maternal ANC Triage           │    │ • Severity-Sorted Referral Queue (🔴🟡🟢)│
│ • Module B: Pediatric Malnutrition/SAM    │    │ • Assisted WebRTC Video/Audio Teleconsult │
│ • Module C: Chronic NCD & TB Screen       │    │ • Dynamic Appointment & e-Prescription    │
│ • Offline IndexedDB Encrypted Store       │    │ • 108 Arogya Kavacha Ambulance Dispatch   │
│ • Local Vector QR Slip Generator          │    │ • Real-Time Drug Inventory Monitor        │
│ • 1-Click Kannada ↔ English Toggle        │    │ • Longitudinal Patient Encounter History  │
└───────────────────────────────────────────┘    └─────────────────────┬─────────────────────┘
                                                                       │
                                                                       │ Aggregated Telemetry
                                                                       ▼
                                                 ┌───────────────────────────────────────────┐
                                                 │      PORTAL 3: THO DISTRICT DASHBOARD     │
                                                 │      (Administrative Analytics Console)   │
                                                 ├───────────────────────────────────────────┤
                                                 │ • Taluk-Wise Risk Heatmap (Tumakuru)      │
                                                 │ • Drug Stockout & Critical Level Alerts   │
                                                 │ • ASHA Triage & Referral Audit Metrics    │
                                                 │ • High-Risk Maternal Cluster Monitoring   │
                                                 └───────────────────────────────────────────┘
```

---

## 🎯 14 Official Problem Statement Features — Traceability Matrix

Every feature mandated by SIH 2026 Problem Statement 133 is indexed **[1] through [14]** and mapped to its exact architectural component:

| Feature Tag | PS Requirement Name | Core Responsibility & Implementation | Target Portal & Owner |
|---|---|---|---|
| **`[1]`** | **Assisted teleconsultation** | Bandwidth-adaptive WebRTC video/audio consult with real-time patient vitals HUD and in-call prescription. | PHC Doctor Portal *(Lakshmikanth)* |
| **`[2]`** | **Appointment & queue management** | Smart referral queue dynamically prioritized by clinical severity index (🔴 Red triage cases positioned at top). | PHC Doctor Portal *(Lakshmikanth)* |
| **`[3]`** | **Digital triage** | Rule-based deterministic clinical decision engine evaluating vital signs against WHO/NHM risk matrices. | ASHA Field App *(Keerthana)* |
| **`[4]`** | **Longitudinal patient records** | Chronological encounter timeline persisted across visits in local IndexedDB and cloud repository. | ASHA & Doctor Portals *(Abhilash)* |
| **`[5]`** | **Referral tracking** | Unique UUID-based QR referral slips with live state lifecycle (`REFERRED` ➔ `EN_ROUTE` ➔ `ATTENDED` ➔ `DISCHARGED`). | Cross-Portal *(Keerthana)* |
| **`[6]`** | **Diagnostic coordination** | Automated structured summary of red flags, vitals anomalies, and symptom history routed to the doctor. | PHC Doctor Portal *(Lakshmikanth / Laxuman)* |
| **`[7]`** | **Medicine availability** | Real-time tracking of essential drug stock (IFA tablets, ORS, Paracetamol, Amoxicillin) with low-stock alerts. | Doctor & THO Portals *(Laxuman)* |
| **`[8]`** | **High-risk patient follow-up** | Automated post-discharge reminder queue assigning targeted home visits back to the village ASHA worker. | PHC & ASHA Portals *(Laxuman)* |
| **`[9]`** | **Facility dashboards** | District epidemiological heatmap (Tumakuru taluks: Koratagere, Pavagada, Madhugiri, Gubbi) and workload KPIs. | THO District Dashboard *(Naveen)* |
| **`[10]`** | **Frontline worker support** | Low-cognitive-load, touch-optimized mobile interface designed for rapid entry on entry-level Android devices. | ASHA Field App *(Anjandri)* |
| **`[11]`** | **Low-connectivity environments** | 100% offline functionality using Service Workers, CacheStorage, IndexedDB, and asynchronous sync state machines. | ASHA Field App *(Abhilash)* |
| **`[12]`** | **Multilingual interaction** | Zero-latency bilingual UI toggle (**ಕನ್ನಡ ↔ English**) preserving clinical accuracy in local terminology. | All Portals *(Naveen)* |
| **`[13]`** | **Emergency escalation** | One-touch "108 Arogya Kavacha" ambulance dispatch protocol transmitting GPS coordinates and clinical summary. | ASHA & Doctor Portals *(Laxuman)* |
| **`[14]`** | **Interoperable health records** | Native 14-digit ABHA ID integration conforming to ABDM (Ayushman Bharat Digital Mission) FHIR data models. | Patient Data Layer *(Anjandri / Abhilash)* |

---

## 🩺 Clinical Triage Decision Logic Engine (`[3]`)

The triage engine operates client-side without relying on remote API calls. All calculations execute deterministically in `< 5ms`.

### 1. Module A: Maternal Health (Antenatal Care - ANC)
* **🔴 HIGH RISK (Immediate Referral):**
  * Systolic BP $\ge 160\text{ mmHg}$ OR Diastolic BP $\ge 100\text{ mmHg}$ *(Severe Pre-eclampsia)*
  * Hemoglobin $< 7.0\text{ g/dL}$ *(Severe Maternal Anaemia)*
  * Presence of vaginal bleeding OR convulsions OR absent fetal movement (>28 weeks).
  * Severe persistent headache accompanied by blurred vision and facial edema.
* **🟡 MEDIUM RISK (Scheduled PHC Visit):**
  * Systolic BP $140\text{--}159\text{ mmHg}$ OR Diastolic BP $90\text{--}99\text{ mmHg}$ *(Mild Pre-eclampsia)*
  * Hemoglobin $7.0\text{--}10.9\text{ g/dL}$ *(Moderate Anaemia)*
  * Moderate pedal edema or gestational age $> 40\text{ weeks}$.
* **🟢 LOW RISK (Routine Monitoring):**
  * Normotensive ($\text{BP} < 140/90$), $\text{Hb} \ge 11.0\text{ g/dL}$, normal fetal movement.

### 2. Module B: Child Health (0–5 Years / IMNCI Protocol)
* **🔴 HIGH RISK:**
  * MUAC (Mid-Upper Arm Circumference) in **RED zone** ($< 11.5\text{ cm}$) *(Severe Acute Malnutrition - SAM)*
  * Stridor / chest indrawing / respiratory rate $> 50\text{ bpm}$ *(Severe Pneumonia)*
  * Inability to breastfeed / lethargy / unconsciousness / persistent vomiting.
* **🟡 MEDIUM RISK:**
  * MUAC in **YELLOW zone** ($11.5\text{--}12.4\text{ cm}$) *(Moderate Acute Malnutrition - MAM)*
  * Fever lasting $> 5\text{ days}$ OR diarrhea without severe dehydration.
* **🟢 LOW RISK:**
  * MUAC in **GREEN zone** ($> 12.5\text{ cm}$), normal breathing, age-appropriate growth.

### 3. Module C: Chronic Diseases & Infections (Adults / Geriatric)
* **🔴 HIGH RISK:**
  * Random Blood Sugar (RBS) $> 350\text{ mg/dL}$ OR $< 60\text{ mg/dL}$ *(Hyperglycemic Crisis / Severe Hypoglycemia)*
  * Blood Pressure $\ge 180/110\text{ mmHg}$ *(Hypertensive Crisis)*
  * Hemoptysis (coughing blood) OR acute chest pain radiating to left arm.
* **🟡 MEDIUM RISK:**
  * Cough lasting $> 2\text{ weeks}$ with evening fever and night sweats *(Suspected Tuberculosis)*
  * Fasting Blood Sugar $140\text{--}250\text{ mg/dL}$, BP $140/90\text{--}179/109\text{ mmHg}$.
* **🟢 LOW RISK:**
  * Normal blood glucose and blood pressure parameters.

---

## 💾 Data Architecture & Schema Standards

### ABHA ID & Patient Schema (`[14]`, `[4]`)
```json
{
  "patientId": "PAT-KA-TUM-2026-0891",
  "abhaId": "91-4820-1123-8901",
  "demographics": {
    "name": "Lakshmi Bai",
    "nameLocal": "ಲಕ್ಷ್ಮೀ ಬಾಯಿ",
    "age": 24,
    "gender": "Female",
    "phone": "+91 98450 12345",
    "village": "Goravanahalli",
    "taluk": "Koratagere",
    "district": "Tumakuru",
    "ashaWorkerId": "ASHA-KA-104",
    "ashaName": "Shantha Devi"
  },
  "encounters": [
    {
      "encounterId": "ENC-2026-10-04-001",
      "timestamp": "2026-10-04T09:45:00Z",
      "module": "MATERNAL_ANC",
      "vitals": {
        "gestationalWeeks": 34,
        "bpSystolic": 162,
        "bpDiastolic": 104,
        "hemoglobin": 7.2,
        "facialEdema": true,
        "fetalMovement": "Reduced"
      },
      "triage": {
        "riskLevel": "RED",
        "redFlags": [
          "Severe Pre-eclampsia (BP 162/104 mmHg)",
          "Severe Maternal Anaemia (Hb 7.2 g/dL)",
          "Facial Edema with Headache"
        ],
        "suggestedAction": "Immediate referral to Koratagere PHC"
      },
      "referral": {
        "referralId": "REF-TUM-2026-0042",
        "assignedPhc": "Koratagere Taluk PHC",
        "status": "REFERRED",
        "sosDispatched": true,
        "qrPayload": "AROGYA:REF-TUM-2026-0042:PAT-KA-TUM-2026-0891:RED"
      },
      "syncState": "SYNCED"
    }
  ]
}
```

---

## 🔄 Offline Synchronization Protocol (`[11]`)

```
[ ASHA Device (Offline) ]
      │
      ├─ 1. Form submitted ➔ Saved to IndexedDB store ('encounters_queue')
      ├─ 2. Sync Status: 'PENDING_SYNC' (Visual Indicator: Amber Badge)
      │
[ Network Available Event (navigator.onLine = true) ]
      │
      ├─ 3. Background Sync Service activates
      ├─ 4. Reads all entries where syncState == 'PENDING_SYNC'
      ├─ 5. Batch POST to /api/sync/batch with idempotent Request-UUIDs
      ├─ 6. Server processes batch, verifies ABHA tokens, inserts to DB
      ├─ 7. Server responds with 200 OK + Synced IDs
      ├─ 8. Client updates IndexedDB records ➔ syncState = 'SYNCED'
      └─ 9. Visual Toast: "✅ Synced 3 records with Tumakuru Health Cloud"
```

---

## 📂 Project Repository Structure

```
e:\trail\hac\
│
├── index.html                   # HTML entrypoint with Noto Sans Kannada fonts
├── package.json                 # Dependencies: React 19, Lucide Icons, Vite
├── vite.config.js               # Fast hot-reloading dev server configuration
│
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Master state, portal switcher, network toggle
│   ├── index.css                # CSS variables, glassmorphism, responsive grid
│   │
│   ├── components/
│   │   ├── Navbar.jsx           # Global portal tabs, offline simulator, language toggle
│   │   │
│   │   ├── asha/                # PORTAL 1 (ASHA Field App)
│   │   │   ├── AshaPatientForm.jsx   # Registration, ABHA verification, module tabs
│   │   │   ├── VitalsInput.jsx       # Dynamic clinical vitals input (A/B/C)
│   │   │   ├── TriageResultCard.jsx  # 🔴🟡🟢 Risk results & recommendations
│   │   │   └── QrSlipModal.jsx       # Vector QR referral slip modal
│   │   │
│   │   ├── doctor/              # PORTAL 2 (PHC Doctor Portal)
│   │   │   ├── DoctorReferralQueue.jsx # Severity-sorted priority queue
│   │   │   ├── TeleconsultModal.jsx    # WebRTC video/audio consult + vitals HUD
│   │   │   ├── DoctorActionPanel.jsx   # e-Prescription, appointment & follow-up
│   │   │   ├── SosAmbulanceModal.jsx   # 108 Arogya Kavacha dispatch simulation
│   │   │   └── DrugStockWidget.jsx     # Essential medicine inventory tracker
│   │   │
│   │   └── tho/                 # PORTAL 3 (THO District Dashboard)
│   │       ├── ThoDistrictDashboard.jsx # District KPI metrics & supply audit
│   │       └── TalukHeatmap.jsx         # Geospatial risk intensity map (Tumakuru)
│   │
│   ├── data/
│   │   ├── i18n.js              # Complete English & Kannada translation dictionary
│   │   └── mockData.js          # Tumakuru realistic seed data
│   │
│   └── services/
│       ├── db.js                # IndexedDB offline transactional client
│       └── triageEngine.js      # Deterministic clinical rule evaluator
│
├── README.md                    # Project Master Documentation (this file)
├── PLAN.md                      # Senior SDE Technical Architecture & Algorithms
├── implement.md                 # Team Roster, Git Commands & AI Prompts
└── resour/
    ├── solution_plan.html       # Printable high-resolution documentation
    └── ArogyaBandhu_Solution_Plan.pdf # Exported vector PDF
```

---

## 🚀 Quickstart & Local Execution

### Prerequisites
* Node.js (v18+)
* npm (v9+)

### Installation & Launch
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Open browser at http://localhost:3000
```

---

## 🎬 3-Minute Live Hackathon Demo Script

| Elapsed | Portal Shown | Action Performed | Verified Features |
|---|---|---|:---:|
| **0:00 – 0:25** | ASHA Field App | Toggle offline mode (airplane mode indicator turns on). Show UI in full **ಕನ್ನಡ (Kannada)**. | `[11]` `[12]` `[10]` |
| **0:25 – 0:50** | ASHA Field App | Enter patient *Lakshmi Bai*, 34 weeks pregnant, BP 162/104, Hb 7.2. Click "Assess Risk". | `[3]` `[4]` `[14]` |
| **0:50 – 1:15** | ASHA Field App | 🔴 **RED HIGH RISK** alert appears. Click "Generate QR Referral Slip". Reconnect internet → Auto-sync animation fires. | `[3]` `[5]` `[11]` |
| **1:15 – 1:55** | PHC Doctor Portal | New referral arrives at the top of the prioritized queue. Click **[Tele-Consult]** to show video/audio triage window with vitals HUD. Click **[108 Ambulance SOS]**. | `[1]` `[2]` `[6]` `[13]` |
| **1:55 – 2:25** | PHC Doctor Portal | Review drug inventory monitor showing IFA tablet shortage. Schedule post-discharge follow-up task. | `[7]` `[8]` |
| **2:25 – 2:50** | THO Dashboard | Switch to District Admin view. Show Tumakuru taluk risk heatmap with high-risk red clusters. | `[9]` |
| **2:50 – 3:00** | Full App | Instant 1-click language flip to Kannada. Conclude demo. | `[12]` |

---

## 👥 Engineering & Hackathon Team

* **Team Name:** Elite Evolvers
* **Team Members:** Abhilash K R (Lead), Anjandri T N, Keerthana, Lakshmikanth, Laxuman, Naveen
* **Institution:** Tumakuru Institute of Technology, Karnataka
* **Event:** Smart India Hackathon 2026 — Ministry of Education / MoHFW / Govt of Maharashtra

---
*ArogyaBandhu — "Strengthening, Not Replacing, The Public Health System"*
