import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  MapPin, 
  Building2, 
  Store, 
  Warehouse, 
  Factory, 
  Users, 
  Plus,
  Edit,
  Trash2,
  Phone,
  Mail
} from "lucide-react";
import { toast } from "sonner";

interface Location {
  id: string;
  name: string;
  code: string;
  type: "Head Office" | "Branch Office" | "Store" | "Warehouse" | "Factory" | "Other";
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  phone: string;
  email: string;
  manager: string;
  employees: number;
  status: "Active" | "Inactive";
}

const sampleLocations: Location[] = [
  {
    id: "1",
    name: "Corporate Headquarters",
    code: "HQ-MUM",
    type: "Head Office",
    address: "Tower A, Business Park, Andheri East",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    postalCode: "400069",
    phone: "+91 22 1234 5678",
    email: "hq@company.com",
    manager: "Rahul Sharma",
    employees: 250,
    status: "Active",
  },
  {
    id: "2",
    name: "Delhi Branch Office",
    code: "BR-DEL",
    type: "Branch Office",
    address: "Sector 62, Noida",
    city: "New Delhi",
    state: "Delhi NCR",
    country: "India",
    postalCode: "201301",
    phone: "+91 11 2345 6789",
    email: "delhi@company.com",
    manager: "Priya Singh",
    employees: 85,
    status: "Active",
  },
  {
    id: "3",
    name: "Bangalore Tech Hub",
    code: "BR-BLR",
    type: "Branch Office",
    address: "Electronic City Phase 1",
    city: "Bangalore",
    state: "Karnataka",
    country: "India",
    postalCode: "560100",
    phone: "+91 80 3456 7890",
    email: "bangalore@company.com",
    manager: "Karthik Reddy",
    employees: 120,
    status: "Active",
  },
  {
    id: "4",
    name: "Central Warehouse",
    code: "WH-PUN",
    type: "Warehouse",
    address: "MIDC Industrial Area, Chakan",
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    postalCode: "410501",
    phone: "+91 20 4567 8901",
    email: "warehouse@company.com",
    manager: "Amit Patil",
    employees: 45,
    status: "Active",
  },
  {
    id: "5",
    name: "Retail Store - Phoenix Mall",
    code: "ST-MUM1",
    type: "Store",
    address: "Phoenix Marketcity, Kurla",
    city: "Mumbai",
    state: "Maharashtra",
    country: "India",
    postalCode: "400070",
    phone: "+91 22 5678 9012",
    email: "phoenix.store@company.com",
    manager: "Sneha Kulkarni",
    employees: 15,
    status: "Active",
  },
  {
    id: "6",
    name: "Manufacturing Unit",
    code: "FAC-CHE",
    type: "Factory",
    address: "SIPCOT Industrial Park",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    postalCode: "600058",
    phone: "+91 44 6789 0123",
    email: "factory@company.com",
    manager: "Venkatesh Iyer",
    employees: 180,
    status: "Active",
  },
  {
    id: "7",
    name: "Hyderabad Office",
    code: "BR-HYD",
    type: "Branch Office",
    address: "HITEC City, Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    country: "India",
    postalCode: "500081",
    phone: "+91 40 7890 1234",
    email: "hyderabad@company.com",
    manager: "Lakshmi Rao",
    employees: 65,
    status: "Inactive",
  },
];

const getTypeIcon = (type: Location["type"]) => {
  switch (type) {
    case "Head Office":
      return <Building2 className="h-4 w-4" />;
    case "Branch Office":
      return <Building2 className="h-4 w-4" />;
    case "Store":
      return <Store className="h-4 w-4" />;
    case "Warehouse":
      return <Warehouse className="h-4 w-4" />;
    case "Factory":
      return <Factory className="h-4 w-4" />;
    default:
      return <MapPin className="h-4 w-4" />;
  }
};

const getTypeBadgeVariant = (type: Location["type"]) => {
  switch (type) {
    case "Head Office":
      return "default";
    case "Branch Office":
      return "secondary";
    case "Store":
      return "outline";
    case "Warehouse":
      return "secondary";
    case "Factory":
      return "default";
    default:
      return "outline";
  }
};

