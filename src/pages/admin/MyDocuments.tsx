import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Receipt,
  Award,
  CreditCard,
  Download,
  Eye,
  Search,
  FileCheck,
  Calendar,
  FolderOpen,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { FilePreviewDrawer } from "@/components/documents/FilePreviewDrawer";
import { toast } from "sonner";

const myDocuments = {
  letters: [
    {
      id: "1",
      name: "Offer_Letter_2024.pdf",
      type: "pdf",
      size: "245 KB",
      category: "Offer Letters",
      module: "Recruitment",
      uploadedBy: "HR Admin",
      uploadedAt: "Mar 15, 2024",
      accessLevel: "private",
      tags: ["offer", "2024"],
    },
    {
      id: "2",
      name: "Appointment_Letter_2024.pdf",
      type: "pdf",
      size: "198 KB",
      category: "Appointment Letters",
      module: "HR",
      uploadedBy: "HR Admin",
      uploadedAt: "Mar 20, 2024",
      accessLevel: "private",
      tags: ["appointment", "2024"],
    },
  ],
  payslips: [
    {
      id: "3",
      name: "Payslip_Dec_2025.pdf",
      type: "pdf",
      size: "120 KB",
      category: "Payslips",
      module: "Payroll",
      uploadedBy: "System",
      uploadedAt: "Dec 31, 2025",
      accessLevel: "private",
      tags: ["payslip", "december", "2025"],
    },
    {
      id: "4",
      name: "Payslip_Nov_2025.pdf",
      type: "pdf",
      size: "118 KB",
      category: "Payslips",
      module: "Payroll",
      uploadedBy: "System",
      uploadedAt: "Nov 30, 2025",
      accessLevel: "private",
      tags: ["payslip", "november", "2025"],
    },
    {
      id: "5",
      name: "Payslip_Oct_2025.pdf",
      type: "pdf",
      size: "122 KB",
      category: "Payslips",
      module: "Payroll",
      uploadedBy: "System",
      uploadedAt: "Oct 31, 2025",
      accessLevel: "private",
      tags: ["payslip", "october", "2025"],
    },
  ],
  idDocuments: [
    {
      id: "6",
      name: "Aadhar_Card.pdf",
      type: "pdf",
      size: "450 KB",
      category: "ID Proofs",
      module: "Employees",
      uploadedBy: "Self",
      uploadedAt: "Mar 15, 2024",
      accessLevel: "private",
      tags: ["id", "aadhar"],
    },
    {
      id: "7",
      name: "PAN_Card.pdf",
      type: "pdf",
      size: "380 KB",
      category: "ID Proofs",
      module: "Employees",
      uploadedBy: "Self",
      uploadedAt: "Mar 15, 2024",
      accessLevel: "private",
      tags: ["id", "pan"],
    },
  ],
  certificates: [
    {
      id: "8",
      name: "AWS_Certification_2025.pdf",
      type: "pdf",
      size: "1.2 MB",
      category: "Certificates",
      module: "Training",
      uploadedBy: "Self",
      uploadedAt: "Jun 15, 2025",
      accessLevel: "private",
      tags: ["certification", "aws", "cloud"],
    },
    {
      id: "9",
      name: "Project_Management_Cert.pdf",
      type: "pdf",
      size: "890 KB",
      category: "Certificates",
      module: "Training",
      uploadedBy: "Self",
      uploadedAt: "Sep 20, 2025",
      accessLevel: "private",
      tags: ["certification", "pmp"],
    },
  ],
};

interface DocumentCardProps {
  icon: React.ElementType;
  title: string;
  documents: typeof myDocuments.letters;
  onView: (doc: typeof myDocuments.letters[0]) => void;
  onDownload: (name: string) => void;
}

function DocumentSection({ icon: Icon, title, documents, onView, onDownload }: DocumentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Icon className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{documents.length} documents</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground text-sm">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.size} • {doc.uploadedAt}
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onView(doc)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onDownload(doc.name)}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {documents.length === 0 && (
            <p className="text-center text-muted-foreground py-4">No documents found</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function MyDocuments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [previewDrawerOpen, setPreviewDrawerOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<typeof myDocuments.letters[0] | null>(null);

  const handleView = (doc: typeof myDocuments.letters[0]) => {
    setSelectedFile(doc);
    setPreviewDrawerOpen(true);
  };

  const handleDownload = (fileName: string) => {
    toast.success(`Downloading ${fileName}`);
  };

  const totalDocuments =
    myDocuments.letters.length +
    myDocuments.payslips.length +
    myDocuments.idDocuments.length +
    myDocuments.certificates.length;
  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">My Documents</h1>
                <p className="text-muted-foreground">
                  Access and download your personal documents
                </p>
              </div>
              <Button variant="outline" onClick={() => toast.info("Request document access")}>
                <FileCheck className="h-4 w-4 mr-2" />
                Request Document
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Total Documents"
                value={totalDocuments.toString()}
                icon={FolderOpen}
              />
              <StatsCard
                title="Letters"
                value={myDocuments.letters.length.toString()}
                icon={FileText}
              />
              <StatsCard
                title="Payslips"
                value={myDocuments.payslips.length.toString()}
                icon={Receipt}
              />
              <StatsCard
                title="Certificates"
                value={myDocuments.certificates.length.toString()}
                icon={Award}
              />
            </div>

            {/* Search */}
            <div className="relative w-full max-w-md mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Document Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DocumentSection
                icon={FileText}
                title="My Letters"
                documents={myDocuments.letters}
                onView={handleView}
                onDownload={handleDownload}
              />
              <DocumentSection
                icon={Receipt}
                title="My Payslips"
                documents={myDocuments.payslips}
                onView={handleView}
                onDownload={handleDownload}
              />
              <DocumentSection
                icon={CreditCard}
                title="ID Documents"
                documents={myDocuments.idDocuments}
                onView={handleView}
                onDownload={handleDownload}
              />
              <DocumentSection
                icon={Award}
                title="Certificates"
                documents={myDocuments.certificates}
                onView={handleView}
                onDownload={handleDownload}
              />
        </div>

        <FilePreviewDrawer
          open={previewDrawerOpen}
          onOpenChange={setPreviewDrawerOpen}
          file={selectedFile}
        />
      </AdminLayout>
    );
}
