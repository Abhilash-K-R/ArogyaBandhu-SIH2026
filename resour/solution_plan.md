# 🏥 ArogyaBandhu (ಆರೋಗ್ಯ ಬಂಧು) — Complete Solution Plan
### SIH 2026 | PS 133 | MedTech / BioTech / HealthTech | Team — Tumakuru, Karnataka

---

## 📌 Problem Statement in One Line

> **Government of Maharashtra (PS 133):** Rural communities lack accessible, quality public healthcare due to travel barriers, offline challenges, language gaps, fragmented records, and delayed referrals.

---

## 💡 Our Solution in One Line

> **ArogyaBandhu** is an **offline-first, Kannada + English, AI-triage web app** that empowers ASHA workers to detect high-risk patients at the village level, generate instant digital referral slips, and connect them to PHC doctors — all without requiring internet connectivity.

---

## 🎯 The 14 Official PS Features — Numbered Reference

These are directly from the official PS 133 expected solution. We number them **[1] to [14]** and you will see these numbers **throughout the workflow** below showing exactly WHERE each feature is used.

| # | Feature (Official PS Words) | Our Implementation |
|---|---|---|
| **[1]** | Assisted teleconsultation | PHC Doctor "Start Tele-Consult" button per referral |
| **[2]** | Appointment & queue management | PHC referral queue sorted by severity (🔴 first) |
| **[3]** | Digital triage | ASHA enters vitals → instant 🔴🟡🟢 color-coded risk score |
| **[4]** | Longitudinal patient records | Patient history stored offline (IndexedDB) → syncs to cloud |
| **[5]** | Referral tracking | QR referral slip → PHC doctor marks status (Acted / Pending) |
| **[6]** | Diagnostic coordination | Red flags auto-routed to PHC doctor queue with full symptom summary |
| **[7]** | Medicine availability | Drug Stock Tracker — IFA, ORS, Paracetamol availability per PHC |
| **[8]** | High-risk patient follow-up | Red case follow-up queue — doctor marks "Follow-up Done" |
| **[9]** | Facility dashboards | THO Analytics — taluk-wise heatmap, case counts, shortage alerts |
| **[10]** | Frontline health worker support | ASHA Field App — the entire core mobile experience |
| **[11]** | Low-connectivity environments | Offline-first → auto-syncs when 2G/Wi-Fi detected |
| **[12]** | Multilingual interaction | 1-click toggle: full ಕನ್ನಡ ↔ English UI |
| **[13]** | Emergency escalation | "108 Arogya Kavacha Ambulance" dispatch button |
| **[14]** | Interoperable health records | ABHA ID field in patient form, ABDM-compliant schema |

---

## 🏗️ Solution Architecture — What We Are Building

### Three Portals, One System

```
┌─────────────────────────────────────────────────────────────────────┐
│                        AROGYA BANDHU SYSTEM                         │
├──────────────────┬──────────────────────┬───────────────────────────┤
│  SCREEN 1        │  SCREEN 2            │  SCREEN 3                 │
│  ASHA Field App  │  PHC Doctor Portal   │  THO District Dashboard   │
│  (Mobile View)   │  (Desktop View)      │  (Admin Analytics View)   │
│                  │                      │                           │
│  Used by:        │  Used by:            │  Used by:                 │
│  ASHA / ANM      │  PHC Medical Officer │  Taluk Health Officer     │
│  Workers at      │  at the Primary      │  at District Health       │
│  Villages        │  Health Centre       │  Office, Tumakuru         │
│                  │                      │                           │
│  Features:       │  Features:           │  Features:                │
│  [3][4][5]       │  [1][2][5][6]        │  [7][8][9]                │
│  [10][11][12]    │  [7][8][12][13][14]  │  [9][12]                  │
└──────────────────┴──────────────────────┴───────────────────────────┘
                           ↑
               Shared: [11] Offline Sync + [14] ABHA ID
```

---

## 🔁 Complete Workflow — Step by Step

### PHASE 1: ASHA Worker Visits a Home in a Village

**Setting:** ASHA worker Shantha Devi is visiting Goravanahalli village, Koratagere Taluk, Tumakuru. She has a basic Android phone. There is no internet in the village.

---

**Step 1 — Open the App (Works offline)**
- ASHA opens ArogyaBandhu on her phone (saved as a PWA / bookmark)
- App shows: 🔴 **"Offline Mode — Data will auto-save on your phone"** `[11]`
- UI is displayed in **ಕನ್ನಡ (Kannada)** by default `[12]`
- ASHA can switch to English with one tap `[12]`

---

**Step 2 — Enter Patient Details**
- ASHA fills in:
  - Patient name, age, gender, village, taluk, mobile number
  - ABHA Card ID (optional) `[14]`
