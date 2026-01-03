import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
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

interface RegularizationRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  profilePic?: string;
  requestType: "personal_info" | "work_info" | "contact_info" | "bank_details" | "address";
  fieldName: string;
  oldValue: string;
  newValue: string;
  requestDate: string;
  status: "pending" | "approved" | "rejected";
  remarks?: string;
}

const initialRequests: RegularizationRequest[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Sarah Johnson",
    employeeEmail: "sarah.johnson@company.com",
    requestType: "personal_info",
    fieldName: "Marital Status",
    oldValue: "Single",
    newValue: "Married",
    requestDate: "2024-01-15",
    status: "pending",
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Mike Chen",
    employeeEmail: "mike.chen@company.com",
    requestType: "contact_info",
    fieldName: "Phone Number",
    oldValue: "+1 234 567 8902",
    newValue: "+1 234 567 9999",
    requestDate: "2024-01-14",
    status: "pending",
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Emily Davis",
    employeeEmail: "emily.davis@company.com",
    requestType: "address",
    fieldName: "Current Address",
    oldValue: "123 Old Street, Chicago, IL",
    newValue: "456 New Avenue, Chicago, IL 60601",
    requestDate: "2024-01-12",
    status: "approved",
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Alex Wilson",
    employeeEmail: "alex.wilson@company.com",
    requestType: "bank_details",
    fieldName: "Bank Account Number",
    oldValue: "****1234",
    newValue: "****5678",
    requestDate: "2024-01-10",
    status: "rejected",
    remarks: "Invalid bank details provided",
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "Jessica Brown",
    employeeEmail: "jessica.brown@company.com",
    requestType: "work_info",
    fieldName: "Emergency Contact",
    oldValue: "John Doe - +1 111 222 3333",
    newValue: "Jane Smith - +1 444 555 6666",
    requestDate: "2024-01-08",
    status: "pending",
  },
];

const DetailsRegularization = () => {
  const [requests, setRequests] = useState<RegularizationRequest[]>(initialRequests);

  const handleApprove = (request: RegularizationRequest) => {
    setRequests(
      requests.map((r) =>
        r.id === request.id ? { ...r, status: "approved" as const } : r
      )
    );
    toast.success(`Request from ${request.employeeName} approved`);
  };

  const handleReject = (request: RegularizationRequest) => {
    setRequests(
      requests.map((r) =>
        r.id === request.id ? { ...r, status: "rejected" as const } : r
      )
    );
    toast.error(`Request from ${request.employeeName} rejected`);
  };

  const getStatusBadge = (status: RegularizationRequest["status"]) => {
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

  const getRequestTypeBadge = (type: RegularizationRequest["requestType"]) => {
    const labels = {
      personal_info: "Personal Info",
      work_info: "Work Info",
      contact_info: "Contact Info",
      bank_details: "Bank Details",
      address: "Address",
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

  const columns: Column<RegularizationRequest>[] = [
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
      key: "fieldName",
      header: "Field",
      searchable: true,
      sortable: true,
      className: "text-foreground whitespace-nowrap font-medium",
    },
    {
      key: "oldValue",
      header: "Old Value",
      sortable: false,
      className: "text-muted-foreground max-w-[150px]",
      render: (request) => (
        <span className="truncate block max-w-[150px]" title={request.oldValue}>
          {request.oldValue}
        </span>
      ),
    },
    {
      key: "newValue",
      header: "New Value",
      sortable: false,
      className: "text-foreground max-w-[150px]",
      render: (request) => (
        <span className="truncate block max-w-[150px] font-medium" title={request.newValue}>
          {request.newValue}
        </span>
      ),
    },
    {
      key: "requestDate",
      header: "Request Date",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (request) => formatDate(request.requestDate),
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
        { label: "Personal Info", value: "personal_info" },
        { label: "Work Info", value: "work_info" },
        { label: "Contact Info", value: "contact_info" },
        { label: "Bank Details", value: "bank_details" },
        { label: "Address", value: "address" },
      ],
    },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Details Regularization</h1>
          <p className="text-muted-foreground mt-1">Review and manage employee profile update requests</p>
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
    </AdminLayout>
  );
};

export default DetailsRegularization;
