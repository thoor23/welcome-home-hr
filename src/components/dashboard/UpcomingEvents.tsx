import { Calendar, Gift, Users, Clock } from "lucide-react";

const events = [
  { id: 1, title: "Team Meeting", time: "10:00 AM", date: "Today", icon: Users, color: "bg-primary/10 text-primary" },
  { id: 2, title: "Sarah's Birthday", time: "All Day", date: "Tomorrow", icon: Gift, color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400" },
  { id: 3, title: "Quarterly Review", time: "2:00 PM", date: "Jan 15", icon: Calendar, color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" },
  { id: 4, title: "Training Session", time: "11:00 AM", date: "Jan 16", icon: Clock, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
];

export function UpcomingEvents() {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Events</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">View calendar</button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
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