- Previous visit records of this patient are shown (if visited before) `[4]`
  - Example: "Last visit: 14 Sep — Hb was 9.2 g/dL (Moderate Anaemia)"

---

**Step 3 — Choose Triage Module** `[10]`

ASHA selects which type of checkup to do:

#### 🤰 MODULE A — Maternal Health (Pregnant Women / ANC)
ASHA enters:
- Pregnancy week (gestational age)
- Blood Pressure (Systolic / Diastolic)
- Hemoglobin level (from ASHA kit)
- Is there facial/feet swelling? (Yes/No)
- Severe headache or blurred vision? (Yes/No)
- Vaginal bleeding? (Yes/No)
- Fetal movement normal? (Yes/No)

#### 👶 MODULE B — Child Health (0–5 Years)
ASHA enters:
- Child age in months
- Weight (kg)
- MUAC arm tape color (🔴 Red / 🟡 Yellow / 🟢 Green)
- Fast breathing / chest indrawing? (Yes/No)
- Child lethargic or unable to drink? (Yes/No)
- Fever duration (days)
- Vaccinations up to date? (Yes/No)

#### 🩺 MODULE C — Chronic Diseases & Infections (Adults / Elderly)
ASHA enters:
- Random Blood Sugar (RBS)
- Blood Pressure reading
- Cough duration (Under 2 weeks / More than 2 weeks)
- Chest pain or breathlessness? (Yes/No)
- Body temperature (°F)
- Night sweats or unexplained weight loss? (Yes/No)

---

**Step 4 — Instant Triage Result** `[3]`

After ASHA presses "Check Risk" — the app runs its decision logic **100% on the device** (no internet needed) and shows:

```
┌──────────────────────────────────────────────────────┐
│  🔴  HIGH RISK — URGENT REFERRAL                      │
│                                                        │
│  Patient: Lakshmi Bai (ಲಕ್ಷ್ಮೀ ಬಾಯಿ)                 │
│  34 Weeks Pregnant                                     │
│                                                        │
│  ⚠ Red Flags Detected:                                │
│  • BP: 162/104 mmHg — Severe Pre-eclampsia             │
│  • Hb: 7.2 g/dL — Severe Anaemia                      │
│  • Severe facial swelling present                      │
│                                                        │
│  → Refer to Koratagere PHC IMMEDIATELY                 │
│  → Risk of maternal death if not treated today         │
│                                                        │
│  [Generate Referral QR Slip]  [108 SOS Alert]         │
└──────────────────────────────────────────────────────┘
```

---

**Step 5 — Generate Referral Slip** `[5]`
- ASHA taps "Generate Referral QR Slip"
- A digital slip is created with:
  - Patient name, village, ASHA name, risk level, red flags found
  - QR code that the PHC doctor can scan to pull up the full record
  - WhatsApp-ready text summary in Kannada + English
- This slip is saved offline on the phone `[11]`
- Patient/family can show this at the PHC gate `[5]`

---

**Step 6 — Record Saved Offline** `[4]` `[11]`
- Full patient record is saved to the phone (IndexedDB)
- Patient visit history is updated (longitudinal record) `[4]`
- Sync status shown: *"1 record queued — will sync when online"*

---

### PHASE 2: ASHA Reaches an Area With Internet (2G/Wi-Fi)

**Step 7 — Auto Sync** `[11]`
- As soon as the phone detects any network, the app automatically pushes all offline records to the cloud
- ASHA sees: ✅ *"All 3 records synced with Tumakuru Health Cloud"*
- PHC Doctor is instantly notified of the high-risk referral `[6]`

---

### PHASE 3: PHC Doctor Opens the Dashboard

**Setting:** Dr. Ravi Kumar at Koratagere PHC opens ArogyaBandhu on his computer.

---

**Step 8 — View Incoming Referral Queue** `[2]` `[6]`
- Dashboard shows all incoming referrals sorted by severity
- 🔴 Red cases appear at the top
- Each card shows: Patient name, village, ASHA worker name, risk level, red flags, time of referral

```
INCOMING REFERRALS — KORATAGERE PHC
──────────────────────────────────────────────
🔴 Lakshmi Bai | Goravanahalli | 25 min ago
   Pre-eclampsia + Severe Anaemia — 34 weeks pregnant
   ASHA: Shantha Devi (#104)
   [View Full Record]  [Tele-Consult]  [108 Ambulance]

🟡 Saraswathi M. | Nittur | 2 hrs ago
   BP 138/88 + Moderate Anaemia — 26 weeks pregnant
   ASHA: Geetha Kumari (#015)
   [View Full Record]  [Tele-Consult]  [Prescribe]
──────────────────────────────────────────────
```

