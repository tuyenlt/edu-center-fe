import api from '@/services/api';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/providers/authContext';
import WelcomeBanner from './WelcomeBanner';
import StudentStatsChart from './StudentStatsChart';
import ClassProgressList from './ClassProgressList';
import UpcomingActivities from './UpcomingActivities';
import AssignmentStatus from './AssignmentStatus';
import CourseRegistered from './CourseRegistered';
import MiniChatRoom from './MiniChatRoom';
import MiniClassPost from './MiniClassPost';
import MonthlyAttendance from './manage/MonthlyAttendance';
import CourseRequest from './manage/CourseRequests';
import { getAllCourse } from '@/services/api/courses.api';
import FeedbackCourses from './manage/Feedback';
import Payment from './manage/Payment';
export default function Dashboard() {
  const { user } = useUserContext();
  const isManager = user?.role === 'manager';
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const getCourses = async () => {
    const result = await getAllCourse();
    setCourses(result);
    console.log(courses);
  };

  useEffect(() => {
    getCourses();
  }, []);
  useEffect(() => {
    api
      .get(`/classes-of-user/${user._id}`)
      .then((response) => {
        setClasses(response.data);
        console.log('Fetched classes:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching classes:', error);
      });
  }, [user._id]);

  return (
    classes && (
      <div className="p-6 space-y-6 bg-[#f5f9ff] min-h-screen ">
        <WelcomeBanner user={user} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {isManager && <Payment />}
          {isManager && <MonthlyAttendance />}
          {isManager && courses && <CourseRequest courses={courses} />}
          {isManager && courses && <FeedbackCourses courses={courses} />}
          {isTeacher && <StudentStatsChart />}
          {!isManager && (
            <ClassProgressList isManager={isManager} classes={classes} />
          )}{' '}
          {isStudent && <AssignmentStatus classes={classes} />}
          {!isManager && <UpcomingActivities />}
          {isStudent && <CourseRegistered />}
          {!isManager && <MiniClassPost classes={classes} />}
          <MiniChatRoom />
        </div>
      </div>
    )
  );
}
