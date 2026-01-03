import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TicketDialog } from "@/components/support/TicketDialog";
import { TicketDrawer } from "@/components/support/TicketDrawer";
import { 
  TicketCheck, 
  Clock, 
  CheckCircle, 
  Plus,
  Eye,
  MessageSquare,
  AlertCircle,
} from "lucide-react";

interface Ticket {
  id: string;
  subject: string;
  category: string;
  priority: string;
  raisedBy: string;
  assignedTo: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  slaStatus: string;
  description: string;
}

const myTickets: Ticket[] = [
  {
    id: "TKT-2026-001",
    subject: "Request for new monitor",
    category: "IT Support",
    priority: "Medium",
    raisedBy: "Current User",
    assignedTo: "IT Team",
    status: "In Progress",
    createdAt: "2026-01-02",
    updatedAt: "2026-01-02",
    slaStatus: "Within SLA",
    description: "I need a second monitor for my workstation to improve productivity.",
  },
  {
    id: "TKT-2025-089",
    subject: "Parking space allocation",
    category: "Facilities",
    priority: "Low",
    raisedBy: "Current User",
    assignedTo: "Admin Team",
    status: "Open",
    createdAt: "2025-12-28",
    updatedAt: "2025-12-28",
    slaStatus: "At Risk",
    description: "I would like to request a parking space in the office building.",
  },
  {
    id: "TKT-2025-072",
    subject: "Tax declaration form",
    category: "HR Query",
    priority: "High",
    raisedBy: "Current User",
    assignedTo: "HR Team",
    status: "Resolved",
    createdAt: "2025-12-20",
    updatedAt: "2025-12-22",
    slaStatus: "Within SLA",
    description: "I need help with my tax declaration form for the current financial year.",
  },
  {
    id: "TKT-2025-045",
    subject: "Software installation request",
    category: "IT Support",
    priority: "Medium",
    raisedBy: "Current User",
    assignedTo: "IT Team",
    status: "Closed",
    createdAt: "2025-12-10",
    updatedAt: "2025-12-12",
    slaStatus: "Within SLA",
    description: "I need Adobe Creative Suite installed on my workstation.",
  },
];

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "critical": return "bg-red-500/10 text-red-500 border-red-500/20";
    case "high": return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "medium": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "low": return "bg-green-500/10 text-green-500 border-green-500/20";
    default: return "bg-muted text-muted-foreground";
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "open": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "in progress": return "bg-purple-500/10 text-purple-500 border-purple-500/20";
    case "on hold": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "resolved": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "closed": return "bg-muted text-muted-foreground";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function MyTickets() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const stats = {
    total: myTickets.length,
    open: myTickets.filter(t => t.status === "Open" || t.status === "In Progress").length,
    resolved: myTickets.filter(t => t.status === "Resolved" || t.status === "Closed").length,
    pending: myTickets.filter(t => t.status === "Open").length,
  };

  const columns: Column<Ticket>[] = [
    {
      key: "id",
      header: "Ticket ID",
      render: (item) => <span className="font-mono text-sm">{item.id}</span>,
    },
    {
      key: "subject",
      header: "Subject",
      render: (item) => <span className="font-medium">{item.subject}</span>,
    },
    {
      key: "category",
      header: "Category",
    },
    {
      key: "priority",
      header: "Priority",
      render: (item) => (
        <Badge variant="outline" className={getPriorityColor(item.priority)}>
          {item.priority}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => (
        <Badge variant="outline" className={getStatusColor(item.status)}>
          {item.status}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
    },
    {
      key: "updatedAt",
      header: "Last Update",
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (item) => (
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => {
              setSelectedTicket(item);
              setDrawerOpen(true);
            }}
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          {(item.status === "Open" || item.status === "In Progress") && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => {
                setSelectedTicket(item);
                setDrawerOpen(true);
              }}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Comment
            </Button>
          )}
        </div>
      ),
    },
  ];
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">My Tickets</h1>
        <p className="text-muted-foreground">View and track your support requests</p>
      </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <TicketCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Tickets</p>
                      <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                      <Clock className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Active Tickets</p>
                      <p className="text-2xl font-bold">{stats.open}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-yellow-500/10">
                      <AlertCircle className="h-6 w-6 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Response</p>
                      <p className="text-2xl font-bold">{stats.pending}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-500/10">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Resolved</p>
                      <p className="text-2xl font-bold">{stats.resolved}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <DataTable
              columns={columns}
              data={myTickets}
              searchPlaceholder="Search my tickets..."
              toolbarActions={
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              }
        />

      <TicketDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <TicketDrawer open={drawerOpen} onOpenChange={setDrawerOpen} ticket={selectedTicket} />
    </AdminLayout>
  );
}
