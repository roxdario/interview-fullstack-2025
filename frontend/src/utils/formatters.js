/**
 * Format a date string to locale date
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

/**
 * Truncate a string to specified length
 * @param {string} str - String to truncate
 * @param {number} length - Max length
 * @returns {string} Truncated string
 */
export const truncate = (str, length = 50) => {
  if (!str) return 'N/A';
  return str.length > length ? str.substring(0, length) + '...' : str;
};


/**
 * Get commit type label
 * @param {boolean} isMerge - Is merge commit
 * @returns {string} Type label
 */
export const getCommitType = (isMerge) => {
  return isMerge ? 'Merge' : 'Regular';
};

/**
 * Get badge class for issue type
 * @param {string} type - Issue type (feature/bugfix)
 * @returns {string} Badge class name
 */
export const getBadgeClass = (type) => {
  const badgeMap = {
    feature: 'badge-feature',
    bugfix: 'badge-bugfix',
    merge: 'badge-merge',
    regular: 'badge-regular',
  };
  return badgeMap[type] || 'badge-regular';
};
