import React from 'react';

/**
 * LoginDetails Component
 * Captures the unique User ID for the organisation, provides a suggestion generator,
 * and informs the user about automatic one-time password generation.
 */
function LoginDetails({ formData, errors, onChange, onSuggestUserId, canSuggest }) {
  // Live checks for user feedback
  const userId = formData.userId || '';
  const hasMinLength = userId.length >= 3 && userId.length <= 32;
  const isAllLowercase = userId.length > 0 && userId === userId.toLowerCase();
  const hasValidChars = userId.length > 0 && /^[a-z0-9._-]+$/.test(userId);

  return (
    <div className="form-section-card">
      <div className="section-header">
        <div className="section-number">4</div>
        <div>
          <h2 className="section-title">Sign-in & Login Setup</h2>
          <p className="section-subtitle">Set up the master sign-in User ID for the organisation</p>
        </div>
      </div>

      <div className="form-grid">
        {/* User ID Field with Suggest Button */}
        <div className="form-group full-width">
          <div className="label-with-action">
            <label htmlFor="userId" className="form-label">
              Organisation User ID <span className="required-star">*</span>
            </label>
            <button
              type="button"
              onClick={onSuggestUserId}
              disabled={!canSuggest}
              className={`btn-suggest ${!canSuggest ? 'btn-disabled' : ''}`}
              title={canSuggest ? 'Generate a suggested User ID based on School Name & City' : 'Enter School Name & City above to enable suggestion'}
            >
              🪄 Suggest User ID
            </button>
          </div>

          <div className="input-group-clean">
            <input
              id="userId"
              name="userId"
              type="text"
              placeholder="e.g. greenwood.blr"
              value={formData.userId}
              onChange={(e) => {
                // Automatically convert to lowercase for better UX
                const lowercaseValue = e.target.value.toLowerCase().replace(/\s+/g, '');
                onChange({ target: { name: 'userId', value: lowercaseValue } });
              }}
              className={`form-input ${errors.userId ? 'input-error' : ''}`}
            />
          </div>
          {errors.userId && <p className="error-message">{errors.userId}</p>}
          {!canSuggest && (
            <span className="field-hint">💡 Tip: Fill in School Name & City to unlock the auto-suggestion button.</span>
          )}
        </div>
      </div>

      {/* Real-time User ID Rule Checklist */}
      <div className="rules-card">
        <span className="rules-title">User ID Guidelines:</span>
        <ul className="rules-list">
          <li className={hasMinLength ? 'rule-met' : 'rule-pending'}>
            <span className="rule-icon">{hasMinLength ? '✓' : '○'}</span>
            3 to 32 characters in length
          </li>
          <li className={isAllLowercase && userId.length > 0 ? 'rule-met' : 'rule-pending'}>
            <span className="rule-icon">{isAllLowercase && userId.length > 0 ? '✓' : '○'}</span>
            Lowercase letters only (no uppercase or spaces)
          </li>
          <li className={hasValidChars ? 'rule-met' : 'rule-pending'}>
            <span className="rule-icon">{hasValidChars ? '✓' : '○'}</span>
            Allowed characters: letters (a-z), numbers (0-9), dots (.), hyphens (-), underscores (_)
          </li>
        </ul>
      </div>

      {/* Password System Explanation Notice */}
      <div className="info-callout info-security">
        <span className="info-icon">🔒</span>
        <div className="info-text">
          <strong>Automatic Password Generation:</strong>
          <p>
            Admins do not set manual passwords for security compliance. A secure temporary password will be created automatically once you click Save, and shown once on the confirmation screen.
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginDetails;
