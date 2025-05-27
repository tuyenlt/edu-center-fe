import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import AssignmentItem from "./AssignmentItem";
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
} from "lucide-react";

import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useUserContext } from "@/providers/authContext";
import { fakeAssignmentsData } from "../data";
import NewAssignmentForm from "./NewAssignmentForm";
import api from "@/services/api";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Assignment({ classData }) {
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isNewAssignmentOpen, setIsNewAssignmentOpen] = useState(false);
  const { user } = useUserContext();
  const isStudent = user?.role === "student";
  const isTeacher = user?.role === "teacher";
  const [assignments, setAssignments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [studentStatus, setStudentStatus] = useState({
    upcoming: 0,
    grading: 0,
    notSubmitted: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    api.get(`/assignments/class/${classData._id}`)
      .then((response) => {
        setAssignments(response.data);
      }).catch((error) => {
        console.error("Error fetching assignments:", error);
      }).finally(() => {
        setIsLoading(false);
      })
  }, [classData]);

  useEffect(() => {
    if (isStudent) {
      const upcoming = assignments.filter(a => new Date(a.due_date) > new Date()).length;
      const grading = assignments.filter(a => a.submissions.some(s => (s.student === user._id && !s.score))).length;
      const notSubmitted = assignments.filter(a => !a.submissions.some(s => s.student === user._id)).length;
      setStudentStatus({
        upcoming,
        grading,
        notSubmitted,
      });
    }
  }, [assignments, isStudent, user]);



  const handleAddNewAssignment = () => {
    setIsNewAssignmentOpen(true);
  }


  return (
    <TabsContent value="assignments" className="w-4/5 max-w-screen-2xl mx-auto mt-5 py-20">
      <div className={cn("md:grid-cols-4 gap-4 mt-4 items-start", isStudent && "grid")}>
        {isStudent && (
          <div className="rounded-xl shadow-sm bg-white p-4 w-full max-w-xs border border-gray-200">
            <h2 className="text-base font-semibold text-gray-800 mb-3">Status</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2 border-b pb-1 relative px-4 justify-between">
                <span className="h-2 w-2 rounded-full bg-red-500 absolute left-0"></span>
                <span>Upcoming Deadline</span>
                <span>{studentStatus.upcoming}</span>
              </li>
              <li className="flex items-center gap-2 border-b pb-1 relative px-4 justify-between">
                <span className="h-2 w-2 rounded-full bg-orange-400 absolute left-0"></span>
                <span>Grading</span>
                <span>{studentStatus.grading}</span>
              </li>
              <li className="flex items-center gap-2 relative px-4 justify-between">
                <span className="h-2 w-2 rounded-full bg-gray-400 absolute left-0"></span>
                <span>Not Submitted</span>
                <span>{studentStatus.notSubmitted}</span>
              </li>
            </ul>
          </div>
        )}

        {isTeacher && (
          <button
            className="mb-5 ml-auto flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2 text-white font-medium shadow-md hover:bg-blue-700 transition-colors"
            onClick={handleAddNewAssignment}
          >
            <Plus className="w-4 h-4" />
            <span>New</span>
          </button>
        )}

        {isLoading ?
          (
            <div className="w-full flex items-center">
              <LoadingSpinner />
            </div>
          ) : assignments.length === 0 ? (
            <div className="text-center">No Assignment Available</div>
          ) : (
            <div className="md:col-span-3 space-y-5">
              {assignments.map((assignment, idx) => (
                isStudent ? (
                  <Link to={`/assignments/${assignment._id}`} key={idx}>
                    <AssignmentItem
                      assignment={assignment}
                      isTeacher={isTeacher}
                      setIsEditMenuOpen={setIsEditMenuOpen}
                    />
                  </Link>
                ) : (
                  <AssignmentItem
                    key={idx}
                    assignment={assignment}
                    isTeacher={isTeacher}
                    setIsEditMenuOpen={setIsEditMenuOpen}
                  />
                )
              ))}
            </div>
          )}
      </div>
      <NewAssignmentForm
        students={classData.students}
        isOpen={isNewAssignmentOpen}
        onClose={() => setIsNewAssignmentOpen(false)}
      />
    </TabsContent>
  );
}
