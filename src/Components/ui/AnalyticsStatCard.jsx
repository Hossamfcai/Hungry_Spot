import React from "react";

const AnalyticsStatCard = ({
  label,
  value,
  subLabel,
  secondaryText,
  change,
  icon,
  variant = "orange",
}) => {
  return (
    <article className={`analytics-stat-card ${variant}`}>
      <div className="analytics-stat-top">
        <span>{label}</span>

        <div className={`analytics-stat-icon ${variant}`}>
          {icon}
        </div>
      </div>

      <div className="analytics-stat-value">
        {value}
      </div>

      <div className="analytics-stat-bottom">
        <span>{subLabel}</span>

        {secondaryText && (
          <span>{secondaryText}</span>
        )}

        {change && (
          <strong>{change}</strong>
        )}
      </div>

      <div className="analytics-stat-progress">
        <span></span>
      </div>
    </article>
  );
};

export default AnalyticsStatCard;