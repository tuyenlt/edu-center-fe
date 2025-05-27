import { Card, CardContent } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import api from "@/services/api";

// register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AssignmentStatsCard({ user, className }) {

    const [data, setData] = useState([]);

    useEffect(() => {
        api.get(`/assignments/user/${user._id}`)
            .then((response) => {
                const assignments = response.data;
                let submitted = assignments.filter(a => a.submissions.find(s => s.student === user._id)).length;
                if (user.role === "teacher") {
                    let submittedCount = 0
                    assignments.forEach(a => {
                        submittedCount += a.submissions.length;
                    })
                    submitted = submittedCount;
                }

                const graded = assignments.filter(a => a.submissions.some(s => s.score !== null)).length;
                const notSubmitted = assignments.filter(a => !a.submissions.find(s => s.student === user._id)).length;


                setData([
                    { name: 'Submitted', value: submitted },
                    { name: 'Graded', value: graded },
                ]);

                if (user.role === "student") {
                    setData(prev => [...prev, { name: 'Not Submitted', value: notSubmitted }]);
                }

            }).catch((error) => {
                console.error("Error fetching assignment stats:", error);
                setData([]);
            })
    }, [user]);

    const labels = data.map((d) => d.name + ` (${d.value})`);
    const values = data.map((d) => d.value);
    const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

    const chartData = {
        labels,
        datasets: [
            {
                data: values,
                backgroundColor: COLORS,
                hoverOffset: 6,
            },
        ],
    };

    const options = {
        plugins: {
            legend: { position: "bottom" },
            tooltip: { enabled: true },
        },
        maintainAspectRatio: false,
    };

    return (
        <Card className={`rounded-2xl shadow-none p-4 ${className}`} >
            <CardContent className="flex flex-col items-center">
                <h3 className="text-lg font-medium mb-2">Assignment Status</h3>
                <div className="w-full h-52">
                    <Pie data={chartData} options={options} />
                </div>
            </CardContent>
        </Card>
    );
}
