import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <>
      <div>Hi from DashboardLayout</div>
      <Outlet />
    </>
  );
}
