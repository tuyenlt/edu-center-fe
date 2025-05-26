// src/components/DateTimePicker.jsx
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function DateTimePicker({ value, onChange, className }) {
    // Helper to pad single digits
    const pad2 = (n) => String(n).padStart(2, "0");

    // Initialize from `value` (Date or ISO string) or now
    const initial = value ? new Date(value) : new Date();
    const isoDate = initial.toISOString().slice(0, 10);       // "YYYY-MM-DD"
    const isoTime = `${pad2(initial.getHours())}:${pad2(initial.getMinutes())}`; // "HH:MM"

    const [date, setDate] = useState(isoDate);
    const [time, setTime] = useState(isoTime);

    // Sync if parent `value` changes
    useEffect(() => {
        if (!value) return;
        const d = new Date(value);
        setDate(d.toISOString().slice(0, 10));
        setTime(`${pad2(d.getHours())}:${pad2(d.getMinutes())}`);
    }, [value]);

    // When user picks a new date
    const handleDateChange = (e) => {
        const newDate = e.target.value;    // "YYYY-MM-DD"
        setDate(newDate);

        // Build a Date with the existing time
        const [h, m] = time.split(":").map(Number);
        const dt = new Date(newDate);
        dt.setHours(h, m);
        onChange?.(dt);
    };

    // When user picks a new time
    const handleTimeChange = (e) => {
        const newTime = e.target.value;    // "HH:MM"
        setTime(newTime);

        const [h, m] = newTime.split(":").map(Number);
        const dt = new Date(date);
        dt.setHours(h, m);
        onChange?.(dt);
    };

    return (
        <div className={className || "flex items-center space-x-2"}>
            <Input
                type="date"
                value={date}
                onChange={handleDateChange}
                className="w-auto"
            />
            <Input
                type="time"
                value={time}
                onChange={handleTimeChange}
                className="w-auto"
            />
        </div>
    );
}
