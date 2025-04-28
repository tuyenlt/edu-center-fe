import { Clock, TableOfContents, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
export default function AssignmentDetail() {
  return (
    <div className="text-black ml-auto mr-auto px-5 max-w-2/3">
      <div className=" border border-neutral-200 border-t-0 border-x-0 pb-5">
        <h1 className="font-medium text-3xl">Midterm Exam</h1>
        <div className="flex gap-2 mt-3">
          <span>Ms Hoa</span>
          <span>•</span>
          <span>April 25th</span>
        </div>
        <div className="flex justify-between mt-3">
          <span>Toeic-Based</span>
          <span>Due 10:00 pm</span>
        </div>
      </div>
      <div className="border border-neutral-200 border-t-0 border-x-0 mt-3">
        <p>Test Information</p>
        <div className="grid grid-flow-col items-center justify-between my-3">
          <div className="flex items-center gap-[20px]">
            <Clock />
            <p>Time : 120 minutes</p>
          </div>

          <div className="flex items-center gap-[20px]">
            <TableOfContents />
            <p>7 sections | 200 questions</p>
          </div>

          <div className="flex items-center gap-[20px]">
            <Trophy />
            <p>Max points : 990</p>
          </div>
        </div>
      </div>
      <Link to="midterm-test"><Button className="mt-3">Start Test</Button></Link>
    </div>
  );
}