---

**Step 9 — Doctor Takes Action**

For **🔴 Red case (Lakshmi Bai)**:
- Doctor clicks **[Tele-Consult]** → video/voice call with ASHA who is with the patient `[1]`
- After assessment, doctor clicks **[Send 108 Ambulance]** `[13]`
- Doctor adds notes → saved to patient's longitudinal record `[4]`
- Referral status updates from "Pending" → "Ambulance Dispatched" `[5]`

For **🟡 Yellow case (Saraswathi)**:
- Doctor clicks **[Tele-Consult]** `[1]`
- Schedules a PHC appointment for 2 days later `[2]`
- Issues e-Prescription (Iron + Folic Acid) `[6]`
- ASHA is notified to bring patient on that date

---

**Step 10 — Check Medicine Stock** `[7]`
- Doctor sees alert: *"⚠ IFA Tablets stock at 42% — Reorder required (Koratagere PHC)"*
- Sends stock request to Taluk supply chain through the dashboard `[7]`

---

**Step 11 — Follow-up Queue** `[8]`
- Doctor's dashboard shows a "Follow-up Due" section
- *"Lakshmi Bai — Post-delivery follow-up due today (7 days after delivery)"*
- ASHA is sent a follow-up reminder alert on her app `[8]`

---

### PHASE 4: Taluk Health Officer (THO) Opens Analytics

**Setting:** THO Srinivas Murthy at Tumakuru District Health Office

---

**Step 12 — District Analytics Dashboard** `[9]`
- Sees a taluk-wise heatmap of Tumakuru district
- Pavagada shows 29 red cases this month (highest — fluoride + anaemia issues)
- Koratagere shows spike in maternal high-risk cases
- Madhugiri is running critically low on Paracetamol syrup

---

**Step 13 — Medicine Shortage Alerts** `[7]` `[9]`
- Dashboard lists all PHCs with stock below minimum threshold
- THO can issue emergency supply orders directly from the dashboard

---

**Step 14 — Quality Monitoring** `[9]`
- Tracks referral completion rate: *"How many 🔴 Red cases referred by ASHA actually reached the PHC?"*
- Average triage time per ASHA worker
- Follow-up completion rate for maternal and child cases `[8]`

---

## 📱 Screen-by-Screen Summary

### Screen 1 — ASHA Field App (Mobile)
| Section | Features Covered |
|---|---|
| Language toggle (ಕನ್ನಡ ↔ English) | `[12]` |
| Offline mode indicator + sync status | `[11]` |
| Patient details form + ABHA ID | `[14]` |
| Previous visit history shown | `[4]` |
| Triage Module A / B / C tabs | `[10]` |
| Vitals input form | `[3]` |
| Instant risk result (🔴🟡🟢) | `[3]` |
| Referral QR Slip generator | `[5]` |
| Save record button | `[4]` `[11]` |

### Screen 2 — PHC Doctor Portal (Desktop)
| Section | Features Covered |
|---|---|
| Incoming referral queue (sorted by severity) | `[2]` `[6]` |
| Patient full record view | `[4]` |
| Tele-Consult button | `[1]` |
| Prescribe & Schedule appointment | `[2]` |
| Referral status update tracker | `[5]` |
| Follow-up due queue | `[8]` |
| 108 Ambulance dispatch button | `[13]` |
| Medicine stock shortage alerts | `[7]` |
| Language toggle | `[12]` |

### Screen 3 — THO District Dashboard (Admin)
| Section | Features Covered |
|---|---|
| Taluk-wise heatmap (Tumakuru District) | `[9]` |
| Case count by risk level per taluk | `[9]` |
| Medicine availability table per PHC | `[7]` |
| Referral completion & follow-up rates | `[8]` `[9]` |
| Language toggle | `[12]` |

---

## 🎬 Live Demo Script (3 Minutes)

> **"Watch a patient's life being saved in 3 minutes"**

| Time | What You Show | Feature # |
|---|---|---|
| **0:00** | Open ASHA App — it's offline, Kannada UI showing | `[11]` `[12]` |
| **0:20** | Enter Lakshmi Bai's details — 34 weeks pregnant, high BP, swelling | `[3]` `[14]` |
| **0:50** | Press "Check Risk" → 🔴 RED ALERT appears instantly on screen | `[3]` |
| **1:00** | Generate QR Referral Slip → show the slip on screen | `[5]` |
| **1:15** | Turn network back on → *"Syncing…" → "✅ Synced!"* | `[11]` |
| **1:30** | Switch to PHC Doctor Dashboard → referral arrives at top of queue | `[2]` `[6]` |
| **1:50** | Doctor clicks "108 Ambulance Dispatch" | `[13]` |
| **2:10** | Show Medicine stock alert — IFA tablets low | `[7]` |
| **2:25** | Switch to THO Dashboard → Pavagada taluk heatmap glowing red | `[9]` |
| **2:45** | Switch UI to ಕನ್ನಡ — entire screen flips to Kannada | `[12]` |
| **3:00** | Done — all 14 PS features demonstrated ✅ | ALL |

