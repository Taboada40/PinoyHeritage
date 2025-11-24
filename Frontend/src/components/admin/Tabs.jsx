import React from "react";
import "../../styles/admin/admin.css";

const Tabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="admin-tabs">
      <button
        className={activeTab === "products" ? "tab active" : "tab"}
        onClick={() => setActiveTab("products")}
      >
        Products
      </button>

      <button
        className={activeTab === "categories" ? "tab active" : "tab"}
        onClick={() => setActiveTab("categories")}
      >
        Categories
      </button>

      <button
        className={activeTab === "orders" ? "tab active" : "tab"}
        onClick={() => setActiveTab("orders")}
      >
        Orders
      </button>
    </div>
  );
};

export default Tabs;
