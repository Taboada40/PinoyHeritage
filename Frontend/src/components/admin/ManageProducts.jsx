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
      console.log("[ID: ManageProducts.fetchProducts] API Response:", res.data);
      // Handle both array response and object with 'value' property
      let data = Array.isArray(res.data) ? res.data : (res.data?.value || []);
      console.log("[ID: ManageProducts.fetchProducts] Processed data count:", data.length);
      data.forEach(p => console.log(`[ID: ${p.id}] Product: ${p.name}, Stock: ${p.stock}, Image: ${p.imageUrl ? 'Yes' : 'No'}`));
      setProducts(data);
    } catch (error) {
      console.error("[ID: ManageProducts.fetchProducts] Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => { 
    console.log("[ID: ManageProducts] Component mounted, fetching products...");
    fetchProducts(); 
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Logic: Handle Delete (Restored) ---
  const handleDeleteProduct = async (id) => {
    console.log(`[ID: ${id}] Delete confirmation requested`);
    if (!window.confirm("Are you sure you want to delete this product?")) {
      console.log(`[ID: ${id}] Delete cancelled by user`);
      return;
    }
    
    try {
      console.log(`[ID: ${id}] Sending DELETE request to /api/admin/products/${id}`);
      await productsApi.delete(`/${id}`);
      console.log(`[ID: ${id}] Product deleted successfully`);
      showToast("Product deleted successfully", "success");
      fetchProducts();
    } catch (error) {
      console.error(`[ID: ${id}] Error deleting product:`, error);
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
            <div key={product.id} className="product-item" data-product-id={product.id}>
                <div className="product-image-container">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="product-image"
                      onError={(e) => { 
                        console.log(`[ID: ${product.id}] Image failed to load, using placeholder`);
                        e.target.src = 'https://via.placeholder.com/200?text=No+Image'; 
                      }}
                      onLoad={() => console.log(`[ID: ${product.id}] Image loaded successfully`)}
                    />
                  ) : (
                    <div style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f0f0f0',
                      fontSize: '3rem'
                    }}>
                      📷
                    </div>
                  )}
                </div>
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                  <div className="product-price">₱{parseFloat(product.price).toFixed(2)}</div>
                  <div className="product-category">
                    {typeof product.category === 'object' ? product.category.name : product.category}
                  </div>
                  <div className="product-stock" style={{
                    backgroundColor: product.stock > 0 ? '#c6f6d5' : '#fed7d7',
                    color: product.stock > 0 ? '#276749' : '#9b2c2c',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.85rem',
                    marginTop: '0.5rem'
                  }}>
                    Stock: {product.stock || 0}
                  </div>
                </div>
                <div className="product-actions">
                  <button 
                      className="action-btn edit-btn" 
                      title="Edit"
                      data-product-id={product.id}
                      onClick={() => {
                        console.log(`[ID: ${product.id}] Edit clicked for product: ${product.name}`);
                        openEditModal(product);
                      }}
                  >
                      ✏️
                  </button>
                  <button 
                      className="action-btn delete-btn" 
                      data-product-id={product.id}
                      onClick={() => {
                        console.log(`[ID: ${product.id}] Delete clicked for product: ${product.name}`);
                        handleDeleteProduct(product.id);
                      }}
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