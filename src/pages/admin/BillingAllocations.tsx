import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DataTable, Column } from "@/components/ui/data-table";
import { Plus, Wallet, TrendingUp, Clock, Building2, Eye } from "lucide-react";

interface BillingAllocation {
  id: string;
  location: string;
  locationCode: string;
  allocatedBudget: number;
  used: number;
  remaining: number;
  pendingRequests: number;
  pendingAmount: number;
  lastDisbursement: string;
}

const mockAllocations: BillingAllocation[] = [
  { id: "1", location: "Delhi Branch", locationCode: "DEL-001", allocatedBudget: 5000000, used: 3200000, remaining: 1800000, pendingRequests: 2, pendingAmount: 1700000, lastDisbursement: "2025-12-28" },
  { id: "2", location: "Bangalore Hub", locationCode: "BLR-001", allocatedBudget: 4500000, used: 2100000, remaining: 2400000, pendingRequests: 1, pendingAmount: 350000, lastDisbursement: "2025-12-25" },
  { id: "3", location: "Mumbai Store", locationCode: "MUM-002", allocatedBudget: 3000000, used: 2800000, remaining: 200000, pendingRequests: 0, pendingAmount: 0, lastDisbursement: "2025-12-20" },
];

const BillingAllocations = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const columns: Column<BillingAllocation>[] = [
    { key: "location", header: "Location", render: (row) => <div><p className="font-medium">{row.location}</p><p className="text-sm text-muted-foreground">{row.locationCode}</p></div> },
    { key: "allocatedBudget", header: "Allocated Budget (FY)", render: (row) => `₹${(row.allocatedBudget / 100000).toFixed(1)}L` },
    { key: "used", header: "Used", render: (row) => <div className="space-y-1"><span>₹{(row.used / 100000).toFixed(1)}L</span><Progress value={(row.used / row.allocatedBudget) * 100} className="h-2" /></div> },
    { key: "remaining", header: "Remaining", render: (row) => { const pct = (row.remaining / row.allocatedBudget) * 100; return <span className={pct < 20 ? "text-destructive font-medium" : ""}>₹{(row.remaining / 100000).toFixed(1)}L{pct < 20 && <Badge variant="destructive" className="ml-2">Low</Badge>}</span>; } },
    { key: "pendingRequests", header: "Pending Requests", render: (row) => <div><Badge variant="secondary">{row.pendingRequests}</Badge>{row.pendingAmount > 0 && <p className="text-xs text-muted-foreground mt-1">₹{(row.pendingAmount / 100000).toFixed(1)}L</p>}</div> },
    { key: "lastDisbursement", header: "Last Disbursement", render: (row) => new Date(row.lastDisbursement).toLocaleDateString("en-IN") },
    { key: "actions", header: "Actions", render: () => <div className="flex items-center gap-2"><Button variant="outline" size="sm"><Eye className="h-4 w-4 mr-1" />Details</Button><Button variant="outline" size="sm">Add Funds</Button></div> }
  ];

  const totalAllocated = mockAllocations.reduce((sum, a) => sum + a.allocatedBudget, 0);
  const totalDisbursed = mockAllocations.reduce((sum, a) => sum + a.used, 0);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div><h1 className="text-2xl font-bold text-foreground">Budget Allocations</h1><p className="text-muted-foreground">Track approved budgets and fund allocations per location</p></div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}><DialogTrigger asChild><Button><Plus className="h-4 w-4 mr-2" />Add Allocation</Button></DialogTrigger><DialogContent className="max-w-lg"><DialogHeader><DialogTitle>Add Budget Allocation</DialogTitle></DialogHeader><div className="space-y-4 py-4"><div className="space-y-2"><Label>Location</Label><Select><SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger><SelectContent><SelectItem value="del">Delhi Branch</SelectItem><SelectItem value="blr">Bangalore Hub</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Allocation Type</Label><Select><SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger><SelectContent><SelectItem value="annual">Annual Budget</SelectItem><SelectItem value="adhoc">Ad-hoc Allocation</SelectItem></SelectContent></Select></div><div className="space-y-2"><Label>Total Amount (₹)</Label><Input type="number" placeholder="0" /></div><div className="space-y-2"><Label>Remarks</Label><Textarea placeholder="Add any notes..." /></div><div className="flex justify-end gap-2"><Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button><Button onClick={() => setIsDialogOpen(false)}>Add Allocation</Button></div></div></DialogContent></Dialog>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Allocated (FY)</CardTitle><Wallet className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">₹{(totalAllocated / 10000000).toFixed(1)}Cr</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Disbursed Amount</CardTitle><TrendingUp className="h-4 w-4 text-emerald-500" /></CardHeader><CardContent><div className="text-2xl font-bold">₹{(totalDisbursed / 10000000).toFixed(1)}Cr</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending Disbursement</CardTitle><Clock className="h-4 w-4 text-yellow-500" /></CardHeader><CardContent><div className="text-2xl font-bold">₹20.5L</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Active Locations</CardTitle><Building2 className="h-4 w-4 text-blue-500" /></CardHeader><CardContent><div className="text-2xl font-bold">{mockAllocations.length}</div></CardContent></Card>
              </div>
              <Card><CardHeader><CardTitle>Location-wise Allocations</CardTitle></CardHeader><CardContent><DataTable columns={columns} data={mockAllocations} /></CardContent></Card>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default BillingAllocations;
