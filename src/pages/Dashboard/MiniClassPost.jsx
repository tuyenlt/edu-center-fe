import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import ClassPostItem from '../classes/components/ClassPostItem';

const notifications = [
  {
    initials: 'MH',
    name: 'Ms. Hannah',
    message: 'Don’t forget tomorrow’s quiz on Chapter 5.',
    time: '09:15 am',
  },
  {
    initials: 'TC',
    name: 'Mr. Thomas Clark',
    message: 'Assignment 3 deadline has been extended.',
    time: '11:42 am',
  },
  {
    initials: 'SR',
    name: 'Ms. Sarah Rose',
    message: 'Next lecture will be held in Room 204.',
    time: '02:10 pm',
  },
];
export default function MiniClassPost({ classes }) {
  const [data, setData] = useState();
  useEffect(() => {
    classes.map((cls) => {
      api
        .get(`/classes/${cls._id}`, {
          params: {
            populate_fields: ['class_posts'],
          },
        })
        .then((response) => {
          response.data.class_posts.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
          });
          setData((prev) => [...prev, response.data.class_posts[0]]);
          console.log(data);
        })
        .catch((error) => {
          console.error('Error fetching class data:', error);
        });
    });
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md overflow-scroll h-[396px]">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Class Notifications</h2>
        <Link to="/" className="text-blue-700 text-sm font-medium">
          See all
        </Link>
      </div>
      {/* {data?.map(() => {
        return <div>{data.}</div>
      })} */}
      {data?.map((post) => (
        <ClassPostItem user={user} post={post} key={post._id} />
      ))}
    </div>
  );
}
