import { cn } from '@/lib/utils';
import { useUserContext } from '@/providers/authContext';
import ClassAssignmentSummary from './ClassAssignmentSummary';
import { ClassCard } from './ClassCard';
import { useEffect, useState } from 'react';
import api from '@/services/api';
export default function ClassPage() {
  const { user } = useUserContext();
  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const [classData, setClassData] = useState([]);
  const [fallbackColor, setFallbackColor] = useState();
  const fallbackColors = ['red', 'orange', 'purple', 'green', 'gray', 'blue'];
  useEffect(() => {
    setFallbackColor(fallbackColors[Math.floor(Math.random() * 6)]);
  }, []);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await api.get('/my-classes');
        setClassData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };
    fetchClassData();
  }, []);
  if (!classData || classData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-4 items-start gap-y-7 p-6">
      <div
        className={cn({
          'col-span-3 grid-cols-3 grid gap-y-12': isStudent,
          'col-span-4 grid-cols-4 grid gap-y-12': isTeacher,
        })}
      >
        {classData?.map((data, idx) => (
          <ClassCard key={idx} data={data} fallbackColor={fallbackColor} />
        ))}
      </div>

      {isStudent && (
        <div className="col-span-1">
          <ClassAssignmentSummary />
        </div>
      )}
    </div>
  );
}
