import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ClockIcon, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ClassManageRow({ data }) {
    const teacherName = data.teachers?.[0]?.name || 'Unknown Teacher';
    const studentCount = data.students?.length || 0;

    return (
        <div className="flex items-center justify-between w-full px-6 py-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all">
            {/* Class Info Block */}
            <div className="flex items-center gap-4 w-1/3">
                <Avatar className="size-12">
                    <AvatarImage src="/images/teacher.png" alt="avatar" />
                    <AvatarFallback className="bg-[url(/images/avt1.webp)] bg-cover" />
                </Avatar>
                <div>
                    <h3 className="text-base font-semibold text-gray-800">{data.class_name}</h3>
                    <p className="text-sm text-gray-500">{data.class_code}</p>
                </div>
            </div>

            {/* Meta Info Block */}
            <div className="flex flex-col w-1/3 text-sm text-gray-600">
                <p>👩‍🏫 <span className="text-gray-700">Main Teacher:</span> {teacherName}</p>
                <p>👥 <span className="text-gray-700">Students:</span> {studentCount}/{data.max_students}</p>
                <div className="flex items-center gap-3 mt-1 text-sm text-neutral-500">
                    <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{"Create At : " + new Date(data.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Status + Action Block */}
            <div className="flex flex-col items-end gap-2 w-1/3">
                <Badge
                    className={`capitalize w-fit ${data.status === 'ongoing'
                        ? 'bg-green-100 text-green-600'
                        : data.status === 'scheduling'
                            ? 'bg-yellow-100 text-yellow-600'
                            : data.status === 'pending'
                                ? 'bg-gray-100 text-gray-600'
                                : 'bg-blue-100 text-blue-600'
                        }`}
                >
                    {data.status}
                </Badge>
                <Link to={`/class/${data._id}`}>
                    <Button size="sm">View Details</Button>
                </Link>
            </div>
        </div>
    );
}
