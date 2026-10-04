# 📋 KausalyaDrishti — Senior SDE Engineering Execution & Technical Specification Plan (PLAN.md)
> **Document Version:** 1.0.0-MSDE-PROD  
> **Status:** Approved for Implementation (Branch: `KD`)  
> **Target Event:** Smart India Hackathon 2026 (PS ID: 26245)  
> **Ministry:** Ministry of Skill Development and Entrepreneurship (MSDE)  
> **Theme:** Smart Education & Skilling Governance  
> **Team Name:** Elite Evolvers  
> **Target Stack:** React 19 (Vite) + TensorFlow.js / Object Detection Canvas + HTML5 Canvas Filters + Lucide Icons + Tailwind/CSS Tokens  

---

## 📌 1. System Engineering Objectives

1. **Deterministic Edge Verification:** Video frame evaluation and person/equipment headcount must execute locally at $\ge 25\text{ FPS}$ with zero cloud processing latency.
2. **Ghost Trainee Elimination:** Continuous cross-referencing between official portal attendance claims and physical headcounts over active batch hours.
3. **Infrastructure Integrity Audit:** Real-time detection and count validation of mandatory approved skilling assets (e.g., Sewing Machines, Computer Desks, Welding Kits).
4. **Non-Invasive Trainee Privacy:** Full DPDP Act compliance through aggregate presence detection and client-side face pixelation before keyframe storage.
5. **Ultra-Low Bandwidth Footprint:** Edge-computed metadata telemetry ($\le 5\text{ KB}$ JSON packets) transmitted over periodic intervals instead of expensive 24/7 video streaming.

---

## 🏗️ 2. Architectural Pipeline & Component Breakdown

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

## ⚙️ 3. Mathematical Models & Fraud Detection Algorithms

### 3.1 Attendance Discrepancy Index ($D_{\text{att}}$)

Given:
* $N_{\text{portal}}$: Number of trainees marked present on the centre portal.
* $N_{\text{ai}}$: Verified physical person headcount detected over the sampling window.

$$D_{\text{att}} = \begin{cases} 
0 & \text{if } N_{\text{ai}} \ge N_{\text{portal}} \\ 
\left(\frac{N_{\text{portal}} - N_{\text{ai}}}{N_{\text{portal}}}\right) \times 100 & \text{if } N_{\text{ai}} < N_{\text{portal}} 
\end{cases}$$

#### Triage Classification:
* **$D_{\text{att}} > 40\%$ (RED ALERT):** Critical Ghost Trainee Scam $\rightarrow$ Automated Show-Cause Notice & Grant Hold.
* **$15\% \le D_{\text{att}} \le 40\%$ (YELLOW WARNING):** Significant Discrepancy $\rightarrow$ Flagged for Surprise Physical Inspection.
* **$D_{\text{att}} < 15\%$ (GREEN PASS):** Normal Operational Variance $\rightarrow$ Verified Attendance.

---

### 3.2 Infrastructure Compliance Score ($C_{\text{infra}}$)

For a centre with $M$ sanctioned equipment categories where each category $i$ has sanctioned quantity $Q_{\text{sanctioned}, i}$ and detected quantity $Q_{\text{detected}, i}$:

$$C_{\text{infra}} = \left(\frac{\sum_{i=1}^{M} \min(Q_{\text{detected}, i}, Q_{\text{sanctioned}, i})}{\sum_{i=1}^{M} Q_{\text{sanctioned}, i}}\right) \times 100$$

* **$C_{\text{infra}} \ge 85\%$ (GREEN):** Lab Fully Operational & Compliant.
* **$60\% \le C_{\text{infra}} < 85\%$ (YELLOW):** Minor Equipment Deficit.
* **$C_{\text{infra}} < 60\%$ (RED):** Critical Infrastructure Breach $\rightarrow$ Lab Decertification Alert.

---

### 3.3 Composite Centre Compliance Rating ($R_{\text{centre}}$)

$$R_{\text{centre}} = 0.6 \times (100 - D_{\text{att}}) + 0.4 \times C_{\text{infra}}$$

---

## 🔒 4. Privacy-Preserving Face Anonymization Algorithm

