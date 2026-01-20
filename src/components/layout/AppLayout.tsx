import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app/AppSidebar";
import { AppHeader } from "@/components/app/AppHeader";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/contexts/SidebarContext";

interface AppLayoutProps {
  children: React.ReactNode;
  /** If true, no padding is applied to main content area */
  noPadding?: boolean;
}

export function AppLayout({ children, noPadding = false }: AppLayoutProps) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <TooltipProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-auto">
              <AppHeader />
              <main className={`flex-1 ${noPadding ? '' : 'p-6'}`}>
                {children}
              </main>
            </div>
          </div>
        </TooltipProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}
