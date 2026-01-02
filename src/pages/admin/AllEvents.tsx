import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { EventCalendar, CalendarEvent, EventCategory } from "@/components/events/EventCalendar";
import { EventDialog } from "@/components/events/EventDialog";
import { useToast } from "@/hooks/use-toast";

// Sample categories
const defaultCategories: EventCategory[] = [
  { id: "1", name: "Meeting", color: "#3B82F6" },
  { id: "2", name: "Training", color: "#8B5CF6" },
  { id: "3", name: "Workshop", color: "#10B981" },
  { id: "4", name: "Conference", color: "#F59E0B" },
  { id: "5", name: "Holiday", color: "#EF4444" },
  { id: "6", name: "Team Building", color: "#EC4899" },
  { id: "7", name: "Webinar", color: "#06B6D4" },
  { id: "8", name: "Interview", color: "#6366F1" },
];

// Sample events
const sampleEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Research and Ideas",
    description: "Brainstorming session for Q1 projects",
    startDate: "2025-01-02T10:00:00",
    endDate: "2025-01-02T12:00:00",
    categoryId: "1",
    location: "Conference Room A",
    organizer: "John Smith",
  },
  {
    id: "2",
    title: "Webdesign Feedback",
    description: "Review new website designs",
    startDate: "2025-01-03T14:00:00",
    endDate: "2025-01-03T16:00:00",
    categoryId: "3",
    location: "Training Room",
    organizer: "Sarah Johnson",
  },
  {
    id: "3",
    title: "Q1 Planning",
    description: "Quarterly planning session",
    startDate: "2025-01-05T09:00:00",
    endDate: "2025-01-05T17:00:00",
    categoryId: "4",
    location: "Main Hall",
    organizer: "CEO",
  },
  {
    id: "4",
    title: "New Hire Orientation",
    description: "Onboarding new employees",
    startDate: "2025-01-06T10:00:00",
    endDate: "2025-01-06T13:00:00",
    categoryId: "2",
    location: "Training Room",
    organizer: "HR Team",
  },
  {
    id: "5",
    title: "Team Lunch",
    description: "Monthly team bonding",
    startDate: "2025-01-07T12:30:00",
    endDate: "2025-01-07T14:00:00",
    categoryId: "6",
    location: "Cafeteria",
    organizer: "Office Manager",
  },
];

const AllEvents = () => {
  const { toast } = useToast();
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [defaultDate, setDefaultDate] = useState<Date | undefined>();
  const [defaultHour, setDefaultHour] = useState<number | undefined>();

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setDefaultDate(undefined);
    setDefaultHour(undefined);
    setDialogOpen(true);
  };

  const handleSlotClick = (date: Date, hour?: number) => {
    setSelectedEvent(null);
    setDefaultDate(date);
    setDefaultHour(hour);
    setDialogOpen(true);
  };

  const handleSaveEvent = (eventData: Omit<CalendarEvent, "id"> | CalendarEvent) => {
    if ("id" in eventData && eventData.id) {
      // Update existing event
      setEvents((prev) =>
        prev.map((e) => (e.id === eventData.id ? (eventData as CalendarEvent) : e))
      );
      toast({
        title: "Event Updated",
        description: "The event has been updated successfully.",
      });
    } else {
      // Create new event
      const newEvent: CalendarEvent = {
        ...eventData,
        id: String(Date.now()),
      };
      setEvents((prev) => [...prev, newEvent]);
      toast({
        title: "Event Created",
        description: "The event has been created successfully.",
      });
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    toast({
      title: "Event Deleted",
      description: "The event has been deleted successfully.",
      variant: "destructive",
    });
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setDefaultDate(new Date());
    setDefaultHour(9);
    setDialogOpen(true);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">Events Calendar</h1>
              <p className="text-muted-foreground">Manage all office and store events</p>
            </div>
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                {defaultCategories.slice(0, 6).map((category) => (
                  <div key={category.id} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm text-muted-foreground">
                      {category.name}
                    </span>
                  </div>
                ))}
              </div>
              <Button onClick={handleCreateEvent}>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </div>

            <EventCalendar
              events={events}
              categories={defaultCategories}
              onEventClick={handleEventClick}
              onSlotClick={handleSlotClick}
            />

            <EventDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              event={selectedEvent}
              categories={defaultCategories}
              defaultDate={defaultDate}
              defaultHour={defaultHour}
              onSave={handleSaveEvent}
              onDelete={handleDeleteEvent}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AllEvents;
