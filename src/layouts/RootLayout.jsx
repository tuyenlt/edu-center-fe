import { SidebarProvider } from '@/components/ui/sidebar';
import TopBar from './TopBar';
import { LeftSidebar } from './LeftSideBar';
import { Outlet } from 'react-router-dom';

export default function RootLayout() {
  return (
    <SidebarProvider
      style={{
        '--sidebar-width': '14rem',
        '--sidebar-width-mobile': '20rem',
        '--sidebar-width-icon': '9rem',
      }}
    >
      <TopBar /> {/* fixed topbar */}
      <div className="pt-24 flex justify-center w-full">
        {/* This container centers the content and bounds the sidebar to it */}
        <div className="w-full m-auto max-w-screen-2xl">
          {/* Sticky left sidebar inside the centered container */}
          <LeftSidebar />

          {/* Main content with left padding to make space for sidebar */}
          <main className="w-full p-6 min-h-[calc(100vh-96px)] pl-[5rem]">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
