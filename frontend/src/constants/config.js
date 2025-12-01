// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Chart Colors
export const CHART_COLORS = {
  changingIssues: '#10b981',
  changingCommits: '#3b82f6',
  impactedIssues: '#fb923c',
  impactedCommits: '#ef4444',
};

// Table Limits
export const TABLE_LIMITS = {
  commits: 10,
  issues: 10,
};

// Badge Types
export const BADGE_TYPES = {
  feature: 'badge-feature',
  bugfix: 'badge-bugfix',
  merge: 'badge-merge',
  regular: 'badge-regular',
};
