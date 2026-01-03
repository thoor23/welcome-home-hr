import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogFilterPanel } from "@/components/audit/LogFilterPanel";
import { LogDetailsDrawer } from "@/components/audit/LogDetailsDrawer";
import { Plus, Pencil, Trash2, Layers, Download, Eye } from "lucide-react";
import { useState } from "react";

interface DataChangeLog {
  id: string;
  timestamp: string;
  user: string;
  operation: string;
  module: string;
  table: string;
  recordId: string;
  reason: string;
  changes: { field: string; oldValue: string; newValue: string }[];
}

const sampleLogs: DataChangeLog[] = [
  {
    id: "1",
    timestamp: "2026-01-02 10:30:15",
    user: "HR Admin",
    operation: "Update",
    module: "Payroll",
    table: "employee_salaries",
    recordId: "EMP-001",
    reason: "Annual salary revision",
    changes: [
      { field: "salary", oldValue: "$50,000", newValue: "$55,000" },
      { field: "effective_date", oldValue: "2025-01-01", newValue: "2026-01-01" },
    ],
  },
  {
    id: "2",
    timestamp: "2026-01-02 10:25:00",
    user: "Manager",
    operation: "Create",
    module: "Employees",
    table: "employees",
    recordId: "EMP-045",
    reason: "New hire onboarding",
    changes: [
      { field: "name", oldValue: "-", newValue: "Alice Johnson" },
      { field: "department", oldValue: "-", newValue: "Engineering" },
      { field: "position", oldValue: "-", newValue: "Software Developer" },
    ],
  },
  {
    id: "3",
    timestamp: "2026-01-02 10:20:30",
    user: "Admin",
    operation: "Update",
    module: "Employees",
    table: "employees",
    recordId: "EMP-023",
    reason: "Department transfer",
    changes: [
      { field: "department", oldValue: "Engineering", newValue: "Product" },
      { field: "designation", oldValue: "Developer", newValue: "Sr. Developer" },
    ],
  },
  {
    id: "4",
    timestamp: "2026-01-02 10:15:45",
    user: "HR Admin",
    operation: "Delete",
    module: "Documents",
    table: "documents",
    recordId: "DOC-112",
    reason: "Outdated document removal",
    changes: [{ field: "status", oldValue: "Active", newValue: "Deleted" }],
  },
  {
    id: "5",
    timestamp: "2026-01-02 10:10:00",
    user: "System",
    operation: "Update",
    module: "Leave",
    table: "leave_balances",
    recordId: "BULK",
    reason: "Monthly leave accrual",
    changes: [{ field: "annual_leave", oldValue: "Various", newValue: "+1.5 days" }],
  },
];

export default function DataChangeLogs() {
  const [selectedLog, setSelectedLog] = useState<DataChangeLog | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getOperationBadgeVariant = (operation: string) => {
    switch (operation.toLowerCase()) {
      case "create":
        return "default";
      case "update":
        return "secondary";
      case "delete":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getOperationIcon = (operation: string) => {
    switch (operation.toLowerCase()) {
      case "create":
        return <Plus className="h-3 w-3 mr-1" />;
      case "update":
        return <Pencil className="h-3 w-3 mr-1" />;
      case "delete":
        return <Trash2 className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  const columns: Column<DataChangeLog>[] = [
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
      key: "operation",
      header: "Operation",
      render: (log) => (
        <Badge
          variant={getOperationBadgeVariant(log.operation)}
          className="flex items-center w-fit"
        >
          {getOperationIcon(log.operation)}
          {log.operation}
        </Badge>
      ),
    },
    {
      key: "module",
      header: "Module",
    },
    {
      key: "table",
      header: "Table/Entity",
      render: (log) => (
        <span className="font-mono text-sm">{log.table}</span>
      ),
    },
    {
      key: "recordId",
      header: "Record ID",
      render: (log) => <Badge variant="outline">{log.recordId}</Badge>,
    },
    {
      key: "reason",
      header: "Reason",
      render: (log) => (
        <span className="text-sm text-muted-foreground">{log.reason}</span>
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
                <h1 className="text-2xl font-bold text-foreground">Data Change Logs</h1>
                <p className="text-muted-foreground">
                  Track all data modifications across the system
                </p>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Export Logs
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Records Created"
                value="45"
                icon={Plus}
                iconColor="text-green-600"
              />
              <StatsCard
                title="Records Updated"
                value="234"
                icon={Pencil}
                iconColor="text-blue-600"
              />
              <StatsCard
                title="Records Deleted"
                value="12"
                icon={Trash2}
                iconColor="text-red-600"
              />
              <StatsCard
                title="Bulk Operations"
                value="8"
                icon={Layers}
                iconColor="text-purple-600"
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
                type: "Data",
                action: `${selectedLog.operation} ${selectedLog.table}`,
                status: "Success",
                details: selectedLog.reason,
              }
            : null
        }
      />
    </AdminLayout>
  );
}
