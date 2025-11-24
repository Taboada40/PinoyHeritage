import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Tabs from "../../components/admin/Tabs";
import CategoriesSection from "../../components/admin/ManageCategories";
import ProductsSection from "../../components/admin/ManageProducts";
import OrdersSection from "../../components/admin/ManageOrders";
import "../../styles/admin/admin.css";

const Manage = () => {
  const [activeTab, setActiveTab] = useState("products");

  return (
    <>
      <Sidebar />
      <main className="main-content">
        <div className="page-header"></div>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "categories" && <CategoriesSection />}
        {activeTab === "products" && <ProductsSection />}
        {activeTab === "orders" && <OrdersSection />}
      </main>
    </>
  );
};

export default Manage;
