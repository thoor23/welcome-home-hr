import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  FileText, 
  Search, 
  Download, 
  Eye,
  Calendar,
  FolderOpen,
  FileImage,
  FileSpreadsheet,
  File,
  Upload,
  Clock,
  CheckCircle2,
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: string;
  name: string;
  category: string;
  type: "pdf" | "doc" | "image" | "spreadsheet" | "other";
  size: string;
  uploadedDate: string;
  expiryDate?: string;
  status: "active" | "expiring" | "expired";
  description?: string;
}

const documentsData: Document[] = [
  {
    id: "DOC-001",
    name: "Offer Letter",
    category: "Employment",
    type: "pdf",
    size: "245 KB",
    uploadedDate: "Jan 15, 2023",
    status: "active",
    description: "Original offer letter with compensation details"
  },
  {
    id: "DOC-002",
    name: "Appointment Letter",
    category: "Employment",
    type: "pdf",
    size: "312 KB",
    uploadedDate: "Jan 20, 2023",
    status: "active",
    description: "Formal appointment letter with terms and conditions"
  },
  {
    id: "DOC-003",
    name: "Aadhar Card",
    category: "Identity",
    type: "image",
    size: "1.2 MB",
    uploadedDate: "Jan 15, 2023",
    expiryDate: "Dec 31, 2030",
    status: "active",
    description: "Government issued identity proof"
  },
  {
    id: "DOC-004",
    name: "PAN Card",
    category: "Identity",
    type: "image",
    size: "856 KB",
    uploadedDate: "Jan 15, 2023",
    status: "active",
    description: "Permanent Account Number card"
  },
  {
    id: "DOC-005",
    name: "Passport",
    category: "Identity",
    type: "pdf",
    size: "2.1 MB",
    uploadedDate: "Jan 15, 2023",
    expiryDate: "Mar 15, 2025",
    status: "expiring",
    description: "Travel document - expiring soon"
  },
  {
    id: "DOC-006",
    name: "Degree Certificate",
    category: "Education",
    type: "pdf",
    size: "1.5 MB",
    uploadedDate: "Jan 15, 2023",
    status: "active",
    description: "Bachelor's degree certificate"
  },
  {
    id: "DOC-007",
    name: "Experience Letter - Previous Company",
    category: "Experience",
    type: "pdf",
    size: "423 KB",
    uploadedDate: "Jan 15, 2023",
    status: "active",
    description: "Experience letter from previous employer"
  },
  {
    id: "DOC-008",
    name: "Bank Account Details",
    category: "Financial",
    type: "pdf",
    size: "156 KB",
    uploadedDate: "Jan 15, 2023",
    status: "active",
    description: "Cancelled cheque and bank statement"
  },
  {
    id: "DOC-009",
    name: "Address Proof",
    category: "Identity",
    type: "pdf",
    size: "890 KB",
    uploadedDate: "Jan 15, 2023",
    status: "active",
    description: "Utility bill as address proof"
  },
  {
    id: "DOC-010",
    name: "NDA Agreement",
    category: "Legal",
    type: "pdf",
    size: "234 KB",
    uploadedDate: "Jan 20, 2023",
    status: "active",
    description: "Non-disclosure agreement"
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "employment", label: "Employment" },
  { value: "identity", label: "Identity" },
  { value: "education", label: "Education" },
  { value: "experience", label: "Experience" },
  { value: "financial", label: "Financial" },
  { value: "legal", label: "Legal" },
];

const getFileIcon = (type: Document["type"]) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "doc":
      return <FileText className="h-5 w-5 text-blue-500" />;
    case "image":
      return <FileImage className="h-5 w-5 text-green-500" />;
    case "spreadsheet":
      return <FileSpreadsheet className="h-5 w-5 text-emerald-500" />;
    default:
      return <File className="h-5 w-5 text-muted-foreground" />;
  }
};

