import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import {
  ChartLine,
  Package,
  Users,
  SlidersHorizontal,
  X,
  WandSparkles,
} from "lucide-react";

function Sidebar({ isOpen, onClose }) {
  const navItems = [
    {
      name: "Analytics Dashboard",
      path: "/Dashboard/Statistics",
      icon: ChartLine,
    },
    {
      name: "Manage Products",
      path: "/Dashboard/Menu",
      icon: Package,
      badge: "24 Items",
    },
    {
      name: "Manage Users",
      path: "/Dashboard/Users",
      icon: Users,
    },
    {
      name: "Manage Orders",
      path: "/Dashboard/Orders",
      icon: SlidersHorizontal,
    },
  ];

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isLoggedIn");

    navigate("/");
  };

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
            <WandSparkles />
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
            <X />
          </button>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? "active" : ""}`
                }
              >
                <Icon />

                <span className="sidebar-link-text">{item.name}</span>

                {item.badge && (
                  <span className="sidebar-badge">{item.badge}</span>
                )}
              </NavLink>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
