import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserStatCard({
  label,
  value,
  change,
  icon,
  iconClass = "",
}) {
  return (
    <article className="user-stat-card">
      <div className="user-stat-top">
        <span className="user-stat-label">{label}</span>

        <span className={`user-stat-icon ${iconClass}`}>
          <FontAwesomeIcon icon={icon} />
        </span>
      </div>

      <div className="user-stat-bottom">
        <strong className="user-stat-value">{value}</strong>

        {change && <span className="user-stat-change">{change}</span>}
      </div>
    </article>
  );
}