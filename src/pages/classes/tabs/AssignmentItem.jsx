import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  EllipsisVertical,
  Pencil,
  ClipboardCheck,
  Link as LinkIcon,
  File as FileIcon,
  ArrowRight,
} from 'lucide-react';
import { dateTimeConvert_2 } from '@/utils/dateTimeConvert';
import LinkPreview from '@/components/shared/LinkPreview';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '@/providers/authContext';
import api from '@/services/api';
import { toast } from 'sonner';

export default function AssignmentItem({
  assignment,
  setIsEditMenuOpen,
  onDelete,
}) {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const studentStatusRender = () => {
    if (user.role !== 'student') {
      return null;
    }

    const submission = assignment.submissions.find(
      (sub) => sub.student === user._id
    );
    if (!submission) {
      return <div className="text-sm text-red-500">not submitted</div>;
    }

    if (!submission.score) {
      return <div className="text-sm text-yellow-500">not graded yet</div>;
    }

    return (
      <div className="text-sm text-green-500">
        Your score: {submission.score} / {assignment.max_score}
      </div>
    );
  };

  const handleDeleteAssignment = () => {
    api
      .delete(`/assignments/${assignment._id}`)
      .then(() => {
        onDelete();
        toast.success('Assignment deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting assignment:', error);
        toast.error('Failed to delete assignment');
      });
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      key={assignment.title}
    >
      <AccordionItem value={assignment.title}>
        <Card className="hover:cursor-pointer w-full py-0 gap-0" asChild>
          <AccordionTrigger className="relative [&>svg]:hidden">
            <CardHeader className="w-full">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{assignment.title}</CardTitle>
                  <CardDescription className="mt-2 no-underline">
                    {new Date() - new Date(assignment.due_date) < 0
                      ? `Due Date ${dateTimeConvert_2(assignment.due_date)}`
                      : 'Overdue'}
                  </CardDescription>
                </div>
                {studentStatusRender()}
                {user.role === 'teacher' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuItem onClick={() => setIsEditMenuOpen(true)}>
                        <Pencil className="mr-2 h-5 w-5" />
                        <span>Edit</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleDeleteAssignment}>
                        <ClipboardCheck className="mr-2 h-5 w-5" />
                        <span>Delete Assignment</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </CardHeader>
          </AccordionTrigger>
          <AccordionContent className="border-t pb-0">
            <CardContent className="w-full mx-auto border shadow-sm p-4 bg-white dark:bg-gray-900 space-y-4 rounded-b-lg">
              <div className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  {`Created ` + dateTimeConvert_2(assignment.createdAt)}
                </div>
                <ArrowRight
                  className="ml-2"
                  onClick={() => navigate(`/assignments/${assignment._id}`)}
                ></ArrowRight>
              </div>

              <div className="flex items-start justify-between">
                <h2 className="text-md ml-2">{assignment.description}</h2>
                {user.role === 'teacher' && (
                  <div className="flex items-center gap-8 text-sm pt-2">
                    <div>
                      <span className="text-xl font-semibold">
                        {assignment.submissions.length}
                      </span>
                      <br />
                      Submitted
                    </div>
                    <div>
                      <span className="text-xl font-semibold">
                        {assignment.students.length}
                      </span>
                      <br />
                      Assigned
                    </div>
                  </div>
                )}
              </div>

              {/* File & link preview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {assignment.links.map((link, idx) => (
                  <LinkPreview url={link} key={idx} className="w-full" />
                ))}
              </div>
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
