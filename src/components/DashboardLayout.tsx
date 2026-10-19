import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { TopBar } from "./TopBar";
import { AppRoutes } from "@/routes";

export function DashboardLayout() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          <TopBar />

          <main className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            <div className="animate-fade-in">
              <AppRoutes />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
