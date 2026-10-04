# 🚀 ArogyaBandhu — Team Implementation Master Plan (`implement.md`)
> **Team Name:** Elite Evolvers  
> **Event:** Smart India Hackathon 2026 | Problem Statement #133  
> **Project:** ArogyaBandhu (ಆರೋಗ್ಯ ಬಂಧು) — Offline-First AI Tele-Triage & Referral Platform  
> **Tech Stack:** React (Vite) + Lucide Icons + IndexedDB + Tailwind/CSS Tokens  
> **Execution Duration:** 6-Hour Parallel Sprint  
> **Lead Architect & Integrator:** Abhilash K R

---

## 👥 1. Team Roster & Module Ownership Matrix

To prevent merge conflicts and dependency blocking, the project is divided into **6 isolated modules**. Each team member owns **specific files and branches**.

| # | Team Member | Git Branch Name | Assigned Module / Component Files | Core Responsibility |
|---|---|---|---|---|
| **1** | **Abhilash K R** *(Lead)* | `main` & `lead/integration` | `src/App.jsx`, `src/components/Navbar.jsx`, `src/services/db.js`, `src/data/mockData.js`, Integration & Merge | System Architecture, Base Setup, State Orchestration, Git Master Merge & Final QA |
| **2** | **Anjandri T N** | `feature/asha-triage-form` | `src/components/asha/AshaPatientForm.jsx`, `src/components/asha/VitalsInput.jsx` | Patient Registration, ABHA ID Validation `[14]`, Vitals Input UI for Modules A/B/C `[10]` |
| **3** | **Keerthana** | `feature/triage-engine-qr` | `src/services/triageEngine.js`, `src/components/asha/TriageResultCard.jsx`, `src/components/asha/QrSlipModal.jsx` | Deterministic Triage Logic `[3]`, Color-Coded Risk Display (🔴🟡🟢), Local Vector QR Generator `[5]` |
| **4** | **Lakshmikanth** | `feature/doctor-queue-tele` | `src/components/doctor/DoctorReferralQueue.jsx`, `src/components/doctor/TeleconsultModal.jsx` | Severity-Sorted Referral Queue `[2]`, WebRTC Video/Audio Teleconsult Modal with Vitals HUD `[1]` |
| **5** | **Laxuman** | `feature/doctor-actions-sos` | `src/components/doctor/DoctorActionPanel.jsx`, `src/components/doctor/SosAmbulanceModal.jsx`, `src/components/doctor/DrugStockWidget.jsx` | 108 Arogya Kavacha SOS Dispatch `[13]`, e-Prescription & Follow-up Scheduler `[8]`, Drug Inventory Monitor `[7]` |
| **6** | **Naveen** | `feature/tho-dashboard-i18n` | `src/components/tho/ThoDistrictDashboard.jsx`, `src/components/tho/TalukHeatmap.jsx`, `src/data/i18n.js` | Taluk Risk Heatmap `[9]`, District Health Analytics, Full Kannada ↔ English Bilingual Dictionary `[12]` |

---

## 📐 2. Contract-First Interface Specification (Zero Merge Conflict Guarantee)

Every member must write code strictly adhering to these **Component Props & Data Contracts**. If everyone uses these exact property names, the final integration will compile with **0 errors**.

```
                                      ┌─────────────────────────────────┐
                                      │         src/App.jsx             │
                                      │  (Master State & Active Portal) │
                                      └────────────────┬────────────────┘
                                                       │
         ┌─────────────────────────────────────────────┼─────────────────────────────────────────────┐
         │                                             │                                             │
         ▼                                             ▼                                             ▼
┌──────────────────────────────┐        ┌──────────────────────────────┐      ┌──────────────────────────────┐
│  PORTAL 1: ASHA FIELD APP    │        │  PORTAL 2: PHC DOCTOR DESK   │      │  PORTAL 3: THO DASHBOARD     │
├──────────────────────────────┤        ├──────────────────────────────┤      ├──────────────────────────────┤
│ [Anjandri]                   │        │ [Lakshmikanth]               │      │ [Naveen]                     │
│  <AshaPatientForm />         │        │  <DoctorReferralQueue />     │      │  <ThoDistrictDashboard />    │
│  <VitalsInput />             │        │  <TeleconsultModal />        │      │  <TalukHeatmap />            │
├──────────────────────────────┤        ├──────────────────────────────┤      ├──────────────────────────────┤
│ [Keerthana]                  │        │ [Laxuman]                    │      │ [Naveen + All]               │
│  <TriageResultCard />        │        │  <DoctorActionPanel />       │      │  I18N Language Context       │
│  <QrSlipModal />             │        │  <SosAmbulanceModal />       │      │  (ಕನ್ನಡ ↔ English)           │
│  evaluateTriage() Engine     │        │  <DrugStockWidget />         │      │                              │
└──────────────────────────────┘        └──────────────────────────────┘      └──────────────────────────────┘
```

