import { SidebarProvider } from '@/components/ui/sidebar';
import TopBar from './TopBar';
import { LeftSidebar } from './LeftSideBar';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useLayoutContext } from '@/providers/LayoutProvider';

export default function RootLayout() {
  const { isRootLayoutHidden } = useLayoutContext();
  return !isRootLayoutHidden ? (
    <SidebarProvider
      style={{
        '--sidebar-width': '20rem',
        '--sidebar-width-mobile': '20rem',
        '--sidebar-width-icon': '9rem',
      }}
    >
      <TopBar /> {/* fixed topbar */}
      <div className=" flex justify-center w-full ">
        {/* Container chứa sidebar và main sát nhau */}
        <div className="flex w-full">
          {/* Left Sidebar (chiều rộng cố định) */}
          <div className="w-16">
            <LeftSidebar />
          </div>

          {/* Main content (chiếm phần còn lại) */}
          <main className="flex-1 mt-15 ">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  ) : (
    <Outlet />
  );
}
