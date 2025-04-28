import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useUserContext } from "@/providers/authContext"
import { useNavigate } from "react-router-dom"

export default function CourseCard({ course }) {
    const {
        _id,
        name,
        goal,
        course_level,
        sessions_details = [],
        tags = [],
        price,
    } = course
    const navigate = useNavigate()
    const { user } = useUserContext()
    const isManager = user?.role === "manager"

    return (
        <Card className="w-full rounded-2xl shadow-sm border overflow-hidden">
            <div className="flex flex-col md:flex-row">
                {/* Left Side Content */}
                <div className="md:w-2/3 p-6 space-y-4">
                    <CardHeader className="p-0">
                        <CardTitle className="text-2xl font-bold">{name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{goal}</p>
                    </CardHeader>

                    <div className="text-sm text-gray-700">
                        <p className="font-medium">Level: <Badge variant="outline">{course_level}</Badge></p>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold mb-1">Sessions:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                            {sessions_details.slice(0, 2).map((session, idx) => (
                                <li key={idx}>
                                    <span className="font-medium">{session.title}</span>
                                    {session.description ? ` — ${session.description}` : ""}
                                </li>
                            ))}
                            {sessions_details.length > 2 && (
                                <li className="text-xs italic text-muted-foreground">
                                    + {sessions_details.length - 2} more...
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Right Side Content */}
                <div className="md:w-1/3 p-6 flex flex-col justify-between">
                    <div className="text-right">
                        <span className="text-xl font-bold text-blue-600">${price}</span>
                    </div>

                    <div className="mt-4 space-y-2">
                        <button
                            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            onClick={() => navigate(`/course/${_id}`, { state: { course } })}
                        >
                            View Details
                        </button>
                        {isManager && (
                            <button
                                className="w-full px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
                                onClick={() => navigate(`/course/${_id}/edit`, { state: { course: course } })}
                            >
                                Edit Course
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}
