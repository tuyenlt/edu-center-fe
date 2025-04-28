import {
    Home,
    BookOpen,
    Users,
    CalendarDays,
    ClipboardList,
    MessageSquare,
    Bell,
    Search,
    Settings,
    CreditCard,
    LayoutDashboard,
    LogOut
} from "lucide-react"

import { useUserContext } from "@/providers/authContext"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"

// Menu items.
const menuByRole = {
    student: [
        { title: "Dashboard", url: "/", icon: Home },
        { title: "Classes", url: "/class", icon: Users },
        { title: "Courses", url: "/courses", icon: BookOpen },
        { title: "Calendar", url: "/calendar", icon: CalendarDays },
        { title: "Assignments", url: "/assignments", icon: ClipboardList },
        { title: "Messages", url: "#", icon: MessageSquare },
        { title: "Notifications", url: "#", icon: Bell },
    ],
    teacher: [
        { title: "Dashboard", url: "#", icon: Home },
        { title: "Classes", url: "#", icon: Users },
        { title: "Courses", url: "#", icon: BookOpen },
        { title: "Calendar", url: "#", icon: CalendarDays },
        { title: "Assignments", url: "#", icon: ClipboardList },
        { title: "Messages", url: "#", icon: MessageSquare },
        { title: "Notifications", url: "#", icon: Bell },
    ],
    manager: [
        { title: "Dashboard", url: "/", icon: Home },
        { title: "Courses Manage", url: "/courses", icon: Search },
        { title: "Classes Manage", url: "/class-manage", icon: LayoutDashboard },
        { title: "Student Manage", url: "/students-manage", icon: Users },
        { title: "Payment Stats", url: "/payment-manage", icon: CreditCard },
        { title: "Settings", url: "/setting", icon: Settings },
    ]
}

export function LeftSidebar() {
    const { user, logout } = useUserContext()
    const location = useLocation()
    const role = user?.role || "student"

    const items = menuByRole[role] || []
    const currentPath = location.pathname.split("/")[1]
    const activeItemStyle = "text-blue-600 bg-blue-50"

    return (
        <div className="fixed bg-white flex flex-col justify-between items-center p-5 top-24 left-0 w-64 pt-10 h-[calc(100vh-96px)] dark:bg-gray-900 z-40 border-r-2">
            <div className="gap-5 w-full">
                {items.map((item) => (
                    <div key={item.title} >
                        <div
                            className={`h-14 flex items-center p-4 rounded-lg hover:text-blue-600 transition-all duration-200 ${currentPath === item.url.split("/")[1] ? activeItemStyle : ""}`
                            }
                            size="lg"
                        >
                            <Link to={item.url} className="flex items-center gap-4 h-full">
                                <item.icon className="!w-6 !h-6 opacity-50" />
                                <span className="font-light text-xl">{item.title}</span>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Button
                variant="destructive"
                size="lg"
                className="flex items-center gap-1 w-full mb-10 h-12"
                onClick={logout}
            >
                <LogOut className="w-6 h-6" />
                Logout
            </Button>
        </div>
    )
}
