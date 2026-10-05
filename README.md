# 🏛️ KausalyaDrishti (ಕೌಶಲ್ಯ ದೃಷ್ಟಿ / कौशल्य दृष्टि)
> **Smart India Hackathon 2026 | Problem Statement ID: 26245 | Category: Software**  
> **Theme:** Smart Education / Skilling Governance  
> **Ministry:** Ministry of Skill Development and Entrepreneurship (MSDE)  
> **Team Name:** Elite Evolvers  
> **Tech Stack:** React 19 (Vite) + TensorFlow.js / COCO-SSD + HTML5 Canvas + Tailwind/CSS Tokens + Lucide Icons  

---

## 📌 Executive Summary

**KausalyaDrishti** is an **edge-AI real-time video analytics and skilling governance platform** engineered for the Ministry of Skill Development and Entrepreneurship (MSDE). It continuously monitors empaneled government skilling centres (under PMKVY, DDU-GKY, and NAPS) to eliminate two major integrity risks:

1. **Ghost Trainees & Attendance Fraud:** Cross-checks real-time physical headcount detected via CCTV/camera against centre-submitted portal rosters.
2. **Infrastructure Compliance Fraud:** Verifies the physical presence, count, and operational readiness of mandatory sanctioned equipment (workbenches, machinery, computer labs) between inspection cycles.

The system features **dynamic real-time face-blurring for 100% trainee privacy** (conforming to DPDP Act standards) and operates on a **low-bandwidth rural telemetry protocol (5 KB edge payload)** saving 99.8% bandwidth over continuous 24/7 video streaming.

---

## 👥 Team Elite Evolvers & Module Ownership Matrix

| # | Team Member | Primary Role | Assigned Git Branch | Owned Components / Modules |
|---|---|---|---|---|
| **1** | **Abhilash K R** *(Lead)* | Lead Integrator & Architecture | `KD` / `main` | `App.jsx`, `Navbar.jsx`, `CenterRegistry.js`, Master State & Navigation |
| **2** | **Anjandri T N** | Edge Video & AI Detection | `feature/kd-video-ai-feed` | `CameraFeedView.jsx`, `AiDetector.jsx` (Bounding box overlays) |
| **3** | **Keerthana** | Attendance Discrepancy Engine | `feature/kd-discrepancy-engine` | `AttendanceDiscrepancyCard.jsx`, `complianceRules.js` (Ghost trainee logic) |
| **4** | **Lakshmikantha D H** | Infrastructure Compliance | `feature/kd-infra-inventory` | `InfraComplianceWidget.jsx`, `SanctionedEquipList.jsx` (Machinery scanner) |
| **5** | **Laxuman** | Privacy & Low-Bandwidth Edge | `feature/kd-privacy-telemetry` | `PrivacyBlurToggle.jsx`, `BandwidthTelemetry.jsx` (5KB Edge payload) |
| **6** | **Naveen** | MSDE Ministry Dashboard | `feature/kd-msde-dashboard` | `MsdeDistrictDashboard.jsx`, `CentreAuditTable.jsx` (State/District analytics) |

---

## 🏗️ System Architecture & 4-Tier Pipeline

```
                                  ┌──────────────────────────────────────────────┐
                                  │      MSDE CENTRAL MONITORING CLOUD GATEWAY   │
                                  │  (District Heatmaps, Audit Trails & Alerts)  │
                                  └──────────────────────┬───────────────────────┘
                                                         │
                        ▲ (5 KB Periodic JSON Telemetry) │ (Audit Requests / Notices)
                        │                                ▼
┌────────────────────────────────────────────────┐  ┌────────────────────────────────────────────┐
│         TRAINING CENTRE EDGE SYSTEM            │  │        MSDE MONITORING CONSOLE             │
│    (Classroom / Workshop CCTV Ingestion)       │  │     (National / State / District Desk)     │
├────────────────────────────────────────────────┤  ├────────────────────────────────────────────┤
│ • In-Browser / Edge Video Stream Ingestion     │  │ • District-Wise Skilling Compliance Heatmap│
│ • Real-Time AI Person Headcount Detector       │  │ • Real-Time Ghost Trainee Leakage Alerts   │
│ • Sanctioned Machinery / Tool Object Scanner   │  │ • Automated Show-Cause Notice Generator    │
│ • Client-Side Dynamic Face-Blur Privacy Filter │  │ • One-Click PMKVY Grant Disbursement Freeze│
│ • Attendance Discrepancy & Fraud Scoring       │  │ • Center Compliance Rating (0 to 100%)     │
└────────────────────────────────────────────────┘  └────────────────────────────────────────────┘
```

