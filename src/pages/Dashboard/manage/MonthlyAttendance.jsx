import { Card, CardContent } from '@/components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useState } from 'react';
const monthMap = {
  Ja: 'January',
  Fe: 'February',
  Mr: 'March',
  Ap: 'April',
  My: 'May',
  Jn: 'June',
  Jl: 'July',
  Au: 'August',
  Se: 'September',
  Oc: 'October',
  No: 'November',
  De: 'December',
};

const fakeData = {
  2022: [
    { name: 'Jan', attendance: 20 },
    { name: 'Feb', attendance: 15 },
    { name: 'Mar', attendance: 25 },
    { name: 'Apr', attendance: 18 },
    { name: 'May', attendance: 5 },
    { name: 'Jun', attendance: 10 },
    { name: 'Jul', attendance: 12 },
    { name: 'Aug', attendance: 8 },
    { name: 'Sep', attendance: 16 },
    { name: 'Oct', attendance: 14 },
    { name: 'Nov', attendance: 11 },
    { name: 'Dec', attendance: 13 },
  ],
  2023: [
    { name: 'Jan', attendance: 18 },
    { name: 'Feb', attendance: 17 },
    { name: 'Mar', attendance: 23 },
    { name: 'Apr', attendance: 20 },
    { name: 'May', attendance: 10 },
    { name: 'Jun', attendance: 15 },
    { name: 'Jul', attendance: 14 },
    { name: 'Aug', attendance: 13 },
    { name: 'Sep', attendance: 19 },
    { name: 'Oct', attendance: 21 },
    { name: 'Nov', attendance: 12 },
    { name: 'Dec', attendance: 17 },
  ],
  2024: [
    { name: 'Jan', attendance: 22 },
    { name: 'Feb', attendance: 13 },
    { name: 'Mar', attendance: 19 },
    { name: 'Apr', attendance: 25 },
    { name: 'May', attendance: 6 },
    { name: 'Jun', attendance: 9 },
    { name: 'Jul', attendance: 15 },
    { name: 'Aug', attendance: 11 },
    { name: 'Sep', attendance: 18 },
    { name: 'Oct', attendance: 20 },
    { name: 'Nov', attendance: 7 },
    { name: 'Dec', attendance: 10 },
  ],
  2025: [
    { name: 'Jan', attendance: 40 },
    { name: 'Feb', attendance: 41 },
    { name: 'Mar', attendance: 43 },
    { name: 'Apr', attendance: 45 },
    { name: 'May', attendance: 49 },
    { name: 'Jun', attendance: 45 },
  ],
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg shadow text-sm text-gray-800 ">
        <p className="font-semibold text-blue-800">{monthMap[label]}</p>
        <p className="text-blue-800 font-semibold">
          Attendance: {payload[0].value}
        </p>
      </div>
    );
  }

  return null;
};

const years = Object.keys(fakeData);

export default function MonthlyAttendanceChart() {
  const [currentYearIndex, setCurrentYearIndex] = useState(years.length - 1);
  const currentYear = years[currentYearIndex];
  const chartData = fakeData[currentYear];

  const handlePrev = () => {
    setCurrentYearIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentYearIndex((prev) => Math.min(years.length - 1, prev + 1));
  };

  return (
    <Card className="p-4 col-span-2">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Enrollment Overview</h2>
          <p className="text-zinc-700 text-sm ">
            Tracking the number of students enroll each months
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <button onClick={handlePrev} disabled={currentYearIndex === 0}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>{currentYear}</span>
          <button
            onClick={handleNext}
            disabled={currentYearIndex === years.length - 1}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <CardContent className="h-[252px] px-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0052B4" stopOpacity={0.9} />
                <stop offset="20%" stopColor="#0052B4" stopOpacity={0.7} />
                <stop offset="80%" stopColor="#0052B4" stopOpacity={0.05} />
                <stop offset="100%" stopColor="#0052B4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <YAxis axisLine={false} tickLine={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />

            <Tooltip
              contentStyle={{ fontSize: '0.875rem', borderRadius: '0.5rem' }}
              cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
              content={<CustomTooltip />}
            />
            <Area
              type="monotone"
              dataKey="attendance"
              stroke="#1d4ed8"
              fillOpacity={1}
              fill="url(#colorAttendance)"
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: 'white', stroke: '#0052B4' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
