import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAuth() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    if (role == "admin") {
      return <Navigate to="/Dashboard" replace />;
    }
    return <Navigate to="/Restaurant" replace />;
  }
  return <Outlet />;
}