### 2.1 Shared Data Models

#### Patient & Encounter Object (`PatientRecord`)
```typescript
{
  patientId: string;        // "PAT-KA-TUM-001"
  abhaId: string;           // "91-4820-1123-8901" (14-digit)
  name: string;             // "Lakshmi Bai"
  nameLocal: string;        // "ಲಕ್ಷ್ಮೀ ಬಾಯಿ"
  age: string;              // "24"
  gender: "Female" | "Male" | "Other";
  phone: string;            // "9845012345"
  village: string;          // "Goravanahalli"
  taluk: string;            // "Koratagere"
  ashaName: string;         // "Shantha Devi"
  module: "MATERNAL" | "CHILD" | "CHRONIC";
  vitals: {
    // Maternal:
    gestationalWeeks?: number;
    bpSystolic?: number;
    bpDiastolic?: number;
    hemoglobin?: number;
    facialEdema?: boolean;
    severeHeadache?: boolean;
    vaginalBleeding?: boolean;
    fetalMovement?: "NORMAL" | "REDUCED" | "ABSENT";
    // Child:
    childAgeMonths?: number;
    childWeight?: number;
    muacTape?: "red" | "yellow" | "green";
    fastBreathing?: boolean;
    childLethargic?: boolean;
    feverDays?: number;
    // Chronic:
    bloodSugar?: number;
    coughDuration?: "under2weeks" | "over2weeks";
    chestPain?: boolean;
  };
  triage: {
    riskLevel: "RED" | "YELLOW" | "GREEN";
    color: string;          // "#ef4444" | "#f59e0b" | "#10b981"
    flags: string[];        // Array of detected red/yellow alerts
    actionEn: string;
    actionKn: string;
  };
  referralId?: string;      // "REF-2026-001"
  status: "REFERRED" | "AMBULANCE_DISPATCHED" | "APPOINTMENT_SCHEDULED" | "ATTENDED";
  timestamp: string;
  syncState: "PENDING_SYNC" | "SYNCED";
}
```

---

## 🛠️ 3. Step-by-Step Git Guide for Beginners

All team members must follow these exact terminal commands.

### Phase 1: Initial Setup (All Members)
When you sit at your hackathon machine:

```bash
# 1. Clone the master repository
git clone https://github.com/Abhilash-KR/arogyabandhu.git
cd arogyabandhu

# 2. Install all dependencies
npm install

# 3. Test that the project starts
npm run dev
# (Press Ctrl + C in terminal to stop after verifying it opens in browser)
```

---

### Phase 2: Create and Switch to Your Assigned Branch

Each member runs ONLY their own branch command:

* **Anjandri:**
  ```bash
  git checkout -b feature/asha-triage-form
  ```
* **Keerthana:**
  ```bash
  git checkout -b feature/triage-engine-qr
  ```
* **Lakshmikanth:**
  ```bash
  git checkout -b feature/doctor-queue-tele
  ```
* **Laxuman:**
  ```bash
  git checkout -b feature/doctor-actions-sos
  ```
* **Naveen:**
  ```bash
  git checkout -b feature/tho-dashboard-i18n
  ```

---

### Phase 3: Work on Your Code & Save (Every 45 Minutes)
While developing, save your progress to Git frequently:

```bash
# Check what files you modified
git status

# Stage your modified files
git add .

# Commit with a clear message
git commit -m "feat: implemented assigned component with props"

# Push to your remote branch on GitHub
git push -u origin HEAD
```

---

### Phase 4: Final Push Before Merge (Hour 4.5)
When your component is finished and tested locally:

```bash
git add .
git commit -m "feat: completed module ready for master merge"
git push origin HEAD
```

---

### Phase 5: Lead Merge & Integration (Abhilash Only)
Abhilash will pull and merge everyone's branch into `main`:

```bash
# Switch to main and get latest
git checkout main
git pull origin main

# Merge each branch one by one
git merge feature/asha-triage-form
git merge feature/triage-engine-qr
git merge feature/doctor-queue-tele
git merge feature/doctor-actions-sos
git merge feature/tho-dashboard-i18n

# Test build & run
npm run build
npm run dev
```

