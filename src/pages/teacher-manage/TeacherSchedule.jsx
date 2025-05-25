import React, { useEffect, useState } from "react";
import ScheduleCalendar from "@/components/shared/ScheduleCalendar";
import api from "@/services/api";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TeacherSchedule({ open, onClose, teacherId }) {
    const [schedules, setSchedules] = useState([]);

    useEffect(() => {
        if (open && teacherId) {
            api.get(`/users/${teacherId}/schedules`)
                .then((response) => setSchedules(response.data))
                .catch((error) => console.error("Failed to fetch schedules:", error));
        }
    }, [open, teacherId]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.2)]">
            <div className="bg-white rounded-lg shadow-lg max-w-screen-2xl p-6">
                <div className="flex justify-between items-center border-b pb-4">
                    <h2 className="text-xl font-semibold">Teacher Schedule</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>
                <div className="mt-4">
                    <ScrollArea className="h-[980px] max-h-[calc(100vh-100px)] max w-full">
                        <ScheduleCalendar scheduleData={schedules} />
                    </ScrollArea>
                </div>
            </div>
        </div>
    );
}