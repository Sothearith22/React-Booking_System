

/**
 * Formats a number as USD currency
 * @param {number|string} amount 
 * @returns {string} e.g. "$120.00"
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

/**
 * Formats a date string into a readable format
 * @param {string} dateString 
 * @returns {string} e.g. "Oct 24, 2026"
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};

/**
 * Formats a date string into a date and time format
 * @param {string} dateString 
 * @returns {string} e.g. "Oct 24, 2026, 2:30 PM"
 */
export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};
