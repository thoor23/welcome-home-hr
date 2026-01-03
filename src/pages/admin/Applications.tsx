import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import {
  FileText,
  Users,
  Clock,
  CheckCircle,
  Eye,
  Calendar,
  XCircle,
  ExternalLink,
} from "lucide-react";

interface Application {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  email: string;
  phone: string;
  appliedFor: string;
  appliedDate: string;
  source: string;
  resumeLink: string;
  status: string;
}

const mockApplications: Application[] = [
  {
    id: "1",
    candidateName: "John Smith",
    candidateAvatar: "",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    appliedFor: "Senior Software Engineer",
    appliedDate: "2024-01-20",
    source: "LinkedIn",
    resumeLink: "#",
    status: "New",
  },
  {
    id: "2",
    candidateName: "Emily Johnson",
    candidateAvatar: "",
    email: "emily.j@email.com",
    phone: "+1 (555) 234-5678",
    appliedFor: "Product Manager",
    appliedDate: "2024-01-19",
    source: "Indeed",
    resumeLink: "#",
    status: "Screening",
  },
  {
    id: "3",
    candidateName: "Michael Chen",
    candidateAvatar: "",
    email: "m.chen@email.com",
    phone: "+1 (555) 345-6789",
    appliedFor: "UI/UX Designer",
    appliedDate: "2024-01-18",
    source: "Referral",
    resumeLink: "#",
    status: "Interview",
  },
  {
    id: "4",
    candidateName: "Sarah Williams",
    candidateAvatar: "",
    email: "sarah.w@email.com",
    phone: "+1 (555) 456-7890",
    appliedFor: "Data Analyst",
    appliedDate: "2024-01-17",
    source: "Website",
    resumeLink: "#",
    status: "Offered",
  },
  {
    id: "5",
    candidateName: "David Brown",
    candidateAvatar: "",
    email: "d.brown@email.com",
    phone: "+1 (555) 567-8901",
    appliedFor: "Senior Software Engineer",
    appliedDate: "2024-01-16",
    source: "LinkedIn",
    resumeLink: "#",
    status: "Rejected",
  },
  {
    id: "6",
    candidateName: "Lisa Anderson",
    candidateAvatar: "",
    email: "lisa.a@email.com",
    phone: "+1 (555) 678-9012",
    appliedFor: "Product Manager",
    appliedDate: "2024-01-15",
    source: "Indeed",
    resumeLink: "#",
    status: "Hired",
  },
];

const statsData = [
  { title: "Total Applications", value: "156", icon: FileText, color: "text-primary" },
  { title: "New This Week", value: "32", icon: Clock, color: "text-blue-500" },
  { title: "In Screening", value: "24", icon: Users, color: "text-amber-500" },
  { title: "Shortlisted", value: "18", icon: CheckCircle, color: "text-emerald-500" },
];

export default function Applications() {
  const [applications] = useState<Application[]>(mockApplications);

  const columns: Column<Application>[] = [
    {
      key: "candidateName",
      header: "Candidate",
      sortable: true,
      searchable: true,
      render: (app) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={app.candidateAvatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {app.candidateName.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-foreground">{app.candidateName}</div>
            <div className="text-xs text-muted-foreground">{app.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: "phone",
      header: "Phone",
    },
    {
      key: "appliedFor",
      header: "Applied For",
      sortable: true,
      render: (app) => (
        <span className="font-medium">{app.appliedFor}</span>
      ),
    },
    {
      key: "appliedDate",
      header: "Applied Date",
      sortable: true,
      render: (app) => new Date(app.appliedDate).toLocaleDateString(),
    },
    {
      key: "source",
      header: "Source",
      render: (app) => {
        const sourceColors: Record<string, string> = {
          LinkedIn: "bg-blue-500/10 text-blue-500 border-blue-500/20",
          Indeed: "bg-purple-500/10 text-purple-500 border-purple-500/20",
          Referral: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          Website: "bg-amber-500/10 text-amber-500 border-amber-500/20",
        };
        return (
          <Badge className={sourceColors[app.source] || ""} variant="outline">
            {app.source}
          </Badge>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (app) => {
        const statusColors: Record<string, string> = {
          New: "bg-blue-500/10 text-blue-500 border-blue-500/20",
          Screening: "bg-amber-500/10 text-amber-500 border-amber-500/20",
          Interview: "bg-purple-500/10 text-purple-500 border-purple-500/20",
          Offered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          Hired: "bg-primary/10 text-primary border-primary/20",
          Rejected: "bg-destructive/10 text-destructive border-destructive/20",
        };
        return (
          <Badge className={statusColors[app.status] || ""} variant="outline">
            {app.status}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (app) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" title="View Resume">
            <ExternalLink className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" title="View Details">
            <Eye className="h-4 w-4" />
          </Button>
          {app.status === "New" || app.status === "Screening" ? (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Move to Interview"
              onClick={() => toast.success(`${app.candidateName} moved to interview stage`)}
            >
              <Calendar className="h-4 w-4" />
            </Button>
          ) : null}
          {app.status !== "Rejected" && app.status !== "Hired" && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" title="Reject">
              <XCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "appliedFor",
      label: "Job Title",
      options: [
        { label: "Senior Software Engineer", value: "Senior Software Engineer" },
        { label: "Product Manager", value: "Product Manager" },
        { label: "UI/UX Designer", value: "UI/UX Designer" },
        { label: "Data Analyst", value: "Data Analyst" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "New", value: "New" },
        { label: "Screening", value: "Screening" },
        { label: "Interview", value: "Interview" },
        { label: "Offered", value: "Offered" },
        { label: "Hired", value: "Hired" },
        { label: "Rejected", value: "Rejected" },
      ],
    },
    {
      key: "source",
      label: "Source",
      options: [
        { label: "LinkedIn", value: "LinkedIn" },
        { label: "Indeed", value: "Indeed" },
        { label: "Referral", value: "Referral" },
        { label: "Website", value: "Website" },
      ],
    },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Applications</h1>
          <p className="text-muted-foreground mt-1">Track and manage all job applications</p>
        </div>
      </div>

      <DataTable
        data={applications}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search applications..."
      />
    </AdminLayout>
  );
}
