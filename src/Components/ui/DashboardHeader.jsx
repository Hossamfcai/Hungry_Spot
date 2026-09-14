export default function DashboardHeader({
  eyebrow = "Operations Dashboard",
  title,
  description,
}) {
  return (
    <header className="users-page-header">
      <div className="users-header-main">
        <div>
          <p className="users-eyebrow">{eyebrow}</p>

          <h1 className="users-page-title">{title}</h1>

          {description && (
            <p className="users-page-description">{description}</p>
          )}
        </div>

        <div className="users-header-actions">
          <span className="users-profile-avatar">AM</span>

          <span className="users-profile-info">
            <strong>Admin Manager</strong>
            <span>Administrator</span>
          </span>
        </div>
      </div>
    </header>
  );
}
