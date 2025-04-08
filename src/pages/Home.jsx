import { SidebarProvider } from "@/components/ui/sidebar";
import { LeftSidebar } from "@/layouts/LeftSideBar";
import TopBar from "@/layouts/TopBar";
import RightSideBar from "@/layouts/RightSideBar";

export default function Home() {
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "14rem",
                "--sidebar-width-mobile": "20rem",
                "--sidebar-width-icon": "9rem",
            }}
        >
            <TopBar /> {/* fixed topbar */}

            <div className="pt-24 flex">
                {/* Fixed left sidebar */}
                <LeftSidebar />

                {/* Main content with spacing to account for sidebar width */}
                <main className="ml-64 mr-64 w-full p-6 min-h-[calc(100vh-96px)]">
                    {/* Page content here */}
                </main>

                {/* Right sidebar (optional) */}

            </div>
        </SidebarProvider>
    );
}