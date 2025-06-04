import React, { useState } from 'react';
import { format, set } from 'date-fns';
import { useUserContext } from '@/providers/authContext';
import TeacherForm from './TeacherForm';
import { toast } from 'sonner';
import api from '@/services/api';
import AvatarUser from '@/components/shared/AvatarUser';
import { Button } from '@/components/ui/button';
import TeacherCheckin from './TeacherCheckin';
import TeacherSchedule from './TeacherSchedule';
import { Card } from '@/components/ui/card';
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from '@/components/ui/accordion';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	EllipsisVertical,
	Edit,
	MapPinCheckInside,
	Calendar1,
} from 'lucide-react';
export default function TeacherInfoRow({ teacher, onClick, onUpdate }) {
	const { user } = useUserContext();
	const [isEditing, setIsEditing] = useState(false);
	const [checkinOpen, setCheckinOpen] = useState(false);
	const [scheduleOpen, setScheduleOpen] = useState(false);

	// Display-only counts
	const enrolledCount = teacher.enrolled_classes?.length ?? 0;
	const assignmentsCount = teacher.assignments?.length ?? 0;
	const attendedCount =
		teacher.attended_class_sessions?.filter((s) => s.is_paid !== false)
			.length ?? 0;
	const unpaidCount =
		teacher.attended_class_sessions?.filter((s) => !s.is_paid).length ?? 0;

	const handleSave = async (updatedData) => {
		try {
			const updated = await api.patch(`/users/${teacher._id}`, updatedData);
			toast.success('Teacher updated');
			setIsEditing(false);
			onUpdate?.(updated.data);
		} catch {
			toast.error('Update failed');
		}
	};

	return (
		<>
			<Accordion type="single" collapsible>
				<AccordionItem
					value={`teacher-${teacher.id}`}
					className="bg-white border rounded-xl px-4 py-3 shadow-sm"
				>
					{/* Collapsed Summary */}
					<div className="flex items-center justify-between">
						<AccordionTrigger className="flex flex-1 items-center gap-4 text-left">
							<AvatarUser user={teacher} className="w-10 h-10" />
							<div>
								<div className="font-semibold text-gray-800">
									{teacher.name}
								</div>
								<div className="text-sm text-gray-500">{teacher.email}</div>
							</div>
						</AccordionTrigger>

						{/* Dropdown Menu */}
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<button className="p-2 rounded-full hover:bg-gray-100">
									<EllipsisVertical className="w-5 h-5 text-gray-600" />
								</button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{user.role === 'manager' && (
									<DropdownMenuItem onClick={() => setIsEditing(true)}>
										<Edit className="w-4 h-4 mr-2" /> Edit
									</DropdownMenuItem>
								)}
								<DropdownMenuItem onClick={() => setCheckinOpen(true)}>
									<MapPinCheckInside className="w-4 h-4 mr-2" /> Check In
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setScheduleOpen(true)}>
									<Calendar1 className="w-4 h-4 mr-2" /> Schedule
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>

					{/* Expanded Content */}
					<AccordionContent className="mt-4 space-y-3 text-sm text-gray-700">
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							<div>
								<div className="font-medium">Gender</div>
								<div>{teacher.gender || '—'}</div>
							</div>
							<div>
								<div className="font-medium">Phone</div>
								<div>{teacher.phone_number || '—'}</div>
							</div>
							{teacher.personal_info && (
								<>
									<div>
										<div className="font-medium">DOB</div>
										<div>
											{teacher.personal_info.dob
												? format(
													new Date(teacher.personal_info.dob),
													'yyyy-MM-dd'
												)
												: '—'}
										</div>
									</div>
									<div>
										<div className="font-medium">Address</div>
										<div>{teacher.personal_info.address || '—'}</div>
									</div>
								</>
							)}
							<div>
								<div className="font-medium">Classes</div>
								<div>{enrolledCount}</div>
							</div>
							<div>
								<div className="font-medium">Assignments</div>
								<div>{assignmentsCount}</div>
							</div>
							<div>
								<div className="font-medium">Attended</div>
								<div>{attendedCount}</div>
							</div>
							<div>
								<div className="font-medium">Unpaid</div>
								<div>{unpaidCount}</div>
							</div>

							{user.role === 'manager' && teacher.payment_info && (
								<>
									<div>
										<div className="font-medium">Bank</div>
										<div>{teacher.payment_info.bank_name || '—'}</div>
									</div>
									<div>
										<div className="font-medium">Acct#</div>
										<div>{teacher.payment_info.bank_account || '—'}</div>
									</div>
									<div>
										<div className="font-medium">Holder</div>
										<div>{teacher.payment_info.account_holder_name || '—'}</div>
									</div>
								</>
							)}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion>

			{/* Dialogs */}
			<TeacherForm
				open={isEditing}
				teacher={teacher}
				onSave={handleSave}
				onCancel={() => setIsEditing(false)}
			/>
			<TeacherCheckin
				open={checkinOpen}
				onClose={() => setCheckinOpen(false)}
				teacherId={teacher._id}
			/>
			<TeacherSchedule
				open={scheduleOpen}
				onClose={() => setScheduleOpen(false)}
				teacherId={teacher._id}
			/>
		</>
	);
}
