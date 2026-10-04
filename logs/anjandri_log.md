# 🛠️ Development Log — Anjandri T N
**Branch:** `feature/kd-video-ai-feed`  
**Assigned Module:** Edge Video/Webcam Stream Ingestion & Real-Time Computer Vision Detector  
**Last Updated:** 05 Oct 2026, 00:15 IST  

## 1. Files Created & Modified
- `src/components/edge/CameraFeedView.jsx` (Created webcam controller & UI stage)
- `src/components/edge/AiDetector.jsx` (Created HTML5 canvas real-time bounding box & face tracker)

## 2. Exported Components & Props Specification
### `<CameraFeedView centre={selectedCentre} setCentre={setSelectedCentre} />`
- Starts/stops laptop webcam using `navigator.mediaDevices.getUserMedia`.
- Overlays real-time AI bounding box detector.
- Features dynamic headcount updating: counts `1` when user is in front of webcam, plus interactive hackathon batch testing buttons (+5, +37 heads).

## 3. How to Run & Test My Component
1. Click **"Turn ON Laptop Camera"** on Tab 1.
2. Verify live webcam feed appears with green/blue bounding boxes tracking the user in real time.
3. Test batch buttons to simulate larger classroom headcounts.

## 4. Integration Notes for Lead
- Fully merged into `KD` master portal.
