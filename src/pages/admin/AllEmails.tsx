import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Mail,
  Send,
  Clock,
  AlertCircle,
  Search,
  Eye,
  Download,
  RefreshCw,
  Trash2,
  FileText,
} from "lucide-react";
import { toast } from "sonner";

interface Email {
  id: string;
  referenceId: string;
  type: string;
  recipientName: string;
  recipientEmail: string;
  subject: string;
  status: "Draft" | "Sent" | "Failed" | "Downloaded";
  generatedBy: string;
  generatedOn: string;
  sentOn: string | null;
  content: string;
}

const sampleEmails: Email[] = [
  {
    id: "1",
    referenceId: "LTR-2026-001",
    type: "Offer Letter",
    recipientName: "John Smith",
    recipientEmail: "john.smith@email.com",
    subject: "Job Offer - Software Engineer Position",
    status: "Sent",
    generatedBy: "Sarah Johnson",
    generatedOn: "15 Jan 2026",
    sentOn: "15 Jan 2026",
    content: "Dear John Smith,\n\nWe are pleased to offer you the position of Software Engineer...",
  },
  {
    id: "2",
    referenceId: "LTR-2026-002",
    type: "Relieving Letter",
    recipientName: "Neha Singh",
    recipientEmail: "neha.singh@email.com",
    subject: "Relieving Letter - Neha Singh",
    status: "Downloaded",
    generatedBy: "Mike Wilson",
    generatedOn: "20 Jan 2026",
    sentOn: null,
    content: "To Whom It May Concern,\n\nThis is to certify that Neha Singh was employed with...",
  },
  {
    id: "3",
    referenceId: "LTR-2026-003",
    type: "Experience Letter",
    recipientName: "Sanjay Kumar",
    recipientEmail: "sanjay.kumar@email.com",
    subject: "Experience Certificate - Sanjay Kumar",
    status: "Draft",
    generatedBy: "Emily Brown",
    generatedOn: "22 Jan 2026",
    sentOn: null,
    content: "To Whom It May Concern,\n\nThis is to certify that Sanjay Kumar worked with our organization...",
  },
  {
    id: "4",
    referenceId: "EML-2026-001",
    type: "Interview Invitation",
    recipientName: "Emily Johnson",
    recipientEmail: "emily.johnson@email.com",
    subject: "Interview Invitation - Marketing Manager",
    status: "Sent",
    generatedBy: "Sarah Johnson",
    generatedOn: "18 Jan 2026",
    sentOn: "18 Jan 2026",
    content: "Dear Emily Johnson,\n\nWe would like to invite you for an interview...",
  },
  {
    id: "5",
    referenceId: "EML-2026-002",
    type: "Welcome Email",
    recipientName: "Rahul Verma",
    recipientEmail: "rahul.verma@email.com",
    subject: "Welcome to NexHR - Rahul Verma",
    status: "Sent",
    generatedBy: "Mike Wilson",
    generatedOn: "16 Jan 2026",
    sentOn: "16 Jan 2026",
    content: "Dear Rahul Verma,\n\nWelcome to NexHR! We are excited to have you on board...",
  },
  {
    id: "6",
    referenceId: "LTR-2026-004",
    type: "Warning Letter",
    recipientName: "Amit Patel",
    recipientEmail: "amit.patel@email.com",
    subject: "Warning Notice - Attendance Issues",
    status: "Failed",
    generatedBy: "Sarah Johnson",
    generatedOn: "25 Jan 2026",
    sentOn: null,
    content: "Dear Amit Patel,\n\nThis letter serves as a formal warning regarding...",
  },
];

