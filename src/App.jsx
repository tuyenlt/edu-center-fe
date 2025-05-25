import Signin from './pages/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContextProvider from '@/providers/authProvider';
import SignUp from './pages/SignUp';
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard';
import Course from './pages/Course/Courses';
import AddCoursePage from './pages/Course/AddCourse';
import CourseDetail from './pages/Course/CourseDetail';
import EditCourse from './pages/Course/EditCourse';
import NewClass from './pages/classes/detailPart/manage/NewClass';
import ClassPage from './pages/classes/ClassPage';
import Profile from './pages/profile/Profile';
import StudentManage from './pages/student-manage/StudentManage';

// function App() {
//   return (
//     <AuthContextProvider>
//       <RouterProvider router={router} />
//     </AuthContextProvider>
//   );
// }

// export default App;
import '@fortawesome/fontawesome-free/css/all.min.css';
import ClassDetail from './pages/classes/ClassDetail';
import AssignmentDetail from './pages/classes/AssignmentDetail';
import Midterm from './pages/classes/MidTerm';
import ChatPage from './pages/ChatPage/ChatPage';
import StudentContacting from './pages/studentContacting/StudentContacting';
import { LayoutContextProvider } from './providers/LayoutProvider';
import { ClassDataProvider } from './providers/ClassDataProvider';
import ClassWrapper from './pages/classes/ClassWrapper';
import ClassManage from './pages/class-manage/ClassManage';
import CalendarPage from './pages/Calendar/CalendarPage';
import LandingPage from './pages/LandingPage';
import TeacherManage from './pages/teacher-manage/TeacherManage';
import MagicInput from './components/shared/MagicInput';
import PaymentManage from './pages/payment-manage/PaymentManage';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <LayoutContextProvider>
          <Routes>
            <Route path="/login" element={<Signin />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/test" element={<MagicInput />} />
            <Route path="*" element={<LandingPage />} />
            {/* Protect dashboard: only accessible if logged in */}
            <Route element={<RootLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/courses" element={<Course />} />
              <Route path="/course/:id" element={<CourseDetail />} />
              <Route path="/course/:id/edit" element={<EditCourse />} />
              <Route path="/add-course" element={<AddCoursePage />} />
              <Route path="/class" element={<ClassPage />} />
              <Route path="/class/:classDetailId" element={<ClassDetail />} />
              <Route
                path="/class/:classDetailId/:assignmentsId"
                element={<AssignmentDetail />}
              />
              <Route
                path="/class/:classDetailId/:assignmentsId/midterm-test"
                element={<Midterm />}
              />
              {/* </Route> */}
              <Route path="/add-class" element={<NewClass />} />
              <Route path="/users/:id" element={<Profile />} />
              <Route path="/students-manage" element={<StudentManage />} />
              <Route path="/teachers-manage" element={<TeacherManage />} />
              <Route path="/class-manage" element={<ClassManage />} />
              <Route path="/payment-manage" element={<PaymentManage />} />


              <Route path="/chat" element={<ChatPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route
                path="/student-contacting"
                element={<StudentContacting />}
              />
            </Route>
          </Routes>
        </LayoutContextProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