---

## 🎯 Official Problem Statement Requirements Traceability

| PS Requirement (Official Words) | KausalyaDrishti Implementation | Module / File |
|---|---|---|
| **Live / periodic camera feed processing** | Webcam & CCTV video stream ingestion with 30 FPS client-side AI detection. | `CameraFeedView.jsx` |
| **Cross-check attendance against centre records** | Roster verification tally: Portal Count vs AI Physical Count ➔ Ghost Trainee Alert. | `AttendanceDiscrepancyCard.jsx` |
| **Detect presence & operability of infrastructure** | Object recognition verifying sanctioned machinery (sewing machines, workbenches, CNC). | `InfraComplianceWidget.jsx` |
| **Flag discrepancies to monitoring dashboard** | Real-time red/amber discrepancy banners routed to MSDE monitoring dashboard. | `MsdeDistrictDashboard.jsx` |
| **Low-bandwidth rural deployment mode** | Edge processing transmits only 5 KB JSON metadata + violation keyframe snapshots. | `BandwidthTelemetry.jsx` |
| **Preserve trainee privacy (Aggregate presence)** | Dynamic face pixelation/blurring overlay; zero individual facial biometrics stored. | `PrivacyBlurToggle.jsx` |
| **False-positive / False-negative assessment** | Live confidence score HUD ($> 92\%$) and temporal frame smoothing filter. | `AiDetector.jsx` |

---

## ⚙️ Mathematical Discrepancy & Compliance Scoring Model

### 1. Attendance Discrepancy Ratio ($D_{\text{att}}$)
$$D_{\text{att}} = \max\left(0, \frac{N_{\text{portal}} - N_{\text{ai}}}{N_{\text{portal}}}\right) \times 100$$
* **$D_{\text{att}} > 40\%$:** 🔴 **CRITICAL GHOST TRAINEE FRAUD** (Immediate Grant Freeze Alert)
* **$15\% \le D_{\text{att}} \le 40\%$:** 🟡 **SUSPICIOUS ATTENDANCE SHORTFALL** (Flagged for Surprise Audit)
* **$D_{\text{att}} < 15\%$:** 🟢 **VERIFIED ATTENDANCE COMPLIANCE**

### 2. Infrastructure Compliance Score ($C_{\text{infra}}$)
$$C_{\text{infra}} = \left(\frac{\sum_{i=1}^{M} \min(Q_{\text{detected}, i}, Q_{\text{sanctioned}, i})}{\sum_{i=1}^{M} Q_{\text{sanctioned}, i}}\right) \times 100$$
* **$C_{\text{infra}} \ge 85\%$:** 🟢 **FULLY EQUIPPED CENTRE**
* **$60\% \le C_{\text{infra}} < 85\%$:** 🟡 **PARTIAL INFRASTRUCTURE DEFICIENCY**
* **$C_{\text{infra}} < 60\%$:** 🔴 **CRITICAL LAB SHUTDOWN ALERT**

---

## 💾 Low-Bandwidth Edge JSON Payload Format (5 KB Telemetry)

```json
{
  "centreId": "TC-KA-TUM-042",
  "centreName": "Tumakuru Kaushalya Skill Academy",
  "batchId": "PMKVY-2026-B04",
  "tradeCourse": "Apparel & Sewing Machine Operator",
  "timestamp": "2026-10-05T10:30:00Z",
  "attendance": {
    "portalRegistered": 30,
    "portalReportedPresent": 28,
    "aiVerifiedHeadcount": 8,
    "ghostTraineeCount": 20,
    "discrepancyPercentage": 71.4,
    "status": "RED_CRITICAL_DISCREPANCY"
  },
  "infrastructure": {
    "sanctionedItems": 28,
    "detectedItems": 23,
    "complianceScore": 82.1,
    "missingItems": ["Welding Kit #2", "Emergency Safety Extinguisher"]
  },
  "privacyMode": "ACTIVE_FACE_BLUR",
  "riskLevel": "RED_FRAUD_ALERT",
  "snapshotKeyframe": "data:image/webp;base64,..."
}
```

