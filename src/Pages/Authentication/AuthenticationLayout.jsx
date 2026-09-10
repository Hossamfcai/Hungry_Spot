import { Outlet } from "react-router-dom";

export default function AuthenticationLayout() {
  return (
    <>
      <div>Hi from AuthenticationLayout</div> <Outlet />
    </>
  );
}
