import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/styles/AdminCategories.css";

// API instance
const api = axios.create({
  baseURL: "http://localhost:8080/api/admin/categories", // Spring Boot API
});

// Sidebar Component
const Sidebar = () => (
  <aside className="sidebar">
    <a href="#" className="logo-admin">
      <div className="logo-icon">PH</div>
      <span>Pinoy Heritage</span>
    </a>
    <nav className="sidebar-menu">
      <a href="#" className="menu-item">
        <span className="menu-icon"></span>
        <span>Dashboard</span>
      </a>
      <a href="#" className="menu-item">
        <span className="menu-icon"></span>
        <span>Users</span>
      </a>
      <a href="#" className="menu-item active">
        <span className="menu-icon"></span>
        <span>Manage</span>
      </a>
      <a href="#" className="menu-item">
        <span className="menu-icon"></span>
        <span>Products</span>
      </a>
    </nav>
    <a href="#" className="menu-item logout-item">
      <span className="menu-icon"></span>
      <span>Logout</span>
    </a>
  </aside>
);

// Tabs Component
const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="tabs">
    <button
      className={`tab-btn ${activeTab === "products" ? "" : ""}`}
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

// Modal Component
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
    <div className="modal-overlay show">
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

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await api.get();
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
      await api.post("", { name: modalCategoryName });
      fetchCategories();
      closeModal();
    } catch (error) {
      alert("Failed to add category: " + error.response.data.message || error.message);
    }
  };

  const handleUpdateCategory = async () => {
    try {
      await api.put(`/${selectedCategoryId}`, { name: modalCategoryName });
      fetchCategories();
      closeModal();
    } catch (error) {
      alert("Failed to update category: " + error.response.data.message || error.message);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      await api.delete(`/${selectedCategoryId}`);
      fetchCategories();
      closeModal();
    } catch (error) {
      alert("Failed to delete category: " + error.response.data.message || error.message);
    }
  };

  return (
    <div className="admin-categories-section">
      <div className="admin-section-header">
        <div className="category-search">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              className="search-input"
              placeholder="Search categories"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
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

      {/* Pagination */}
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

      {/* Modal */}
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

// Main Component
const AdminCategories = () => {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <>
      <Sidebar />
      <main className="main-content">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === "categories" && <CategoriesSection />}
        {activeTab === "products" && <div>Products content goes here</div>}
      </main>
    </>
  );
};

export default AdminCategories;
