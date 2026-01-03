import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogFilterPanel } from "@/components/audit/LogFilterPanel";
import { LogDetailsDrawer } from "@/components/audit/LogDetailsDrawer";
import { History, Activity, Database, Shield, Download, Eye } from "lucide-react";
import { useState } from "react";

interface AuditLog {
  id: string;
  timestamp: string;
  type: string;
  user: string;
  ipAddress: string;
  action: string;
  module: string;
  resource: string;
  status: string;
  details: string;
}

const sampleLogs: AuditLog[] = [
  {
    id: "1",
    timestamp: "2026-01-02 10:30:15",
    type: "Activity",
    user: "John Smith",
    ipAddress: "192.168.1.105",
    action: "Viewed page",
    module: "Dashboard",
    resource: "Main Dashboard",
    status: "Success",
    details: "User accessed the main dashboard page",
  },
  {
    id: "2",
    timestamp: "2026-01-02 10:28:45",
    type: "Data",
    user: "HR Admin",
    ipAddress: "192.168.1.102",
    action: "Updated salary",
    module: "Payroll",
    resource: "EMP-001",
    status: "Success",
    details: "Salary updated from $50,000 to $55,000",
  },
  {
    id: "3",
    timestamp: "2026-01-02 10:25:30",
    type: "Security",
    user: "priya@company.com",
    ipAddress: "192.168.1.110",
    action: "Login successful",
    module: "Authentication",
    resource: "User Session",
    status: "Success",
    details: "User logged in successfully via email/password",
  },
  {
    id: "4",
    timestamp: "2026-01-02 10:20:12",
    type: "Security",
    user: "unknown@test.com",
    ipAddress: "203.0.113.45",
    action: "Failed login attempt",
    module: "Authentication",
    resource: "Login Page",
    status: "Failed",
    details: "Invalid credentials - 3rd attempt",
  },
  {
    id: "5",
    timestamp: "2026-01-02 10:15:00",
    type: "System",
    user: "System",
    ipAddress: "127.0.0.1",
    action: "Scheduled backup completed",
    module: "Backup",
    resource: "Database",
    status: "Success",
    details: "Daily backup completed successfully",
  },
  {
    id: "6",
    timestamp: "2026-01-02 10:10:22",
    type: "API",
    user: "System",
    ipAddress: "127.0.0.1",
    action: "Email sent via SendGrid",
    module: "Email",
    resource: "Welcome Email",
    status: "Success",
    details: "Welcome email sent to new employee",
  },
];

export default function AllAuditLogs() {
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getTypeBadgeVariant = (type: string) => {
    switch (type.toLowerCase()) {
      case "activity":
        return "default";
      case "data":
        return "secondary";
      case "security":
        return "destructive";
      case "system":
        return "outline";
      case "api":
        return "default";
      default:
        return "secondary";
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

  const columns: Column<AuditLog>[] = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (log) => (
        <span className="text-sm font-mono">{log.timestamp}</span>
      ),
    },
    {
      key: "type",
      header: "Log Type",
      render: (log) => (
        <Badge variant={getTypeBadgeVariant(log.type)}>{log.type}</Badge>
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
      key: "action",
      header: "Action",
    },
    {
      key: "module",
      header: "Module",
    },
    {
      key: "status",
      header: "Status",
      render: (log) => (
        <Badge variant={getStatusBadgeVariant(log.status)}>{log.status}</Badge>
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
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">All Audit Logs</h1>
            <p className="text-muted-foreground">
              Unified view of all system activities and events
            </p>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Logs Today"
            value="1,247"
            icon={History}
            iconColor="text-blue-600"
          />
          <StatsCard
            title="User Activities"
            value="856"
            icon={Activity}
            iconColor="text-green-600"
          />
          <StatsCard
            title="Data Changes"
            value="234"
            icon={Database}
            iconColor="text-purple-600"
          />
          <StatsCard
            title="Security Alerts"
            value="12"
            icon={Shield}
            iconColor="text-red-600"
          />
        </div>

        <LogFilterPanel onFilterChange={(filters) => console.log(filters)} />

        <DataTable columns={columns} data={sampleLogs} />
      </div>

      <LogDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        log={selectedLog}
      />
    </AdminLayout>
  );
}