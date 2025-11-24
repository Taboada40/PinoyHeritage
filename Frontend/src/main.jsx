import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage.jsx"
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/authentication/Login.jsx";
import Signup from "./pages/authentication/Signup.jsx";

import ProductCatalog from "./pages/products/ProductCatalog.jsx";
import ProductDetails from "./pages/products/ProductDetails.jsx";

import Profile from "./pages/customer/Profile.jsx";
import Review from "./pages/customer/Review.jsx";
import Payment from "./pages/customer/Payment.jsx";

import AdminUsers from "./pages/admin/Users.jsx";
import AdminManage from "./pages/admin/Manage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalog" element={<ProductCatalog />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        {/* Customer Pages */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/review" element={<Review />} />
        <Route path="/payment" element={<Payment />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin Pages */}
        <Route path="/admin" element={<AdminManage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/products" element={<AdminManage />} />
        <Route path="/admin/categories" element={<AdminManage />} />
        <Route path="/admin/orders" element={<AdminManage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);