import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '@/providers/authContext';
import api from '@/services/api';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import AvatarUser from '@/components/shared/AvatarUser';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, UserRound } from 'lucide-react';
import MagicInput from '@/components/shared/MagicInput';

export default function StudentManage() {
  const { user } = useUserContext();
  const [allStudents, setAllStudents] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const pageSize = 10; // Số học sinh mỗi trang

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/students`);
        setAllStudents(response.data);
        setTotalPages(Math.ceil(response.data.length / pageSize));
        setCurrentPage(1);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const filteredStudents = allStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTotalPages(Math.ceil(filteredStudents.length / pageSize));
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setStudents(filteredStudents.slice(startIndex, endIndex));
  }, [allStudents, searchTerm, currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6 max-w-screen-2xl mx-auto mt-10">
      <div className="bg-white  rounded-xl ">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
          {/* Title */}
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-gray-800 min-w-[500px]">
              Student Management
            </h1>
          </div>

          {/* Search */}

          <MagicInput
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-3">
        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <Skeleton key={index} className="h-12 w-full rounded-md" />
            ))}
          </div>
        ) : students.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No students found.
          </div>
        ) : (
          <div>
            <div className="space-y-3 mt-4">
              {students.map((student) => (
                <Link to={`/users/${student._id}`} key={student._id}>
                  <div className="flex items-center justify-between px-5 py-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition mb-3">
                    <div className="flex items-center gap-4">
                      <AvatarUser user={student} />
                      <div>
                        <p className="text-base font-medium text-gray-900">
                          {student.name}
                        </p>
                        <p className="text-sm text-gray-500">{student.email}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                Page <strong>{currentPage}</strong> of{' '}
                <strong>{totalPages}</strong>
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={handleNextPage}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
