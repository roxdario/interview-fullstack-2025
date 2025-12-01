import React from 'react';
import Card from './Card';

const SummaryCard = ({ title, items, className = '' }) => {
  return (
    <Card className={`impact-card ${className}`} title={title}>
      <div className="impact-card-header">
      </div>
      <div className="impact-card-body">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span>{item}</span>
            {idx < items.length - 1 && <span style={{marginRight: '4px', marginLeft: '4px'}}>  |  </span>}
          </React.Fragment>
        ))}
      </div>
    </Card>
  );
};

export default SummaryCard;
