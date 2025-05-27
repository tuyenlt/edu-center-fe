import AvatarUser from "@/components/shared/AvatarUser";

export default function StudentStatsTable({ students, assignments }) {

    if (!assignments || assignments.length === 0) {
        return <div className="p-6">No assignments available.</div>;

    }

    console.log("assignments", assignments);

    if (!students || students?.length === 0) {
        return <div className="p-6">No students available.</div>;
    }

    const rows = students.map((stu) => {
        const assignedCount = assignments.filter((a) =>
            a.students.some((s) => s._id === stu._id)
        ).length;

        const submissions = assignments.flatMap((a) =>
            a.submissions.filter((s) => s.student === stu._id)
        );
        const submittedCount = submissions.length;

        const scores = submissions
            .map((s) => s.score)
            .filter((sc) => typeof sc === "number");
        const avg =
            scores.length > 0
                ? (scores.reduce((sum, sc) => sum + sc, 0) / scores.length).toFixed(1)
                : "-";

        return {
            id: stu._id,
            student: stu,
            assigned: assignedCount,
            submitted: submittedCount,
            avgScore: avg,
        };
    });

    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Student Performance</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Student</th>
                            <th className="px-4 py-2 border"># Assigned</th>
                            <th className="px-4 py-2 border"># Submitted</th>
                            <th className="px-4 py-2 border">Avg. Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.id} className="text-center">
                                <td className="px-4 py-2 border font-medium flex items-center">
                                    <AvatarUser user={r.student} className="inline-block mr-2 w-8 h-8" />
                                    <div>{r.student.name}</div>
                                </td>
                                <td className="px-4 py-2 border">{r.assigned}</td>
                                <td className="px-4 py-2 border">{r.submitted}</td>
                                <td className="px-4 py-2 border">{r.avgScore}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
