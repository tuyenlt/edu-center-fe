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
  LogOut,
  UserPen,
  UserCircle,
  LogOutIcon,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useUserContext } from '@/providers/authContext';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

// Menu items.
const menuByRole = {
  student: [
    { title: 'Dashboard', url: '/home', icon: Home },
    { title: 'Classes', url: '/class', icon: Users },
    { title: 'Courses', url: '/courses', icon: BookOpen },
    { title: 'Calendar', url: '/calendar', icon: CalendarDays },
    // { title: 'Assignments', url: '/assignments', icon: ClipboardList },
    { title: 'Messages', url: '/chat', icon: MessageSquare },
  ],
  teacher: [
    { title: 'Dashboard', url: '/home', icon: Home },
    { title: 'Classes', url: '/class', icon: Users },
    { title: 'Courses', url: '/courses', icon: BookOpen },
    { title: 'Calendar', url: '/calendar', icon: CalendarDays },
    // { title: 'Assignments', url: '#', icon: ClipboardList },
    { title: 'Messages', url: '/chat', icon: MessageSquare },
  ],
  manager: [
    { title: 'Dashboard', url: '/home', icon: Home },
    { title: 'Courses Manage', url: '/courses', icon: Search },
    { title: 'Classes Manage', url: '/class-manage', icon: LayoutDashboard },
    { title: 'Student Manage', url: '/students-manage', icon: Users },
    { title: 'Teacher Manage', url: '/teachers-manage', icon: UserCircle },
    { title: 'Payment Manage', url: '/payment-manage', icon: CreditCard },
  ],
  staff: [
    { title: 'Dashboard', url: '/', icon: Home },
    { title: 'Student contacting', url: '/student-contacting', icon: Users },
    { title: 'Messaging', url: '/chat', icon: MessageSquare },
    { title: 'Teacher Checkin', url: '/teachers-manage', icon: UserCircle },
  ],
};

export function LeftSidebar() {
  const { user, logout } = useUserContext();
  const role = user?.role || 'student';

  const items = menuByRole[role] || [];

  return (
    <div className="group relative">
      <div className="fixed top-15 pt-6 h-[calc(100vh)] bg-white dark:bg-gray-900 z-40 border-r transition-all duration-300 w-16 group-hover:w-64 text-zinc-700">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      className="hover:text-blue-600"
                      size="lg"
                      asChild
                    >
                      <Link to={item.url} className="flex items-center gap-3">
                        <item.icon className="!w-5 !h-5 opacity-50" />
                        <span className=" text-base font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:visible invisible">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                <SidebarMenuItem className="mt-[200px]">
                  <SidebarMenuButton
                    asChild
                    className="hover:text-blue-600 size-lg"
                  >
                    <button
                      onClick={() => logout()}
                      className="flex items-center gap-3 text-base font-medium"
                    >
                      <LogOutIcon className="w-5 h-5 opacity-50" />
                      <span className="transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:visible invisible">
                        Log Out
                      </span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </div>
    </div>
  );
}
