import { useState } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import EmptyState from '../components/EmptyState/EmptyState';
import initialCourses from '../data/courses';
import '../styles/courses.css';

function Courses() {
  const [courses, setCourses] = useState(initialCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '', instructor: '', students: '', duration: '', status: 'Active',
  });

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);
  const activeCourses = courses.filter(c => c.status === 'Active').length;

  const openModal = () => {
    setFormData({ title: '', instructor: '', students: '', duration: '', status: 'Active' });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.instructor || !formData.duration) return;
    const newCourse = {
      ...formData,
      id: Date.now(),
      students: parseInt(formData.students) || 0,
    };
    setCourses([...courses, newCourse]);
    closeModal();
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Courses</h1>
      <p className="page-subtitle">Manage academic courses and curricula</p>

      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Total Courses</p>
            <h3 className="stat-value">{courses.length}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Active</p>
            <h3 className="stat-value">{activeCourses}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Total Students</p>
            <h3 className="stat-value">{totalStudents}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Avg Students/Course</p>
            <h3 className="stat-value">{courses.length > 0 ? Math.round(totalStudents / courses.length) : 0}</h3>
          </div>
        </div>
      </div>

      <div className="content-card">
        <SearchBar
          placeholder="Search courses by title or instructor..."
          value={searchTerm}
          onChange={setSearchTerm}
          buttonText="ADD COURSE"
          onButtonClick={openModal}
        />

        {filteredCourses.length === 0 ? (
          <EmptyState
            icon="bi-journal-bookmark"
            title="No courses found"
            message="No courses match your current search. Try a different term."
          />
        ) : (
          <div className="course-grid">
            {filteredCourses.map(course => (
              <div key={course.id} className="course-card">
                <div className="course-card-header">
                  <span className={`status-badge badge-${course.status === 'Active' ? 'active' : course.status === 'Draft' ? 'warning' : 'info'}`}>
                    {course.status}
                  </span>
                </div>
                <h5 className="course-card-title">{course.title}</h5>
                <p className="course-card-instructor">
                  <i className="bi bi-person me-1"></i>{course.instructor}
                </p>
                <div className="course-card-meta">
                  <span><i className="bi bi-people me-1"></i>{course.students} Students</span>
                  <span><i className="bi bi-clock me-1"></i>{course.duration}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div className="modal-box-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Add New Course</h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={closeModal}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-box-body">
                <div className="modal-field">
                  <label>Course Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. Introduction to Physics" />
                </div>
                <div className="modal-field">
                  <label>Instructor Name</label>
                  <input required type="text" value={formData.instructor} onChange={e => setFormData({...formData, instructor: e.target.value})} placeholder="e.g. Dr. Sarah Wilson" />
                </div>
                <div className="row g-3">
                  <div className="col-6">
                    <div className="modal-field">
                      <label>Students</label>
                      <input type="number" value={formData.students} onChange={e => setFormData({...formData, students: e.target.value})} placeholder="0" />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="modal-field">
                      <label>Duration</label>
                      <input required type="text" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 12 Weeks" />
                    </div>
                  </div>
                </div>
                <div className="modal-field">
                  <label>Status</label>
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>
              </div>
              <div className="modal-box-footer">
                <button type="button" className="btn btn-outline-secondary" onClick={closeModal}>Cancel</button>
                <button type="submit" className="btn btn-primary">Add Course</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
