import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Check, X, Eye, Clock, CheckCircle, XCircle, ArrowRightLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { toast } from "sonner";

interface SwapRequest {
  id: string;
  requestId: string;
  requesterId: string;
  requesterName: string;
  requesterEmail: string;
  requesterPic?: string;
  swapWithId: string;
  swapWithName: string;
  swapWithEmail: string;
  swapWithPic?: string;
  originalShift: string;
  requestedShift: string;
  swapDate: string;
  reason: string;
  status: "Pending" | "Approved" | "Rejected";
  requestedOn: string;
  processedBy?: string;
  processedOn?: string;
  remarks?: string;
}

const initialRequests: SwapRequest[] = [
  {
    id: "1",
    requestId: "SW-2026-001",
    requesterId: "EMP002",
    requesterName: "Priya Sharma",
    requesterEmail: "priya.sharma@company.com",
    swapWithId: "EMP006",
    swapWithName: "Neha Singh",
    swapWithEmail: "neha.singh@company.com",
    originalShift: "Morning Shift",
    requestedShift: "Evening Shift",
    swapDate: "2026-01-15",
    reason: "Personal commitment in the morning",
    status: "Pending",
    requestedOn: "2026-01-10",
  },
  {
    id: "2",
    requestId: "SW-2026-002",
    requesterId: "EMP003",
    requesterName: "Amit Patel",
    requesterEmail: "amit.patel@company.com",
    swapWithId: "EMP007",
    swapWithName: "Rahul Verma",
    swapWithEmail: "rahul.verma@company.com",
    originalShift: "Night Shift",
    requestedShift: "General Shift",
    swapDate: "2026-01-12",
    reason: "Medical appointment during night hours",
    status: "Approved",
    requestedOn: "2026-01-08",
    processedBy: "HR Manager",
    processedOn: "2026-01-09",
    remarks: "Approved as per medical leave policy",
  },
  {
    id: "3",
    requestId: "SW-2026-003",
    requesterId: "EMP004",
    requesterName: "Sneha Reddy",
    requesterEmail: "sneha.reddy@company.com",
    swapWithId: "EMP008",
    swapWithName: "Kavita Joshi",
    swapWithEmail: "kavita.joshi@company.com",
    originalShift: "Evening Shift",
    requestedShift: "Morning Shift",
    swapDate: "2026-01-14",
    reason: "Family event in the evening",
    status: "Pending",
    requestedOn: "2026-01-11",
  },
  {
    id: "4",
    requestId: "SW-2026-004",
    requesterId: "EMP009",
    requesterName: "Arun Kumar",
    requesterEmail: "arun.kumar@company.com",
    swapWithId: "EMP010",
    swapWithName: "Deepak Shah",
    swapWithEmail: "deepak.shah@company.com",
    originalShift: "General Shift",
    requestedShift: "Evening Shift",
    swapDate: "2026-01-13",
    reason: "Course class in the morning",
    status: "Rejected",
    requestedOn: "2026-01-07",
    processedBy: "Department Head",
    processedOn: "2026-01-08",
    remarks: "Swap partner not available on that date",
  },
];

