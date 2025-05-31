export default function AssignmentStatsTable({ assignments }) {
  const rows = assignments.map((a) => {
    const scores = a.submissions
      .map((s) => s.score)
      .filter((sc) => typeof sc === 'number');

    const avg =
      scores.length > 0
        ? (scores.reduce((sum, sc) => sum + sc, 0) / scores.length).toFixed(1)
        : '-';

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
      <h2 className="text-xl font-semibold mb-4 text-blue-900">
        Assignments Statistics
      </h2>
      <div className="overflow-x-auto rounded-xl shadow-sm">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-blue-50 text-blue-800">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3">Due Date</th>
              <th className="px-4 py-3">Max Score</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Avg. Score</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr
                key={r.id}
                className={`${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } hover:bg-blue-100 transition`}
              >
                <td className="px-4 py-3 font-medium text-gray-800">
                  {r.title}
                </td>
                <td className="px-4 py-3 text-center text-gray-700">{r.due}</td>
                <td className="px-4 py-3 text-center text-gray-700">{r.max}</td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {r.submitted}
                </td>
                <td className="px-4 py-3 text-center font-semibold text-blue-900">
                  {r.avgScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