---

## 🤖 4. Copy-Paste AI Prompts for Each Team Member

Whenever you use an AI tool (Copilot, Cursor, Antigravity, ChatGPT, Claude), **attach `README.md`, `PLAN.md`, and `implement.md` to the chat and paste your specific prompt below**.

---

### 🟢 PROMPT 1: For Abhilash K R (Lead / Architecture / State Orchestration)
```text
I am Abhilash K R, Lead Integrator for the SIH 2026 project 'ArogyaBandhu' (Team Elite Evolvers).
I have attached README.md, PLAN.md, and implement.md.

My Assigned Role:
1. Orchestrate the master application in src/App.jsx.
2. Build src/components/Navbar.jsx with:
   - Portal switcher: [ASHA Field App | PHC Doctor Desk | THO District Analytics]
   - Live Network Toggle: [Online (Sync Active) ↔ Offline Mode (Data Auto-Saves on Device)]
   - Instant Kannada ↔ English Language Toggle (ಕನ್ನಡ / EN)
   - Real-time offline queue counter badge.
3. Manage root state for:
   - activeTab ('asha' | 'doctor' | 'tho')
   - currentLang ('en' | 'kn')
   - isOffline (boolean)
   - patients list (seeded from src/data/mockData.js)
   - referrals list (shared across ASHA and Doctor portals)
   - drugInventory list
   - followUpQueue list
4. Provide handleSaveEncounter(newRecord) which:
   - Appends to local patients & referrals
   - Triggers a simulated sync banner when online
   - Updates longitudinal history.

Please generate clean, robust, error-free code for src/App.jsx, src/components/Navbar.jsx, and verify src/services/db.js to ensure all child components integrate seamlessly without prop mismatches.
```

---

### 🟢 PROMPT 2: For Anjandri T N (ASHA Patient Registration & Vitals Input)
```text
I am Anjandri T N from Team Elite Evolvers working on branch 'feature/asha-triage-form'.
I have attached README.md, PLAN.md, and implement.md.

My Assigned Files:
1. src/components/asha/AshaPatientForm.jsx
2. src/components/asha/VitalsInput.jsx

My Exact Responsibilities:
1. Build AshaPatientForm.jsx:
   - Collect Patient Full Name, Age, Gender, Mobile Phone, Village, Taluk.
   - 14-Digit ABHA ID input field with formatting (XX-XXXX-XXXX-XXXX) and ABDM badge [14].
   - Search/Auto-fill button: If patient name or ABHA matches existing mock records (e.g., 'Lakshmi Bai'), auto-fill demographics and display their past visit history banner [4].
   - Module Selector Tabs: [🤰 Module A: Maternal ANC | 👶 Module B: Child Health (0-5y) | 🩺 Module C: Chronic & Infection] [10].
2. Build VitalsInput.jsx:
   - Render the appropriate dynamic form inputs based on the selected module:
     * Maternal: Gestational Weeks, BP Systolic, BP Diastolic, Hb (g/dL), Facial Edema (Yes/No), Severe Headache (Yes/No), Vaginal Bleeding (Yes/No), Fetal Movement (Normal/Reduced/Absent).
     * Child: Age in months, Weight (kg), MUAC Arm Tape (Red/Yellow/Green selection), Fast Breathing (Yes/No), Child Lethargic (Yes/No), Fever Days.
     * Chronic: Random Blood Sugar (mg/dL), BP, Cough Duration (<2 weeks / >2 weeks), Chest Pain (Yes/No), Night Sweats (Yes/No).
   - "Check Risk / Triage" submit button that triggers onTriageSubmit(formData).
3. Ensure all labels and buttons use the currentLang ('en' | 'kn') translation prop.

Please generate complete, beautiful, accessible React JSX code with Tailwind/CSS styling for these two components following the data contracts in implement.md.
```

---

