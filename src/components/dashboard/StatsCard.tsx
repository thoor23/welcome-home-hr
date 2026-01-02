import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: "positive" | "negative";
  icon: LucideIcon;
  iconColor?: string;
}

export function StatsCard({
  title,
  value,
  change,
  changeType = "positive",
  icon: Icon,
  iconColor = "text-primary",
}: StatsCardProps) {
  return (
    <div className="bg-card/50 backdrop-blur-xl border border-border/50 rounded-xl p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold text-foreground mt-1">{value}</h3>
          {change && (
            <p
              className={cn(
                "text-sm mt-2 font-medium",
                changeType === "positive" ? "text-emerald-500" : "text-red-500"
              )}
            >
              {changeType === "positive" ? "↑" : "↓"} {change}
            </p>
          )}
        </div>
        <div className={cn("p-3 rounded-xl bg-secondary/50", iconColor)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
