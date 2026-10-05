# 🏆 KausalyaDrishti — Hackathon Implementation Phases & Features Matrix
### SIH 2026 | Problem Statement ID: 26245 | Ministry of Skill Development & Entrepreneurship (MSDE)
**Team:** Elite Evolvers | **Branch:** `KD`

---

## 🏗️ 1. System Architecture & 3-Portal Pipeline

```
                               ┌────────────────────────────────────────────────────────┐
                               │             KAUSALYADRISHTI CORE ENGINE                │
                               └──────────────────────────┬─────────────────────────────┘
                                                          │
         ┌────────────────────────────────────────────────┼────────────────────────────────────────────────┐
         │                                                │                                                │
         ▼                                                ▼                                                ▼
┌─────────────────────────────────┐      ┌─────────────────────────────────┐      ┌─────────────────────────────────┐
│     PORTAL 1: CENTRE EDGE AI    │      │    PORTAL 2: AUDIT & DISCREPANCY│      │   PORTAL 3: MSDE GOVERNANCE     │
│   (Classroom Camera Ingestion)  │      │     (Batch & Equipment Tally)   │      │    (Ministry Command Center)    │
├─────────────────────────────────┤      ├─────────────────────────────────┤      ├─────────────────────────────────┤
│ • Webcam / RTSP Stream Player   │      │ • Portal Roster vs AI Headcount │      │ • State/District Risk Heatmap   │
│ • In-Browser Person Detector    │      │ • Ghost Trainee Discrepancy %   │      │ • Centre Compliance Leaderboard │
│ • Machinery/Equipment Scanner   │      │ • Sanctioned Machinery Table    │      │ • Automated Show-Cause Notices  │
│ • Canvas Dynamic Face-Blur      │      │ • Keyframe Evidence Generator   │      │ • PMKVY Grant Disbursement Lock │
│ • 5 KB Edge JSON Telemetry Sync │      │ • Temporal Frame Smoothing      │      │ • Audit Trail Export (PDF/CSV)  │
└─────────────────────────────────┘      └─────────────────────────────────┘      └─────────────────────────────────┘
```

---

## 📋 2. Master List of Numbered Features (F-01 to F-13)

| Feature # | Feature Name | Short Summary |
|---|---|---|
| **F-01** | **Base Project & Multi-Portal Architecture** | React 19 + Vite scaffold with isolated 3-portal state management & UI layout. |
| **F-02** | **Multi-District Center Data Engine** | Realistic dataset for 5 Karnataka centres with trades, claimed attendance, and equipment logs. |
| **F-03** | **Mathematical Discrepancy & Risk Engine** | Standardized $D_{att}$ calculation, 4-tier risk classification (Low/Med/High/Critical), and $C_{infra}$ metric. |
| **F-04** | **Live Edge AI Video Stream & Bounding Boxes** | Browser-based webcam processing with real-time green canvas overlays tracking persons. |
| **F-05** | **Interactive Headcount Simulation Tool** | Judge demo controls (`+1 Person`, `+5 Batch`, `Reset`) to simulate live classroom fill levels. |
| **F-06** | **DPDP Act 2023 Privacy Face-Blur Filter** | Client-side face anonymization toggle that blurs video without storing biometric facial data. |
| **F-07** | **5 KB Low-Bandwidth Telemetry Card** | Micro-payload JSON telemetry generator with SHA-256 tamper-evident hash for 2G rural links. |
| **F-08** | **Searchable Central Audit Register** | Inspector's table with color-coded risk indicators, district search, and severity filters. |
| **F-09** | **Center Deep-Dive Inspection Panel** | Expanded drill-down view showing claimed vs. detected attendance, equipment breakdown, and trainer presence. |
| **F-10** | **National MSDE Ministry Console** | Ministry-level KPI statistics showing total centres, critical alerts, and grant hold counts. |
| **F-11** | **Automated DBT Grant Freeze Shield** | One-click action to freeze government scheme disbursements for non-compliant centres. |
| **F-12** | **Automated Show-Cause Notice Generator** | Dynamic official legal notice drafted instantly with centre-specific fraud metrics and clipboard copy. |
| **F-13** | **Production Optimization & Judge Demo Script** | Clean zero-error production build (`npm run build`) and scripted 14-step presentation walkthrough. |

