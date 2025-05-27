import LoadingSpinner from "@/components/shared/LoadingSpinner";
import api from "@/services/api";
import { useEffect, useState } from "react";
import ClassInfoRow from "@/components/shared/ClassInfoRow";


export default function ClassesOfUser({ userId }) {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get(`/classes-of-user/${userId}`)
            .then((response) => {
                setClasses(response.data);
                console.log('Fetched classes:', response.data);
            })
            .catch((error) => {
                console.error('Error fetching classes:', error);
            }).finally(() => {
                setLoading(false);
            });
    }, [userId]);

    return (
        <div className="">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <LoadingSpinner />
                </div>
            ) : classes.length === 0 ? (
                <div className="flex items-center justify-center">
                    <p className="text-gray-500">No classes available</p>
                </div>
            ) : (
                <div className="flex flex-col gap-y-7 p-6 max-w-screen-xl m-auto">
                    {classes.map((classData, idx) => (
                        <ClassInfoRow data={classData} key={idx} />
                    ))}
                </div>
            )}
        </div>
    )

}