import api from './api';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

let attendanceRecords = [
  { id: 1, employeeId: 'E001', name: 'Emma Wilson', department: 'Science', date: '2026-07-15', timeIn: '08:15 AM', timeOut: '04:30 PM', status: 'Present', workingHours: 8.25, overtime: 0, lateMinutes: 0 },
  { id: 2, employeeId: 'E002', name: 'Michael Chen', department: 'Commerce', date: '2026-07-15', timeIn: '08:30 AM', timeOut: '04:45 PM', status: 'Present', workingHours: 8.25, overtime: 0, lateMinutes: 0 },
  { id: 3, employeeId: 'E003', name: 'Sarah Johnson', department: 'Engineering', date: '2026-07-15', timeIn: '09:00 AM', timeOut: '05:00 PM', status: 'Late', workingHours: 8.0, overtime: 0, lateMinutes: 30 },
  { id: 4, employeeId: 'E004', name: 'James Brown', department: 'Arts', date: '2026-07-15', timeIn: null, timeOut: null, status: 'Absent', workingHours: 0, overtime: 0, lateMinutes: 0 },
  { id: 5, employeeId: 'E005', name: 'Emily Davis', department: 'Science', date: '2026-07-15', timeIn: '08:45 AM', timeOut: '05:15 PM', status: 'Present', workingHours: 8.5, overtime: 0.5, lateMinutes: 0 },
  { id: 6, employeeId: 'E006', name: 'David Martinez', department: 'Commerce', date: '2026-07-15', timeIn: '08:20 AM', timeOut: '04:30 PM', status: 'Present', workingHours: 8.17, overtime: 0, lateMinutes: 0 },
  { id: 7, employeeId: 'E007', name: 'Olivia Taylor', department: 'Engineering', date: '2026-07-15', timeIn: '08:00 AM', timeOut: '04:00 PM', status: 'Present', workingHours: 8.0, overtime: 0, lateMinutes: 0 },
  { id: 8, employeeId: 'E008', name: 'Daniel Lee', department: 'Arts', date: '2026-07-15', timeIn: '09:30 AM', timeOut: '05:30 PM', status: 'Late', workingHours: 8.0, overtime: 0, lateMinutes: 60 },
  { id: 9, employeeId: 'E009', name: 'Sophia Miller', department: 'Science', date: '2026-07-15', timeIn: null, timeOut: null, status: 'On Leave', workingHours: 0, overtime: 0, lateMinutes: 0 },
  { id: 10, employeeId: 'E010', name: 'Ethan Garcia', department: 'Commerce', date: '2026-07-15', timeIn: '08:10 AM', timeOut: '04:20 PM', status: 'Present', workingHours: 8.17, overtime: 0, lateMinutes: 0 },
  { id: 11, employeeId: 'E011', name: 'Dr. Sarah Anderson', department: 'Science', date: '2026-07-15', timeIn: '08:00 AM', timeOut: '03:45 PM', status: 'Present', workingHours: 7.75, overtime: 0, lateMinutes: 0 },
  { id: 12, employeeId: 'E012', name: 'Prof. Emily Johnson', department: 'English', date: '2026-07-15', timeIn: '09:15 AM', timeOut: '05:30 PM', status: 'Late', workingHours: 8.25, overtime: 0.25, lateMinutes: 45 },
];

const allDepartments = ['Science', 'Commerce', 'Engineering', 'Arts', 'English', 'Math'];

export async function getAttendance({ search, department, status, date, page = 1, limit = 10, sortBy, sortOrder } = {}) {
  await delay(500);

  let filtered = [...attendanceRecords];

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter((r) => r.name.toLowerCase().includes(q) || r.employeeId.toLowerCase().includes(q));
  }

  if (department && department !== 'All') {
    filtered = filtered.filter((r) => r.department === department);
  }

  if (status && status !== 'All') {
    filtered = filtered.filter((r) => r.status === status);
  }

  if (date) {
    filtered = filtered.filter((r) => r.date === date);
  }

  if (sortBy) {
    const order = sortOrder === 'desc' ? -1 : 1;
    filtered.sort((a, b) => {
      const aVal = a[sortBy] ?? '';
      const bVal = b[sortBy] ?? '';
      if (typeof aVal === 'string') return aVal.localeCompare(bVal) * order;
      return (aVal - bVal) * order;
    });
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const records = filtered.slice(start, start + limit);

  return { records, total, page, totalPages, limit };
}

export async function getAttendanceByDate(date) {
  await delay(300);
  return attendanceRecords.filter((r) => r.date === date);
}

export async function checkIn(employeeId) {
  await delay(300);
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  const timeIn = `${hour12}:${m} ${ampm}`;
  const lateMinutes = h >= 9 ? (h - 9) * 60 + now.getMinutes() : 0;
  const record = {
    id: Date.now(),
    employeeId,
    name: 'Current User',
    department: 'Admin',
    date: now.toISOString().split('T')[0],
    timeIn,
    timeOut: null,
    status: lateMinutes > 0 ? 'Late' : 'Present',
    workingHours: 0,
    overtime: 0,
    lateMinutes,
  };
  attendanceRecords.unshift(record);
  return record;
}

export async function checkOut(employeeId) {
  await delay(300);
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  const timeOut = `${hour12}:${m} ${ampm}`;
  const record = attendanceRecords.find((r) => r.employeeId === employeeId && !r.timeOut);
  if (record) {
    record.timeOut = timeOut;
    const inDate = new Date(`2000-01-01T${record.timeIn}`);
    const outDate = new Date(`2000-01-01T${timeOut}`);
    record.workingHours = Number(((outDate - inDate) / (1000 * 60 * 60)).toFixed(2));
    record.overtime = record.workingHours > 8 ? Number((record.workingHours - 8).toFixed(2)) : 0;
  }
  return record;
}

export async function updateAttendance(id, data) {
  await delay(300);
  const idx = attendanceRecords.findIndex((r) => r.id === id);
  if (idx !== -1) {
    attendanceRecords[idx] = { ...attendanceRecords[idx], ...data };
    return attendanceRecords[idx];
  }
  throw new Error('Record not found');
}

export async function deleteAttendance(id) {
  await delay(300);
  attendanceRecords = attendanceRecords.filter((r) => r.id !== id);
  return { success: true };
}

export async function createAttendance(data) {
  await delay(300);
  const record = { ...data, id: Date.now() };
  attendanceRecords.unshift(record);
  return record;
}

export { attendanceRecords };
