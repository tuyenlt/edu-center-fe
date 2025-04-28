// components/NewClass.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';
import ScheduleCalendar from '@/components/shared/ScheduleCalendar';
import { useState } from 'react';
import SessionSchedule from './SessionSchedule';
import SessionInfo from './SessionInfo';
import { classApi } from '@/services/api/class.api';
import { toast } from 'sonner';

const NewClass = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course;
  const [sessionArray, setSessionArray] = useState(
    course?.sessions_details || []
  );
  const [sessionIndex, setSessionIndex] = useState(0);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState({});

  const isValidSessionArray = (sessions) => {
    return sessions.every(
      (session) => session.start_time && session.end_time && session.room
    );
  };

  let scheduleData = sessionArray;

  sessionArray.forEach((session, index) => {
    if (session.start_time) {
      scheduleData[session.start_time] = [`Session ${index}: ${session.title}`];
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log('Form Submitted:', data);
    if (!isValidSessionArray(sessionArray)) {
      toast.error('Please fill all session details');
      return;
    }
    try {
      const newClass = await classApi.addNewClass({
        course_id: course._id,
        ...data,
      });

      if (!newClass) {
        alert('Error creating class');
      }
      sessionArray.forEach(async (session) => {
        await classApi.addSession(newClass._id, {
          class_id: newClass._id,
          ...session,
        });
      });
      toast.success('Class created successfully');
      navigate('/classes');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetSessionTime = (scheduledSession) => {
    const newSessionArray = [...sessionArray];
    newSessionArray[sessionIndex - 1] = scheduledSession;
    setSessionArray(newSessionArray);
  };

  console.log('rerender');
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 mx-auto mt-6 w-full max-w-screen-xl"
    >
      <div>
        <Label htmlFor="class_name">Class Name</Label>
        <Input
          id="class_name"
          {...register('class_name', { required: 'Class name is required' })}
        />
        {errors.class_name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.class_name.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="class_code">Class Code</Label>
        <Input
          id="class_code"
          {...register('class_code', { required: 'Class code is required' })}
        />
        {errors.class_code && (
          <p className="text-red-500 text-sm mt-1">
            {errors.class_code.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="max_students">Max Students</Label>
        <Input
          id="max_students"
          type="number"
          {...register('max_students', {
            required: 'Max students is required',
            min: { value: 1, message: 'At least 1 student is required' },
          })}
        />
        {errors.max_students && (
          <p className="text-red-500 text-sm mt-1">
            {errors.max_students.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" {...register('notes')} />
      </div>

      <div className="flex flex-col w-full gap-2">
        <ScheduleCalendar scheduleData={scheduleData} />
        {sessionArray.map((session, index) => {
          return (
            <SessionInfo
              session={session}
              index={index + 1}
              onClick={() => {
                setScheduleOpen(true);
                setCurrentSession(session);
                setSessionIndex(index + 1);
              }}
            />
          );
        })}
      </div>
      <Button type="submit" className="w-full mt-4">
        Create Class
      </Button>
      <SessionSchedule
        session={currentSession}
        index={sessionIndex}
        onConfirm={handleSetSessionTime}
        setIsOpen={setScheduleOpen}
        isOpen={scheduleOpen}
      />
    </form>
  );
};

export default NewClass;