const statusConfig = {
  active: { label: "Active", color: "bg-green-500/10 text-green-600 border-green-500/20" },
  expiring: { label: "Expiring Soon", color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  expired: { label: "Expired", color: "bg-red-500/10 text-red-600 border-red-500/20" },
};

export default function Documents() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const filteredDocuments = documentsData.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || doc.category.toLowerCase() === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: documentsData.length,
    active: documentsData.filter(d => d.status === "active").length,
    expiring: documentsData.filter(d => d.status === "expiring").length,
    expired: documentsData.filter(d => d.status === "expired").length,
  };

  const handleDownload = (doc: Document) => {
    toast.success(`Downloading ${doc.name}...`);
  };

  const handleView = (doc: Document) => {
    setSelectedDocument(doc);
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Documents</h1>
            <p className="text-muted-foreground mt-1">View and download your uploaded documents</p>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <FolderOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
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
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expiring Soon</p>
                  <p className="text-2xl font-bold">{stats.expiring}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-red-500/10">
                  <Calendar className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Expired</p>
                  <p className="text-2xl font-bold">{stats.expired}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>All Documents</CardTitle>
                <CardDescription>Browse and manage your uploaded documents</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search documents..." 
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
                <div className="flex border rounded-lg overflow-hidden">
                  <Button 
                    variant={viewMode === "grid" ? "secondary" : "ghost"} 
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="rounded-none"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === "list" ? "secondary" : "ghost"} 
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="rounded-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "grid" ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredDocuments.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="group p-4 border border-border rounded-xl bg-card hover:bg-muted/50 transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-muted">
                        {getFileIcon(doc.type)}
                      </div>
                      <Badge variant="outline" className={statusConfig[doc.status].color}>
                        {statusConfig[doc.status].label}
                      </Badge>
                    </div>
                    
                    <h3 className="font-medium text-sm mb-1 truncate" title={doc.name}>
                      {doc.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-3">{doc.category}</p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                      <span>{doc.size}</span>
                      <span>{doc.uploadedDate}</span>
                    </div>
                    
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleView(doc)}>
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {getFileIcon(doc.type)}
                              {doc.name}
                            </DialogTitle>
                            <DialogDescription>Document Details</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            {/* Document Preview Placeholder */}
                            <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                              <div className="text-center">
                                {getFileIcon(doc.type)}
                                <p className="text-sm text-muted-foreground mt-2">Document Preview</p>
                                <p className="text-xs text-muted-foreground">{doc.name}</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Category</p>
                                <p className="font-medium">{doc.category}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">File Size</p>
                                <p className="font-medium">{doc.size}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Uploaded On</p>
                                <p className="font-medium">{doc.uploadedDate}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <Badge variant="outline" className={statusConfig[doc.status].color}>
                                  {statusConfig[doc.status].label}
                                </Badge>
                              </div>
                              {doc.expiryDate && (
                                <div className="col-span-2">
                                  <p className="text-sm text-muted-foreground">Expiry Date</p>
                                  <p className="font-medium">{doc.expiryDate}</p>
                                </div>
                              )}
                              {doc.description && (
                                <div className="col-span-2">
                                  <p className="text-sm text-muted-foreground">Description</p>
                                  <p className="font-medium">{doc.description}</p>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex gap-2 pt-4 border-t">
                              <Button className="flex-1" onClick={() => handleDownload(doc)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDownload(doc)}>
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredDocuments.map((doc) => (
                  <div 
                    key={doc.id} 
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-muted">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                          <span>{doc.category}</span>
                          <span>•</span>
                          <span>{doc.size}</span>
                          <span>•</span>
                          <span>{doc.uploadedDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={statusConfig[doc.status].color}>
                        {statusConfig[doc.status].label}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => handleView(doc)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              {getFileIcon(doc.type)}
                              {doc.name}
                            </DialogTitle>
                            <DialogDescription>Document Details</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="aspect-[4/3] bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                              <div className="text-center">
                                {getFileIcon(doc.type)}
                                <p className="text-sm text-muted-foreground mt-2">Document Preview</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">Category</p>
                                <p className="font-medium">{doc.category}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">File Size</p>
                                <p className="font-medium">{doc.size}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Uploaded On</p>
                                <p className="font-medium">{doc.uploadedDate}</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Status</p>
                                <Badge variant="outline" className={statusConfig[doc.status].color}>
                                  {statusConfig[doc.status].label}
                                </Badge>
                              </div>
                              {doc.expiryDate && (
                                <div className="col-span-2">
                                  <p className="text-sm text-muted-foreground">Expiry Date</p>
                                  <p className="font-medium">{doc.expiryDate}</p>
                                </div>
                              )}
                              {doc.description && (
                                <div className="col-span-2">
                                  <p className="text-sm text-muted-foreground">Description</p>
                                  <p className="font-medium">{doc.description}</p>
                                </div>
                              )}
                            </div>
                            <div className="flex gap-2 pt-4 border-t">
                              <Button className="flex-1" onClick={() => handleDownload(doc)}>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button variant="ghost" size="icon" onClick={() => handleDownload(doc)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {filteredDocuments.length === 0 && (
              <div className="text-center py-12">
                <FolderOpen className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No documents found matching your criteria</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ESSLayout>
  );
}
