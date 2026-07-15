import api from './api';
import students from '../data/students';
import teachers from '../data/teachers';
import courses from '../data/courses';
import { attendanceRecords } from './attendanceApi';

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

let upcomingHolidays = [
  { date: '2026-07-23', name: 'Revolution Day', day: 'Thursday' },
  { date: '2026-09-06', name: 'Eid al-Adha', day: 'Sunday' },
  { date: '2026-10-06', name: 'Armed Forces Day', day: 'Tuesday' },
  { date: '2026-12-25', name: 'Christmas Day', day: 'Friday' },
];

let notifications = [
  { id: 1, message: 'Karim Saad arrived late (9:00 AM)', time: '2 min ago', type: 'warning' },
  { id: 2, message: 'Monthly attendance report for June is ready', time: '15 min ago', type: 'info' },
  { id: 3, message: '3 students have not submitted leave requests', time: '1 hour ago', type: 'info' },
  { id: 4, message: 'Faculty meeting rescheduled to 3:00 PM', time: '2 hours ago', type: 'warning' },
  { id: 5, message: 'New teacher orientation scheduled for Monday', time: '3 hours ago', type: 'info' },
];

function computeSummary() {
  const present = attendanceRecords.filter((r) => r.status === 'Present').length;
  const absent = attendanceRecords.filter((r) => r.status === 'Absent').length;
  const late = attendanceRecords.filter((r) => r.status === 'Late').length;
  const onLeave = attendanceRecords.filter((r) => r.status === 'On Leave').length;
  const presentable = attendanceRecords.filter((r) => r.status !== 'On Leave').length;
  const attendanceRate = presentable > 0 ? Number(((present / presentable) * 100).toFixed(1)) : 0;
  const activeCourses = courses.filter((c) => c.status === 'Active').length;

  return {
    totalStudents: students.length,
    totalTeachers: teachers.filter((t) => t.status === 'Active').length,
    totalCourses: courses.length,
    presentToday: present,
    absentToday: absent,
    lateToday: late,
    onLeave,
    attendanceRate,
    activeCourses,
  };
}

function computeDepartmentAttendance() {
  const deptMap = {};
  attendanceRecords.forEach((r) => {
    if (!deptMap[r.department]) deptMap[r.department] = { present: 0, total: 0 };
    deptMap[r.department].total++;
    if (r.status === 'Present') deptMap[r.department].present++;
  });
  return Object.entries(deptMap).map(([department, data]) => ({
    department,
    present: data.present,
    total: data.total,
  }));
}

function computeStudentDistribution() {
  const deptMap = {};
  students.forEach((s) => {
    if (!deptMap[s.department]) deptMap[s.department] = 0;
    deptMap[s.department]++;
  });
  return Object.entries(deptMap).map(([category, count]) => ({ category, count }));
}

let attendanceTrend = [
  { date: 'Mon', present: 390, absent: 22, late: 8 },
  { date: 'Tue', present: 385, absent: 28, late: 7 },
  { date: 'Wed', present: 392, absent: 20, late: 8 },
  { date: 'Thu', present: 388, absent: 25, late: 7 },
  { date: 'Fri', present: 395, absent: 18, late: 7 },
  { date: 'Sat', present: 380, absent: 32, late: 8 },
  { date: 'Sun', present: 385, absent: 28, late: 7 },
];

let weeklyAttendance = [
  { week: 'W1', rate: 91 },
  { week: 'W2', rate: 93 },
  { week: 'W3', rate: 95 },
  { week: 'W4', rate: 92 },
];

export async function getDashboardSummary() {
  await delay(400);
  return computeSummary();
}

export async function getAttendanceStatistics() {
  await delay(300);
  return { attendanceTrend, weeklyAttendance };
}

export async function getDepartmentStatistics() {
  await delay(300);
  return {
    departmentAttendance: computeDepartmentAttendance(),
    studentDistribution: computeStudentDistribution(),
  };
}

export async function getRecentAttendance() {
  await delay(300);
  return attendanceRecords;
}

export async function getNotifications() {
  await delay(200);
  return notifications;
}

export async function getUpcomingHolidays() {
  await delay(200);
  return upcomingHolidays;
}
