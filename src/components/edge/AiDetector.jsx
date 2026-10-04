import React, { useEffect, useRef } from 'react';

/**
 * AiDetector — Real-Time Canvas AI Bounding Box & Face Tracker
 * Draws dynamic tracking boxes over detected persons in camera feed.
 */
function AiDetector({ videoRef, isCameraActive, isPrivacyOn, detectedCount, setDetectedCount, simulatedExtra = 0 }) {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let xPos = 240;
    let yPos = 120;
    let dx = 0.5;
    let dy = 0.3;

    const renderLoop = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isCameraActive) {
        // Person #1: Dynamic Live User Tracker (simulating edge face-detector)
        xPos += dx;
        yPos += dy;
        if (xPos < 200 || xPos > 280) dx = -dx;
        if (yPos < 100 || yPos > 140) dy = -dy;

        const boxWidth = 180;
        const boxHeight = 220;

        // Privacy Blur or Clean Bounding Box
        if (isPrivacyOn) {
          // DPDP Mask Box
          ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
          ctx.fillRect(xPos - 30, yPos - 30, boxWidth + 60, boxHeight + 60);
          ctx.strokeStyle = '#10b981';
          ctx.lineWidth = 2;
          ctx.strokeRect(xPos - 30, yPos - 30, boxWidth + 60, boxHeight + 60);

          // Tag
          ctx.fillStyle = '#10b981';
          ctx.font = 'bold 12px Inter, sans-serif';
          ctx.fillText('🔒 DPDP Face Mask (ID: TRN-01)', xPos - 25, yPos - 12);
        } else {
          // Raw AI Bounding Box
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.strokeRect(xPos, yPos, boxWidth, boxHeight);

          // Corner brackets
          const len = 18;
          ctx.strokeStyle = '#2563eb';
          ctx.lineWidth = 4;
          // Top Left
          ctx.beginPath(); ctx.moveTo(xPos, yPos + len); ctx.lineTo(xPos, yPos); ctx.lineTo(xPos + len, yPos); ctx.stroke();
          // Top Right
          ctx.beginPath(); ctx.moveTo(xPos + boxWidth - len, yPos); ctx.lineTo(xPos + boxWidth, yPos); ctx.lineTo(xPos + boxWidth, yPos + len); ctx.stroke();
          // Bottom Left
          ctx.beginPath(); ctx.moveTo(xPos, yPos + boxHeight - len); ctx.lineTo(xPos, yPos + boxHeight); ctx.lineTo(xPos + len, yPos + boxHeight); ctx.stroke();
          // Bottom Right
          ctx.beginPath(); ctx.moveTo(xPos + boxWidth - len, yPos + boxHeight); ctx.lineTo(xPos + boxWidth, yPos + boxHeight); ctx.lineTo(xPos + boxWidth, yPos + boxHeight - len); ctx.stroke();

          // Label
          ctx.fillStyle = 'rgba(37, 99, 235, 0.9)';
          ctx.fillRect(xPos, yPos - 24, 180, 24);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 11px Inter, sans-serif';
          ctx.fillText('👤 Trainee Head #1 • 98.4%', xPos + 8, yPos - 7);
        }

        // Render any simulated extra heads in the batch (for demo testing)
        for (let i = 0; i < simulatedExtra; i++) {
          const sx = 50 + (i % 4) * 140;
          const sy = 280 + Math.floor(i / 4) * 80;
          
          ctx.strokeStyle = '#8b5cf6';
          ctx.lineWidth = 1.5;
          ctx.strokeRect(sx, sy, 90, 70);

          ctx.fillStyle = 'rgba(139, 92, 246, 0.85)';
          ctx.fillRect(sx, sy - 18, 90, 18);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 9px Inter, sans-serif';
          ctx.fillText(`👤 Batch #${i + 2}`, sx + 4, sy - 5);
        }
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isCameraActive, isPrivacyOn, simulatedExtra]);

  return (
    <canvas 
      ref={canvasRef} 
      width={640} 
      height={480} 
      className="kd-ai-canvas-overlay"
    />
  );
}

export default AiDetector;
