# 🚀 KausalyaDrishti — Team Implementation Master Plan (`implement.md`)
> **Team Name:** Elite Evolvers  
> **Event:** Smart India Hackathon 2026 | Problem Statement ID: 26245 (MSDE)  
> **Project:** KausalyaDrishti (ಕೌಶಲ್ಯ ದೃಷ್ಟಿ) — AI Training Centre Compliance & Anti-Fraud Engine  
> **Branch:** `KD`  
> **Tech Stack:** React 19 (Vite) + TensorFlow.js / Canvas AI + Tailwind/CSS Tokens + Lucide Icons  
> **Lead Architect & Integrator:** Abhilash K R

---

## 👥 1. Team Ownership & Git Branch Matrix

| # | Team Member | Git Branch Name | Assigned Components / Files | Mandatory AI Log File | Core Responsibilities |
|---|---|---|---|---|---|
| **1** | **Abhilash K R** *(Lead)* | `KD` / `main` | `src/App.jsx`, `src/components/Navbar.jsx`, `src/data/centerMockData.js` | `logs/abhilash_log.md` | Master Layout, Navigation, State Orchestration, Git Master Integration & Final QA |
| **2** | **Anjandri T N** | `feature/kd-video-ai-feed` | `src/components/edge/CameraFeedView.jsx`, `src/components/edge/AiDetector.jsx` | `logs/anjandri_log.md` | Video/Webcam Stream Ingestion, Real-Time Person & Machinery Bounding Boxes |
| **3** | **Keerthana** | `feature/kd-discrepancy-engine` | `src/components/audit/AttendanceDiscrepancyCard.jsx`, `src/services/complianceRules.js` | `logs/keerthana_log.md` | Portal vs AI Count Tally Math, Ghost Trainee % Calculation, 🔴🟡🟢 Fraud Severity Flags |
| **4** | **Lakshmikanth** | `feature/kd-infra-inventory` | `src/components/audit/InfraComplianceWidget.jsx`, `src/components/audit/SanctionedEquipList.jsx` | `logs/lakshmikanth_log.md` | Sanctioned vs Detected Machinery Checklist, Missing Equipment Deficit Tracker |
| **5** | **Laxuman** | `feature/kd-privacy-telemetry` | `src/components/edge/PrivacyBlurToggle.jsx`, `src/components/edge/BandwidthTelemetry.jsx` | `logs/laxuman_log.md` | Dynamic Face-Blur Privacy Canvas Filter, 5 KB Rural Edge JSON Payload Generator |
| **6** | **Naveen** | `feature/kd-msde-dashboard` | `src/components/msde/MsdeDistrictDashboard.jsx`, `src/components/msde/CentreAuditTable.jsx` | `logs/naveen_log.md` | MSDE Ministry Command Center, District Compliance Heatmaps, Show-Cause Notice Generator |

---

## 📝 2. Mandatory AI Work Log Standard (`logs/<name>_log.md`)

Every member's AI assistant **MUST create and update** their assigned log file in `logs/` (e.g., `logs/anjandri_log.md`).

### Each log file MUST follow this exact format:
```markdown
# 🛠️ Development Log — <Your Name>
**Branch:** <feature/branch-name>  
**Assigned Module:** <Module Name>  
**Last Updated:** <Time>  

## 1. Files Created & Modified
- `src/components/path/YourComponent.jsx` (Created)

## 2. Exported Components & Props Specification
### `<YourComponent />`
- **Props Expected:**
  - `centerData` (object): Selected training centre profile
  - `onViolationDetected` (function): Triggered when discrepancy exceeds threshold
- **Local State:** Description of internal component state

## 3. How to Run & Test My Component
1. Import component in `App.jsx`.
2. Pass mock data: `<YourComponent centerData={mockData} />`.
3. Verify bounding boxes and discrepancy alerts render correctly.

## 4. Integration Notes for Abhilash (Lead Integrator)
- Ready for merge: YES / NO
- Special dependencies or notes: (e.g., uses HTML5 Canvas)
```

---

