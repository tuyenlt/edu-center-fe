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

export default function CurrentSessionAttendanceForm({
  session,
  students,
  onSave,
}) {
  const { classId } = useParams();
  const [selection, setSelection] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const toggleStudent = (id) => {
    setSelection((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelection([]);
    } else {
      setSelection(students.map((s) => s._id));
    }
    setSelectAll(!selectAll);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(
        `/class-sessions/${session._id}/add-attendance`,
        {
          userIds: selection,
        }
      );
      onSave(response.data);
      setOpen(false);
      toast.success('✅ Attendance saved successfully');
    } catch (error) {
      console.error('Error saving attendance:', error);
      toast.error('❌ Failed to save attendance');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Take Attendance
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Attendance – {format(new Date(session.start_time), 'dd/MM/yyyy')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="select-all"
              checked={selectAll}
              onChange={handleSelectAll}
              className="accent-blue-600 h-4 w-4"
            />
            <label
              htmlFor="select-all"
              className="text-sm font-medium text-gray-700"
            >
              Select all students
            </label>
          </div>

          <div className="max-h-64 overflow-y-auto rounded-lg border bg-gray-50 px-4 py-3 space-y-2">
            {students.map((student) => (
              <label
                key={student._id}
                className="flex items-center gap-3 text-sm font-medium text-gray-800"
              >
                <input
                  type="checkbox"
                  checked={selection.includes(student._id)}
                  onChange={() => toggleStudent(student._id)}
                  className="accent-blue-600 h-4 w-4"
                />
                <span>{student.name}</span>
              </label>
            ))}
          </div>

          <div className="text-right text-sm text-muted-foreground">
            {selection.length} student(s) selected
          </div>

          <div className="text-center">
            <Button
              type="submit"
              className="px-6 py-2 text-sm font-semibold rounded-full"
            >
              Save Attendance
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
