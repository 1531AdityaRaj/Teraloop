import React, { useState } from 'react';
import ProgressBar from './components/ProgressBar';
import OrganisationDetails from './components/OrganisationDetails';
import LocationDetails from './components/LocationDetails';
import ContactDetails from './components/ContactDetails';
import LoginDetails from './components/LoginDetails';
import SuccessMessage from './components/SuccessMessage';
import TeraloopLogo from './components/TeraloopLogo';
import { validateField, validateForm, calculateProgress } from './utils/validation';
import { generateUserIdSuggestion, generateTemporaryPassword } from './utils/helpers';
import './App.css';

// Initial default form state
const initialFormState = {
  category: 'School',
  schoolName: '',
  boardType: '',
  registrationId: '',
  studentCount: '',
  address: '',
  city: '',
  district: '',
  state: '',
  pincode: '',
  contactName: '',
  mobileNumber: '',
  email: '',
  userId: '',
};

function App() {
  // Main form values state
  const [formData, setFormData] = useState(initialFormState);
  // Form errors state
  const [errors, setErrors] = useState({});
  // Submission loading state (for mock async save)
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Saved state toggle (switches from form to success view)
  const [isSaved, setIsSaved] = useState(false);
  // Generated one-time password
  const [generatedPassword, setGeneratedPassword] = useState('');
  // In-memory list of already registered IDs (for demonstration of uniqueness check)
  const [registeredIds, setRegisteredIds] = useState(['CBSE-DEMO-001', 'ICSE-EXISTING-99']);

  // Compute live progress
  const { percentage, sectionStatus } = calculateProgress(formData);

  // Check if User ID suggestion can be activated (requires school name)
  const canSuggestUserId = formData.schoolName.trim().length > 0;

  /**
   * Universal input change handler
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    // Clear error for the edited field if it becomes valid
    if (errors[name]) {
      const fieldError = validateField(name, value, updatedForm, registeredIds);
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        if (!fieldError) {
          delete newErrors[name];
        } else {
          newErrors[name] = fieldError;
        }
        return newErrors;
      });
    }
  };

  /**
   * Generates and auto-fills a recommended User ID
   */
  const handleSuggestUserId = () => {
    const suggestion = generateUserIdSuggestion(formData.schoolName, formData.city);
    if (suggestion) {
      setFormData((prev) => ({ ...prev, userId: suggestion }));
      // Clear userId error if any
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.userId;
        return copy;
      });
    }
  };

  /**
   * Form submission handler with simulated mock save
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Full form validation
    const validationResult = validateForm(formData, registeredIds);

    if (!validationResult.isValid) {
      setErrors(validationResult.errors);
      // Scroll to the first error smoothly
      const firstErrorField = Object.keys(validationResult.errors)[0];
      const element = document.getElementsByName(firstErrorField)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
      return;
    }

    // 2. Clear any previous errors and trigger mock save
    setErrors({});
    setIsSubmitting(true);

    // Simulate backend API call with 1.2s timeout
    setTimeout(() => {
      const password = generateTemporaryPassword(12);
      setGeneratedPassword(password);
      // Store the new registration ID to prevent duplicate reuse in this session
      setRegisteredIds((prev) => [...prev, formData.registrationId]);
      setIsSubmitting(false);
      setIsSaved(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  /**
   * Reset handler to onboard another organisation
   */
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setGeneratedPassword('');
    setIsSaved(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Top Navigation Header */}
      <header className="app-header">
        <div className="header-content">
          <div className="brand-badge">
            <TeraloopLogo height={52} />
          </div>
          <div className="header-meta">
            <span className="pill-tag">Entity Onboarding</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        {isSaved ? (
          /* Success Screen View */
          <SuccessMessage
            savedData={formData}
            generatedPassword={generatedPassword}
            onReset={handleReset}
          />
        ) : (
          /* Form Entry View */
          <div className="onboarding-flow">
            <div className="page-heading">
              <h1 className="page-title">Onboard New Organisation</h1>
              <p className="page-description">
                Register educational institutions, universities, and organizations on the platform. All required fields are indicated with an asterisk (<span className="required-star">*</span>).
              </p>
            </div>

            {/* Live Progress Tracker */}
            <ProgressBar
              percentage={percentage}
              sectionStatus={sectionStatus}
            />

            {/* General Form Error Summary Banner (if errors exist on submit) */}
            {Object.keys(errors).length > 0 && (
              <div className="error-banner">
                <span className="error-banner-icon">⚠️</span>
                <div>
                  <strong>Please correct the highlighted fields:</strong>
                  <p>There are {Object.keys(errors).length} invalid or missing field(s) in the form below.</p>
                </div>
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} noValidate>
              {/* Section 1: Organisation Details */}
              <OrganisationDetails
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />

              {/* Section 2: Location Details */}
              <LocationDetails
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />

              {/* Section 3: Contact Person Details */}
              <ContactDetails
                formData={formData}
                errors={errors}
                onChange={handleChange}
              />

              {/* Section 4: Login & User ID Setup */}
              <LoginDetails
                formData={formData}
                errors={errors}
                onChange={handleChange}
                onSuggestUserId={handleSuggestUserId}
                canSuggest={canSuggestUserId}
              />

              {/* Form Action Controls */}
              <div className="form-actions-card">
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn-secondary"
                  disabled={isSubmitting}
                >
                  Clear Form
                </button>

                <button
                  type="submit"
                  className={`btn-primary btn-submit ${isSubmitting ? 'btn-loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="spinner-wrap">
                      <span className="spinner"></span> Saving Organisation...
                    </span>
                  ) : (
                    '🚀 Save & Onboard Organisation'
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Teraloop — Sustainable Tomorrow, Together &copy; 2026. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
