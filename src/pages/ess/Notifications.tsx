import { useState } from "react";
import { Bell, Megaphone, Check, CheckCheck, Filter, Search, Calendar, Clock, MessageSquare, CreditCard, FileText, AlertCircle, Info, X } from "lucide-react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: number;
  title: string;
  description: string;
  category: "leave" | "payroll" | "attendance" | "hr" | "system";
  time: string;
  date: string;
  read: boolean;
  icon: React.ComponentType<{ className?: string }>;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  priority: "normal" | "important" | "urgent";
  read: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Leave Request Approved",
    description: "Your leave request for Dec 25-27 has been approved by your manager.",
    category: "leave",
    time: "10:14 AM",
    date: "Today",
    read: false,
    icon: Calendar,
  },
  {
    id: 2,
    title: "New Message from HR",
    description: "Please submit your updated emergency contact information by end of week.",
    category: "hr",
    time: "7:51 AM",
    date: "Today",
    read: false,
    icon: MessageSquare,
  },
  {
    id: 3,
    title: "Timesheet Reminder",
    description: "Reminder: Submit your timesheet for this week by Friday 5:00 PM.",
    category: "attendance",
    time: "9:25 PM",
    date: "Yesterday",
    read: false,
    icon: Clock,
  },
  {
    id: 4,
    title: "Payslip Available",
    description: "Your payslip for December 2024 is now available for download.",
    category: "payroll",
    time: "10:14 AM",
    date: "Today",
    read: true,
    icon: CreditCard,
  },
  {
    id: 5,
    title: "Policy Update",
    description: "The company leave policy has been updated. Please review the changes.",
    category: "hr",
    time: "2:30 PM",
    date: "Dec 28",
    read: true,
    icon: FileText,
  },
  {
    id: 6,
    title: "System Maintenance",
    description: "Scheduled maintenance on Jan 5, 2025 from 2:00 AM - 4:00 AM.",
    category: "system",
    time: "11:00 AM",
    date: "Dec 27",
    read: true,
    icon: AlertCircle,
  },
  {
    id: 7,
    title: "Leave Balance Updated",
    description: "Your annual leave balance has been credited with 2 additional days.",
    category: "leave",
    time: "3:45 PM",
    date: "Dec 26",
    read: true,
    icon: Calendar,
  },
  {
    id: 8,
    title: "Attendance Regularization Approved",
    description: "Your attendance regularization request for Dec 20 has been approved.",
    category: "attendance",
    time: "9:00 AM",
    date: "Dec 25",
    read: true,
    icon: Clock,
  },
];

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Holiday Schedule 2025",
    content: "Please find the official holiday schedule for 2025 attached. Mark your calendars and plan your leaves accordingly. The HR team wishes everyone a happy and productive new year!",
    author: "Sarah Johnson",
    authorRole: "HR Director",
    date: "Jan 2, 2025",
    priority: "important",
    read: false,
  },
  {
    id: 2,
    title: "New Health Insurance Benefits",
    content: "We're excited to announce enhanced health insurance benefits starting January 2025. The new plan includes expanded coverage for mental health services, dental care, and vision. Please attend the information session on Jan 10th.",
    author: "Michael Chen",
    authorRole: "Benefits Manager",
    date: "Dec 30, 2024",
    priority: "normal",
    read: false,
  },
  {
    id: 3,
    title: "Office Renovation Notice",
    content: "The 3rd floor will undergo renovation from Jan 15-30. Teams located on this floor will be temporarily relocated to the 5th floor. Please coordinate with your manager for seating arrangements.",
    author: "Facilities Team",
    authorRole: "Operations",
    date: "Dec 28, 2024",
    priority: "urgent",
    read: true,
  },
  {
    id: 4,
    title: "Annual Performance Review Cycle",
    content: "The annual performance review cycle begins on January 15th. All employees should complete their self-assessments by January 25th. Manager reviews will be conducted from January 26th to February 10th.",
    author: "Lisa Wong",
    authorRole: "HR Manager",
    date: "Dec 26, 2024",
    priority: "important",
    read: true,
  },
  {
    id: 5,
    title: "Company Town Hall Meeting",
    content: "Join us for the quarterly town hall meeting on January 20th at 3:00 PM. CEO will share company updates, Q4 results, and 2025 roadmap. Submit your questions in advance via the HR portal.",
    author: "Executive Office",
    authorRole: "Leadership",
    date: "Dec 24, 2024",
    priority: "normal",
    read: true,
  },
];

const categoryColors: Record<string, string> = {
  leave: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  payroll: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  attendance: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  hr: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
  system: "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
};

