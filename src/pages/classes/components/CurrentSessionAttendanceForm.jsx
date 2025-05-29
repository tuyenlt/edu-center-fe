import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import api from '@/services/api';

export default function CurrentSessionAttendanceForm({ session, students, onSave }) {
	const { classId } = useParams();
	const [selection, setSelection] = useState([]);
	const [open, setOpen] = useState(false);
	const [selectAll, setSelectAll] = useState(false);

	const toggleStudent = (id) => {
		setSelection(prev =>
			prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
		);
	};

	const handleSelectAll = () => {
		if (selectAll) {
			setSelection([]);
		} else {
			setSelection(students.map(s => s._id));
		}
		setSelectAll(!selectAll);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post(`/class-sessions/${session._id}/add-attendance`, {
				userIds: selection,
			})
			onSave(response.data);
			setOpen(false);
			toast.success('Attendance saved successfully');
		} catch (error) {
			console.error('Error saving attendance:', error);
			toast.error('Failed to save attendance');
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" onClick={() => setOpen(true)}>Take Attendance</Button>
			</DialogTrigger>
			<DialogContent className="max-w-md">
				<DialogHeader>
					<DialogTitle>
						Attendance for {format(new Date(session.start_time), 'dd/MM/yyyy')}
					</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit} className="space-y-4 flex flex-col">
					<div className="flex items-center">
						<input
							type="checkbox"
							id="select-all"
							checked={selectAll}
							onChange={handleSelectAll}
							className="form-checkbox h-4 w-4 text-blue-600 mr-2"
						/>
						<label htmlFor="select-all" className="font-medium">Select All</label>
					</div>
					<div className="max-h-60 overflow-y-auto space-y-2">
						{students.map(student => (
							<label
								key={student._id}
								className="flex items-center space-x-2"
							>
								<input
									type="checkbox"
									checked={selection.includes(student._id)}
									onChange={() => toggleStudent(student._id)}
									className="form-checkbox h-4 w-4 text-blue-600"
								/>
								<span>{student.name}</span>
							</label>
						))}
					</div>
					<Button type="submit" className="self-center">Save Attendance</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
}