To comply strictly with the Digital Personal Data Protection (DPDP) Act:
1. When a person is detected with bounding box $[x, y, w, h]$:
2. The facial sub-region $[x + 0.2w, y, 0.6w, 0.35h]$ is extracted onto an offscreen canvas.
3. A Gaussian blur or $8\times 8$ pixelation rasterization is applied directly to the image buffer before any snapshot is saved or transmitted.
4. **Zero biometric facial embeddings** or individual facial features are ever stored in the database.

---

## 💾 5. Data Schemas & Telemetry Payloads

### 5.1 Training Centre Profile Schema (`CenterRecord`)
```typescript
interface CenterRecord {
  centerId: string;           // "TC-KA-TUM-042"
  name: string;               // "Tumakuru Kaushalya Skill Academy"
  state: string;              // "Karnataka"
  district: string;           // "Tumakuru"
  taluk: string;              // "Koratagere"
  scheme: "PMKVY_4.0" | "DDU_GKY" | "NAPS";
  activeBatches: {
    batchId: string;          // "PMKVY-2026-B04"
    courseName: string;       // "Apparel & Sewing Machine Operator"
    sanctionedStrength: number; // 30
    reportedAttendance: number; // 28
    batchTime: string;        // "09:00 AM - 01:00 PM"
  }[];
  sanctionedEquipment: {
    itemId: string;
    itemName: string;         // "Industrial Sewing Machine"
    sanctionedQty: number;    // 10
    detectedQty: number;      // 6
    unitCost: number;         // 18000
    status: "OK" | "DEFICIT";
  }[];
  currentStats: {
    lastHeadcount: number;    // 8
    discrepancyPercent: number; // 71.4
    infraCompliance: number;  // 82.1
    overallScore: number;     // 38.5
    status: "RED_FRAUD" | "YELLOW_WARNING" | "GREEN_COMPLIANT";
  };
}
```

---

## 🛠️ 6. Sprint Implementation Milestones (6-Hour Build Plan)

```
┌──────────────┬────────────────────────────────────────────────────────┬──────────────────┐
│ Time Window  │ Core Deliverables                                      │ Assigned Owners  │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 00:00--00:45 │ Foundation: KD Branch setup, React+Vite layout,        │ Lead Architect   │
│              │ CSS tokens, navbar, center registry mock data.         │ (Abhilash)       │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 00:45--02:15 │ Edge Detection & Viewport: Camera feed, AI person      │ Anjandri         │
│              │ counting, bounding box render, equipment scanner.      │ & Keerthana      │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 02:15--03:15 │ Audit & Discrepancy Engine: Roster cross-check card,   │ Lakshmikanth     │
│              │ Ghost trainee math, Sanctioned machinery checklist.    │ & Laxuman        │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 03:15--04:30 │ Privacy & Low-Bandwidth: Canvas face-blur filter,      │ Laxuman          │
│              │ 5 KB JSON edge telemetry generator, MSDE dashboard.    │ & Naveen         │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 04:30--05:15 │ Master Merge & Integration: Abhilash merges branches,  │ Abhilash         │
│              │ verifies all props, connects state store.              │ & Lead Team      │
├──────────────┼────────────────────────────────────────────────────────┼──────────────────┤
│ 05:15--06:00 │ QA, Demo Rehearsal & Live Judging Pitch Preparation.   │ Full Team        │
└──────────────┴────────────────────────────────────────────────────────┴──────────────────┘
```

---

## 🧪 7. Quality Assurance & Edge Case Test Matrix

| Test ID | Scenario Description | Expected System Behavior | Pass Criteria |
|---|---|---|:---:|
| **TC-01** | Live webcam feed with 3 people in room while portal claims 25. | Triggers instant 🔴 RED GHOST TRAINEE ALERT (88% Discrepancy). | ✅ PASS |
| **TC-02** | Toggle Privacy Blur button ON. | All trainee faces immediately pixelate in real-time on canvas stream. | ✅ PASS |
| **TC-03** | 4 out of 10 sanctioned sewing machines removed from camera bay. | Infrastructure Compliance score drops from 100% to 60%; flags deficit. | ✅ PASS |
| **TC-04** | Disconnected network edge mode. | Local telemetry queues up in LocalStorage/IndexedDB; syncs 5 KB payload on reconnect. | ✅ PASS |
| **TC-05** | MSDE Officer clicks "Freeze Grant Disbursement". | Center status updates to "FUNDS_FROZEN" with official show-cause notice generated. | ✅ PASS |

---

*KausalyaDrishti Technical Specification • Team Elite Evolvers • SIH 2026*
