import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function CourseRequest({ courses }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[396px] overflow-auto">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Students's Requests</h2>
      </div>
      {courses?.map(
        (course) =>
          course.requested_students.length > 0 && (
            <Link
              to={`/course/${course._id}`}
              className="text-blue-700 text-sm font-medium"
            >
              <div key={course.id} className="p-4 rounded-2xl">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  {course.name}
                </h3>
                {course.requested_students.map((student) => (
                  <div className="flex items-center">
                    <img
                      src={student.avatar_url}
                      alt={student.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span className="ml-3 text-gray-800 dark:text-gray-100 font-medium truncate">
                      {student.name}
                    </span>
                  </div>
                ))}
              </div>
            </Link>
          )
      )}
    </div>
  );
}
