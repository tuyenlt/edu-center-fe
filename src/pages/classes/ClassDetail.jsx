import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUserContext } from '@/providers/authContext';
import SettingsForm from './tabs/manage/SettingsForm';
import api from '@/services/api';
import CourseInfo from './tabs/CourseInfo';
import People from './tabs/People';
import Stream from './tabs/Stream';
import Assignment from './tabs/Assignment';
import Grade from './tabs/grade/Grade';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useLayoutContext } from '@/providers/LayoutProvider';

import LoadingSpinner from '@/components/shared/LoadingSpinner';
import ClassSchedule from './tabs/ClassSchedule';
import Attendance from './tabs/Attendance';

const tabs = {
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
	const { classId } = useParams();
	const { user } = useUserContext();
	const isManager = user?.role === 'manager';

	const isRoleAllowed = (user.role !== "staff") && (user.role !== "student")

	const [isSetting, setIsSetting] = useState(false);
	const [isSessionSchedule, setIsSessionSchedule] = useState(false);

	const handleCloseSettings = () => {
		setIsSetting(false);
	};

	const handleOpenSettings = () => {
		setIsSetting(true);
	};

	if (isRoleAllowed) {
		tabs.attendance = 'Attendance';
		tabs.grade = 'Grade';
	}
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchClassData = async () => {
			try {
				const response = await api.get(`/classes/${classId}`);
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
					{Object.entries(tabs).map(([key, value]) => (
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
			<div className="bg-gray-50 h-[calc(100vh-140px)]">
				<TabsContent value="stream" className="w-4/5 mx-auto  py-10">
					<Stream />
				</TabsContent>

				<TabsContent
					value="assignments"
					className="w-4/5 max-w-screen-2xl mx-auto  py-10"
				>
					<Assignment />
				</TabsContent>

				<TabsContent value="people" className="w-4/5 mx-auto  py-10">
					<People />
				</TabsContent>

				<TabsContent value="courseInfo" className="w-4/5 mx-auto  py-10">
					<CourseInfo />
				</TabsContent>

				<TabsContent value="schedule" className="p-10 max-w-screen-2xl m-auto">
					<ClassSchedule />
				</TabsContent>

				{isRoleAllowed && (
					<TabsContent value="grade">
						<Grade students={data} />
					</TabsContent>
				)}
				{isRoleAllowed && (
					<TabsContent value="attendance">
						<Attendance />
					</TabsContent>
				)}
			</div>
		</Tabs>
	);
}
