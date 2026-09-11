import { Outlet } from "react-router-dom";

export default function AuthenticationLayout() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
}
