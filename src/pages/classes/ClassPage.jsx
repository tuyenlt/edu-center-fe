import { cn } from '@/lib/utils';
import { useUserContext } from '@/providers/authContext';
import ClassAssignmentSummary from './ClassAssignmentSummary';
import { ClassCard } from './ClassCard';
import { useClassDataContext } from '@/providers/ClassDataProvider';
export default function ClassPage() {
  const { user } = useUserContext();
  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const { classData } = useClassDataContext();
  return (
    <div className="grid grid-cols-4 items-start gap-y-7 p-6">
      <div
        className={cn({
          'col-span-3 grid-cols-3 grid gap-y-12': isStudent,
          'col-span-4 grid-cols-4 grid gap-y-12': isTeacher,
        })}
      >
        {classData?.map((data, idx) => (
          <ClassCard key={idx} data={data} />
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
