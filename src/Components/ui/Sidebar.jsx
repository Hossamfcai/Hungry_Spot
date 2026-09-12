import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableCellsLarge,
  faBoxOpen,
  faUsers,
  faChartLine,
  faSliders,
  faXmark,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

function Sidebar({ isOpen, onClose }) {
  const navItems = [
    {
      name: "Analytics Dashboard",
      path: "/Dashboard/Statistics",
      icon: faChartLine,
    },
    {
      name: "Manage Products",
      path: "/Dashboard/Menu",
      icon: faBoxOpen,
      badge: "24 Items",
    },
    {
      name: "Manage Users",
      path: "/Dashboard/Users",
      icon: faUsers,
    },
    {
      name: "Manage Orders",
      path: "/Dashboard/Orders",
      icon: faSliders,
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? "show" : ""}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isOpen ? "open" : ""}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="brand-icon">
            <FontAwesomeIcon icon={faWandMagicSparkles} />
          </div>

          <div>
            <h2>SALON RESERVE</h2>
            <span>Curated Gastronomy</span>
          </div>

          {/* Close button - mobile */}
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <FontAwesomeIcon icon={item.icon} />

              <span className="sidebar-link-text">{item.name}</span>

              {item.badge && (
                <span className="sidebar-badge">{item.badge}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
