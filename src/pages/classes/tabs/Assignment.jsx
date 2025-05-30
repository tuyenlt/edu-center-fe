import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

import AssignmentItem from './AssignmentItem';
import {
  EllipsisVertical,
  Pencil,
  ClipboardCheck,
  LinkIcon,
  Youtube,
  FileIcon,
  Plus,
  ClipboardList,
  HelpCircle,
  BookMarked,
  Repeat,
  FolderOpen,
} from 'lucide-react';

import { TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useUserContext } from '@/providers/authContext';
import NewAssignmentForm from './NewAssignmentForm';
import api from '@/services/api';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
export default function Assignment() {
  const { classId } = useParams();
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isNewAssignmentOpen, setIsNewAssignmentOpen] = useState(false);
  const { user } = useUserContext();
  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [studentStatus, setStudentStatus] = useState({
    upcoming: 0,
    grading: 0,
    notSubmitted: 0,
  });

  const fetchAssignments = async () => {
    setIsLoading(true);
    api
      .get(`/assignments/class/${classId}`)
      .then((response) => {
        setAssignments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching assignments:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  useEffect(() => {
    if (isStudent) {
      const upcoming = assignments.filter(
        (a) => new Date(a.due_date) > new Date()
      ).length;
      const grading = assignments.filter((a) =>
        a.submissions.some((s) => s.student === user._id && !s.score)
      ).length;
      const notSubmitted = assignments.filter(
        (a) => !a.submissions.some((s) => s.student === user._id)
      ).length;
      setStudentStatus({
        upcoming,
        grading,
        notSubmitted,
      });
    }
  }, [assignments, isStudent, user]);

  const handleAddNewAssignment = () => {
    setIsNewAssignmentOpen(true);
  };

  return (
    <div className="space-y-6 mt-6">
      {/* Teacher button */}
      {isTeacher && (
        <div className="flex justify-end">
          <button
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white font-medium shadow hover:bg-blue-700 transition-colors"
            onClick={handleAddNewAssignment}
          >
            <Plus className="w-4 h-4" />
            <span>New Assignment</span>
          </button>
        </div>
      )}

      <div
        className={cn(
          'grid md:grid-cols-4 gap-6 items-start',
          isStudent && 'grid-cols-1 md:grid-cols-4'
        )}
      >
        {isStudent && (
          <div className="rounded-2xl shadow-sm bg-white p-4 border border-gray-200 md:col-span-1">
            <h2 className="text-base font-semibold text-gray-800 mb-4">
              Status
            </h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-center justify-between gap-2 relative pl-4 pr-2 pb-1 border-b">
                <span className="h-2 w-2 rounded-full bg-red-500 absolute left-0 top-2" />
                <span>Upcoming Deadline</span>
                <span>{studentStatus.upcoming}</span>
              </li>
              <li className="flex items-center justify-between gap-2 relative pl-4 pr-2 pb-1 border-b">
                <span className="h-2 w-2 rounded-full bg-orange-400 absolute left-0 top-2" />
                <span>Grading</span>
                <span>{studentStatus.grading}</span>
              </li>
              <li className="flex items-center justify-between gap-2 relative pl-4 pr-2">
                <span className="h-2 w-2 rounded-full bg-gray-400 absolute left-0 top-2" />
                <span>Not Submitted</span>
                <span>{studentStatus.notSubmitted}</span>
              </li>
            </ul>
          </div>
        )}

        <div
          className={cn(
            'flex flex-col gap-5',
            isStudent ? 'md:col-span-3' : 'md:col-span-4'
          )}
        >
          {isLoading ? (
            <div className="w-full flex justify-center">
              <LoadingSpinner />
            </div>
          ) : assignments.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No Assignment Available
            </div>
          ) : (
            assignments.map((assignment, idx) => (
              <AssignmentItem
                key={idx}
                assignment={assignment}
                setIsEditMenuOpen={setIsEditMenuOpen}
                onDelete={isTeacher ? () => fetchAssignments() : undefined}
              />
            ))
          )}
        </div>
      </div>

      <NewAssignmentForm
        isOpen={isNewAssignmentOpen}
        onClose={() => setIsNewAssignmentOpen(false)}
        onCreated={fetchAssignments}
      />
    </div>
  );
}