const Locations = () => {
  const [locations, setLocations] = useState<Location[]>(sampleLocations);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "" as Location["type"] | "",
    address: "",
    city: "",
    state: "",
    country: "India",
    postalCode: "",
    phone: "",
    email: "",
    manager: "",
    status: "Active" as Location["status"],
  });

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      type: "",
      address: "",
      city: "",
      state: "",
      country: "India",
      postalCode: "",
      phone: "",
      email: "",
      manager: "",
      status: "Active",
    });
  };

  const handleAdd = () => {
    if (!formData.name || !formData.code || !formData.type) {
      toast.error("Please fill in all required fields");
      return;
    }
    const newLocation: Location = {
      id: Date.now().toString(),
      ...formData,
      type: formData.type as Location["type"],
      employees: 0,
    };
    setLocations([...locations, newLocation]);
    setIsAddDialogOpen(false);
    resetForm();
    toast.success("Location added successfully");
  };

  const handleEdit = () => {
    if (!selectedLocation) return;
    setLocations(
      locations.map((loc) =>
        loc.id === selectedLocation.id
          ? { ...loc, ...formData, type: formData.type as Location["type"] }
          : loc
      )
    );
    setIsEditDialogOpen(false);
    setSelectedLocation(null);
    resetForm();
    toast.success("Location updated successfully");
  };

  const handleDelete = (id: string) => {
    setLocations(locations.filter((loc) => loc.id !== id));
    toast.success("Location deleted successfully");
  };

  const openEditDialog = (location: Location) => {
    setSelectedLocation(location);
    setFormData({
      name: location.name,
      code: location.code,
      type: location.type,
      address: location.address,
      city: location.city,
      state: location.state,
      country: location.country,
      postalCode: location.postalCode,
      phone: location.phone,
      email: location.email,
      manager: location.manager,
      status: location.status,
    });
    setIsEditDialogOpen(true);
  };

  const columns: Column<Location>[] = [
    {
      key: "name",
      header: "Location",
      sortable: true,
      searchable: true,
      render: (location) => (
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {getTypeIcon(location.type)}
          </div>
          <div>
            <p className="font-medium">{location.name}</p>
            <p className="text-xs text-muted-foreground">{location.code}</p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      sortable: true,
      render: (location) => (
        <Badge variant={getTypeBadgeVariant(location.type)}>
          {location.type}
        </Badge>
      ),
    },
    {
      key: "address",
      header: "Address",
      render: (location) => (
        <div>
          <p className="text-sm">{location.address}</p>
          <p className="text-xs text-muted-foreground">
            {location.city}, {location.state} - {location.postalCode}
          </p>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Contact",
      render: (location) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm">
            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
            {location.phone}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Mail className="h-3 w-3" />
            {location.email}
          </div>
        </div>
      ),
    },
    {
      key: "manager",
      header: "Manager",
      sortable: true,
      searchable: true,
    },
    {
      key: "employees",
      header: "Employees",
      sortable: true,
      render: (location) => (
        <div className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">{location.employees}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (location) => (
        <Badge
          variant={location.status === "Active" ? "default" : "secondary"}
          className={
            location.status === "Active"
              ? "bg-green-500/10 text-green-600 hover:bg-green-500/20"
              : "bg-muted text-muted-foreground"
          }
        >
          {location.status}
        </Badge>
      ),
    },
    {
      key: "id",
      header: "Actions",
      render: (location) => (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openEditDialog(location)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleDelete(location.id)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "type",
      label: "Type",
      options: [
        { label: "Head Office", value: "Head Office" },
        { label: "Branch Office", value: "Branch Office" },
        { label: "Store", value: "Store" },
        { label: "Warehouse", value: "Warehouse" },
        { label: "Factory", value: "Factory" },
        { label: "Other", value: "Other" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
    {
      key: "state",
      label: "State",
      options: [
        { label: "Maharashtra", value: "Maharashtra" },
        { label: "Delhi NCR", value: "Delhi NCR" },
        { label: "Karnataka", value: "Karnataka" },
        { label: "Tamil Nadu", value: "Tamil Nadu" },
        { label: "Telangana", value: "Telangana" },
      ],
    },
  ];

  const activeLocations = locations.filter((l) => l.status === "Active").length;
  const totalEmployees = locations.reduce((sum, l) => sum + l.employees, 0);
  const locationTypes = new Set(locations.map((l) => l.type)).size;

  const LocationForm = () => (
    <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Location Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Mumbai Head Office"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="code">Location Code *</Label>
          <Input
            id="code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            placeholder="e.g., HQ-MUM"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Location Type *</Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData({ ...formData, type: value as Location["type"] })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Head Office">Head Office</SelectItem>
              <SelectItem value="Branch Office">Branch Office</SelectItem>
              <SelectItem value="Store">Store</SelectItem>
              <SelectItem value="Warehouse">Warehouse</SelectItem>
              <SelectItem value="Factory">Factory</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value) =>
              setFormData({ ...formData, status: value as Location["status"] })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          placeholder="Street address"
          rows={2}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            placeholder="City"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input
            id="state"
            value={formData.state}
            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            placeholder="State"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Input
            id="country"
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            placeholder="Country"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code</Label>
          <Input
            id="postalCode"
            value={formData.postalCode}
            onChange={(e) =>
              setFormData({ ...formData, postalCode: e.target.value })
            }
            placeholder="Postal code"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="+91 XX XXXX XXXX"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="location@company.com"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="manager">Location Manager</Label>
        <Input
          id="manager"
          value={formData.manager}
          onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
          placeholder="Manager name"
        />
      </div>
    </div>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="text-2xl font-bold">Location Management</h1>
                <p className="text-muted-foreground">
                  Manage your organization's offices, branches, stores and other locations
                </p>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Location
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Location</DialogTitle>
                    <DialogDescription>
                      Add a new office, branch, store or other location
                    </DialogDescription>
                  </DialogHeader>
                  <LocationForm />
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAdd}>Add Location</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
              <StatsCard
                title="Total Locations"
                value={locations.length.toString()}
                icon={MapPin}
              />
              <StatsCard
                title="Active Locations"
                value={activeLocations.toString()}
                icon={Building2}
              />
              <StatsCard
                title="Total Employees"
                value={totalEmployees.toString()}
                icon={Users}
              />
              <StatsCard
                title="Location Types"
                value={locationTypes.toString()}
                icon={Store}
              />
            </div>

            <DataTable
              data={locations}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search locations..."
            />

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Location</DialogTitle>
                  <DialogDescription>
                    Update location details
                  </DialogDescription>
                </DialogHeader>
                <LocationForm />
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleEdit}>Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Locations;
