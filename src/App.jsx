import Signin from './pages/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthContextProvider from '@/providers/authProvider';
import SignUp from './pages/SignUp';
import RootLayout from './layouts/RootLayout';
import Dashboard from './pages/Dashboard/Dashboard';
import Course from './pages/Course/Courses';
import AddCoursePage from './pages/Course/AddCourse';
import CourseDetail from './pages/Course/CourseDetail';
import EditCourse from './pages/Course/EditCourse';
import NewClass from './pages/classes/detailPart/manage/NewClass';
import ClassPage from './pages/classes/ClassPage';
import Profile from './pages/profile/Profile';
import StudentManage from './pages/student-manage/StudentManage';

import '@fortawesome/fontawesome-free/css/all.min.css';
import ClassDetail from './pages/classes/ClassDetail';
import AssignmentDetail from './pages/Assignments/AssignmentDetail';
import ChatPage from './pages/ChatPage/ChatPage';
import StudentContacting from './pages/studentContacting/StudentContacting';
import { LayoutContextProvider } from './providers/LayoutProvider';
import ClassManage from './pages/class-manage/ClassManage';
import CalendarPage from './pages/Calendar/CalendarPage';
import LandingPage from './pages/LandingPage';
import TeacherManage from './pages/teacher-manage/TeacherManage';
import MagicInput from './components/shared/MagicInput';
import PaymentManage from './pages/payment-manage/PaymentManage';

import { protectedRoutes } from './routes/routesConfig';
import RequireRole from './routes/RequireRoute';

import { WebSocketProvider } from './providers/WebSocketProvider';
import ChatRoom from './pages/ChatPage/ChatRoom';

function App() {
	return (
		<Router>
			<AuthContextProvider>
				<WebSocketProvider>

					<LayoutContextProvider>
						<Routes>
							{/* Public Routes */}
							<Route path="/login" element={<Signin />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/landing" element={<LandingPage />} />

							{/* Protected Routes */}
							<Route element={<RootLayout />}>
								{protectedRoutes.map(({ path, element, allowedRoles, children }) => (
									<Route
										key={path}
										path={path}
										element={
											<RequireRole allowedRoles={allowedRoles}>
												{element}
											</RequireRole>
										}
									>
										{children && children.map((child) => (
											<Route
												key={child.path}
												path={child.path}
												element={child.element}
											/>
										))}
									</Route>
								))}
							</Route>

							{/* Catch-all 404 */}
							<Route path="*" element={<LandingPage />} />
						</Routes>
					</LayoutContextProvider>
				</WebSocketProvider>
			</AuthContextProvider>
		</Router>
	);
}

export default App;
