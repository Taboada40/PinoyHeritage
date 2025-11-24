import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; 
import ErrorBoundary from "../components/ErrorBoundary";
import "../assets/styles/AdminCategories.css";

// API instances
const categoriesApi = axios.create({
  baseURL: "/api/admin/categories",
});

const productsApi = axios.create({
  baseURL: "/api/admin/products",
});

// Tabs Component
const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="tabs">
    <button
      className={`tab-btn ${activeTab === "products" ? "active" : ""}`}
      onClick={() => setActiveTab("products")}
    >
      Products
    </button>
    <button
      className={`tab-btn ${activeTab === "categories" ? "active" : ""}`}
      onClick={() => setActiveTab("categories")}
    >
      Categories
    </button>
  </div>
);

// Category Modal Component
const CategoryModal = ({
  type,
  show,
  onClose,
  onSubmit,
  categoryName,
  setCategoryName,
}) => {
  if (!show) return null;

  const titleMap = {
    add: "Add New Category",
    edit: "Edit Category",
    delete: "Delete Category",
  };

  return (
    <div className="modal-overlay show" onClick={(e) => {
      if (e.target.className === "modal-overlay show") onClose();
    }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
        {type !== "delete" ? (
          <>
            <h2 className="modal-title">{titleMap[type]}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <div className="form-group">
                <label className="form-label">
                  {type === "add" ? "Category Name:" : "New Category Name:"}
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter category name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  required
                />
              </div>
              <div className="modal-buttons">
                <button type="submit" className="modal-btn btn-primary">
                  {type === "add" ? "Add" : "Update"}
                </button>
                <button
                  type="button"
                  className="modal-btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <h2 className="modal-title">{titleMap[type]}</h2>
            <div className="delete-warning">
              <p>Are you sure you want to delete this category?</p>
              <p>
                <strong>This action cannot be undone.</strong>
              </p>
            </div>
            <div className="modal-buttons">
              <button className="modal-btn btn-danger" onClick={onSubmit}>
                Delete
              </button>
              <button
                className="modal-btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Categories Section
const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalType, setModalType] = useState(null);
  const [modalCategoryName, setModalCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCategories = async () => {
    try {
      const res = await categoriesApi.get();
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (type, category = null) => {
    setModalType(type);
    if (category) {
      setModalCategoryName(category.name);
      setSelectedCategoryId(category.id);
    } else {
      setModalCategoryName("");
      setSelectedCategoryId(null);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setModalCategoryName("");
    setSelectedCategoryId(null);
  };

  const handleAddCategory = async () => {
    try {
      await categoriesApi.post("", { name: modalCategoryName });
      fetchCategories();
      closeModal();
    } catch (error) {
      alert("Failed to add category: " + (error.response?.data?.message || error.message));
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await categoriesApi.put(`/${selectedCategoryId}`, { name: modalCategoryName });
      fetchCategories();
      closeModal();
    } catch (error) {
      alert("Failed to update category: " + (error.response?.data?.message || error.message));
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await categoriesApi.delete(`/${selectedCategoryId}`);
      fetchCategories();
      closeModal();
    } catch (error) {
      alert("Failed to delete category: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="admin-categories-section">
      <div className="admin-section-header">
        <div className="category-search">
        </div>
        <button className="add-category-btn" onClick={() => openModal("add")}>
          <span>+</span>
          <span>Add New Category</span>
        </button>
      </div>

      <table className="categories-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="action-btn edit-btn"
                    onClick={() => openModal("edit", category)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="action-btn delete-btn"
                    onClick={() => openModal("delete", category)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          ←
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          className="page-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          →
        </button>
      </div>

      <CategoryModal
        type={modalType}
        show={!!modalType}
        onClose={closeModal}
        onSubmit={
          modalType === "add"
            ? handleAddCategory
            : modalType === "edit"
            ? handleUpdateCategory
            : handleDeleteCategory
        }
        categoryName={modalCategoryName}
        setCategoryName={setModalCategoryName}
      />
    </div>
  );
};

// Products Section Component
const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    images: []
  });
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [editingProductId, setEditingProductId] = useState(null);

  const showToast = (message, type = 'success', duration = 3000) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type }), duration);
  };

  const fetchProducts = async () => {
    try {
      const res = await productsApi.get();
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await categoriesApi.get();
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const paginatedProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    // To keep the flow simple and reliable, send a JSON payload (no file upload).
    // The backend accepts JSON and will create the product in MySQL. The catalog
    // UI will use a fallback image if `imageUrl` is not provided.
    const payload = {
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      stock: parseInt(formData.stock) || 0,
      description: formData.description,
    };

    try {
      let created = null;
      if (editingProductId) {
        // Update existing product
        const res = await productsApi.put(`/${editingProductId}`, payload);
        created = res.data;
      } else {
        const res = await productsApi.post("", payload);
        created = res.data;
      }

      // If admin selected images in the modal, upload them to the new endpoint
      if (formData.images && formData.images.length > 0 && created && created.id) {
        const fd = new FormData();
        formData.images.forEach(img => fd.append('images', img));

        // Use fetch so the browser sets Content-Type including boundary
        const uploadRes = await fetch(`/api/admin/products/${created.id}/images`, {
          method: 'POST',
          body: fd,
        });

        if (!uploadRes.ok) {
          const txt = await uploadRes.text();
          console.error('Image upload failed:', txt);
          showToast('Product saved but image upload failed', 'error');
        }
      }

      await fetchProducts();
      closeModal();
      const verb = editingProductId ? 'updated' : 'added';
      showToast(`Product ${verb} successfully`, 'success');
    } catch (error) {
      console.error('Save product error:', error);
      showToast("Failed to save product: " + (error.response?.data || error.message), 'error');
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productsApi.delete(`/${id}`);
        fetchProducts();
        showToast('Product deleted successfully', 'success');
      } catch (error) {
        showToast("Failed to delete product: " + (error.response?.data?.message || error.message), 'error');
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      images: []
    });
    setEditingProductId(null);
  };

  const openProductModal = (product = null) => {
    // If product provided, open modal in edit mode and prefill
    if (product) {
      setEditingProductId(product.id);
      setFormData({
        name: product.name || '',
        category: (product.category && (product.category.name || product.category)) || '',
        price: product.price ?? '',
        stock: product.stock ?? '',
        description: product.description || '',
        images: []
      });
    } else {
      setEditingProductId(null);
      setFormData({
        name: "",
        category: "",
        price: "",
        stock: "",
        description: "",
        images: []
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      images: []
    });
  };

  return (
    <div className="products-section">
      {toast.show && (
        <div style={{
          position: 'fixed',
          right: 20,
          bottom: 20,
          backgroundColor: toast.type === 'success' ? '#38a169' : '#e53e3e',
          color: '#fff',
          padding: '10px 14px',
          borderRadius: 8,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999,
        }}>{toast.message}</div>
      )}
      <div className="products-header">
        <button className="add-product-btn" onClick={() => openProductModal(null)}>
          <span>+</span>
          <span>Add New Product</span>
        </button>
      </div>

      <div className="products-list">
        {paginatedProducts.map(product => (
          <div key={product.id} className="product-item">
            <img 
              src={product.imageUrl || product.image} 
              alt={product.name} 
              className="product-image"
            />
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-category">Category: {product.category?.name || product.category || '-'}</div>
            </div>
            <div className="product-actions">
              <button 
                className="action-btn edit-btn" 
                title="Edit"
                onClick={() => openProductModal(product)}
              >
                ✏️
              </button>
              <input
                type="file"
                id={`upload-${product.id}`}
                accept="image/*"
                style={{ display: 'none' }}
                onChange={async (e) => {
                  const files = Array.from(e.target.files || []);
                  if (files.length === 0) return;
                  const fd = new FormData();
                  files.forEach(f => fd.append('images', f));
                  try {
                    const r = await fetch(`/api/admin/products/${product.id}/images`, {
                      method: 'POST',
                      body: fd,
                    });
                    if (!r.ok) {
                      const txt = await r.text();
                      showToast('Image upload failed', 'error');
                    } else {
                      fetchProducts();
                      showToast('Image uploaded successfully', 'success');
                    }
                  } catch (err) {
                    console.error('Upload error', err);
                    showToast('Upload failed: ' + err.message, 'error');
                  }
                }}
              />
              <button
                className="action-btn upload-btn"
                onClick={() => document.getElementById(`upload-${product.id}`).click()}
                title="Upload Image"
              >
                📤
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
        ))}
      </div>

      <div className="pagination">
        <button
          className="page-btn"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        >
          ←
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          className="page-btn"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        >
          →
        </button>
      </div>

      {showModal && (
        <div
            className="modal-overlay show"
            onClick={(e) => {
            if (e.target.className === "modal-overlay show") closeModal();
            }}
        >
            <div className="add-modal-ui">
            <div className="modal-header">
                <h2>Add Product</h2>
                <button className="close-btn" onClick={closeModal}>×</button>
            </div>

            <form className="modal-body" onSubmit={handleAddProduct}>
                {/* IMAGE UPLOAD */}
                <div className="image-upload-section">
                <label className="section-title">Product Images</label>

                <div
                    className="upload-box"
                    onClick={() => document.getElementById("fileInput").click()}
                >
                    <div className="upload-icon">🖼️</div>
                    <p>Drop images here or <span className="browse">Browse</span></p>
                </div>

                <input
                    type="file"
                    id="fileInput"
                    multiple
                    accept="image/*"
                    hidden
                    onChange={handleFileSelect}
                />

                {formData.images.length > 0 && (
                    <div className="uploaded-list">
                    {formData.images.map((file, index) => (
                        <div key={index} className="uploaded-item">
                        <img src={URL.createObjectURL(file)} />
                        <div className="file-info">
                            <span className="file-name">{file.name}</span>
                            <span className="file-size">
                            {(file.size / 1024).toFixed(1)} KB
                            </span>
                        </div>
                        <button
                            type="button"
                            className="delete-file-btn"
                            onClick={() => removeImage(index)}
                        >
                            🗑️
                        </button>
                        </div>
                    ))}

                    <button
                        type="button"
                        className="clear-all-btn"
                        onClick={() =>
                        setFormData((prev) => ({ ...prev, images: [] }))
                        }
                    >
                        Clear All
                    </button>
                    </div>
                )}
                </div>

                {/* FORM FIELDS */}
                <div className="fields-grid">
                <div className="form-group">
                    <label>Product Name</label>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select category</option>

                        {/* FIXED OPTIONS */}
                        <option value="Clothing & Apparel">Clothing & Apparel</option>
                        <option value="Textile & Fabric">Textile & Fabric</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Crafts">Crafts</option>
                        <option value="Souvenirs">Souvenirs</option>

                        {/* DYNAMIC OPTIONS FROM DATABASE */}
                        {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                            {cat.name}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Price (₱)</label>
                    <input
                    type="number"
                    name="price"
                    value={formData.price}
                    min="0"
                    step="0.01"
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div className="form-group">
                    <label>Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        min="0"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                </div>

                <div className="form-group full">
                <label>Description</label>
                <textarea
                    name="description"
                    rows="4"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                ></textarea>
                </div>
                
                <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                    Cancel
                </button>
                <button type="submit" className="save-btn">
                    Add Product
                </button>
                </div>
            </form>
            </div>
        </div>
        )}
    </div>
  );
};

// Main Component
const AdminCategories = () => {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <ErrorBoundary>
      <Sidebar />
      <main className="main-content">
        <div className="page-header">
        </div>
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "categories" && <CategoriesSection />}
        {activeTab === "products" && <ProductsSection />}
      </main>
    </ErrorBoundary>
  );
};

export default AdminCategories;