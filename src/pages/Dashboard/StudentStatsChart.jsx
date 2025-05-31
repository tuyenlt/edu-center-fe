import {
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Line,
  Bar,
  ComposedChart,
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';

const data = [
  { name: 'IA101', avgGrade: 32, avgAttendance: 40 },
  { name: 'GEFT-101', avgGrade: 24, avgAttendance: 25 },
  { name: 'TP-101', avgGrade: 45, avgAttendance: 30 },
  { name: 'IA-102', avgGrade: 22, avgAttendance: 18 },
  { name: 'TP-102', avgGrade: 58, avgAttendance: 35 },
];

const chartConfig = {
  avgGrade: {
    label: 'Average Grade',
    color: '#0052B4',
  },
  avgAttendance: {
    label: 'Average Attendance',
    color: '#018183 ',
  },
};
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow text-sm text-gray-800 ">
        <p className="font-semibold">{label}</p>
        <p className="text-blue-800 font-semibold">
          Average Grade: {payload[0].value}%
        </p>
        <p className="text-green-800 font-semibold">
          Average Attendance: {payload[1].value}%
        </p>
      </div>
    );
  }

  return null;
};

export default function StudentStatsChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 col-span-2 h-[396px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Student Statistic</h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>&lt;</span>
          <span>May 2025</span>
          <span>&gt;</span>
        </div>
      </div>

      <div className="h-full w-full">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 60]} tickFormatter={(v) => `${v}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="avgGrade"
              fill={chartConfig.avgGrade.color}
              radius={[4, 4, 0, 0]}
              barSize={50}
            />
            <Line
              type="monotone"
              dataKey="avgAttendance"
              stroke={chartConfig.avgAttendance.color}
              strokeWidth={2}
              dot={{ r: 5 }}
            />
          </ComposedChart>
        </ChartContainer>
      </div>

      <div className="flex justify-end mt-2 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: chartConfig.avgAttendance.color }}
          />
          Avg attendance
        </span>
      </div>
    </div>
  );
}
