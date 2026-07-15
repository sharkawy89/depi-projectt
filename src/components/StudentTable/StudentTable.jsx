// Helper to build initials for the avatar circle, e.g. "Emma Wilson" -> "EW"
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function StudentTable({ students, onView, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle data-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Roll No</th>
            <th>Class</th>
            <th>Department</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-muted py-4">
                No students found.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>
                  <div className="avatar-circle">{getInitials(student.name)}</div>
                </td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.rollNo}</td>
                <td>{student.className}</td>
                <td>{student.department}</td>
                <td>
                  <span
                    className={`status-badge ${
                      student.status === "Active" ? "badge-active" : "badge-inactive"
                    }`}
                  >
                    {student.status}
                  </span>
                </td>
                <td>
                  <div className="action-icons">
                    <i
                      className="bi bi-pencil-fill icon-edit"
                      title="Edit"
                      onClick={() => onEdit(student)}
                    ></i>
                    <i
                      className="bi bi-eye-fill icon-view"
                      title="View"
                      onClick={() => onView(student)}
                    ></i>
                    <i
                      className="bi bi-trash-fill icon-delete"
                      title="Delete"
                      onClick={() => onDelete(student.id)}
                    ></i>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
