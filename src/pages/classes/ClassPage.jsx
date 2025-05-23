import { cn } from '@/lib/utils';
import { useUserContext } from '@/providers/authContext';
import ClassAssignmentSummary from './ClassAssignmentSummary';
import { ClassCard } from './ClassCard';
import { useClassDataContext } from '@/providers/ClassDataProvider';
import { useEffect, useState } from 'react';
import api from '@/services/api';
// export default function ClassPage() {
//   const { user } = useUserContext();
//   const isStudent = user?.role === 'student';
//   const isTeacher = user?.role === 'teacher';
//   // const { classData } = useClassDataContext();
//   // console.log(classData);

//   return (
//     <div className="grid grid-cols-4 items-start gap-y-7 p-6">
//       <div
//         className={cn({
//           'col-span-3 grid-cols-3 grid gap-y-12': isStudent,
//           'col-span-4 grid-cols-4 grid gap-y-12': isTeacher,
//         })}
//       >
//         {classData?.map((data, idx) => (
//           <ClassCard key={idx} data={data} />
//         ))}
//       </div>

//       {isStudent && (
//         <div className="col-span-1">
//           <ClassAssignmentSummary />
//         </div>
//       )}
//     </div>
//   );
// }
const fallbackColors = ['red', 'orange', 'purple', 'green', 'gray', 'blue'];
export default function ClassPage() {
  const { user } = useUserContext();
  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const [classData, setClassData] = useState();
  const [fallbackColor, setFallbackColor] = useState();
  useEffect(() => {
    setFallbackColor(fallbackColors[Math.floor(Math.random() * 6)]);
  }, []);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await api.get(`/classes/682c2eeb9e6f67c538f41059`);
        setClassData(response.data);
        console.log(classData);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };
    fetchClassData();
  }, []);
  if (!classData || Object.keys(classData).length === 0) {
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
        {/* {classData?.map((data, idx) => (
          <ClassCard key={idx} data={data} />
        ))} */}
        <ClassCard data={classData} fallbackColor={fallbackColor} />
      </div>

      {isStudent && (
        <div className="col-span-1">
          <ClassAssignmentSummary />
        </div>
      )}
    </div>
  );
}
