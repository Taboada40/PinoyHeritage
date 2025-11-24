import React, { useState, useEffect } from "react";
import productsApi from "../../api/productsApi";
import categoriesApi from "../../api/categoriesApi";

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
        const res = await categoriesApi.get();
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // --- Logic: Populate Form for Edit Mode ---
  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || "",
        // Handle case where category is object {id, name} or just string
        category: typeof productToEdit.category === 'object' ? productToEdit.category.name : productToEdit.category,
        price: productToEdit.price || "",
        stock: productToEdit.stock || "",
        description: productToEdit.description || "",
        images: [], // Reset images for edit mode (user uploads NEW ones if they want)
      });
    } else {
      setFormData(initialFormState); // Reset for Add mode
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

    try {
      const data = new FormData();
      // Append fields
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("description", formData.description);
      
      // Append images
      formData.images.forEach((img) => data.append("images", img));

      if (productToEdit) {
        // Update (PUT)
        await productsApi.put(`/${productToEdit.id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Product updated successfully", "success");
      } else {
        // Create (POST)
        await productsApi.post("", data, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Product added successfully", "success");
      }

      refreshProducts();
      onClose();
    } catch (err) {
      console.error(err);
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
          {/* Dynamic Title */}
          <h2>{productToEdit ? "Edit Product" : "Add Product"}</h2>
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