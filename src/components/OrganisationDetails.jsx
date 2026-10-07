import React from 'react';

/**
 * OrganisationDetails Component
 * Captures Category, School Name, Board/Type, Affiliation ID, and Number of Students.
 */
function OrganisationDetails({ formData, errors, onChange }) {
  const categories = [
    { value: 'School', label: 'School' },
    { value: 'University', label: 'University / College' },
    { value: 'Corporate', label: 'Corporate' },
    { value: 'Club', label: 'Club / Association' },
    { value: 'Community', label: 'Community Organisation' },
  ];

  const boardTypes = [
    { value: '', label: '-- Select Board / Type --' },
    { value: 'CBSE', label: 'CBSE (Central Board of Secondary Education)' },
    { value: 'ICSE', label: 'ICSE / ISC (Council for the Indian School Certificate)' },
    { value: 'State Board', label: 'State Board' },
    { value: 'IB', label: 'IB (International Baccalaureate)' },
    { value: 'Cambridge', label: 'Cambridge (IGCSE / A Levels)' },
    { value: 'Independent', label: 'Independent / Private' },
    { value: 'Other', label: 'Other Board / Trust' },
  ];

  return (
    <div className="form-section-card">
      <div className="section-header">
        <div className="section-number">1</div>
        <div>
          <h2 className="section-title">School / Organisation Details</h2>
          <p className="section-subtitle">Basic identity and academic affiliation information</p>
        </div>
      </div>

      <div className="form-grid">
        {/* Category Field */}
        <div className="form-group full-width">
          <label htmlFor="category" className="form-label">
            Organisation Category <span className="required-star">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={onChange}
            className={`form-input ${errors.category ? 'input-error' : ''}`}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
          {errors.category && <p className="error-message">{errors.category}</p>}
        </div>

        {/* School Name Field */}
        <div className="form-group full-width">
          <label htmlFor="schoolName" className="form-label">
            School / Organisation Name <span className="required-star">*</span>
          </label>
          <input
            id="schoolName"
            name="schoolName"
            type="text"
            placeholder="e.g. St. Xavier's High School"
            value={formData.schoolName}
            onChange={onChange}
            className={`form-input ${errors.schoolName ? 'input-error' : ''}`}
          />
          {errors.schoolName && <p className="error-message">{errors.schoolName}</p>}
        </div>

        {/* Board / Type Field */}
        <div className="form-group">
          <label htmlFor="boardType" className="form-label">
            Board or Type <span className="required-star">*</span>
          </label>
          <select
            id="boardType"
            name="boardType"
            value={formData.boardType}
            onChange={onChange}
            className={`form-input ${errors.boardType ? 'input-error' : ''}`}
          >
            {boardTypes.map((board) => (
              <option key={board.value} value={board.value}>
                {board.label}
              </option>
            ))}
          </select>
          {errors.boardType && <p className="error-message">{errors.boardType}</p>}
        </div>

        {/* Registration / Affiliation ID Field */}
        <div className="form-group">
          <label htmlFor="registrationId" className="form-label">
            Registration / Affiliation ID <span className="required-star">*</span>
          </label>
          <input
            id="registrationId"
            name="registrationId"
            type="text"
            placeholder="e.g. CBSE-AFF-99482"
            value={formData.registrationId}
            onChange={onChange}
            className={`form-input ${errors.registrationId ? 'input-error' : ''}`}
          />
          <span className="field-hint">Unique identifier (case-insensitive)</span>
          {errors.registrationId && <p className="error-message">{errors.registrationId}</p>}
        </div>

        {/* Number of Students Field */}
        <div className="form-group">
          <label htmlFor="studentCount" className="form-label">
            Estimated Number of Students <span className="required-star">*</span>
          </label>
          <input
            id="studentCount"
            name="studentCount"
            type="number"
            min="1"
            placeholder="e.g. 1250"
            value={formData.studentCount}
            onChange={onChange}
            className={`form-input ${errors.studentCount ? 'input-error' : ''}`}
          />
          {errors.studentCount && <p className="error-message">{errors.studentCount}</p>}
        </div>
      </div>
    </div>
  );
}

export default OrganisationDetails;
