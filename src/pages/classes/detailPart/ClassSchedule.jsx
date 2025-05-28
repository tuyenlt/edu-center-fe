import ScheduleCalendar from '@/components/shared/ScheduleCalendar';
import { TabsContent } from '@/components/ui/tabs';

export default function ClassSchedule({ classData }) {
  console.log('ClassSchedule', classData.class_sessions);
  return (
    <TabsContent
      value="schedule"
      className="max-w-screen-2xl m-auto h-[calc(100vh-80px)] overflow-y-auto px-4"
    >
      <ScheduleCalendar scheduleData={classData.class_sessions} />
    </TabsContent>
  );
}
