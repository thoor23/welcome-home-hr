import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, X, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { toast } from "sonner";

interface LeaveRequest {
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
  status: "pending" | "approved" | "rejected";
  requestedOn: string;
}

interface RegularizationRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  profilePic?: string;
  department: string;
  date: string;
  requestType: string;
  originalTime: string;
  requestedTime: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
  requestedOn: string;
}

const leaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Sarah Johnson",
    employeeEmail: "sarah.johnson@company.com",
    department: "Engineering",
    leaveType: "Annual Leave",
    fromDate: "2024-01-28",
    toDate: "2024-01-30",
    days: 3,
    reason: "Family function",
    status: "pending",
    requestedOn: "2024-01-20",
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Mike Chen",
    employeeEmail: "mike.chen@company.com",
    department: "Marketing",
    leaveType: "Sick Leave",
    fromDate: "2024-01-25",
    toDate: "2024-01-25",
    days: 1,
    reason: "Not feeling well",
    status: "pending",
    requestedOn: "2024-01-24",
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Emily Davis",
    employeeEmail: "emily.davis@company.com",
    department: "HR",
    leaveType: "Casual Leave",
    fromDate: "2024-02-01",
    toDate: "2024-02-02",
    days: 2,
    reason: "Personal work",
    status: "pending",
    requestedOn: "2024-01-22",
  },
];

const regularizationRequests: RegularizationRequest[] = [
  {
    id: "1",
    employeeId: "EMP004",
    employeeName: "Alex Wilson",
    employeeEmail: "alex.wilson@company.com",
    department: "Sales",
    date: "2024-01-18",
    requestType: "Check-in Time",
    originalTime: "10:30 AM",
    requestedTime: "09:00 AM",
    reason: "Biometric not working",
    status: "pending",
    requestedOn: "2024-01-18",
  },
  {
    id: "2",
    employeeId: "EMP005",
    employeeName: "Jessica Brown",
    employeeEmail: "jessica.brown@company.com",
    department: "Engineering",
    date: "2024-01-19",
    requestType: "Check-out Time",
    originalTime: "05:00 PM",
    requestedTime: "07:00 PM",
    reason: "Forgot to punch out",
    status: "pending",
    requestedOn: "2024-01-20",
  },
  {
    id: "3",
    employeeId: "EMP001",
    employeeName: "Sarah Johnson",
    employeeEmail: "sarah.johnson@company.com",
    department: "Engineering",
    date: "2024-01-17",
    requestType: "Work From Home",
    originalTime: "—",
    requestedTime: "Full Day",
    reason: "Was working from home",
    status: "pending",
    requestedOn: "2024-01-18",
  },
];

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>(leaveRequests);
  const [regularizations, setRegularizations] = useState<RegularizationRequest[]>(regularizationRequests);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      rejected: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleLeaveAction = (id: string, action: "approve" | "reject") => {
    setLeaves((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, status: action === "approve" ? "approved" : "rejected" } : l
      )
    );
    toast.success(`Leave request ${action === "approve" ? "approved" : "rejected"}`);
  };

  const handleRegularizationAction = (id: string, action: "approve" | "reject") => {
    setRegularizations((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: action === "approve" ? "approved" : "rejected" } : r
      )
    );
    toast.success(`Regularization request ${action === "approve" ? "approved" : "rejected"}`);
  };

  const leaveColumns: Column<LeaveRequest>[] = [
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
      key: "department",
      header: "Department",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "leaveType",
      header: "Leave Type",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
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
      key: "reason",
      header: "Reason",
      className: "text-muted-foreground max-w-[200px] truncate",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      className: "whitespace-nowrap",
      render: (record) => getStatusBadge(record.status),
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      headerClassName: "w-[120px]",
      sticky: "right",
      render: (record) => (
        <div className="flex items-center gap-1">
          {record.status === "pending" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLeaveAction(record.id, "approve");
                }}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLeaveAction(record.id, "reject");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const regularizationColumns: Column<RegularizationRequest>[] = [
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
      key: "department",
      header: "Department",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (record) => formatDate(record.date),
    },
    {
      key: "requestType",
      header: "Request Type",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "originalTime",
      header: "Original",
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "requestedTime",
      header: "Requested",
      className: "text-foreground font-medium whitespace-nowrap",
    },
    {
      key: "reason",
      header: "Reason",
      className: "text-muted-foreground max-w-[200px] truncate",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      className: "whitespace-nowrap",
      render: (record) => getStatusBadge(record.status),
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      headerClassName: "w-[120px]",
      sticky: "right",
      render: (record) => (
        <div className="flex items-center gap-1">
          {record.status === "pending" && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRegularizationAction(record.id, "approve");
                }}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-500/10"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRegularizationAction(record.id, "reject");
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  const leaveFilters: Filter[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      key: "leaveType",
      label: "Leave Type",
      options: [
        { label: "Annual Leave", value: "Annual Leave" },
        { label: "Sick Leave", value: "Sick Leave" },
        { label: "Casual Leave", value: "Casual Leave" },
      ],
    },
  ];

  const regularizationFilters: Filter[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
    },
    {
      key: "requestType",
      label: "Request Type",
      options: [
        { label: "Check-in Time", value: "Check-in Time" },
        { label: "Check-out Time", value: "Check-out Time" },
        { label: "Work From Home", value: "Work From Home" },
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
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-foreground font-display">Leave Requests</h1>
              <p className="text-muted-foreground mt-1">Manage leave and regularization requests</p>
            </div>

            <Tabs defaultValue="leave" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="leave">Leave Requests</TabsTrigger>
                <TabsTrigger value="regularization">Regularization</TabsTrigger>
              </TabsList>

              <TabsContent value="leave">
                <DataTable
                  data={leaves}
                  columns={leaveColumns}
                  filters={leaveFilters}
                  searchPlaceholder="Search leave requests..."
                  selectable
                  pageSize={10}
                  pageSizeOptions={[10, 25, 50]}
                  getRowId={(record) => record.id}
                />
              </TabsContent>

              <TabsContent value="regularization">
                <DataTable
                  data={regularizations}
                  columns={regularizationColumns}
                  filters={regularizationFilters}
                  searchPlaceholder="Search regularization requests..."
                  selectable
                  pageSize={10}
                  pageSizeOptions={[10, 25, 50]}
                  getRowId={(record) => record.id}
                />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LeaveRequests;