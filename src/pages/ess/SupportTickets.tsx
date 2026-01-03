import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { 
  Ticket, 
  Search, 
  Filter,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MessageSquare,
  Calendar,
  User,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "resolved" | "closed";
  createdDate: string;
  lastUpdate: string;
  assignedTo?: string;
  description: string;
  replies: number;
}

const ticketsData: SupportTicket[] = [
  {
    id: "TKT-2024-089",
    subject: "Unable to access payslip for December",
    category: "Payroll",
    priority: "high",
    status: "in_progress",
    createdDate: "Dec 28, 2024",
    lastUpdate: "Dec 30, 2024",
    assignedTo: "Priya Sharma",
    description: "I am unable to download my payslip for December 2024. The download button shows an error.",
    replies: 3
  },
  {
    id: "TKT-2024-085",
    subject: "Leave balance incorrect",
    category: "Leave Management",
    priority: "medium",
    status: "resolved",
    createdDate: "Dec 22, 2024",
    lastUpdate: "Dec 26, 2024",
    assignedTo: "Amit Kumar",
    description: "My casual leave balance shows 2 days but I should have 4 days remaining.",
    replies: 5
  },
  {
    id: "TKT-2024-078",
    subject: "Request for equipment upgrade",
    category: "IT Support",
    priority: "low",
    status: "open",
    createdDate: "Dec 18, 2024",
    lastUpdate: "Dec 18, 2024",
    description: "Requesting RAM upgrade for my laptop as current 8GB is insufficient for development work.",
    replies: 0
  },
  {
    id: "TKT-2024-072",
    subject: "Attendance regularization pending for 2 weeks",
    category: "Attendance",
    priority: "high",
    status: "closed",
    createdDate: "Dec 10, 2024",
    lastUpdate: "Dec 15, 2024",
    assignedTo: "Rajesh Singh",
    description: "My attendance regularization request submitted 2 weeks ago is still pending approval.",
    replies: 4
  },
  {
    id: "TKT-2024-065",
    subject: "VPN connection issues",
    category: "IT Support",
    priority: "urgent",
    status: "resolved",
    createdDate: "Dec 5, 2024",
    lastUpdate: "Dec 6, 2024",
    assignedTo: "IT Helpdesk",
    description: "Unable to connect to company VPN from home. Getting authentication error.",
    replies: 6
  },
];

const priorityConfig = {
  low: { label: "Low", color: "bg-slate-500/10 text-slate-600 border-slate-500/20" },
  medium: { label: "Medium", color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  high: { label: "High", color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  urgent: { label: "Urgent", color: "bg-red-500/10 text-red-600 border-red-500/20" },
};

const statusConfig = {
  open: { label: "Open", icon: AlertCircle, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  in_progress: { label: "In Progress", icon: Clock, color: "bg-blue-500/10 text-blue-600 border-blue-500/20" },
  resolved: { label: "Resolved", icon: CheckCircle2, color: "bg-green-500/10 text-green-600 border-green-500/20" },
  closed: { label: "Closed", icon: XCircle, color: "bg-muted text-muted-foreground border-border" },
};

export default function SupportTickets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = ticketsData.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: ticketsData.length,
    open: ticketsData.filter(t => t.status === "open").length,
    inProgress: ticketsData.filter(t => t.status === "in_progress").length,
    resolved: ticketsData.filter(t => t.status === "resolved" || t.status === "closed").length,
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Support Tickets</h1>
            <p className="text-muted-foreground mt-1">View and manage your support requests</p>
          </div>
          <Link to="/ess/support/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Ticket className="h-6 w-6 text-primary" />
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
                <div className="p-3 rounded-xl bg-yellow-500/10">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Open</p>
                  <p className="text-2xl font-bold">{stats.open}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Clock className="h-6 w-6 text-blue-600" />
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
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold">{stats.resolved}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tickets Table */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <CardTitle>Ticket History</CardTitle>
                <CardDescription>All your submitted support tickets</CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search tickets..." 
                    className="pl-10 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.map((ticket) => {
                    const StatusIcon = statusConfig[ticket.status].icon;
                    
                    return (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium font-mono text-sm">{ticket.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{ticket.subject}</p>
                            {ticket.replies > 0 && (
                              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                <MessageSquare className="h-3 w-3" />
                                {ticket.replies} replies
                              </p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{ticket.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={priorityConfig[ticket.priority].color}>
                            {priorityConfig[ticket.priority].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusConfig[ticket.status].color}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {statusConfig[ticket.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{ticket.createdDate}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-lg">
                              <DialogHeader>
                                <DialogTitle>{ticket.subject}</DialogTitle>
                                <DialogDescription>Ticket ID: {ticket.id}</DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 mt-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-sm text-muted-foreground">Category</p>
                                    <p className="font-medium">{ticket.category}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Priority</p>
                                    <Badge variant="outline" className={priorityConfig[ticket.priority].color}>
                                      {priorityConfig[ticket.priority].label}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Status</p>
                                    <Badge variant="outline" className={statusConfig[ticket.status].color}>
                                      {statusConfig[ticket.status].label}
                                    </Badge>
                                  </div>
                                  <div>
                                    <p className="text-sm text-muted-foreground">Created</p>
                                    <p className="font-medium">{ticket.createdDate}</p>
                                  </div>
                                  {ticket.assignedTo && (
                                    <div className="col-span-2">
                                      <p className="text-sm text-muted-foreground">Assigned To</p>
                                      <p className="font-medium">{ticket.assignedTo}</p>
                                    </div>
                                  )}
                                  <div className="col-span-2">
                                    <p className="text-sm text-muted-foreground">Description</p>
                                    <p className="font-medium">{ticket.description}</p>
                                  </div>
                                </div>
                                
                                {ticket.status !== "closed" && (
                                  <div className="pt-4 border-t">
                                    <Textarea placeholder="Add a reply..." className="mb-3" />
                                    <Button className="w-full">
                                      <MessageSquare className="h-4 w-4 mr-2" />
                                      Send Reply
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            
            {filteredTickets.length === 0 && (
              <div className="text-center py-12">
                <Ticket className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                <p className="text-muted-foreground">No tickets found</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ESSLayout>
  );
}
