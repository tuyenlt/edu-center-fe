// src/pages/AssignmentDetail.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserContext } from "@/providers/authContext";
import api from "@/services/api";

import AssignmentInfo from "./components/AssignmentInfo";
import TeacherSubmissions from "./components/TeacherSubmissions";
import StudentSubmissionDetails from "./components/StudentSubmissionDetails";
import StudentSubmissionForm from "./components/StudentSubmissionForm";
import { toast } from "sonner";

export default function AssignmentDetail() {
  const { id } = useParams();
  const { user } = useUserContext();
  const isTeacher = user.role === "teacher";
  const isStudent = user.role === "student";

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);

  // student form state
  const [submissionForm, setSubmissionForm] = useState({
    text: "",
    links: [],
  });

  // teacher grading state
  const [grading, setGrading] = useState({});

  useEffect(() => {
    async function fetch() {
      try {
        const res = await api.get(`/assignments/${id}`);
        setAssignment(res.data);

        if (isStudent) {
          const mine = res.data.submissions.find(
            (s) => s.student._id === user._id
          );
          if (mine) {
            setSubmissionForm({
              text: mine.text || "",
              links: mine.links.length ? mine.links : [""],
            });
          }
        }

        if (isTeacher) {
          const init = {};
          res.data.submissions.forEach((s) => {
            init[s._id] = {
              score: s.score ?? "",
              feedback: s.feedback ?? "",
            };
          });
          setGrading(init);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [id, isStudent, isTeacher, user._id]);

  // handlers
  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(`/assignments/${id}/submit`, {
        ...submissionForm,
        student: user._id,
        assignment: id,
      });
      const res = await api.get(`/assignments/${id}`);
      setAssignment(res.data);
      toast.success("Assignment submitted successfully!");
    } catch (error) {
      console.error("Error submitting assignment:", error);
      toast.error("Failed to submit assignment. Please try again.");
    }
  };

  const handleGradeChange = (subId, newGrade) => {
    setGrading((g) => ({ ...g, [subId]: newGrade }));
  };

  const handleSaveGrade = async (subId) => {
    try {
      const { score, feedback } = grading[subId];
      await api.patch(
        `/assignments/grade/${subId}`,
        { score, feedback }
      );
      const res = await api.get(`/assignments/${id}`);
      setAssignment(res.data);
      toast.success("Grade saved successfully!");
    } catch (error) {
      console.error("Error saving grade:", error);
      toast.error("Failed to save grade. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!assignment) return <div>Not found</div>;

  const mySubmission = isStudent
    ? assignment.submissions.find((s) => s.student._id === user._id)
    : null;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <AssignmentInfo assignment={assignment} />

      {isTeacher && (
        <TeacherSubmissions
          submissions={assignment.submissions}
          maxScore={assignment.max_score}
          grading={grading}
          onGradeChange={handleGradeChange}
          onSaveGrade={handleSaveGrade}
        />
      )}

      {isStudent && (
        mySubmission ? (
          <StudentSubmissionDetails submission={mySubmission} />
        ) : (
          <StudentSubmissionForm
            form={submissionForm}
            onFormChange={setSubmissionForm}
            onSubmit={handleStudentSubmit}
          />
        )
      )}
    </div>
  );
}
