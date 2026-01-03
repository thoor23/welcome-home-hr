import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  FolderOpen,
  Upload,
  FolderPlus,
  Search,
  LayoutGrid,
  List,
  MoreHorizontal,
  Download,
  Eye,
  Trash2,
  FileText,
  Image,
  FileSpreadsheet,
  File,
  ChevronLeft,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FolderCard } from "@/components/documents/FolderCard";
import { FileCard } from "@/components/documents/FileCard";
import { FileUploadDialog } from "@/components/documents/FileUploadDialog";
import { FilePreviewDrawer } from "@/components/documents/FilePreviewDrawer";
import { toast } from "sonner";

const folders = [
  { id: "1", name: "Employees", items: 156 },
  { id: "2", name: "Offer Letters", items: 45 },
  { id: "3", name: "Appointment Letters", items: 38 },
  { id: "4", name: "Payslips", items: 890 },
  { id: "5", name: "Invoices", items: 234 },
  { id: "6", name: "Contracts", items: 67 },
  { id: "7", name: "Policies", items: 12 },
  { id: "8", name: "ID Proofs", items: 156 },
  { id: "9", name: "Certificates", items: 89 },
  { id: "10", name: "Miscellaneous", items: 34 },
];

const files = [
  {
    id: "1",
    name: "John_Smith_Offer_2025.pdf",
    type: "pdf",
    size: "245 KB",
    category: "Offer Letters",
    module: "Recruitment",
    uploadedBy: "HR Admin",
    uploadedAt: "Jan 15, 2026",
    accessLevel: "private",
    tags: ["offer", "2025", "engineering"],
    description: "Offer letter for John Smith - Senior Developer position",
  },
  {
    id: "2",
    name: "Company_Policy_v2.pdf",
    type: "pdf",
    size: "1.2 MB",
    category: "Policies",
    module: "General",
    uploadedBy: "HR Admin",
    uploadedAt: "Jan 10, 2026",
    accessLevel: "public",
    tags: ["policy", "company", "2026"],
  },
  {
    id: "3",
    name: "Employee_Handbook.docx",
    type: "docx",
    size: "3.4 MB",
    category: "Policies",
    module: "General",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "Jan 8, 2026",
    accessLevel: "public",
    tags: ["handbook", "onboarding"],
  },
  {
    id: "4",
    name: "Invoice_Jan_2026.pdf",
    type: "pdf",
    size: "380 KB",
    category: "Invoices",
    module: "Billing",
    uploadedBy: "Finance",
    uploadedAt: "Jan 5, 2026",
    accessLevel: "department",
    tags: ["invoice", "january", "2026"],
  },
  {
    id: "5",
    name: "Team_Photo_2025.jpg",
    type: "jpg",
    size: "2.1 MB",
    category: "Photos",
    module: "General",
    uploadedBy: "HR Admin",
    uploadedAt: "Dec 28, 2025",
    accessLevel: "public",
    tags: ["team", "photo", "annual"],
  },
  {
    id: "6",
    name: "Salary_Report_Q4.xlsx",
    type: "xlsx",
    size: "890 KB",
    category: "Payslips",
    module: "Payroll",
    uploadedBy: "Finance",
    uploadedAt: "Dec 20, 2025",
    accessLevel: "private",
    tags: ["salary", "report", "Q4"],
  },
];

const getFileIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "pdf":
      return <FileText className="w-4 h-4 text-red-500" />;
    case "doc":
    case "docx":
      return <FileText className="w-4 h-4 text-blue-500" />;
    case "xls":
    case "xlsx":
      return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
    case "jpg":
    case "jpeg":
    case "png":
      return <Image className="w-4 h-4 text-purple-500" />;
    default:
      return <File className="w-4 h-4 text-muted-foreground" />;
  }
};

export default function AllDocuments() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [previewDrawerOpen, setPreviewDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<typeof files[0] | null>(null);

  const handleFolderClick = (folderName: string) => {
    setCurrentPath([...currentPath, folderName]);
    toast.info(`Opened folder: ${folderName}`);
  };


  const handleFileView = (file: typeof files[0]) => {
    setSelectedFile(file);
    setPreviewDrawerOpen(true);
  };

  const handleFileDownload = (fileName: string) => {
    toast.success(`Downloading ${fileName}`);
  };

  const handleFileDelete = (fileName: string) => {
    toast.success(`${fileName} deleted`);
  };

  const isInFolder = currentPath.length > 0;

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground">
            Manage and organize all your files in one place
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast.info("Create folder clicked")}>
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
          <Button onClick={() => setUploadDialogOpen(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Documents"
          value="1,721"
          icon={FileText}
        />
        <StatsCard
          title="Storage Used"
          value="4.8 GB"
          icon={FolderOpen}
        />
        <StatsCard
          title="Uploaded This Month"
          value="156"
          icon={Upload}
        />
        <StatsCard
          title="Shared Files"
          value="89"
          icon={Eye}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isInFolder && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPath(currentPath.slice(0, -1))}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <span className="text-sm text-muted-foreground">
            {isInFolder ? `Documents / ${currentPath.join(" / ")}` : "Documents"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {folders.map((folder) => (
                <SelectItem key={folder.id} value={folder.name}>
                  {folder.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex border border-border rounded-lg overflow-hidden">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {!isInFolder &&
            folders.map((folder) => (
              <FolderCard
                key={folder.id}
                name={folder.name}
                itemsCount={folder.items}
                onClick={() => handleFolderClick(folder.name)}
              />
            ))}
          {files.map((file) => (
            <FileCard
              key={file.id}
              name={file.name}
              type={file.type}
              size={file.size}
              date={file.uploadedAt}
              onView={() => handleFileView(file)}
              onDownload={() => handleFileDownload(file.name)}
              onDelete={() => handleFileDelete(file.name)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Uploaded By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Access</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type)}
                      <span className="font-medium">{file.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="uppercase text-xs">
                    {file.type}
                  </TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.category}</TableCell>
                  <TableCell>{file.uploadedBy}</TableCell>
                  <TableCell>{file.uploadedAt}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        file.accessLevel === "public"
                          ? "border-green-500 text-green-500"
                          : file.accessLevel === "department"
                          ? "border-yellow-500 text-yellow-500"
                          : "border-red-500 text-red-500"
                      }
                    >
                      {file.accessLevel}
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
                        <DropdownMenuItem onClick={() => handleFileView(file)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleFileDownload(file.name)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleFileDelete(file.name)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <FileUploadDialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen} />
      <FilePreviewDrawer
        open={previewDrawerOpen}
        onOpenChange={setPreviewDrawerOpen}
        file={selectedFile}
      />
    </AdminLayout>
  );
}