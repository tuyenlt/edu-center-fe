import React, { useState } from 'react';
import { format, set } from 'date-fns';
import { useUserContext } from '@/providers/authContext';
import TeacherForm from './TeacherForm';
import { toast } from 'sonner';
import api from '@/services/api';
import { Calendar1, Check, Edit, MapPinCheckInside } from 'lucide-react';
import AvatarUser from '@/components/shared/AvatarUser';
import { Button } from '@/components/ui/button';
import TeacherCheckin from './TeacherCheckin';
import TeacherSchedule from './TeacherSchedule';

export default function TeacherInfoRow({ teacher, onClick, onUpdate }) {
	const { user } = useUserContext();
	const [isEditing, setIsEditing] = useState(false);
	const [checkinOpen, setCheckinOpen] = useState(false);
	const [scheduleOpen, setScheduleOpen] = useState(false);

	// Display-only counts
	const enrolledCount = teacher.enrolled_classes?.length ?? 0;
	const assignmentsCount = teacher.assignments?.length ?? 0;
	const attendedCount = teacher.attended_class_sessions?.filter(s => s.is_paid !== false).length ?? 0;
	const unpaidCount = teacher.attended_class_sessions?.filter(s => !s.is_paid).length ?? 0;

	const handleSave = async updatedData => {
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
			<div
				className="grid grid-cols-4 gap-4 p-4 border bg-white rounded-sm items-center"
				onClick={() => onClick ? onClick(teacher) : null}
			>
				<div className="">
					<div className="flex gap-1">
						<AvatarUser user={teacher} className="w-10 h-10" />
						<div className="col-span-1 font-medium text-gray-900 mt-1">
							{teacher.name}
						</div>
					</div>
					<div className="ml-2">

						<div className="col-span-1 text-gray-600">
							{teacher.email}
						</div>

						<div className="col-span-1 capitalize text-gray-600">
							{teacher.gender || ''}
						</div>

						<div className="col-span-1 text-gray-600">
							{teacher.phone_number || ''}
						</div>

						{teacher.personal_info ? (
							<div className="col-span-1 space-y-1 text-sm text-gray-600">
								<div>DOB: {teacher.personal_info.dob ? format(new Date(teacher.personal_info.dob), 'yyyy-MM-dd') : '—'}</div>
								<div>Address: {teacher.personal_info.address || '—'}</div>
							</div>
						) : <div></div>}
					</div>
				</div>

				<div className="col-span-1 space-y-1  text-gray-600 text-sm mt-2">
					<div>Classes: {enrolledCount}</div>
					<div>Assignments: {assignmentsCount}</div>
					<div>Attended: {attendedCount}</div>
					<div>Unpaid: {unpaidCount}</div>
				</div>



				{user.role === 'manager' ? (
					<div className="flex space-y-1 text-sm text-gray-600 items-center justify-between">
						{teacher.payment_info && (
							<div>
								<div>Bank: {teacher.payment_info.bank_name || '—'}</div>
								<div>Acct#: {teacher.payment_info.bank_account || '—'}</div>
								<div>Holder: {teacher.payment_info.account_holder_name || '—'}</div>
							</div>
						)}
					</div>
				) : (
					<div></div>
				)}


				<div className="flex flex-col items-end gap-2">
					<button
						onClick={e => { e.stopPropagation(); setIsEditing(true); }}
						className="w-30 flex gap-2 hover:text-gray-500"
					>
						<Edit /> Edit
					</button>
					<button
						className="w-30 flex gap-2 hover:text-gray-500"
						onClick={() => setCheckinOpen(true)}
					>
						<MapPinCheckInside /> Check In
					</button>
					<button
						className="w-30 flex gap-2 hover:text-gray-500"
						onClick={() => setScheduleOpen(true)}
					>
						<Calendar1 /> Schedule
					</button>
				</div>
			</div>




			{/* Edit dialog form */}
			{isEditing && (
				<TeacherForm
					open={isEditing}
					teacher={teacher}
					onSave={handleSave}
					onCancel={() => setIsEditing(false)}
				/>
			)}

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
