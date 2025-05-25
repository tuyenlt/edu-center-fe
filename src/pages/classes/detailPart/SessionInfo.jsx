import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/providers/authContext';
import { getIntervalTimePosition } from '@/utils';
import { dateTimeConvert_2 } from '@/utils/dateTimeConvert';
import SessionScheduleDialog from './manage/SessionSchedule';
import { useState } from 'react';
export default function SessionInfo({
  chapters,
  sessions,
  isInCourse = false,
  onConfirm,
}) {
  const { user } = useUserContext();
  const isManager = user?.role === 'manager';
  const [customLessonIndex, setCustomLessonIndex] = useState();
  let count = 0;
  return (
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
                const lesson = sessions ? sessions[count] : l;
                const sessionIndex = count;
                count++;
                if (sessions) console.log(count);
                const lessons = sessions ?? chapter.lessons;
                const timePosition = getIntervalTimePosition(
                  new Date(lesson.start_time),
                  new Date(lesson.end_time),
                  new Date()
                );
                return (
                  <Card
                    key={lessonIndex}
                    className={cn(
                      'bg-gray-50 p-4 border border-gray-200 shadow-sm',
                      timePosition === 'before'
                        ? 'opacity-50'
                        : timePosition === 'within'
                        ? 'bg-blue-50 border-blue-200'
                        : 'bg-white'
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
                          `flex items-center  px-2 py-1 rounded-sm gap-3  ${
                            isManager && 'border'
                          }`
                        )}
                      >
                        <div className="text-gray-600">
                          <span className="block">
                            {dateTimeConvert_2(lesson.start_time)}
                          </span>
                          <span>{dateTimeConvert_2(lesson.end_time)}</span>
                        </div>
                        {/* {isManager && timePosition === 'after' && ( */}
                        <SessionScheduleDialog
                          session={
                            customLessonIndex !== undefined
                              ? sessions[customLessonIndex]
                              : lesson
                          }
                          index={
                            customLessonIndex !== undefined
                              ? customLessonIndex
                              : sessionIndex
                          }
                          setCustomLessonIndex={setCustomLessonIndex}
                          maxIndex={sessions.length}
                          onConfirm={onConfirm}
                        />
                        {/* )} */}
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
  );
}
