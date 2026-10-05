# 🏛️ KausalyaDrishti (ಕೌಶಲ್ಯ ದೃಷ್ಟಿ) — Master Project & Team Task Assignment (`all.md`)
> **Event:** Smart India Hackathon 2026 | **Category:** Software  
> **Problem Statement ID:** 26245  
> **Problem Statement Title:** AI-Based Real-Time Monitoring of Training Centres for Attendance and Infrastructure Compliance  
> **Ministry:** Ministry of Skill Development and Entrepreneurship (MSDE)  
> **Team Name:** Elite Evolvers  
> **Repository:** `Abhilash-K-R/ArogyaBandhu-SIH2026`  
> **Active Working Branch:** `KD`  

---

## 📌 1. Project Overview & Core Mission

**KausalyaDrishti** is an Edge-AI Computer Vision & Governance Platform developed for MSDE to monitor ~15,000 empaneled skilling centres under PMKVY, PMKK, and DDU-GKY. It actively resolves two critical integrity risks:

1. **Ghost Trainees & Attendance Fraud:** Cross-checks real-time physical headcount detected via CCTV/camera against official Aadhaar biometric portal claims using the mathematical discrepancy index $D_{att}$.
2. **Infrastructure & Equipment Deficit:** Verifies physical presence and operational readiness of sanctioned equipment (seating, workbenches, lab stations, trade tools) against the approved NSQF inventory.
3. **DPDP Act 2023 Privacy Compliance:** Runs client-side face-masking before telemetry generation so zero trainee biometric faces leave the local centre.
4. **Rural Bandwidth Optimization (5 KB JSON):** Replaces expensive 24/7 video streaming with a lightweight encrypted 5 KB telemetry payload transmitted over MQTT/TLS 1.3.

---

## 👥 2. Team Member Assignments & Git Branch Matrix

| # | Member Name | Role | Git Feature Branch | Assigned Components & Files | Core Responsibilities & Deliverables |
|---|---|---|---|---|---|
| **1** | **Abhilash K R** *(Lead)* | Lead Integrator & Architect | `KD` / `main` | `src/App.jsx`, `src/components/Navbar.jsx`, `src/data/centerMockData.js` | Master Layout, 3-tab routing, global state orchestration, branch merges & final QA |
| **2** | **Anjandri T N** | Edge AI & Computer Vision | `feature/kd-video-ai-feed` | `src/components/edge/CameraFeedView.jsx`, `src/components/edge/AiDetector.jsx` | WebCam / CCTV RTSP ingestion, TensorFlow.js COCO-SSD object detection, multi-person bounding boxes, crowd density tuning |
| **3** | **Keerthana** | Discrepancy & Rules Engine | `feature/kd-discrepancy-engine` | `src/components/audit/AttendanceDiscrepancyCard.jsx`, `src/services/complianceRules.js` | $D_{att}$ calculation engine, Ghost trainee delta ($\Delta$) counter, 🔴🟡🟢 automated fraud severity risk classification |
| **4** | **Lakshmikanth** | Infrastructure Compliance | `feature/kd-infra-inventory` | `src/components/audit/InfraComplianceWidget.jsx`, `src/components/audit/SanctionedEquipList.jsx` | Sanctioned vs Detected machinery audit list, missing equipment deficit scoring, workshop bay readiness |
| **5** | **Laxuman** | Privacy & Rural Telemetry | `feature/kd-privacy-telemetry` | `src/components/edge/PrivacyBlurToggle.jsx`, `src/components/edge/BandwidthTelemetry.jsx` | DPDP Act 2023 canvas face-masking filter, 5 KB edge JSON payload generator, SHA-256 digest & MQTT telemetry |
| **6** | **Naveen** | MSDE Ministry Command Center | `feature/kd-msde-dashboard` | `src/components/msde/MsdeDistrictDashboard.jsx`, `src/components/msde/CentreAuditTable.jsx`, `src/components/msde/MinistryConsole.jsx` | National/District fraud overview, PMKVY DBT Grant Disbursement Freeze, 1-Click Show-Cause Notice generator & PDF export |

