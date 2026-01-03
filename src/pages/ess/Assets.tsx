import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Package, 
  Search, 
  Filter,
  Laptop,
  Smartphone,
  Monitor,
  Headphones,
  Mouse,
  Keyboard,
  HardDrive,
  Car,
  CreditCard,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  History
} from "lucide-react";
import { toast } from "sonner";

interface Asset {
  id: string;
  name: string;
  category: string;
  type: "laptop" | "phone" | "monitor" | "headset" | "mouse" | "keyboard" | "storage" | "vehicle" | "card" | "other";
  serialNumber: string;
  assignedDate: string;
  condition: "excellent" | "good" | "fair" | "needs_repair";
  status: "active" | "maintenance" | "returned";
  specifications?: string;
  notes?: string;
  warrantyExpiry?: string;
  value?: string;
}

const assetsData: Asset[] = [
  {
    id: "AST-001",
    name: "MacBook Pro 14\" M3",
    category: "Computing",
    type: "laptop",
    serialNumber: "C02XL3FDJGH5",
    assignedDate: "Jan 20, 2023",
    condition: "excellent",
    status: "active",
    specifications: "Apple M3 Pro, 18GB RAM, 512GB SSD",
    warrantyExpiry: "Jan 20, 2026",
    value: "₹1,89,900"
  },
  {
    id: "AST-002",
    name: "iPhone 15 Pro",
    category: "Mobile",
    type: "phone",
    serialNumber: "DNPXK2LQHFJ2",
    assignedDate: "Sep 25, 2023",
    condition: "excellent",
    status: "active",
    specifications: "256GB, Space Black",
    warrantyExpiry: "Sep 25, 2025",
    value: "₹1,34,900"
  },
  {
    id: "AST-003",
    name: "Dell UltraSharp 27\" 4K Monitor",
    category: "Display",
    type: "monitor",
    serialNumber: "CN0J2K5M7890",
    assignedDate: "Jan 20, 2023",
    condition: "good",
    status: "active",
    specifications: "U2723QE, USB-C Hub",
    warrantyExpiry: "Jan 20, 2026",
    value: "₹52,000"
  },
  {
    id: "AST-004",
    name: "Sony WH-1000XM5",
    category: "Audio",
    type: "headset",
    serialNumber: "S01-2345678",
    assignedDate: "Mar 15, 2023",
    condition: "good",
    status: "active",
    specifications: "Noise Cancelling, Bluetooth",
    warrantyExpiry: "Mar 15, 2025",
    value: "₹29,990"
  },
  {
    id: "AST-005",
    name: "Logitech MX Master 3S",
    category: "Peripherals",
    type: "mouse",
    serialNumber: "2147LXMM3S",
    assignedDate: "Jan 20, 2023",
    condition: "good",
    status: "active",
    specifications: "Wireless, USB-C",
    value: "₹9,495"
  },
  {
    id: "AST-006",
    name: "Apple Magic Keyboard",
    category: "Peripherals",
    type: "keyboard",
    serialNumber: "FVFYK3KMJK78",
    assignedDate: "Jan 20, 2023",
    condition: "fair",
    status: "maintenance",
    specifications: "Touch ID, Numeric Keypad",
    notes: "Keys sticking - sent for repair",
    value: "₹19,500"
  },
  {
    id: "AST-007",
    name: "Company Vehicle - Honda City",
    category: "Vehicle",
    type: "vehicle",
    serialNumber: "MH12AB1234",
    assignedDate: "Jun 01, 2023",
    condition: "excellent",
    status: "active",
    specifications: "2023 Model, ZX CVT Petrol",
    notes: "For official use only",
    value: "₹14,50,000"
  },
  {
    id: "AST-008",
    name: "Corporate Credit Card",
    category: "Financial",
    type: "card",
    serialNumber: "XXXX-XXXX-XXXX-4523",
    assignedDate: "Feb 01, 2023",
    condition: "excellent",
    status: "active",
    specifications: "Limit: ₹50,000/month",
    notes: "For business expenses only"
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "computing", label: "Computing" },
  { value: "mobile", label: "Mobile" },
  { value: "display", label: "Display" },
  { value: "audio", label: "Audio" },
  { value: "peripherals", label: "Peripherals" },
  { value: "vehicle", label: "Vehicle" },
  { value: "financial", label: "Financial" },
];

const getAssetIcon = (type: Asset["type"]) => {
  const iconClass = "h-6 w-6";
  switch (type) {
    case "laptop":
      return <Laptop className={`${iconClass} text-blue-500`} />;
    case "phone":
      return <Smartphone className={`${iconClass} text-purple-500`} />;
    case "monitor":
      return <Monitor className={`${iconClass} text-cyan-500`} />;
    case "headset":
      return <Headphones className={`${iconClass} text-pink-500`} />;
    case "mouse":
      return <Mouse className={`${iconClass} text-orange-500`} />;
    case "keyboard":
      return <Keyboard className={`${iconClass} text-green-500`} />;
    case "storage":
      return <HardDrive className={`${iconClass} text-slate-500`} />;
    case "vehicle":
      return <Car className={`${iconClass} text-red-500`} />;
    case "card":
      return <CreditCard className={`${iconClass} text-yellow-500`} />;
    default:
      return <Package className={`${iconClass} text-muted-foreground`} />;
  }
};

