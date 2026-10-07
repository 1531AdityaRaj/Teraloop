import React from 'react';

/**
 * ContactDetails Component
 * Captures Primary Contact Name, 10-Digit Mobile Number, and optional Email Address.
 */
function ContactDetails({ formData, errors, onChange }) {
  return (
    <div className="form-section-card">
      <div className="section-header">
        <div className="section-number">3</div>
        <div>
          <h2 className="section-title">Contact Person Details</h2>
          <p className="section-subtitle">Lead coordinator / administrator representing the institution</p>
        </div>
      </div>

      <div className="form-grid">
        {/* Contact Person Name */}
        <div className="form-group full-width">
          <label htmlFor="contactName" className="form-label">
            Contact Person Name <span className="required-star">*</span>
          </label>
          <input
            id="contactName"
            name="contactName"
            type="text"
            placeholder="e.g. Dr. Rajesh Sharma (Principal / Admin)"
            value={formData.contactName}
            onChange={onChange}
            className={`form-input ${errors.contactName ? 'input-error' : ''}`}
          />
          {errors.contactName && <p className="error-message">{errors.contactName}</p>}
        </div>

        {/* 10-Digit Mobile Number */}
        <div className="form-group">
          <label htmlFor="mobileNumber" className="form-label">
            10-Digit Mobile Number <span className="required-star">*</span>
          </label>
          <div className="input-group-prefix">
            <span className="input-prefix">🇮🇳 +91</span>
            <input
              id="mobileNumber"
              name="mobileNumber"
              type="tel"
              maxLength={10}
              placeholder="9876543210"
              value={formData.mobileNumber}
              onChange={onChange}
              className={`form-input prefixed-input ${errors.mobileNumber ? 'input-error' : ''}`}
            />
          </div>
          {errors.mobileNumber && <p className="error-message">{errors.mobileNumber}</p>}
        </div>

        {/* Email Address (Optional) */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address <span className="optional-badge">(Optional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="e.g. principal@greenwood.edu"
            value={formData.email}
            onChange={onChange}
            className={`form-input ${errors.email ? 'input-error' : ''}`}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
      </div>

      {/* Info Callout */}
      <div className="info-callout">
        <span className="info-icon">💡</span>
        <p className="info-text">
          <strong>Note:</strong> Several teachers and coordinators may share this single entity login to record environmental activities and track sustainability credits.
        </p>
      </div>
    </div>
  );
}

export default ContactDetails;
