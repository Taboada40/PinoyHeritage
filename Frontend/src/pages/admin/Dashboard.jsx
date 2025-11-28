import React from 'react';
import '../../styles/admin/dashboard.css';
import Sidebar from "../../components/admin/Sidebar";

import barotSayaImg from "../../assets/imgs/products/barotsaya.png";
import filipinianaImg from "../../assets/imgs/products/filipiniana.jpg";
import malongImg from "../../assets/imgs/products/malong.jpg";
import salakotImg from "../../assets/imgs/products/salakot.jpg"; 
import camisaImg from "../../assets/imgs/products/camisa.jpg";
import bakyaImg from "../../assets/imgs/products/bakya.jpg";
import tnalakImg from "../../assets/imgs/products/tnalak.jpg";

const Dashboard = () => {
  const stats = {
    customers: 321,
    products: 513,
    orders: 119
  };

  const recentProducts = [
    {
      id: 1,
      name: "Baro't Saya",
      category: "Clothing & Apparel",
      image: barotSayaImg, 
    },
    {
      id: 2,
      name: "Filipiniana",
      category: "Clothing & Apparel",
      image: filipinianaImg,
    },
    {
      id: 3,
      name: "Malong",
      category: "Textile & Fabric",
      image: malongImg,
    },
    {
      id: 4,
      name: "Bakya",
      category: "Accessories",
      image: bakyaImg,
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <main className="dashboard-container">
        {/* 1. Stats Cards Section */}
        <div className="dashboard-stats">
          <div className="db-stat-card">
            <h2 className="db-stat-number">{stats.customers}</h2>
            <p className="db-stat-label">Customers</p>
          </div>
          <div className="db-stat-card">
            <h2 className="db-stat-number">{stats.products}</h2>
            <p className="db-stat-label">Products</p>
          </div>
          <div className="db-stat-card">
            <h2 className="db-stat-number">{stats.orders}</h2>
            <p className="db-stat-label">Orders</p>
          </div>
        </div>

        {/* 2. Recent Products Section */}
        <div className="recent-products-section">
          <div className="db-section-header">
            <h3 className="db-section-title">Products</h3>
            <a href="/admin/products" className="view-all-btn">View all</a>
          </div>

          <div className="product-list">
            {recentProducts.map((product) => (
              <div key={product.id} className="product-list-item">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="product-thumb" 
                />
                <div className="product-details">
                  <h4 className="product-name">{product.name}</h4>
                  <p className="product-category">Category: {product.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;