const conditionConfig = {
  excellent: { label: "Excellent", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  good: { label: "Good", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  fair: { label: "Fair", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  needs_repair: { label: "Needs Repair", color: "bg-red-500/10 text-red-600 border-red-500/20" },
};

const statusConfig = {
  active: { label: "Active", icon: CheckCircle2, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  maintenance: { label: "Maintenance", icon: Clock, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  returned: { label: "Returned", icon: History, color: "bg-muted text-muted-foreground border-border" },
};

export default function Assets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredAssets = assetsData.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.serialNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || asset.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: assetsData.length,
    active: assetsData.filter(a => a.status === "active").length,
    maintenance: assetsData.filter(a => a.status === "maintenance").length,
    totalValue: assetsData.reduce((sum, a) => {
      const value = a.value ? parseFloat(a.value.replace(/[₹,]/g, '')) : 0;
      return sum + value;
    }, 0),
  };

  const handleReportIssue = (asset: Asset) => {
    toast.success(`Issue report submitted for ${asset.name}`);
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Assets</h1>
            <p className="text-muted-foreground mt-1">View all company assets assigned to you</p>
          </div>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Download Asset List
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Assets</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
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
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">{stats.active}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-yellow-500/10">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">In Maintenance</p>
                  <p className="text-2xl font-bold">{stats.maintenance}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-xl font-bold">₹{(stats.totalValue / 100000).toFixed(1)}L</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assets List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Assigned Assets</CardTitle>
                <CardDescription>All assets currently assigned to you</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search assets..." 
                    className="pl-10 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-44">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAssets.map((asset) => {
                const StatusIcon = statusConfig[asset.status].icon;
                
                return (
                  <div 
                    key={asset.id} 
                    className="group p-4 border border-border rounded-xl bg-card hover:bg-muted/50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-muted">
                        {getAssetIcon(asset.type)}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline" className={statusConfig[asset.status].color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[asset.status].label}
                        </Badge>
                        <Badge variant="outline" className={conditionConfig[asset.condition].color}>
                          {conditionConfig[asset.condition].label}
                        </Badge>
                      </div>
                    </div>
                    
                    <h3 className="font-semibold mb-1">{asset.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{asset.category}</p>
                    <p className="text-xs text-muted-foreground font-mono mb-3">{asset.serialNumber}</p>
                    
                    {asset.specifications && (
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-1">{asset.specifications}</p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pt-3 border-t border-border">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{asset.assignedDate}</span>
                      </div>
                      {asset.value && <span className="font-medium text-foreground">{asset.value}</span>}
                    </div>
                    
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1">
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              {getAssetIcon(asset.type)}
                              {asset.name}
                            </DialogTitle>
                            <DialogDescription>Asset ID: {asset.id}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Category</p>
                                <p className="font-medium">{asset.category}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Serial Number</p>
                                <p className="font-medium font-mono text-sm">{asset.serialNumber}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Assigned Date</p>
                                <p className="font-medium">{asset.assignedDate}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <Badge variant="outline" className={statusConfig[asset.status].color}>
                                  {statusConfig[asset.status].label}
                                </Badge>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Condition</p>
                                <Badge variant="outline" className={conditionConfig[asset.condition].color}>
                                  {conditionConfig[asset.condition].label}
                                </Badge>
                              </div>
                              {asset.value && (
                                <div>
                                  <p className="text-sm text-muted-foreground">Value</p>
                                  <p className="font-medium">{asset.value}</p>
                                </div>
                              )}
                              {asset.specifications && (
                                <div className="col-span-2">
                                  <p className="text-sm text-muted-foreground">Specifications</p>
                                  <p className="font-medium">{asset.specifications}</p>
                                </div>
                              )}
                              {asset.warrantyExpiry && (
                                <div className="col-span-2">
                                  <p className="text-sm text-muted-foreground">Warranty Expiry</p>
                                  <p className="font-medium">{asset.warrantyExpiry}</p>
                                </div>
                              )}
                              {asset.notes && (
                                <div className="col-span-2">
                                  <p className="text-sm text-muted-foreground">Notes</p>
                                  <p className="font-medium text-yellow-600">{asset.notes}</p>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex gap-2 pt-4 border-t">
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => handleReportIssue(asset)}
                              >
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Report Issue
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleReportIssue(asset)}
                      >
                        <AlertTriangle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {filteredAssets.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No assets found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ESSLayout>
  );
}
