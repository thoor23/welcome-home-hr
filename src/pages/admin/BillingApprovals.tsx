import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DataTable, Column } from "@/components/ui/data-table";
import { CheckCircle, XCircle, Timer } from "lucide-react";
import { toast } from "sonner";

interface ApprovalRequest {
  id: string;
  requestId: string;
  branch: string;
  requestType: string;
  amount: number;
  priority: "High" | "Medium" | "Low";
  daysPending: number;
  requestedBy: string;
  status: "Pending" | "Approved" | "Rejected";
}

const mockPendingRequests: ApprovalRequest[] = [
  { id: "1", requestId: "BR-2026-001", branch: "Delhi Branch", requestType: "Salary Budget", amount: 1500000, priority: "High", daysPending: 1, requestedBy: "Rajesh Kumar", status: "Pending" },
  { id: "5", requestId: "BR-2026-005", branch: "Chennai Factory", requestType: "Utilities", amount: 200000, priority: "High", daysPending: 1, requestedBy: "Suresh Iyer", status: "Pending" },
];

const mockApprovedRequests: ApprovalRequest[] = [
  { id: "2", requestId: "BR-2026-002", branch: "Bangalore Hub", requestType: "IT Equipment", amount: 350000, priority: "Medium", daysPending: 0, requestedBy: "Priya Sharma", status: "Approved" },
];

const mockRejectedRequests: ApprovalRequest[] = [
  { id: "4", requestId: "BR-2026-004", branch: "Mumbai Store", requestType: "Marketing", amount: 125000, priority: "Medium", daysPending: 0, requestedBy: "Neha Gupta", status: "Rejected" },
];

const BillingApprovals = () => {
  const [selectedRequest, setSelectedRequest] = useState<ApprovalRequest | null>(null);
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);

  const getPriorityBadge = (priority: ApprovalRequest["priority"]) => {
    switch (priority) {
      case "High": return <Badge variant="destructive">High</Badge>;
      case "Medium": return <Badge variant="secondary">Medium</Badge>;
      case "Low": return <Badge variant="outline">Low</Badge>;
    }
  };

  const handleApprove = () => {
    toast.success(`Request ${selectedRequest?.requestId} approved successfully`);
    setIsApproveDialogOpen(false);
  };

  const handleReject = () => {
    toast.error(`Request ${selectedRequest?.requestId} rejected`);
    setIsRejectDialogOpen(false);
  };

  const pendingColumns: Column<ApprovalRequest>[] = [
    { key: "requestId", header: "Request ID" },
    { key: "branch", header: "Branch/Location" },
    { key: "requestType", header: "Type" },
    { key: "amount", header: "Amount", render: (row) => `₹${row.amount.toLocaleString("en-IN")}` },
    { key: "priority", header: "Priority", render: (row) => getPriorityBadge(row.priority) },
    { key: "daysPending", header: "Days Pending", render: (row) => <div className="flex items-center gap-1"><Timer className="h-4 w-4 text-muted-foreground" /><span>{row.daysPending} days</span></div> },
    { key: "requestedBy", header: "Requested By" },
    { key: "actions", header: "Actions", render: (row) => (
      <div className="flex items-center gap-2">
        <Button size="sm" onClick={() => { setSelectedRequest(row); setIsApproveDialogOpen(true); }}><CheckCircle className="h-4 w-4 mr-1" />Approve</Button>
        <Button size="sm" variant="destructive" onClick={() => { setSelectedRequest(row); setIsRejectDialogOpen(true); }}><XCircle className="h-4 w-4 mr-1" />Reject</Button>
      </div>
    )}
  ];

  const historyColumns: Column<ApprovalRequest>[] = [
    { key: "requestId", header: "Request ID" },
    { key: "branch", header: "Branch/Location" },
    { key: "requestType", header: "Type" },
    { key: "amount", header: "Amount", render: (row) => `₹${row.amount.toLocaleString("en-IN")}` },
    { key: "priority", header: "Priority", render: (row) => getPriorityBadge(row.priority) },
    { key: "requestedBy", header: "Requested By" },
    { key: "status", header: "Status", render: (row) => row.status === "Approved" ? <Badge className="bg-emerald-500/10 text-emerald-600"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge> : <Badge className="bg-rose-500/10 text-rose-600"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge> },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground font-display">Budget Approvals</h1>
        <p className="text-muted-foreground mt-1">Review and approve budget requests from branches</p>
      </div>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({mockPendingRequests.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({mockApprovedRequests.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({mockRejectedRequests.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="mt-4">
          <DataTable columns={pendingColumns} data={mockPendingRequests} />
        </TabsContent>
        <TabsContent value="approved" className="mt-4">
          <DataTable columns={historyColumns} data={mockApprovedRequests} />
        </TabsContent>
        <TabsContent value="rejected" className="mt-4">
          <DataTable columns={historyColumns} data={mockRejectedRequests} />
        </TabsContent>
      </Tabs>

      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Approve Request</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-muted-foreground">Request ID:</p><p className="font-medium">{selectedRequest?.requestId}</p>
                <p className="text-muted-foreground">Branch:</p><p className="font-medium">{selectedRequest?.branch}</p>
                <p className="text-muted-foreground">Requested Amount:</p><p className="font-medium">₹{selectedRequest?.amount.toLocaleString("en-IN")}</p>
              </div>
            </div>
            <div className="space-y-2"><Label>Approved Amount (₹)</Label><Input type="number" defaultValue={selectedRequest?.amount} /></div>
            <div className="space-y-2"><Label>Remarks</Label><Textarea placeholder="Add any comments..." /></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleApprove}>Approve</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Reject Request</DialogTitle></DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted rounded-lg">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="text-muted-foreground">Request ID:</p><p className="font-medium">{selectedRequest?.requestId}</p>
                <p className="text-muted-foreground">Branch:</p><p className="font-medium">{selectedRequest?.branch}</p>
              </div>
            </div>
            <div className="space-y-2"><Label>Reason for Rejection</Label><Textarea placeholder="Please provide a reason..." /></div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleReject}>Reject</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default BillingApprovals;