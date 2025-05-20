import { Clock, TableOfContents, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useUserContext } from '@/providers/authContext';
export default function AssignmentDetail() {
  const { user } = useUserContext();
  const isTeacher = user?.role === 'teacher';
  const isStudent = user?.role === 'student';
  return isStudent ? (
    <div className="text-black ml-auto mr-auto max-w-2/3 border border-gray-300 shadow-2xl rounded-2xl pt-10 px-10 pb-20 relative">
      <div className=" border border-neutral-200 border-t-0 border-x-0 pb-5">
        <h1 className="font-semibold text-5xl -ml-1">Midterm Exam</h1>
        <div className="flex justify-between mt-3">
          <div className="flex gap-2 text-gray-500">
            <span>Ms Hoa</span>
            <span>•</span>
            <span>April 25th</span>
          </div>
          <span>Due 10:00 pm</span>
        </div>
      </div>
      <div className="border border-neutral-200 border-t-0 border-x-0 mt-3">
        <p className="font-semibold">Test Information</p>
        <div className="grid grid-flow-col items-center justify-between my-3">
          <div className="flex items-center gap-[20px]">
            <Clock className="text-blue-600 w-5 h-5" />
            <p className="text-gray-700">Time: 120 minutes</p>
          </div>

          <div className="flex items-center gap-[20px]">
            <TableOfContents className="text-blue-600 w-5 h-5" />
            <p className="text-gray-700">7 sections | 200 questions</p>
          </div>

          <div className="flex items-center gap-[20px]">
            <Trophy className="text-blue-600 w-5 h-5" />
            <p className="text-gray-700">Max points: 990</p>
          </div>
        </div>
        <p className="py-2 mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
          molestiae temporibus tempore. Ullam provident eum officia eius dolores
          nesciunt, iusto ut, at sunt explicabo minus, dolorum velit aliquam?
          Neque, fugiat.
        </p>
      </div>
      <Link to="midterm-test" className="absolute bottom-5 right-10">
        <Button className="">Start Test</Button>
      </Link>
    </div>
  ) : (
    <div></div>
  );
}
