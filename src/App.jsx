import Signin from "./pages/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextProvider from "@/providers/authProvider"
import SignUp from "./pages/SignUp";
import RootLayout from "./layouts/RootLayout";
import Dashboard from "./pages/Dashboard";
import Course from "./pages/Course/Courses";
import AddCoursePage from "./pages/Course/AddCourse";
import CourseDetail from "./pages/Course/CourseDetail";
import EditCourse from "./pages/Course/EditCourse";
import NewClass from "./pages/classes/NewClass";
import ClassPage from "./pages/classes/ClassPage";
import Profile from "./pages/profile/Profile";
import StudentManage from "./pages/student-manage/StudentManage";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<SignUp />} />
          {/* Protect dashboard: only accessible if logged in */}
          <Route element={<RootLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/course/:id/edit" element={<EditCourse />} />
            <Route path="/add-course" element={<AddCoursePage />} />
            <Route path="/class/add" element={<NewClass />} />
            <Route path="/class" element={<ClassPage />} />
            <Route path="/users/:id" element={<Profile />} />
            <Route path="/students-manage" element={<StudentManage />} />
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
