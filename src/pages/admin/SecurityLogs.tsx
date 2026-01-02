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
  LogIn,
  LogOut,
  XCircle,
  AlertTriangle,
  Download,
  Eye,
  Ban,
  Shield,
} from "lucide-react";
import { useState } from "react";

interface SecurityLog {
  id: string;
  timestamp: string;
  eventType: string;
  user: string;
  ipAddress: string;
  location: string;
  device: string;
  status: string;
  riskLevel: string;
}

const sampleLogs: SecurityLog[] = [
  {
    id: "1",
    timestamp: "2026-01-02 10:30:15",
    eventType: "Login",
    user: "john@company.com",
    ipAddress: "192.168.1.105",
    location: "New York, US",
    device: "Chrome / Windows",
    status: "Success",
    riskLevel: "Low",
  },
  {
    id: "2",
    timestamp: "2026-01-02 10:28:00",
    eventType: "Failed Login",
    user: "unknown@test.com",
    ipAddress: "203.0.113.45",
    location: "Unknown",
    device: "Unknown",
    status: "Failed",
    riskLevel: "High",
  },
  {
    id: "3",
    timestamp: "2026-01-02 10:25:30",
    eventType: "Password Change",
    user: "sarah@company.com",
    ipAddress: "192.168.1.110",
    location: "Los Angeles, US",
    device: "Safari / macOS",
    status: "Success",
    riskLevel: "Medium",
  },
  {
    id: "4",
    timestamp: "2026-01-02 10:20:00",
    eventType: "Permission Change",
    user: "admin@company.com",
    ipAddress: "192.168.1.100",
    location: "San Francisco, US",
    device: "Chrome / macOS",
    status: "Success",
    riskLevel: "Medium",
  },
  {
    id: "5",
    timestamp: "2026-01-02 10:15:45",
    eventType: "Account Locked",
    user: "mike@company.com",
    ipAddress: "192.168.1.115",
    location: "Chicago, US",
    device: "Firefox / Windows",
    status: "Warning",
    riskLevel: "High",
  },
  {
    id: "6",
    timestamp: "2026-01-02 10:10:22",
    eventType: "Logout",
    user: "emily@company.com",
    ipAddress: "192.168.1.120",
    location: "Seattle, US",
    device: "Chrome / Windows",
    status: "Success",
    riskLevel: "Low",
  },
];

export default function SecurityLogs() {
  const [selectedLog, setSelectedLog] = useState<SecurityLog | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getEventIcon = (eventType: string) => {
    switch (eventType.toLowerCase()) {
      case "login":
        return <LogIn className="h-3 w-3 mr-1" />;
      case "logout":
        return <LogOut className="h-3 w-3 mr-1" />;
      case "failed login":
        return <XCircle className="h-3 w-3 mr-1" />;
      case "account locked":
        return <Ban className="h-3 w-3 mr-1" />;
      default:
        return <Shield className="h-3 w-3 mr-1" />;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "default";
      case "failed":
        return "destructive";
      case "warning":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "outline";
      case "medium":
        return "secondary";
      case "high":
        return "destructive";
      case "critical":
        return "destructive";
      default:
        return "outline";
    }
  };

  const columns: Column<SecurityLog>[] = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (log) => (
        <span className="text-sm font-mono">{log.timestamp}</span>
      ),
    },
    {
      key: "eventType",
      header: "Event Type",
      render: (log) => (
        <Badge variant="outline" className="flex items-center w-fit">
          {getEventIcon(log.eventType)}
          {log.eventType}
        </Badge>
      ),
    },
    {
      key: "user",
      header: "User",
    },
    {
      key: "ipAddress",
      header: "IP Address",
      render: (log) => (
        <span className="font-mono text-sm">{log.ipAddress}</span>
      ),
    },
    {
      key: "location",
      header: "Location",
    },
    {
      key: "device",
      header: "Device",
      render: (log) => (
        <span className="text-sm text-muted-foreground">{log.device}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (log) => (
        <Badge variant={getStatusBadgeVariant(log.status)}>{log.status}</Badge>
      ),
    },
    {
      key: "riskLevel",
      header: "Risk Level",
      render: (log) => (
        <Badge variant={getRiskBadgeVariant(log.riskLevel)}>{log.riskLevel}</Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (log) => (
        <div className="flex gap-1">
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
          {log.riskLevel === "High" && (
            <Button variant="ghost" size="sm" className="text-destructive">
              <Ban className="h-4 w-4" />
            </Button>
          )}
        </div>
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
                <h1 className="text-2xl font-bold text-foreground">Security Logs</h1>
                <p className="text-muted-foreground">
                  Monitor login attempts and security-related events
                </p>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Login Attempts"
                value="156"
                icon={LogIn}
                iconColor="text-blue-600"
              />
              <StatsCard
                title="Failed Logins"
                value="12"
                icon={XCircle}
                iconColor="text-red-600"
              />
              <StatsCard
                title="Permission Changes"
                value="8"
                icon={Shield}
                iconColor="text-purple-600"
              />
              <StatsCard
                title="Security Alerts"
                value="3"
                icon={AlertTriangle}
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
                type: "Security",
                action: selectedLog.eventType,
                module: "Authentication",
                status: selectedLog.status,
                details: `${selectedLog.eventType} from ${selectedLog.location}`,
              }
            : null
        }
      />
    </SidebarProvider>
  );
}
