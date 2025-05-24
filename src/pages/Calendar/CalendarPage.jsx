import ScheduleCalendar from "@/components/shared/ScheduleCalendar";
import { useUserContext } from "@/providers/authContext";
import api from "@/services/api";
import { useEffect, useState } from "react";


export default function CalendarPage() {
    const { user } = useUserContext();
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        const fetchSchedules = async () => {
            if (!user) return;
            try {
                const response = await api.get(`/users/${user?._id}/schedules`);
                setSchedules(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching schedules:", error);
            }
        };
        fetchSchedules();
    }, [user])

    return (
        <div className="max-w-screen-xl m-auto p-10">
            <div className="w-full">
                <div className="">
                    <div className="text-2xl pl-8">Weekly Schedule</div>
                </div>
                <ScheduleCalendar scheduleData={schedules} />
            </div>
        </div>
    );
}