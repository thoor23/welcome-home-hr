import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DataTable, Column } from "@/components/ui/data-table";
import { Plus, Receipt, Clock, CheckCircle, XCircle, Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BillingRequest {
  id: string;
  requestId: string;
  branch: string;
  branchCode: string;
  requestType: string;
  description: string;
  amount: number;
  priority: "High" | "Medium" | "Low";
  requestedBy: string;
  requestedDate: string;
  status: "Pending" | "Approved" | "Partially Approved" | "Rejected" | "Disbursed";
}

const mockRequests: BillingRequest[] = [
  { id: "1", requestId: "BR-2026-001", branch: "Delhi Branch", branchCode: "DEL-001", requestType: "Salary Budget", description: "January salary allocation for 45 employees", amount: 1500000, priority: "High", requestedBy: "Rajesh Kumar", requestedDate: "2026-01-02", status: "Pending" },
  { id: "2", requestId: "BR-2026-002", branch: "Bangalore Hub", branchCode: "BLR-001", requestType: "IT Equipment", description: "5 Laptops for new developers", amount: 350000, priority: "Medium", requestedBy: "Priya Sharma", requestedDate: "2025-12-28", status: "Approved" },
  { id: "3", requestId: "BR-2026-003", branch: "Pune Warehouse", branchCode: "PUN-001", requestType: "Maintenance", description: "HVAC system repair and servicing", amount: 75000, priority: "Low", requestedBy: "Amit Patel", requestedDate: "2025-12-25", status: "Disbursed" },
  { id: "4", requestId: "BR-2026-004", branch: "Mumbai Store", branchCode: "MUM-002", requestType: "Marketing", description: "Q1 local marketing campaign", amount: 125000, priority: "Medium", requestedBy: "Neha Gupta", requestedDate: "2025-12-20", status: "Rejected" },
  { id: "5", requestId: "BR-2026-005", branch: "Chennai Factory", branchCode: "CHN-001", requestType: "Utilities", description: "Electricity and water bills for January", amount: 200000, priority: "High", requestedBy: "Suresh Iyer", requestedDate: "2026-01-01", status: "Pending" },
  { id: "6", requestId: "BR-2026-006", branch: "Hyderabad Office", branchCode: "HYD-001", requestType: "Office Supplies", description: "Stationery and office furniture", amount: 85000, priority: "Low", requestedBy: "Kavitha Reddy", requestedDate: "2025-12-22", status: "Partially Approved" },
];

const BillingRequests = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status: BillingRequest["status"]) => {
    switch (status) {
      case "Pending":
        return <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "Approved":
        return <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "Partially Approved":
        return <Badge variant="secondary" className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20"><CheckCircle className="h-3 w-3 mr-1" />Partially Approved</Badge>;
      case "Rejected":
        return <Badge variant="secondary" className="bg-rose-500/10 text-rose-600 hover:bg-rose-500/20"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      case "Disbursed":
        return <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20"><CheckCircle className="h-3 w-3 mr-1" />Disbursed</Badge>;
    }
  };

  const getPriorityBadge = (priority: BillingRequest["priority"]) => {
    switch (priority) {
      case "High":
        return <Badge variant="destructive">High</Badge>;
      case "Medium":
        return <Badge variant="secondary">Medium</Badge>;
      case "Low":
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const columns: Column<BillingRequest>[] = [
    { key: "requestId", header: "Request ID" },
    { 
      key: "branch", 
      header: "Branch/Location",
      render: (row) => (
        <div>
          <p className="font-medium">{row.branch}</p>
          <p className="text-sm text-muted-foreground">{row.branchCode}</p>
        </div>
      )
    },
    { key: "requestType", header: "Request Type" },
    { 
      key: "description", 
      header: "Description",
      render: (row) => (
        <p className="max-w-[200px] truncate">{row.description}</p>
      )
    },
    { 
      key: "amount", 
      header: "Amount",
      render: (row) => `₹${row.amount.toLocaleString("en-IN")}`
    },
    { 
      key: "priority", 
      header: "Priority",
      render: (row) => getPriorityBadge(row.priority)
    },
    { key: "requestedBy", header: "Requested By" },
    { 
      key: "requestedDate", 
      header: "Date",
      render: (row) => new Date(row.requestedDate).toLocaleDateString("en-IN")
    },
    { 
      key: "status", 
      header: "Status",
      render: (row) => getStatusBadge(row.status)
    },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Request</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Cancel Request</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  const stats = {
    totalRequests: mockRequests.length,
    pending: mockRequests.filter(r => r.status === "Pending").length,
    approvedAmount: mockRequests.filter(r => r.status === "Approved" || r.status === "Disbursed").reduce((sum, r) => sum + r.amount, 0),
    rejected: mockRequests.filter(r => r.status === "Rejected").length,
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Budget Requests</h1>
          <p className="text-muted-foreground mt-1">Create and manage budget/fund requests from branches</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Create Budget Request</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Branch/Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="del">Delhi Branch</SelectItem>
                    <SelectItem value="blr">Bangalore Hub</SelectItem>
                    <SelectItem value="mum">Mumbai Store</SelectItem>
                    <SelectItem value="pun">Pune Warehouse</SelectItem>
                    <SelectItem value="chn">Chennai Factory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Request Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">Salary Budget</SelectItem>
                    <SelectItem value="expense">Operational Expense</SelectItem>
                    <SelectItem value="resource">Resource/Equipment</SelectItem>
                    <SelectItem value="it">IT Requirements</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="training">Training & Development</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description/Purpose</Label>
                <Textarea placeholder="Describe the purpose of this request..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Amount (₹)</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Required By Date</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Supporting Notes (Optional)</Label>
                <Textarea placeholder="Any additional notes..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)}>Submit Request</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={mockRequests} />
    </AdminLayout>
  );
};

export default BillingRequests;
