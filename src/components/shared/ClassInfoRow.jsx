import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ClockIcon, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AvatarUser from '@/components/shared/AvatarUser';
import { getClassProgress } from '@/utils';

export default function ClassInfoRow({ data, mode = 'default' }) {
    const teacherName = data.teachers?.[0]?.name || 'Unknown Teacher';
    const studentCount = data.students?.length || 0;



    return (
        <Link to={`/class/${data._id}`} className="flex items-center justify-between w-full px-6 py-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-all">
            {/* Class Info Block */}
            <div className="flex items-center gap-4 w-1/3">
                <AvatarUser user={data.teachers?.[0]} className="w-12 h-12" fallbackColor="bg-blue-500" />
                <div>
                    <h3 className="text-base font-semibold text-gray-800">{data.class_name}</h3>
                    <p className="text-sm text-gray-500">{data.class_code}</p>
                </div>
            </div>

            {/* Meta Info Block */}
            {mode === 'more' &&
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
            }

            {/* Progress bar */}
            <div className="w-40 px-4">
                <div className="flex items-center justify-between mb-1 text-sm text-gray-600">
                    <span>Progress</span>
                    <span>{getClassProgress(data)}%</span>
                </div>
                <div className="relative w-full h-2 bg-gray-200 rounded-full">
                    <div
                        className="absolute top-0 left-0 h-2 rounded-full bg-blue-500"
                        style={{ width: `${getClassProgress(data)}%` }}
                    ></div>
                </div>
            </div>
            <div className="flex flex-col gap-2 w-1/3 items-end">
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

            </div>
        </Link>
    );
}
