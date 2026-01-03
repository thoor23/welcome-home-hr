import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

interface AdminLayoutProps {
  children: React.ReactNode;
  /** If true, no padding is applied to main content area */
  noPadding?: boolean;
}

export function AdminLayout({ children, noPadding = false }: AdminLayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className={`flex-1 overflow-auto ${noPadding ? '' : 'p-6'}`}>
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
