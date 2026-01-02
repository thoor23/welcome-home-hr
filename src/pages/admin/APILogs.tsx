import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogFilterPanel } from "@/components/audit/LogFilterPanel";
import { LogDetailsDrawer } from "@/components/audit/LogDetailsDrawer";
import {
  Webhook,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Eye,
} from "lucide-react";
import { useState } from "react";

interface APILog {
  id: string;
  timestamp: string;
  integration: string;
  endpoint: string;
  method: string;
  requestSize: string;
  responseStatus: number;
  responseTime: string;
  initiatedBy: string;
  errorMessage: string;
}

const sampleLogs: APILog[] = [
  {
    id: "1",
    timestamp: "2026-01-02 10:30:15",
    integration: "SendGrid",
    endpoint: "/v3/mail/send",
    method: "POST",
    requestSize: "2.4 KB",
    responseStatus: 202,
    responseTime: "234ms",
    initiatedBy: "System",
    errorMessage: "",
  },
  {
    id: "2",
    timestamp: "2026-01-02 10:28:00",
    integration: "Stripe",
    endpoint: "/v1/customers",
    method: "POST",
    requestSize: "1.2 KB",
    responseStatus: 200,
    responseTime: "456ms",
    initiatedBy: "HR Admin",
    errorMessage: "",
  },
  {
    id: "3",
    timestamp: "2026-01-02 10:25:30",
    integration: "Twilio",
    endpoint: "/2010-04-01/Messages",
    method: "POST",
    requestSize: "0.8 KB",
    responseStatus: 400,
    responseTime: "123ms",
    initiatedBy: "System",
    errorMessage: "Invalid phone number format",
  },
  {
    id: "4",
    timestamp: "2026-01-02 10:20:00",
    integration: "Google OAuth",
    endpoint: "/oauth2/v4/token",
    method: "POST",
    requestSize: "0.5 KB",
    responseStatus: 200,
    responseTime: "178ms",
    initiatedBy: "john@company.com",
    errorMessage: "",
  },
  {
    id: "5",
    timestamp: "2026-01-02 10:15:45",
    integration: "AWS S3",
    endpoint: "/bucket/upload",
    method: "PUT",
    requestSize: "5.6 MB",
    responseStatus: 200,
    responseTime: "1.2s",
    initiatedBy: "HR Admin",
    errorMessage: "",
  },
  {
    id: "6",
    timestamp: "2026-01-02 10:10:22",
    integration: "Slack",
    endpoint: "/api/chat.postMessage",
    method: "POST",
    requestSize: "0.3 KB",
    responseStatus: 500,
    responseTime: "5.4s",
    initiatedBy: "System",
    errorMessage: "Service temporarily unavailable",
  },
];

export default function APILogs() {
  const [selectedLog, setSelectedLog] = useState<APILog | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getMethodBadgeVariant = (method: string) => {
    switch (method) {
      case "GET":
        return "secondary";
      case "POST":
        return "default";
      case "PUT":
        return "outline";
      case "DELETE":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusBadgeVariant = (status: number) => {
    if (status >= 200 && status < 300) return "default";
    if (status >= 400 && status < 500) return "secondary";
    if (status >= 500) return "destructive";
    return "outline";
  };

  const columns: Column<APILog>[] = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (log) => (
        <span className="text-sm font-mono">{log.timestamp}</span>
      ),
    },
    {
      key: "integration",
      header: "Integration",
      render: (log) => <Badge variant="outline">{log.integration}</Badge>,
    },
    {
      key: "endpoint",
      header: "Endpoint",
      render: (log) => (
        <span className="font-mono text-xs max-w-xs truncate block">
          {log.endpoint}
        </span>
      ),
    },
    {
      key: "method",
      header: "Method",
      render: (log) => (
        <Badge variant={getMethodBadgeVariant(log.method)}>{log.method}</Badge>
      ),
    },
    {
      key: "requestSize",
      header: "Request Size",
    },
    {
      key: "responseStatus",
      header: "Status",
      render: (log) => (
        <Badge variant={getStatusBadgeVariant(log.responseStatus)}>
          {log.responseStatus}
        </Badge>
      ),
    },
    {
      key: "responseTime",
      header: "Response Time",
      render: (log) => (
        <span className="font-mono text-sm">{log.responseTime}</span>
      ),
    },
    {
      key: "initiatedBy",
      header: "Initiated By",
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
                <h1 className="text-2xl font-bold text-foreground">API Logs</h1>
                <p className="text-muted-foreground">
                  Track external API calls and integration activity
                </p>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total API Calls"
                value="1,456"
                icon={Webhook}
                iconColor="text-blue-600"
              />
              <StatsCard
                title="Successful Calls"
                value="1,398"
                icon={CheckCircle}
                iconColor="text-green-600"
              />
              <StatsCard
                title="Failed Calls"
                value="58"
                icon={XCircle}
                iconColor="text-red-600"
              />
              <StatsCard
                title="Avg Response Time"
                value="342ms"
                icon={Clock}
                iconColor="text-purple-600"
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
                type: "API",
                action: `${selectedLog.method} ${selectedLog.endpoint}`,
                module: selectedLog.integration,
                user: selectedLog.initiatedBy,
                status:
                  selectedLog.responseStatus >= 200 && selectedLog.responseStatus < 300
                    ? "Success"
                    : "Failed",
                details:
                  selectedLog.errorMessage ||
                  `Response time: ${selectedLog.responseTime}`,
              }
            : null
        }
      />
    </SidebarProvider>
  );
}
