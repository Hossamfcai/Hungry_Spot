import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import {
  useMenuDispatch,
  useMenuState,
  useOrdersDispatch,
  useOrdersState,
  useUsersDispatch,
  useUsersState,
} from "../../Contexts/AppContext.jsx";
import Sidebar from "../ui/Sidebar.jsx";
import "../../styles/DashboardLayout.css";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { users } = useUsersState();
  const { getAllUsersData } = useUsersDispatch();
  const { orders } = useOrdersState();
  const { getOrdersData } = useOrdersDispatch();
  const { getMenuData } = useMenuDispatch();
  const { menu } = useMenuState();

  useEffect(() => {
    getAllUsersData();
    getMenuData();
    getOrdersData();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1241) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="dashboard-layout">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Mobile Navbar */}
        <header className="mobile-navbar">
          {!sidebarOpen && (
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
          )}

          <h2>SALON RESERVE</h2>
        </header>

        <main className="dashboard-content">
          <Outlet />
        </main>
      </div>
    </>
  );
}
