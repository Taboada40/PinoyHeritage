import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./templates/LandingPage.jsx";
import ProductCatalog from "../products/templates/ProductCatalog.jsx";
import ProductDetail from "../products/templates/ProductDetails.jsx";
import Login from "./templates/login.jsx";
import Signup from "./templates/signup.jsx";
import Profile from "./templates/Profile.jsx"; // ✅ Added this line

import "./index.css";
import "./assets/styles/auth.css";
import "./assets/styles/profile.css"; // ✅ Added this line to include Profile styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<ProductCatalog />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} /> {/* ✅ New route */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
