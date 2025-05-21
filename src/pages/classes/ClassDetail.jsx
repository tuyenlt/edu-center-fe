import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '@/providers/authContext';
import NewAssignmentForm from './NewAssignmentForm';
import SettingsForm from './SettingsForm';
import api from '@/services/api';
import Period from './detailPart/Period';
import People from './detailPart/People';
import { parts } from './data';
import Stream from './detailPart/Stream';
import Assignment from './detailPart/Assignment';
import Grade from './detailPart/Grade';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useClassDataContext } from '@/providers/ClassDataProvider';
export default function ClassDetail() {
  const { user } = useUserContext();
  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const isManager = user?.role === 'manager';

  const activeClass =
    'data-[state=active]:text-blue-600 data-[state=active]:hover:bg-blue-50 ' +
    'data-[state=active]:after:content-[""] data-[state=active]:after:absolute ' +
    'data-[state=active]:after:-bottom-[1px] data-[state=active]:after:left-0 data-[state=active]:after:right-0 ' +
    'data-[state=active]:after:h-0 data-[state=active]:after:border-t-4 data-[state=active]:after:bg-blue-600 ' +
    'data-[state=active]:after:rounded-t-md';

  const [isNewAssignmentOpen, setIsNewAssignmentOpen] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const { classData } = useClassDataContext();
  if (classData?.class_name) console.log(classData.class_name);
  const handleCloseSettings = () => {
    setIsSetting(false);
  };

  const handleOpenSettings = () => {
    setIsSetting(true);
  };
  const copyParts = isTeacher ? { ...parts, grade: 'Grade' } : parts;
  const { classdetailId } = useParams();
  const data = classData?.find((data) => data._id === classdetailId);
  // console.log(data);
  return isNewAssignmentOpen ? (
    <NewAssignmentForm onClose={() => setIsNewAssignmentOpen(false)} />
  ) : isSetting ? (
    <SettingsForm onClose={handleCloseSettings} />
  ) : (
    <Tabs defaultValue="stream" className="">
      <div className="border-b fixed z-10 bg-white flex items-center justify-between w-[calc(100vw-85px)] ">
        <TabsList className="bg-inherit ml-5 h-full flex items-center p-0">
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
        <Assignment />
        <People />
        <Period />
        {isTeacher && <Grade />}
      </div>
    </Tabs>
  );
}
