import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Package, Laptop, Monitor, Smartphone, Car, Armchair, Plus, Pencil, Trash2, Eye, Wrench } from "lucide-react";
import { toast } from "sonner";

interface Asset {
  id: string;
  assetId: string;
  name: string;
  category: string;
  brand: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  purchasePrice: number;
  currentValue: number;
  assignedTo: string | null;
  location: string;
  status: "Available" | "Assigned" | "Under Maintenance" | "Retired" | "Lost";
  condition: "Excellent" | "Good" | "Fair" | "Poor";
}

const sampleAssets: Asset[] = [
  { id: "1", assetId: "AST-001", name: "MacBook Pro 14\"", category: "Laptop", brand: "Apple", model: "MacBook Pro M3", serialNumber: "C02XL1TYJGH5", purchaseDate: "2024-01-15", purchasePrice: 199999, currentValue: 175000, assignedTo: "John Doe", location: "Mumbai HQ", status: "Assigned", condition: "Excellent" },
  { id: "2", assetId: "AST-002", name: "Dell OptiPlex 7090", category: "Desktop", brand: "Dell", model: "OptiPlex 7090", serialNumber: "DELL7090X123", purchaseDate: "2023-06-20", purchasePrice: 85000, currentValue: 68000, assignedTo: null, location: "Mumbai HQ", status: "Available", condition: "Good" },
  { id: "3", assetId: "AST-003", name: "iPhone 15 Pro", category: "Mobile Phone", brand: "Apple", model: "iPhone 15 Pro 256GB", serialNumber: "DNQXR2GHPLJK", purchaseDate: "2024-02-10", purchasePrice: 134900, currentValue: 120000, assignedTo: "Jane Smith", location: "Delhi Branch", status: "Assigned", condition: "Excellent" },
  { id: "4", assetId: "AST-004", name: "LG UltraWide Monitor", category: "Monitor", brand: "LG", model: "34WN80C-B", serialNumber: "LG34WN123456", purchaseDate: "2023-03-05", purchasePrice: 45000, currentValue: 35000, assignedTo: "Mike Johnson", location: "Bangalore Branch", status: "Assigned", condition: "Good" },
  { id: "5", assetId: "AST-005", name: "Toyota Innova Crysta", category: "Vehicle", brand: "Toyota", model: "Innova Crysta GX", serialNumber: "MH12AB1234", purchaseDate: "2022-08-15", purchasePrice: 1850000, currentValue: 1400000, assignedTo: "Sales Team", location: "Mumbai HQ", status: "Assigned", condition: "Good" },
  { id: "6", assetId: "AST-006", name: "Ergonomic Office Chair", category: "Furniture", brand: "Herman Miller", model: "Aeron Chair", serialNumber: "HM-AERON-456", purchaseDate: "2023-01-10", purchasePrice: 95000, currentValue: 80000, assignedTo: null, location: "Mumbai HQ", status: "Available", condition: "Excellent" },
  { id: "7", assetId: "AST-007", name: "HP LaserJet Printer", category: "Printer", brand: "HP", model: "LaserJet Pro M404dn", serialNumber: "HP404DN789", purchaseDate: "2023-04-22", purchasePrice: 32000, currentValue: 25000, assignedTo: null, location: "Delhi Branch", status: "Under Maintenance", condition: "Fair" },
  { id: "8", assetId: "AST-008", name: "ThinkPad X1 Carbon", category: "Laptop", brand: "Lenovo", model: "ThinkPad X1 Carbon Gen 11", serialNumber: "LNV-X1C-789", purchaseDate: "2024-03-01", purchasePrice: 165000, currentValue: 155000, assignedTo: "Sarah Wilson", location: "Bangalore Branch", status: "Assigned", condition: "Excellent" },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Laptop":
    case "Desktop":
      return <Laptop className="h-4 w-4" />;
    case "Monitor":
      return <Monitor className="h-4 w-4" />;
    case "Mobile Phone":
      return <Smartphone className="h-4 w-4" />;
    case "Vehicle":
      return <Car className="h-4 w-4" />;
    case "Furniture":
      return <Armchair className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusBadge = (status: Asset["status"]) => {
  const variants: Record<Asset["status"], "default" | "secondary" | "destructive" | "outline"> = {
    Available: "default",
    Assigned: "secondary",
    "Under Maintenance": "outline",
    Retired: "destructive",
    Lost: "destructive",
  };
  return <Badge variant={variants[status]}>{status}</Badge>;
};

const getConditionBadge = (condition: Asset["condition"]) => {
  const colors: Record<Asset["condition"], string> = {
    Excellent: "bg-green-500/10 text-green-500",
    Good: "bg-blue-500/10 text-blue-500",
    Fair: "bg-yellow-500/10 text-yellow-500",
    Poor: "bg-red-500/10 text-red-500",
  };
  return <Badge className={colors[condition]} variant="outline">{condition}</Badge>;
};

export default function AllAssets() {
  const [assets, setAssets] = useState<Asset[]>(sampleAssets);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    model: "",
    serialNumber: "",
    purchaseDate: "",
    purchasePrice: "",
    location: "",
    status: "Available" as Asset["status"],
    condition: "Good" as Asset["condition"],
  });

  const totalAssets = assets.length;
  const assignedAssets = assets.filter(a => a.status === "Assigned").length;
  const availableAssets = assets.filter(a => a.status === "Available").length;
  const maintenanceAssets = assets.filter(a => a.status === "Under Maintenance").length;

  const columns: Column<Asset>[] = [
    {
      key: "assetId",
      header: "Asset ID",
      render: (asset) => (
        <div className="flex items-center gap-2">
          {getCategoryIcon(asset.category)}
          <span className="font-medium">{asset.assetId}</span>
        </div>
      ),
    },
    {
      key: "name",
      header: "Asset Name",
      sortable: true,
      searchable: true,
      render: (asset) => (
        <div>
          <p className="font-medium">{asset.name}</p>
          <p className="text-xs text-muted-foreground">{asset.brand} {asset.model}</p>
        </div>
      ),
    },
    { key: "category", header: "Category", sortable: true },
    { key: "serialNumber", header: "Serial Number" },
    {
      key: "purchasePrice",
      header: "Purchase Price",
      sortable: true,
      render: (asset) => `₹${asset.purchasePrice.toLocaleString()}`,
    },
    {
      key: "currentValue",
      header: "Current Value",
      render: (asset) => `₹${asset.currentValue.toLocaleString()}`,
    },
    {
      key: "assignedTo",
      header: "Assigned To",
      render: (asset) => asset.assignedTo || <span className="text-muted-foreground">Unassigned</span>,
    },
    { key: "location", header: "Location" },
    {
      key: "status",
      header: "Status",
      render: (asset) => getStatusBadge(asset.status),
    },
    {
      key: "condition",
      header: "Condition",
      render: (asset) => getConditionBadge(asset.condition),
    },
    {
      key: "actions",
      header: "Actions",
      render: (asset) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(asset)}>
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Wrench className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(asset.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "category",
      label: "Category",
      options: [
        { label: "Laptop", value: "Laptop" },
        { label: "Desktop", value: "Desktop" },
        { label: "Monitor", value: "Monitor" },
        { label: "Mobile Phone", value: "Mobile Phone" },
        { label: "Vehicle", value: "Vehicle" },
        { label: "Furniture", value: "Furniture" },
        { label: "Printer", value: "Printer" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Available", value: "Available" },
        { label: "Assigned", value: "Assigned" },
        { label: "Under Maintenance", value: "Under Maintenance" },
        { label: "Retired", value: "Retired" },
        { label: "Lost", value: "Lost" },
      ],
    },
    {
      key: "location",
      label: "Location",
      options: [
        { label: "Mumbai HQ", value: "Mumbai HQ" },
        { label: "Delhi Branch", value: "Delhi Branch" },
        { label: "Bangalore Branch", value: "Bangalore Branch" },
      ],
    },
    {
      key: "condition",
      label: "Condition",
      options: [
        { label: "Excellent", value: "Excellent" },
        { label: "Good", value: "Good" },
        { label: "Fair", value: "Fair" },
        { label: "Poor", value: "Poor" },
      ],
    },
  ];

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setFormData({
      name: asset.name,
      category: asset.category,
      brand: asset.brand,
      model: asset.model,
      serialNumber: asset.serialNumber,
      purchaseDate: asset.purchaseDate,
      purchasePrice: asset.purchasePrice.toString(),
      location: asset.location,
      status: asset.status,
      condition: asset.condition,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
    toast.success("Asset deleted successfully");
  };

  const handleSubmit = () => {
    if (editingAsset) {
      setAssets(assets.map(a => a.id === editingAsset.id ? {
        ...a,
        ...formData,
        purchasePrice: parseInt(formData.purchasePrice),
        currentValue: parseInt(formData.purchasePrice) * 0.85,
      } : a));
      toast.success("Asset updated successfully");
    } else {
      const newAsset: Asset = {
        id: Date.now().toString(),
        assetId: `AST-${String(assets.length + 1).padStart(3, "0")}`,
        ...formData,
        purchasePrice: parseInt(formData.purchasePrice),
        currentValue: parseInt(formData.purchasePrice) * 0.85,
        assignedTo: null,
      };
      setAssets([...assets, newAsset]);
      toast.success("Asset added successfully");
    }
    setDialogOpen(false);
    setEditingAsset(null);
    setFormData({ name: "", category: "", brand: "", model: "", serialNumber: "", purchaseDate: "", purchasePrice: "", location: "", status: "Available", condition: "Good" });
  };

  return (
    <AdminLayout noPadding>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">All Assets</h1>
            <p className="text-muted-foreground">Manage your organization's asset inventory</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => { setEditingAsset(null); setFormData({ name: "", category: "", brand: "", model: "", serialNumber: "", purchaseDate: "", purchasePrice: "", location: "", status: "Available", condition: "Good" }); }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Asset
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{editingAsset ? "Edit Asset" : "Add New Asset"}</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-4">
                <div className="space-y-2">
                  <Label>Asset Name</Label>
                  <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="e.g., MacBook Pro 14" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Laptop">Laptop</SelectItem>
                      <SelectItem value="Desktop">Desktop</SelectItem>
                      <SelectItem value="Monitor">Monitor</SelectItem>
                      <SelectItem value="Mobile Phone">Mobile Phone</SelectItem>
                      <SelectItem value="Vehicle">Vehicle</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Printer">Printer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Input value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} placeholder="e.g., Apple" />
                </div>
                <div className="space-y-2">
                  <Label>Model</Label>
                  <Input value={formData.model} onChange={(e) => setFormData({ ...formData, model: e.target.value })} placeholder="e.g., MacBook Pro M3" />
                </div>
                <div className="space-y-2">
                  <Label>Serial Number</Label>
                  <Input value={formData.serialNumber} onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })} placeholder="e.g., C02XL1TYJGH5" />
                </div>
                <div className="space-y-2">
                  <Label>Purchase Date</Label>
                  <Input type="date" value={formData.purchaseDate} onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Purchase Price (₹)</Label>
                  <Input type="number" value={formData.purchasePrice} onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })} placeholder="e.g., 199999" />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Select value={formData.location} onValueChange={(v) => setFormData({ ...formData, location: v })}>
                    <SelectTrigger><SelectValue placeholder="Select location" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mumbai HQ">Mumbai HQ</SelectItem>
                      <SelectItem value="Delhi Branch">Delhi Branch</SelectItem>
                      <SelectItem value="Bangalore Branch">Bangalore Branch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as Asset["status"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Assigned">Assigned</SelectItem>
                      <SelectItem value="Under Maintenance">Under Maintenance</SelectItem>
                      <SelectItem value="Retired">Retired</SelectItem>
                      <SelectItem value="Lost">Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select value={formData.condition} onValueChange={(v) => setFormData({ ...formData, condition: v as Asset["condition"] })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSubmit}>{editingAsset ? "Update" : "Add"} Asset</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatsCard title="Total Assets" value={String(totalAssets)} icon={Package} />
          <StatsCard title="Assigned" value={String(assignedAssets)} icon={Package} />
          <StatsCard title="Available" value={String(availableAssets)} icon={Package} />
          <StatsCard title="Under Maintenance" value={String(maintenanceAssets)} icon={Wrench} />
        </div>

        <DataTable data={assets} columns={columns} filters={filters} searchPlaceholder="Search assets..." />
      </div>
    </AdminLayout>
  );
}