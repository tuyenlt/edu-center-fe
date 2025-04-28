import { useLocation, useNavigate } from "react-router-dom";
import { useUserContext } from "@/providers/authContext";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Clock, ListOrdered, Wallet } from "lucide-react";
import ReturnButton from "@/components/shared/ReturnButton";

export default function CourseDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const course = location.state?.course;

    if (!course) {
        return (
            <div className="p-6 text-center">
                <p className="text-lg font-semibold">No course data found.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Go Back
                </button>
            </div>
        );
    }

    const {
        name,
        goal,
        course_level,
        sessions_details = [],
        tags = [],
        price,
        img_url,
    } = course;

    return (
        <div className="container">
            <div className="w-full max-w-screen-2xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-gray-50">
                {/* Left Side */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Course Image */}
                    <div className="w-full h-64 overflow-hidden">
                        <img
                            src={img_url || "/placeholder-image.png"}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Course Info */}
                    <div className="">
                        <h1 className="text-3xl font-bold mb-2">{name}</h1>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="uppercase text-xs tracking-wider text-purple-600 border-purple-600 bg-purple-50 w-fit">{course_level}</Badge>
                            {tags.map((tag, index) => (
                                <Badge key={index} className="uppercase text-xs tracking-wider text-purple-600 border-purple-600 bg-purple-50 w-fit">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <p className="text-gray-500 mb-4">{goal}</p>


                        {/* <div className="text-right">
                        <p className="text-xl font-bold">{price} VND</p>
                    </div> */}
                    </div>

                    {/* Description */}
                    <div className="">
                        <h2 className="text-2xl font-semibold mb-4">Description</h2>
                        <p className="text-gray-600">{goal}</p>
                    </div>

                    {/* Sessions */}
                    <div className="">
                        <h2 className="text-2xl font-semibold mb-4">Course Contents</h2>
                        <div className="border rounded-md overflow-hidden">
                            {sessions_details.map((session, idx) => (
                                <div
                                    key={idx}
                                    className={`border-t p-4 hover:bg-gray-50 transition ${idx === 0 ? "border-t-0" : ""}`}
                                >
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="flex items-center gap-2">
                                            {/* Session Icon */}
                                            <BookOpen className="w-5 h-5 text-blue-600" />

                                            <p>Session {idx + 1}: {session.title}</p>
                                        </div>

                                        {session.type && (
                                            <span className="px-2 py-1 text-xs uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-600 rounded-md">
                                                {session.type}
                                            </span>
                                        )}
                                    </div>

                                    {session.description && (
                                        <p className="text-sm text-gray-600 pl-7 mt-1">{session.description}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>



                </div>

                {/* Right Side (Additional info vs action button) */}
                <div className="space-y-4">
                    <div className="bg-white p-4 pb-8 shadow-sm">

                        <div className="space-y-4 p-4">

                            <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-blue-600" />
                                <span>Expected time: <strong>3 months</strong></span>
                            </div>

                            <div className="flex items-center gap-3">
                                <ListOrdered className="w-5 h-5 text-blue-600" />
                                <span>Total sessions:  <strong>{sessions_details.length}</strong></span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Wallet className="w-5 h-5 text-blue-600" />
                                <span>Price: <strong>{price} VND </strong></span>
                            </div>
                        </div>
                        {/* Buttons */}
                        <div className="flex flex-col gap-4 w-full">
                            <button
                                onClick={() => navigate(-1)}
                                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 w-full max-w-[300px] m-auto"
                            >
                                Return
                            </button>
                            {user?.role === "manager" && (
                                <button
                                    onClick={() => navigate("/class/add", { state: { course } })}
                                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 w-full max-w-[300px] m-auto"
                                >
                                    Add new class
                                </button>
                            )}
                            {user?.role === "manager" && (
                                <button
                                    onClick={() => navigate(`/course/${course._id}/edit`, { state: { course } })}
                                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50 w-full max-w-[300px] m-auto"
                                >
                                    Edit Course
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
