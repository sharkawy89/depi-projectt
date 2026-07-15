import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import TeacherTable from "../components/TeacherTable/TeacherTable";
import TeacherModal from "../components/TeacherModal/TeacherModal";
import teachersData from "../data/teachers";
import "../styles/teachers.css";

function Teachers() {
  const [teachers, setTeachers] = useState(teachersData);
  const [searchTerm, setSearchTerm] = useState("");

  // controls which modal is open: "add", "edit", "view" or null (closed)
  const [modalMode, setModalMode] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // stat card numbers are calculated live from the current teacher list
  const totalTeachers = teachers.length;
  const activeTeachers = teachers.filter((t) => t.status === "Active").length;
  const totalCourses = teachers.reduce((sum, t) => sum + Number(t.courses), 0);
  const totalExperience = teachers.reduce(
    (sum, t) => sum + Number(t.experience),
    0
  );
  const avgExperience =
    totalTeachers === 0 ? 0 : (totalExperience / totalTeachers).toFixed(1);

  const openAddModal = () => {
    setSelectedTeacher(null);
    setModalMode("add");
  };

  const openEditModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalMode("edit");
  };

  const openViewModal = (teacher) => {
    setSelectedTeacher(teacher);
    setModalMode("view");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedTeacher(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );
    if (confirmDelete) {
      setTeachers(teachers.filter((teacher) => teacher.id !== id));
    }
  };

  const handleSave = (formData) => {
    if (modalMode === "add") {
      const newTeacher = {
        ...formData,
        id: Date.now(),
      };
      setTeachers([...teachers, newTeacher]);
    } else if (modalMode === "edit") {
      setTeachers(
        teachers.map((teacher) =>
          teacher.id === selectedTeacher.id
            ? { ...formData, id: teacher.id }
            : teacher
        )
      );
    }
    closeModal();
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Teachers</h1>
      <p className="page-subtitle">Manage teaching staff and their assignments</p>

      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Total Teachers</p>
            <h3 className="stat-value">{totalTeachers}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Active</p>
            <h3 className="stat-value">{activeTeachers}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Total Courses</p>
            <h3 className="stat-value">{totalCourses}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Avg. Experience</p>
            <h3 className="stat-value">{avgExperience} years</h3>
          </div>
        </div>
      </div>

      <div className="content-card">
        <SearchBar
          placeholder="Search teacher..."
          value={searchTerm}
          onChange={setSearchTerm}
          buttonText="ADD TEACHER"
          onButtonClick={openAddModal}
        />

        <TeacherTable
          teachers={filteredTeachers}
          onView={openViewModal}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>

      {modalMode && (
        <TeacherModal
          mode={modalMode}
          teacher={selectedTeacher}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Teachers;
