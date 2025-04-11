import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { useUserContext } from "@/providers/authContext"

export default function CourseDetail() {
    const location = useLocation()
    const navigate = useNavigate()
    const course = location.state?.course
    const { user } = useUserContext()

    if (!course) {
        return (
            <div className="p-6 text-center">
                <p className="text-lg">No course data found.</p>
                <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
            </div>
        )
    }

    const {
        name,
        goal,
        course_level,
        sessions_details = [],
        tags = [],
        price,
    } = course

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">{name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{goal}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <p className="font-semibold">Level:</p>
                        <Badge variant="outline" className="text-sm">{course_level}</Badge>
                    </div>

                    <div>
                        <p className="font-semibold">Tags:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {tags.map((tag, idx) => (
                                <Badge key={idx} variant="secondary">{tag}</Badge>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="text-lg font-semibold">Sessions</h3>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            {sessions_details.map((session, idx) => (
                                <li key={idx}>
                                    <span className="font-medium">{session.title}</span>
                                    {session.type && (
                                        <span className="text-sm ml-2 text-muted-foreground">({session.type})</span>
                                    )}
                                    {session.description && (
                                        <p className="text-sm text-gray-600 mt-1 ml-4">{session.description}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="text-right">
                        <p className="text-xl font-bold text-blue-600">${price}</p>

                    </div>
                    <div className="flex gap-4">
                        <div className="pt-4">
                            <Button onClick={() => navigate(-1)}>Return</Button>
                        </div>
                        {user.role !== "manager"
                            ? null
                            : <div className="pt-4">
                                <Button variant="outline" onClick={() => navigate("/classes/add", { state: { course: course } })}>Add new class on this course</Button>
                            </div>
                        }
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}
