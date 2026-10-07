import React, { useState } from 'react';
import { copyToClipboard } from '../utils/helpers';

/**
 * SuccessMessage Component
 * Displays the confirmation card with the generated one-time credentials,
 * a copy-to-clipboard button, and an option to onboard another entity.
 */
function SuccessMessage({ savedData, generatedPassword, onReset }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `--- EcoAdmin Portal Credentials ---\nOrganisation: ${savedData.schoolName}\nCategory: ${savedData.category}\nUser ID: ${savedData.userId}\nTemporary Password: ${generatedPassword}\nNote: Change password on first login.`;
    const success = await copyToClipboard(textToCopy);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="success-container">
      <div className="success-card">
        {/* Celebration Icon */}
        <div className="success-icon-wrapper">
          <div className="success-icon">✓</div>
        </div>

        <h2 className="success-title">Organisation Successfully Onboarded!</h2>
        <p className="success-subtitle">
          <strong>{savedData.schoolName}</strong> ({savedData.category}) is now registered on the Sustainability Platform.
        </p>

        {/* Credentials Box */}
        <div className="credentials-box">
          <div className="credentials-header">
            <span className="credentials-tag">🔑 Generated Sign-in Credentials</span>
            <button
              type="button"
              onClick={handleCopy}
              className={`btn-copy ${copied ? 'copied' : ''}`}
            >
              {copied ? '✓ Credentials Copied!' : '📋 Copy Credentials'}
            </button>
          </div>

          <div className="credentials-body">
            <div className="cred-row">
              <span className="cred-label">User ID:</span>
              <span className="cred-value code-pill">{savedData.userId}</span>
            </div>

            <div className="cred-row">
              <span className="cred-label">Temporary Password:</span>
              <span className="cred-value code-pill password-highlight">
                {generatedPassword}
              </span>
            </div>
          </div>

          <div className="warning-notice">
            <span className="warning-icon">⚠️</span>
            <p className="warning-text">
              <strong>Important:</strong> This temporary password is only displayed once. Please copy and securely share it with the coordinator ({savedData.contactName}). They will be required to create a new password on their first sign-in.
            </p>
          </div>
        </div>

        {/* Summary Card */}
        <div className="summary-card">
          <h3 className="summary-title">Summary of Registered Details</h3>
          <div className="summary-grid">
            <div>
              <span className="summary-label">Board / Type:</span>
              <span className="summary-val">{savedData.boardType}</span>
            </div>
            <div>
              <span className="summary-label">Registration ID:</span>
              <span className="summary-val">{savedData.registrationId}</span>
            </div>
            <div>
              <span className="summary-label">Students Count:</span>
              <span className="summary-val">{savedData.studentCount}</span>
            </div>
            <div>
              <span className="summary-label">Location:</span>
              <span className="summary-val">
                {savedData.city}, {savedData.state} ({savedData.pincode})
              </span>
            </div>
            <div>
              <span className="summary-label">Primary Contact:</span>
              <span className="summary-val">
                {savedData.contactName} (+91 {savedData.mobileNumber})
              </span>
            </div>
            {savedData.email && (
              <div>
                <span className="summary-label">Contact Email:</span>
                <span className="summary-val">{savedData.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="success-actions">
          <button
            type="button"
            onClick={onReset}
            className="btn-primary btn-large"
          >
            ➕ Onboard Another Organisation
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessMessage;
