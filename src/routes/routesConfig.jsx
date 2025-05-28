// routesConfig.js
import Dashboard from '@/pages/Dashboard';
import ClassManage from '@/pages/class-manage/ClassManage';
import TeacherManage from '@/pages/teacher-manage/TeacherManage';
import StudentManage from '@/pages/student-manage/StudentManage';
import PaymentManage from '@/pages/payment-manage/PaymentManage';
import Course from '@/pages/Course/Courses';
import AddCoursePage from '@/pages/Course/AddCourse';
import CourseDetail from '@/pages/Course/CourseDetail';
import EditCourse from '@/pages/Course/EditCourse';
import ClassPage from '@/pages/classes/ClassPage';
import ClassDetail from '@/pages/classes/ClassDetail';
import AssignmentDetail from '@/pages/Assignments/AssignmentDetail';
import NewClass from '@/pages/classes/detailPart/manage/NewClass';
import Profile from '@/pages/profile/Profile';
import ChatPage from '@/pages/ChatPage/ChatPage';
import CalendarPage from '@/pages/Calendar/CalendarPage';
import StudentContacting from '@/pages/studentContacting/StudentContacting';

export const protectedRoutes = [
  {
    path: '/',
    element: <Dashboard />,
    allowedRoles: ['manager', 'teacher', 'student'],
  },
  {
    path: '/courses',
    element: <Course />,
    allowedRoles: ['manager', 'teacher', 'student'],
  },
  {
    path: '/course/:id',
    element: <CourseDetail />,
    allowedRoles: ['manager', 'teacher', 'student'],
  },
  {
    path: '/course/:id/edit',
    element: <EditCourse />,
    allowedRoles: ['manager'],
  },
  {
    path: '/add-course',
    element: <AddCoursePage />,
    allowedRoles: ['manager'],
  },
  {
    path: '/class',
    element: <ClassPage />,
    allowedRoles: ['manager', 'teacher', 'student'],
  },
  {
    path: '/class/:classDetailId',
    element: <ClassDetail />,
    allowedRoles: ['manager', 'teacher', 'student'],
  },
  {
    path: '/assignments/:id',
    element: <AssignmentDetail />,
    allowedRoles: ['teacher', 'student'],
  },
  {
    path: '/add-class',
    element: <NewClass />,
    allowedRoles: ['manager'],
  },
  {
    path: '/users/:id',
    element: <Profile />,
    allowedRoles: ['manager', 'teacher', 'student'],
  },
  {
    path: '/students-manage',
    element: <StudentManage />,
    allowedRoles: ['manager'],
  },
  {
    path: '/teachers-manage',
    element: <TeacherManage />,
    allowedRoles: ['manager'],
  },
  {
    path: '/class-manage',
    element: <ClassManage />,
    allowedRoles: ['manager'],
  },
  {
    path: '/payment-manage',
    element: <PaymentManage />,
    allowedRoles: ['manager'],
  },
  {
    path: '/chat',
    element: <ChatPage />,
    allowedRoles: ['manager', 'teacher', 'student'],
  },
  {
    path: '/calendar',
    element: <CalendarPage />,
    allowedRoles: ['manager', 'teacher', 'student'],
  },
  {
    path: '/student-contacting',
    element: <StudentContacting />,
    allowedRoles: ['manager', 'teacher'],
  },
];
