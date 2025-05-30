import { useUserContext } from '@/providers/authContext';
import api from '@/services/api';
import { format, isSameDay, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Link, useNavigate } from 'react-router-dom';

export default function UpcomingActivities() {
	const navigate = useNavigate();
	const { user } = useUserContext();
	const [schedules, setSchedules] = useState();
	const currentTime = new Date();
	useEffect(() => {
		const fetchSchedules = async () => {
			if (!user) return;
			try {
				const response = await api.get(`/users/${user?._id}/schedules`);
				const data = response.data.map((item) => ({
					...item,
					start_time: new Date(item.start_time),
					end_time: new Date(item.end_time),
				}));
				setSchedules(data.sort((a, b) => a.start_time - b.start_time));

				console.log(response.data);
			} catch (error) {
				console.error('Error fetching schedules:', error);
			}
		};
		fetchSchedules();
	}, [user]);
	return (
		<div className="bg-white p-4 rounded-lg shadow-md overflow-auto h-[396px]">
			<div className="flex justify-between mb-4">
				<h2 className="font-semibold text-lg">Upcoming Activities</h2>
				<Link to="/calendar" className="text-blue-700 text-sm font-medium">
					See all
				</Link>
			</div>

			{schedules &&
				schedules.map((item, i) => {
					let statusText = '';
					let statusColor = '';

					const itemStart = item.start_time;
					const itemEnd = item.end_time;
					if (itemStart <= currentTime && currentTime <= itemEnd) {
						statusText = 'Ongoing';
						statusColor = 'text-green-500';
					} else {
						statusText = 'Upcoming';
						statusColor = 'text-orange-500';
					}
					const diffInMs = itemEnd.getTime() - currentTime.getTime();
					const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
					if (itemEnd < currentTime || diffInDays > 4) return;
					return (
						<div
							key={i}
							className="flex items-center gap-4 bg-blue-50 rounded-xl p-4 mb-3 shadow-sm cursor-pointer hover:bg-blue-100 transition-colors"
							onClick={() => navigate(`/class/${item.classId}`)}
						>
							<div className="bg-blue-800 text-white rounded-lg p-[14px] flex flex-col justify-center items-center font-medium">
								<div className="text-lg leading-none">
									{format(itemStart, 'dd')}
								</div>
							</div>

							<div className="flex flex-col w-full">
								<div className="flex justify-between items-center">
									<p className="font-bold text-blue-900 text-sm truncate max-w-[60%]">
										{item.class_name}
									</p>
									<span className="text-xs text-blue-800 font-medium">
										• {format(itemStart, 'HH:mm')} - {format(itemEnd, 'HH:mm')}
									</span>
								</div>

								<div className="flex justify-between items-center mt-1">
									<p className="text-sm text-blue-700 font-medium">
										Room {item.room}
									</p>
									<span className={`text-xs font-semibold ${statusColor}`}>
										{statusText}
									</span>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
}
