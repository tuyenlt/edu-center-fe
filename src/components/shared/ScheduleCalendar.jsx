import React, { useState } from "react";
import {
    format,
    startOfWeek,
    addDays,
    isSameDay,
    parseISO,
    addWeeks,
    subWeeks,
} from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ScheduleCalendar({
    scheduleData = [],
    onSelectDate = () => { },
}) {
    const [currentWeek, setCurrentWeek] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    scheduleData = scheduleData.filter((item) => item.start_time);
    const hours = Array.from({ length: 16 }, (_, i) => i + 7); // 7:00 to 21:00

    const renderHeader = () => (
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}>
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-xl font-bold">{format(currentWeek, "MMMM yyyy")}</h2>
                <Button variant="ghost" onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}>
                    <ChevronRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );

    const renderDays = () => {
        const startDate = startOfWeek(currentWeek, { weekStartsOn: 1 });
        const days = [<div key="time" className="text-center font-medium text-gray-600">Time</div>];

        for (let i = 0; i < 7; i++) {
            const day = addDays(startDate, i);
            const isToday = isSameDay(day, new Date());
            days.push(
                <div
                    key={i}
                    className={`text-center font-medium px-2 py-1 ${isToday ? "bg-blue-200 text-blue-800 font-bold" : "text-gray-600"}`}
                >
                    {format(day, "EEE d")}
                </div>
            );
        }

        return <div className="grid grid-cols-8 mb-2">{days}</div>;
    };

    const renderWeekCells = () => {
        const startDate = startOfWeek(currentWeek, { weekStartsOn: 1 });

        const renderedItems = new Set();

        return (
            <div className="flex flex-col">
                {hours.map((hour, hourIndex) => (
                    <div key={hourIndex} className="grid grid-cols-8 border border-t-0">
                        <div className="p-2 text-sm text-right pr-4 border-r bg-gray-50 font-medium flex items-center justify-center">
                            {hour}:00
                        </div>
                        {Array.from({ length: 7 }).map((_, dayIndex) => {
                            const day = addDays(startDate, dayIndex);
                            const slotStart = new Date(day);
                            slotStart.setHours(hour, 0, 0, 0);
                            const slotEnd = new Date(slotStart);
                            slotEnd.setHours(hour + 1);

                            const isSelected =
                                selectedDate &&
                                isSameDay(day, selectedDate) &&
                                hour === selectedDate.getHours();

                            const cellKey = `${dayIndex}-${hour}`;

                            return (
                                <div
                                    key={cellKey}
                                    className={`p-0 relative cursor-pointer border-r last:border-r-0 transition-all h-12 ${isSelected ? "bg-blue-300" : "hover:bg-blue-50"}`}
                                    onClick={() => {
                                        const newDate = new Date(day);
                                        newDate.setHours(hour, 0, 0, 0);
                                        setSelectedDate(newDate);
                                        onSelectDate(newDate);
                                    }}
                                >
                                    {scheduleData.map((item, i) => {
                                        const itemStart = parseISO(item.start_time);
                                        const itemEnd = parseISO(item.end_time);
                                        const duration = (itemEnd - itemStart) / (1000 * 60 * 60);
                                        const itemDayIndex = itemStart.getDay() === 0 ? 6 : itemStart.getDay() - 1;
                                        const itemHour = itemStart.getHours();

                                        const uniqueKey = `${item.title}-${item.start_time}-${item.end_time}`;

                                        if (
                                            itemDayIndex === dayIndex &&
                                            itemHour === hour &&
                                            !renderedItems.has(uniqueKey)
                                        ) {
                                            renderedItems.add(uniqueKey);
                                            const height = duration * 48;
                                            return (
                                                <div
                                                    key={i}
                                                    className="absolute z-10 bg-blue-100 border border-blue-400 text-xs p-1 rounded shadow-sm pointer-events-auto cursor-pointer"
                                                    style={{ top: 0, height, left: 0, right: 0 }}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedDate(itemStart);
                                                        onSelectDate(itemStart);
                                                    }}
                                                >
                                                    <div className="font-medium text-blue-900 truncate text-wrap">{item.room} - {item.title}</div>
                                                    <div className="text-[10px] text-muted-foreground">
                                                        {format(itemStart, "HH:mm")} - {format(itemEnd, "HH:mm")}
                                                    </div>
                                                </div>
                                            );
                                        }

                                        return null;
                                    })}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Card className="max-w-6xl mx-auto mt-10 shadow-sm w-full">
            <CardContent className="p-6">
                {renderHeader()}
                {renderDays()}
                {renderWeekCells()}
            </CardContent>
        </Card>
    );
}
