import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogFilterPanel } from "@/components/audit/LogFilterPanel";
import { LogDetailsDrawer } from "@/components/audit/LogDetailsDrawer";
import {
  AlertCircle,
  AlertTriangle,
  Info,
  Bug,
  Download,
  Eye,
  Server,
} from "lucide-react";
import { useState } from "react";

interface SystemLog {
  id: string;
  timestamp: string;
  level: string;
  category: string;
  message: string;
  stackTrace: string;
  source: string;
  resolution: string;
}

const sampleLogs: SystemLog[] = [
  {
    id: "1",
    timestamp: "2026-01-02 10:30:15",
    level: "Info",
    category: "Scheduler",
    message: "Daily backup job completed successfully",
    stackTrace: "-",
    source: "BackupService",
    resolution: "N/A",
  },
  {
    id: "2",
    timestamp: "2026-01-02 10:28:00",
    level: "Warning",
    category: "Database",
    message: "Slow query detected: Query took 3.2s",
    stackTrace: "SELECT * FROM employees WHERE...",
    source: "QueryOptimizer",
    resolution: "Pending",
  },
  {
    id: "3",
    timestamp: "2026-01-02 10:25:30",
    level: "Error",
    category: "Email",
    message: "Failed to send email: SMTP connection timeout",
    stackTrace: "Error: Connection timeout after 30000ms\n  at SMTPClient.connect...",
    source: "EmailService",
    resolution: "Fixed",
  },
  {
    id: "4",
    timestamp: "2026-01-02 10:20:00",
    level: "Info",
    category: "Authentication",
    message: "Session cleanup: Removed 45 expired sessions",
    stackTrace: "-",
    source: "SessionManager",
    resolution: "N/A",
  },
  {
    id: "5",
    timestamp: "2026-01-02 10:15:45",
    level: "Error",
    category: "File",
    message: "Failed to upload file: Disk space low",
    stackTrace: "Error: ENOSPC - No space left on device",
    source: "FileUploadService",
    resolution: "Pending",
  },
  {
    id: "6",
    timestamp: "2026-01-02 10:10:22",
    level: "Debug",
    category: "API",
    message: "Rate limiter triggered for IP 192.168.1.50",
    stackTrace: "-",
    source: "RateLimiter",
    resolution: "N/A",
  },
];

export default function SystemLogs() {
  const [selectedLog, setSelectedLog] = useState<SystemLog | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "error":
        return <AlertCircle className="h-3 w-3 mr-1" />;
      case "warning":
        return <AlertTriangle className="h-3 w-3 mr-1" />;
      case "info":
        return <Info className="h-3 w-3 mr-1" />;
      case "debug":
        return <Bug className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  const getLevelBadgeVariant = (level: string) => {
    switch (level.toLowerCase()) {
      case "error":
        return "destructive";
      case "warning":
        return "secondary";
      case "info":
        return "default";
      case "debug":
        return "outline";
      default:
        return "outline";
    }
  };

  const getResolutionBadgeVariant = (resolution: string) => {
    switch (resolution.toLowerCase()) {
      case "fixed":
        return "default";
      case "pending":
        return "secondary";
      case "ignored":
        return "outline";
      default:
        return "outline";
    }
  };

  const columns: Column<SystemLog>[] = [
    {
      key: "timestamp",
      header: "Timestamp",
      render: (log) => (
        <span className="text-sm font-mono">{log.timestamp}</span>
      ),
    },
    {
      key: "level",
      header: "Level",
      render: (log) => (
        <Badge
          variant={getLevelBadgeVariant(log.level)}
          className="flex items-center w-fit"
        >
          {getLevelIcon(log.level)}
          {log.level}
        </Badge>
      ),
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "message",
      header: "Message",
      render: (log) => (
        <span className="text-sm max-w-xs truncate block">{log.message}</span>
      ),
    },
    {
      key: "source",
      header: "Source",
      render: (log) => (
        <span className="font-mono text-sm">{log.source}</span>
      ),
    },
    {
      key: "resolution",
      header: "Resolution",
      render: (log) => (
        <Badge variant={getResolutionBadgeVariant(log.resolution)}>
          {log.resolution}
        </Badge>
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
                <h1 className="text-2xl font-bold text-foreground">System Logs</h1>
                <p className="text-muted-foreground">
                  Monitor system events, errors, and warnings
                </p>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Events"
                value="892"
                icon={Server}
                iconColor="text-blue-600"
              />
              <StatsCard
                title="Errors"
                value="23"
                icon={AlertCircle}
                iconColor="text-red-600"
              />
              <StatsCard
                title="Warnings"
                value="45"
                icon={AlertTriangle}
                iconColor="text-orange-600"
              />
              <StatsCard
                title="Info Events"
                value="824"
                icon={Info}
                iconColor="text-green-600"
              />
            </div>

            <LogFilterPanel
              onFilterChange={(filters) => console.log(filters)}
              showLogType={false}
            />

            <DataTable columns={columns} data={sampleLogs} />
      </div>

      <LogDetailsDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        log={
          selectedLog
            ? {
                ...selectedLog,
                type: "System",
                action: selectedLog.message,
                module: selectedLog.category,
                user: "System",
                status: selectedLog.level === "Error" ? "Failed" : "Success",
                details: selectedLog.stackTrace,
              }
            : null
        }
      />
    </AdminLayout>
  );
}
