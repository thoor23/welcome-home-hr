import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Download, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { toast } from "sonner";

interface LeaveRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  profilePic?: string;
  department: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  days: number;
  reason: string;
  approvedBy: string;
  approvedDate: string;
}

const initialRecords: LeaveRecord[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Sarah Johnson",
    employeeEmail: "sarah.johnson@company.com",
    department: "Engineering",
    leaveType: "Annual Leave",
    fromDate: "2024-01-20",
    toDate: "2024-01-22",
    days: 3,
    reason: "Family vacation",
    approvedBy: "John Manager",
    approvedDate: "2024-01-15",
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Mike Chen",
    employeeEmail: "mike.chen@company.com",
    department: "Marketing",
    leaveType: "Sick Leave",
    fromDate: "2024-01-18",
    toDate: "2024-01-18",
    days: 1,
    reason: "Medical appointment",
    approvedBy: "Jane HR",
    approvedDate: "2024-01-17",
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Emily Davis",
    employeeEmail: "emily.davis@company.com",
    department: "HR",
    leaveType: "Casual Leave",
    fromDate: "2024-01-25",
    toDate: "2024-01-26",
    days: 2,
    reason: "Personal work",
    approvedBy: "John Manager",
    approvedDate: "2024-01-20",
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Alex Wilson",
    employeeEmail: "alex.wilson@company.com",
    department: "Sales",
    leaveType: "Annual Leave",
    fromDate: "2024-02-01",
    toDate: "2024-02-05",
    days: 5,
    reason: "Wedding ceremony",
    approvedBy: "Jane HR",
    approvedDate: "2024-01-22",
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "Jessica Brown",
    employeeEmail: "jessica.brown@company.com",
    department: "Engineering",
    leaveType: "Maternity Leave",
    fromDate: "2024-02-10",
    toDate: "2024-05-10",
    days: 90,
    reason: "Maternity",
    approvedBy: "CEO",
    approvedDate: "2024-01-25",
  },
];

const AllLeaves = () => {
  const [records] = useState<LeaveRecord[]>(initialRecords);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getLeaveTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      "Annual Leave": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      "Sick Leave": "bg-red-500/10 text-red-500 border-red-500/20",
      "Casual Leave": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Maternity Leave": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    };
    return (
      <Badge variant="outline" className={colors[type] || "bg-secondary"}>
        {type}
      </Badge>
    );
  };

  const exportCsv = () => {
    const headers = ["Employee Name", "Employee ID", "Department", "Leave Type", "From", "To", "Days", "Reason", "Approved By", "Approved Date"];
    const rows = records.map((r) => [
      r.employeeName,
      r.employeeId,
      r.department,
      r.leaveType,
      r.fromDate,
      r.toDate,
      r.days,
      r.reason,
      r.approvedBy,
      r.approvedDate,
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "approved-leaves.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const columns: Column<LeaveRecord>[] = [
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
            <p className="text-sm text-muted-foreground">{record.employeeEmail}</p>
          </div>
        </div>
      ),
    },
    {
      key: "employeeId",
      header: "Employee ID",
      searchable: true,
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "department",
      header: "Department",
      searchable: true,
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "leaveType",
      header: "Leave Type",
      sortable: true,
      className: "whitespace-nowrap",
      render: (record) => getLeaveTypeBadge(record.leaveType),
    },
    {
      key: "fromDate",
      header: "From",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (record) => formatDate(record.fromDate),
    },
    {
      key: "toDate",
      header: "To",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (record) => formatDate(record.toDate),
    },
    {
      key: "days",
      header: "Days",
      sortable: true,
      className: "text-foreground font-medium whitespace-nowrap",
    },
    {
      key: "approvedBy",
      header: "Approved By",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      headerClassName: "w-[50px]",
      sticky: "right",
      render: (record) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                toast.info(`Viewing leave details for ${record.employeeName}`);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "leaveType",
      label: "Leave Type",
      options: [
        { label: "Annual Leave", value: "Annual Leave" },
        { label: "Sick Leave", value: "Sick Leave" },
        { label: "Casual Leave", value: "Casual Leave" },
        { label: "Maternity Leave", value: "Maternity Leave" },
      ],
    },
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />

          <main className="flex-1 p-6 overflow-auto min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-display">All Leaves</h1>
                <p className="text-muted-foreground mt-1">View all approved leave records</p>
              </div>
            </div>

            <DataTable
              data={records}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search leaves..."
              selectable
              toolbarActions={
                <Button variant="outline" onClick={exportCsv}>
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              }
              pageSize={10}
              pageSizeOptions={[10, 25, 50, 100]}
              getRowId={(record) => record.id}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AllLeaves;