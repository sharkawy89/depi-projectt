import { useState, useEffect } from "react";

// empty form used when adding a new teacher
const emptyForm = {
  name: "",
  department: "",
  subject: "",
  experience: "",
  courses: "",
  status: "Active",
  email: "",
  phone: "",
  address: "",
};

// mode can be "add", "edit" or "view"
function TeacherModal({ mode, teacher, onSave, onClose }) {
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");

  // Fill the form whenever the modal is opened for edit/view
  useEffect(() => {
    if (teacher) {
      setFormData(teacher);
    } else {
      setFormData(emptyForm);
    }
    setError("");
  }, [teacher, mode]);

  const isViewMode = mode === "view";

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = () => {
    const requiredFields = [
      "name",
      "department",
      "subject",
      "experience",
      "courses",
      "status",
      "email",
      "phone",
      "address",
    ];

    const hasEmptyField = requiredFields.some(
      (field) => String(formData[field]).trim() === ""
    );

    if (hasEmptyField) {
      setError("Please fill in all required fields.");
      return;
    }

    // convert numeric fields back to numbers before saving
    onSave({
      ...formData,
      experience: Number(formData.experience),
      courses: Number(formData.courses),
    });
  };

  const title =
    mode === "add"
      ? "Add Teacher"
      : mode === "edit"
      ? "Edit Teacher"
      : "Teacher Details";

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
            <label>Department *</label>
            <input
              type="text"
              disabled={isViewMode}
              value={formData.department}
              onChange={(e) => handleChange("department", e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label>Subject *</label>
            <input
              type="text"
              disabled={isViewMode}
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label>Experience (years) *</label>
            <input
              type="number"
              min="0"
              disabled={isViewMode}
              value={formData.experience}
              onChange={(e) => handleChange("experience", e.target.value)}
            />
          </div>

          <div className="modal-field">
            <label>Courses *</label>
            <input
              type="number"
              min="0"
              disabled={isViewMode}
              value={formData.courses}
              onChange={(e) => handleChange("courses", e.target.value)}
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
            <label>Email *</label>
            <input
              type="email"
              disabled={isViewMode}
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
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

export default TeacherModal;
