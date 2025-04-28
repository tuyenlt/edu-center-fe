import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

export default function SessionScheduleDialog({
    session,
    index,
    isOpen,
    setIsOpen,
    onConfirm, // <-- callback to return session data
}) {
    console.log(session)
    const [date, setDate] = useState(session.start_time ? new Date(session.start_time) : new Date());
    const [startHour, setStartHour] = useState(
        session.start_time ? `${new Date(session.start_time).getHours()}:00` : ""
    );
    const [endHour, setEndHour] = useState(
        session.end_time ? `${new Date(session.end_time).getHours()}:00` : ""
    );
    const [room, setRoom] = useState(session.room ? session.room.toString() : "");

    const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, "0")}:00`);

    const handleConfirm = () => {
        if (date && startHour && endHour && room.trim() !== "") {
            const startHourInt = parseInt(startHour.split(":")[0], 10);
            const endHourInt = parseInt(endHour.split(":")[0], 10);

            // Clone date to avoid mutating original
            const startDate = new Date(date);
            const endDate = new Date(date);
            startDate.setHours(startHourInt, 0, 0, 0);
            endDate.setHours(endHourInt, 0, 0, 0);

            const start_time = startDate.toISOString();
            const end_time = endDate.toISOString();

            onConfirm?.({
                title: session.title,
                description: session.description,
                type: session.type,
                start_time,
                end_time,
                room,
            });

            setIsOpen(false);
        } else {
            alert("Please fill out all fields before confirming.");
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Session {index}: {session.title}</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col items-center gap-4 mt-4">
                    <Calendar mode="single" selected={date} onSelect={setDate} />

                    <div className="flex gap-4">
                        <div className="flex flex-col items-start">
                            <label className="text-sm mb-1">Start Time</label>
                            <Select onValueChange={setStartHour} value={startHour}>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="Start" />
                                </SelectTrigger>
                                <SelectContent>
                                    {hours.map((hour) => (
                                        <SelectItem key={hour} value={hour}>
                                            {hour}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex flex-col items-start">
                            <label className="text-sm mb-1">End Time</label>
                            <Select onValueChange={setEndHour} value={endHour}>
                                <SelectTrigger className="w-[100px]">
                                    <SelectValue placeholder="End" />
                                </SelectTrigger>
                                <SelectContent>
                                    {hours.map((hour) => (
                                        <SelectItem key={hour} value={hour}>
                                            {hour}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex gap-2 items-center w-60 ml-4">
                        <Input placeholder="Enter a room" value={room} onChange={(e) => setRoom(e.target.value)} />
                    </div>

                    <Button type="button" onClick={handleConfirm}>Confirm</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}