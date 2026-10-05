import React, { useState } from 'react';
import { 
  Building, 
  FileText, 
  Send, 
  Printer, 
  X, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';
import MsdeDistrictDashboard from './MsdeDistrictDashboard';
import CentreAuditTable from './CentreAuditTable';
import { TRAINING_CENTRES } from '../../data/centerMockData';
import { calculateAttendanceDiscrepancy, calculateInfraCompliance, generateShowCauseNotice } from '../../services/complianceRules';

/**
 * MinistryConsole — National MSDE Regulatory & Governance Console
 */
function MinistryConsole() {
  const [activeNoticeCentre, setActiveNoticeCentre] = useState(null);
  const [noticeCopied, setNoticeCopied] = useState(false);

  const handleGenerateNotice = (centre) => {
    setActiveNoticeCentre(centre);
    setNoticeCopied(false);
  };

  return (
    <div className="kd-page-container">
      <div className="kd-page-header">
        <div>
          <h2 className="kd-page-title">National Ministry Command Console (MSDE & NSDC)</h2>
          <p className="kd-page-subtitle">Centralized fraud prevention, state-wise compliance auditing, and automated grant protection</p>
        </div>
        <div className="kd-actions-row">
          <button className="kd-btn kd-btn-success">
            <CheckCircle2 size={18} />
            <span>Approve Verified DBT Batches</span>
          </button>
        </div>
      </div>

      {/* Top Analytics */}
      <MsdeDistrictDashboard />

      {/* Centre Audit Master Table */}
      <CentreAuditTable 
        centres={TRAINING_CENTRES} 
        onGenerateNotice={handleGenerateNotice} 
      />

      {/* Show Cause Notice Modal */}
      {activeNoticeCentre && (
        <div className="kd-modal-backdrop">
          <div className="kd-modal-card">
            <div className="kd-modal-header kd-flex-between">
              <div className="kd-flex-align">
                <FileText size={20} className="kd-text-red" />
                <h3>Automated Show-Cause Notice: {activeNoticeCentre.id}</h3>
              </div>
              <button 
                className="kd-modal-close-btn"
                onClick={() => setActiveNoticeCentre(null)}
              >
                <X size={20} />
              </button>
            </div>

            <div className="kd-modal-body">
              <pre className="kd-notice-text">
                {generateShowCauseNotice(
                  activeNoticeCentre,
                  calculateAttendanceDiscrepancy(activeNoticeCentre.biometricClaimed, activeNoticeCentre.defaultAiDetected),
                  calculateInfraCompliance(activeNoticeCentre.sanctionedEquipment)
                )}
              </pre>
            </div>

            <div className="kd-modal-footer kd-flex-between">
              <span className="kd-text-xs kd-text-muted">
                Official Regulatory Notice • Automatically dispatched via DigiLocker & MSDE Portal
              </span>
              <div className="kd-actions-row">
                <button 
                  className="kd-btn kd-btn-secondary kd-btn-sm"
                  onClick={() => {
                    const noticeText = generateShowCauseNotice(
                      activeNoticeCentre,
                      calculateAttendanceDiscrepancy(activeNoticeCentre.biometricClaimed, activeNoticeCentre.defaultAiDetected),
                      calculateInfraCompliance(activeNoticeCentre.sanctionedEquipment)
                    );
                    const printWin = window.open('', '_blank', 'width=800,height=900');
                    if (printWin) {
                      printWin.document.write(`
                        <html>
                          <head>
                            <title>Show-Cause Notice - ${activeNoticeCentre.id}</title>
                            <style>
                              body { font-family: 'Times New Roman', serif; padding: 40px; color: #111; line-height: 1.6; }
                              .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 24px; }
                              .emblem { font-size: 20px; font-weight: bold; }
                              pre { white-space: pre-wrap; font-family: monospace; font-size: 13px; background: #f8fafc; padding: 20px; border: 1px solid #cbd5e1; border-radius: 6px; }
                              .footer { margin-top: 40px; text-align: right; }
                            </style>
                          </head>
                          <body>
                            <div class="header">
                              <div class="emblem">GOVERNMENT OF INDIA</div>
                              <div>MINISTRY OF SKILL DEVELOPMENT & ENTREPRENEURSHIP (MSDE)</div>
                              <div style="font-size:12px; color:#555;">National Skill Development Corporation • Shram Shakti Bhawan, New Delhi</div>
                            </div>
                            <pre>${noticeText}</pre>
                            <div class="footer">
                              <div><strong>Authorized Signatory</strong></div>
                              <div>Director (Compliance & Quality Assurance)</div>
                              <div>KausalyaDrishti AI Regulatory Cell</div>
                            </div>
                          </body>
                        </html>
                      `);
                      printWin.document.close();
                      printWin.focus();
                      setTimeout(() => printWin.print(), 300);
                    }
                  }}
                >
                  <Printer size={14} />
                  <span>Print / Save PDF</span>
                </button>
                <button 
                  className="kd-btn kd-btn-secondary kd-btn-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      generateShowCauseNotice(
                        activeNoticeCentre,
                        calculateAttendanceDiscrepancy(activeNoticeCentre.biometricClaimed, activeNoticeCentre.defaultAiDetected),
                        calculateInfraCompliance(activeNoticeCentre.sanctionedEquipment)
                      )
                    );
                    setNoticeCopied(true);
                  }}
                >
                  {noticeCopied ? '✅ Copied' : '📋 Copy Text'}
                </button>
                <button 
                  className="kd-btn kd-btn-danger kd-btn-sm"
                  onClick={() => {
                    alert(`Show-Cause Notice formally dispatched to ${activeNoticeCentre.name} Center In-Charge.`);
                    setActiveNoticeCentre(null);
                  }}
                >
                  <Send size={14} />
                  <span>Dispatch Notice & Hold Grant</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MinistryConsole;