### 🟢 PROMPT 3: For Keerthana (Clinical Triage Engine & QR Referral Slip)
```text
I am Keerthana from Team Elite Evolvers working on branch 'feature/triage-engine-qr'.
I have attached README.md, PLAN.md, and implement.md.

My Assigned Files:
1. src/services/triageEngine.js
2. src/components/asha/TriageResultCard.jsx
3. src/components/asha/QrSlipModal.jsx

My Exact Responsibilities:
1. Refine src/services/triageEngine.js:
   - Implement evaluateMaternalTriage(data), evaluateChildTriage(data), and evaluateChronicTriage(data) according to WHO/NHM clinical rules in PLAN.md [3].
   - Return { riskLevel: 'RED'|'YELLOW'|'GREEN', color, flags: string[], actionEn, actionKn }.
2. Build TriageResultCard.jsx:
   - Render high-impact visual card matching the risk level:
     * 🔴 RED: Pulsing red header, critical red flags breakdown, urgent referral advice, [Generate QR Referral Slip] and [108 SOS Dispatch] buttons.
     * 🟡 YELLOW: Amber warning card, moderate risk summary, [Schedule PHC Visit] button.
     * 🟢 GREEN: Green card, normal physiological limits, [Save Routine Record] button.
3. Build QrSlipModal.jsx:
   - Render a printable, high-contrast Digital Referral Slip [5].
   - Include Referral ID, Patient Name, Village, ASHA Name, Detected Red Flags, Assigned PHC.
   - Render a high-resolution Vector QR Code (using SVG/Canvas) encoding the referral payload.
   - Include Kannada + English bilingual referral instructions and a [Print / Share Slip] button.

Please generate production-ready, beautiful React JSX code for these files matching the specifications in implement.md.
```

---

### 🟢 PROMPT 4: For Lakshmikanth (Doctor Priority Queue & Teleconsultation Modal)
```text
I am Lakshmikanth from Team Elite Evolvers working on branch 'feature/doctor-queue-tele'.
I have attached README.md, PLAN.md, and implement.md.

My Assigned Files:
1. src/components/doctor/DoctorReferralQueue.jsx
2. src/components/doctor/TeleconsultModal.jsx

My Exact Responsibilities:
1. Build DoctorReferralQueue.jsx:
   - Display list of incoming patient referrals dynamically sorted by clinical severity [2] (🔴 Red cases at top, followed by 🟡 Yellow, then 🟢 Green).
   - Each referral card must display: Patient Name, Age, Village, ASHA Worker Name, Time elapsed, Module Tag, Risk Badge, and Vitals Summary snippet [6].
   - Filter tabs: [All Referrals | 🔴 Critical Red Flags | 🟡 Moderate Cases | 🟢 Attended].
   - Action buttons on each card: [👁️ View Record], [📞 Start Tele-Consult] [1], [🚑 108 SOS Dispatch] [13].
2. Build TeleconsultModal.jsx:
   - Full-screen or large modal for Assisted Teleconsultation [1].
   - Live Clinic Video/Camera viewport with webcam feed support (navigator.mediaDevices.getUserMedia) or animated high-fidelity doctor-patient stream simulation.
   - Real-Time Patient Vitals HUD overlay on the side (showing BP, Hb, Heart Rate, Red Flags).
   - In-call Doctor Notes & Prescription text area.
   - Action buttons inside modal: [Mute Mic], [Toggle Camera], [Issue e-Prescription], [Dispatch 108 Ambulance], [End Consult & Commit].

Please generate modern, responsive, high-aesthetic React JSX code for these components matching implement.md.
```

---

### 🟢 PROMPT 5: For Laxuman (Doctor Actions, 108 SOS Dispatch & Drug Inventory)
```text
I am Laxuman from Team Elite Evolvers working on branch 'feature/doctor-actions-sos'.
I have attached README.md, PLAN.md, and implement.md.

My Assigned Files:
1. src/components/doctor/DoctorActionPanel.jsx
2. src/components/doctor/SosAmbulanceModal.jsx
3. src/components/doctor/DrugStockWidget.jsx

My Exact Responsibilities:
1. Build DoctorActionPanel.jsx:
   - Patient clinical detail inspector showing longitudinal history timeline [4].
   - e-Prescription editor with one-click quick add for common rural medicines (IFA Tablets, ORS, Paracetamol, Calcium, Amoxicillin, Metformin) [6].
   - Appointment scheduler with date picker (for 🟡 Yellow cases) [2].
   - "Schedule Post-Discharge Follow-up" button that adds a task to the ASHA worker's follow-up queue [8].
2. Build SosAmbulanceModal.jsx:
   - Emergency "108 Arogya Kavacha" Ambulance Dispatch Interface [13].
   - Displays live GPS dispatch simulation: Patient village coordinates, Assigned nearest PHC ambulance base, Ambulance Tracking ID, and ETA (14 minutes).
   - Confirmation button updating referral status to "AMBULANCE_DISPATCHED".
3. Build DrugStockWidget.jsx:
   - Essential Medicine Inventory tracker for the PHC [7].
   - Visual progress bars showing stock percentage of IFA, ORS, Paracetamol, Amoxicillin, Oxytocin.
   - Color coding: 🟢 OK (>50%), 🟡 LOW (25-50%), 🔴 CRITICAL SHORTAGE (<25%).
   - "Request Stock Replenishment" button triggering automated alert to Taluk Health Officer (THO).

Please generate clean, robust, stylish React JSX components matching the props in implement.md.
```

