import { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar/SearchBar';
import DataTable from '../components/DataTable/DataTable';
import FilterDropdown from '../components/FilterDropdown/FilterDropdown';
import Pagination from '../components/Pagination/Pagination';
import EmptyState from '../components/EmptyState/EmptyState';
import gradesData from '../data/grades';
import '../styles/grades.css';

const semesterOptions = [
  { value: 'All', label: 'All Semesters' },
  { value: 'Semester 1', label: 'Semester 1' },
  { value: 'Semester 2', label: 'Semester 2' },
];

const PAGE_SIZE = 10;

function Grades() {
  const [searchTerm, setSearchTerm] = useState('');
  const [semester, setSemester] = useState('All');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let result = [...gradesData];
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      result = result.filter(r => r.studentName.toLowerCase().includes(q) || r.course.toLowerCase().includes(q));
    }
    if (semester !== 'All') {
      result = result.filter(r => r.semester === semester);
    }
    return result;
  }, [searchTerm, semester]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const stats = useMemo(() => {
    const pass = gradesData.filter(g => g.status === 'Pass').length;
    const fail = gradesData.filter(g => g.status === 'Fail').length;
    const sum = gradesData.reduce((s, g) => s + g.grade, 0);
    const avg = gradesData.length > 0 ? (sum / gradesData.length).toFixed(1) : '0';
    return { total: gradesData.length, pass, fail, avg: parseFloat(avg) };
  }, []);

  const columns = [
    { key: 'studentId', label: 'Roll No', sortable: true },
    { key: 'studentName', label: 'Student Name', sortable: true },
    { key: 'course', label: 'Course', sortable: true },
    { key: 'grade', label: 'Grade', sortable: true },
    { key: 'letterGrade', label: 'Letter' },
    {
      key: 'status',
      label: 'Status',
      render: (row) => (
        <span className={`status-badge ${row.status === 'Pass' ? 'badge-active' : 'badge-inactive'}`}>
          {row.status}
        </span>
      ),
    },
  ];

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Grades</h1>
      <p className="page-subtitle">Track student academic performance</p>

      <div className="row g-3 mb-4">
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Total Records</p>
            <h3 className="stat-value">{stats.total}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Passed</p>
            <h3 className="stat-value" style={{ color: '#10b981' }}>{stats.pass}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Failed</p>
            <h3 className="stat-value" style={{ color: '#ef4444' }}>{stats.fail}</h3>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="stat-card">
            <p className="stat-label">Avg Grade</p>
            <h3 className="stat-value">{stats.avg}</h3>
          </div>
        </div>
      </div>

      <div className="content-card">
        <div className="grades-filters">
          <div style={{ flex: 1, minWidth: 200 }}>
            <SearchBar
              placeholder="Search by student or course..."
              value={searchTerm}
              onChange={(val) => { setSearchTerm(val); setPage(1); }}
            />
          </div>
          <div className="filter-item">
            <label className="filter-label">Semester</label>
            <FilterDropdown
              label=""
              value={semester}
              options={semesterOptions}
              onChange={(val) => { setSemester(val); setPage(1); }}
            />
          </div>
        </div>

        {paged.length === 0 ? (
          <EmptyState
            icon="bi-star"
            title="No grades found"
            message="No records match your current filters."
          />
        ) : (
          <>
            <DataTable columns={columns} data={paged} emptyMessage="No grades found." />
            <div className="d-flex flex-wrap justify-content-between align-items-center mt-3">
              <small className="text-muted">Showing {paged.length} of {filtered.length} records</small>
              <Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Grades;
