import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Plus, 
  Eye,
  X,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  CalendarDays,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function LeaveRequests() {
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const { toast } = useToast();

  // Mock leave requests data
  const leaveRequests = [
    {
      id: 1,
      leaveType: "Earned Leave",
      startDate: "2026-01-15",
      endDate: "2026-01-17",
      days: 3,
      reason: "Family vacation planned for winter break",
      status: "pending",
      appliedOn: "2026-01-03",
      approver: "John Manager",
      handoverTo: "Sarah Johnson",
      contactNumber: "+91 98765 43210",
    },
    {
      id: 2,
      leaveType: "Casual Leave",
      startDate: "2026-02-14",
      endDate: "2026-02-14",
      days: 1,
      reason: "Personal work - Bank and government office visits",
      status: "pending",
      appliedOn: "2026-01-02",
      approver: "John Manager",
      handoverTo: "Mike Chen",
      contactNumber: "+91 98765 43210",
    },
    {
      id: 3,
      leaveType: "Sick Leave",
      startDate: "2025-12-20",
      endDate: "2025-12-21",
      days: 2,
      reason: "Feeling unwell, fever and cold symptoms",
      status: "approved",
      appliedOn: "2025-12-20",
      approver: "John Manager",
      approvedOn: "2025-12-20",
      handoverTo: "Emily Davis",
      contactNumber: "+91 98765 43210",
    },
    {
      id: 4,
      leaveType: "Vacation Leave",
      startDate: "2025-12-25",
      endDate: "2025-12-27",
      days: 3,
      reason: "Christmas holidays with family",
      status: "approved",
      appliedOn: "2025-12-15",
      approver: "John Manager",
      approvedOn: "2025-12-16",
      handoverTo: "Alex Wilson",
      contactNumber: "+91 98765 43210",
    },
    {
      id: 5,
      leaveType: "Casual Leave",
      startDate: "2025-11-30",
      endDate: "2025-11-30",
      days: 1,
      reason: "Personal emergency",
      status: "rejected",
      appliedOn: "2025-11-29",
      approver: "John Manager",
      rejectedOn: "2025-11-29",
      rejectionReason: "Critical project deadline on that day, please reschedule",
      handoverTo: "Sarah Johnson",
      contactNumber: "+91 98765 43210",
    },
  ];

  const pendingRequests = leaveRequests.filter(r => r.status === "pending");
  const approvedRequests = leaveRequests.filter(r => r.status === "approved");
  const rejectedRequests = leaveRequests.filter(r => r.status === "rejected");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleViewRequest = (request: any) => {
    setSelectedRequest(request);
    setIsViewOpen(true);
  };

  const handleCancelRequest = (request: any) => {
    setSelectedRequest(request);
    setIsCancelOpen(true);
  };

  const confirmCancel = () => {
    toast({
      title: "Request Cancelled",
      description: "Your leave request has been cancelled successfully",
    });
    setIsCancelOpen(false);
    setSelectedRequest(null);
  };

  const renderTable = (requests: any[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Leave Type</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Days</TableHead>
            <TableHead>Applied On</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{request.leaveType}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="text-foreground">
                      {format(new Date(request.startDate), "MMM d")} 
                      {request.endDate !== request.startDate && ` - ${format(new Date(request.endDate), "MMM d")}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(request.startDate), "yyyy")}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{request.days} day(s)</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(new Date(request.appliedOn), "MMM d, yyyy")}
                </TableCell>
                <TableCell>{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleViewRequest(request)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {request.status === "pending" && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleCancelRequest(request)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <div className="text-muted-foreground">
                  <CalendarDays className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  No requests found
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Leave Requests</h1>
            <p className="text-muted-foreground">Track and manage your leave requests</p>
          </div>
          <Link to="/ess/leaves/apply">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Apply Leave
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-orange-500">{pendingRequests.length}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-500/20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-green-500">{approvedRequests.length}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-500/20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-red-500">{rejectedRequests.length}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-500/20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Requests ({leaveRequests.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedRequests.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardContent className="p-0">
                {renderTable(leaveRequests)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardContent className="p-0">
                {renderTable(pendingRequests)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approved">
            <Card>
              <CardContent className="p-0">
                {renderTable(approvedRequests)}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rejected">
            <Card>
              <CardContent className="p-0">
                {renderTable(rejectedRequests)}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* View Request Dialog */}
        <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Leave Request Details</DialogTitle>
              <DialogDescription>
                {selectedRequest?.leaveType} - {selectedRequest?.days} day(s)
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="font-medium">{format(new Date(selectedRequest.startDate), "PPP")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="font-medium">{format(new Date(selectedRequest.endDate), "PPP")}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Reason</p>
                  <p className="font-medium">{selectedRequest.reason}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Applied On</p>
                    <p className="font-medium">{format(new Date(selectedRequest.appliedOn), "PPP")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Approver</p>
                    <p className="font-medium">{selectedRequest.approver}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Handover To</p>
                    <p className="font-medium">{selectedRequest.handoverTo || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Contact</p>
                    <p className="font-medium">{selectedRequest.contactNumber || "-"}</p>
                  </div>
                </div>
                {selectedRequest.status === "rejected" && selectedRequest.rejectionReason && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm font-medium text-red-500">Rejection Reason</p>
                    <p className="text-sm text-muted-foreground">{selectedRequest.rejectionReason}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewOpen(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Cancel Confirmation Dialog */}
        <Dialog open={isCancelOpen} onOpenChange={setIsCancelOpen}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Cancel Leave Request</DialogTitle>
              <DialogDescription>
                Are you sure you want to cancel this leave request?
              </DialogDescription>
            </DialogHeader>
            {selectedRequest && (
              <div className="py-4">
                <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                  <p className="font-medium">{selectedRequest.leaveType}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedRequest.startDate), "MMM d")} 
                    {selectedRequest.endDate !== selectedRequest.startDate && ` - ${format(new Date(selectedRequest.endDate), "MMM d")}`}
                    , {format(new Date(selectedRequest.startDate), "yyyy")}
                  </p>
                  <p className="text-sm text-muted-foreground">{selectedRequest.days} day(s)</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCancelOpen(false)}>Keep Request</Button>
              <Button variant="destructive" onClick={confirmCancel}>Cancel Request</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ESSLayout>
  );
}
