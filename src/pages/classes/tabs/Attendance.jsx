import LoadingSpinner from "@/components/shared/LoadingSpinner";
import api from "@/services/api";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table';
import AvatarUser from "@/components/shared/AvatarUser";
import CurrentSessionAttendanceForm from "../components/CurrentSessionAttendanceForm";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Attendance() {
	const { classId } = useParams();
	const [classData, setClassData] = useState(null);
	const [loading, setLoading] = useState(true);
	const now = new Date();

	useEffect(() => {
		const fetchClassData = async () => {
			setLoading(true);
			try {
				const response = await api.get(`/classes/${classId}`, {
					params: { populate_fields: ["class_sessions", "students"] },
				});
				const data = response.data;
				setClassData(data);
			} catch (error) {
				console.error("Error fetching class data:", error);
			} finally {
				setLoading(false);
			}
		};
		fetchClassData();
	}, [classId]);

	if (loading) {
		return (
			<div className="flex h-50 items-center justify-center">
				<LoadingSpinner />
			</div>
		);
	}

	const currentSession = classData.class_sessions.find(
		session => new Date(session.start_time) <= now && new Date(session.end_time) >= now
	);

	return (
		<div className="max-w-screen-2xl mx-auto my-6 px-4">
			<h1 className="text-2xl font-semibold mb-4">Attendance for {classData.class_name}</h1>
			<div className="flex items-center mb-4">
				{currentSession && <CurrentSessionAttendanceForm
					session={currentSession}
					students={classData.students}
					onSave={(session) => {
						setClassData(prev => ({
							...prev,
							class_sessions: prev.class_sessions.map(s =>
								s._id === session._id ? session : s
							),
						}));
					}}
				/>}
			</div>
			<ScrollArea className="w-full max-w-[calc(100vw-80px)]">
				<Table className="min-w-[600px] w-full border-collapse mb-4">
					<TableHeader className="bg-gray-50 sticky top-0 z-10">
						<TableRow>
							<TableHead className="py-2 px-4 border font-medium">Students</TableHead>
							{classData.class_sessions.map((session) => (
								<TableHead
									key={session._id}
									className="py-2 px-4 border text-center"
								>
									{format(new Date(session.start_time), 'dd/MM')}
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{classData.students.map((student) => (
							<TableRow key={student._id} className="hover:bg-gray-50">
								<TableCell className="py-2 px-4 border font-medium">
									<div className="flex items-center">
										<AvatarUser user={student} className="mr-2 w-10 h-10" />
										{student.name}
									</div>
								</TableCell>
								{classData.class_sessions.map((session) => {
									const isPast = new Date(session.end_time) < now;
									const attended = session.attendance.includes(student._id);
									return (
										<TableCell key={session._id} className="py-2 px-4 border text-center">
											{isPast ? (
												attended ? (
													<Badge variant="outline" className="border-green-600 text-green-600">
														Present
													</Badge>
												) : (
													<Badge variant="outline" className="border-red-600 text-red-600">
														Absent
													</Badge>
												)
											) : (
												<span className="text-gray-400">–</span>
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))}
					</TableBody>
				</Table>
				<ScrollBar className="w-full bg-gray-200 rounded-full mt-4" orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}