---

## 🗺️ 3. Phase-to-Feature Mapping Table

| Phase | Phase Name | Features Included (Feature Numbers) | Status |
|---|---|---|---|
| **Phase 1** | **Project Setup & Environment** | **F-01** *(Base Architecture, Vite/React setup, Git branch `KD`)* | ✅ Done |
| **Phase 2** | **Core Data & Mathematical Engine** | **F-02** *(Mock Data)*, **F-03** *(Discrepancy Formula & Risk Classifier)* | ✅ Done |
| **Phase 3** | **Portal 1 — Edge AI Camera Feed** | **F-04** *(Live Camera + Canvas)*, **F-05** *(Batch Simulator)*, **F-06** *(Privacy Blur)*, **F-07** *(5 KB Telemetry)* | ✅ Done |
| **Phase 4** | **Portal 2 — Audit Register Desk** | **F-08** *(Searchable Audit Table)*, **F-09** *(Drill-Down Inspection Panel)* | ✅ Done |
| **Phase 5** | **Portal 3 — MSDE Ministry Console** | **F-10** *(National Macro KPIs)*, **F-11** *(Grant Freeze Action)*, **F-12** *(Show-Cause Notice Generator)* | ✅ Done |
| **Phase 6** | **Polish, Production Build & Demo Prep** | **F-13** *(Clean Build, Color Schemes, 14-Step Judge Demo Walkthrough)* | ✅ Done |

---

## ⚡ 4. Detailed Step-by-Step Implementation Breakdown

---

### ⚡ HACKATHON PHASE 1: PROJECT SETUP & ENVIRONMENT
**🎯 Goal:** Scaffold the application with React 19, Vite, and essential utilities.  
**📦 Features Built:** `F-01`

**Step 1.1 — Create the React Project [F-01]**
```bash
cd E:\trail\hac
npm create vite@latest . -- --template react
npm install
```
- Set up Vite + React 19
- Tested: `npm run dev` → blank app opens at `localhost:5173` ✅

**Step 1.2 — Install Packages [F-01]**
```bash
npm install lucide-react
```
- `lucide-react` → icons for camera, security shields, alert badges, and navigation.

**Step 1.3 — Create Folder Structure [F-01]**
```
src/
├── components/
│   ├── edge/         ← Portal 1: Camera AI feed components
│   ├── audit/        ← Portal 2: Audit register table & detail views
│   └── msde/         ← Portal 3: Ministry dashboard & notice generator
├── data/
│   └── centerMockData.js    ← Multi-center Karnataka dataset
├── services/
│   └── complianceRules.js   ← Discrepancy & risk mathematical formulas
└── App.jsx                  ← Master portal router & state orchestrator
```

**Step 1.4 — Create Git Branch [F-01]**
```bash
git checkout -b KD
git push origin KD
```

**✅ Phase 1 Complete when:** `npm run dev` opens a blank React app with zero terminal warnings.

---

### ⚡ HACKATHON PHASE 2: CORE DATA & MATHEMATICAL ENGINE
**🎯 Goal:** Build the data models and mathematical discrepancy engine.  
**📦 Features Built:** `F-02`, `F-03`

