import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check, X, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { toast } from "sonner";

interface AttendanceRegularizationRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  profilePic?: string;
  requestType: "check_in" | "check_out" | "full_day" | "half_day";
  date: string;
  originalCheckIn: string;
  originalCheckOut: string;
  requestedCheckIn: string;
  requestedCheckOut: string;
  reason: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
}

const initialRequests: AttendanceRegularizationRequest[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Sarah Johnson",
    employeeEmail: "sarah.johnson@company.com",
    requestType: "check_in",
    date: "2024-01-14",
    originalCheckIn: "—",
    originalCheckOut: "06:00 PM",
    requestedCheckIn: "09:00 AM",
    requestedCheckOut: "06:00 PM",
    reason: "Forgot to punch in",
    requestDate: "2024-01-15",
    status: "pending",
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Mike Chen",
    employeeEmail: "mike.chen@company.com",
    requestType: "check_out",
    date: "2024-01-13",
    originalCheckIn: "09:00 AM",
    originalCheckOut: "—",
    requestedCheckIn: "09:00 AM",
    requestedCheckOut: "07:00 PM",
    reason: "System was down, couldn't punch out",
    requestDate: "2024-01-14",
    status: "pending",
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Emily Davis",
    employeeEmail: "emily.davis@company.com",
    requestType: "full_day",
    date: "2024-01-12",
    originalCheckIn: "—",
    originalCheckOut: "—",
    requestedCheckIn: "09:00 AM",
    requestedCheckOut: "06:00 PM",
    reason: "Was working from client location",
    requestDate: "2024-01-13",
    status: "approved",
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Alex Wilson",
    employeeEmail: "alex.wilson@company.com",
    requestType: "half_day",
    date: "2024-01-11",
    originalCheckIn: "—",
    originalCheckOut: "—",
    requestedCheckIn: "09:00 AM",
    requestedCheckOut: "01:00 PM",
    reason: "Had a doctor's appointment in morning",
    requestDate: "2024-01-12",
    status: "rejected",
  },
];

const AttendanceRegularization = () => {
  const [requests, setRequests] = useState<AttendanceRegularizationRequest[]>(initialRequests);

  const handleApprove = (request: AttendanceRegularizationRequest) => {
    setRequests(
      requests.map((r) =>
        r.id === request.id ? { ...r, status: "approved" as const } : r
      )
    );
    toast.success(`Request from ${request.employeeName} approved`);
  };

  const handleReject = (request: AttendanceRegularizationRequest) => {
    setRequests(
      requests.map((r) =>
        r.id === request.id ? { ...r, status: "rejected" as const } : r
      )
    );
    toast.error(`Request from ${request.employeeName} rejected`);
  };

  const getStatusBadge = (status: AttendanceRegularizationRequest["status"]) => {
    const variants = {
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      rejected: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    const labels = {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
    };

    const dots = {
      pending: "bg-amber-500",
      approved: "bg-emerald-500",
      rejected: "bg-red-500",
    };

    return (
      <Badge variant="outline" className={`${variants[status]} gap-1.5`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
        {labels[status]}
      </Badge>
    );
  };

  const getRequestTypeBadge = (type: AttendanceRegularizationRequest["requestType"]) => {
    const labels = {
      check_in: "Check In",
      check_out: "Check Out",
      full_day: "Full Day",
      half_day: "Half Day",
    };

    return (
      <Badge variant="secondary" className="whitespace-nowrap">
        {labels[type]}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const columns: Column<AttendanceRegularizationRequest>[] = [
    {
      key: "employeeName",
      header: "Employee",
      searchable: true,
      sortable: true,
      render: (request) => (
        <div className="flex items-center gap-3 whitespace-nowrap">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarImage src={request.profilePic} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {request.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{request.employeeName}</p>
            <p className="text-sm text-muted-foreground">{request.employeeEmail}</p>
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
      key: "requestType",
      header: "Request Type",
      sortable: true,
      render: (request) => getRequestTypeBadge(request.requestType),
    },
    {
      key: "date",
      header: "Date",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (request) => formatDate(request.date),
    },
    {
      key: "requestedCheckIn",
      header: "Requested In",
      sortable: false,
      className: "text-foreground whitespace-nowrap font-medium",
    },
    {
      key: "requestedCheckOut",
      header: "Requested Out",
      sortable: false,
      className: "text-foreground whitespace-nowrap font-medium",
    },
    {
      key: "reason",
      header: "Reason",
      sortable: false,
      className: "text-muted-foreground max-w-[200px]",
      render: (request) => (
        <span className="truncate block max-w-[200px]" title={request.reason}>
          {request.reason}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      className: "whitespace-nowrap",
      render: (request) => getStatusBadge(request.status),
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      headerClassName: "w-[50px]",
      sticky: "right",
      render: (request) => (
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
                toast.info(`Viewing details for ${request.employeeName}'s request`);
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            {request.status === "pending" && (
              <>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleApprove(request);
                  }}
                  className="text-emerald-600"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReject(request);
                  }}
                  className="text-red-600"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filters: Filter[] = [
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
        { label: "Check In", value: "check_in" },
        { label: "Check Out", value: "check_out" },
        { label: "Full Day", value: "full_day" },
        { label: "Half Day", value: "half_day" },
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
                <h1 className="text-3xl font-bold text-foreground font-display">Attendance Regularization</h1>
                <p className="text-muted-foreground mt-1">Review and manage attendance correction requests</p>
              </div>
            </div>

            <DataTable
              data={requests}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search requests..."
              selectable
              pageSize={10}
              pageSizeOptions={[10, 25, 50, 100]}
              getRowId={(request) => request.id}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AttendanceRegularization;
