import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  VideoOff, 
  AlertTriangle, 
  Users, 
  UserCheck, 
  UserX, 
  CheckCircle, 
  ShieldCheck, 
  Radio, 
  Sparkles,
  Sliders,
  RefreshCw
} from 'lucide-react';
import AiDetector from './AiDetector';
import PrivacyBlurToggle from './PrivacyBlurToggle';
import BandwidthTelemetry from './BandwidthTelemetry';
import { calculateAttendanceDiscrepancy, calculateInfraCompliance } from '../../services/complianceRules';

/**
 * CameraFeedView — Edge Video Ingestion & Real-Time Computer Vision Monitor
 */
function CameraFeedView({ centre, setCentre }) {
  const videoRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isPrivacyOn, setIsPrivacyOn] = useState(true);
  const [cameraError, setCameraError] = useState(null);

  // Dynamic Trainee Counts
  // When camera is ON: 1 (You) + simulatedExtraBatch
  // When camera is OFF: 0 + simulatedExtraBatch
  const [simulatedExtraBatch, setSimulatedExtraBatch] = useState(0);

  const visualHeadCount = (isCameraActive ? 1 : 0) + simulatedExtraBatch;
  const discrepancy = calculateAttendanceDiscrepancy(centre.biometricClaimed, visualHeadCount);
  const infra = calculateInfraCompliance(centre.sanctionedEquipment);

  const startWebcam = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Camera permission denied or camera not found. Please click 'Allow' in your browser.");
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  return (
    <div className="kd-page-container">
      {/* Top Header & Actions */}
      <div className="kd-page-header">
        <div>
          <div className="kd-badge-tag">
            <Radio size={14} className="kd-pulse-icon" />
            <span>EDGE RTSP STREAM • {centre.id}</span>
          </div>
          <h2 className="kd-page-title">{centre.name}</h2>
          <p className="kd-page-subtitle">{centre.trade} • {centre.room} ({centre.district}, {centre.state})</p>
        </div>

        <div className="kd-actions-row">
          {!isCameraActive ? (
            <button className="kd-btn kd-btn-primary" onClick={startWebcam}>
              <Camera size={18} />
              <span>Turn ON Laptop Camera</span>
            </button>
          ) : (
            <button className="kd-btn kd-btn-danger" onClick={stopWebcam}>
              <VideoOff size={18} />
              <span>Turn OFF Camera</span>
            </button>
          )}

          <PrivacyBlurToggle isPrivacyOn={isPrivacyOn} setIsPrivacyOn={setIsPrivacyOn} />
        </div>
      </div>

      {cameraError && (
        <div className="kd-alert kd-alert-danger">
          <AlertTriangle size={20} />
          <span>{cameraError}</span>
        </div>
      )}

      {/* Discrepancy Alert Banner */}
      {discrepancy.isGhostFraud ? (
        <div className={`kd-alert ${discrepancy.riskTier === 'CRITICAL' ? 'kd-alert-danger' : 'kd-alert-warning'} kd-alert-pulse`}>
          <div className="kd-alert-content">
            <AlertTriangle size={24} className="kd-alert-icon" />
            <div>
              <strong>Attendance Discrepancy Detected (D_att = {discrepancy.discrepancyPct}% • {discrepancy.riskTier} RISK):</strong>{' '}
              Aadhaar Biometric claims <strong>{centre.biometricClaimed} trainees</strong>, but CCTV AI detected only <strong>{visualHeadCount} in room</strong>.{' '}
              <span className="kd-text-highlight">Flagged {discrepancy.delta} Ghost Trainee(s)!</span>
            </div>
          </div>
          <span className="kd-badge badge-red">Automated Grant Hold</span>
        </div>
      ) : (
        <div className="kd-alert kd-alert-success">
          <div className="kd-alert-content">
            <CheckCircle size={22} className="kd-text-green" />
            <div>
              <strong>100% Attendance Verified (D_att = 0%):</strong> CCTV headcount matches Aadhaar biometric portal ({visualHeadCount} / {centre.biometricClaimed}).
            </div>
          </div>
          <span className="kd-badge badge-green">Verified Compliant</span>
        </div>
      )}

      {/* Main Grid: Video Stream + Telemetry */}
      <div className="kd-grid-2col">
        {/* Left Column: Live Video Canvas */}
        <div className="kd-card kd-video-card">
          <div className="kd-card-header kd-flex-between">
            <div className="kd-flex-align">
              <span className={`kd-status-dot ${isCameraActive ? 'dot-live' : 'dot-idle'}`}></span>
              <span className="kd-card-title">
                {isCameraActive ? 'LIVE EDGE CAMERA FEED (ACTIVE)' : 'CAMERA FEED STANDBY'}
              </span>
            </div>
            <div className="kd-text-xs kd-text-muted">
              {isCameraActive ? 'Resolution: 720p • 15 FPS (Edge Optimized)' : 'Offline'}
            </div>
          </div>

          <div className="kd-video-viewport">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className={`kd-video-element ${isPrivacyOn ? 'kd-privacy-filter' : ''}`}
            />

            {/* AI Bounding Box Canvas Overlay */}
            <AiDetector 
              videoRef={videoRef}
              isCameraActive={isCameraActive}
              isPrivacyOn={isPrivacyOn}
              detectedCount={visualHeadCount}
              simulatedExtra={simulatedExtraBatch}
            />

            {!isCameraActive && (
              <div className="kd-video-placeholder">
                <Camera size={48} className="kd-text-muted" />
                <h3>Webcam Is Inactive</h3>
                <p>Click "Turn ON Laptop Camera" to test real-time face detection & attendance cross-verification.</p>
                <button className="kd-btn kd-btn-primary kd-mt-3" onClick={startWebcam}>
                  <Camera size={18} />
                  <span>Start Live Webcam Feed</span>
                </button>
              </div>
            )}

            {isCameraActive && (
              <div className="kd-video-overlay-tags">
                <div className="kd-tag top-left">
                  <span>CAM-01 • {centre.room}</span>
                </div>
                <div className="kd-tag top-right">
                  <span className={`kd-badge ${isPrivacyOn ? 'badge-green' : 'badge-amber'}`}>
                    {isPrivacyOn ? '🛡️ DPDP Face-Masked' : '⚠️ Raw Unmasked Stream'}
                  </span>
                </div>
                <div className="kd-tag bottom-left">
                  <span className="kd-text-bold">AI Heads Counted: {visualHeadCount}</span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Batch Simulator Bar (For Judge Demo) */}
          <div className="kd-demo-bar">
            <div className="kd-flex-align">
              <Sliders size={16} className="kd-text-blue" />
              <span className="kd-text-xs kd-text-bold">Hackathon Demo Batch Adjuster:</span>
            </div>
            <div className="kd-demo-btn-group">
              <button 
                className={`kd-btn kd-btn-xs ${simulatedExtraBatch === 0 ? 'kd-btn-primary' : 'kd-btn-secondary'}`}
                onClick={() => setSimulatedExtraBatch(0)}
              >
                Only Me ({isCameraActive ? 1 : 0} Head)
              </button>
              <button 
                className={`kd-btn kd-btn-xs ${simulatedExtraBatch === 5 ? 'kd-btn-primary' : 'kd-btn-secondary'}`}
                onClick={() => setSimulatedExtraBatch(5)}
              >
                +5 Batch Heads
              </button>
              <button 
                className={`kd-btn kd-btn-xs ${simulatedExtraBatch === 37 ? 'kd-btn-primary' : 'kd-btn-secondary'}`}
                onClick={() => setSimulatedExtraBatch(37)}
              >
                +37 Batch (Simulate 38 Total)
              </button>
              <button 
                className={`kd-btn kd-btn-xs ${simulatedExtraBatch === (centre.biometricClaimed - (isCameraActive ? 1 : 0)) ? 'kd-btn-primary' : 'kd-btn-secondary'}`}
                onClick={() => setSimulatedExtraBatch(Math.max(0, centre.biometricClaimed - (isCameraActive ? 1 : 0)))}
              >
                Match 100% ({centre.biometricClaimed})
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Tally & Telemetry */}
        <div className="kd-column-stack">
          {/* 4 Stat Cards */}
          <div className="kd-grid-2x2">
            <div className="kd-stat-card">
              <div className="kd-flex-between">
                <span className="kd-stat-label">Biometric (Aadhaar)</span>
                <UserCheck size={18} className="kd-text-blue" />
              </div>
              <div className="kd-stat-value kd-text-blue">{centre.biometricClaimed}</div>
              <div className="kd-stat-desc">Portal Claimed Attendance</div>
            </div>

            <div className="kd-stat-card">
              <div className="kd-flex-between">
                <span className="kd-stat-label">CCTV Visual Headcount</span>
                <Users size={18} className="kd-text-purple" />
              </div>
              <div className="kd-stat-value kd-text-purple">{visualHeadCount}</div>
              <div className="kd-stat-desc">Edge YOLO Detection</div>
            </div>

            <div className={`kd-stat-card ${discrepancy.isGhostFraud ? 'kd-stat-danger' : ''}`}>
              <div className="kd-flex-between">
                <span className="kd-stat-label">Ghost Trainees (Δ)</span>
                <UserX size={18} className="kd-text-red" />
              </div>
              <div className="kd-stat-value kd-text-red">
                {discrepancy.delta > 0 ? `+${discrepancy.delta}` : '0'}
              </div>
              <div className="kd-stat-desc">Unverified Phantom Records</div>
            </div>

            <div className="kd-stat-card">
              <div className="kd-flex-between">
                <span className="kd-stat-label">Infra Compliance</span>
                <ShieldCheck size={18} className="kd-text-green" />
              </div>
              <div className="kd-stat-value kd-text-green">{infra.score}%</div>
              <div className="kd-stat-desc">{infra.compliantCount}/{infra.totalItems} Equipment Kits Active</div>
            </div>
          </div>

          {/* 5 KB JSON Telemetry Component */}
          <BandwidthTelemetry 
            centre={centre}
            visualCount={visualHeadCount}
            discrepancy={discrepancy}
            infraScore={infra.score}
            isPrivacyOn={isPrivacyOn}
          />
        </div>
      </div>
    </div>
  );
}

export default CameraFeedView;