const ShiftSwaps = () => {
  const [requests, setRequests] = useState<SwapRequest[]>(initialRequests);
  const [selectedTab, setSelectedTab] = useState("pending");
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<SwapRequest | null>(null);
  const [approvalAction, setApprovalAction] = useState<"approve" | "reject">("approve");
  const [remarks, setRemarks] = useState("");

  const pendingCount = requests.filter((r) => r.status === "Pending").length;
  const approvedCount = requests.filter((r) => r.status === "Approved").length;
  const rejectedCount = requests.filter((r) => r.status === "Rejected").length;
  const totalCount = requests.length;

  const handleApprovalClick = (request: SwapRequest, action: "approve" | "reject") => {
    setSelectedRequest(request);
    setApprovalAction(action);
    setRemarks("");
    setIsApprovalDialogOpen(true);
  };

  const handleApprovalSubmit = () => {
    if (!selectedRequest) return;

    setRequests((prev) =>
      prev.map((r) =>
        r.id === selectedRequest.id
          ? {
              ...r,
              status: approvalAction === "approve" ? "Approved" : "Rejected",
              processedBy: "Admin User",
              processedOn: new Date().toISOString().split("T")[0],
              remarks,
            }
          : r
      )
    );

    toast.success(`Swap request ${approvalAction === "approve" ? "approved" : "rejected"} successfully`);
    setIsApprovalDialogOpen(false);
    setSelectedRequest(null);
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      Approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      Rejected: "bg-red-500/10 text-red-500 border-red-500/20",
    };
    return (
      <Badge variant="outline" className={colors[status]}>
        {status}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getFilteredData = () => {
    if (selectedTab === "all") return requests;
    return requests.filter((r) => r.status.toLowerCase() === selectedTab);
  };

  const columns: Column<SwapRequest>[] = [
    {
      key: "requestId",
      header: "Request ID",
      sortable: true,
      className: "whitespace-nowrap font-medium",
    },
    {
      key: "requesterName",
      header: "Requester",
      searchable: true,
      sortable: true,
      render: (request) => (
        <div className="flex items-center gap-3 whitespace-nowrap">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={request.requesterPic} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {request.requesterName.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{request.requesterName}</p>
            <p className="text-xs text-muted-foreground">{request.requesterId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "swapWithName",
      header: "Swap With",
      searchable: true,
      sortable: true,
      render: (request) => (
        <div className="flex items-center gap-3 whitespace-nowrap">
          <Avatar className="h-8 w-8 flex-shrink-0">
            <AvatarImage src={request.swapWithPic} />
            <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
              {request.swapWithName.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{request.swapWithName}</p>
            <p className="text-xs text-muted-foreground">{request.swapWithId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "originalShift",
      header: "From Shift",
      sortable: true,
      className: "whitespace-nowrap",
    },
    {
      key: "requestedShift",
      header: "To Shift",
      sortable: true,
      className: "whitespace-nowrap",
    },
    {
      key: "swapDate",
      header: "Swap Date",
      sortable: true,
      className: "whitespace-nowrap",
      render: (request) => formatDate(request.swapDate),
    },
    {
      key: "reason",
      header: "Reason",
      className: "max-w-[200px] truncate",
      render: (request) => (
        <span className="truncate" title={request.reason}>
          {request.reason}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (request) => getStatusBadge(request.status),
    },
    {
      key: "requestedOn",
      header: "Requested On",
      sortable: true,
      className: "whitespace-nowrap",
      render: (request) => formatDate(request.requestedOn),
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
            <DropdownMenuItem onClick={() => toast.info(`Viewing details for ${request.requestId}`)}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            {request.status === "Pending" && (
              <>
                <DropdownMenuItem onClick={() => handleApprovalClick(request, "approve")}>
                  <Check className="h-4 w-4 mr-2 text-emerald-500" />
                  Approve
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleApprovalClick(request, "reject")}>
                  <X className="h-4 w-4 mr-2 text-destructive" />
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
      key: "originalShift",
      label: "From Shift",
      options: [
        { label: "General Shift", value: "General Shift" },
        { label: "Morning Shift", value: "Morning Shift" },
        { label: "Evening Shift", value: "Evening Shift" },
        { label: "Night Shift", value: "Night Shift" },
      ],
    },
    {
      key: "requestedShift",
      label: "To Shift",
      options: [
        { label: "General Shift", value: "General Shift" },
        { label: "Morning Shift", value: "Morning Shift" },
        { label: "Evening Shift", value: "Evening Shift" },
        { label: "Night Shift", value: "Night Shift" },
      ],
    },
  ];

  return (
    <AdminLayout>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-display">Shift Swap Requests</h1>
                <p className="text-muted-foreground mt-1">Manage employee shift swap requests</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Pending Requests"
                value={String(pendingCount)}
                icon={Clock}
              />
              <StatsCard
                title="Approved This Month"
                value={String(approvedCount)}
                icon={CheckCircle}
              />
              <StatsCard
                title="Rejected This Month"
                value={String(rejectedCount)}
                icon={XCircle}
              />
              <StatsCard
                title="Total Swaps (Year)"
                value={String(totalCount)}
                icon={ArrowRightLeft}
              />
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-4">
              <TabsList>
                <TabsTrigger value="pending">
                  Pending
                  {pendingCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {pendingCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
                <TabsTrigger value="all">All</TabsTrigger>
              </TabsList>
            </Tabs>

            <DataTable
              data={getFilteredData()}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search swap requests..."
              selectable
              pageSize={10}
              pageSizeOptions={[10, 25, 50]}
              getRowId={(request) => request.id}
            />

            {/* Approval Dialog */}
            <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {approvalAction === "approve" ? "Approve" : "Reject"} Swap Request
                  </DialogTitle>
                  <DialogDescription>
                    {selectedRequest && (
                      <>
                        {approvalAction === "approve"
                          ? `Approve swap request from ${selectedRequest.requesterName} with ${selectedRequest.swapWithName}?`
                          : `Reject swap request from ${selectedRequest.requesterName}?`}
                      </>
                    )}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {selectedRequest && (
                    <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Request ID:</span>
                        <span className="font-medium">{selectedRequest.requestId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Swap Date:</span>
                        <span className="font-medium">{formatDate(selectedRequest.swapDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">From:</span>
                        <span className="font-medium">{selectedRequest.originalShift}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">To:</span>
                        <span className="font-medium">{selectedRequest.requestedShift}</span>
                      </div>
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="remarks">Remarks</Label>
                    <Textarea
                      id="remarks"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Add any comments or notes..."
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant={approvalAction === "approve" ? "default" : "destructive"}
                    onClick={handleApprovalSubmit}
                  >
                    {approvalAction === "approve" ? "Approve" : "Reject"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
    </AdminLayout>
  );
};

export default ShiftSwaps;
