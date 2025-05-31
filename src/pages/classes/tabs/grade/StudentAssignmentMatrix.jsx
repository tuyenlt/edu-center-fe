import AvatarUser from '@/components/shared/AvatarUser';

export default function StudentAssignmentMatrix({ students, assignments }) {
  if (!students?.length || !assignments?.length) {
    return (
      <div className="p-6 text-gray-500 text-center">No data available.</div>
    );
  }

  const assignmentHeaders = assignments.map((a) => ({
    id: a._id,
    title: a.title,
  }));

  const rows = students.map((stu) => {
    const scores = assignmentHeaders.map(({ id }) => {
      const sub = assignments
        .find((a) => a._id === id)
        ?.submissions.find(
          (s) => String(s.student._id ?? s.student) === String(stu._id)
        );
      return typeof sub?.score === 'number' ? sub.score : '-';
    });

    const numeric = scores.filter((s) => typeof s === 'number');
    const avg =
      numeric.length > 0
        ? (numeric.reduce((sum, s) => sum + s, 0) / numeric.length).toFixed(1)
        : '-';

    return {
      student: stu,
      scores,
      avg,
    };
  });

  return (
    <section className="py-6 bg-white rounded-xl ">
      <h2 className="text-xl font-semibold text-blue-900 mb-6">
        Student Scores
      </h2>
      <div className="overflow-x-auto  rounded-xl shadow-sm">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-blue-100 text-blue-900">
            <tr>
              <th className="px-4 py-3 text-left font-semibold border border-blue-200">
                Student
              </th>
              {assignmentHeaders.map((h) => (
                <th
                  key={h.id}
                  className="px-4 py-3 text-center font-semibold border border-blue-200"
                >
                  {h.title}
                </th>
              ))}
              <th className="px-4 py-3 text-center font-semibold border border-blue-200">
                Avg
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                <td className="px-4 py-3 border border-blue-100 flex items-center gap-2">
                  <AvatarUser
                    user={r.student}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-gray-800 font-medium">
                    {r.student.name}
                  </span>
                </td>
                {r.scores.map((sc, j) => (
                  <td
                    key={j}
                    className="px-4 py-3 text-center border border-blue-100 text-gray-700"
                  >
                    {sc}
                  </td>
                ))}
                <td className="px-4 py-3 text-center border border-blue-100 font-bold text-blue-700">
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
