import AddPeopleToClass from './AddPeopleToClass';
import { TabsContent } from '@/components/ui/tabs';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogFooter,
	DialogDescription,
} from '@/components/ui/dialog';
import { CircleX, EllipsisVertical, Pencil, UserRoundPlus } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import AvatarUser from '@/components/shared/AvatarUser';
import { useEffect, useState } from 'react';
import { useUserContext } from '@/providers/authContext';
import RemoveOrEdit from './manage/RemoveOrEdit';
import api from '@/services/api';
import { useParams } from 'react-router-dom';




export default function People() {
	const { classId } = useParams();
	const [data, setData] = useState(null);

	const fetchClassData = async () => {
		api.get(`/classes/${classId}`, {
			params: {
				populate_fields: ['teachers', 'students', 'course'],
			},
		}).then((response) => {
			setData(response.data);
		}).catch((error) => {
			console.error('Error fetching class data:', error);
		});
	}


	useEffect(() => {
		fetchClassData();
	}, [classId]);

	const { user } = useUserContext();
	const isManager = user?.role === 'manager';

	const [isOpenRemove, setIsOpenRemove] = useState(false);

	if (!data || Object.keys(data).length === 0) {
		return <div>Loading...</div>;
	}
	const teachers = data.teachers;
	const students = data.students;
	return (
		<div>

			{/* TEACHERS SECTION */}
			<section className="space-y-6">
				<div className="flex items-center justify-between border-b pb-3">
					<h2 className="text-2xl font-bold text-gray-800">Teachers</h2>
					<div className="flex items-center gap-3 text-sm text-gray-600">
						<span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
							{teachers.length} teachers
						</span>
						<Dialog>
							{isManager && (
								<DialogTrigger asChild>
									<button className="p-2 rounded-full hover:bg-gray-100 transition">
										<UserRoundPlus size={20} />
									</button>
								</DialogTrigger>
							)}
							<DialogContent>
								<AddPeopleToClass
									type="teacher"
									classId={data._id}
									courseId={data.course._id}
									prevTeachers={teachers.map((teacher) => teacher._id)}
									onSubmit={() => fetchClassData()}
								/>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				<ul className="divide-y divide-gray-200">
					{teachers.map((teacher) => (
						<li
							key={teacher.id}
							className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition rounded-md"
						>
							<div className="flex items-center gap-4">
								<AvatarUser user={teacher} />
								<div>
									<p className="text-base font-medium text-gray-800">
										{teacher.name}
									</p>
									<p className="text-sm text-gray-500">{teacher.email}</p>
								</div>
							</div>
							{isManager && <RemoveOrEdit user={teacher} onSuccess={() => fetchClassData()} />}
						</li>
					))}
				</ul>
			</section>

			<section className="space-y-6">
				<div className="flex items-center justify-between border-b pb-3">
					<h2 className="text-2xl font-bold text-gray-800">Students</h2>
					<div className="flex items-center gap-3 text-sm text-gray-600">
						<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
							{students.length} students
						</span>
						<Dialog>
							{isManager && (
								<DialogTrigger asChild>
									<button className="p-2 rounded-full hover:bg-gray-100 transition">
										<UserRoundPlus size={20} />
									</button>
								</DialogTrigger>
							)}
							<DialogContent>
								<AddPeopleToClass
									type="student"
									classId={data._id}
									courseId={data.course._id}
									onSubmit={() => fetchClassData()}
								/>
							</DialogContent>
						</Dialog>
					</div>
				</div>

				{students.length > 0 ? (
					<ul className="divide-y divide-gray-200">
						{students.map((student) => {
							return (
								<li
									key={student.id}
									className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition rounded-md"
								>
									<div className="flex items-center gap-4">
										<AvatarUser user={student} />
										<div>
											<p className="text-base font-medium text-gray-800">
												{student.name}
											</p>
											<p className="text-sm text-gray-500">{student.email}</p>
										</div>
									</div>
									{isManager && (
										<RemoveOrEdit user={student} onSuccess={() => fetchClassData()} />
									)}
								</li>
							);
						})}
					</ul>
				) : (
					<p className="text-gray-500 italic">
						No students yet. Students list is display here.
					</p>
				)}
			</section>
		</div>
	);
}