## 📐 3. Contract-First Component Architecture & Shared Data Models

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
│  PORTAL 1: CENTRE EDGE AI    │        │  PORTAL 2: AUDIT & TALLY     │      │  PORTAL 3: MSDE DASHBOARD    │
├──────────────────────────────┤        ├──────────────────────────────┤      ├──────────────────────────────┤
│ [Anjandri]                   │        │ [Keerthana]                  │      │ [Naveen]                     │
│  <CameraFeedView />          │        │  <AttendanceDiscrepancyCard/>│      │  <MsdeDistrictDashboard />   │
│  <AiDetector />              │        │  complianceRules.js Engine   │      │  <CentreAuditTable />        │
├──────────────────────────────┤        ├──────────────────────────────┤      ├──────────────────────────────┤
│ [Laxuman]                    │        │ [Lakshmikanth]               │      │ [All Members]                │
│  <PrivacyBlurToggle />       │        │  <InfraComplianceWidget />   │      │  `centerMockData.js`         │
│  <BandwidthTelemetry />      │        │  <SanctionedEquipList />     │      │  Shared State Store          │
└──────────────────────────────┘        └──────────────────────────────┘      └──────────────────────────────┘
```

---

## 🛠️ 4. Beginner-Friendly Git Commands (For Team Members)

### Step 1: Clone and Checkout Your Assigned Branch
```bash
# Clone the repository
git clone https://github.com/Abhilash-K-R/ArogyaBandhu-SIH2026.git
cd ArogyaBandhu-SIH2026

# Switch to the KD branch first
git checkout KD

# Create and switch to your feature branch:
# Anjandri:
git checkout -b feature/kd-video-ai-feed
# Keerthana:
git checkout -b feature/kd-discrepancy-engine
# Lakshmikanth:
git checkout -b feature/kd-infra-inventory
# Laxuman:
git checkout -b feature/kd-privacy-telemetry
# Naveen:
git checkout -b feature/kd-msde-dashboard
```

### Step 2: Save, Commit, and Push Your Work
```bash
# Stage changes
git add .

# Commit with a message
git commit -m "feat: implemented assigned component and updated logs"

# Push to GitHub
git push -u origin HEAD
```

---

## 🤖 5. Copy-Paste AI Prompts for Each Team Member

---

### 🟢 PROMPT 1: For Abhilash K R (Lead / Architecture / Master Integration)
```text
I am Abhilash K R, Lead Architect for the SIH 2026 project 'KausalyaDrishti' (Team Elite Evolvers, PS ID: 26245 - MSDE).
I have attached README.md, PLAN.md, and implement.md.

My Assigned Role:
1. Orchestrate src/App.jsx managing root state:
   - activeTab ('edge' | 'audit' | 'msde')
   - selectedCenter (from src/data/centerMockData.js)
   - liveStats ({ liveCount: 8, registeredCount: 28, discrepancy: 71.4, infraScore: 82.1 })
   - isPrivacyOn (boolean)
   - showCauseNoticeModal (boolean)
2. Build src/components/Navbar.jsx with:
   - Brand logo & title ("🏛️ KausalyaDrishti / ಕೌಶಲ್ಯ ದೃಷ್ಟಿ — MSDE Anti-Fraud Portal")
   - Portal switcher: [🎥 Centre Live Camera | 📊 Attendance & Infra Audit | 🏛️ MSDE Ministry Console]
   - Live Discrepancy Alert ticker: "🔴 Alert: 20 Ghost Trainees detected in Batch B04 (Tumakuru Skill Academy)".
3. MANDATORY LOG: Maintain 'logs/abhilash_log.md' detailing integration status.

Please generate clean, robust React JSX code for src/App.jsx, src/components/Navbar.jsx, and logs/abhilash_log.md.
```

---

### 🟢 PROMPT 2: For Anjandri T N (Video Feed & AI Bounding Box Detector)
```text
I am Anjandri T N from Team Elite Evolvers working on branch 'feature/kd-video-ai-feed'.
I have attached README.md, PLAN.md, and implement.md.

My Assigned Files:
1. src/components/edge/CameraFeedView.jsx
2. src/components/edge/AiDetector.jsx
3. logs/anjandri_log.md (MANDATORY LOG)

