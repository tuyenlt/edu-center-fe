import { chapters } from '../data';
import { TabsContent } from '@/components/ui/tabs';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from '@/components/ui/card';
import { dateTimeConvert_2 } from '@/utils/dateTimeConvert';
import { useState } from 'react';
import SessionScheduleDialog from './manage/SessionSchedule';
import { useUserContext } from '@/providers/authContext';
import { cn } from '@/lib/utils';
import { getIntervalTimePosition } from '@/utils';
import { toast } from 'sonner';
import SessionInfo from './SessionInfo';
export default function CourseInfo({ data }) {
  const { user } = useUserContext();
  const isManager = user?.role === 'manager';

  // const handleChangeSession = (session) => {
  //   try {

  //   } catch (error) {
  //     console.error('Error updating session:', error);
  //     toast.error('Failed to update session. Please try again later.');
  //   }
  // }

  const chaptersInfo = data.course;
  const chapters = data.course.course_programs;
  const sessions = data.class_sessions;
  let count = 0;
  return (
    <TabsContent value="courseInfo" className="w-4/5 mx-auto mt-5 py-20">
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
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-black/80 via-black-50 to-transparent z-10" />
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
    </TabsContent>
  );
}
