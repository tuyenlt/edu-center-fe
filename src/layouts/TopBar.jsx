import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserContext } from "@/providers/authContext"
import LogoSVG from "@/assets/LogoSVG"
import { useNavigate } from "react-router-dom"

export default function TopBar() {
    const navigate = useNavigate()
    const { user } = useUserContext()

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-24 bg-white border-b flex flex-row items-center justify-between px-6 dark:bg-gray-900 dark:border-gray-700">
            {/* Logo */}
            <a href="/home" className="flex gap-2 items-center">
                <LogoSVG />
                <h1 className="text-2xl font-medium">EnglishNest</h1>
            </a>

            {/* User section */}
            <div className="flex items-center gap-4">
                <Avatar
                    className="w-15 h-15 border-3 border-gray-200 dark:border-gray-700 cursor-pointer"
                    onClick={() => navigate(`/users/${user?._id}`)}
                >
                    {user?.avatar_url
                        ? <AvatarImage src={user.avatar_url} alt={user.name} />
                        : <AvatarFallback>{user?.name[0] || "a"}</AvatarFallback>
                    }
                </Avatar>
                <span className="text-md font-medium hidden md:block">
                    {user?.name}
                </span>
            </div>
        </header>
    )
}
