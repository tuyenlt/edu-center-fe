import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

// register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function AssignmentStatsCard({ data, className }) {
    data = [
        { name: 'Submitted', value: 10 },
        { name: 'Graded', value: 7 },
        { name: 'Failed', value: 3 }
    ]
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
