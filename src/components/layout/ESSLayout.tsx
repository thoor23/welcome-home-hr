import { TooltipProvider } from "@/components/ui/tooltip";
import { ESSSidebar } from "@/components/ess/ESSSidebar";
import { ESSHeader } from "@/components/ess/ESSHeader";

interface ESSLayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

export function ESSLayout({ children, noPadding = false }: ESSLayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen flex w-full bg-background">
        <ESSSidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-auto">
          <ESSHeader />
          <main className={`flex-1 ${noPadding ? '' : 'p-6'}`}>
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
