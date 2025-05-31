import React, { useEffect, useState } from 'react';
import api from '@/services/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import TeacherInfoRow from './TeacherInfoRow';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useUserContext } from '@/providers/authContext';
import TeacherForm from './TeacherForm';
import { toast } from 'sonner';

export default function TeacherManage() {
  const [teachers, setTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const { user } = useUserContext();
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);

  useEffect(() => {
    api
      .get('/teachers/list')
      .then((response) => setTeachers(response.data))
      .catch((error) => console.error('Error fetching teachers:', error));
  }, []);

  const filtered = teachers.filter((t) => {
    const term = searchTerm.toLowerCase();
    return (
      t.name.toLowerCase().includes(term) ||
      t.email.toLowerCase().includes(term)
    );
  });

  const handleUpdateTeacher = (updatedTeacher) => {
    setTeachers((prev) =>
      prev.map((t) => (t._id === updatedTeacher._id ? updatedTeacher : t))
    );
  };

  const handleAddTeacher = async (newTeacher) => {
    try {
      const response = await api.post('/users?nologin=true', newTeacher);
      const addedTeacher = response.data;
      setTeachers((prev) => [...prev, addedTeacher]);
      setAddTeacherOpen(false);
      toast.success('Teacher added successfully');
    } catch (error) {
      console.error('Error adding teacher:', error);
      toast.error('Failed to add teacher');
    }
  };

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const startIdx = (page - 1) * pageSize;
  const currentPageItems = filtered.slice(startIdx, startIdx + pageSize);

  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">
      {/* Header Card */}
      <div className="bg-white  rounded-2xl">
        <div className="flex items-center justify-between gap-6 py-6 ">
          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-800">
            Teacher Management
          </h1>

          {/* Search and Button */}
          <div className="flex flex-col sm:flex-row items-stretch gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3">
              {' '}
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sm:w-[300px]"
              />
              {user.role === 'manager' && (
                <Button
                  variant="default"
                  className="flex items-center gap-2 whitespace-nowrap"
                  onClick={() => setAddTeacherOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Teacher</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Teacher Modal */}
      <TeacherForm
        open={addTeacherOpen}
        onCancel={() => setAddTeacherOpen(false)}
        mode="add"
        onSave={handleAddTeacher}
      />

      {/* Teacher List */}
      <div className="space-y-4">
        {currentPageItems.length > 0 ? (
          currentPageItems.map((teacher) => (
            <TeacherInfoRow
              key={teacher.id}
              teacher={teacher}
              onUpdate={handleUpdateTeacher}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No teachers found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-6 pt-4">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <span className="text-sm text-gray-600">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
