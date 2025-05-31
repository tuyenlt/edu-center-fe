import { useEffect, useState } from 'react';
import api from '@/services/api';
import AssignmentStatsTable from './AssignmentStatsTable';
import StudentStatsTable from './StudentStatsTable';
import { useParams } from 'react-router-dom';
import StudentAssignmentMatrix from './StudentAssignmentMatrix';

export default function Grade() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const { classId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const [aRes, sRes] = await Promise.all([
          api.get(`/assignments/class/${classId}`),
          api.get(`/classes/${classId}`, {
            params: {
              populate_fields: ['students'],
            },
          }),
        ]);
        setAssignments(aRes.data);
        setStudents(sRes.data.students || []);
      } catch (err) {
        console.error('Failed to load stats:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <div className="p-6">Loading statistics…</div>;

  return (
    <div className="container mx-auto p-6 flex flex-col gap-2">
      {/* <h1 className="text-2xl font-bold mb-6">
        Assignments & Student Scores Overview
      </h1> */}
      <AssignmentStatsTable assignments={assignments} />
      <StudentStatsTable students={students} assignments={assignments} />
      <StudentAssignmentMatrix students={students} assignments={assignments} />
    </div>
  );
}