My Exact Responsibilities:
1. Build CameraFeedView.jsx:
   - Video container supporting both live webcam feed (navigator.mediaDevices.getUserMedia) and sample classroom video clip simulation.
   - Mode switcher: [📹 Live Webcam | 🎬 Simulated PMKVY Classroom Feed].
   - Overlay canvas rendering real-time AI bounding boxes at 30 FPS.
2. Build AiDetector.jsx:
   - Real-time bounding box renderer:
     * Green bounding boxes around detected trainees with confidence tag (e.g. "Trainee: 94%").
     * Blue bounding boxes around detected machinery (e.g. "Sewing Machine: 91%", "Workbench: 88%").
   - Live HUD counter overlay in corner: "Live Headcount: 8 Trainees | Equipment Detected: 6/10".
3. MANDATORY LOG: Create and maintain 'logs/anjandri_log.md'.

Please generate complete, high-performance React JSX code with Tailwind/CSS styling for these files.
```

---

### 🟢 PROMPT 3: For Keerthana (Attendance Discrepancy & Ghost Trainee Engine)
```text
I am Keerthana from Team Elite Evolvers working on branch 'feature/kd-discrepancy-engine'.
I have attached README.md, PLAN.md, and implement.md.

My Assigned Files:
1. src/components/audit/AttendanceDiscrepancyCard.jsx
2. src/services/complianceRules.js
3. logs/keerthana_log.md (MANDATORY LOG)

My Exact Responsibilities:
1. Build complianceRules.js:
   - Calculate Discrepancy %: ((portalCount - aiCount) / portalCount) * 100.
   - Classify Risk: >40% ➔ RED (Critical Fraud), 15-40% ➔ YELLOW (Suspicious), <15% ➔ GREEN (Compliant).
   - Estimate Financial Grant Leakage: ghostTraineeCount * ₹7,500 (PMKVY stipend/training cost per head).
2. Build AttendanceDiscrepancyCard.jsx:
   - Tally comparison view:
     * Portal Registered Batch Strength (e.g. 30)
     * Centre Claimed Present (e.g. 28)
     * AI Verified Physical Headcount (e.g. 8)
   - High-impact pulsing alert banner: "🔴 CRITICAL GHOST TRAINEE FRAUD: 20 Phantom Trainees Detected (71.4% Shortfall)! Est. Grant Leakage: ₹1,50,000".
   - Time-lapse verification snapshots carousel showing classroom vacancy during active hours.
3. MANDATORY LOG: Create and maintain 'logs/keerthana_log.md'.

Please generate complete React JSX code for these files matching implement.md.
```

---

### 🟢 PROMPT 4: For Lakshmikanth (Infrastructure Sanctioned Inventory Verifier)
```text
I am Lakshmikanth from Team Elite Evolvers working on branch 'feature/kd-infra-inventory'.
I have attached README.md, PLAN.md, and implement.md.

My Assigned Files:
1. src/components/audit/InfraComplianceWidget.jsx
2. src/components/audit/SanctionedEquipList.jsx
3. logs/lakshmikanth_log.md (MANDATORY LOG)

My Exact Responsibilities:
1. Build SanctionedEquipList.jsx:
   - Table of approved machinery for the trade course (e.g., Sewing Machines, Computer Desks, Welding Kits, Fire Extinguisher).
   - Columns: Sanctioned Qty, Live AI Detected Qty, Deficit Status (🟢 Compliant / 🔴 Missing).
2. Build InfraComplianceWidget.jsx:
   - Visual gauge/progress bar showing overall Infrastructure Compliance Score (e.g., 68%).
   - Warning banner: "⚠ Infrastructure Alert: 4 Industrial Sewing Machines missing from Bay 2. Minimum 85% required for grant approval."
   - "Trigger Equipment Re-Scan" button with scanning animation.
3. MANDATORY LOG: Create and maintain 'logs/lakshmikanth_log.md'.

Please generate modern React JSX code for these files following implement.md.
```

---

### 🟢 PROMPT 5: For Laxuman (Privacy Face-Blur & Low-Bandwidth Telemetry)
```text
I am Laxuman from Team Elite Evolvers working on branch 'feature/kd-privacy-telemetry'.
I have attached README.md, PLAN.md, and implement.md.

