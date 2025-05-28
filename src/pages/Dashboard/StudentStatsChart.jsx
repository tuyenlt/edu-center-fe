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
  { name: 'cl.A', avgGrade: 32, avgAttendance: 40 },
  { name: 'cl.B', avgGrade: 24, avgAttendance: 25 },
  { name: 'cl.C', avgGrade: 45, avgAttendance: 30 },
  { name: 'cl.D', avgGrade: 22, avgAttendance: 18 },
  { name: 'cl.E', avgGrade: 58, avgAttendance: 35 },
];

const chartConfig = {
  avgGrade: {
    label: 'Average Grade',
    color: '#2563eb',
  },
  avgAttendance: {
    label: 'Average Attendance',
    color: '#018183 ',
  },
};

export default function StudentStatsChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Student Statistic</h2>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>&lt;</span>
          <span>Sept 2022</span>
          <span>&gt;</span>
        </div>
      </div>

      <div className="h-[250px] w-full">
        <ChartContainer config={chartConfig}>
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickFormatter={(value) => value.slice(0, 4)}
            />
            <YAxis domain={[0, 90]} tickFormatter={(v) => `${v}%`} />
            <Tooltip />
            <Bar
              dataKey="avgGrade"
              fill={chartConfig.avgGrade.color}
              radius={[4, 4, 0, 0]}
              barSize={35}
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
