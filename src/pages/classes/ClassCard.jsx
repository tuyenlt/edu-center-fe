import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	ClockIcon,
	CalendarIcon,
	EllipsisVertical,
	Pencil,
	ClipboardCheck,
	Archive,
	Delete,
	Copy,
	Clock,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/services/api';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUserContext } from '@/providers/authContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import AvatarUser from '@/components/shared/AvatarUser';
import { dateTimeConvert_2 } from '@/utils/dateTimeConvert';
export function ClassCard({ data }) {
	const statusColors = {
		pending: ['bg-gray-200', 'text-gray-700', 'bg-gray-700'],
		scheduling: ['bg-blue-100', 'text-blue-600', 'bg-blue-600'],
		ongoing: ['bg-green-100', 'text-green-600', 'bg-green-600'],
		finished: ['bg-green-100', 'text-green-600', 'bg-green-600'],
	};

	const { user } = useUserContext();
	if (!data || Object.keys(data).length === 0) {
		return <LoadingSpinner />;
	}

	const upcomingSession = data.class_sessions.find((session) => {
		return new Date(session.start_time) > new Date();
	});

	console.log('ClassCard data:', data);
	const [bg, text, span] = statusColors[data.status];

	return (
		<Link to={`/class/${data._id}`}>
			<Card
				className="w-75 h-68 p-0  rounded-xl text-white relative overflow-hidden border-gray-300 hover:hover:shadow-[0_1px_2px_0_rgba(63,63,70,0.3),_0_2px_6px_2px_rgba(63,63,70,0.15)]
 gap-0"
			>
				<div className="relative w-full h-24">
					<img
						src={`${data.course.img_url}`}
						alt={data.name}
						className="object-cover w-full h-full"
					/>
					<div className="absolute top-0 left-0 h-full w-full bg-black/50 z-2"></div>

					<div className="absolute z-10 top-4 left-4 w-67">
						<div className="flex justify-between items-center">
							<div className="flex gap-3 items-center">
								<h3 className="text-2xl hover:underline text-amber-50">
									{data.class_code}
								</h3>
								<Badge
									className={`${bg} ${text} uppercase text-xs tracking-wider`}
								>
									<span
										className={`w-2.5 h-2.5 ${span} rounded-full border border-white`}
									></span>
									<span>{data.status}</span>
								</Badge>
							</div>
						</div>
						<p className="text-sm mt-4 text-gray-200 hover:underline">
							{data.teachers[0].name || 'Unknown Teacher'}
						</p>
					</div>
				</div>

				<AvatarUser
					user={data.teachers[0]}
					className="absolute top-16 right-4 size-17 z-10 border-gray-200 border-2"
				/>

				<CardContent className="pl-3 pb-6">
					<h1 className="text-black/80 w-48 text-lg font-semibold mt-3">
						{data.class_name}
					</h1>
					<div className="text-black flex flex-col gap-2 justify-between h-full pb-8">
						<div className="flex gap-2 items-center self-start">
							<span className="text-sm text-gray-500">{data.course.name}</span>
						</div>
					</div>
				</CardContent>
				{upcomingSession && (
					<div className="absolute right-2 bottom-2">
						<div className="flex gap-2 text-muted-foreground text-sm justify-end w-full mt-5">
							<Clock className="w-4 h-4" />
							<div className="">
								{dateTimeConvert_2(upcomingSession.start_time)}
							</div>
						</div>
					</div>
				)}
			</Card>
		</Link>
	);
}
