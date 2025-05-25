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
            .then(response => setTeachers(response.data))
            .catch(error => console.error('Error fetching teachers:', error));
    }, []);

    const filtered = teachers.filter(t => {
        const term = searchTerm.toLowerCase();
        return (
            t.name.toLowerCase().includes(term) ||
            t.email.toLowerCase().includes(term)
        );
    });

    const handleUpdateTeacher = updatedTeacher => {
        setTeachers(prev =>
            prev.map(t => (t._id === updatedTeacher._id ? updatedTeacher : t))
        );
    };

    const handleAddTeacher = async newTeacher => {
        try {
            const response = await api.post("/users?nologin=true", newTeacher);
            const addedTeacher = response.data;
            setTeachers(prev => [...prev, addedTeacher]);
            setAddTeacherOpen(false);
            toast.success('Teacher added successfully');
        } catch (error) {
            console.error('Error adding teacher:', error);
            toast.error('Failed to add teacher');
        }
    }

    const totalPages = Math.ceil(filtered.length / pageSize) || 1;
    const startIdx = (page - 1) * pageSize;
    const currentPageItems = filtered.slice(startIdx, startIdx + pageSize);


    useEffect(() => {
        setPage(1);
    }, [searchTerm]);

    return (
        <div className="max-w-screen-xl mx-auto p-6 space-y-6">

            {/* Search bar */}
            <Card className="bg-white shadow-none rounded-lg">
                <CardContent className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800">
                        Teacher Management
                    </h1>

                    {/* Search */}
                    <Input
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                        leadingIcon="Search" // nếu dùng shadcn có hỗ trợ icon prop
                    />

                    {/* Add Teacher Button */}
                    {user.role === 'manager' && (
                        <Button variant="secondary" icon={<Plus className="w-5 h-5" />} onClick={() => setAddTeacherOpen(true)}>
                            Add Teacher
                        </Button>
                    )}
                </CardContent>
            </Card>
            {/* Add Teacher Modal */}
            <TeacherForm
                open={addTeacherOpen}
                onCancel={() => setAddTeacherOpen(false)}
                mode="add"
                onSave={handleAddTeacher}
            />

            {/* List */}
            <div className="space-y-2">
                {currentPageItems.length > 0 ? (
                    currentPageItems.map(teacher => (
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

            {/* Pagination controls */}
            <div className="flex items-center justify-center space-x-4">
                <Button
                    size="sm"
                    disabled={page <= 1}
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                >
                    Previous
                </Button>
                <span>
                    Page {page} of {totalPages}
                </span>
                <Button
                    size="sm"
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
