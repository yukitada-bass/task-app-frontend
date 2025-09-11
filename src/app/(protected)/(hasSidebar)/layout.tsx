import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="gap-4">
      <AppSidebar />
      <main className="w-full rounded-2xl shadow-md p-4 bg-sidebar">
        <SidebarTrigger className="md:hidden" />
        {children}
      </main>
    </SidebarProvider>
  );
}
