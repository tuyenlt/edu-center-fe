import LoadingSpinner from "@/components/shared/LoadingSpinner";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import AvatarUser from "@/components/shared/AvatarUser";
import { useNavigate } from "react-router-dom";


export default function ClassesOfUser({ userId }) {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/classes-of-user/${userId}`)
            .then((response) => {
                setClasses(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching classes:', error);
                setLoading(false);
            });
    }, [userId]);

    return (
        <div className="">
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <LoadingSpinner />
                </div>
            ) : classes.length === 0 ? (
                <div className="flex items-center justify-center">
                    <p className="text-gray-500">No classes available</p>
                </div>
            ) : (
                <div className="flex flex-col gap-y-7 p-6 max-w-screen-xl m-auto">
                    {classes.map((classData, idx) => (
                        <div className="w-full flex border p-4 rounded-md items-center cursor-pointer" key={idx}
                            onClick={() => navigate(`/class/${classData._id}`)}
                        >
                            <AvatarUser user={classData.teachers[0]} />
                            <div className="pl-2">
                                <div className="">{classData.class_name}</div>
                                <div className="">{classData.teachers[0].name}</div>
                            </div>
                            <Badge
                                className={`capitalize w-fit ml-auto h-8
                                    ${classData.status === 'ongoing'
                                        ? 'bg-green-100 text-green-600'
                                        : classData.status === 'scheduling'
                                            ? 'bg-yellow-100 text-yellow-600'
                                            : classData.status === 'pending'
                                                ? 'bg-gray-100 text-gray-600'
                                                : 'bg-blue-100 text-blue-600'
                                    }`}
                            >
                                {classData.status}
                            </Badge>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

}