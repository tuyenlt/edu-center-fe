import AvatarUser from "@/components/shared/AvatarUser";


export default function StudentAssignmentMatrix({ students, assignments }) {
    if (!students?.length || !assignments?.length) {
        return <div className="p-6">No data available.</div>;
    }

    // Extract assignment titles and ids for headers
    const assignmentHeaders = assignments.map((a) => ({
        id: a._id,
        title: a.title,
    }));

    // Build table rows: one per student
    const rows = students.map((stu) => {
        // For each assignment, find that student's submission and its score
        const scores = assignmentHeaders.map(({ id }) => {
            const sub = assignments
                .find((a) => a._id === id)
                ?.submissions.find(
                    (s) => String(s.student._id ?? s.student) === String(stu._id)
                );
            return typeof sub?.score === "number" ? sub.score : "-";
        });

        // Compute average of numeric scores
        const numeric = scores.filter((s) => typeof s === "number");
        const avg =
            numeric.length > 0
                ? (numeric.reduce((sum, s) => sum + s, 0) / numeric.length).toFixed(1)
                : "-";

        return {
            student: stu,
            scores,
            avg,
        };
    });

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Students Score</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Students</th>
                            {assignmentHeaders.map((h) => (
                                <th key={h.id} className="px-4 py-2 border">
                                    {h.title}
                                </th>
                            ))}
                            <th className="px-4 py-2 border">Average</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, i) => (
                            <tr key={i} className="odd:bg-white even:bg-gray-50">
                                <td className="px-4 py-2 border font-medium flex items-center">
                                    <AvatarUser user={r.student} className="inline-block mr-2 w-8 h-8" />
                                    <div>{r.student.name}</div>
                                </td>
                                {r.scores.map((sc, j) => (
                                    <td key={j} className="px-4 py-2 border text-center">
                                        {sc}
                                    </td>
                                ))}
                                <td className="px-4 py-2 border text-center font-semibold">
                                    {r.avg}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
