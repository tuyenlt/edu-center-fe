const classes = [
  {
    id: 1,
    name: 'Khoas hocj Toán 12A',
    status: 'approved',
  },
  {
    id: 2,
    name: 'Khoas hocj Văn 11B',
    status: 'pending',
  },
  {
    id: 3,
    name: 'Khoas hocj Lý 10C',
    status: 'approved',
  },
  {
    id: 4,
    name: 'Khoas hocj Hóa 9A',
    status: 'pending',
  },
  {
    id: 5,
    name: 'Khoas hocj Tin học 8D',
    status: 'approved',
  },
];

export default function CourseRegistered() {
  if (!classes || classes.length === 0) {
    return <p className="text-sm text-gray-500">No data.</p>;
  }

  const approvedClasses = classes.filter((cls) => cls.status === 'approved');
  const pendingClasses = classes.filter((cls) => cls.status === 'pending');

  const sortedClasses = [...approvedClasses, ...pendingClasses];

  return (
    <div className=" bg-white p-4 rounded-lg shadow-md overflow-scroll h-[396px] ">
      <h2 className="mb-4 font-semibold text-lg">Course Registered</h2>
      <div className="space-y-4">
        {sortedClasses.map((cls) => (
          <div key={cls.id} className={`p-4 rounded-lg border bg-blue-50`}>
            <h3 className="text-base font-semibold text-gray-800">
              {cls.name}
            </h3>
            <p className="text-sm text-gray-600">
              Trạng thái:
              <span
                className={`ml-1 font-medium ${
                  cls.status === 'approved'
                    ? 'text-green-600'
                    : 'text-yellow-600'
                }`}
              >
                {cls.status === 'approved' ? 'Đã duyệt' : 'Đang chờ duyệt'}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
