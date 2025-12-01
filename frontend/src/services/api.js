import { API_BASE_URL } from '../constants/config';

/**
 * Base fetch wrapper with error handling
 * @param {string} endpoint - API endpoint
 * @returns {Promise<any>} Response data
 */
const fetchAPI = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

/**
 * API Service
 */
export const api = {
  /**
   * Health check
   * @returns {Promise<Object>}
   */
  health: () => fetchAPI('/health'),

  /**
   * Get aggregate data
   * @returns {Promise<Object>}
   */
  aggregate: () => fetchAPI('/aggregate'),

  /**
   * Get commits with limit
   * @param {number} limit - Max commits to return
   * @returns {Promise<Object>}
   */
  commits: (limit = 100) => fetchAPI(`/commits?limit=${limit}`),

  /**
   * Get issues data
   * @returns {Promise<Object>}
   */
  issues: () => fetchAPI('/issues'),

  /**
   * Get affinity data
   * @param {number} limit - Max affinity items
   * @returns {Promise<Object>}
   */
  affinity: (limit = 20) => fetchAPI(`/affinity?limit=${limit}`),

  /**
   * Get impact metrics
   * @returns {Promise<Object>}
   */
  impactMetrics: () => fetchAPI('/impact-metrics'),
};