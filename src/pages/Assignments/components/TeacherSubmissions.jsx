import SubmissionItem from "./SubmissionItem";

export default function TeacherSubmissions({
    submissions,
    maxScore,
    grading,
    onGradeChange,
    onSaveGrade,
}) {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Submissions</h2>
            {submissions.length === 0 ? (
                <p>No submissions yet.</p>
            ) : (
                <div className="space-y-6">
                    {submissions.map((sub) => (
                        <SubmissionItem
                            key={sub._id}
                            submission={sub}
                            maxScore={maxScore}
                            grade={grading[sub._id]}
                            onGradeChange={onGradeChange}
                            onSaveGrade={onSaveGrade}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
