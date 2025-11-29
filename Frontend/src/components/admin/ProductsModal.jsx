import React, { useState, useEffect } from "react";

const ProductsModal = ({ 
  show, 
  onClose, 
  refreshProducts, 
  productToEdit, 
  showToast, 
  onImageUpload, 
  api, 
  modalType = "add" // 'add', 'edit', 'delete'
}) => {
  
  const initialFormState = {
    name: "",
    category: "",
    price: "",
    stock: "",
    sizes: "", 
    description: "",
    images: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);

  // --- 1. Fetch Categories (Only for Add/Edit) ---
  useEffect(() => {
    if (!show || modalType === 'delete') return;

    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const data = await api('/api/admin/categories');
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        showToast("Failed to load categories", "error");
      } finally {
        setLoadingCategories(false);
      }
    };
    
    fetchCategories();
  }, [show, api, showToast, modalType]);

  // --- 2. Populate Form (Only for Edit) ---
  useEffect(() => {
    if (modalType === 'edit' && productToEdit && show) {
      const categoryName = typeof productToEdit.category === 'object' 
        ? productToEdit.category.name 
        : productToEdit.category;
      
      let sizesString = "";
      if (productToEdit.sizes) {
        try {
          const sizesArray = JSON.parse(productToEdit.sizes);
          sizesString = sizesArray.join(', ');
        } catch (e) {
          sizesString = productToEdit.sizes;
        }
      }
      
      setFormData({
        name: productToEdit.name || "",
        category: categoryName || "",
        price: productToEdit.price || "",
        stock: productToEdit.stock || "",
        sizes: sizesString,
        description: productToEdit.description || "",
        images: [],
      });
    } else if (modalType === 'add' && show) {
      setFormData(initialFormState);
    }
  }, [productToEdit, show, modalType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // --- 3. Handle Add/Edit Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const categoryObj = categories.find(cat => cat.name === formData.category);
      let sizesArray = [];
      if (formData.sizes && formData.sizes.trim()) {
        sizesArray = formData.sizes.split(',').map(size => size.trim()).filter(size => size !== '');
      }
      
      const payload = {
        name: formData.name,
        category: categoryObj || (formData.category ? { name: formData.category } : null),
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        sizes: sizesArray.length > 0 ? JSON.stringify(sizesArray) : null,
        description: formData.description || ''
      };

      let savedProduct = null;
      
      if (modalType === 'edit') {
        savedProduct = await api(`/api/admin/products/${productToEdit.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
      } else {
        savedProduct = await api('/api/admin/products', {
          method: 'POST',
          body: JSON.stringify(payload)
        });
      }

      if (formData.images.length > 0 && savedProduct && savedProduct.id) {
        try {
          await onImageUpload(savedProduct.id, formData.images);
        } catch (uploadError) {
          showToast('Product saved but image upload failed', 'warning');
        }
      }

      const verb = modalType === 'edit' ? 'updated' : 'added';
      showToast(`Product ${verb} successfully`, "success");
      refreshProducts();
      onClose();
      
    } catch (err) {
      showToast("Failed to save product: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- 4. Handle Delete Submit ---
  const handleDelete = async () => {
    if (!productToEdit?.id) return;
    setIsSubmitting(true);
    try {
      await api(`/api/admin/products/${productToEdit.id}`, {
        method: 'DELETE'
      });
      showToast("Product deleted successfully", "success");
      refreshProducts();
      onClose();
    } catch (err) {
      console.error("Delete failed:", err);
      showToast("Failed to delete product: " + err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal-overlay show"
      onClick={(e) => {
        if (e.target.className === "modal-overlay show") onClose();
      }}
    >
      {/* Dynamic Class: 'modal' for small delete popup, 'add-modal-ui' for large form */}
      <div className={modalType === "delete" ? "modal" : "add-modal-ui"}>
        
        {modalType === "delete" ? (
          /* --- DELETE UI --- */
          <>
            <button className="modal-close" onClick={onClose} disabled={isSubmitting}>×</button>
            <h2 className="modal-title">Delete Product</h2>
            
            <div className="delete-warning">
              <p>Are you sure you want to delete <strong>{productToEdit?.name}</strong>?</p>
              <p><strong>This action cannot be undone.</strong></p>
            </div>

            <div className="modal-buttons">
              <button 
                className="modal-btn btn-danger" 
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
              <button 
                className="modal-btn btn-secondary" 
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          /* --- ADD / EDIT UI --- */
          <>
            <div className="modal-header">
              <h2>
                {modalType === 'edit' ? "Edit Product": "Add New Product"}
              </h2>
              <button className="close-btn" onClick={onClose} disabled={isSubmitting}>×</button>
            </div>

            <form className="modal-body" onSubmit={handleSubmit}>
              {/* IMAGE UPLOAD UI */}
              <div className="image-upload-section">
                <label className="section-title">
                    {modalType === 'edit' ? "Add New Images (Optional)" : "Product Images"}
                </label>

                <div
                  className="upload-box"
                  onClick={() => !isSubmitting && document.getElementById("fileInput").click()}
                  style={{ opacity: isSubmitting ? 0.6 : 1 }}
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
                  disabled={isSubmitting}
                />

                {formData.images.length > 0 && (
                  <div className="uploaded-list">
                    {formData.images.map((file, index) => (
                      <div key={index} className="uploaded-item">
                        <img src={URL.createObjectURL(file)} alt={file.name} />
                        <div className="file-info">
                          <span className="file-name">{file.name}</span>
                          <br />
                          <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                        <button
                          type="button"
                          className="delete-file-btn"
                          onClick={() => removeImage(index)}
                          disabled={isSubmitting}
                        >
                          🗑️
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="clear-all-btn"
                      onClick={() => setFormData((prev) => ({ ...prev, images: [] }))}
                      disabled={isSubmitting}
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>

              {/* FORM FIELDS UI */}
              <div className="fields-grid">
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  {loadingCategories ? (
                    <select disabled>
                      <option>Loading categories...</option>
                    </select>
                  ) : (
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  )}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-group full">
                <label>Sizes (Optional)</label>
                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleInputChange}
                  placeholder="Enter sizes available (e.g., S, M, L, XL, XXL)"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group full">
                <label>Description</label>
                <textarea
                  name="description"
                  rows="4"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <div className="modal-footer">
                <button type="button" className="cancel-btn" onClick={onClose} disabled={isSubmitting}>
                    Cancel
                </button>
                <button type="submit" className="save-btn" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : (modalType === 'edit' ? "Update Product" : "Add Product")}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsModal;