import CircularProgress from '@/components/shared/CircularProgress';
import { useUserContext } from '@/providers/authContext';
import api from '@/services/api';
import { getClassProgress } from '@/utils';
import { MessageSquare } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FeedbackCourses({ courses }) {
  if (courses) console.log(courses);
  return (
    courses && (
      <div className="bg-white p-4 rounded-lg shadow-md h-[396px] overflow-auto">
        <h2 className="font-semibold text-lg mb-4">Course Feedbacks</h2>
        {courses.map((c) => (
          <div
            key={c._id}
            className="bg-blue-50 p-3 rounded-[10px] mb-4 flex justify-between"
          >
            <div className="flex justify-between w-full items-start">
              <div className="font-medium max-w-[200px] text-wrap">
                {c.name}
              </div>
              <div className="grid grid-cols-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#0052B4"
                  viewBox="0 0 24 24"
                  stroke="none"
                  className="w-4 h-4 grid-cols-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.036 6.267h6.588c.969 0 1.371 1.24.588 1.81l-5.33 3.873 2.036 6.267c.3.921-.755 1.688-1.54 1.118L12 18.897l-5.33 3.873c-.784.57-1.838-.197-1.539-1.118l2.036-6.267-5.33-3.873c-.784-.57-.38-1.81.588-1.81h6.588l2.036-6.267z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="font-medium text-sm grid-cols-1 justify-self-center">
                  {Math.floor(Math.random() * 5)}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#0052B4"
                  className="w-4 h-4 mt-[2px] col-start-4"
                >
                  <path d="M4 2C2.895 2 2 2.895 2 4v16l4-4h14c1.105 0 2-.895 2-2V4c0-1.105-.895-2-2-2H4z" />
                </svg>
                <div className="font-medium text-sm  justify-self-center">
                  {Math.floor(Math.random() * 20)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
