import { useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import StudentTable from "../components/StudentTable/StudentTable";
import StudentModal from "../components/StudentModal/StudentModal";
import studentsData from "../data/students";
import "../styles/students.css";

function Students() {
  const [students, setStudents] = useState(studentsData);
  const [searchTerm, setSearchTerm] = useState("");

  // controls which modal is open: "add", "edit", "view" or null (closed)
  const [modalMode, setModalMode] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Filter the students list based on the name typed in the search box
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openAddModal = () => {
    setSelectedStudent(null);
    setModalMode("add");
  };

  const openEditModal = (student) => {
    setSelectedStudent(student);
    setModalMode("edit");
  };

  const openViewModal = (student) => {
    setSelectedStudent(student);
    setModalMode("view");
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedStudent(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (confirmDelete) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  // called from the modal when the user clicks SAVE
  const handleSave = (formData) => {
    if (modalMode === "add") {
      const newStudent = {
        ...formData,
        id: Date.now(), // simple unique id for a new student
      };
      setStudents([...students, newStudent]);
    } else if (modalMode === "edit") {
      setStudents(
        students.map((student) =>
          student.id === selectedStudent.id
            ? { ...formData, id: student.id }
            : student
        )
      );
    }
    closeModal();
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Students</h1>
      <p className="page-subtitle">Manage student information and records</p>

      <div className="content-card">
        <SearchBar
          placeholder="Search..."
          value={searchTerm}
          onChange={setSearchTerm}
          buttonText="ADD STUDENT"
          onButtonClick={openAddModal}
        />

        <StudentTable
          students={filteredStudents}
          onView={openViewModal}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>

      {modalMode && (
        <StudentModal
          mode={modalMode}
          student={selectedStudent}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Students;