---

## 🙋 Judges' Q&A — Answers Ready

**Q1: Who is your exact user?**
> Primary: ASHA / ANM workers doing door-to-door health surveys in rural Tumakuru villages. Secondary: PHC Medical Officers and Taluk Health Officers at government facilities.

**Q2: What does this solve that RCH app or Poshan Tracker doesn't?**
> Existing government apps are **compliance reporting tools** — ASHAs fill forms AFTER a visit to report data. Our app is a **real-time clinical decision support tool** — it tells the ASHA worker DURING the visit what action to take, and it works WITHOUT internet.

**Q3: How does it work without internet?**
> All triage logic runs locally on the device using JavaScript. Patient records are stored in the browser's IndexedDB (like a mini local database). When any network is detected (even 2G), it automatically pushes all queued records to the PHC server.

**Q4: How is patient data kept private?**
> ABHA ID (Ayushman Bharat Health Account) compliant schema. On-device encrypted local storage. Only health workers can access records. Role-based access: ASHA sees only their patients, PHC doctor sees only their PHC's referrals, THO sees aggregate data.

**Q5: How will this actually reach villages?**
> ASHAs already carry smartphones for NHM programs. This is a Progressive Web App (PWA) — no installation needed, just open a link and save to home screen. Training takes 15 minutes using the icon-driven Kannada UI. Can be deployed by NHM Karnataka with zero infrastructure change.

**Q6: How does it strengthen (not replace) the public health system?**
> Every action in our app goes THROUGH the existing system — ASHA → PHC Doctor → Referral Hospital → THO monitoring. We add decision support and digital connectivity to the existing NHM hierarchy. We don't bypass any government process.

---

## 🛠️ Tech Stack (Recommended)

| Layer | Technology | Why |
|---|---|---|
| **Frontend** | Vanilla HTML5 + CSS3 + JavaScript | Zero setup, runs instantly, no crashes |
| **Offline Storage** | Browser IndexedDB / LocalStorage | No backend needed for offline mode |
| **QR Code** | qrcode.js (CDN library) | Generate referral QR on-device |
| **Charts & Heatmap** | Chart.js (CDN) | District analytics dashboard |
| **Language** | JS translation object (en/kn) | Instant Kannada ↔ English toggle |
| **Sync Simulation** | setTimeout + fetch mock | Demo offline→online sync |
| **Design** | CSS Variables + Google Fonts (Noto Sans Kannada) | Proper Kannada font rendering |

---

## ⏱️ 6-Hour Build Timeline

| Time | Task | Team Members |
|---|---|---|
| **9:00 – 9:30** | Setup folder, base HTML, CSS design system, navigation | 1–2 people |
| **9:30 – 11:00** | Build ASHA Field App — Patient form, Triage Modules A/B/C, Risk Score Logic | 2–3 people |
| **11:00 – 11:30** | Kannada/English language toggle + offline mode indicator | 1 person |
| **11:30 – 12:30** | QR Referral Slip generator, mock sync animation | 1 person |
| **12:30 – 1:30** | PHC Doctor Dashboard — Referral queue, tele-consult button, 108 button | 1–2 people |
| **1:30 – 2:00** | THO District Dashboard — Heatmap (Chart.js), medicine stock table | 1 person |
| **2:00 – 2:30** | Seed realistic Tumakuru mock data (patient names, villages, taluks) | 1 person |
| **2:30 – 3:00** | Demo rehearsal, bug fixes, polish | Full team |

---

## 🏆 Why This Will Win

1. **Covers all 14 PS features** — No other team will have this completeness
2. **Working prototype, not a presentation** — Live demo of real offline→sync flow
3. **Karnataka/Tumakuru context** — Local village names, Kannada language, 108 Arogya Kavacha
4. **Clinically meaningful** — Triage logic is based on WHO/NHM clinical protocols (Pre-eclampsia, SAM, TB screening)
5. **Government-deployable** — Realistic, affordable, trains in 15 minutes, works on ₹6,000 phone

---

*ArogyaBandhu | SIH 2026 | PS 133 | Team — Tumakuru Institute of Technology*
*"Strengthening — not replacing — the public health system"*
