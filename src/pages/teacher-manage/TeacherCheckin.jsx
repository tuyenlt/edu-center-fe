import React, { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import api from "@/services/api";
import { dateTimeConvert_2 } from "@/utils/dateTimeConvert";
import { getIntervalTimePosition } from "@/utils";
import { toast } from "sonner";

export default function TeacherCheckin({ open, onClose, teacherId }) {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            fetchSessions();
        }
    }, [open]);

    const fetchSessions = async () => {
        setLoading(true);
        try {
            const response = await api.get(`/users/${teacherId}/schedules`);
            const sessionsData = response.data.filter(session => {
                return getIntervalTimePosition(session.start_time, session.end_time, new Date()) === "within";
            })
            setSessions(sessionsData);
            console.log("Fetched sessions:", sessionsData);
        } catch (error) {
            console.error("Failed to fetch sessions:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSessionClick = async (session) => {
        try {
            const response = await api.post(`/teachers/${teacherId}/add-session`, {
                session_id: session._id,
            })
            if (response.status === 200) {
                toast.success("Session checked in successfully");
                fetchSessions();
            } else {
                toast.error("Failed to check in session");
            }
        } catch (error) {
            console.error("Error handling session click:", error);
            toast.error("Failed to handle session click");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Teacher Check-in</DialogTitle>
                </DialogHeader>
                <div>
                    {loading ? (
                        <LoadingSpinner />
                    ) : <div className="">
                        {sessions.length > 0 ? (
                            <div>
                                {sessions.map((session) => (
                                    <div
                                        key={session._id}
                                        onClick={() => handleSessionClick(session)}
                                        className="cursor-pointer hover:bg-gray-100 p-2 rounded border-b"
                                    >
                                        <div>
                                            <p className="font-medium">{session.title}</p>
                                            <p className="text-sm text-gray-500">
                                                Time: {dateTimeConvert_2(session.start_time)} - {dateTimeConvert_2(session.end_time).split('-')[1]}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-gray-500">
                                No sessions in check in time found.
                            </div>
                        )}
                    </div>
                    }
                </div>
                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
