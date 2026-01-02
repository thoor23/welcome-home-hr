import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const activities = [
  {
    id: 1,
    user: "Sarah Johnson",
    initials: "SJ",
    action: "submitted leave request",
    time: "2 min ago",
    type: "leave",
  },
  {
    id: 2,
    user: "Mike Chen",
    initials: "MC",
    action: "completed onboarding",
    time: "15 min ago",
    type: "onboarding",
  },
  {
    id: 3,
    user: "Emily Davis",
    initials: "ED",
    action: "updated profile",
    time: "1 hour ago",
    type: "profile",
  },
  {
    id: 4,
    user: "Alex Wilson",
    initials: "AW",
    action: "clocked in late",
    time: "2 hours ago",
    type: "attendance",
  },
  {
    id: 5,
    user: "Lisa Brown",
    initials: "LB",
    action: "received performance bonus",
    time: "3 hours ago",
    type: "payroll",
  },
];

const typeColors: Record<string, string> = {
  leave: "bg-amber-500/20 text-amber-500",
  onboarding: "bg-emerald-500/20 text-emerald-500",
  profile: "bg-blue-500/20 text-blue-500",
  attendance: "bg-red-500/20 text-red-500",
  payroll: "bg-purple-500/20 text-purple-500",
};

export function RecentActivity() {
  return (
    <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-gradient-to-br from-primary/20 to-purple-500/20 text-foreground text-xs">
                {activity.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
            <Badge variant="outline" className={typeColors[activity.type]}>
              {activity.type}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
