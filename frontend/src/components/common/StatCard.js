

/**
 * Reusable stat card component
 * @param {string} label - Card label
 * @param {number|string} value - Card value
 * @param {string} className - Additional CSS class
 */
const StatCard = ({ label, value, className = '' }) => {
  return (
    <div className={`stat-card ${className}`}>
      <div className="stat-value">{value ?? '-'}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
};


export default StatCard;
