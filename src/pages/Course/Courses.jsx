import { useUserContext } from '@/providers/authContext';
import CourseCard from './CourseCard';
import { Button } from '@/components/ui/button';
import SearchBar from '@/components/shared/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllCourse } from '@/services/api/courses.api';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Skeleton } from '@/components/ui/skeleton';

export default function Course() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const role = user?.role || 'student';

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCourses = async () => {
    setLoading(true);
    const result = await getAllCourse();
    setLoading(false);
    setCourses(result);
    setFilteredCourses(result);
    console.log(courses);
  };

  useEffect(() => {
    getCourses();
  }, []);
  return (
    <div className="w-full max-w-screen-xl m-auto p-10">
      <div className="page-header border-b-1 justify-between pl-4">
        <h1 className="text-3xl font-normal">
          {role === 'manager' ? 'Course Manage' : 'Courses'}
        </h1>
        <div className="page-header-action">
          {role === 'manager' && (
            <div className="flex justify-between">
              <SearchBar
                onChange={(value) =>
                  setFilteredCourses(
                    courses.filter(
                      (course) =>
                        course.name
                          .toLowerCase()
                          .search(value.toLowerCase()) !== -1
                    )
                  )
                }
                notSubmit={true}
              />
              <Button
                variant="outline"
                onClick={() => {
                  navigate('/add-course');
                }}
              >
                Add Course
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full mt-6 gap-5 items-center flex-col">
        {loading && (
          <div className="">
            <Skeleton className="w-full h-80 rounded-md mb-4" />
            <Skeleton className="w-full h-80 rounded-md mb-4" />
            <Skeleton className="w-full h-80 rounded-md mb-4" />
          </div>
        )}
        {!filteredCourses
          ? 'No course found'
          : filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
      </div>
    </div>
  );
}
