import React, { useState, useEffect } from "react";
import productsApi from "../../api/productsApi"; 
import ProductsModal from "./ProductsModal";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // --- Toast State (From Old Logic) ---
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type }), 3000);
  };

  const fetchProducts = async () => {
    try {
      const res = await productsApi.get();
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Logic: Handle Delete (Restored) ---
  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await productsApi.delete(`/${id}`);
      showToast("Product deleted successfully", "success");
      fetchProducts();
    } catch (error) {
      showToast("Failed to delete product", "error");
    }
  };

  // --- Logic: Handle Edit (Restored) ---
  const openEditModal = (product) => {
    setProductToEdit(product);
    setShowModal(true);
  };

  const openAddModal = () => {
    setProductToEdit(null);
    setShowModal(true);
  };

  return (
    <div className="products-section">
      {/* Toast UI */}
      {toast.show && (
        <div style={{
          position: 'fixed', right: 20, bottom: 20,
          backgroundColor: toast.type === 'success' ? '#38a169' : '#e53e3e',
          color: '#fff', padding: '10px 14px', borderRadius: 8, zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}>
          {toast.message}
        </div>
      )}

      <div className="products-header">
        <button className="add-product-btn" onClick={openAddModal}>+ Add Product</button>
      </div>

      <div className="products-list">
        {paginatedProducts.length > 0 ? (
            paginatedProducts.map(product => (
            <div key={product.id} className="product-item">
                <img 
                  src={product.imageUrl || product.image} 
                  alt={product.name} 
                  className="product-image"
                />
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  {/* Robust category check (string vs object) */}
                  <div className="product-category">
                    Category: {typeof product.category === 'object' ? product.category.name : product.category}
                  </div>
                </div>
                <div className="product-actions">
                  <button 
                      className="action-btn edit-btn" 
                      title="Edit"
                      onClick={() => openEditModal(product)} // Attached Handler
                  >
                      ✏️
                  </button>
                  <button 
                      className="action-btn delete-btn" 
                      onClick={() => handleDeleteProduct(product.id)}
                      title="Delete"
                  >
                      🗑️
                  </button>
                </div>
            </div>
            ))
        ) : (
            <div style={{ textAlign: "center", fontStyle: "italic", width: "100%", padding: "2rem 0" }}>
            No products found
            </div>
        )}
      </div>

      {/* Pagination UI */}
      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          ←
        </button>
        <span className="page-info">Page {currentPage} of {totalPages || 1}</span>
        <button
          className="page-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          →
        </button>
      </div>

      <ProductsModal
        show={showModal}
        onClose={() => setShowModal(false)}
        refreshProducts={fetchProducts}
        productToEdit={productToEdit} 
        showToast={showToast}         
      />
    </div>
  );
};

export default ProductsSection;