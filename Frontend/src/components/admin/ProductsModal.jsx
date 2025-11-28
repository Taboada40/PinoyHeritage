import React, { useState, useEffect } from "react";

// Use same API base as other admin code
const API_BASE = 'http://localhost:8080';

const apiFetch = async (url, options = {}) => {
  const full = url.startsWith('http') ? url : `${API_BASE}${url}`;
  const res = await fetch(full, options);
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    throw new Error(`${res.status} ${txt}`);
  }
  if (res.status === 204) return null;
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
};

const ProductsModal = ({ show, onClose, refreshProducts, productToEdit, showToast }) => {
  const initialFormState = {
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    images: [],
  };

  const [formData, setFormData] = useState(initialFormState);
  const [categories, setCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log("[ID: ProductsModal] Fetching categories...");
        const data = await apiFetch('/api/admin/categories');
        console.log("[ID: ProductsModal] Categories fetched:", Array.isArray(data) ? data.length : 0, "categories");
        (Array.isArray(data) ? data : []).forEach(cat => console.log(`[CAT-ID: ${cat.id}] ${cat.name}`));
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("[ID: ProductsModal] Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // --- Logic: Populate Form for Edit Mode ---
  useEffect(() => {
    if (productToEdit) {
      console.log(`[ID: ${productToEdit.id}] Edit mode - loading product data`);
      const categoryName = typeof productToEdit.category === 'object' 
        ? productToEdit.category.name 
        : productToEdit.category;
      console.log(`[ID: ${productToEdit.id}] Category: ${categoryName}, Stock: ${productToEdit.stock}`);
      setFormData({
        name: productToEdit.name || "",
        category: categoryName,
        price: productToEdit.price || "",
        stock: productToEdit.stock || "",
        description: productToEdit.description || "",
        images: [],
      });
    } else {
      console.log("[ID: ProductsModal] Add mode - reset form");
      setFormData(initialFormState);
    }
  }, [productToEdit, show]);

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

  // --- Logic: Handle Submit (POST vs PUT) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const productId = productToEdit?.id || 'NEW';
    console.log(`[ID: ${productId}] Submitting form - Mode: ${productToEdit ? 'EDIT' : 'ADD'}`);
    console.log(`[ID: ${productId}] Form data:`, {
      name: formData.name,
      category: formData.category,
      price: formData.price,
      stock: formData.stock,
      images: formData.images.length
    });

    try {
      // Build JSON payload for create/update (server expects JSON)
      const payload = {
        name: formData.name,
        category: formData.category ? { name: formData.category } : null,
        price: parseFloat(formData.price) || 0,
        stock: parseInt(formData.stock) || 0,
        description: formData.description || ''
      };

      let created = null;
      if (productToEdit) {
        console.log(`[ID: ${productId}] Sending PUT (JSON) to /api/admin/products/${productToEdit.id}`);
        created = await apiFetch(`/api/admin/products/${productToEdit.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        console.log(`[ID: ${productId}] Product updated (JSON):`, created);
        showToast("Product updated successfully", "success");
      } else {
        console.log(`[ID: ${productId}] Sending POST (JSON) to /api/admin/products`);
        created = await apiFetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        console.log(`[ID: ${created?.id || 'NEW'}] New product created (JSON)`);
        showToast("Product added successfully", "success");
      }

      // Upload images separately (if any)
      if (formData.images && formData.images.length > 0 && created && created.id) {
        const fd = new FormData();
        formData.images.forEach((img) => fd.append('images', img));
        const uploadResp = await fetch(`${API_BASE}/api/admin/products/${created.id}/images`, {
          method: 'POST',
          body: fd,
        });
        if (!uploadResp.ok) {
          const txt = await uploadResp.text().catch(() => '');
          console.error(`[ID: ${created.id}] Image upload failed:`, txt);
          showToast('Product saved but image upload failed', 'error');
        } else {
          console.log('[IMAGE] Uploaded successfully');
        }
      }

      refreshProducts();
      onClose();
    } catch (err) {
      console.error(`[ID: ${productId}] Error saving product:`, err);
      showToast("Failed to save product: " + (err.response?.data?.message || err.message), "error");
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
      <div className="add-modal-ui">
        <div className="modal-header">
          {/* Dynamic Title with Product ID */}
          <h2>
            {productToEdit ? `Edit Product (ID: ${productToEdit.id})` : "Add New Product"}
          </h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          {/* IMAGE UPLOAD UI */}
          <div className="image-upload-section">
            <label className="section-title">
                {productToEdit ? "Add New Images (Optional)" : "Product Images"}
            </label>

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
                    <img src={URL.createObjectURL(file)} alt={file.name} />
                    <div className="file-info">
                      <span className="file-name">{file.name}</span>
                      <br></br>
                      <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
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
                  onClick={() => setFormData((prev) => ({ ...prev, images: [] }))}
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
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
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
            <button type="button" className="cancel-btn" onClick={onClose} disabled={isSubmitting}>
                Cancel
            </button>
            <button type="submit" className="save-btn" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : (productToEdit ? "Update Product" : "Add Product")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductsModal;