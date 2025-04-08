import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUserContext } from "@/providers/authContext"
import { LogOut } from "lucide-react"
import LogoSVG from "@/assets/LogoSVG"

export default function TopBar() {
    const { user, logout } = useUserContext()

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-24 bg-white border-b flex flex-row items-center justify-between px-6 dark:bg-gray-900 dark:border-gray-700">
            {/* Logo */}
            <a href="/home" className="flex gap-2 items-center">
                <LogoSVG />
                <h1 className="text-2xl font-medium">EnglishNest</h1>
            </a>

            {/* User section */}
            <div className="flex items-center gap-4">
                <Avatar className="w-15 h-15">
                    {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-md font-medium hidden md:block">
                    {user.name}
                </span>
                <Button
                    variant="outline"
                    size="lg"
                    className="flex items-center gap-1"
                    onClick={logout}
                >
                    <LogOut className="w-6 h-6" />
                    Logout
                </Button>
            </div>
        </header>
    )
}
