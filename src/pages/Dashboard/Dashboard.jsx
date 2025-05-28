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
export default function Dashboard() {
  const { user } = useUserContext();
  const isManager = user?.role === 'manager';
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';
  const [classes, setClasses] = useState([]);
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
        <WelcomeBanner username={user.name} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {isTeacher && <StudentStatsChart />}
          {isStudent && <AssignmentStatus classes={classes} />}
          <ClassProgressList isManager={isManager} classes={classes} />
          {!isManager && <UpcomingActivities className="grid-auto-rows" />}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
          {' '}
          {isStudent && <CourseRegistered />}
          <MiniChatRoom />
          {!isManager && <MiniClassPost classes={classes} />}
        </div>
      </div>
    )
  );
}
