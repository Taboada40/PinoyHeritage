import React from "react";

const CategoryModal = ({ type, show, onClose, onSubmit, categoryName, setCategoryName }) => {
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
        <button className="modal-close" onClick={onClose}>×</button>
        {type !== "delete" ? (
          <>
            <h2 className="modal-title">{titleMap[type]}</h2>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
              <div className="form-group">
                <label>{type === "add" ? "Category Name:" : "New Category Name:"}</label>
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
                <button type="button" className="modal-btn btn-secondary" onClick={onClose}>
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
              <p><strong>This action cannot be undone.</strong></p>
            </div>
            <div className="modal-buttons">
              <button className="modal-btn btn-danger" onClick={onSubmit}>Delete</button>
              <button className="modal-btn btn-secondary" onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryModal;