**Step 2.1 — Create [`centerMockData.js`](file:///e:/trail/hac/src/data/centerMockData.js) [F-02]**
- Stores 5 multi-district centres in Karnataka (Bengaluru, Mysuru, Hubballi, Mangaluru, Belagavi).
- Tracks claimed attendance, registered rosters, equipment requirements vs detections, and risk tiers.

**Step 2.2 — Create [`complianceRules.js`](file:///e:/trail/hac/src/services/complianceRules.js) [F-03]**
- **$D_{att}$ Formula:**
  $$D_{att} = \frac{|N_{claimed} - N_{detected}|}{N_{claimed}} \times 100\%$$
- **4-Tier Risk Classification:**
  - `LOW` (≤ 4% variance)
  - `MEDIUM` (5% - 10% variance)
  - `HIGH` (11% - 20% variance)
  - `CRITICAL` (> 20% variance or ≥ 10 phantom students)
- **$C_{infra}$ Infrastructure Compliance Metric:**
  $$C_{infra} = \frac{\text{Detected Equipments}}{\text{Sanctioned Required Equipments}} \times 100\%$$

**✅ Phase 2 Complete when:** Core mathematical functions pass test assertions with expected triage ratings.

---

### ⚡ HACKATHON PHASE 3: PORTAL 1 — EDGE AI CAMERA FEED
**🎯 Goal:** Live webcam stream with real-time bounding box detection, privacy masking, and telemetry card.  
**📦 Features Built:** `F-04`, `F-05`, `F-06`, `F-07`

**Step 3.1 — Create [`CameraFeedView.jsx`](file:///e:/trail/hac/src/components/edge/CameraFeedView.jsx) [F-04]**
- Ingests laptop webcam via `navigator.mediaDevices.getUserMedia`.
- Overlays HTML5 Canvas with green bounding box tracking and dynamic person counters.

**Step 3.2 — Add Interactive Headcount Controls [F-05]**
- Demo buttons: `[Start Camera]`, `[+ Add Person]`, `[+ Add 5 (Batch)]`, `[Reset]`.
- Dynamically recalculates $D_{att}$ and risk badge in real time.

**Step 3.3 — Create [`PrivacyBlurToggle.jsx`](file:///e:/trail/hac/src/components/edge/PrivacyBlurToggle.jsx) [F-06]**
- Client-side face pixelation / blur toggle conforming strictly to **DPDP Act 2023**.
- Updates telemetry payload status flag `dpdp_mask_applied: true`.

**Step 3.4 — Create [`BandwidthTelemetry.jsx`](file:///e:/trail/hac/src/components/edge/BandwidthTelemetry.jsx) [F-07]**
- Live JSON packet inspector showing the lightweight <5 KB payload.
- Computes SHA-256 tamper-evident integrity hash.

**✅ Phase 3 Complete when:** Live webcam renders bounding boxes, privacy blur functions cleanly, and JSON card updates live.

---

### ⚡ HACKATHON PHASE 4: PORTAL 2 — AUDIT REGISTER DESK
**🎯 Goal:** State-wide inspection desk for verifying attendance tallies and equipment inventory.  
**📦 Features Built:** `F-08`, `F-09`

**Step 4.1 — Create [`AuditRegister.jsx`](file:///e:/trail/hac/src/components/audit/AuditRegister.jsx) [F-08]**
- Master register table of all Karnataka training centres.
- Real-time search bar (by district/centre name) and risk-level filter dropdown.

**Step 4.2 — Center Deep-Dive Audit Detail Panel [F-09]**
- Expands on row selection to display:
  - Exact tally: Claimed (Portal) vs Detected (AI).
  - Infrastructure checklist (Computers, Workbenches, Soldering Stations).
  - Trainer physical presence confirmation.

**✅ Phase 4 Complete when:** Filterable audit table smoothly expands center-specific telemetry and equipment stats.

---

### ⚡ HACKATHON PHASE 5: PORTAL 3 — MSDE MINISTRY CONSOLE
**🎯 Goal:** National governance console with macro KPIs, grant holds, and automated show-cause notice generation.  
**📦 Features Built:** `F-10`, `F-11`, `F-12`

**Step 5.1 — Create [`MinistryConsole.jsx`](file:///e:/trail/hac/src/components/msde/MinistryConsole.jsx) [F-10]**
- Top summary stats cards (Total centres, Critical violations count, Total grants on hold).

**Step 5.2 — Implement DBT Grant Freeze Action [F-11]**
- `[HOLD GRANT]` action triggers direct grant disbursement locks for high-risk centres.

**Step 5.3 — Automated Show-Cause Notice Legal Generator [F-12]**
- Auto-drafts formal Ministry Show-Cause Notices with dynamic centre ID, $D_{att}$ percentage, date, and 1-click clipboard export.

**Step 5.4 — Connect 3-Portal Router in [`App.jsx`](file:///e:/trail/hac/src/App.jsx) [F-01]**
- Seamless top navigation between Portal 1 (Edge), Portal 2 (Audit), and Portal 3 (Ministry).

**✅ Phase 5 Complete when:** All 3 portals are wired up, grant holds toggle live, and show-cause notices copy to clipboard.

---

### ⚡ HACKATHON PHASE 6: PRODUCTION POLISH & DEMO PREP
**🎯 Goal:** Build optimization, UI polish, and judge presentation execution.  
**📦 Features Built:** `F-13`

**Step 6.1 — Production Build Verification [F-13]**
```bash
npm run build
```
- Verified zero JSX syntax errors and clean bundle compilation.

**Step 6.2 — Visual Contrast & Theming Polish [F-13]**
- High-contrast alert indicators (Green/Yellow/Orange/Red).
- Responsive layout tested for standard projector and laptop viewports.

**Step 6.3 — 14-Step Judge Presentation Script [F-13]**

| Step | Action | What Judges See |
|---|---|---|
| **1** | Open Portal 1 (`Edge AI Feed`) | Live webcam stage and real-time control HUD |
| **2** | Click `Start Camera` | Real-time laptop camera ingestion with zero lag |
| **3** | Point out Claimed Count | Centre officially claims 42 students present |
| **4** | Click `Add 1 Person` | Single green bounding box tracking, initial headcount = 1 |
| **5** | Highlight Discrepancy Gauge | $D_{att} = 97.6\%$ ➔ Triggers **CRITICAL** alert badge 🔴 |
| **6** | Click `+ Add 5` multiple times | Headcount grows to realistic batch size, $D_{att}$ decreases |
| **7** | Toggle `Privacy Face-Blur` | Video streams blur client-side; DPDP Act compliance verified |
| **8** | Inspect `5 KB Telemetry Card` | Demonstrates ultra-low bandwidth consumption (<5 KB JSON) |
| **9** | Switch to Portal 2 (`Audit Register`) | Multi-district Karnataka compliance register table |
| **10** | Filter by `CRITICAL` & select Bengaluru | Opens deep-dive panel with equipment breakdown & tally |
| **11** | Switch to Portal 3 (`MSDE Console`) | Macro National overview with scheme KPI metrics |
| **12** | Click `HOLD GRANT` | Direct Benefit Transfer grant locked instantly ❄️ |
| **13** | Click `SEND NOTICE` | Official Show-Cause legal notice auto-drafted |
| **14** | Click `Copy to Clipboard` | Clean export for immediate dispatch to center principal |

**Step 6.4 — Final Git Commit & Sync [F-13]**
```bash
git add .
git commit -m "feat: complete hackathon implementation - SIH 2026 PS 26245 ready"
git push origin KD
```

---

## 📊 Summary Check: All Features & Phases Completed

```
Phase 1: Setup & Architecture ➔ F-01 (Scaffold, Routing, Layout)              ✅ DONE
Phase 2: Core Data & Rules     ➔ F-02 (Mock Data), F-03 (Math D_att Engine)    ✅ DONE
Phase 3: Portal 1 (Edge AI)    ➔ F-04 (Cam), F-05 (Batch), F-06 (Blur), F-07 (5KB) ✅ DONE
Phase 4: Portal 2 (Audit Desk) ➔ F-08 (Register Table), F-09 (Detail Panel)   ✅ DONE
Phase 5: Portal 3 (MSDE)       ➔ F-10 (KPIs), F-11 (Grant Hold), F-12 (Notice) ✅ DONE
Phase 6: Polish & Demo         ➔ F-13 (Zero-error Build, 14-Step Demo Flow)   ✅ DONE
```
