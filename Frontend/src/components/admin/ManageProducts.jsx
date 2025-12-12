import React, { useState, useEffect } from "react";
import productsApi from "../../api/productsApi"; 
import ProductsModal from "./ProductsModal";

import deleteImg from "../../assets/icons/admin/delete.png";
import editImg from "../../assets/icons/admin/edit.png";

const API_BASE = 'http://localhost:8080';

const api = async (url, options = {}) => {
  const fullUrl = url.startsWith('http') ? url : `${API_BASE}${url}`;
  const opts = { ...options };
  const headers = { 'Content-Type': 'application/json', ...(opts.headers || {}) };
  
  try {
    const response = await fetch(fullUrl, { ...opts, headers, mode: 'cors' });
    if (!response.ok) {
      const text = await response.text().catch(() => '');
      throw new Error(`${response.status} ${text}`);
    }

    const ct = response.headers.get('content-type') || '';
    if (response.status === 204) return null;
    if (ct.includes('application/json')) return await response.json();
    const txt = await response.text();
    try { return JSON.parse(txt); } catch { return txt; }
  } catch (err) {
    throw new Error(err.message || 'Network Error');
  }
};

const ArrowLeft = () => (
  <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
    <path d="M1 6.36401C0.447715 6.36401 0 6.81173 0 7.36401C0 7.9163 0.447715 8.36401 1 8.36401V7.36401V6.36401ZM20.7071 8.07112C21.0976 7.6806 21.0976 7.04743 20.7071 6.65691L14.3431 0.292946C13.9526 -0.0975785 13.3195 -0.0975785 12.9289 0.292946C12.5384 0.68347 12.5384 1.31664 12.9289 1.70716L18.5858 7.36401L12.9289 13.0209C12.5384 13.4114 12.5384 14.0446 12.9289 14.4351C13.3195 14.8256 13.9526 14.8256 14.3431 14.4351L20.7071 8.07112ZM1 7.36401V8.36401H20V7.36401V6.36401H1V7.36401Z" fill="#0038A8" transform="scale(-1, 1) translate(-21, 0)" />
  </svg>
);

const ArrowRight = () => (
  <svg width="21" height="15" viewBox="0 0 21 15" fill="none">
    <path d="M1 6.36401C0.447715 6.36401 0 6.81173 0 7.36401C0 7.9163 0.447715 8.36401 1 8.36401V7.36401V6.36401ZM20.7071 8.07112C21.0976 7.6806 21.0976 7.04743 20.7071 6.65691L14.3431 0.292946C13.9526 -0.0975785 13.3195 -0.0975785 12.9289 0.292946C12.5384 0.68347 12.5384 1.31664 12.9289 1.70716L18.5858 7.36401L12.9289 13.0209C12.5384 13.4114 12.5384 14.0446 12.9289 14.4351C13.3195 14.8256 13.9526 14.8256 14.3431 14.4351L20.7071 8.07112ZM1 7.36401V8.36401H20V7.36401V6.36401H1V7.36401Z" fill="#0038A8" />
  </svg>
);

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null); 
  const [modalType, setModalType] = useState("add"); 

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const itemsPerPage = 6;

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type }), 3000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      console.log("[ID: ManageProducts.fetchProducts] Fetching products...");
      const res = await productsApi.get();
      
      let data = Array.isArray(res.data) ? res.data : (res.data?.value || []);
      setProducts(data);
    } catch (error) {
      console.error("[ID: ManageProducts.fetchProducts] Error fetching products:", error);
      showToast("Failed to fetch products", "error");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchProducts(); 
  }, []);

  const handleImageUpload = async (productId, files) => {
    if (!files || files.length === 0) return;
    
    try {
      const fd = new FormData();
      files.forEach(f => fd.append('images', f));

      const uploadRes = await fetch(`${API_BASE}/api/admin/products/${productId}/images`, {
        method: 'POST',
        body: fd,
      });

      if (!uploadRes.ok) throw new Error('Image upload failed');
      return true;
    } catch (error) {
      console.error(`[ID: ${productId}] Image upload error:`, error);
      throw error;
    }
  };

  const openModal = (type, product = null) => {
    console.log(`Opening modal: ${type}`, product);
    setModalType(type);         
    setProductToEdit(product);   
    setShowModal(true);         
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setProductToEdit(null);
    setModalType("add"); 
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const displaySizes = (sizes) => {
    if (!sizes) return 'None';
    try {
      const sizesArray = JSON.parse(sizes);
      return sizesArray.join(', ');
    } catch {
      return sizes;
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const showPagination = products.length > itemsPerPage;

  return (
    <div className="products-section">
      {/* Toast UI */}
      {toast.show && (
        <div className={`toast-notification ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
          {toast.message}
        </div>
      )}

      <div className="products-header">
        <button className="add-product-btn" onClick={() => openModal("add")}>
          <span>+</span>
          <span>Add New Product</span>
        </button>
      </div>

      {loading && (
        <div className="status-message">
          Loading products...
        </div>
      )}

      <div className="products-list">
        {!loading && paginatedProducts.length > 0 ? (
          paginatedProducts.map(product => (
            <div key={product.id} className="product-item" data-product-id={product.id}>
              <div className="product-image-container">
                {product.imageUrl ? (
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="manage-product-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/200?text=No+Image'; }}
                  />
                ) : (
                  <div className="image-placeholder">
                    📷
                  </div>
                )}
              </div>
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">₱{parseFloat(product.price || 0).toFixed(2)}</div>
                <div className="product-category">
                  {typeof product.category === 'object' ? product.category.name : product.category}
                </div>
                
                <div className="product-sizes-text">
                  Sizes: {displaySizes(product.sizes)}
                </div>
                
                <div className={`stock-badge ${product.stock > 0 ? 'stock-in' : 'stock-out'}`}>
                  Stock: {product.stock || 0}
                </div>
              </div>

              <div className="product-actions">
                <button 
                  className="action-btn edit-btn" 
                  title="Edit"
                  onClick={() => openModal("edit", product)} 
                >
                  <img 
                    src={editImg} 
                    alt="Edit" 
                    className="action-icon-img"
                  />
                </button>
                <button 
                  className="action-btn delete-btn" 
                  title="Delete"
                  onClick={() => openModal("delete", product)} 
                >
                  <img 
                    src={deleteImg} 
                    alt="Delete" 
                    className="action-icon-img"
                  />
                </button>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <div className="status-message italic">
              No products found
            </div>
          )
        )}
      </div>

      {/* Pagination UI */}
      {!loading && showPagination && (
        <div className="order-pagination">
          <button 
            className="nav-btn" 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ArrowLeft />
          </button>
          <span className="page-text">Page {currentPage} of {totalPages}</span>
          <button 
            className="nav-btn" 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowRight />
          </button>
        </div>
      )}

      {/* Modal Component */}
      <ProductsModal
        show={showModal}
        onClose={handleCloseModal} 
        refreshProducts={fetchProducts}
        productToEdit={productToEdit} 
        modalType={modalType} 
        showToast={showToast}
        onImageUpload={handleImageUpload}
        api={api}
      />
    </div>
  );
};

export default ProductsSection;