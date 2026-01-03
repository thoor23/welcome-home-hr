import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Receipt, 
  Search, 
  Filter, 
  Eye, 
  Download, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  IndianRupee,
  Calendar,
  TrendingUp,
  FileText,
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";

interface ExpenseClaim {
  id: string;
  title: string;
  date: string;
  category: string;
  items: number;
  amount: number;
  status: "pending" | "approved" | "rejected" | "processing";
  approver: string;
  submittedDate: string;
  processedDate?: string;
  remarks?: string;
}

const claimsData: ExpenseClaim[] = [
  {
    id: "EXP-2024-048",
    title: "December Client Visit - Mumbai",
    date: "Dec 28, 2024",
    category: "Travel",
    items: 5,
    amount: 12500,
    status: "pending",
    approver: "Rajesh Kumar",
    submittedDate: "Dec 30, 2024"
  },
  {
    id: "EXP-2024-045",
    title: "Office Supplies - Q4",
    date: "Dec 25, 2024",
    category: "Office",
    items: 3,
    amount: 3500,
    status: "approved",
    approver: "Priya Sharma",
    submittedDate: "Dec 26, 2024",
    processedDate: "Dec 28, 2024"
  },
  {
    id: "EXP-2024-042",
    title: "Team Lunch - Project Completion",
    date: "Dec 20, 2024",
    category: "Food",
    items: 1,
    amount: 4200,
    status: "processing",
    approver: "Amit Singh",
    submittedDate: "Dec 21, 2024"
  },
  {
    id: "EXP-2024-038",
    title: "Bangalore Conference Travel",
    date: "Dec 15, 2024",
    category: "Travel",
    items: 8,
    amount: 28500,
    status: "approved",
    approver: "Rajesh Kumar",
    submittedDate: "Dec 16, 2024",
    processedDate: "Dec 18, 2024"
  },
  {
    id: "EXP-2024-035",
    title: "Mobile Recharge - Work",
    date: "Dec 10, 2024",
    category: "Communication",
    items: 1,
    amount: 499,
    status: "rejected",
    approver: "Priya Sharma",
    submittedDate: "Dec 11, 2024",
    processedDate: "Dec 12, 2024",
    remarks: "Personal mobile recharge not covered under policy"
  },
  {
    id: "EXP-2024-030",
    title: "Training Workshop Materials",
    date: "Dec 5, 2024",
    category: "Training",
    items: 4,
    amount: 5800,
    status: "approved",
    approver: "Amit Singh",
    submittedDate: "Dec 6, 2024",
    processedDate: "Dec 8, 2024"
  },
];

const statusConfig = {
  pending: { label: "Pending", icon: Clock, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  approved: { label: "Approved", icon: CheckCircle2, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  rejected: { label: "Rejected", icon: XCircle, color: "bg-red-500/10 text-red-600 border-red-500/20" },
  processing: { label: "Processing", icon: AlertCircle, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
};

export default function ExpenseClaims() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClaim, setSelectedClaim] = useState<ExpenseClaim | null>(null);

  const filteredClaims = claimsData.filter(claim => {
    const matchesSearch = claim.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: claimsData.reduce((sum, c) => sum + c.amount, 0),
    pending: claimsData.filter(c => c.status === "pending").reduce((sum, c) => sum + c.amount, 0),
    approved: claimsData.filter(c => c.status === "approved").reduce((sum, c) => sum + c.amount, 0),
    thisMonth: claimsData.filter(c => c.date.includes("Dec")).reduce((sum, c) => sum + c.amount, 0),
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Expense Claims</h1>
            <p className="text-muted-foreground mt-1">Track and manage your expense reimbursement requests</p>
          </div>
          <Link to="/ess/expenses/submit">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Claim
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <IndianRupee className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Claims</p>
                  <p className="text-2xl font-bold">₹{stats.total.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-yellow-500/10">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">₹{stats.pending.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-500/10">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold">₹{stats.approved.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold">₹{stats.thisMonth.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Claims Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Claims History</CardTitle>
                <CardDescription>View all your submitted expense claims</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search claims..." 
                    className="pl-10 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map((claim) => {
                    const statusInfo = statusConfig[claim.status];
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{claim.title}</p>
                            <p className="text-xs text-muted-foreground">{claim.date}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{claim.category}</Badge>
                        </TableCell>
                        <TableCell>{claim.items}</TableCell>
                        <TableCell className="font-medium">₹{claim.amount.toLocaleString('en-IN')}</TableCell>
                        <TableCell>
                          <Badge className={statusInfo.color} variant="outline">
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{claim.submittedDate}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" onClick={() => setSelectedClaim(claim)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>{claim.title}</DialogTitle>
                                  <DialogDescription>Claim ID: {claim.id}</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 mt-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-muted-foreground">Category</p>
                                      <p className="font-medium">{claim.category}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Amount</p>
                                      <p className="font-medium text-lg">₹{claim.amount.toLocaleString('en-IN')}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Items</p>
                                      <p className="font-medium">{claim.items} expense(s)</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Status</p>
                                      <Badge className={statusConfig[claim.status].color} variant="outline">
                                        {statusConfig[claim.status].label}
                                      </Badge>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Submitted On</p>
                                      <p className="font-medium">{claim.submittedDate}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-muted-foreground">Approver</p>
                                      <p className="font-medium">{claim.approver}</p>
                                    </div>
                                    {claim.processedDate && (
                                      <div className="col-span-2">
                                        <p className="text-sm text-muted-foreground">Processed On</p>
                                        <p className="font-medium">{claim.processedDate}</p>
                                      </div>
                                    )}
                                    {claim.remarks && (
                                      <div className="col-span-2">
                                        <p className="text-sm text-muted-foreground">Remarks</p>
                                        <p className="font-medium text-red-600">{claim.remarks}</p>
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button variant="outline" className="flex-1">
                                      <Download className="h-4 w-4 mr-2" />
                                      Download
                                    </Button>
                                    {claim.status === "pending" && (
                                      <Button variant="destructive" className="flex-1">
                                        Cancel Claim
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            
            {filteredClaims.length === 0 && (
              <div className="text-center py-12">
                <Receipt className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No claims found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ESSLayout>
  );
}