My Assigned Files:
1. src/components/edge/PrivacyBlurToggle.jsx
2. src/components/edge/BandwidthTelemetry.jsx
3. logs/laxuman_log.md (MANDATORY LOG)

My Exact Responsibilities:
1. Build PrivacyBlurToggle.jsx:
   - Interactive button: [🔒 Privacy Anonymization Mode: ON / OFF].
   - Applies dynamic pixelated/Gaussian face-blur filters on detected person bounding boxes in real time.
   - Explanatory note: "DPDP Act Compliant — Zero facial biometric data stored or transmitted."
2. Build BandwidthTelemetry.jsx:
   - Visual telemetry inspector demonstrating rural feasibility:
     * Traditional 24/7 CCTV Streaming: 500 MB / hour (Fails on 2G/3G).
     * KausalyaDrishti Edge Telemetry: 5 KB / 15 minutes (99.8% bandwidth savings!).
   - Formatted JSON preview of the 5 KB edge packet containing attendance metrics and violation keyframe snapshot.
3. MANDATORY LOG: Create and maintain 'logs/laxuman_log.md'.

Please generate clean React JSX code for these files matching implement.md.
```

---

### 🟢 PROMPT 6: For Naveen (MSDE Ministry Command Dashboard)
```text
I am Naveen from Team Elite Evolvers working on branch 'feature/kd-msde-dashboard'.
I have attached README.md, PLAN.md, and implement.md.

My Assigned Files:
1. src/components/msde/MsdeDistrictDashboard.jsx
2. src/components/msde/CentreAuditTable.jsx
3. logs/naveen_log.md (MANDATORY LOG)

My Exact Responsibilities:
1. Build MsdeDistrictDashboard.jsx:
   - National & State/District Skilling Governance Console for MSDE officers.
   - Summary KPI Cards:
     * Total Monitored Centres: 148
     * Active Batches Monitored: 412
     * Ghost Trainee Alerts Triggered: 19 Centres
     * Estimated Grant Leakage Blocked: ₹14,80,000
   - Interactive District Compliance Heatmap cards (Tumakuru, Bengaluru Rural, Mysuru, Belagavi).
2. Build CentreAuditTable.jsx:
   - Leaderboard table of training centres with compliance scores (0 to 100%) and fraud risk badges.
   - One-Click Enforcement Actions:
     * [📄 Generate Official Show-Cause Notice]
     * [🚫 Freeze PMKVY Grant Disbursement]
     * [📅 Order Flying-Squad Surprise Inspection]
3. MANDATORY LOG: Create and maintain 'logs/naveen_log.md'.

Please generate complete React JSX code for these files following implement.md.
```

---

## ⏱️ 6. 6-Hour Hackathon Sprint Timeline & 3-Min Judging Roles

```
┌──────────────┬────────────────────────────────────────────────────────┬──────────────────┐
│ Time Window  │ Sprint Phase & Deliverables                            │ Milestone Goal   │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 00:00--00:30 │ All members clone KD branch, create feature branches,  │ 🟢 Setup OK      │
│              │ run npm install and test local dev server.             │                  │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 00:30--02:30 │ Parallel Development: Each member builds their assigned│ 🟡 Components    │
│              │ components using their copy-paste AI prompt.           │    Operational   │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 02:30--03:30 │ Local Component Testing & Git Push to remote branches  │ 🟡 Branch Push   │
│              │ with updated logs/name_log.md files.                   │    Complete      │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 03:30--04:30 │ Master Integration: Abhilash merges all branches into  │ 🟠 Merged App    │
│              │ KD branch, resolves props, connects master state.      │    Working       │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 04:30--05:30 │ End-to-End Flow Validation: Test camera, ghost trainee │ 🟢 All Features  │
│              │ alerts, infra checklist, privacy blur, ministry tools. │    Live          │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 05:30--06:00 │ Demo Rehearsal (3-Minute Script) & Pitch Delivery prep │ 🏆 100% Ready    │
└──────────────┴────────────────────────────────────────────────────────┴──────────────────┘
```

---

*KausalyaDrishti Implementation Plan • Elite Evolvers • SIH 2026 (PS ID: 26245)*
