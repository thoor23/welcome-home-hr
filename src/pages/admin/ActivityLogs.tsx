import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogFilterPanel } from "@/components/audit/LogFilterPanel";
import { LogDetailsDrawer } from "@/components/audit/LogDetailsDrawer";
import { Users, Eye, MousePointer, Download, FileDown } from "lucide-react";
import { useState } from "react";

interface ActivityLog {
  id: string;
  timestamp: string;
  user: string;
  sessionId: string;
  actionType: string;
  page: string;
  description: string;
  duration: string;
  device: string;
}

const sampleLogs: ActivityLog[] = [
  {
    id: "1",
    timestamp: "2026-01-02 10:30:15",
    user: "John Smith",
    sessionId: "sess_abc123",
    actionType: "View",
    page: "Dashboard",
    description: "Viewed main dashboard",
    duration: "2m 30s",
    device: "Chrome / Windows",
  },
  {
    id: "2",
    timestamp: "2026-01-02 10:28:00",
    user: "Sarah Johnson",
    sessionId: "sess_def456",
    actionType: "Click",
    page: "Employees",
    description: "Clicked on Add Employee button",
    duration: "-",
    device: "Safari / macOS",
  },
  {
    id: "3",
    timestamp: "2026-01-02 10:25:30",
    user: "Mike Brown",
    sessionId: "sess_ghi789",
    actionType: "Export",
    page: "Reports",
    description: "Exported payroll report to CSV",
    duration: "-",
    device: "Firefox / Linux",
  },
  {
    id: "4",
    timestamp: "2026-01-02 10:20:45",
    user: "Emily Davis",
    sessionId: "sess_jkl012",
    actionType: "Search",
    page: "Documents",
    description: "Searched for 'leave policy'",
    duration: "-",
    device: "Chrome / Android",
  },
  {
    id: "5",
    timestamp: "2026-01-02 10:15:22",
    user: "John Smith",
    sessionId: "sess_abc123",
    actionType: "Download",
    page: "Documents",
    description: "Downloaded employee handbook PDF",
    duration: "-",
    device: "Chrome / Windows",
  },
];

export default function ActivityLogs() {
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getActionBadgeVariant = (action: string) => {
    switch (action.toLowerCase()) {
      case "view":
        return "secondary";
      case "click":
        return "default";
      case "export":
        return "outline";
      case "download":
        return "default";
      case "search":
        return "secondary";
      default:
        return "outline";
    }
  };

  const columns: Column<ActivityLog>[] = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (log) => (
        <span className="text-sm font-mono">{log.timestamp}</span>
      ),
    },
    {
      key: "user",
      header: "User",
    },
    {
      key: "sessionId",
      header: "Session ID",
      render: (log) => (
        <span className="font-mono text-xs">{log.sessionId}</span>
      ),
    },
    {
      key: "actionType",
      header: "Action Type",
      render: (log) => (
        <Badge variant={getActionBadgeVariant(log.actionType)}>
          {log.actionType}
        </Badge>
      ),
    },
    {
      key: "page",
      header: "Page/Module",
    },
    {
      key: "description",
      header: "Description",
    },
    {
      key: "duration",
      header: "Duration",
    },
    {
      key: "device",
      header: "Device",
      render: (log) => (
        <span className="text-sm text-muted-foreground">{log.device}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (log) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedLog(log);
            setDrawerOpen(true);
          }}
        >
          <Eye className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <main className="flex-1 flex flex-col">
          <DashboardHeader />
          <div className="flex-1 p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Activity Logs</h1>
                <p className="text-muted-foreground">
                  Track user activities and navigation patterns
                </p>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Active Users Today"
                value="48"
                icon={Users}
                iconColor="text-blue-600"
              />
              <StatsCard
                title="Page Views"
                value="1,256"
                icon={Eye}
                iconColor="text-green-600"
              />
              <StatsCard
                title="Actions Performed"
                value="892"
                icon={MousePointer}
                iconColor="text-purple-600"
              />
              <StatsCard
                title="Exports/Downloads"
                value="34"
                icon={FileDown}
                iconColor="text-orange-600"
              />
            </div>

            <LogFilterPanel
              onFilterChange={(filters) => console.log(filters)}
              showLogType={false}
            />

            <DataTable columns={columns} data={sampleLogs} />
          </div>
        </main>
      </div>

      <LogDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        log={
          selectedLog
            ? {
                ...selectedLog,
                type: "Activity",
                action: selectedLog.description,
                module: selectedLog.page,
                status: "Success",
              }
            : null
        }
      />
    </SidebarProvider>
  );
}
