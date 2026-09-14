import { Bell, ChevronDown, Search } from "lucide-react";

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
          <button
            type="button"
            className="users-icon-button"
            aria-label="Search"
          >
            <Search />
          </button>

          <button
            type="button"
            className="users-icon-button"
            aria-label="Notifications"
          >
            <Bell />
          </button>

          <button type="button" className="users-profile-button">
            <span className="users-profile-avatar">AM</span>

            <span className="users-profile-info">
              <strong>Admin Manager</strong>
              <span>Administrator</span>
            </span>
            <ChevronDown className="users-profile-arrow" />
          </button>
        </div>
      </div>
    </header>
  );
}
