import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useUserContext } from "@/providers/authContext";

export default function CourseCard({ course }) {
    const {
        _id,
        name,
        goal,
        course_level,
        img_url,
        price,
    } = course;
    const navigate = useNavigate();
    const { user } = useUserContext();
    const isManager = user?.role === "manager";

    return (
        <Card className="w-full rounded-sm overflow-hidden hover:shadow-sm transition-all flex flex-col">

            {/* Top Image */}
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={img_url}
                    alt={name}
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col p-5 space-y-3">

                {/* Category */}
                <Badge variant="outline" className="uppercase text-xs tracking-wider text-purple-600 border-purple-600 bg-purple-50 w-fit">
                    {course_level}
                </Badge>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                    {name}
                </h3>

                {/* Short Goal Description */}
                <p className="text-sm text-gray-600 line-clamp-3">
                    {goal}
                </p>

                <div className="flex-1" />

                {/* Footer: Button + Price */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex flex-col gap-2">
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white text-sm px-5 py-2 rounded-full transition"
                            onClick={() => navigate(`/course/${_id}`, { state: { course } })}
                        >
                            View Details
                        </button>
                        {isManager &&
                            <button
                                className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-5 py-2 rounded-full transition"
                                onClick={() => navigate(`/course/${_id}/edit`, { state: { course } })}
                            >
                                Edit Course
                            </button>
                        }
                    </div>
                    <span className="text-md text-gray-800 font-semibold">
                        {price === 0 ? "Free" : `${price} VND`}
                    </span>

                </div>
            </div>

        </Card>
    );
}