---

## 📂 Project Repository Structure (Branch: `KD`)

```
e:\trail\hac\
│
├── index.html                   # Master HTML entrypoint
├── package.json                 # React 19, Lucide Icons, Vite
├── vite.config.js               # Dev server configuration
│
├── src/
│   ├── main.jsx                 # React root mount
│   ├── App.jsx                  # Master state, portal switcher, center registry
│   ├── index.css                # CSS variables, glassmorphism, responsive layout
│   │
│   ├── components/
│   │   ├── Navbar.jsx           # Master header, mode switchers, stats counters
│   │   │
│   │   ├── edge/                # CENTRE EDGE AI PORTAL
│   │   │   ├── CameraFeedView.jsx         # Live webcam/video simulation stream
│   │   │   ├── AiDetector.jsx             # Real-time person & equipment bounding boxes
│   │   │   ├── PrivacyBlurToggle.jsx      # Canvas dynamic face pixelation overlay
│   │   │   └── BandwidthTelemetry.jsx     # 5 KB Edge JSON vs 500 MB video savings
│   │   │
│   │   ├── audit/               # COMPLIANCE AUDIT DESK
│   │   │   ├── AttendanceDiscrepancyCard.jsx # Portal vs AI count & ghost trainee alert
│   │   │   └── InfraComplianceWidget.jsx     # Sanctioned machinery checklist & score
│   │   │
│   │   └── msde/                # MSDE MINISTRY DASHBOARD
│   │       ├── MsdeDistrictDashboard.jsx     # District compliance heatmaps & KPIs
│   │       └── CentreAuditTable.jsx          # Leaderboard, show-cause notices, grant freeze
│   │
│   ├── data/
│   │   ├── centerMockData.js    # Empaneled centres, sanctioned batches & machinery
│   │   └── i18n.js              # English & Hindi/Kannada skilling terminology
│   │
│   └── services/
│       ├── complianceRules.js   # Fraud thresholds & penalty calculations
│       └── db.js                # LocalStorage/IndexedDB offline event log store
│
├── README.md                    # Project Master Documentation (this file)
├── PLAN.md                      # Senior SDE Technical & Algorithmic Blueprint
├── implement.md                 # Team Roster, Git Commands & AI Prompts (KD Branch)
└── resour/
    └── KausalyaDrishti_Solution_Plan.pdf # Formatted Vector PDF
```

---

## 🚀 Quickstart & Local Execution

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open browser at http://localhost:3000
```

---

## 🎬 3-Minute Live Hackathon Demo Script

| Elapsed | Portal Shown | Action Performed | Verified Capability |
|---|---|---|:---:|
| **0:00 – 0:45** | Centre Edge View | Launch live camera stream. AI automatically draws bounding boxes counting **6 students present**. | Real-Time Headcount |
| **0:45 – 1:15** | Attendance Desk | Pull up centre's portal upload claiming **"28 Students Present"**. Instant 🔴 **Ghost Trainee Alert (78% Fraud)** triggers. | Discrepancy Engine |
| **1:15 – 1:45** | Infra Verifier | Camera scans workshop — detects 8 sewing machines, flags **"Welding Kit #2 Missing from Bay"**. | Infrastructure Compliance |
| **1:45 – 2:15** | Privacy & Edge | Click **"Privacy Mode"** — all faces pixelate instantly. Show **5 KB JSON telemetry payload** (99.8% bandwidth savings). | Privacy & Low Bandwidth |
| **2:15 – 3:00** | MSDE Dashboard | Switch to Ministry Dashboard: Centre score drops to 32%. Click **"Freeze PMKVY Grant & Issue Notice"**. | Ministry Enforcement |

---

*KausalyaDrishti • Elite Evolvers • SIH 2026 (PS ID: 26245)*
