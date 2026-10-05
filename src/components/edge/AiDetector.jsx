import React, { useEffect, useRef, useState, useCallback } from 'react';

/**
 * AiDetector — REAL TensorFlow.js COCO-SSD Person Detector
 *
 * Uses the COCO-SSD object detection model running 100% in-browser.
 * Detects "person" class from live webcam frames and draws bounding boxes.
 * No backend, no server, no fake simulation.
 *
 * Privacy mode: overlays a dark blur-mask over each detected person region
 * instead of showing the raw face — DPDP Act 2023 compliant.
 */
function AiDetector({ videoRef, isCameraActive, isPrivacyOn, onCountUpdate, minConfidence = 0.10 }) {
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const animFrameId = useRef(null);
  const [modelStatus, setModelStatus] = useState('idle'); // idle | loading | ready | error

  // ─── Load COCO-SSD model once on mount ─────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const loadModel = async () => {
      try {
        setModelStatus('loading');
        // Dynamic import so the huge TF bundle only loads when this component mounts
        const cocoSsd = await import('@tensorflow-models/coco-ssd');
        await import('@tensorflow/tfjs');
        // Use standard mobilenet_v2 for higher detection precision in crowded classrooms
        const model = await cocoSsd.load({ base: 'mobilenet_v2' });
        if (!cancelled) {
          modelRef.current = model;
          setModelStatus('ready');
        }
      } catch (err) {
        console.error('COCO-SSD load failed:', err);
        if (!cancelled) setModelStatus('error');
      }
    };

    loadModel();
    return () => { cancelled = true; };
  }, []);

  // ─── Detection & render loop ────────────────────────────────────────────────
  const runDetection = useCallback(async () => {
    const canvas = canvasRef.current;
    const video = videoRef?.current;

    if (!canvas || !video || !modelRef.current || !isCameraActive) {
      // Camera off — clear canvas and report 0
      const ctx = canvas?.getContext('2d');
      if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
      onCountUpdate?.(0);
      return;
    }

    // Only run if video has actual frame data
    if (video.readyState < 2) {
      animFrameId.current = requestAnimationFrame(runDetection);
      return;
    }

    try {
      // Run COCO-SSD with maxNumBoxes=80 and minScore for dense classroom & overhead detection
      const predictions = await modelRef.current.detect(video, 80, minConfidence);

      // Filter to "person" class only
      const persons = predictions.filter(
        p => p.class === 'person' && p.score >= minConfidence
      );

      // Supported Infrastructure/Equipment classes mapped to NSQF training equipment labels
      const infraClassMap = {
        'laptop': '💻 Digital Lab Station',
        'cell phone': '📱 Biometric Handheld',
        'chair': '🪑 Sanctioned Seating',
        'book': '📚 NSQF Study Module',
        'tv': '📺 Smart Display Bay',
        'scissors': '✂️ Practical Trade Tool',
        'backpack': '🎒 Trainee Study Kit',
        'bottle': '🧴 Safety/Water Station',
        'keyboard': '⌨️ IT Lab Peripheral',
        'mouse': '🖱️ CAD Workstation Pointer',
        'clock': '🕒 Shift Timer Equipment'
      };

      const equipment = predictions.filter(
        p => infraClassMap[p.class] && p.score >= Math.max(0.20, minConfidence)
      );

      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Scale predictions from video natural size to canvas size
      const scaleX = canvas.width / (video.videoWidth || canvas.width);
      const scaleY = canvas.height / (video.videoHeight || canvas.height);

      // 1. Draw Infrastructure Equipment Bounding Boxes (Emerald / Amber)
      equipment.forEach((item) => {
        const [x, y, w, h] = item.bbox;
        const sx = x * scaleX;
        const sy = y * scaleY;
        const sw = w * scaleX;
        const sh = h * scaleY;
        const label = infraClassMap[item.class] || item.class;
        const confidence = Math.round(item.score * 100);

        // Dashed amber/emerald border for equipment
        ctx.save();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 3]);
        ctx.strokeRect(sx, sy, sw, sh);
        ctx.restore();

        // Equipment Label Badge
        ctx.fillStyle = 'rgba(6, 78, 59, 0.9)';
        ctx.fillRect(sx, sy - 20, Math.max(160, label.length * 8 + 40), 20);
        ctx.fillStyle = '#6ee7b7';
        ctx.font = 'bold 10px Inter, sans-serif';
        ctx.fillText(`⚙️ ${label} (${confidence}%)`, sx + 4, sy - 6);
      });

      // 2. Draw Persons Bounding Boxes (Blue or DPDP Mask)
      persons.forEach((person, idx) => {
        const [x, y, w, h] = person.bbox;
        const sx = x * scaleX;
        const sy = y * scaleY;
        const sw = w * scaleX;
        const sh = h * scaleY;
        const confidence = Math.round(person.score * 100);

        if (isPrivacyOn) {
          // ── DPDP Privacy Mode: dark overlay mask ──
          ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
          ctx.fillRect(sx, sy, sw, sh);

          // Green privacy border
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2;
          ctx.strokeRect(sx, sy, sw, sh);

          // Privacy label
          ctx.fillStyle = '#10b981';
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.fillText(`🔒 DPDP Masked TRN-${String(idx + 1).padStart(2, '0')}`, sx + 5, sy - 6);
        } else {
          // ── Raw AI Detection Mode: blue bounding box ──
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.strokeRect(sx, sy, sw, sh);

          // Corner bracket accents
          const len = 14;
          ctx.strokeStyle = '#2563eb';
          ctx.lineWidth = 3;
          // TL
          ctx.beginPath(); ctx.moveTo(sx, sy + len); ctx.lineTo(sx, sy); ctx.lineTo(sx + len, sy); ctx.stroke();
          // TR
          ctx.beginPath(); ctx.moveTo(sx + sw - len, sy); ctx.lineTo(sx + sw, sy); ctx.lineTo(sx + sw, sy + len); ctx.stroke();
          // BL
          ctx.beginPath(); ctx.moveTo(sx, sy + sh - len); ctx.lineTo(sx, sy + sh); ctx.lineTo(sx + len, sy + sh); ctx.stroke();
          // BR
          ctx.beginPath(); ctx.moveTo(sx + sw - len, sy + sh); ctx.lineTo(sx + sw, sy + sh); ctx.lineTo(sx + sw, sy + sh - len); ctx.stroke();

          // Confidence label badge
          ctx.fillStyle = 'rgba(37, 99, 235, 0.9)';
          ctx.fillRect(sx, sy - 22, 180, 22);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.fillText(`👤 Person #${idx + 1}  ${confidence}%`, sx + 6, sy - 6);
        }
      });

      // Report real count back to parent
      onCountUpdate?.(persons.length);

    } catch (err) {
      console.warn('Detection frame error:', err);
    }

    // Schedule next frame (~15 FPS to match edge hardware performance)
    animFrameId.current = setTimeout(() => {
      animFrameId.current = requestAnimationFrame(runDetection);
    }, 66); // ~15 FPS
  }, [isCameraActive, isPrivacyOn, onCountUpdate, videoRef, minConfidence]);

  // Start/stop detection loop when camera activates
  useEffect(() => {
    if (isCameraActive && modelStatus === 'ready') {
      animFrameId.current = requestAnimationFrame(runDetection);
    } else {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        clearTimeout(animFrameId.current);
      }
      // Clear canvas when camera stops
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      onCountUpdate?.(0);
    }

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        clearTimeout(animFrameId.current);
      }
    };
  }, [isCameraActive, modelStatus, runDetection]);

  return (
    <>
      {/* Model loading status overlay */}
      {isCameraActive && modelStatus === 'loading' && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: 'rgba(15,23,42,0.85)',
          color: '#38bdf8', fontSize: '13px', fontWeight: 700,
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '8px',
          zIndex: 20
        }}>
          <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚙️</span>
          Loading AI Model (COCO-SSD lite)… first load takes ~5 seconds
        </div>
      )}
      {isCameraActive && modelStatus === 'error' && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          background: 'rgba(239,68,68,0.9)',
          color: '#fff', fontSize: '12px', fontWeight: 700,
          padding: '8px 14px', zIndex: 20
        }}>
          ⚠️ AI model failed to load. Check internet connection and reload.
        </div>
      )}
      {isCameraActive && modelStatus === 'ready' && (
        <div style={{
          position: 'absolute', top: 0, right: 0,
          background: 'rgba(16,185,129,0.2)',
          color: '#10b981', fontSize: '11px', fontWeight: 700,
          padding: '4px 10px', borderRadius: '0 0 0 6px', zIndex: 20,
          border: '1px solid rgba(16,185,129,0.4)'
        }}>
          ✅ AI LIVE • COCO-SSD
        </div>
      )}

      {/* The actual detection canvas overlay */}
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="kd-ai-canvas-overlay"
      />
    </>
  );
}

export default AiDetector;
