import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Search,
  MoreHorizontal,
  Pencil,
  Trash2,
  FileText,
  FileSignature,
  Receipt,
  ScrollText,
  CreditCard,
  Award,
  BookOpen,
  Image,
  FolderOpen,
  Layers,
  HardDrive,
  FileCheck,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { toast } from "sonner";

const categories = [
  {
    id: "1",
    name: "Offer Letters",
    icon: "FileSignature",
    description: "Job offer documents for candidates",
    allowedTypes: ["PDF", "DOCX"],
    maxSize: "5 MB",
    documentsCount: 45,
    storageUsed: "12 MB",
    status: "Active",
  },
  {
    id: "2",
    name: "Appointment Letters",
    icon: "FileCheck",
    description: "Employee appointment/joining letters",
    allowedTypes: ["PDF", "DOCX"],
    maxSize: "5 MB",
    documentsCount: 38,
    storageUsed: "9 MB",
    status: "Active",
  },
  {
    id: "3",
    name: "Payslips",
    icon: "Receipt",
    description: "Monthly salary slips",
    allowedTypes: ["PDF"],
    maxSize: "2 MB",
    documentsCount: 890,
    storageUsed: "156 MB",
    status: "Active",
  },
  {
    id: "4",
    name: "Invoices",
    icon: "FileText",
    description: "Client billing invoices",
    allowedTypes: ["PDF"],
    maxSize: "5 MB",
    documentsCount: 234,
    storageUsed: "89 MB",
    status: "Active",
  },
  {
    id: "5",
    name: "Contracts",
    icon: "ScrollText",
    description: "Employment and service contracts",
    allowedTypes: ["PDF", "DOCX"],
    maxSize: "10 MB",
    documentsCount: 67,
    storageUsed: "45 MB",
    status: "Active",
  },
  {
    id: "6",
    name: "ID Proofs",
    icon: "CreditCard",
    description: "Employee identification documents",
    allowedTypes: ["PDF", "JPG", "PNG"],
    maxSize: "5 MB",
    documentsCount: 156,
    storageUsed: "78 MB",
    status: "Active",
  },
  {
    id: "7",
    name: "Certificates",
    icon: "Award",
    description: "Training and education certificates",
    allowedTypes: ["PDF", "JPG", "PNG"],
    maxSize: "5 MB",
    documentsCount: 89,
    storageUsed: "34 MB",
    status: "Active",
  },
  {
    id: "8",
    name: "Policies",
    icon: "BookOpen",
    description: "Company policy documents",
    allowedTypes: ["PDF", "DOCX"],
    maxSize: "10 MB",
    documentsCount: 12,
    storageUsed: "45 MB",
    status: "Active",
  },
  {
    id: "9",
    name: "Photos",
    icon: "Image",
    description: "Employee and team photos",
    allowedTypes: ["JPG", "PNG"],
    maxSize: "3 MB",
    documentsCount: 234,
    storageUsed: "567 MB",
    status: "Active",
  },
];

const iconMap: Record<string, React.ElementType> = {
  FileSignature,
  FileCheck,
  Receipt,
  FileText,
  ScrollText,
  CreditCard,
  Award,
  BookOpen,
  Image,
};

export default function DocumentCategories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalDocuments = categories.reduce((sum, cat) => sum + cat.documentsCount, 0);
  const totalStorage = "1.04 GB";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Document Categories</h1>
                <p className="text-muted-foreground">
                  Manage document types and their settings
                </p>
              </div>
              <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Category
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                    <DialogDescription>
                      Create a new document category with custom settings.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label>Category Name</Label>
                      <Input placeholder="Enter category name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Input placeholder="Brief description" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Max File Size</Label>
                        <Select defaultValue="5">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2">2 MB</SelectItem>
                            <SelectItem value="5">5 MB</SelectItem>
                            <SelectItem value="10">10 MB</SelectItem>
                            <SelectItem value="20">20 MB</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select defaultValue="active">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        toast.success("Category created successfully");
                        setAddDialogOpen(false);
                      }}
                    >
                      Create Category
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Total Categories"
                value={categories.length.toString()}
                icon={Layers}
              />
              <StatsCard
                title="Total Documents"
                value={totalDocuments.toLocaleString()}
                icon={FileText}
              />
              <StatsCard
                title="Storage Used"
                value={totalStorage}
                icon={HardDrive}
              />
              <StatsCard
                title="Active Categories"
                value={categories.filter((c) => c.status === "Active").length.toString()}
                icon={FolderOpen}
              />
            </div>

            {/* Search */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Table */}
            <div className="rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Category</TableHead>
                    <TableHead>Allowed Types</TableHead>
                    <TableHead>Max Size</TableHead>
                    <TableHead>Documents</TableHead>
                    <TableHead>Storage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategories.map((category) => {
                    const IconComponent = iconMap[category.icon] || FileText;
                    return (
                      <TableRow key={category.id} className="hover:bg-muted/50">
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <IconComponent className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{category.name}</p>
                              <p className="text-xs text-muted-foreground">{category.description}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {category.allowedTypes.map((type) => (
                              <Badge key={type} variant="secondary" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{category.maxSize}</TableCell>
                        <TableCell>{category.documentsCount}</TableCell>
                        <TableCell>{category.storageUsed}</TableCell>
                        <TableCell>
                          <Badge
                            variant={category.status === "Active" ? "default" : "secondary"}
                            className={
                              category.status === "Active"
                                ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                                : ""
                            }
                          >
                            {category.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.info("Edit category")}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => toast.success("Category deleted")}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
