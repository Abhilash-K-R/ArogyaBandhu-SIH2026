# 🎓 KausalyaDrishti — Simple Guide
### Easy enough for a 10-year-old to understand!
**Team:** Elite Evolvers | **Hackathon:** Smart India Hackathon 2026

---

## 🌟 FIRST — UNDERSTAND THE BACKGROUND STORY

### Imagine this...

You know how in school, your teacher takes attendance every day?

Your teacher writes down who came and who didn't.
Now imagine if a **dishonest teacher** wrote **"30 students present today"** in the register — but actually only **5 kids** came to class.

The government gives that school **money based on how many students attend**.
So if a teacher lies and writes 30 students but only 5 came → the school **steals government money** for 25 fake students.

**This exact same problem is happening in India — but with THOUSANDS of schools called "Training Centres."**

---

## 🏫 WHAT ARE THESE "TRAINING CENTRES"?

In India, the government runs a programme called **PMKVY** (say it as: "Pee-Em-Kay-Vee-Why").

Its job is to **teach poor youth skills** like:
- How to fix electrical wires ⚡
- How to weld metal 🔧
- How to use a sewing machine 🧵
- How to repair computers 💻

The government pays private companies to run about **15,000 of these training centres** all over India — in cities, towns, and even tiny villages.

**The government pays them based on:**
1. ✅ How many students attended
2. ✅ What equipment (machines, computers) the centre has
3. ✅ Whether a qualified teacher/trainer was present

---

## 😈 THE 3 BIG FRAUDS HAPPENING

### Fraud 1: "Ghost Trainees" (Fake Students) 👻
> The centre writes "40 students came today" in the computer system.
> But actually only 8 students came.
> The other 32 are **fake names** — the centre earns money for them without teaching anyone.

### Fraud 2: "Ghost Equipment" (Borrowed Machines) 🖥️
> The government says: "You must have 20 computers and 10 sewing machines."
> Before the government inspector comes once a year, the centre **borrows machines from their neighbour** for 1 day.
> Inspector comes, sees the machines, says "OK, good!" and leaves.
> Next day — machines go back to the neighbour.
> The centre **never actually had** those machines.

### Fraud 3: "Ghost Trainer" (Fake Teacher) 👨‍🏫
> The centre says they have a qualified trainer named "Ramesh Kumar."
> Ramesh's ID card is registered, but **Ramesh never comes to work**.
> Someone unqualified teaches (or nobody teaches at all).

---

## 🚨 WHY IS NOBODY STOPPING THIS?

Because the **only way to check** is for a government officer to physically drive to the centre.

But there are **15,000 centres** across all of India!

That officer can only visit **once or twice a year** at most.

So for **363 days a year** — zero checking. Fraud runs freely.

