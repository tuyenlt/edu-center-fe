import ScheduleCalendar from "@/components/shared/ScheduleCalendar";
import { TabsContent } from "@/components/ui/tabs";

export default function ClassSchedule({ classData }) {
    console.log("ClassSchedule", classData.class_sessions);
    return (
        <TabsContent value="schedule" className="p-10 max-w-screen-2xl m-auto">
            <ScheduleCalendar scheduleData={classData.class_sessions} />
        </TabsContent>
    )
}