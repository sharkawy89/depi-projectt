// Helper to build initials for the avatar circle, e.g. "Dr. Sarah Anderson" -> "DSA"
function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function TeacherTable({ teachers, onView, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table align-middle data-table">
        <thead>
          <tr>
            <th></th>
            <th>Teacher</th>
            <th>Department</th>
            <th>Subject</th>
            <th>Experience</th>
            <th>Courses</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center text-muted py-4">
                No teachers found.
              </td>
            </tr>
          ) : (
            teachers.map((teacher) => (
              <tr key={teacher.id}>
                <td>
                  <div className="avatar-circle">{getInitials(teacher.name)}</div>
                </td>
                <td>{teacher.name}</td>
                <td>{teacher.department}</td>
                <td>{teacher.subject}</td>
                <td>{teacher.experience} years</td>
                <td>{teacher.courses} courses</td>
                <td>
                  <span
                    className={`status-badge ${
                      teacher.status === "Active" ? "badge-active" : "badge-inactive"
                    }`}
                  >
                    {teacher.status}
                  </span>
                </td>
                <td>
                  <div className="action-icons">
                    <i
                      className="bi bi-eye-fill icon-view"
                      title="View"
                      onClick={() => onView(teacher)}
                    ></i>
                    <i
                      className="bi bi-pencil-fill icon-edit"
                      title="Edit"
                      onClick={() => onEdit(teacher)}
                    ></i>
                    <i
                      className="bi bi-trash-fill icon-delete"
                      title="Delete"
                      onClick={() => onDelete(teacher.id)}
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

export default TeacherTable;
