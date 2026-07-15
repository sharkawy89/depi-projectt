import React, { createContext, useState, useContext } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [students, setStudents] = useState([
    { id: '1', rollNo: 'S001', name: 'Ahmed Ali', email: 'ahmed@example.com', class: 'Grade 10', department: 'Science', status: 'Active' },
    { id: '2', rollNo: 'S002', name: 'Sara Hassan', email: 'sara@example.com', class: 'Grade 11', department: 'Arts', status: 'Active' },
    { id: '3', rollNo: 'S003', name: 'Omar Sayed', email: 'omar@example.com', class: 'Grade 10', department: 'Science', status: 'Inactive' },
    { id: '4', rollNo: 'S004', name: 'Nour Youssef', email: 'nour@example.com', class: 'Grade 12', department: 'Math', status: 'Active' },
  ]);

  const [teachers, setTeachers] = useState([
    { id: '1', teacherId: 'T001', name: 'Dr. Sarah Wilson', department: 'Science', subject: 'Advanced Mathematics', experience: '10 Years', status: 'Active' },
    { id: '2', teacherId: 'T002', name: 'Prof. James Chen', department: 'Science', subject: 'Physics Fundamentals', experience: '8 Years', status: 'Active' },
  ]);

  const [attendance, setAttendance] = useState([
    { studentId: '1', date: new Date().toISOString().split('T')[0], status: 'Present' },
    { studentId: '2', date: new Date().toISOString().split('T')[0], status: 'Absent' },
  ]);

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now().toString() }]);
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents(students.map(s => (s.id === id ? { ...s, ...updatedStudent } : s)));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const addTeacher = (teacher) => {
    setTeachers([...teachers, { ...teacher, id: Date.now().toString() }]);
  };

  const updateAttendance = (studentId, date, status) => {
    const existing = attendance.find(a => a.studentId === studentId && a.date === date);
    if (existing) {
      setAttendance(attendance.map(a => 
        a.studentId === studentId && a.date === date ? { ...a, status } : a
      ));
    } else {
      setAttendance([...attendance, { studentId, date, status }]);
    }
  };

  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [profileImage, setProfileImage] = useState(null);

  React.useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <GlobalContext.Provider value={{
      students, addStudent, updateStudent, deleteStudent,
      teachers, addTeacher,
      attendance, updateAttendance,
      theme, setTheme,
      profileImage, setProfileImage
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