const AllEmails = () => {
  const [emails, setEmails] = useState<Email[]>(sampleEmails);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  const getStatusBadge = (status: Email["status"]) => {
    const styles = {
      Draft: "bg-muted text-muted-foreground",
      Sent: "bg-emerald-500/10 text-emerald-500",
      Failed: "bg-destructive/10 text-destructive",
      Downloaded: "bg-blue-500/10 text-blue-500",
    };
    return <Badge className={styles[status]}>{status}</Badge>;
  };

  const handleView = (email: Email) => {
    setSelectedEmail(email);
    setViewDialogOpen(true);
  };

  const handleDownload = (email: Email) => {
    toast.success(`Downloading ${email.type} for ${email.recipientName}`);
  };

  const handleResend = (email: Email) => {
    toast.success(`Resending email to ${email.recipientEmail}`);
  };

  const handleDelete = (email: Email) => {
    setEmails(emails.filter((e) => e.id !== email.id));
    toast.success("Email deleted successfully");
  };

  const columns: Column<Email>[] = [
    {
      key: "referenceId",
      header: "Reference ID",
      render: (item) => (
        <span className="font-mono text-sm">{item.referenceId}</span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (item) => (
        <Badge variant="outline">{item.type}</Badge>
      ),
    },
    {
      key: "recipient",
      header: "Recipient",
      render: (item) => (
        <div>
          <p className="font-medium">{item.recipientName}</p>
          <p className="text-sm text-muted-foreground">{item.recipientEmail}</p>
        </div>
      ),
    },
    {
      key: "subject",
      header: "Subject",
      render: (item) => (
        <span className="max-w-[200px] truncate block">{item.subject}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => getStatusBadge(item.status),
    },
    {
      key: "generatedBy",
      header: "Generated By",
    },
    {
      key: "generatedOn",
      header: "Generated On",
    },
    {
      key: "sentOn",
      header: "Sent On",
      render: (item) => <span>{item.sentOn || "-"}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (item) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={() => handleView(item)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => handleDownload(item)}>
            <Download className="h-4 w-4" />
          </Button>
          {item.status !== "Draft" && (
            <Button variant="ghost" size="icon" onClick={() => handleResend(item)}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => handleDelete(item)}>
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      ),
    },
  ];

  const filteredEmails = emails.filter((email) => {
    const matchesSearch =
      email.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.referenceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || email.type === typeFilter;
    const matchesStatus = statusFilter === "all" || email.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const types = [...new Set(emails.map((e) => e.type))];
  const statuses = ["Draft", "Sent", "Failed", "Downloaded"];

  const stats = {
    total: emails.length,
    sentToday: emails.filter((e) => e.sentOn === "25 Jan 2026").length,
    drafts: emails.filter((e) => e.status === "Draft").length,
    failed: emails.filter((e) => e.status === "Failed").length,
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Emails & Letters</h1>
          <p className="text-muted-foreground">View all generated and sent communications</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        <StatsCard
          title="Total Communications"
          value={stats.total.toString()}
          icon={Mail}
        />
        <StatsCard
          title="Sent Today"
          value={stats.sentToday.toString()}
          icon={Send}
        />
        <StatsCard
          title="Pending (Draft)"
          value={stats.drafts.toString()}
          icon={Clock}
        />
        <StatsCard
          title="Failed"
          value={stats.failed.toString()}
          icon={AlertCircle}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by recipient, subject, or reference ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {types.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>{status}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Data Table */}
      <div className="mt-6">
        <DataTable columns={columns} data={filteredEmails} />
      </div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              {selectedEmail?.type}
            </DialogTitle>
          </DialogHeader>
          {selectedEmail && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Reference:</span>
                  <span className="ml-2 font-mono">{selectedEmail.referenceId}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <span className="ml-2">{getStatusBadge(selectedEmail.status)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">To:</span>
                  <span className="ml-2">{selectedEmail.recipientName}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Email:</span>
                  <span className="ml-2">{selectedEmail.recipientEmail}</span>
                </div>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Subject:</p>
                <p className="font-medium">{selectedEmail.subject}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm mb-1">Content:</p>
                <div className="bg-muted/50 rounded-lg p-4 whitespace-pre-wrap text-sm">
                  {selectedEmail.content}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => handleDownload(selectedEmail)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                {selectedEmail.status === "Draft" && (
                  <Button onClick={() => handleResend(selectedEmail)}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AllEmails;