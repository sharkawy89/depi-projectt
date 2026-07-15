import { useState, useEffect } from "react";

// empty form used when adding a new student
const emptyForm = {
  name: "",
  email: "",
  rollNo: "",
  className: "",
  department: "",
  status: "Active",
  phone: "",
  address: "",
  gpa: "",
};

// mode can be "add", "edit" or "view"
function StudentModal({ mode, student, onSave, onClose }) {
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  // Fill the form whenever the modal is opened for edit/view
  useEffect(() => {
    if (student) {
      setFormData(student);
    } else {
      setFormData(emptyForm);
    }
    setError("");
  }, [student, mode]);

  const isViewMode = mode === "view";

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    // basic required field validation
    const requiredFields = [
      "name",
      "email",
      "rollNo",
      "className",
      "department",
      "status",
      "phone",
      "address",
      "gpa",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => String(formData[field]).trim() === ""
    );

    if (hasEmptyField) {
      setError("Please fill in all required fields.");
      return;
    }

    onSave(formData);
  };

  const title =
    mode === "add"
      ? "Add Student"
      : mode === "edit"
      ? "Edit Student"
      : "Student Details";

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-box-header">
          <h4>{title}</h4>
        </div>

        <div className="modal-box-body">
          {error && <div className="alert alert-danger py-2">{error}</div>}

          <div className="modal-field">
            <label>Name *</label>
            <input
              type="text"
              disabled={isViewMode}
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label>Email *</label>
            <input
              type="email"
              disabled={isViewMode}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label>RollNo *</label>
            <input
              type="text"
              disabled={isViewMode}
              value={formData.rollNo}
              onChange={(e) => handleChange("rollNo", e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label>Class *</label>
            <input
              type="text"
              disabled={isViewMode}
              value={formData.className}
              onChange={(e) => handleChange("className", e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label>Department *</label>
            <input
              type="text"
              disabled={isViewMode}
              value={formData.department}
              onChange={(e) => handleChange("department", e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label>Status *</label>
            <select
              disabled={isViewMode}
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="modal-field">
            <label>Phone *</label>
            <input
              type="text"
              disabled={isViewMode}
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label>Address *</label>
            <input
              type="text"
              disabled={isViewMode}
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label>Gpa *</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="4"
              disabled={isViewMode}
              value={formData.gpa}
              onChange={(e) => handleChange("gpa", e.target.value)}
            />
          </div>
        </div>

        <div className="modal-box-footer">
          {!isViewMode && (
            <button className="btn btn-primary" onClick={handleSave}>
              SAVE
            </button>
          )}
          <button className="btn btn-outline-primary" onClick={onClose}>
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

export default StudentModal;
