import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarEvent, EventCategory } from "./EventCalendar";
import { format } from "date-fns";

interface EventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event?: CalendarEvent | null;
  categories: EventCategory[];
  defaultDate?: Date;
  defaultHour?: number;
  onSave: (event: Omit<CalendarEvent, "id"> | CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
}

const locations = [
  "HQ Office",
  "Conference Room A",
  "Conference Room B",
  "Training Room",
  "Main Hall",
  "Cafeteria",
  "Store 1",
  "Store 2",
  "Virtual / Online",
];

export function EventDialog({
  open,
  onOpenChange,
  event,
  categories,
  defaultDate,
  defaultHour,
  onSave,
  onDelete,
}: EventDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [allDay, setAllDay] = useState(false);

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDescription(event.description || "");
      setCategoryId(event.categoryId);
      setStartDate(format(new Date(event.startDate), "yyyy-MM-dd"));
      setStartTime(format(new Date(event.startDate), "HH:mm"));
      setEndDate(format(new Date(event.endDate), "yyyy-MM-dd"));
      setEndTime(format(new Date(event.endDate), "HH:mm"));
      setLocation(event.location || "");
      setOrganizer(event.organizer || "");
      setAllDay(event.allDay || false);
    } else {
      resetForm();
      if (defaultDate) {
        setStartDate(format(defaultDate, "yyyy-MM-dd"));
        setEndDate(format(defaultDate, "yyyy-MM-dd"));
        if (defaultHour !== undefined) {
          setStartTime(`${String(defaultHour).padStart(2, "0")}:00`);
          setEndTime(`${String(defaultHour + 1).padStart(2, "0")}:00`);
        }
      }
    }
  }, [event, defaultDate, defaultHour, open]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategoryId(categories[0]?.id || "");
    setStartDate(format(new Date(), "yyyy-MM-dd"));
    setStartTime("09:00");
    setEndDate(format(new Date(), "yyyy-MM-dd"));
    setEndTime("10:00");
    setLocation("");
    setOrganizer("");
    setAllDay(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const startDateTime = allDay
      ? `${startDate}T00:00:00`
      : `${startDate}T${startTime}:00`;
    const endDateTime = allDay
      ? `${endDate}T23:59:59`
      : `${endDate}T${endTime}:00`;

    const eventData = {
      ...(event?.id && { id: event.id }),
      title,
      description,
      categoryId,
      startDate: startDateTime,
      endDate: endDateTime,
      location,
      organizer,
      allDay,
    };

    onSave(eventData as CalendarEvent);
    onOpenChange(false);
    resetForm();
  };

  const handleDelete = () => {
    if (event?.id && onDelete) {
      onDelete(event.id);
      onOpenChange(false);
      resetForm();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Create New Event"}</DialogTitle>
          <DialogDescription>
            {event
              ? "Update the event details below."
              : "Fill in the details to create a new event."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={categoryId} onValueChange={setCategoryId} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        />
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                id="allDay"
                checked={allDay}
                onCheckedChange={setAllDay}
              />
              <Label htmlFor="allDay">All Day Event</Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date *</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              {!allDay && (
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date *</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
              {!allDay && (
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    required
                  />
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="organizer">Organizer</Label>
              <Input
                id="organizer"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                placeholder="Enter organizer name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter event description"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            {event && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {event ? "Update Event" : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
