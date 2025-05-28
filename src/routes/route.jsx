// router.js
import { createBrowserRouter } from 'react-router-dom';
import Signin from '@/pages/SignIn';
import SignUp from '@/pages/SignUp';
import RootLayout from '@/layouts/RootLayout';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Course from '@/pages/Course/Courses';
import AddCoursePage from '@/pages/Course/AddCourse';
import CourseDetail from '@/pages/Course/CourseDetail';
import EditCourse from '@/pages/Course/EditCourse';
import NewClass from '@/pages/classes/detailPart/manage/NewClass';
import ClassPage from '@/pages/classes/ClassPage';
import Profile from '@/pages/profile/Profile';
import StudentManage from '@/pages/student-manage/StudentManage';
import ClassDetail from '@/pages/classes/ClassDetail';
import AssignmentDetail from '@/pages/Assignments/AssignmentDetail';
import ChatPage from '@/pages/ChatPage/ChatPage';
import StudentContacting from '@/pages/studentContacting/StudentContacting';
import ClassManage from '@/pages/class-manage/ClassManage';
import CalendarPage from '@/pages/Calendar/CalendarPage';
import LandingPage from '@/pages/LandingPage';
import TeacherManage from '@/pages/teacher-manage/TeacherManage';
import PaymentManage from '@/pages/payment-manage/PaymentManage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Signin />,
  },

  {
    path: '/signup',
    element: <SignUp />,
  },

  {
    path: '/landing',
    element: <LandingPage />,
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '', element: <Dashboard /> },
      { path: 'courses', element: <Course /> },
      { path: 'course/:id', element: <CourseDetail /> },
      { path: 'course/:id/edit', element: <EditCourse /> },
      { path: 'add-course', element: <AddCoursePage /> },
      { path: 'class', element: <ClassPage /> },
      { path: 'class/:classDetailId', element: <ClassDetail /> },
      { path: 'assignments/:id', element: <AssignmentDetail /> },
      { path: 'add-class', element: <NewClass /> },
      { path: 'users/:id', element: <Profile /> },
      { path: 'students-manage', element: <StudentManage /> },
      { path: 'teachers-manage', element: <TeacherManage /> },
      { path: 'class-manage', element: <ClassManage /> },
      { path: 'payment-manage', element: <PaymentManage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'student-contacting', element: <StudentContacting /> },
    ],
  },
]);

export default router;
