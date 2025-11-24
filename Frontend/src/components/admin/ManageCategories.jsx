import React, { useState, useEffect } from "react";
import categoriesApi from "../../api/categoriesApi";
import CategoryModal from "./CategoryModal";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [modalCategoryName, setModalCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchCategories = async () => {
    try { const res = await categoriesApi.get(); setCategories(res.data); }
    catch (error) { console.error(error); }
  };

  useEffect(() => { fetchCategories(); }, []);

  const filteredCategories = categories; 
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (type, category = null) => {
    setModalType(type);
    setModalCategoryName(category ? category.name : "");
    setSelectedCategoryId(category ? category.id : null);
  };

  const closeModal = () => {
    setModalType(null);
    setModalCategoryName("");
    setSelectedCategoryId(null);
  };

  const handleAddCategory = async () => {
    await categoriesApi.post("", { name: modalCategoryName });
    fetchCategories(); closeModal();
  };

  const handleUpdateCategory = async () => {
    await categoriesApi.put(`/${selectedCategoryId}`, { name: modalCategoryName });
    fetchCategories(); closeModal();
  };

  const handleDeleteCategory = async () => {
    await categoriesApi.delete(`/${selectedCategoryId}`);
    fetchCategories(); closeModal();
  };

  return (
    <div className="admin-categories-section">
      <div className="admin-section-header">
        <button className="add-category-btn" onClick={() => openModal("add")}>
          <span>+</span> Add New Category
        </button>
      </div>
      <table className="categories-table">
        <thead>
          <tr><th>Category Name</th><th>Actions</th></tr>
        </thead>
        <tbody>
            {paginatedCategories.length > 0 ? (
                paginatedCategories.map((category) => (
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
                ))
            ) : (
                <tr>
                <td colSpan="2" style={{ textAlign: "center", fontStyle: "italic", color: "#666" }}>
                    No categories found
                </td>
                </tr>
            )}
            </tbody>
      </table>
      <CategoryModal
        type={modalType}
        show={!!modalType}
        onClose={closeModal}
        onSubmit={
          modalType === "add" ? handleAddCategory :
          modalType === "edit" ? handleUpdateCategory :
          handleDeleteCategory
        }
        categoryName={modalCategoryName}
        setCategoryName={setModalCategoryName}
      />
    </div>
  );
};

export default CategoriesSection;
