export default function AssignmentStatsTable({ assignments }) {
    // compute for each assignment
    const rows = assignments.map((a) => {
        const scores = a.submissions
            .map((s) => s.score)
            .filter((sc) => typeof sc === "number");
        const avg =
            scores.length > 0
                ? (scores.reduce((sum, sc) => sum + sc, 0) / scores.length).toFixed(1)
                : "-";
        return {
            id: a._id,
            title: a.title,
            due: new Date(a.due_date).toLocaleDateString(),
            max: a.max_score,
            submitted: a.submissions.length,
            avgScore: avg,
        };
    });

    return (
        <section className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Assignments Statistics</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 border">Title</th>
                            <th className="px-4 py-2 border">Due Date</th>
                            <th className="px-4 py-2 border">Max Score</th>
                            <th className="px-4 py-2 border"># Submitted</th>
                            <th className="px-4 py-2 border">Avg. Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.id} className="text-center">
                                <td className="px-4 py-2 border text-left">{r.title}</td>
                                <td className="px-4 py-2 border">{r.due}</td>
                                <td className="px-4 py-2 border">{r.max}</td>
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
