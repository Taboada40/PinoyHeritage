import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./templates/LandingPage.jsx";
import HomePage from "../home_page/templates/homepage.jsx";
import ProductCatalog from "../products/templates/ProductCatalog.jsx";
import ProductDetail from "../products/templates/ProductDetails.jsx";
import Login from "./templates/login.jsx";
import Signup from "./templates/signup.jsx";
import Profile from "./templates/profile.jsx";
import Review from "./templates/review.jsx"; // ✅ Added Review page
import Profile from "./templates/profile.jsx"; // ✅ Added this line
import AdminCategories from "../admin/templates/AdminCategories.jsx";

import "./index.css";
import "./assets/styles/auth.css";
import "./assets/styles/profile.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/catalog" element={<ProductCatalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        {/* 
          ⭐ REVIEW PAGE
          Current route: /review
          If later you want product-specific reviews:
          CHANGE this → <Route path="/product/:id/review" element={<Review />} />
        */}
        <Route path="/review" element={<Review />} />
        <Route path="/profile" element={<Profile />} /> {/* ✅ New route */}
        <Route path="/admin/categories" element={<AdminCategories />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
