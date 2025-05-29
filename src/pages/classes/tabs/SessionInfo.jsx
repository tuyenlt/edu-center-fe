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
import { toast } from 'sonner';
import api from '@/services/api';
export default function SessionInfo({
  chapters,
  sessions,
}) {
  const { user } = useUserContext();
  const isManager = user.role === 'manager';
  let count = 0;

  const onConfirm = async (data) => {
    try {
      const { index, session } = data;
      const response = await api.patch(`/class-sessions/${sessions[index]._id}`, session);
      if (response.status === 200) {
        toast.success('Session updated successfully!');
      }
    } catch (error) {
      console.error('Error updating session:', error);
      toast.error('Failed to update session. Please try again later.');
    }
  }

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
                const lesson = sessions[count];
                const sessionIndex = count;
                count++;
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
                      timePosition === 'after'
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
                        {isManager && timePosition === 'before' && (
                          <SessionScheduleDialog
                            session={
                              lesson
                            }
                            index={
                              sessionIndex
                            }
                            onConfirm={onConfirm}
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
  );
}
