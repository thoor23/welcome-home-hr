import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CalendarDays, CalendarCheck, CalendarClock, Calendar, Search, Plus, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react";
import { format, parseISO, isAfter, isBefore, isToday } from "date-fns";

// Sample events data
const eventsData = [
  {
    id: "1",
    title: "Research and Ideas",
    category: "Meeting",
    categoryColor: "#3B82F6",
    location: "Conference Room A",
    startDate: "2025-01-02T10:00:00",
    endDate: "2025-01-02T12:00:00",
    organizer: "John Smith",
    attendees: 8,
    status: "Upcoming",
  },
  {
    id: "2",
    title: "Webdesign Feedback",
    category: "Workshop",
    categoryColor: "#10B981",
    location: "Training Room",
    startDate: "2025-01-03T14:00:00",
    endDate: "2025-01-03T16:00:00",
    organizer: "Sarah Johnson",
    attendees: 5,
    status: "Upcoming",
  },
  {
    id: "3",
    title: "Q1 Planning",
    category: "Conference",
    categoryColor: "#F59E0B",
    location: "Main Hall",
    startDate: "2025-01-05T09:00:00",
    endDate: "2025-01-05T17:00:00",
    organizer: "CEO",
    attendees: 25,
    status: "Upcoming",
  },
  {
    id: "4",
    title: "New Hire Orientation",
    category: "Training",
    categoryColor: "#8B5CF6",
    location: "Training Room",
    startDate: "2025-01-06T10:00:00",
    endDate: "2025-01-06T13:00:00",
    organizer: "HR Team",
    attendees: 12,
    status: "Upcoming",
  },
  {
    id: "5",
    title: "Team Lunch",
    category: "Team Building",
    categoryColor: "#EC4899",
    location: "Cafeteria",
    startDate: "2024-12-20T12:30:00",
    endDate: "2024-12-20T14:00:00",
    organizer: "Office Manager",
    attendees: 30,
    status: "Completed",
  },
  {
    id: "6",
    title: "Product Demo",
    category: "Webinar",
    categoryColor: "#06B6D4",
    location: "Virtual / Online",
    startDate: "2024-12-28T15:00:00",
    endDate: "2024-12-28T16:00:00",
    organizer: "Product Team",
    attendees: 50,
    status: "Completed",
  },
];

const EventsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || event.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalEvents = eventsData.length;
  const upcomingEvents = eventsData.filter((e) => e.status === "Upcoming").length;
  const thisMonthEvents = eventsData.filter((e) => {
    const eventDate = parseISO(e.startDate);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  }).length;
  const todayEvents = eventsData.filter((e) => isToday(parseISO(e.startDate))).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Upcoming":
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">Upcoming</Badge>;
      case "Ongoing":
        return <Badge className="bg-green-500/10 text-green-500 hover:bg-green-500/20">Ongoing</Badge>;
      case "Completed":
        return <Badge className="bg-gray-500/10 text-gray-500 hover:bg-gray-500/20">Completed</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">All Events</h1>
              <p className="text-muted-foreground">View and manage all events in list format</p>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <StatsCard
                title="Total Events"
                value={totalEvents.toString()}
                icon={CalendarDays}
              />
              <StatsCard
                title="Upcoming Events"
                value={upcomingEvents.toString()}
                icon={CalendarClock}
              />
              <StatsCard
                title="This Month"
                value={thisMonthEvents.toString()}
                icon={Calendar}
              />
              <StatsCard
                title="Today"
                value={todayEvents.toString()}
                icon={CalendarCheck}
              />
            </div>

            {/* Filters */}
            <div className="bg-card rounded-lg border border-border p-4 mb-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search events..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Meeting">Meeting</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Conference">Conference</SelectItem>
                    <SelectItem value="Team Building">Team Building</SelectItem>
                    <SelectItem value="Webinar">Webinar</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Ongoing">Ongoing</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
              </div>
            </div>

            {/* Events Table */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Event Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Organizer</TableHead>
                    <TableHead className="text-center">Attendees</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: event.categoryColor }}
                          />
                          {event.category}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {event.location}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">
                            {format(parseISO(event.startDate), "MMM d, yyyy")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {format(parseISO(event.startDate), "h:mm a")} -{" "}
                            {format(parseISO(event.endDate), "h:mm a")}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{event.organizer}</TableCell>
                      <TableCell className="text-center">{event.attendees}</TableCell>
                      <TableCell>{getStatusBadge(event.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
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
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default EventsList;
