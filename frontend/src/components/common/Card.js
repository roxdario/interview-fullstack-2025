import React from 'react';
/**
 * Reusable card container component
 * @param {string} title - Card title
 * @param {string} description - Optional description
 * @param {ReactNode} children - Card content
 * @param {string} className - CSS class
 */
const Card = ({ title, description, children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {title && <h2 className="card-title">{title}</h2>}
      {description && <p className="card-description">{description}</p>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export default Card;
