import { useUserContext } from '@/providers/authContext';
import ClassExerciseCard from './ClassExerciseCard';
import { useEffect, useState } from 'react';
import api from '@/services/api';

export default function ClassAssignmentSummary() {
	const { user } = useUserContext();
	const [assignments, setAssignments] = useState([]);

	// Fetch assignments based on user role
	useEffect(() => {
		api.get(`/assignments/user/${user?._id}/`)
			.then((res) => {
				const data = res.data;
				const filteredAssignments = data.filter(assignment => assignment.due_date && new Date(assignment.due_date) >= new Date());
				setAssignments(filteredAssignments);
			}).catch((err) => {
				console.error('Error fetching assignments:', err);
			});
	}, [user]);

	return (
		<div className="flex flex-col items-center row-span-full">
			<h2 className="text-neutral-700 text-2xl">My Assignment</h2>
			{assignments.length === 0 ? (
				<div className="flex items-center justify-center h-full text-gray-500">
					<p className="text-sm">No assignments on due</p>
				</div>
			) : (
				assignments.map((assignment, idx) => (
					<ClassExerciseCard key={idx} assignment={assignment} />
				))
			)}
		</div>
	);
}
