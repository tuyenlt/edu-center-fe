
import api from "@/services/api";
import { useState } from "react";

export default function StudentPayment() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const response = await api.get("/students");
            setStudents(response.data);
        } catch (error) {
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div>
            <h1>Student Payment</h1>
        </div>
    )
}