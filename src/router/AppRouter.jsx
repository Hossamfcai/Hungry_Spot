import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../Pages/Landing/LandingPage";
import DashboardLayout from "../Components/Layout/DashboardLayout";
import Statistics from "../Pages/Dashboard/Statistics";
import Menu from "../Pages/Dashboard/Menu";
import Orders from "../Pages/Dashboard/Orders";
import Users from "../Pages/Dashboard/Users";
import NotFoundPage from "../Pages/NotFoundPage";
import ResturantPage from "../Pages/Restaurant/RestaurantPage";
import AuthenticationLayout from "../Components/Layout/AuthenticationLayout";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedAuth from "./ProtectedAuth";
export default function AppRouter() {
  return (
    <Routes>
      {/*if there are authenticated user or admin can not return to landing page without logout first so empty */}
      <Route element={<ProtectedAuth />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingPage" element={<LandingPage />} />
      </Route>
      {/*if there are authenticated user or admin can not return to Authentication pages without logout first so empty */}
      <Route element={<ProtectedAuth />}>
        <Route path="/Authentication" element={<AuthenticationLayout />}>
          <Route index element={<Navigate to="Login" replace />} />
          <Route path="Login" element={<Login />} />
          <Route path="Sign_Up" element={<SignUp />} />
        </Route>
      </Route>
      {/*only admin has access to this route */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/Dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="Statistics" replace />} />
          <Route path="Statistics" element={<Statistics />} />
          <Route path="Menu" element={<Menu />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="Users" element={<Users />} />
        </Route>
      </Route>
      {/* admin and user have access to this route */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "user"]} />}>
        <Route path="/Resturant" element={<ResturantPage />} />
      </Route>
      {/* Unkown Path */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
