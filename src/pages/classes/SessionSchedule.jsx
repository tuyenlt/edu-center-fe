import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { toast } from "sonner";

export default function SessionScheduleDialog({
    session,
    index,
    isOpen,
    setIsOpen,
    onConfirm,
}) {
    const [date, setDate] = useState(
        session.start_time ? new Date(session.start_time) : new Date()
    );
    const [startHour, setStartHour] = useState(
        session.start_time
            ? `${new Date(session.start_time).getHours().toString().padStart(2, "0")}:00`
            : ""
    );
    const [endHour, setEndHour] = useState(
        session.end_time
            ? `${new Date(session.end_time).getHours().toString().padStart(2, "0")}:00`
            : ""
    );
    const [room, setRoom] = useState(session.room ? session.room.toString() : "");

    const hours = useMemo(
        () =>
            Array.from({ length: 17 }, (_, i) => {
                const hour = i + 7;
                return `${hour.toString().padStart(2, "0")}:00`;
            }),
        []
    );


    const filteredEndHours = useMemo(() => {
        if (!startHour) return hours;
        return hours.filter((h) => h > startHour);
    }, [hours, startHour]);

    useEffect(() => {
        if (endHour && startHour && endHour <= startHour) {
            setEndHour("");
        }
    }, [startHour, endHour]);

    const handleConfirm = () => {
        if (!date || !startHour || !endHour || room.trim() === "") {
            alert("Please fill all information");
            return;
        }
        const startH = +startHour.split(":")[0];
        const endH = +endHour.split(":")[0];
        if (startH >= endH) {
            return;
        }

        const startDate = new Date(date);
        startDate.setHours(startH, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(endH, 0, 0, 0);

        onConfirm?.({
            title: session.title,
            description: session.description,
            type: session.type,
            start_time: startDate.toISOString(),
            end_time: endDate.toISOString(),
            room,
        });
        toast(`choose: ${startDate}`)
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Session {index}: {session.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4 mt-4">
                    {/* DATE PICKER */}
                    <div className="flex flex-col items-start">
                        <label className="text-sm mb-1">Date</label>
                        <Input
                            type="date"
                            value={date.toISOString().split("T")[0]}
                            onChange={(e) => setDate(new Date(e.target.value))}
                        />
                    </div>

                    {/* TIME PICKERS */}
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
                                    {filteredEndHours.map((hour) => (
                                        <SelectItem key={hour} value={hour}>
                                            {hour}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* ROOM INPUT */}
                    <div className="flex flex-col items-start">
                        <label className="text-sm mb-1">Room</label>
                        <Input
                            placeholder="Enter a room"
                            value={room}
                            onChange={(e) => setRoom(e.target.value)}
                        />
                    </div>

                    <Button onClick={handleConfirm}>Confirm</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
