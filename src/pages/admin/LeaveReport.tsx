import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, FileText } from "lucide-react";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { toast } from "sonner";

interface LeaveBalance {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  profilePic?: string;
  department: string;
  annualLeave: { used: number; total: number };
  sickLeave: { used: number; total: number };
  casualLeave: { used: number; total: number };
  unpaidLeave: number;
}

const leaveBalances: LeaveBalance[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Sarah Johnson",
    employeeEmail: "sarah.johnson@company.com",
    department: "Engineering",
    annualLeave: { used: 8, total: 21 },
    sickLeave: { used: 2, total: 12 },
    casualLeave: { used: 3, total: 6 },
    unpaidLeave: 0,
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Mike Chen",
    employeeEmail: "mike.chen@company.com",
    department: "Marketing",
    annualLeave: { used: 12, total: 21 },
    sickLeave: { used: 5, total: 12 },
    casualLeave: { used: 4, total: 6 },
    unpaidLeave: 2,
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Emily Davis",
    employeeEmail: "emily.davis@company.com",
    department: "HR",
    annualLeave: { used: 5, total: 21 },
    sickLeave: { used: 1, total: 12 },
    casualLeave: { used: 2, total: 6 },
    unpaidLeave: 0,
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Alex Wilson",
    employeeEmail: "alex.wilson@company.com",
    department: "Sales",
    annualLeave: { used: 15, total: 21 },
    sickLeave: { used: 8, total: 12 },
    casualLeave: { used: 6, total: 6 },
    unpaidLeave: 3,
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "Jessica Brown",
    employeeEmail: "jessica.brown@company.com",
    department: "Engineering",
    annualLeave: { used: 10, total: 21 },
    sickLeave: { used: 3, total: 12 },
    casualLeave: { used: 1, total: 6 },
    unpaidLeave: 0,
  },
];

const LeaveReport = () => {
  const [balances] = useState<LeaveBalance[]>(leaveBalances);

  const totalStats = {
    totalLeavesTaken: balances.reduce(
      (acc, b) => acc + b.annualLeave.used + b.sickLeave.used + b.casualLeave.used + b.unpaidLeave,
      0
    ),
    avgLeavePerEmployee: Math.round(
      balances.reduce(
        (acc, b) => acc + b.annualLeave.used + b.sickLeave.used + b.casualLeave.used,
        0
      ) / balances.length
    ),
    mostUsedLeaveType: "Annual Leave",
    employeesWithNoLeave: balances.filter(
      (b) => b.annualLeave.used === 0 && b.sickLeave.used === 0 && b.casualLeave.used === 0
    ).length,
  };

  const exportCsv = () => {
    const headers = [
      "Employee Name",
      "Employee ID",
      "Department",
      "Annual Leave (Used/Total)",
      "Sick Leave (Used/Total)",
      "Casual Leave (Used/Total)",
      "Unpaid Leave",
    ];
    const rows = balances.map((b) => [
      b.employeeName,
      b.employeeId,
      b.department,
      `${b.annualLeave.used}/${b.annualLeave.total}`,
      `${b.sickLeave.used}/${b.sickLeave.total}`,
      `${b.casualLeave.used}/${b.casualLeave.total}`,
      b.unpaidLeave,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leave-report.csv";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Report exported successfully");
  };

  const columns: Column<LeaveBalance>[] = [
    {
      key: "employeeName",
      header: "Employee",
      searchable: true,
      sortable: true,
      render: (record) => (
        <div className="flex items-center gap-3 whitespace-nowrap">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarImage src={record.profilePic} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {record.employeeName.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{record.employeeName}</p>
            <p className="text-sm text-muted-foreground">{record.employeeId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      header: "Department",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "annualLeave",
      header: "Annual Leave",
      sortable: true,
      className: "whitespace-nowrap",
      render: (record) => (
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{
                width: `${(record.annualLeave.used / record.annualLeave.total) * 100}%`,
              }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {record.annualLeave.used}/{record.annualLeave.total}
          </span>
        </div>
      ),
    },
    {
      key: "sickLeave",
      header: "Sick Leave",
      sortable: true,
      className: "whitespace-nowrap",
      render: (record) => (
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500 rounded-full"
              style={{
                width: `${(record.sickLeave.used / record.sickLeave.total) * 100}%`,
              }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {record.sickLeave.used}/{record.sickLeave.total}
          </span>
        </div>
      ),
    },
    {
      key: "casualLeave",
      header: "Casual Leave",
      sortable: true,
      className: "whitespace-nowrap",
      render: (record) => (
        <div className="flex items-center gap-2">
          <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 rounded-full"
              style={{
                width: `${(record.casualLeave.used / record.casualLeave.total) * 100}%`,
              }}
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {record.casualLeave.used}/{record.casualLeave.total}
          </span>
        </div>
      ),
    },
    {
      key: "unpaidLeave",
      header: "Unpaid",
      sortable: true,
      className: "text-foreground font-medium whitespace-nowrap",
      render: (record) => (
        <span className={record.unpaidLeave > 0 ? "text-amber-500" : "text-muted-foreground"}>
          {record.unpaidLeave} days
        </span>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "department",
      label: "Department",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Marketing", value: "Marketing" },
        { label: "HR", value: "HR" },
        { label: "Sales", value: "Sales" },
      ],
    },
  ];
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Leave Report</h1>
          <p className="text-muted-foreground mt-1">Employee leave balance and usage report</p>
        </div>
      </div>

            {/* Summary Stats */}
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Leaves Taken
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{totalStats.totalLeavesTaken}</div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Avg per Employee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{totalStats.avgLeavePerEmployee} days</div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Most Used Type
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{totalStats.mostUsedLeaveType}</div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Zero Leave Employees
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{totalStats.employeesWithNoLeave}</div>
                </CardContent>
              </Card>
            </div>

            <DataTable
              data={balances}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search employees..."
              selectable
              toolbarActions={
                <div className="flex gap-2">
                  <Button variant="outline" onClick={exportCsv}>
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline" onClick={() => toast.info("PDF export coming soon")}>
                    <FileText className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              }
              pageSize={10}
              pageSizeOptions={[10, 25, 50, 100]}
          getRowId={(record) => record.id}
        />
      </AdminLayout>
    );
};

export default LeaveReport;