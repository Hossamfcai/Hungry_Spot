import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../Pages/Landing/LandingPage";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import Statistics from "../Pages/Dashboard/Statistics";
import Menu from "../Pages/Dashboard/Menu";
import Orders from "../Pages/Dashboard/Orders";
import Users from "../Pages/Dashboard/Users";
import NotFoundPage from "../Pages/NotFoundPage";
import ResturantPage from "../Pages/Restaurant/RestaurantPage";
import AuthenticationLayout from "../Pages/Authentication/AuthenticationLayout";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/landingPage" element={<LandingPage />} />
      <Route path="/Authentication" element={<AuthenticationLayout />}>
        <Route index element={<Navigate to="Login" replace />} />
        <Route path="Login" element={<Login />} />
        <Route path="Sign_Up" element={<SignUp />} />
      </Route>
      <Route path="/Dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="Statistics" replace />} />
        <Route path="Statistics" element={<Statistics />} />
        <Route path="Menu" element={<Menu />} />
        <Route path="Orders" element={<Orders />} />
        <Route path="Users" element={<Users />} />
      </Route>
      <Route path="/Resturant" element={<ResturantPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
