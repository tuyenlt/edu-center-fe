import React, { useState } from 'react';
import {
	format,
	startOfWeek,
	addDays,
	isSameDay,
	parseISO,
	addWeeks,
	subWeeks,
	set,
} from 'date-fns';
import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ScheduleCalendar({
	scheduleData = [],
	onSelectDate = () => { },
	prevScheduleData = [],
}) {
	const [currentWeek, setCurrentWeek] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(null);
	const [expandedDay, setExpandedDay] = useState(null);

	// merge and filter
	const allData = [
		...scheduleData.filter((i) => i.start_time),
		...prevScheduleData.map((i) => ({ ...i, prev: true })),
	];

	const hours = Array.from({ length: 16 }, (_, i) => i + 7);

	const renderHeader = () => (
		<div className="flex justify-between items-center mb-4 flex-wrap gap-2">
			<div className="flex items-center gap-2">
				<Button variant="ghost" onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}>
					<ChevronLeft className="h-5 w-5" />
				</Button>
				<h2 className="text-xl font-bold">{format(currentWeek, 'MMMM yyyy')}</h2>
				<Button variant="ghost" onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}>
					<ChevronRight className="h-5 w-5" />
				</Button>
			</div>
		</div>
	);

	const renderDays = () => {
		const startDate = startOfWeek(currentWeek, { weekStartsOn: 1 });
		const days = [
			<div key="time" className="text-center font-medium text-gray-600">
				Time
			</div>,
		];

		for (let i = 0; i < 7; i++) {
			const day = addDays(startDate, i);
			const isToday = isSameDay(day, new Date());
			days.push(
				<div
					key={i}
					className={`text-center font-medium px-2 py-1 cursor-pointer ${isToday ? 'bg-blue-200 text-blue-800 font-bold' : 'text-gray-600 hover:bg-blue-50'}`}
					onClick={() => setExpandedDay(day)}
				>
					{format(day, 'EEE d')}
				</div>
			);
		}

		return <div className="grid grid-cols-8 mb-2">{days}</div>;
	};

	const renderWeekCells = () => {
		const startDate = startOfWeek(currentWeek, { weekStartsOn: 1 });

		return (
			<div className="flex flex-col">
				{hours.map((hour, hIdx) => (
					<div key={hIdx} className="grid grid-cols-8 border border-t-0">
						<div className="p-2 text-sm text-right pr-4 border-r bg-gray-50 font-medium flex items-center justify-center">
							{hour}:00
						</div>
						{Array.from({ length: 7 }).map((_, dIdx) => {
							const day = addDays(startDate, dIdx);
							const cellEvents = allData.filter((item) => {
								const start = parseISO(item.start_time);
								return (
									isSameDay(start, day) && start.getHours() === hour
								);
							});

							// const isSelected =
							// 	selectedDate &&
							// 	isSameDay(day, selectedDate) &&
							// 	selectedDate.getHours() === hour;

							return (
								<div
									key={`${dIdx}-${hour}`}
									className={`relative border-r last:border-r-0 transition-all h-12 p-0 '
										}`}
									onClick={() => {
										const newDate = new Date(day);
										newDate.setHours(hour, 0, 0, 0);
										setSelectedDate(newDate);
										onSelectDate(newDate);
										setExpandedDay(day);
									}}
								>
									{cellEvents.length > 0 && (
										<>
											{/* show first event */}
											{(() => {
												const ev = cellEvents[0];
												const start = parseISO(ev.start_time);
												const end = parseISO(ev.end_time);
												const dur = (end - start) / (1000 * 60 * 60);
												const height = dur * 48;
												return (
													<div
														className={`absolute z-10 bg-blue-100 border border-blue-400 text-xs p-1 rounded shadow-sm ${ev.prev ? 'bg-gray-300 opacity-50' : ''}`}
														style={{ top: 0, height, left: 0, right: 0 }}
													>
														<div className="font-medium text-blue-900 truncate">
															Room {ev.room}
															{ev.class_name ? ` - ${ev.class_name}` : ''}
														</div>
														<div className="text-[10px] text-blue-800 truncate">
															{ev.title}
														</div>
														<div className="text-[10px] text-muted-foreground">
															{format(start, 'HH:mm')} - {format(end, 'HH:mm')}
														</div>
													</div>
												);
											})()}
											{/* overlap indicator */}
											{cellEvents.length > 1 && (
												<div className="absolute bottom-1 right-1 bg-white text-[10px] px-1 rounded shadow-sm">
													+{cellEvents.length - 1}
												</div>
											)}
										</>
									)}
								</div>
							);
						})}
					</div>
				))}
			</div>
		);
	};

	return (
		<div className="max-w-8xl mx-auto mt-10 border w-full min-w-5xl">
			<CardContent className="p-6">
				{renderHeader()}
				{renderDays()}
				{renderWeekCells()}
				{/* show expanded list */}
				{expandedDay && (
					// Overlay + Modal Wrapper
					<div className="fixed inset-0 z-50 flex items-center justify-center">
						<div
							className="absolute inset-0 bg-[rgba(0,0,0,0.5)]"
							onClick={() => setExpandedDay(null)}
						/>

						{/* Modal Content */}
						<div className="relative bg-white rounded-lg shadow-lg w-[90vw] max-w-3xl max-h-[80vh] overflow-y-auto p-6">
							<div className="flex justify-between items-center mb-4">
								<h3 className="font-medium text-lg">
									Schedules for {format(expandedDay, 'PPP')}:
								</h3>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setExpandedDay(null)}
								>
									Close
								</Button>
							</div>
							<ul className="space-y-2">
								{allData
									.filter((item) =>
										isSameDay(parseISO(item.start_time), expandedDay)
									)
									.map((ev, i) => {
										const s = parseISO(ev.start_time);
										const e = parseISO(ev.end_time);
										return (
											<li key={i} className="text-sm">
												{format(s, 'HH:mm')} - {format(e, 'HH:mm')} : Room {ev.room}{' '}
												{ev.class_name ? `- ${ev.class_name}` : ''} - {ev.title}
											</li>
										);
									})}
							</ul>
						</div>
					</div>
				)}

			</CardContent>
		</div>
	);
}
