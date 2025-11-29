import React, { useState, useEffect } from 'react';
import '../../styles/admin/dashboard.css';
import Sidebar from "../../components/admin/Sidebar";
import customersApi from "../../api/customersApi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    orders: 119
  });
  
  const [recentProducts, setRecentProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'http://localhost:8080';

  // Fetch products and customers data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch products from your existing API
        const productsResponse = await fetch(`${API_BASE}/api/admin/products`);
        
        if (!productsResponse.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const productsData = await productsResponse.json();
        
        // Handle both array response and object with 'value' property
        const productsArray = Array.isArray(productsData) ? productsData : (productsData?.value || []);
        
        // Fetch customers from customersApi
        let customersArray = [];
        try {
          const customersResponse = await customersApi.get("");
          customersArray = customersResponse.data && customersResponse.data.length > 0 
            ? customersResponse.data 
            : [];
        } catch (customerError) {
          console.warn('Failed to fetch customers, using fallback data:', customerError);
          // Use fallback sample data if API fails
          customersArray = [
            { id: 101, name: "Marc Benn Secong", email: "mb.secong@gmail.com", address: "Cebu City", phone: "0923-098-0987" },
            { id: 102, name: "Munchkin Taboada", email: "munchtb@gmail.com", address: "Las Piñas City", phone: "0932-432-1029" },
            { id: 103, name: "Niña Villadarez", email: "nvlldrx@gmail.com", address: "Quezon City", phone: "0926-457-6229" },
            { id: 104, name: "Sharbelle Farenheit", email: "sharbzff@gmail.com", address: "Davao City", phone: "0911-080-9232" },
            { id: 105, name: "Princess Celcius", email: "celciusPP@gmail.com", address: "Bacolod City", phone: "0945-655-9207" },
            { id: 106, name: "Minji Kim", email: "kminjik@gmail.com", address: "Seoul City", phone: "0965-918-1137" },
            { id: 107, name: "Kyle Yu", email: "kk_yuk@gmail.com", address: "Marikina City", phone: "0908-509-6901" },
            { id: 108, name: "Heineka Go", email: "hein.g0@gmail.com", address: "Alabang", phone: "0921-350-8768" },
          ];
        }

        // Update stats with real data
        setStats({
          customers: customersArray.length,
          products: productsArray.length,
          orders: 119 // Keep orders as mock data 
        });
        
        // Get the 4 most recent products 
        const recentProductsData = productsArray
          .sort((a, b) => b.id - a.id) // Sort by ID
          .slice(0, 4) // Get first 4
          .map(product => ({
            id: product.id,
            name: product.name,
            category: typeof product.category === 'object' ? product.category.name : product.category,
            image: product.imageUrl || 'https://via.placeholder.com/100?text=No+Image'
          }));

        setRecentProducts(recentProductsData);
        
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
        
        // Fallback to mock data if API fails completely
        setStats({
          customers: 321,
          products: 0,
          orders: 119
        });
        setRecentProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Helper function to handle image errors
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/100?text=No+Image';
  };

  if (loading) {
    return (
      <div className="dashboard-wrapper">
        <Sidebar />
        <main className="dashboard-container">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            Loading dashboard...
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-wrapper">
        <Sidebar />
        <main className="dashboard-container">
          <div style={{ textAlign: 'center', padding: '2rem', color: '#e53e3e' }}>
            {error}
          </div>
        </main>
      </div>
    );
  }

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

          {recentProducts.length > 0 ? (
            <div className="product-list">
              {recentProducts.map((product) => (
                <div key={product.id} className="product-list-item">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="product-thumb" 
                    onError={handleImageError}
                  />
                  <div className="product-details">
                    <h4 className="product-name">{product.name}</h4>
                    <p className="product-category">Category: {product.category || 'Uncategorized'}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem', fontStyle: 'italic' }}>
              No products found
            </div>
          )}
        </div>

      </main>
    </div>
  );
};

export default Dashboard;