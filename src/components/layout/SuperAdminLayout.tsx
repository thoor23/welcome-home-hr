import { TooltipProvider } from "@/components/ui/tooltip";
import { SuperAdminSidebar } from "@/components/superadmin/SuperAdminSidebar";
import { SuperAdminHeader } from "@/components/superadmin/SuperAdminHeader";

interface SuperAdminLayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export function SuperAdminLayout({ children, noPadding = false }: SuperAdminLayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex w-full bg-background">
        <SuperAdminSidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-auto">
          <SuperAdminHeader />
          <main className={`flex-1 ${noPadding ? '' : 'p-6'}`}>
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
