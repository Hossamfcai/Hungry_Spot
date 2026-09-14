import React from "react";

const AnalyticsSummaryCard = ({
  label,
  value,
  description,
  icon,
}) => {
  return (
    <article className="analytics-summary-card">
      <div className="summary-icon">
        {icon}
      </div>

      <div className="summary-content">
        <p>{label}</p>

        <strong>{value}</strong>

        <span>{description}</span>
      </div>
    </article>
  );
};

export default AnalyticsSummaryCard;