const priorityColors: Record<string, string> = {
  normal: "bg-muted text-muted-foreground",
  important: "bg-primary/10 text-primary",
  urgent: "bg-destructive/10 text-destructive",
};

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<string>("all");

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadAnnouncements = announcements.filter(a => !a.read).length;

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAnnouncementAsRead = (id: number) => {
    setAnnouncements(prev => prev.map(a => (a.id === id ? { ...a, read: true } : a)));
  };

  const markAllAnnouncementsAsRead = () => {
    setAnnouncements(prev => prev.map(a => ({ ...a, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         n.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "unread" && !n.read) ||
                         (filterStatus === "read" && n.read);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(n.category);
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const filteredAnnouncements = announcements.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         a.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "unread" && !a.read) ||
                         (filterStatus === "read" && a.read);
    return matchesSearch && matchesStatus;
  });

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Notifications & Announcements</h1>
            <p className="text-muted-foreground">Stay updated with company news and alerts</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Bell className="h-3 w-3" />
              {unreadNotifications + unreadAnnouncements} unread
            </Badge>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterStatus} onValueChange={(v) => setFilterStatus(v as typeof filterStatus)}>
                <SelectTrigger className="w-full sm:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Category
                    {selectedCategories.length > 0 && (
                      <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                        {selectedCategories.length}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {["leave", "payroll", "attendance", "hr", "system"].map((cat) => (
                    <DropdownMenuCheckboxItem
                      key={cat}
                      checked={selectedCategories.includes(cat)}
                      onCheckedChange={(checked) => {
                        setSelectedCategories(prev =>
                          checked ? [...prev, cat] : prev.filter(c => c !== cat)
                        );
                      }}
                    >
                      <span className="capitalize">{cat}</span>
                    </DropdownMenuCheckboxItem>
                  ))}
                  {selectedCategories.length > 0 && (
                    <>
                      <DropdownMenuSeparator />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-muted-foreground"
                        onClick={() => setSelectedCategories([])}
                      >
                        Clear filters
                      </Button>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="notifications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="h-4 w-4" />
              Notifications
              {unreadNotifications > 0 && (
                <Badge className="ml-1 h-5 min-w-5 p-0 flex items-center justify-center bg-primary">
                  {unreadNotifications}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="announcements" className="gap-2">
              <Megaphone className="h-4 w-4" />
              Announcements
              {unreadAnnouncements > 0 && (
                <Badge className="ml-1 h-5 min-w-5 p-0 flex items-center justify-center bg-primary">
                  {unreadAnnouncements}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? "s" : ""}
              </p>
              {unreadNotifications > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllNotificationsAsRead} className="gap-2">
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {filteredNotifications.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No notifications found</p>
                  </CardContent>
                </Card>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`transition-colors cursor-pointer hover:bg-secondary/50 ${
                      !notification.read ? "bg-primary/5 border-primary/20" : ""
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Unread indicator */}
                        <div className="flex items-center justify-center w-2 pt-2">
                          {!notification.read && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>

                        {/* Icon */}
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <notification.icon className="h-5 w-5 text-primary" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className={`text-sm ${!notification.read ? "font-semibold text-foreground" : "text-foreground"}`}>
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                {notification.description}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-destructive flex-shrink-0"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="secondary" className={categoryColors[notification.category]}>
                              {notification.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {notification.date} at {notification.time}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-primary flex-shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              markNotificationAsRead(notification.id);
                            }}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Announcements Tab */}
          <TabsContent value="announcements" className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredAnnouncements.length} announcement{filteredAnnouncements.length !== 1 ? "s" : ""}
              </p>
              {unreadAnnouncements > 0 && (
                <Button variant="ghost" size="sm" onClick={markAllAnnouncementsAsRead} className="gap-2">
                  <CheckCheck className="h-4 w-4" />
                  Mark all as read
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {filteredAnnouncements.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Megaphone className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No announcements found</p>
                  </CardContent>
                </Card>
              ) : (
                filteredAnnouncements.map((announcement) => (
                  <Card
                    key={announcement.id}
                    className={`transition-colors ${
                      !announcement.read ? "bg-primary/5 border-primary/20" : ""
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Unread indicator */}
                        <div className="flex items-center justify-center w-2 pt-1">
                          {!announcement.read && (
                            <div className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className={`text-base ${!announcement.read ? "font-semibold" : "font-medium"} text-foreground`}>
                                {announcement.title}
                              </h3>
                              <Badge className={priorityColors[announcement.priority]}>
                                {announcement.priority}
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {announcement.date}
                            </span>
                          </div>

                          <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                            {announcement.content}
                          </p>

                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                                  {announcement.author.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium text-foreground">{announcement.author}</p>
                                <p className="text-xs text-muted-foreground">{announcement.authorRole}</p>
                              </div>
                            </div>

                            {!announcement.read && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="gap-2"
                                onClick={() => markAnnouncementAsRead(announcement.id)}
                              >
                                <Check className="h-4 w-4" />
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ESSLayout>
  );
}