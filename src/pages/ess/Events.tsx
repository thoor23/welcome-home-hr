import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CalendarDays, 
  Clock, 
  MapPin, 
  Users, 
  PartyPopper,
  Briefcase,
  GraduationCap,
  Heart,
  Star,
  Video,
  Building,
  CalendarCheck,
  Bell
} from "lucide-react";
import { format, isSameDay, isAfter, isBefore, addDays } from "date-fns";

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  endDate?: Date;
  time: string;
  location: string;
  type: "holiday" | "meeting" | "training" | "celebration" | "company" | "team";
  isAllDay: boolean;
  isOptional: boolean;
  organizer: string;
  attendees?: number;
}

const eventsData: Event[] = [
  {
    id: "EVT-001",
    title: "New Year's Day",
    description: "Public Holiday - Office Closed",
    date: new Date(2025, 0, 1),
    time: "All Day",
    location: "N/A",
    type: "holiday",
    isAllDay: true,
    isOptional: false,
    organizer: "HR Department"
  },
  {
    id: "EVT-002",
    title: "Republic Day",
    description: "National Holiday - Office Closed",
    date: new Date(2025, 0, 26),
    time: "All Day",
    location: "N/A",
    type: "holiday",
    isAllDay: true,
    isOptional: false,
    organizer: "HR Department"
  },
  {
    id: "EVT-003",
    title: "Q1 All-Hands Meeting",
    description: "Quarterly business update and team achievements review with leadership",
    date: new Date(2025, 0, 8),
    time: "10:00 AM - 12:00 PM",
    location: "Main Conference Hall",
    type: "company",
    isAllDay: false,
    isOptional: false,
    organizer: "CEO Office",
    attendees: 250
  },
  {
    id: "EVT-004",
    title: "React Advanced Workshop",
    description: "Deep dive into React patterns, performance optimization, and best practices",
    date: new Date(2025, 0, 10),
    endDate: new Date(2025, 0, 11),
    time: "2:00 PM - 5:00 PM",
    location: "Training Room 2",
    type: "training",
    isAllDay: false,
    isOptional: true,
    organizer: "Learning & Development",
    attendees: 30
  },
  {
    id: "EVT-005",
    title: "January Birthday Celebrations",
    description: "Celebrating all January birthdays with cake and fun activities",
    date: new Date(2025, 0, 15),
    time: "4:00 PM - 5:30 PM",
    location: "Cafeteria",
    type: "celebration",
    isAllDay: false,
    isOptional: true,
    organizer: "HR & Culture Team",
    attendees: 45
  },
  {
    id: "EVT-006",
    title: "Sprint Planning - Team Alpha",
    description: "Bi-weekly sprint planning session for Q1 deliverables",
    date: new Date(2025, 0, 6),
    time: "9:30 AM - 11:00 AM",
    location: "Virtual - Google Meet",
    type: "meeting",
    isAllDay: false,
    isOptional: false,
    organizer: "Scrum Master",
    attendees: 12
  },
  {
    id: "EVT-007",
    title: "Annual Health Checkup Camp",
    description: "Free comprehensive health checkup for all employees",
    date: new Date(2025, 0, 20),
    endDate: new Date(2025, 0, 22),
    time: "9:00 AM - 6:00 PM",
    location: "Medical Room, Ground Floor",
    type: "company",
    isAllDay: false,
    isOptional: true,
    organizer: "HR & Admin",
    attendees: 200
  },
  {
    id: "EVT-008",
    title: "Team Outing - Adventure Park",
    description: "Annual team outing to Adventure Island with lunch and activities",
    date: new Date(2025, 0, 25),
    time: "8:00 AM - 6:00 PM",
    location: "Adventure Island, Delhi",
    type: "team",
    isAllDay: true,
    isOptional: true,
    organizer: "Team Lead",
    attendees: 15
  },
];

