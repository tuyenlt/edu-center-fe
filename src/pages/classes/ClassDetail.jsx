import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '@/providers/authContext';
import SettingsForm from './detailPart/manage/SettingsForm';
import api from '@/services/api';
import CourseInfo from './detailPart/CourseInfo';
import People from './detailPart/People';
import Stream from './detailPart/Stream';
import Assignment from './detailPart/Assignment';
import Grade from './detailPart/grade/Grade';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useLayoutContext } from '@/providers/LayoutProvider';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ClassSchedule from './detailPart/ClassSchedule';

const parts = {
  stream: 'Stream',
  assignments: 'Assignments',
  people: 'People',
  courseInfo: 'Course',
  schedule: 'Schedule',
};

const activeClass =
  'data-[state=active]:text-blue-600 data-[state=active]:hover:bg-blue-50 ' +
  'data-[state=active]:after:content-[""] data-[state=active]:after:absolute ' +
  'data-[state=active]:after:-bottom-[1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 ' +
  'data-[state=active]:after:h-0 data-[state=active]:after:border-t-4 data-[state=active]:after:bg-blue-600 ' +
  'data-[state=active]:after:rounded-t-md';

export default function ClassDetail() {
  const { classDetailId } = useParams();
  const { user } = useUserContext();
  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const isManager = user?.role === 'manager';

  const [isSetting, setIsSetting] = useState(false);
  const [isSessionSchedule, setIsSessionSchedule] = useState(false);

  const handleCloseSettings = () => {
    setIsSetting(false);
  };

  const handleOpenSettings = () => {
    setIsSetting(true);
  };

  let copyParts = isTeacher ? { ...parts, grade: 'Grade' } : parts;
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await api.get(`/classes/${classDetailId}`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };
    fetchClassData();
  }, []);

  return isSetting ? (
    <SettingsForm setIsSetting={setIsSetting} data={data} />
  ) : isSessionSchedule ? (
    <ScheduleSession setIsSessionSchedule={setIsSessionSchedule} />
  ) : (
    <Tabs defaultValue="stream" className=" gap-0">
      <div className="border-b sticky z-10 bg-white flex items-center justify-between w-[calc(100vw-85px)] ">
        <TabsList className="bg-inherit ml-5 h-full flex items-center p-0 z-1000">
          {Object.entries(copyParts).map(([key, value]) => (
            <TabsTrigger
              key={key}
              value={key}
              className={cn(
                'px-6 py-4 text-base font-medium relative text-gray-700 rounded-none hover:bg-gray-200 cursor-pointer',
                activeClass
              )}
            >
              {value}
            </TabsTrigger>
          ))}
        </TabsList>
        {isManager && (
          <Settings className="w-5 h-5 mr-5" onClick={handleOpenSettings} />
        )}
      </div>
      <div className="h-screen bg-white">
        <TabsContent value="stream" className="w-4/5 mx-auto mt-5 py-20">
          <Stream />
        </TabsContent>

        <TabsContent
          value="assignments"
          className="w-4/5 max-w-screen-2xl mx-auto mt-5 py-20"
        >
          <Assignment />
        </TabsContent>

        <TabsContent value="people" className="w-4/5 mx-auto mt-5 py-20">
          <People />
        </TabsContent>

        <TabsContent value="courseInfo" className="w-4/5 mx-auto mt-5 py-20">
          <CourseInfo />
        </TabsContent>

        <TabsContent value="schedule" className="p-10 max-w-screen-2xl m-auto">
          <ClassSchedule />
        </TabsContent>

        {isTeacher && (
          <TabsContent value="grade">
            <Grade students={data} />
          </TabsContent>
        )}
      </div>
    </Tabs>
  );
}
