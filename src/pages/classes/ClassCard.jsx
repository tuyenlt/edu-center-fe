import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ClockIcon, CalendarIcon } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/services/api';
export function ClassCard({ data }) {
  // const [studentsData, setStudentsData] = useState();
  // useEffect(() => {
  //   const fetchStudentsData = async () => {
  //     try {
  //       const response = await api.get(`/students/67da82b09a256d3579eb7fb5`);
  //       setStudentsData(response.data);
  //       console.log(studentsData);
  //     } catch (error) {
  //       console.error('Error fetching class data:', error);
  //     }
  //   };
  //   fetchStudentsData();
  // }, []);

  return (
    <Card
      className="w-75 m-h-25 p-0 rounded-xl text-white relative overflow-hidden border-gray-300 hover:hover:shadow-[0_1px_2px_0_rgba(63,63,70,0.3),_0_2px_6px_2px_rgba(63,63,70,0.15)]
 gap-0"
    >
      <div className="relative w-full h-24">
        <img
          src="/images/img_reachout.jpg"
          alt={data.name}
          className="object-cover w-full h-full"
        />
        <div
          className="absolute top-0 left-0 h-full w-full "
          style={{
            background:
              'linear-gradient(60deg, rgba(32,33,36,0) 60%, rgba(32,33,36,0.88))',
          }}
        ></div>

        <div className="absolute z-10 top-4 left-4">
          <h3 className="text-2xl  hover:underline text-amber-50">
            {data.class_code}
          </h3>
          <p className="text-sm mt-4 text-gray-200 hover:underline">
            Hoai Thu Vu
          </p>
        </div>
      </div>

      <Avatar className="absolute top-16 right-4 size-17  border-white">
        <AvatarImage src="" alt="avatar" />
        <AvatarFallback className="bg-[url(/images/avt1.webp)] bg-cover "></AvatarFallback>
      </Avatar>

      <CardContent className="pl-3">
        <h1 className="text-black/80 w-48 text-lg font-semibold mt-3">
          {data.class_name}
        </h1>
        <div className="flex items-center gap-6 text-sm mt-3 text-neutral-400">
          <div className="flex items-center gap-1">
            <ClockIcon className="w-4 h-4" />
            <span>12:40 P:M</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>03 Jan 2023</span>
          </div>
        </div>

        <Badge className="bg-green-100 text-green-500 relative mt-4">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full border border-white"></span>
          <span>{data.status}</span>
        </Badge>
      </CardContent>
      <CardFooter className="m-3 px-0  pt-3 border-t-gray-300 border border-x-0 border-b-0">
        <Link to={`/class/${data._id}`}>
          <Button>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
