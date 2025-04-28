import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, Bell, MessageSquare } from "lucide-react"
import { useUserContext } from "@/providers/authContext"



export default function RightSidebar() {
    const { user, logout } = useUserContext()
    const userActions = [
        {
            label: "Logout",
            icon: LogOut,
            variant: "destructive",
            onClick: () => {
                console.log("Logout clicked")
                logout()
            },
        },
    ]

    const activityItems = [
        {
            label: "Notifications",
            icon: Bell,
            href: "#",
        },
        {
            label: "Messages",
            icon: MessageSquare,
            href: "#",
        },
    ]
    return (
        <Sidebar side="right" className="fixed right-0 top-0 h-screen w-64 border-l bg-muted shadow-lg">
            <SidebarContent>
                {/* User Info */}
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col items-center gap-4 py-6">
                        <Avatar className="w-16 h-16">
                            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <p className="text-lg font-semibold">{user.name}</p>

                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Activity Section */}
                <SidebarGroup>
                    {/* <div className="w-full h-0 border mb-5"></div> */}
                    <SidebarGroupContent className="flex flex-col">
                        <SidebarMenu className="overflow-auto grow">
                            {activityItems.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild size="lg">
                                        <a href={item.href} className="flex items-center">
                                            <item.icon className="mr-1 !w-5 !h-5 opacity-50" />
                                            <span className="font-light text-lg">{item.label}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                        <SidebarMenu className="align-bottom">
                            {userActions.map((action) => (
                                <Button
                                    key={action.label}
                                    variant={action.variant}
                                    onClick={action.onClick}
                                    className="w-full"
                                >
                                    <action.icon className="mr-2 w-5 h-6" />
                                    {action.label}
                                </Button>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
        </Sidebar>
    )
}
