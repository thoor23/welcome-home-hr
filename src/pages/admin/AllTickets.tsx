import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent } from "@/components/ui/card";
import { DataTable, Column } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TicketDialog } from "@/components/support/TicketDialog";
import { TicketDrawer } from "@/components/support/TicketDrawer";
import { 
  TicketCheck, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Plus,
  Eye,
  UserPlus,
  MoreHorizontal,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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

const sampleTickets: Ticket[] = [
  {
    id: "TKT-2026-001",
    subject: "Laptop not starting",
    category: "IT Support",
    priority: "High",
    raisedBy: "John Smith",
    assignedTo: "IT Team",
    status: "In Progress",
    createdAt: "2026-01-02",
    updatedAt: "2026-01-02",
    slaStatus: "Within SLA",
    description: "My laptop is not starting since this morning. I tried all the basic troubleshooting steps but nothing worked.",
  },
  {
    id: "TKT-2026-002",
    subject: "Leave balance query",
    category: "HR Query",
    priority: "Medium",
    raisedBy: "Priya Sharma",
    assignedTo: "HR Team",
    status: "Open",
    createdAt: "2026-01-02",
    updatedAt: "2026-01-02",
    slaStatus: "Within SLA",
    description: "I would like to know my current leave balance and how many earned leaves I have accumulated.",
  },
  {
    id: "TKT-2026-003",
    subject: "AC not working in Meeting Room 2",
    category: "Facilities",
    priority: "Low",
    raisedBy: "Rahul Verma",
    assignedTo: "Facilities Team",
    status: "Resolved",
    createdAt: "2025-12-30",
    updatedAt: "2026-01-01",
    slaStatus: "Within SLA",
    description: "The air conditioning in Meeting Room 2 is not working properly. The room gets very hot during meetings.",
  },
  {
    id: "TKT-2026-004",
    subject: "Salary slip missing for December",
    category: "Payroll",
    priority: "High",
    raisedBy: "Emily Johnson",
    assignedTo: "Payroll Team",
    status: "Open",
    createdAt: "2026-01-02",
    updatedAt: "2026-01-02",
    slaStatus: "At Risk",
    description: "I have not received my salary slip for December 2025. Please help me get it as I need it for tax filing.",
  },
  {
    id: "TKT-2026-005",
    subject: "VPN access request",
    category: "IT Support",
    priority: "Medium",
    raisedBy: "Sanjay Kumar",
    assignedTo: "IT Team",
    status: "Closed",
    createdAt: "2025-12-28",
    updatedAt: "2025-12-29",
    slaStatus: "Within SLA",
    description: "I need VPN access to work from home. Please set up my account for remote access.",
  },
  {
    id: "TKT-2026-006",
    subject: "Keyboard replacement needed",
    category: "IT Support",
    priority: "Low",
    raisedBy: "Maria Garcia",
    assignedTo: "",
    status: "Open",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-01",
    slaStatus: "Breached",
    description: "Several keys on my keyboard are not working. I need a replacement keyboard to continue my work.",
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

const getSlaColor = (slaStatus: string) => {
  switch (slaStatus.toLowerCase()) {
    case "within sla": return "bg-green-500/10 text-green-500 border-green-500/20";
    case "at risk": return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "breached": return "bg-red-500/10 text-red-500 border-red-500/20";
    default: return "bg-muted text-muted-foreground";
  }
};

export default function AllTickets() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const stats = {
    total: sampleTickets.length,
    open: sampleTickets.filter(t => t.status === "Open").length,
    inProgress: sampleTickets.filter(t => t.status === "In Progress").length,
    resolved: sampleTickets.filter(t => t.status === "Resolved" || t.status === "Closed").length,
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
      key: "raisedBy",
      header: "Raised By",
    },
    {
      key: "assignedTo",
      header: "Assigned To",
      render: (item) => <span>{item.assignedTo || "Unassigned"}</span>,
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
      key: "slaStatus",
      header: "SLA Status",
      render: (item) => (
        <Badge variant="outline" className={getSlaColor(item.slaStatus)}>
          {item.slaStatus}
        </Badge>
      ),
    },
    {
      key: "createdAt",
      header: "Created",
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => {
              setSelectedTicket(item);
              setDrawerOpen(true);
            }}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success("Assign dialog would open")}>
              <UserPlus className="h-4 w-4 mr-2" />
              Assign
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.success("Ticket resolved")}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Resolve
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">All Tickets</h1>
              <p className="text-muted-foreground">View and manage all support tickets</p>
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
                      <AlertCircle className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Open Tickets</p>
                      <p className="text-2xl font-bold">{stats.open}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-purple-500/10">
                      <Clock className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">In Progress</p>
                      <p className="text-2xl font-bold">{stats.inProgress}</p>
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
                      <p className="text-sm text-muted-foreground">Resolved Today</p>
                      <p className="text-2xl font-bold">{stats.resolved}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <DataTable
              columns={columns}
              data={sampleTickets}
              searchPlaceholder="Search tickets..."
              toolbarActions={
                <Button onClick={() => setDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Ticket
                </Button>
              }
            />
          </main>
        </div>
      </div>

      <TicketDialog open={dialogOpen} onOpenChange={setDialogOpen} />
      <TicketDrawer open={drawerOpen} onOpenChange={setDrawerOpen} ticket={selectedTicket} />
    </SidebarProvider>
  );
}
