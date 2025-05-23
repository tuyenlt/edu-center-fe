import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "@/providers/authContext";
import api from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StudentManageHeader from "./StudentManageHeader";
import AvatarUser from "@/components/shared/AvatarUser";

export default function StudentManage() {
    const { user } = useUserContext();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await api.get("/students");
                setStudents(response.data);
            } catch (error) {
                console.error("Error fetching students:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    return (
        <div className="p-6 max-w-screen-2xl mx-auto mt-10">
            <StudentManageHeader />
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
                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-20">Avatar</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student._id}>
                                    <TableCell>
                                        <AvatarUser user={student} />
                                    </TableCell>
                                    <TableCell className="font-medium">{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            size="sm"
                                            variant="default"
                                            onClick={() => navigate("/users/" + student._id)}
                                        >
                                            View Profile
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
