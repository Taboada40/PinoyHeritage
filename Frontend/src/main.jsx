import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx"
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/authentication/Login.jsx";
import Signup from "./pages/authentication/Signup.jsx";

import ProductCatalog from "./pages/products/ProductCatalog.jsx";
import ProductDetails from "./pages/products/ProductDetails.jsx";

import Profile from "./pages/customer/Profile.jsx";
import Review from "./pages/customer/Review.jsx";
import Payment from "./pages/customer/Payment.jsx";
import CartPage from "./pages/customer/CartPage.jsx";   

import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminUsers from "./pages/admin/Users.jsx";
import AdminManage from "./pages/admin/Manage.jsx";

const RequireAdmin = ({ children }) => {
  const role = localStorage.getItem("role");
  if (role !== "ADMIN") {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const RequireCustomer = ({ children }) => {
  const role = localStorage.getItem("role");
  if (role === "ADMIN") {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return children;
};

const RouteGuard = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname || "";
    const role = localStorage.getItem("role");

    // If an admin navigates away from any /admin route, clear admin role
    if (role === "ADMIN" && !path.startsWith("/admin")) {
      localStorage.removeItem("role");
    }
  }, [location.pathname]);

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/catalog" element={<ProductCatalog />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      {/* Customer Pages (Customer-only) */}
      <Route
        path="/profile"
        element={
          <RequireCustomer>
            <Profile />
          </RequireCustomer>
        }
      />
      <Route
        path="/review"
        element={
          <RequireCustomer>
            <Review />
          </RequireCustomer>
        }
      />
      <Route
        path="/payment"
        element={
          <RequireCustomer>
            <Payment />
          </RequireCustomer>
        }
      />
      <Route
        path="/cart"
        element={
          <RequireCustomer>
            <CartPage />
          </RequireCustomer>
        }
      />   

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Admin Pages (Protected) */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminManage />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <RequireAdmin>
            <AdminDashboard />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAdmin>
            <AdminUsers />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/products"
        element={
          <RequireAdmin>
            <AdminManage />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <RequireAdmin>
            <AdminManage />
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <RequireAdmin>
            <AdminManage />
          </RequireAdmin>
        }
      />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <RouteGuard />
    </BrowserRouter>
  </React.StrictMode>
);