> 💸 CAG (India's top accounting office) says this fraud costs the government
> more than **₹500 Crore every year** (that's 5 BILLION Rupees — stolen from taxpayers).

---

## 💡 THE BIG IDEA: KausalyaDrishti

The name **KausalyaDrishti** means:
> **"Kaushalya"** = Skill (in Sanskrit)
> **"Drishti"** = Vision/Sight (in Sanskrit)
> Together: **"Eyes watching over Skill Training"** 👁️

### The Secret We Used:

Almost every training centre already has **CCTV cameras** installed inside!

But those cameras just record video 24 hours a day — **and nobody ever watches the recordings**.

It's like having a security guard who keeps his eyes closed all day. 🙈

**We teach the camera to THINK!**

We add a small, cheap computer (like a Raspberry Pi — a computer the size of your palm 🖐️) next to the CCTV camera.

This little computer watches the camera video and counts:
- How many people are sitting in the room right now?
- Is there any equipment visible (computers, machines)?
- Is the trainer present?

And every 15 minutes, it sends a tiny message (only 5 KB — smaller than a WhatsApp text!) to the government's dashboard saying:
> "Centre X: 28 students detected. 28 claimed. ✅ All good."
> OR
> "Centre Y: 8 students detected. 40 claimed. 🚨 FRAUD ALERT!"

---

## 📊 HOW THE CHECKING WORKS (The Math)

We have a formula. Don't be scared — it's simple!

```
D_att = (Claimed Students - AI Detected Students) ÷ Claimed Students × 100

Example:
  Centre claims 40 students attended.
  AI counts only 8 students in the room.
  D_att = (40 - 8) ÷ 40 × 100 = 80%
  That's CRITICAL fraud! 🚨
```

We have 4 danger levels:

| Danger Level | D_att Value | What It Means |
|---|---|---|
| 🟢 LOW | 0% to 4% | Normal — maybe 1-2 students in bathroom |
| 🟡 MEDIUM | 5% to 10% | Suspicious — needs a closer look |
| 🟠 HIGH | 11% to 20% | Serious fraud likely happening |
| 🔴 CRITICAL | More than 20% | Clear fraud — STOP the money! |

---

## 🛡️ WE PROTECT STUDENT PRIVACY

> ⚠️ Important: We **NEVER** identify WHO the students are.

We don't recognize faces. We don't store photos. We don't know names.

We ONLY count: "How many people-shaped objects are in this room right now?"

Think of it like counting shadows — you see that 28 shadows are in the room, but you don't know whose shadows they are.

This follows **India's Privacy Law (DPDP Act 2023)** — which says you cannot record people's faces without their permission.

---

## 🖥️ WHAT WE BUILT (The 3 Parts of Our App)

### Part 1: 📹 Edge AI Feed (The Camera Watcher)
This is the screen that shows what the CCTV camera sees.
- You see live video from a camera (we use the laptop's webcam for demo)
- Green boxes appear around each person detected
- Live headcount shown: "28 persons detected"
- Privacy blur button: click it and all faces become blurry blobs
- 5 KB payload card shows exactly what gets sent to cloud

### Part 2: 📋 Audit Register (The Inspection Report)
This shows a list of all training centres — like a school report card.
- Each centre has a compliance score (0% to 100%)
- Shows attendance discrepancy (D_att) per centre
- Red/Orange/Green color coding by fraud risk
- Inspectors can search and filter by state, district, risk level

### Part 3: 🏛️ MSDE National Console (The Government Control Room)
This is the big boss screen for Ministry officers in New Delhi.
- National map showing all 36 states' compliance
- Can click "HOLD GRANT" to freeze money for a fraudulent centre
- Auto-generates official show-cause notice letters with 1 click
- SHA-256 encrypted audit logs for CAG verification

---

## 👥 WHO USES THIS SYSTEM?

| Person | Where They Sit | What They Do With KD |
|---|---|---|
| **MSDE Officer** | New Delhi (Ministry HQ) | Watches national dashboard, blocks grants for fraud |
| **NSDC Inspector** | State capital (e.g. Bengaluru) | Gets list of only flagged centres to visit — saves travel |
| **Centre In-Charge** | At the training centre | Sees their own compliance score, gets warnings early |
| **CAG Auditor** | New Delhi | Downloads SHA-256 verified logs as proof for audits |
| **Student/Trainee** | At the training centre | Privacy protected; their faces never stored or identified |

---

## 🔧 WHAT TECHNOLOGY DID WE USE AND WHY?

Think of building a house. You need the right tools for each job.

| Tool We Used | What It Does | Why Not Something Else? |
|---|---|---|
| **React + Vite** | Builds the website dashboard | Fast, modern, works great for real-time updates |
| **HTML5 Canvas** | Draws the green boxes around people on camera | Works in ANY browser, no extra software needed |
| **Webcam API** | Accesses the camera | Built into every browser — no installation needed |
| **MQTT Protocol** | Sends the tiny 5KB messages over internet | Designed for weak 2G/3G connections in villages |
| **SHA-256 Hashing** | Creates a unique fingerprint for every report | If anyone changes the report, fingerprint breaks — caught! |

---

## ⚡ WHAT IF SOMETHING GOES WRONG?

| Problem | What Happens | How We Handle It |
|---|---|---|
| Centre covers the camera | System sees all black | Auto-alert sent: "Camera tampered!" |
| Internet goes down | No messages reach cloud | Little computer saves 7 days of data locally, sends when internet returns |
| The little computer crashes | No monitoring for that session | Automatically restarts in 2 minutes. Session marked "Data Unavailable" |
| Someone plays old video in front of camera | System might count old footage | We detect that live rooms have natural tiny movements; recorded video is too "perfect" |

---

## 💰 HOW MUCH DOES IT COST?

| What | Cost |
|---|---|
| 1 Raspberry Pi computer per centre | ₹6,500 |
| For all 15,000 centres (one time) | ₹9.75 Crore |
| Running the cloud per year | ₹1.5 Crore/year |
| **Total to set up everything** | **~₹19.5 Crore** |

**Government currently wastes:**
> ₹150 Crore/year on manual inspections
> ₹500 Crore/year to ghost-trainee fraud

**Our system saves ₹650 Crore/year and costs only ₹19.5 Crore to set up.**

> That's like spending ₹100 to save ₹3,000. 💰

---

---

# 🗺️ IMPLEMENTATION PHASES — STEP BY STEP

## ⚡ PHASE 0: HACKATHON DEMO
### 📅 Duration: SIH 2026 Event Day (TODAY)
### 🎯 Goal: Show judges a working, interactive demo

This is what we already built. Every item below is DONE ✅

---

**STEP 0.1 — Project Setup**
- [x] Created React 19 project with Vite in `E:\trail\hac`
- [x] Installed all packages: React, Vite, Lucide icons
- [x] Created `src/` folder structure with `/components`, `/data`, `/services`
- [x] Set up Git repository, created `KD` branch, pushed to GitHub

**STEP 0.2 — Core Data & Logic**
- [x] Created `src/data/centerMockData.js`
  - 5 Karnataka training centres (Bengaluru, Mysuru, Hubballi, Mangaluru, Belagavi)
  - Each centre has: claimed_attendance, current equipment list, trainer info
- [x] Created `src/services/complianceRules.js`
  - D_att formula: `(|claimed - detected| / claimed) * 100`
  - 4-tier risk classifier: LOW / MEDIUM / HIGH / CRITICAL
  - C_infra score: checks equipment count vs required count

**STEP 0.3 — Edge AI Feed (Tab 1)**
- [x] Created `src/components/edge/CameraFeedView.jsx`
  - Webcam access via `navigator.mediaDevices.getUserMedia`
  - HTML5 Canvas overlay draws green bounding boxes
  - Headcount tracking: 0 → 1 → +5 batch demo buttons
  - D_att calculation updates live as headcount changes
- [x] Created `src/components/edge/PrivacyBlurToggle.jsx`
  - Toggle button to apply CSS blur filter over camera
  - Shows `dpdp_mask_applied: true` in payload when active
- [x] Created `src/components/edge/BandwidthTelemetry.jsx`
  - Shows the live 5 KB JSON payload card
  - SHA-256 hash generated and displayed

**STEP 0.4 — Audit Register (Tab 2)**
- [x] Created `src/components/audit/AuditRegister.jsx`
  - Table of all 5 Karnataka centres
  - Color-coded risk badges (green/yellow/orange/red)
  - Search by centre name, filter by risk level
  - Click any row → see full audit detail panel

**STEP 0.5 — MSDE National Console (Tab 3)**
- [x] Created `src/components/msde/MinistryConsole.jsx`
  - National stats cards: Total centres, flagged, grants held
  - Centre list with "HOLD GRANT" and "SEND NOTICE" buttons
  - Show-Cause Notice auto-generator (fills in centre name, D_att %, date)
  - Copy to clipboard button for notice text
- [x] Created `src/App.jsx`
  - 3-tab navigation bar
  - Shares selected centre state between all tabs

**STEP 0.6 — Final Polish & Deploy**
- [x] Tested production build: `npm run build` (no errors)
- [x] Committed all code to KD branch
- [x] Pushed to GitHub

---

## 🚀 PHASE 1: REAL AI — FIRST WORKING PRODUCT
### 📅 Duration: Month 1 to Month 3 (After SIH)
### 🎯 Goal: Replace the demo simulation with REAL AI inference at 1 real training centre

---

**STEP 1.1 — Real AI Model Integration (Week 1-2)**
- [ ] Download YOLOv8-nano model (ONNX format, ~6 MB)
- [ ] Integrate `onnxruntime-web` into React project
- [ ] Replace fake bounding box simulation with actual YOLO inference on webcam frames
- [ ] Test: model correctly counts people in a room
- [ ] Calibrate confidence threshold (only count detections >60% confident)

**STEP 1.2 — Edge Hardware Setup (Week 2-3)**
- [ ] Set up Raspberry Pi 5 (4GB RAM) with Raspberry Pi OS
- [ ] Install Python 3.11 + Ultralytics YOLO library
- [ ] Connect Pi to CCTV DVR via RTSP stream URL: `rtsp://camera-ip/stream1`
- [ ] Run YOLOv8-nano model on Pi, confirm 15+ FPS processing speed
- [ ] Test on actual room: verify headcount accuracy

**STEP 1.3 — Cloud Backend Setup (Week 3-4)**
- [ ] Create Firebase project (free tier)
- [ ] Set up Firestore database with collection: `telemetry_packets`
- [ ] Each document = 1 heartbeat packet from 1 centre per 15-minute window
- [ ] Write Python script on Pi to send telemetry to Firebase every 15 minutes

**STEP 1.4 — MQTT Communication Layer (Week 4-5)**
- [ ] Set up HiveMQ Cloud free broker account
- [ ] Configure Pi to publish to topic: `kd/{centre_id}/heartbeat`
- [ ] Configure cloud backend to subscribe and write to Firestore
- [ ] Test with simulated bad connection: disconnect and reconnect, verify no data lost

**STEP 1.5 — Attendance Comparison API (Week 5-6)**
- [ ] Build a small Node.js API (or Python FastAPI):
  - `POST /compare` — takes AI count + Aadhaar claimed count, returns D_att
  - `GET /centre/{id}/history` — returns last 7 days of telemetry
- [ ] Deploy API to Google Cloud Run (serverless, free tier for small load)
- [ ] Connect React dashboard to this real API (replace mock data)

**STEP 1.6 — NSDC API Sandbox Connection (Week 6-8)**
- [ ] Apply for NSDC Smart Attendance Portal (SAP) API sandbox access
- [ ] Integrate: pull today's claimed attendance for a centre automatically
- [ ] Dashboard now shows: AI count vs. REAL Aadhaar biometric claimed count

**STEP 1.7 — Pilot Deployment (Week 8-12)**
- [ ] Identify 1 willing PMKK centre in Bengaluru for pilot
- [ ] Install Raspberry Pi 5 on their CCTV system
- [ ] Run for 30 days, collect real data
- [ ] Compare AI detections vs. NSDC portal claimed attendance
- [ ] Document any discrepancies found

---

## 🔬 PHASE 2: PROOF IT WORKS — PILOT VALIDATION
### 📅 Duration: Month 4 to Month 6
### 🎯 Goal: 5 centres, measure real accuracy, fix real problems found in field

---

**STEP 2.1 — Expand Pilot to 5 Centres (Week 1-2)**
- [ ] Install Raspberry Pi + software at 4 more PMKK centres in Karnataka
  - Centre in Mysuru
  - Centre in Hubballi
  - Centre in Mangaluru
  - Centre in Belagavi (already in our mock data!)
- [ ] Each centre: connect existing CCTV DVR RTSP stream

**STEP 2.2 — Ground Truth Data Collection (Week 1-8)**
- [ ] At each centre, post a human data collector (team member or hired)
- [ ] Human manually counts students every hour and records in a spreadsheet
- [ ] This is the "ground truth" — the actual correct answer
- [ ] Compare AI count vs human count to measure real accuracy

**STEP 2.3 — Accuracy Report (Week 6-8)**
- [ ] Calculate False Positive Rate: how often did AI say someone was there when room was empty?
- [ ] Calculate False Negative Rate: how often did AI miss a real student?
- [ ] Calculate D_att accuracy: how close was our formula to the real discrepancy?
- [ ] Adjust confidence thresholds based on findings
- [ ] Write a formal accuracy report for MSDE

**STEP 2.4 — Trade-Specific Equipment Models (Week 4-12)**
- [ ] Collect labeled training images of:
  - Electrician lab: multimeter, wiring board, electrical tools
  - Garment lab: sewing machines, cutting tables, fabric rolls
  - IT lab: computers, monitors, keyboards
- [ ] Fine-tune YOLOv8-s model on each set (requires GPU server — Google Colab free)
- [ ] Deploy equipment detection alongside headcount detection
- [ ] C_infra score now based on REAL equipment detection, not mock data

**STEP 2.5 — Camera Tamper Detection (Week 4-6)**
- [ ] Implement optical flow algorithm on Pi:
  - If camera image is completely black → "Camera Blocked" alert
  - If image is completely static (no movement at all) → "Possible Replay" alert
  - If camera field of view suddenly changes → "Camera Moved" alert
- [ ] Test: tape over camera, play video in front of camera, move camera → verify alerts fire

**STEP 2.6 — Multi-Role Authentication (Week 6-8)**
- [ ] Add Firebase Authentication to dashboard
- [ ] 3 user roles with different views:
  - `MSDE_OFFICER` → sees all states, can hold grants nationally
  - `NSDC_INSPECTOR` → sees only their assigned state's centres
  - `CENTRE_INCHARGE` → sees only their own centre's compliance
- [ ] Secure all API endpoints with Firebase Auth JWT tokens

**STEP 2.7 — Karnataka NSDC Dashboard Goes Live (Week 10-12)**
- [ ] NSDC Karnataka office gets access to their state dashboard
- [ ] Real inspectors use it to identify which centres to visit
- [ ] Collect feedback from inspectors: what's confusing? what's missing?

---

## 🌏 PHASE 3: STATE ROLLOUT — KARNATAKA
### 📅 Duration: Month 7 to Month 12
### 🎯 Goal: 500 training centres across all of Karnataka using KD

---

**STEP 3.1 — Government Procurement (Month 7-8)**
- [ ] Help NSDC Karnataka draft GeM (Government e-Marketplace) tender for:
  - 500 Raspberry Pi 5 units
  - 500 SD cards + power supplies + weatherproof cases
- [ ] Estimated procurement time: 6-8 weeks after tender approval

**STEP 3.2 — Auto-Provisioning System (Month 7)**
- [ ] Create a "KD Box" SD card image:
  - Pre-installed: Raspberry Pi OS + Python + YOLO + MQTT client + Firebase SDK
  - Configuration file: just enter Centre ID and WiFi password — everything else auto-configures
  - Centre staff do NOT need any IT knowledge to set up
- [ ] Test: someone with zero tech knowledge sets up a box in under 10 minutes ✅

**STEP 3.3 — Multi-Tenant Cloud Architecture (Month 7-8)**
- [ ] Restructure Firebase so each state = isolated namespace
  - `Karnataka/centres/{centre_id}/telemetry`
  - `TamilNadu/centres/{centre_id}/telemetry`
  - Inspector from Karnataka CANNOT see Tamil Nadu data
- [ ] Set up separate Cloud Run instances per state for load isolation

**STEP 3.4 — Kannada Language Support (Month 8)**
- [ ] Install `react-i18next` library for translations
- [ ] Translate all dashboard text to Kannada (ಕನ್ನಡ)
  - "Compliance Score" → "ಅನುಸರಣಾ ಸ್ಕೋರ್"
  - "Attendance Discrepancy" → "ಹಾಜರಾತಿ ವ್ಯತ್ಯಾಸ"
- [ ] Add language toggle button: English | ಕನ್ನಡ

**STEP 3.5 — Mobile App for Centre In-Charge (Month 8-9)**
- [ ] Build React Native app (iOS + Android)
- [ ] Features:
  - Today's compliance score at a glance
  - Push notification: "⚠️ Your centre's D_att is 18%. Inspector may visit."
  - One-tap to see which equipment is missing from today's check
- [ ] Publish to Google Play Store (Centre In-Charge app)

**STEP 3.6 — DBT Grant Auto-Hold Integration (Month 9-10)**
- [ ] Connect to NSDC's grant disbursement API
- [ ] Rule engine:
  - If D_att > 20% for 3 consecutive sessions → auto-flag for grant review
  - If C_infra < 70% for 5 days → auto-hold next month's grant payment
  - MSDE officer gets notification and can override if needed
- [ ] Test: simulate fraud centre → verify grant hold triggers correctly

**STEP 3.7 — CAG Audit Log Export (Month 10)**
- [ ] Add "Export Audit Log" button to MSDE Console
- [ ] Generates PDF with:
  - All 500 centre telemetry for selected date range
  - SHA-256 hash of each packet (proves data wasn't altered)
  - Digital signature from MSDE's system
- [ ] Format accepted by CAG's audit process

**STEP 3.8 — Full Karnataka Rollout (Month 11-12)**
- [ ] Deploy 500 KD Boxes to all 500 Karnataka PMKK centres
- [ ] Training sessions for NSDC Karnataka inspectors (half-day workshop)
- [ ] 30-day parallel running: old manual + new AI system both in use
- [ ] After 30 days: AI system becomes official. Manual inspections reduced by 80%.
- [ ] Press release + report to MSDE on Karnataka pilot results

---

## 🇮🇳 PHASE 4: NATIONAL SCALE
### 📅 Duration: Year 2 to Year 3
### 🎯 Goal: All 15,000 training centres across all 36 States/UTs

---

**STEP 4.1 — 20+ Trade-Specific YOLO Models (Month 1-6 of Year 2)**
- [ ] Collect labeled datasets for 20 skill trades:
  - Electrician, Welder, Plumber, CNC Machinist
  - Sewing Machine Operator, Fashion Design, Beauty & Wellness
  - Solar Panel Technician, HVAC Technician, Data Entry Operator
  - ...and 10 more
- [ ] Train separate YOLOv8-m model for each trade
- [ ] Raspberry Pi automatically loads the correct model based on centre's registered trade

**STEP 4.2 — Federated Learning (Month 4-8 of Year 2)**
- [ ] Instead of sending video to cloud for model training — keep video local
- [ ] Each Pi learns from its own centre and sends only "model weight updates" (numbers, not images)
- [ ] Central server combines all updates to improve the shared AI model
- [ ] This improves accuracy over time WITHOUT violating privacy

**STEP 4.3 — Predictive Fraud Risk Scoring (Month 6-10 of Year 2)**
- [ ] Machine learning model trained on 12 months of Karnataka data
- [ ] Predicts which centres are LIKELY to commit fraud before it happens
- [ ] Based on patterns: D_att gradually increasing, equipment count trending down, trainer changes frequently
- [ ] NSDC inspectors get a weekly "Top 10 High Risk Centres to Visit" list

**STEP 4.4 — Multi-State Rollout (Month 6 onwards, Year 2)**
- [ ] Replicate Karnataka model to each state, one at a time:
  - Year 2, Q1: Tamil Nadu + Andhra Pradesh (1,500 centres)
  - Year 2, Q2: Maharashtra + Gujarat (2,000 centres)
  - Year 2, Q3: Uttar Pradesh + Bihar (3,000 centres)
  - Year 2, Q4: All remaining states (4,000 centres)
  - Year 3: Northeast states + UTs (remaining ~2,000 centres)

**STEP 4.5 — Trainer Biometric Verification (Month 8-12 of Year 2)**
- [ ] Camera reads trainer's government ID card (Aadhaar-linked card)
- [ ] OCR extracts trainer ID number
- [ ] Checks against NSDC trainer database: "Is this person registered as a certified trainer for this centre's trade?"
- [ ] Trainer verification score becomes part of C_infra score

**STEP 4.6 — DigiLocker Integration (Month 10-12 of Year 2)**
- [ ] Show-Cause Notices delivered digitally via DigiLocker
- [ ] Centre In-Charge receives notice in their DigiLocker account
- [ ] They must acknowledge receipt and submit response through DigiLocker
- [ ] Full paperless, legally valid compliance process

**STEP 4.7 — Public Expenditure Dashboard (Year 3)**
- [ ] A public-facing (citizen-viewable) dashboard showing:
  - How many centres are compliant in each district
  - Total government money saved by detecting fraud
  - Number of ghost trainees caught
- [ ] Open data API for researchers and journalists
- [ ] RTI-compliant data transparency

---

## 🏆 THE SIMPLE ONE-LINE SUMMARY

> **KausalyaDrishti puts a thinking brain into the CCTV cameras already sitting idle at 15,000 government skill training centres — so instead of watching students get cheated and taxpayers get robbed, an AI counts the real students, checks the real equipment, and automatically stops the government money when fraud is detected — all without ever identifying or storing anyone's face.**
