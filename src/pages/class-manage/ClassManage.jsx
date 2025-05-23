import api from "@/services/api";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import ClassManageRow from "./ClassManageRow";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectItem,
} from "@/components/ui/select";

const statusOptions = ["all", "pending", "scheduling", "ongoing", "finished"];
const PAGE_SIZE = 5;

export default function ClassManage() {
    const [classes, setClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await api.get("/classes");
                setClasses(response.data);
            } catch (error) {
                toast("Something went wrong, please try again.");
                console.error("Error loading classes:", error);
            }
        };
        fetchClasses();
    }, []);

    const filteredClasses = classes.filter((classData) => {
        const matchesSearch = classData.class_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "all" || classData.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const totalPages = Math.ceil(filteredClasses.length / PAGE_SIZE);
    const paginatedClasses = filteredClasses.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    return (
        <div className="flex flex-col gap-6 p-4 max-w-screen-xl m-auto">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 w-full">
                <input
                    type="text"
                    placeholder="Search by class name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded px-4 py-2 w-full shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {statusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status === "all" ? "All statuses" : status}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* --- Class List --- */}
            <div className="flex flex-col gap-4">
                {paginatedClasses.length > 0 ? (
                    paginatedClasses.map((classData) => (
                        <ClassManageRow key={classData._id} data={classData} />
                    ))
                ) : (
                    <div className="text-center text-gray-500">No matching classes found.</div>
                )}
            </div>

            {/* --- Pagination --- */}
            <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
                <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}
