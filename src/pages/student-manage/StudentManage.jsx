import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/providers/authContext";
import api from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import AvatarUser from "@/components/shared/AvatarUser";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function StudentManage() {
    const { user } = useUserContext();
    const [allStudents, setAllStudents] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
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
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    useEffect(() => {
        const filteredStudents = allStudents.filter(student =>
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
            <Card className="bg-white shadow-none rounded-lg">
                <CardContent className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-800">
                        Student Management
                    </h1>

                    {/* Search */}
                    <Input
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="max-w-sm"
                        leadingIcon="Search"
                    />

                    {/* {user.role === 'manager' && (
                        <Button variant="secondary" icon={<Plus className="w-5 h-5" />} onClick={() => setAddTeacherOpen(true)}>
                            Add Teacher
                        </Button>
                    )} */}
                </CardContent>
            </Card>
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
                        <div className="space-y-4">
                            {students.map((student) => (
                                <div
                                    key={student._id}
                                    className="flex items-center justify-between p-4 border rounded-lg"
                                >
                                    <div className="">
                                        <div className="flex items-center space-x-4">
                                            <AvatarUser user={student} />
                                            <div>
                                                <p className="font-medium">{student.name}</p>
                                                <p className="text-gray-500">{student.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="default"
                                        onClick={() => navigate("/users/" + student._id)}
                                    >
                                        View Profile
                                    </Button>
                                </div>
                            ))}
                        </div>
                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-4">
                            <Button
                                variant="outline"
                                disabled={currentPage === 1}
                                onClick={handlePreviousPage}
                            >
                                Previous
                            </Button>
                            <span>
                                Page {currentPage} of {totalPages}
                            </span>
                            <Button
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
