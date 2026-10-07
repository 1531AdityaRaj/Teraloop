/**
 * Validation utility functions for Entity Onboarding form
 * Kept clean and modular for easy extension and testing.
 */

// User ID regex: 3 to 32 characters, lowercase letters, digits, dots, hyphens, underscores only
export const USER_ID_REGEX = /^[a-z0-9._-]{3,32}$/;

// 6-digit Pincode regex (standard Indian postal code)
export const PINCODE_REGEX = /^\d{6}$/;

// 10-digit Mobile Number regex (Indian mobile numbers start with 6-9, or any 10-digit numeric)
export const MOBILE_REGEX = /^[6-9]\d{9}$/;

// Standard Email regex (optional field)
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * Validates a single field value
 * @param {string} name - Field name
 * @param {string} value - Field value
 * @param {Object} formData - Entire form state (for cross-field rules)
 * @param {Array<string>} existingRegistrationIds - List of already taken registration IDs
 * @returns {string} Error message or empty string if valid
 */
export function validateField(name, value, formData = {}, existingRegistrationIds = []) {
  const trimmedValue = typeof value === 'string' ? value.trim() : '';

  switch (name) {
    // 1. Organisation Details
    case 'category':
      if (!trimmedValue) return 'Please select an organisation category.';
      return '';

    case 'schoolName':
      if (!trimmedValue) return 'School / Organisation name is required.';
      if (trimmedValue.length < 2) return 'Name must be at least 2 characters long.';
      return '';

    case 'boardType':
      if (!trimmedValue) return 'Please select a curriculum board or organisation type.';
      return '';

    case 'registrationId':
      if (!trimmedValue) return 'Registration / Affiliation ID is required.';
      // Check case-insensitive uniqueness
      if (
        existingRegistrationIds.some(
          (id) => id.toLowerCase() === trimmedValue.toLowerCase()
        )
      ) {
        return 'This Registration ID is already registered in the system.';
      }
      return '';

    case 'studentCount':
      if (!trimmedValue) return 'Number of students is required.';
      const num = Number(trimmedValue);
      if (isNaN(num) || num <= 0 || !Number.isInteger(num)) {
        return 'Please enter a valid positive number of students.';
      }
      return '';

    // 2. Location Details
    case 'address':
      if (!trimmedValue) return 'Street address is required.';
      return '';

    case 'city':
      if (!trimmedValue) return 'City is required.';
      return '';

    case 'district':
      if (!trimmedValue) return 'District is required.';
      return '';

    case 'state':
      if (!trimmedValue) return 'State is required.';
      return '';

    case 'pincode':
      if (!trimmedValue) return 'Pincode is required.';
      if (!PINCODE_REGEX.test(trimmedValue)) {
        return 'Pincode must be exactly 6 digits (e.g. 560100).';
      }
      return '';

    // 3. Contact Person Details
    case 'contactName':
      if (!trimmedValue) return 'Contact person name is required.';
      return '';

    case 'mobileNumber':
      if (!trimmedValue) return 'Mobile number is required.';
      if (!/^\d+$/.test(trimmedValue)) {
        return 'Mobile number must contain only numbers.';
      }
      if (trimmedValue.length !== 10) {
        return 'Mobile number must be exactly 10 digits.';
      }
      if (!MOBILE_REGEX.test(trimmedValue)) {
        return 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.';
      }
      return '';

    case 'email':
      if (trimmedValue && !EMAIL_REGEX.test(trimmedValue)) {
        return 'Please enter a valid email address (e.g. admin@school.org).';
      }
      return '';

    // 4. Login Details
    case 'userId':
      if (!trimmedValue) return 'User ID is required.';
      if (trimmedValue.length < 3) return 'User ID must be at least 3 characters.';
      if (trimmedValue.length > 32) return 'User ID cannot exceed 32 characters.';
      if (/[A-Z]/.test(trimmedValue)) {
        return 'User ID must be in lowercase only.';
      }
      if (!USER_ID_REGEX.test(trimmedValue)) {
        return 'User ID can only contain lowercase letters, numbers, dots (.), hyphens (-), and underscores (_).';
      }
      return '';

    default:
      return '';
  }
}

/**
 * Validates the entire form and returns errors object
 */
export function validateForm(formData, existingRegistrationIds = []) {
  const errors = {};
  const requiredFields = [
    'category',
    'schoolName',
    'boardType',
    'registrationId',
    'studentCount',
    'address',
    'city',
    'district',
    'state',
    'pincode',
    'contactName',
    'mobileNumber',
    'email',
    'userId',
  ];

  requiredFields.forEach((field) => {
    const error = validateField(field, formData[field], formData, existingRegistrationIds);
    if (error) {
      errors[field] = error;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Computes overall completion percentage and section completion statuses
 */
export function calculateProgress(formData) {
  const sections = [
    {
      id: 'org',
      name: 'School Info',
      fields: ['category', 'schoolName', 'boardType', 'registrationId', 'studentCount'],
    },
    {
      id: 'location',
      name: 'Location',
      fields: ['address', 'city', 'district', 'state', 'pincode'],
    },
    {
      id: 'contact',
      name: 'Contact',
      fields: ['contactName', 'mobileNumber'],
    },
    {
      id: 'login',
      name: 'Sign-in ID',
      fields: ['userId'],
    },
  ];

  let totalFields = 0;
  let filledFields = 0;

  const sectionStatus = sections.map((section) => {
    let sectionFilled = 0;
    section.fields.forEach((field) => {
      totalFields += 1;
      const val = formData[field];
      if (typeof val === 'string' && val.trim() !== '') {
        filledFields += 1;
        sectionFilled += 1;
      }
    });

    return {
      ...section,
      isComplete: sectionFilled === section.fields.length,
      filledCount: sectionFilled,
      totalCount: section.fields.length,
    };
  });

  const percentage = Math.round((filledFields / totalFields) * 100);

  return {
    percentage,
    sectionStatus,
  };
}
