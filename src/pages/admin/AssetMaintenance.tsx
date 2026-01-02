import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Wrench, Plus, Eye, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface MaintenanceRecord {
  id: string;
  assetName: string;
  assetId: string;
  issueDescription: string;
  reportedBy: string;
  reportedDate: string;
  vendor: string;
  estimatedCost: number;
  actualCost: number | null;
  status: "Pending" | "In Progress" | "Completed";
  completionDate: string | null;
  priority: "Low" | "Medium" | "High" | "Critical";
}

const sampleRecords: MaintenanceRecord[] = [
  { id: "1", assetName: "HP LaserJet Printer", assetId: "AST-007", issueDescription: "Paper jam issue and print quality degraded", reportedBy: "Reception Desk", reportedDate: "2024-11-20", vendor: "HP Service Center", estimatedCost: 5000, actualCost: null, status: "In Progress", completionDate: null, priority: "High" },
  { id: "2", assetName: "Dell OptiPlex 7090", assetId: "AST-002", issueDescription: "System running slow, needs hardware upgrade", reportedBy: "IT Department", reportedDate: "2024-11-25", vendor: "Dell Authorized Service", estimatedCost: 15000, actualCost: null, status: "Pending", completionDate: null, priority: "Medium" },
  { id: "3", assetName: "Toyota Innova Crysta", assetId: "AST-005", issueDescription: "Regular service and oil change", reportedBy: "Admin Team", reportedDate: "2024-11-15", vendor: "Toyota Service Station", estimatedCost: 8000, actualCost: 7500, status: "Completed", completionDate: "2024-11-18", priority: "Low" },
  { id: "4", assetName: "MacBook Pro 14\"", assetId: "AST-001", issueDescription: "Battery replacement needed", reportedBy: "John Doe", reportedDate: "2024-11-28", vendor: "Apple Authorized Service", estimatedCost: 25000, actualCost: null, status: "Pending", completionDate: null, priority: "High" },
  { id: "5", assetName: "LG Monitor 34\"", assetId: "AST-004", issueDescription: "Screen flickering issue", reportedBy: "Mike Johnson", reportedDate: "2024-11-10", vendor: "LG Service Center", estimatedCost: 12000, actualCost: 10500, status: "Completed", completionDate: "2024-11-16", priority: "Medium" },
  { id: "6", assetName: "Network Router", assetId: "AST-020", issueDescription: "Intermittent connectivity issues", reportedBy: "IT Department", reportedDate: "2024-11-29", vendor: "Cisco Support", estimatedCost: 3000, actualCost: null, status: "Pending", completionDate: null, priority: "Critical" },
];

