import api from '@/services/api';
import { convertUTC } from '@/utils/dateTimeConvert';
import { Link2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AssignmentStatus({ classes }) {
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    classes?.map((classData) => {
      api
        .get(`/assignments/class/${classData._id}`)
        .then((response) => {
          console.log(response.data);
          setAssignments((prev) => [...prev, ...response.data]);
        })
        .catch((error) => {
          console.error('Error fetching assignments:', error);
        });
    });
  }, [classes]);
  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-auto h-[396px]">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Assignment Status</h2>
        <Link to="/assignment" className="text-blue-700 text-sm font-medium">
          See all
        </Link>
      </div>
      <div className="">
        {assignments?.map((a) => (
          <div className="flex items-center gap-5 p-3 hover:bg-gray-50 transition border-t">
            <div className="bg-blue-50 p-2 rounded-md flex items-center justify-center w-10 h-10">
              <img
                src="/images/icon/image.png"
                alt="icon"
                className="w-4 h-4"
              />
            </div>
            <div className=" w-full">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-800">
                  {a.title}
                </div>
                <div className="text-xs text-gray-500">
                  {convertUTC(a.due_date)}
                </div>
              </div>
              {a.links.length > 0 && (
                <Link2 className="w-4 h-4 text-blue-500" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