---

## 🛠️ 3. Quick Setup & Development Guide for Team Members

### Step 1: Clone and Checkout Branch
```bash
git clone https://github.com/Abhilash-K-R/ArogyaBandhu-SIH2026.git
cd ArogyaBandhu-SIH2026
git checkout KD
```

### Step 2: Install Dependencies & Run Dev Server
```bash
npm install
npm run dev
```
Open `http://localhost:3000/` in your browser.

### Step 3: Working on Your Feature
1. Create your feature branch from `KD`:
   ```bash
   git checkout -b feature/kd-<your-feature>
   ```
2. Make your edits in your assigned component files.
3. Update your work log in `logs/<your_name>_log.md`.
4. Verify the build runs clean:
   ```bash
   npm run build
   ```
5. Commit and raise a pull request to branch `KD`.

---

## 🏗️ 4. 3-Portal Architecture

```
                               ┌────────────────────────────────────────────────────────┐
                               │             KAUSALYADRISHTI CORE PLATFORM              │
                               └──────────────────────────┬─────────────────────────────┘
                                                          │
         ┌────────────────────────────────────────────────┼────────────────────────────────────────────────┐
         │                                                │                                                │
         ▼                                                ▼                                                ▼
┌─────────────────────────────────┐      ┌─────────────────────────────────┐      ┌─────────────────────────────────┐
│     TAB 1: CENTRE EDGE AI       │      │    TAB 2: AUDIT & DISCREPANCY   │      │   TAB 3: MSDE NATIONAL CONSOLE  │
│   (Classroom Camera Ingestion)  │      │     (State & Center Audit)      │      │    (Ministry Command Center)    │
├─────────────────────────────────┤      ├─────────────────────────────────┤      ├─────────────────────────────────┤
│ • In-Browser TF.js Detection    │      │ • 5 Karnataka Centres Tally     │      │ • State/District Risk Analytics │
│ • Multi-Person & Equipment BBox │      │ • Aadhaar vs CCTV Discrepancy   │      │ • Automated PMKVY Grant Hold    │
│ • DPDP Act 2023 Face-Masking    │      │ • Machinery Inventory Checklist │      │ • 1-Click Show-Cause Notice     │
│ • 5 KB JSON Telemetry (MQTT)    │      │ • Ghost Trainee Risk Matrix     │      │ • Official PDF Notice Export    │
└─────────────────────────────────┘      └─────────────────────────────────┘      └─────────────────────────────────┘
```

---

## 📊 5. Mathematical Formulation Reference

### Attendance Discrepancy Index ($D_{att}$)
$$D_{att} = \frac{|\text{Biometric Claimed} - \text{AI Visual Headcount}|}{\text{Biometric Claimed}} \times 100$$

### Risk Tiers:
- **LOW ($D_{att} \le 10\%$):** Normal margin of variance $\rightarrow$ Auto-cleared for grant disbursement.
- **MEDIUM ($10\% < D_{att} \le 30\%$):** Minor discrepancy $\rightarrow$ Warning alert & audit flag.
- **CRITICAL ($D_{att} > 30\%$):** High Ghost Trainee Probability $\rightarrow$ Instant Grant Hold & Show-Cause Notice dispatch.

---

## 🎯 6. Traceability to PS 26245 Deliverables

1. **Working Video-Analytics Pipeline:** Real TensorFlow.js running live in-browser with sensitivity controls (Dense Crowd 10%, Standard 25%, Strict 45%).
2. **Attendance & Infrastructure Dashboard:** Searchable multi-centre audit view + National command dashboard.
3. **Privacy-Preserving Architecture:** DPDP Act 2023 on-device face masking with zero raw video export.
4. **Accuracy Assessment:** Confidence scores, multi-box IoU tracking, and detection threshold matrix.
5. **Low-Bandwidth Mode:** 5 KB periodic telemetry payload over MQTT/TLS 1.3 for rural centres.