export default function AssetMaintenance() {
  const [records, setRecords] = useState<MaintenanceRecord[]>(sampleRecords);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    assetId: "",
    issueDescription: "",
    vendor: "",
    estimatedCost: "",
    priority: "Medium" as MaintenanceRecord["priority"],
  });

  const pendingRecords = records.filter(r => r.status === "Pending");
  const inProgressRecords = records.filter(r => r.status === "In Progress");
  const completedRecords = records.filter(r => r.status === "Completed");

  const getPriorityBadge = (priority: MaintenanceRecord["priority"]) => {
    const colors: Record<string, string> = {
      Low: "bg-green-500/10 text-green-500",
      Medium: "bg-yellow-500/10 text-yellow-500",
      High: "bg-orange-500/10 text-orange-500",
      Critical: "bg-red-500/10 text-red-500",
    };
    return <Badge className={colors[priority]} variant="outline">{priority}</Badge>;
  };

  const columns: Column<MaintenanceRecord>[] = [
    {
      key: "assetName",
      header: "Asset",
      sortable: true,
      searchable: true,
      render: (record) => (
        <div>
          <p className="font-medium">{record.assetName}</p>
          <p className="text-xs text-muted-foreground">{record.assetId}</p>
        </div>
      ),
    },
    {
      key: "issueDescription",
      header: "Issue",
      render: (record) => <span className="text-sm line-clamp-2">{record.issueDescription}</span>,
    },
    { key: "reportedBy", header: "Reported By" },
    { key: "reportedDate", header: "Reported Date", sortable: true },
    { key: "vendor", header: "Vendor" },
    {
      key: "estimatedCost",
      header: "Est. Cost",
      render: (record) => `₹${record.estimatedCost.toLocaleString()}`,
    },
    {
      key: "actualCost",
      header: "Actual Cost",
      render: (record) => record.actualCost ? `₹${record.actualCost.toLocaleString()}` : "-",
    },
    {
      key: "priority",
      header: "Priority",
      render: (record) => getPriorityBadge(record.priority),
    },
    {
      key: "status",
      header: "Status",
      render: (record) => {
        const variants: Record<string, "default" | "secondary" | "outline"> = {
          Pending: "outline",
          "In Progress": "secondary",
          Completed: "default",
        };
        return <Badge variant={variants[record.status]}>{record.status}</Badge>;
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (record) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          {record.status === "Pending" && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateStatus(record.id, "In Progress")}>
              <Clock className="h-4 w-4" />
            </Button>
          )}
          {record.status === "In Progress" && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateStatus(record.id, "Completed")}>
              <CheckCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "priority",
      label: "Priority",
      options: [
        { label: "Critical", value: "Critical" },
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Low", value: "Low" },
      ],
    },
  ];

  const updateStatus = (id: string, newStatus: MaintenanceRecord["status"]) => {
    setRecords(records.map(r => r.id === id ? {
      ...r,
      status: newStatus,
      completionDate: newStatus === "Completed" ? new Date().toISOString().split("T")[0] : null,
      actualCost: newStatus === "Completed" ? r.estimatedCost : null,
    } : r));
    toast.success(`Maintenance status updated to ${newStatus}`);
  };

  const handleSubmit = () => {
    const newRecord: MaintenanceRecord = {
      id: Date.now().toString(),
      assetName: "Asset Name",
      assetId: formData.assetId,
      issueDescription: formData.issueDescription,
      reportedBy: "Current User",
      reportedDate: new Date().toISOString().split("T")[0],
      vendor: formData.vendor,
      estimatedCost: parseInt(formData.estimatedCost),
      actualCost: null,
      status: "Pending",
      completionDate: null,
      priority: formData.priority,
    };
    setRecords([...records, newRecord]);
    toast.success("Maintenance request created");
    setDialogOpen(false);
    setFormData({ assetId: "", issueDescription: "", vendor: "", estimatedCost: "", priority: "Medium" });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Asset Maintenance</h1>
                <p className="text-muted-foreground">Track repairs and maintenance activities</p>
              </div>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New Request
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create Maintenance Request</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label>Asset</Label>
                      <Select value={formData.assetId} onValueChange={(v) => setFormData({ ...formData, assetId: v })}>
                        <SelectTrigger><SelectValue placeholder="Select asset" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AST-001">MacBook Pro 14\" (AST-001)</SelectItem>
                          <SelectItem value="AST-002">Dell OptiPlex 7090 (AST-002)</SelectItem>
                          <SelectItem value="AST-007">HP LaserJet Printer (AST-007)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Issue Description</Label>
                      <Textarea value={formData.issueDescription} onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })} placeholder="Describe the issue..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Vendor/Service Provider</Label>
                      <Input value={formData.vendor} onChange={(e) => setFormData({ ...formData, vendor: e.target.value })} placeholder="e.g., HP Service Center" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Estimated Cost (₹)</Label>
                        <Input type="number" value={formData.estimatedCost} onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })} placeholder="e.g., 5000" />
                      </div>
                      <div className="space-y-2">
                        <Label>Priority</Label>
                        <Select value={formData.priority} onValueChange={(v) => setFormData({ ...formData, priority: v as MaintenanceRecord["priority"] })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Create Request</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">Pending</span>
                </div>
                <p className="text-2xl font-bold">{pendingRecords.length}</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Wrench className="h-4 w-4" />
                  <span className="text-sm">In Progress</span>
                </div>
                <p className="text-2xl font-bold">{inProgressRecords.length}</p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">Completed</span>
                </div>
                <p className="text-2xl font-bold">{completedRecords.length}</p>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All ({records.length})</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingRecords.length})</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress ({inProgressRecords.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedRecords.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                <DataTable data={records} columns={columns} filters={filters} searchPlaceholder="Search maintenance records..." />
              </TabsContent>
              <TabsContent value="pending" className="mt-4">
                <DataTable data={pendingRecords} columns={columns} filters={filters} searchPlaceholder="Search pending records..." />
              </TabsContent>
              <TabsContent value="in-progress" className="mt-4">
                <DataTable data={inProgressRecords} columns={columns} filters={filters} searchPlaceholder="Search in-progress records..." />
              </TabsContent>
              <TabsContent value="completed" className="mt-4">
                <DataTable data={completedRecords} columns={columns} filters={filters} searchPlaceholder="Search completed records..." />
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}