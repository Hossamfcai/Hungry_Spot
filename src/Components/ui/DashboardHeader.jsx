import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

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
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>

          <button
            type="button"
            className="users-icon-button"
            aria-label="Notifications"
          >
            <FontAwesomeIcon icon={faBell} />
          </button>

          <button type="button" className="users-profile-button">
            <span className="users-profile-avatar">AM</span>

            <span className="users-profile-info">
              <strong>Admin Manager</strong>
              <span>Administrator</span>
            </span>

            <FontAwesomeIcon
              icon={faChevronDown}
              className="users-profile-arrow"
            />
          </button>
        </div>
      </div>
    </header>
  );
}