const eventTypeConfig = {
  holiday: { label: "Holiday", icon: Star, color: "bg-red-500/10 text-red-600 border-red-500/20", bgColor: "bg-red-500" },
  meeting: { label: "Meeting", icon: Video, color: "bg-blue-500/10 text-blue-600 border-blue-500/20", bgColor: "bg-blue-500" },
  training: { label: "Training", icon: GraduationCap, color: "bg-purple-500/10 text-purple-600 border-purple-500/20", bgColor: "bg-purple-500" },
  celebration: { label: "Celebration", icon: PartyPopper, color: "bg-pink-500/10 text-pink-600 border-pink-500/20", bgColor: "bg-pink-500" },
  company: { label: "Company", icon: Building, color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20", bgColor: "bg-cyan-500" },
  team: { label: "Team Event", icon: Users, color: "bg-orange-500/10 text-orange-600 border-orange-500/20", bgColor: "bg-orange-500" },
};

export default function Events() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const today = new Date();

  const upcomingEvents = eventsData
    .filter(event => isAfter(event.date, addDays(today, -1)))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const selectedDateEvents = selectedDate 
    ? eventsData.filter(event => isSameDay(event.date, selectedDate))
    : [];

  const thisMonthEvents = eventsData.filter(event => 
    event.date.getMonth() === today.getMonth() && event.date.getFullYear() === today.getFullYear()
  );

  const eventDates = eventsData.map(e => e.date);

  const stats = {
    total: upcomingEvents.length,
    holidays: upcomingEvents.filter(e => e.type === "holiday").length,
    meetings: upcomingEvents.filter(e => e.type === "meeting" || e.type === "company").length,
    celebrations: upcomingEvents.filter(e => e.type === "celebration" || e.type === "team").length,
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Events & Calendar</h1>
            <p className="text-muted-foreground mt-1">View upcoming company events, holidays, and activities</p>
          </div>
          <Button variant="outline">
            <Bell className="h-4 w-4 mr-2" />
            Subscribe to Calendar
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <CalendarDays className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Events</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-red-500/10">
                  <Star className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Holidays</p>
                  <p className="text-2xl font-bold">{stats.holidays}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Meetings</p>
                  <p className="text-2xl font-bold">{stats.meetings}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-pink-500/10">
                  <PartyPopper className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Celebrations</p>
                  <p className="text-2xl font-bold">{stats.celebrations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border pointer-events-auto"
                modifiers={{
                  hasEvent: eventDates,
                }}
                modifiersStyles={{
                  hasEvent: {
                    fontWeight: "bold",
                    textDecoration: "underline",
                    textDecorationColor: "hsl(var(--primary))",
                  },
                }}
              />
              
              {selectedDate && selectedDateEvents.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Events on {format(selectedDate, "MMM d, yyyy")}
                  </p>
                  {selectedDateEvents.map((event) => {
                    const config = eventTypeConfig[event.type];
                    const TypeIcon = config.icon;
                    
                    return (
                      <div key={event.id} className="p-2 rounded-lg bg-muted/50 border border-border">
                        <div className="flex items-center gap-2">
                          <div className={`p-1 rounded ${config.bgColor}`}>
                            <TypeIcon className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm font-medium truncate">{event.title}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              
              {selectedDate && selectedDateEvents.length === 0 && (
                <p className="mt-4 text-sm text-muted-foreground text-center">
                  No events on {format(selectedDate, "MMM d, yyyy")}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Events List */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>All scheduled events and activities</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Events</TabsTrigger>
                  <TabsTrigger value="holidays">Holidays</TabsTrigger>
                  <TabsTrigger value="meetings">Meetings</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </TabsContent>
                
                <TabsContent value="holidays" className="space-y-3">
                  {upcomingEvents.filter(e => e.type === "holiday").map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </TabsContent>
                
                <TabsContent value="meetings" className="space-y-3">
                  {upcomingEvents.filter(e => e.type === "meeting" || e.type === "company").map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </TabsContent>
                
                <TabsContent value="activities" className="space-y-3">
                  {upcomingEvents.filter(e => e.type === "celebration" || e.type === "team" || e.type === "training").map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </ESSLayout>
  );
}

function EventCard({ event }: { event: Event }) {
  const config = eventTypeConfig[event.type];
  const TypeIcon = config.icon;
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-all cursor-pointer">
          <div className={`p-3 rounded-xl ${config.bgColor} shrink-0`}>
            <TypeIcon className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-1">{event.description}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <Badge variant="outline" className={config.color}>
                  {config.label}
                </Badge>
                {event.isOptional && (
                  <Badge variant="secondary" className="text-xs">Optional</Badge>
                )}
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{format(event.date, "MMM d, yyyy")}</span>
                {event.endDate && <span> - {format(event.endDate, "MMM d")}</span>}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              {event.location !== "N/A" && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span className="truncate max-w-[150px]">{event.location}</span>
                </div>
              )}
              {event.attendees && (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} attendees</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${config.bgColor}`}>
              <TypeIcon className="h-5 w-5 text-white" />
            </div>
            {event.title}
          </DialogTitle>
          <DialogDescription>{event.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">
                {format(event.date, "MMMM d, yyyy")}
                {event.endDate && ` - ${format(event.endDate, "MMMM d, yyyy")}`}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-medium">{event.time}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{event.location}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Type</p>
              <Badge variant="outline" className={config.color}>{config.label}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Organizer</p>
              <p className="font-medium">{event.organizer}</p>
            </div>
            {event.attendees && (
              <div>
                <p className="text-sm text-muted-foreground">Expected Attendees</p>
                <p className="font-medium">{event.attendees} people</p>
              </div>
            )}
            <div className="col-span-2">
              <p className="text-sm text-muted-foreground">Attendance</p>
              <Badge variant={event.isOptional ? "secondary" : "default"}>
                {event.isOptional ? "Optional" : "Mandatory"}
              </Badge>
            </div>
          </div>
          
          {event.type !== "holiday" && (
            <div className="flex gap-2 pt-4 border-t">
              <Button className="flex-1">
                <CalendarCheck className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
