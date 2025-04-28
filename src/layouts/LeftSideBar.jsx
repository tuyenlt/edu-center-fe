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
import { Link } from 'react-router-dom';

// Menu items.
const menuByRole = {
  student: [
    { title: 'Dashboard', url: '/', icon: Home },
    { title: 'Classes', url: '/class', icon: Users },
    { title: 'Courses', url: '/courses', icon: BookOpen },
    { title: 'Calendar', url: '/calendar', icon: CalendarDays },
    { title: 'Assignments', url: '/assignments', icon: ClipboardList },
    { title: 'Messages', url: '#', icon: MessageSquare },
    { title: 'Notifications', url: '#', icon: Bell },
  ],
  teacher: [
    { title: 'Dashboard', url: '#', icon: Home },
    { title: 'Classes', url: '#', icon: Users },
    { title: 'Courses', url: '#', icon: BookOpen },
    { title: 'Calendar', url: '#', icon: CalendarDays },
    { title: 'Assignments', url: '#', icon: ClipboardList },
    { title: 'Messages', url: '#', icon: MessageSquare },
    { title: 'Notifications', url: '#', icon: Bell },
  ],
  manager: [
    { title: 'Dashboard', url: '/', icon: Home },
    { title: 'Courses Manage', url: '/courses', icon: Search },
    { title: 'Classes Manage', url: '/class-manage', icon: LayoutDashboard },
    { title: 'Student Manage', url: '/students-manage', icon: Users },
    { title: 'Payment Stats', url: '/payment-manage', icon: CreditCard },
    { title: 'Settings', url: '/setting', icon: Settings },
  ],
};

export function LeftSidebar() {
  const { user, logout } = useUserContext();
  const location = useLocation();
  const role = user?.role || 'student';

  const items = menuByRole[role] || [];
  const currentPath = location.pathname.split('/')[1];
  const activeItemStyle = 'text-blue-600 bg-blue-50';

  return (
    <div className="group fixed top-24 pt-6 h-[calc(100vh-96px)] bg-white dark:bg-gray-900 z-40 border-r transition-all duration-300 w-16 hover:w-64">
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
                      <span className="font-light text-xl transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:visible invisible">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </div>
  );
}
