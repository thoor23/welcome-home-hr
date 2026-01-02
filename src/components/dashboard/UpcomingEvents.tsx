import { Calendar, Gift, Users, Clock } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Team Meeting",
    time: "10:00 AM",
    date: "Today",
    icon: Users,
    color: "bg-primary/20 text-primary",
  },
  {
    id: 2,
    title: "Sarah's Birthday",
    time: "All Day",
    date: "Tomorrow",
    icon: Gift,
    color: "bg-pink-500/20 text-pink-500",
  },
  {
    id: 3,
    title: "Quarterly Review",
    time: "2:00 PM",
    date: "Jan 15",
    icon: Calendar,
    color: "bg-amber-500/20 text-amber-500",
  },
  {
    id: 4,
    title: "Training Session",
    time: "11:00 AM",
    date: "Jan 16",
    icon: Clock,
    color: "bg-emerald-500/20 text-emerald-500",
  },
];

export function UpcomingEvents() {
  return (
    <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View calendar
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
            <div className={`p-2 rounded-lg ${event.color}`}>
              <event.icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{event.title}</p>
              <p className="text-xs text-muted-foreground">{event.time}</p>
            </div>
            <span className="text-xs text-muted-foreground">{event.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
