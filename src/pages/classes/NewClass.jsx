// components/NewClass.jsx
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useLocation, useNavigate } from 'react-router-dom'
import ScheduleCalendar from '@/components/shared/ScheduleCalendar'
import SessionSchedule from './SessionSchedule'
import SessionInfo from './SessionInfo'
import { classApi } from '@/services/api/class.api'
import { toast } from 'sonner'

const NewClass = () => {
	const navigate = useNavigate()
	const { state } = useLocation()
	const course = state?.course

	const initialSessions = course?.course_programs
		? course.course_programs.flatMap((chap, chap_idx) =>
			(chap.lessons || []).map((lesson, lesson_idx) => ({
				title: lesson.title,
				description: lesson.description,
				chapter_index: chap_idx,
				lecture_index: lesson_idx,
				type: lesson.type,
				start_time: null,
				end_time: null,
				room: '',
			}))
		)
		: []

	const [sessionArray, setSessionArray] = useState(initialSessions)
	const [selectedIndex, setSelectedIndex] = useState(null)
	const [scheduleOpen, setScheduleOpen] = useState(false)
	// const [scheduleData, setScheduleData] = useState([])
	let scheduleData = []
	scheduleData = sessionArray.filter((session) => session.start_time !== null)

	const { register, handleSubmit, formState: { errors } } = useForm()



	const isValidSessionArray = sessions =>
		sessions.every(s => s.start_time && s.end_time && s.room)

	const handleSetSessionTime = (updatedSession) => {
		// copy the array
		const arr = [...sessionArray];

		// pull out only the three fields you want to apply
		const { start_time, end_time, room } = updatedSession;

		// merge them onto the existing session
		arr[selectedIndex] = {
			...arr[selectedIndex],
			start_time,
			end_time,
			room,
		};

		setSessionArray(arr);
		setScheduleOpen(false);
		console.log(scheduleData);
	};


	const onSubmit = async data => {
		if (!isValidSessionArray(sessionArray)) {
			toast.error('Please fill all session details before creating the class')
			return
		}
		try {
			console.log(sessionArray)
			const newClass = await classApi.addNewClass({
				course_id: course._id,
				class_name: data.class_name,
				class_code: data.class_code,
				max_students: data.max_students,
				notes: data.notes,
			})
			if (!newClass?._id) {
				toast.error('Error creating class')
				return
			}


			await Promise.all(
				sessionArray.map(session =>
					classApi.addSession(newClass._id, {
						class_id: newClass._id,
						...session,
					})
				)
			)
			toast.success('Class created successfully')
			navigate('/classes')
		} catch (err) {
			console.error(err)
			toast.error('An error occurred')
		}
	}

	const lessonCounts = course?.course_programs.map(chap => chap.lessons.length) || []

	return (
		<div className="max-w-screen-xl p-10">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
				<div>
					<Label htmlFor="class_name">Class Name</Label>
					<Input
						id="class_name"
						{...register('class_name', { required: 'Class name is required' })}
					/>
					{errors.class_name && (
						<p className="text-red-500 text-sm mt-1">
							{errors.class_name.message}
						</p>
					)}
				</div>

				<div>
					<Label htmlFor="class_code">Class Code</Label>
					<Input
						id="class_code"
						{...register('class_code', { required: 'Class code is required' })}
					/>
					{errors.class_code && (
						<p className="text-red-500 text-sm mt-1">
							{errors.class_code.message}
						</p>
					)}
				</div>

				<div>
					<Label htmlFor="max_students">Max Students</Label>
					<Input
						id="max_students"
						type="number"
						{...register('max_students', {
							required: 'Max students is required',
							min: { value: 1, message: 'At least 1 student is required' },
						})}
					/>
					{errors.max_students && (
						<p className="text-red-500 text-sm mt-1">
							{errors.max_students.message}
						</p>
					)}
				</div>

				<div>
					<Label htmlFor="notes">Notes</Label>
					<Textarea id="notes" {...register('notes')} />
				</div>

				<div className="space-y-8">
					<ScheduleCalendar scheduleData={scheduleData} />

					{course.course_programs.map((chap, chapIdx) => {
						const start = lessonCounts
							.slice(0, chapIdx)
							.reduce((a, b) => a + b, 0)
						const end = start + lessonCounts[chapIdx]
						const sessionsOfChapter = sessionArray.slice(start, end)

						return (
							<div key={chapIdx} className="border rounded-lg p-4 space-y-2">
								<h2 className="text-xl font-semibold mb-4">
									Chapter {chapIdx + 1}: {chap.title}
								</h2>
								{sessionsOfChapter.map((session, idx) => {
									const globalIdx = start + idx
									return (
										<SessionInfo
											key={globalIdx}
											session={session}
											index={globalIdx + 1}
											onClick={() => {
												setSelectedIndex(globalIdx)
												setScheduleOpen(true)
											}}
										/>
									)
								})}
							</div>
						)
					})}
				</div>

				<Button type="submit" className="w-full mt-4">
					Create Class
				</Button>

				<SessionSchedule
					session={selectedIndex != null ? sessionArray[selectedIndex] : {}}
					index={selectedIndex != null ? selectedIndex + 1 : 0}
					isOpen={scheduleOpen}
					setIsOpen={setScheduleOpen}
					onConfirm={handleSetSessionTime}
				/>
			</form>
		</div>
	)
}

export default NewClass
