import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '@/providers/authContext';
import NewAssignmentForm from './detailPart/NewAssignmentForm';
import SettingsForm from './SettingsForm';
import api from '@/services/api';
import CourseInfo from './detailPart/CourseInfo';
import People from './detailPart/People';
import { parts } from './data';
import Stream from './detailPart/Stream';
import Assignment from './detailPart/Assignment';
import Grade from './detailPart/Grade';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClassDataContext } from '@/providers/ClassDataProvider';
import { useLayoutContext } from '@/providers/LayoutProvider';

import ManageTab from './detailPart/manage/Manage';

import SessionScheduleDialog from './SessionSchedule';

import LoadingSpinner from '@/components/shared/LoadingSpinner';

export default function ClassDetail() {
  const { classDetailId } = useParams();
  const { user } = useUserContext();
  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const isManager = user?.role === 'manager';
  const { setIsRootLayoutHidden } = useLayoutContext();
  const activeClass =
    'data-[state=active]:text-blue-600 data-[state=active]:hover:bg-blue-50 ' +
    'data-[state=active]:after:content-[""] data-[state=active]:after:absolute ' +
    'data-[state=active]:after:-bottom-[1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 ' +
    'data-[state=active]:after:h-0 data-[state=active]:after:border-t-4 data-[state=active]:after:bg-blue-600 ' +
    'data-[state=active]:after:rounded-t-md';

  const [isNewAssignmentOpen, setIsNewAssignmentOpen] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const [isSessionSchedule, setIsSessionSchedule] = useState(false);
  const handleCloseSettings = () => {
    // setIsRootLayoutHidden(false);
    setIsSetting(false);
  };

  const handleOpenSettings = () => {
    // setIsRootLayoutHidden(true);
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

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const class_name = data?.class_name;
  const class_code = data?.class_code;
  if (!data || data.length == 0) return <div>Loadingg...</div>;
  console.log(data);
  return isNewAssignmentOpen ? (
    <NewAssignmentForm
      onClose={() => setIsNewAssignmentOpen(false)}
      class_name={class_name}
    />
  ) : isSetting ? (
    <SettingsForm setIsSetting={setIsSetting} data={data} />
  ) : isSessionSchedule ? (
    <ScheduleSession setIsSessionSchedule={setIsSessionSchedule} />
  ) : (
    <div className={cn(isSetting ? 'hidden' : '')}>
      <Tabs defaultValue="stream">
        <div className="border-b fixed z-10 bg-white flex items-center justify-between w-[calc(100vw-85px)] ">
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
          <Settings className="w-5 h-5 mr-5" onClick={handleOpenSettings} />
        </div>
        <div className="h-screen bg-white">
          <Stream data={data} />
          <Assignment
            setIsNewAssignmentOpen={setIsNewAssignmentOpen}
            data={data}
          />
          <People data={data} />
          <CourseInfo data={data} />
          {isTeacher && <Grade data={data} />}
          {isManager && <ManageTab classdata={data} />}
        </div>
      </Tabs>
    </div>
  );
}
