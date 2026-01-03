import { useState, useEffect } from "react";
import { Clock, LogIn, LogOut, Coffee, MapPin } from "lucide-react";
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
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [clockInTime, setClockInTime] = useState<Date | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  const [totalBreakTime, setTotalBreakTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState<string>("Fetching location...");

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
            );
            const data = await response.json();
            const city = data.address?.city || data.address?.town || data.address?.village || "";
            const country = data.address?.country || "";
            setLocation(city ? `${city}, ${country}` : country || "Location detected");
          } catch {
            setLocation("Location detected");
          }
        },
        () => {
          setLocation("Location unavailable");
        }
      );
    } else {
      setLocation("Location unavailable");
    }
  }, []);

  const handleClockIn = () => {
    setIsClockedIn(true);
    setClockInTime(new Date());
    setTotalBreakTime(0);
    toast.success("Clocked in successfully", {
      description: `Clock in time: ${new Date().toLocaleTimeString()}`,
    });
  };

  const handleClockOut = () => {
    if (isOnBreak) {
      handleBreakEnd();
    }
    setIsClockedIn(false);
    const duration = clockInTime
      ? Math.floor((new Date().getTime() - clockInTime.getTime()) / 1000 / 60) - Math.floor(totalBreakTime / 60)
      : 0;
    toast.success("Clocked out successfully", {
      description: `Working time: ${Math.floor(duration / 60)}h ${duration % 60}m`,
    });
    setClockInTime(null);
    setTotalBreakTime(0);
  };

  const handleBreakStart = () => {
    setIsOnBreak(true);
    setBreakStartTime(new Date());
    toast.info("Break started", {
      description: "Enjoy your break!",
    });
  };

  const handleBreakEnd = () => {
    if (breakStartTime) {
      const breakDuration = Math.floor((new Date().getTime() - breakStartTime.getTime()) / 1000);
      setTotalBreakTime((prev) => prev + breakDuration);
    }
    setIsOnBreak(false);
    setBreakStartTime(null);
    toast.info("Break ended", {
      description: "Welcome back!",
    });
  };

  const formatDuration = () => {
    if (!clockInTime) return "00:00:00";
    let diff = Math.floor((currentTime.getTime() - clockInTime.getTime()) / 1000);
    // Subtract break time
    diff -= totalBreakTime;
    if (isOnBreak && breakStartTime) {
      diff -= Math.floor((currentTime.getTime() - breakStartTime.getTime()) / 1000);
    }
    if (diff < 0) diff = 0;
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatBreakDuration = () => {
    if (!breakStartTime) return "00:00";
    const diff = Math.floor((currentTime.getTime() - breakStartTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 font-medium",
            isOnBreak
              ? "text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
              : isClockedIn
              ? "text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <div className={cn(
            "h-2 w-2 rounded-full",
            isOnBreak 
              ? "bg-amber-500 animate-pulse" 
              : isClockedIn 
              ? "bg-green-500 animate-pulse" 
              : "bg-muted-foreground/50"
          )} />
          {isOnBreak ? (
            <Coffee className="h-4 w-4" />
          ) : (
            <Clock className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {isOnBreak ? "On Break" : isClockedIn ? formatDuration() : "Clock In"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-72 p-4">
        <div className="space-y-4">
          {/* Location */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span>{location}</span>
          </div>

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
            <>
              {/* Working Time */}
              <div className={cn(
                "rounded-lg p-3 text-center",
                isOnBreak 
                  ? "bg-muted" 
                  : "bg-green-50 dark:bg-green-950/30"
              )}>
                <p className={cn(
                  "text-xs mb-1",
                  isOnBreak ? "text-muted-foreground" : "text-green-600 dark:text-green-400"
                )}>Working Time</p>
                <p className={cn(
                  "text-xl font-bold",
                  isOnBreak ? "text-muted-foreground" : "text-green-700 dark:text-green-300"
                )}>
                  {formatDuration()}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Clocked in at {clockInTime?.toLocaleTimeString()}
                </p>
              </div>

              {/* Break Status */}
              {isOnBreak && (
                <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3 text-center">
                  <p className="text-xs text-amber-600 dark:text-amber-400 mb-1">Break Time</p>
                  <p className="text-xl font-bold text-amber-700 dark:text-amber-300">
                    {formatBreakDuration()}
                  </p>
                </div>
              )}

              {/* Break Button */}
              <Button
                onClick={isOnBreak ? handleBreakEnd : handleBreakStart}
                variant="outline"
                className={cn(
                  "w-full gap-2",
                  isOnBreak && "border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30"
                )}
              >
                <Coffee className="h-4 w-4" />
                {isOnBreak ? "End Break" : "Start Break"}
              </Button>
            </>
          )}

          {/* Clock In/Out Button */}
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
