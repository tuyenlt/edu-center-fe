import { TabsContent } from '@/components/ui/tabs';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import SessionInfo from './SessionInfo';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/services/api';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
export default function CourseInfo() {
  const { classId } = useParams();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!classId) {
      setIsLoading(false);
      return;
    }
    api.get(`/classes/${classId}`, {
      params: {
        populate_fields: ['course', 'class_sessions'],
      },
    })
      .then((response) => {
        setData(response.data);
        console.log('Class data fetched:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      }).finally(() => {
        setIsLoading(false);
      })
  }, [classId]);

  const chaptersInfo = data?.course;
  const chapters = data?.course.course_programs;
  const sessions = data?.class_sessions;

  return (
    isLoading ? (
      <div className="flex items-center justify-center h-50">
        <LoadingSpinner />
      </div>
    ) : (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Course Information
          </h2>
        </div>

        {/* Course Card */}
        <Card
          className="relative shadow-lg rounded-xl bg-cover bg-center h-64 text-white overflow-hidden"
          style={{
            backgroundImage: `url(${chaptersInfo.img_url})`,
          }}
        >
          {' '}
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 via-black-50 to-transparent z-5" />
          {/* Overlay tối mờ giúp chữ nổi bật */}
          {/* Nội dung phía trên overlay */}
          <div className="absolute bottom-0 left-0 z-10 grid grid-cols-1 md:grid-cols-2 items-center">
            <CardContent className="p-6">
              <CardTitle className="text-2xl font-bold">
                {chaptersInfo.name}
              </CardTitle>
              <CardDescription className="mt-2 text-gray-200">
                {chaptersInfo.goal}
              </CardDescription>
              <div className="mt-4 inline-block rounded-full bg-white/20 text-white px-3 py-1 text-sm font-medium backdrop-blur">
                Level: {chaptersInfo.course_level}
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Chapters Accordion */}
        <SessionInfo sessions={sessions} chapters={chapters} />
      </div>
    )
  );
}