---

### 🟢 PROMPT 6: For Naveen (THO District Heatmap & Bilingual Dictionary)
```text
I am Naveen from Team Elite Evolvers working on branch 'feature/tho-dashboard-i18n'.
I have attached README.md, PLAN.md, and implement.md.

My Assigned Files:
1. src/components/tho/ThoDistrictDashboard.jsx
2. src/components/tho/TalukHeatmap.jsx
3. src/data/i18n.js

My Exact Responsibilities:
1. Build ThoDistrictDashboard.jsx:
   - High-level District Health Administration console for Taluk Health Officer (THO) [9].
   - KPI Summary Cards:
     * Total High-Risk Red Cases (e.g., 29 Critical in Pavagada)
     * Overall Referral Completion Rate (e.g., 84.6%)
     * Active ASHA Workers Online (e.g., 148 reporting)
     * PHCs with Critical Drug Stockouts (e.g., 2 Facilities)
   - Taluk comparison table (Koratagere, Pavagada, Madhugiri, Gubbi, Sira) with case counts and referral success metrics.
   - Drug Shortage Alerts table allowing THO to approve emergency medicine shipments [7].
2. Build TalukHeatmap.jsx:
   - Interactive visual geospatial risk intensity map of Tumakuru district taluks.
   - Interactive taluk cards glowing red/amber based on caseload severity.
   - Clicking a taluk filters district statistics and shows primary localized health risks (e.g., Pavagada = Fluorosis/SAM, Koratagere = Maternal Pre-eclampsia).
3. Ensure src/data/i18n.js contains comprehensive, accurate translations in **ಕನ್ನಡ (Kannada)** and English for every single UI text, button, alert, and clinical guideline [12].

Please generate production-quality React JSX code for these files following implement.md.
```

---

## ⏱️ 5. 6-Hour Hackathon Sprint Timeline & Checkpoints

```
┌──────────────┬─────────────────────────────────────────────────┬──────────────────┐
│ Time Window  │ Sprint Phase & Deliverables                     │ Milestone Goal   │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 00:00--00:30 │ All members clone repo, create branches, test   │ 🟢 Git Sync OK   │
│              │ npm install & local dev server.                 │                  │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 00:30--02:30 │ Parallel Development: Each member builds their  │ 🟡 Components    │
│              │ assigned files using their AI prompts.          │    Operational   │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 02:30--03:30 │ Local Component Testing & Git Push to remote    │ 🟡 Branch Push   │
│              │ feature branches.                               │    Complete      │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 03:30--04:30 │ Master Integration: Abhilash merges all branches│ 🟠 Merged App    │
│              │ into main, resolves props, fixes styling.       │    Working       │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 04:30--05:30 │ End-to-End Flow Validation: Test all 14 official│ 🟢 All 14 PS     │
│              │ features in Kannada & English, offline & online.│    Features Live │
├──────────────┼─────────────────────────────────────────────────┼──────────────────┤
│ 05:30--06:00 │ Demo Rehearsal (3-Minute Script) & Presentation │ 🏆 100% Ready    │
│              │ role assignment for judges.                     │    For Judges    │
└──────────────┴─────────────────────────────────────────────────┴──────────────────┘
```

---

## 🎤 6. Presentation Roles During Live Judging (3 Minutes)

* **Abhilash K R (Lead Speaker):** Introduce Problem Statement #133, explain the 100% offline-first architecture, toggle between online and offline modes, and conclude with the system strengthening impact.
* **Anjandri & Keerthana:** Demonstrate the **ASHA Field App** live on airplane mode: enter *Lakshmi Bai*, trigger instant 🔴 **RED HIGH RISK** triage, show red flags, and generate the QR referral slip.
* **Lakshmikanth & Laxuman:** Demonstrate the **PHC Doctor Portal**: show the high-risk referral arriving at the top of the queue, launch the live **Teleconsultation session**, trigger **108 Ambulance SOS**, and inspect drug stock.
* **Naveen:** Demonstrate the **THO District Dashboard**: show the Tumakuru taluk risk heatmap, and click the language switch to flip the entire platform into **ಕನ್ನಡ (Kannada)** to prove real-world field readiness.

---

*ArogyaBandhu Implementation Blueprint • Elite Evolvers • SIH 2026*
