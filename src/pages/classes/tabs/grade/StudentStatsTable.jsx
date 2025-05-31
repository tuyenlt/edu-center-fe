import AvatarUser from '@/components/shared/AvatarUser';

export default function StudentStatsTable({ students, assignments }) {
  if (!assignments?.length) {
    return (
      <div className="p-6 text-gray-500 italic">No assignments available.</div>
    );
  }

  if (!students?.length) {
    return (
      <div className="p-6 text-gray-500 italic">No students available.</div>
    );
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
      .filter((sc) => typeof sc === 'number');

    const avg =
      scores.length > 0
        ? (scores.reduce((sum, sc) => sum + sc, 0) / scores.length).toFixed(1)
        : '-';

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
      <h2 className="text-xl font-semibold mb-4 text-blue-900">
        Student Performance
      </h2>
      <div className="overflow-x-auto rounded-xl shadow-sm">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-blue-50 text-blue-800">
            <tr>
              <th className="px-4 py-3 text-left">Student</th>
              <th className="px-4 py-3">Assigned</th>
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
                <td className="px-4 py-3 flex items-center gap-3 font-medium text-gray-800">
                  <AvatarUser
                    user={r.student}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{r.student.name}</span>
                </td>
                <td className="px-4 py-3 text-center text-gray-700">
                  {r.assigned}
                </td>
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
