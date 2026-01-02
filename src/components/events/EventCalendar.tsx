import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  startOfWeek,
  endOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  addMonths,
  subMonths,
  addYears,
  subYears,
  startOfMonth,
  endOfMonth,
  startOfYear,
  isSameDay,
  isToday,
  getHours,
  getMinutes,
  parseISO,
  startOfDay,
  endOfDay,
} from "date-fns";

export type EventCategory = {
  id: string;
  name: string;
  color: string;
};

export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  allDay?: boolean;
  categoryId: string;
  category?: EventCategory;
  location?: string;
  organizer?: string;
  attendees?: string[];
};

type ViewMode = "day" | "week" | "month" | "year";

interface EventCalendarProps {
  events: CalendarEvent[];
  categories: EventCategory[];
  onEventClick?: (event: CalendarEvent) => void;
  onSlotClick?: (date: Date, hour?: number) => void;
  className?: string;
}

const hours = Array.from({ length: 24 }, (_, i) => i);

export function EventCalendar({
  events,
  categories,
  onEventClick,
  onSlotClick,
  className,
}: EventCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("week");

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    return category?.color || "#3B82F6";
  };

  const navigate = (direction: "prev" | "next") => {
    if (viewMode === "day") {
      setCurrentDate((prev) =>
        direction === "next" ? addDays(prev, 1) : addDays(prev, -1)
      );
    } else if (viewMode === "week") {
      setCurrentDate((prev) =>
        direction === "next" ? addWeeks(prev, 1) : subWeeks(prev, 1)
      );
    } else if (viewMode === "month") {
      setCurrentDate((prev) =>
        direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1)
      );
    } else {
      setCurrentDate((prev) =>
        direction === "next" ? addYears(prev, 1) : subYears(prev, 1)
      );
    }
  };

  const goToToday = () => setCurrentDate(new Date());

  const weekDays = useMemo(() => {
    const start = startOfWeek(currentDate, { weekStartsOn: 0 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }, [currentDate]);

  const getEventsForDateAndHour = (date: Date, hour: number) => {
    return events.filter((event) => {
      const eventStart = parseISO(event.startDate);
      const eventEnd = parseISO(event.endDate);
      const slotStart = new Date(date);
      slotStart.setHours(hour, 0, 0, 0);
      const slotEnd = new Date(date);
      slotEnd.setHours(hour + 1, 0, 0, 0);

      return (
        isSameDay(eventStart, date) &&
        getHours(eventStart) <= hour &&
        getHours(eventEnd) > hour
      );
    });
  };

  const getEventStyle = (event: CalendarEvent) => {
    const eventStart = parseISO(event.startDate);
    const eventEnd = parseISO(event.endDate);
    const startMinutes = getMinutes(eventStart);
    const durationHours =
      (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60);
    const heightPercent = Math.min(durationHours * 100, 100);

    return {
      top: `${(startMinutes / 60) * 100}%`,
      height: `${heightPercent}%`,
      minHeight: "2rem",
    };
  };

  const getEventsForDay = (date: Date) => {
    return events.filter((event) => {
      const eventStart = parseISO(event.startDate);
      return isSameDay(eventStart, date);
    });
  };

  const monthDays = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const startWeek = startOfWeek(start, { weekStartsOn: 0 });
    const endWeek = endOfWeek(end, { weekStartsOn: 0 });
    const days: Date[] = [];
    let day = startWeek;
    while (day <= endWeek) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentDate]);

  const currentTimePosition = useMemo(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    return ((hours * 60 + minutes) / (24 * 60)) * 100;
  }, []);

  const renderHeader = () => {
    let displayText = "";
    if (viewMode === "day") {
      displayText = format(currentDate, "MMMM d, yyyy");
    } else if (viewMode === "week") {
      displayText = format(currentDate, "MMMM yyyy");
    } else if (viewMode === "month") {
      displayText = format(currentDate, "MMMM yyyy");
    } else {
      displayText = format(currentDate, "yyyy");
    }

    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("prev")}
            className="rounded-full"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate("next")}
            className="rounded-full"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={goToToday}
            className="rounded-full px-4"
          >
            Today
          </Button>
          <h2 className="text-xl font-semibold text-foreground ml-2">
            {displayText}
          </h2>
        </div>
        <div className="flex items-center bg-muted rounded-lg p-1">
          {(["day", "week", "month", "year"] as ViewMode[]).map((mode) => (
            <Button
              key={mode}
              variant={viewMode === mode ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode(mode)}
              className={cn(
                "capitalize rounded-md px-4",
                viewMode === mode && "shadow-sm"
              )}
            >
              {mode}
            </Button>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekView = () => (
    <div className="flex flex-col h-[calc(100vh-280px)] overflow-hidden bg-card rounded-lg border border-border">
      {/* Days Header */}
      <div className="flex border-b border-border">
        <div className="w-20 flex-shrink-0 border-r border-border" />
        {weekDays.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(
              "flex-1 text-center py-3 border-r border-border last:border-r-0",
              isToday(day) && "bg-primary/5"
            )}
          >
            <div className="text-xs text-muted-foreground uppercase">
              {format(day, "EEE")}
            </div>
            <div
              className={cn(
                "text-lg font-semibold mt-1",
                isToday(day)
                  ? "bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto"
                  : "text-foreground"
              )}
            >
              {format(day, "d")}
            </div>
          </div>
        ))}
      </div>

      {/* Time Grid */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Current Time Indicator */}
        <div
          className="absolute left-0 right-0 z-20 pointer-events-none"
          style={{ top: `${currentTimePosition}%` }}
        >
          <div className="flex items-center">
            <div className="w-20 flex-shrink-0 flex justify-end pr-2">
              <div className="w-2 h-2 rounded-full bg-destructive" />
            </div>
            <div className="flex-1 h-0.5 bg-destructive" />
          </div>
        </div>

        {hours.map((hour) => (
          <div key={hour} className="flex border-b border-border/50 h-16">
            <div className="w-20 flex-shrink-0 border-r border-border text-right pr-3 py-1">
              <span className="text-xs text-muted-foreground">
                {format(new Date().setHours(hour, 0), "h a")}
              </span>
            </div>
            {weekDays.map((day) => {
              const dayEvents = getEventsForDateAndHour(day, hour);
              const isFirstHourOfEvent = dayEvents.filter((event) => {
                const eventStart = parseISO(event.startDate);
                return getHours(eventStart) === hour;
              });

              return (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className={cn(
                    "flex-1 border-r border-border/50 last:border-r-0 relative cursor-pointer hover:bg-muted/30 transition-colors",
                    isToday(day) && "bg-primary/5"
                  )}
                  onClick={() => onSlotClick?.(day, hour)}
                >
                  {isFirstHourOfEvent.map((event) => (
                    <div
                      key={event.id}
                      className="absolute left-1 right-1 rounded-md px-2 py-1 text-xs font-medium text-white cursor-pointer overflow-hidden z-10"
                      style={{
                        backgroundColor: getCategoryColor(event.categoryId),
                        ...getEventStyle(event),
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                    >
                      <div className="truncate">{event.title}</div>
                      <div className="text-[10px] opacity-80 truncate">
                        {format(parseISO(event.startDate), "h:mm a")} -{" "}
                        {format(parseISO(event.endDate), "h:mm a")}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  const renderDayView = () => (
    <div className="flex flex-col h-[calc(100vh-280px)] overflow-hidden bg-card rounded-lg border border-border">
      {/* Day Header */}
      <div className="flex border-b border-border">
        <div className="w-20 flex-shrink-0 border-r border-border" />
        <div
          className={cn(
            "flex-1 text-center py-3",
            isToday(currentDate) && "bg-primary/5"
          )}
        >
          <div className="text-xs text-muted-foreground uppercase">
            {format(currentDate, "EEEE")}
          </div>
          <div
            className={cn(
              "text-lg font-semibold mt-1",
              isToday(currentDate)
                ? "bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center mx-auto"
                : "text-foreground"
            )}
          >
            {format(currentDate, "d")}
          </div>
        </div>
      </div>

      {/* Time Grid */}
      <div className="flex-1 overflow-y-auto relative">
        <div
          className="absolute left-0 right-0 z-20 pointer-events-none"
          style={{ top: `${currentTimePosition}%` }}
        >
          <div className="flex items-center">
            <div className="w-20 flex-shrink-0 flex justify-end pr-2">
              <div className="w-2 h-2 rounded-full bg-destructive" />
            </div>
            <div className="flex-1 h-0.5 bg-destructive" />
          </div>
        </div>

        {hours.map((hour) => {
          const dayEvents = getEventsForDateAndHour(currentDate, hour);
          const isFirstHourOfEvent = dayEvents.filter((event) => {
            const eventStart = parseISO(event.startDate);
            return getHours(eventStart) === hour;
          });

          return (
            <div key={hour} className="flex border-b border-border/50 h-16">
              <div className="w-20 flex-shrink-0 border-r border-border text-right pr-3 py-1">
                <span className="text-xs text-muted-foreground">
                  {format(new Date().setHours(hour, 0), "h a")}
                </span>
              </div>
              <div
                className={cn(
                  "flex-1 relative cursor-pointer hover:bg-muted/30 transition-colors",
                  isToday(currentDate) && "bg-primary/5"
                )}
                onClick={() => onSlotClick?.(currentDate, hour)}
              >
                {isFirstHourOfEvent.map((event) => (
                  <div
                    key={event.id}
                    className="absolute left-1 right-1 rounded-md px-2 py-1 text-xs font-medium text-white cursor-pointer overflow-hidden z-10"
                    style={{
                      backgroundColor: getCategoryColor(event.categoryId),
                      ...getEventStyle(event),
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(event);
                    }}
                  >
                    <div className="truncate">{event.title}</div>
                    <div className="text-[10px] opacity-80 truncate">
                      {format(parseISO(event.startDate), "h:mm a")} -{" "}
                      {format(parseISO(event.endDate), "h:mm a")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMonthView = () => (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Week Day Headers */}
      <div className="grid grid-cols-7 border-b border-border">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center py-3 text-sm font-medium text-muted-foreground border-r border-border last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7">
        {monthDays.map((day, index) => {
          const dayEvents = getEventsForDay(day);
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();

          return (
            <div
              key={day.toISOString()}
              className={cn(
                "min-h-[100px] border-r border-b border-border last:border-r-0 p-2 cursor-pointer hover:bg-muted/30 transition-colors",
                !isCurrentMonth && "bg-muted/20",
                isToday(day) && "bg-primary/5"
              )}
              onClick={() => onSlotClick?.(day)}
            >
              <div
                className={cn(
                  "text-sm font-medium mb-1",
                  !isCurrentMonth && "text-muted-foreground",
                  isToday(day)
                    ? "bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center"
                    : "text-foreground"
                )}
              >
                {format(day, "d")}
              </div>
              <div className="space-y-1">
                {dayEvents.slice(0, 3).map((event) => (
                  <div
                    key={event.id}
                    className="text-[10px] rounded px-1 py-0.5 truncate text-white cursor-pointer"
                    style={{ backgroundColor: getCategoryColor(event.categoryId) }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick?.(event);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <div className="text-[10px] text-muted-foreground">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date(currentDate.getFullYear(), i, 1);
      return date;
    });

    return (
      <div className="grid grid-cols-4 gap-4">
        {months.map((month) => {
          const monthStart = startOfMonth(month);
          const monthEnd = endOfMonth(month);
          const monthEvents = events.filter((event) => {
            const eventStart = parseISO(event.startDate);
            return eventStart >= monthStart && eventStart <= monthEnd;
          });

          return (
            <div
              key={month.toISOString()}
              className="bg-card rounded-lg border border-border p-4 cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => {
                setCurrentDate(month);
                setViewMode("month");
              }}
            >
              <div className="text-sm font-semibold text-foreground mb-2">
                {format(month, "MMMM")}
              </div>
              <div className="text-2xl font-bold text-primary">
                {monthEvents.length}
              </div>
              <div className="text-xs text-muted-foreground">events</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn("w-full", className)}>
      {renderHeader()}
      {viewMode === "day" && renderDayView()}
      {viewMode === "week" && renderWeekView()}
      {viewMode === "month" && renderMonthView()}
      {viewMode === "year" && renderYearView()}
    </div>
  );
}
