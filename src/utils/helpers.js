/**
 * General helper utilities:
 * 1. User ID suggestion generator
 * 2. Secure one-time password generator
 * 3. Clipboard copy helper
 */

/**
 * Suggests a clean, valid User ID based on the School Name and City.
 * Format examples: "greenwood.blr", "greenwood_delhi", "greenwood101"
 * @param {string} schoolName
 * @param {string} city
 * @returns {string} Suggested user ID
 */
export function generateUserIdSuggestion(schoolName = '', city = '') {
  if (!schoolName || !schoolName.trim()) return '';

  // Clean school name: remove special chars, keep alphanumeric, convert spaces to dots
  const cleanSchool = schoolName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '') // remove special symbols
    .split(/\s+/) // split by words
    .filter((word) => !['the', 'and', 'of', 'for', 'school', 'academy', 'institute', 'high'].includes(word) || schoolName.split(/\s+/).length <= 2)
    .slice(0, 2)
    .join('.');

  const cleanCity = (city || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 4);

  let suggestion = cleanSchool || 'school';

  if (cleanCity) {
    suggestion = `${suggestion}.${cleanCity}`;
  } else {
    // If no city provided yet, append random 2 digits for uniqueness
    suggestion = `${suggestion}${Math.floor(10 + Math.random() * 90)}`;
  }

  // Ensure length constraints (3 to 32 chars)
  if (suggestion.length > 32) {
    suggestion = suggestion.slice(0, 32);
  } else if (suggestion.length < 3) {
    suggestion = suggestion.padEnd(3, '1');
  }

  return suggestion;
}

/**
 * Generates a random, secure 12-character password.
 * Format includes uppercase, lowercase, numbers, and allowed symbols.
 * Example: 'kP9#mX2$vL8q'
 */
export function generateTemporaryPassword(length = 12) {
  const lowercase = 'abcdefghjkmnpqrstuvwxyz'; // removed easily confused chars like l, o
  const uppercase = 'ABCDEFGHJKMNPQRSTUVWXYZ'; // removed I, O
  const numbers = '23456789'; // removed 0, 1
  const symbols = '!@#$%&*';

  const allChars = lowercase + uppercase + numbers + symbols;

  let password = '';
  // Guarantee at least one from each group
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill remaining characters
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }

  // Shuffle the password characters for true randomness
  return password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');
}

/**
 * Copies given text to the user's clipboard
 */
export async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      textArea.remove();
      return true;
    } catch (err) {
      textArea.remove();
      return false;
    }
  }
}
