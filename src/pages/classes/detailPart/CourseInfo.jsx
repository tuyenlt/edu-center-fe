import { chapters } from '../data';
import { TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
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
export default function CourseInfo({ data }) {
  const { user } = useUserContext();
  const isManager = user?.role === 'manager';
  const [customLessonIndex, setCustomLessonIndex] = useState();

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
    <TabsContent value="courseInfo" className="w-4/5 mx-auto mt-5 pt-20">
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
        <Accordion type="multiple" className="space-y-4">
          {chapters.map((chapter, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border rounded-lg shadow bg-white"
            >
              <AccordionTrigger className="px-5 py-4 hover:bg-gray-50 text-lg font-semibold text-gray-800">
                <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <span>{chapter.title}</span>
                  <p className="text-sm text-muted-foreground">
                    {chapter.description}
                  </p>
                </div>
              </AccordionTrigger>

              <AccordionContent className="px-6 pb-5">
                <div className="space-y-3">
                  {chapter.lessons.map((l, lessonIndex) => {
                    const lesson = sessions[count++];
                    const timePosition = getIntervalTimePosition(new Date(lesson.start_time), new Date(lesson.end_time), new Date())
                    return (
                      <Card
                        key={lessonIndex}
                        className={cn(
                          "bg-gray-50 p-4 border border-gray-200 shadow-sm",
                          timePosition === 'before'
                            ? 'opacity-50'
                            : timePosition === 'within' ? 'bg-blue-50 border-blue-200' : 'bg-white',
                        )}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {lesson.title}
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {`[${lesson.type}] `}
                              {lesson.description}
                            </p>
                          </div>
                          <div
                            className={cn(
                              `flex items-center  px-2 py-1 rounded-sm gap-3  ${isManager && 'border'
                              }`
                            )}
                          >
                            <div className="text-gray-600">
                              <span className="block">
                                {dateTimeConvert_2(lesson.start_time)}
                              </span>
                              <span>{dateTimeConvert_2(lesson.end_time)}</span>
                            </div>
                            {isManager && timePosition === "after" && (
                              <SessionScheduleDialog
                                session={
                                  customLessonIndex !== undefined
                                    ? sessions[customLessonIndex]
                                    : lesson
                                }
                                index={
                                  customLessonIndex !== undefined
                                    ? customLessonIndex
                                    : count - 1
                                }
                                setCustomLessonIndex={setCustomLessonIndex}
                                maxIndex={sessions.length}
                              // onConfirm={handleChangeSession}
                              />
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </TabsContent>
  );
}
