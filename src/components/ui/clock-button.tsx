import { useState, useEffect } from "react";
import { Clock, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function ClockButton() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockIn = () => {
    setIsClockedIn(true);
    setClockInTime(new Date());
    toast.success("Clocked in successfully", {
      description: `Clock in time: ${new Date().toLocaleTimeString()}`,
    });
  };

  const handleClockOut = () => {
    setIsClockedIn(false);
    const duration = clockInTime
      ? Math.floor((new Date().getTime() - clockInTime.getTime()) / 1000 / 60)
      : 0;
    toast.success("Clocked out successfully", {
      description: `Total time: ${Math.floor(duration / 60)}h ${duration % 60}m`,
    });
    setClockInTime(null);
  };

  const formatDuration = () => {
    if (!clockInTime) return "00:00:00";
    const diff = Math.floor((currentTime.getTime() - clockInTime.getTime()) / 1000);
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 font-medium",
            isClockedIn
              ? "text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <div className={cn(
            "h-2 w-2 rounded-full",
            isClockedIn ? "bg-green-500 animate-pulse" : "bg-muted-foreground/50"
          )} />
          <Clock className="h-4 w-4" />
          <span className="hidden sm:inline">
            {isClockedIn ? formatDuration() : "Clock In"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-64 p-4">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground mb-1">Current Time</p>
            <p className="text-2xl font-bold text-foreground">
              {currentTime.toLocaleTimeString()}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentTime.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {isClockedIn && (
            <div className="bg-green-50 dark:bg-green-950/30 rounded-lg p-3 text-center">
              <p className="text-xs text-green-600 dark:text-green-400 mb-1">Working Time</p>
              <p className="text-xl font-bold text-green-700 dark:text-green-300">
                {formatDuration()}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Clocked in at {clockInTime?.toLocaleTimeString()}
              </p>
            </div>
          )}

          <Button
            onClick={isClockedIn ? handleClockOut : handleClockIn}
            className={cn(
              "w-full gap-2",
              isClockedIn
                ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                : "bg-green-600 hover:bg-green-700 text-white"
            )}
          >
            {isClockedIn ? (
              <>
                <LogOut className="h-4 w-4" />
                Clock Out
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Clock In
              </>
            )}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
