import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Video,
  Phone,
  Users,
  MapPin,
  Edit,
  MessageSquare,
} from "lucide-react";

interface Interview {
  id: string;
  candidateName: string;
  candidateAvatar: string;
  jobTitle: string;
  interviewType: string;
  round: string;
  scheduledDate: string;
  scheduledTime: string;
  duration: string;
  interviewers: string[];
  location: string;
  status: string;
  feedback?: string;
}

const mockUpcomingInterviews: Interview[] = [
  {
    id: "1",
    candidateName: "John Smith",
    candidateAvatar: "",
    jobTitle: "Senior Software Engineer",
    interviewType: "Video",
    round: "Technical Round",
    scheduledDate: "2024-01-25",
    scheduledTime: "10:00 AM",
    duration: "1 hour",
    interviewers: ["Sarah Miller", "Tom Brown"],
    location: "Google Meet",
    status: "Scheduled",
  },
  {
    id: "2",
    candidateName: "Emily Johnson",
    candidateAvatar: "",
    jobTitle: "Product Manager",
    interviewType: "In-person",
    round: "Final Round",
    scheduledDate: "2024-01-26",
    scheduledTime: "2:00 PM",
    duration: "1.5 hours",
    interviewers: ["Mike Davis", "Lisa Chen"],
    location: "Conference Room A",
    status: "Scheduled",
  },
  {
    id: "3",
    candidateName: "Michael Chen",
    candidateAvatar: "",
    jobTitle: "UI/UX Designer",
    interviewType: "Video",
    round: "Portfolio Review",
    scheduledDate: "2024-01-24",
    scheduledTime: "11:00 AM",
    duration: "45 mins",
    interviewers: ["Anna White"],
    location: "Zoom",
    status: "In Progress",
  },
];

const mockCompletedInterviews: Interview[] = [
  {
    id: "4",
    candidateName: "Sarah Williams",
    candidateAvatar: "",
    jobTitle: "Data Analyst",
    interviewType: "Phone",
    round: "HR Round",
    scheduledDate: "2024-01-20",
    scheduledTime: "3:00 PM",
    duration: "30 mins",
    interviewers: ["HR Team"],
    location: "Phone Call",
    status: "Completed",
    feedback: "Strong communication skills. Recommended for next round.",
  },
  {
    id: "5",
    candidateName: "David Brown",
    candidateAvatar: "",
    jobTitle: "Senior Software Engineer",
    interviewType: "Technical",
    round: "Coding Round",
    scheduledDate: "2024-01-18",
    scheduledTime: "10:00 AM",
    duration: "2 hours",
    interviewers: ["Tech Lead"],
    location: "HackerRank",
    status: "Completed",
    feedback: "Did not meet technical requirements.",
  },
  {
    id: "6",
    candidateName: "Lisa Anderson",
    candidateAvatar: "",
    jobTitle: "Product Manager",
    interviewType: "Video",
    round: "Case Study",
    scheduledDate: "2024-01-15",
    scheduledTime: "1:00 PM",
    duration: "1 hour",
    interviewers: ["Product Team"],
    location: "Google Meet",
    status: "No Show",
  },
];

const statsData = [
  { title: "Today's Interviews", value: "5", icon: Calendar, color: "text-primary" },
  { title: "This Week", value: "18", icon: Clock, color: "text-blue-500" },
  { title: "Completed", value: "42", icon: CheckCircle, color: "text-emerald-500" },
  { title: "Cancelled", value: "3", icon: XCircle, color: "text-destructive" },
];

export default function Interviews() {
  const [upcomingInterviews] = useState<Interview[]>(mockUpcomingInterviews);
  const [completedInterviews] = useState<Interview[]>(mockCompletedInterviews);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    candidate: "",
    jobTitle: "",
    interviewType: "",
    round: "",
    date: "",
    time: "",
    duration: "",
    interviewers: "",
    location: "",
  });

  const getInterviewTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4" />;
      case "Phone":
        return <Phone className="h-4 w-4" />;
      case "In-person":
        return <Users className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const columns: Column<Interview>[] = [
    {
      key: "candidateName",
      header: "Candidate",
      sortable: true,
      searchable: true,
      render: (interview) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={interview.candidateAvatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {interview.candidateName.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div className="font-medium text-foreground">{interview.candidateName}</div>
        </div>
      ),
    },
    {
      key: "jobTitle",
      header: "Job Title",
      sortable: true,
    },
    {
      key: "interviewType",
      header: "Type",
      render: (interview) => (
        <div className="flex items-center gap-2">
          {getInterviewTypeIcon(interview.interviewType)}
          <span>{interview.interviewType}</span>
        </div>
      ),
    },
    {
      key: "round",
      header: "Round",
      render: (interview) => (
        <Badge variant="secondary">{interview.round}</Badge>
      ),
    },
    {
      key: "scheduledDate",
      header: "Date & Time",
      sortable: true,
      render: (interview) => (
        <div>
          <div className="font-medium">{new Date(interview.scheduledDate).toLocaleDateString()}</div>
          <div className="text-xs text-muted-foreground">{interview.scheduledTime}</div>
        </div>
      ),
    },
    {
      key: "duration",
      header: "Duration",
    },
    {
      key: "interviewers",
      header: "Interviewers",
      render: (interview) => (
        <div className="flex flex-wrap gap-1">
          {interview.interviewers.map((name) => (
            <Badge key={name} variant="outline" className="text-xs">
              {name}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (interview) => (
        <div className="flex items-center gap-1 text-sm">
          <MapPin className="h-3 w-3 text-muted-foreground" />
          {interview.location}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (interview) => {
        const statusColors: Record<string, string> = {
          Scheduled: "bg-blue-500/10 text-blue-500 border-blue-500/20",
          "In Progress": "bg-amber-500/10 text-amber-500 border-amber-500/20",
          Completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
          Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
          "No Show": "bg-muted text-muted-foreground border-muted",
        };
        return (
          <Badge className={statusColors[interview.status] || ""} variant="outline">
            {interview.status}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (interview) => (
        <div className="flex items-center gap-1">
          {interview.status === "Scheduled" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              title="Reschedule"
              onClick={() => toast.info(`Reschedule interview for ${interview.candidateName}`)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            title="Add Feedback"
            onClick={() => toast.info("Open feedback form")}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          {interview.status === "Scheduled" && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive"
              title="Cancel"
              onClick={() => toast.error(`Interview cancelled for ${interview.candidateName}`)}
            >
              <XCircle className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "interviewType",
      label: "Interview Type",
      options: [
        { label: "Video", value: "Video" },
        { label: "Phone", value: "Phone" },
        { label: "In-person", value: "In-person" },
        { label: "Technical", value: "Technical" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Scheduled", value: "Scheduled" },
        { label: "In Progress", value: "In Progress" },
        { label: "Completed", value: "Completed" },
        { label: "Cancelled", value: "Cancelled" },
        { label: "No Show", value: "No Show" },
      ],
    },
  ];

  const handleSubmit = () => {
    setIsDialogOpen(false);
    setFormData({
      candidate: "",
      jobTitle: "",
      interviewType: "",
      round: "",
      date: "",
      time: "",
      duration: "",
      interviewers: "",
      location: "",
    });
    toast.success("Interview scheduled successfully");
  };
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Interviews</h1>
          <p className="text-muted-foreground mt-1">Schedule and manage candidate interviews</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Schedule Interview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
              <DialogDescription>
                Schedule a new interview with a candidate
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="candidate">Candidate</Label>
                  <Select
                    value={formData.candidate}
                    onValueChange={(value) => setFormData({ ...formData, candidate: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select candidate" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="john">John Smith</SelectItem>
                      <SelectItem value="emily">Emily Johnson</SelectItem>
                      <SelectItem value="michael">Michael Chen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Select
                    value={formData.jobTitle}
                    onValueChange={(value) => setFormData({ ...formData, jobTitle: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select job" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="swe">Senior Software Engineer</SelectItem>
                      <SelectItem value="pm">Product Manager</SelectItem>
                      <SelectItem value="designer">UI/UX Designer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="interviewType">Interview Type</Label>
                  <Select
                    value={formData.interviewType}
                    onValueChange={(value) => setFormData({ ...formData, interviewType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="inperson">In-person</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="round">Round</Label>
                  <Select
                    value={formData.round}
                    onValueChange={(value) => setFormData({ ...formData, round: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select round" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hr">HR Round</SelectItem>
                      <SelectItem value="technical">Technical Round</SelectItem>
                      <SelectItem value="final">Final Round</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Select
                    value={formData.duration}
                    onValueChange={(value) => setFormData({ ...formData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 mins</SelectItem>
                      <SelectItem value="45">45 mins</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="90">1.5 hours</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="interviewers">Interviewers</Label>
                <Input
                  id="interviewers"
                  value={formData.interviewers}
                  onChange={(e) => setFormData({ ...formData, interviewers: e.target.value })}
                  placeholder="Names separated by commas"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location / Meeting Link</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Google Meet, Conference Room A"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>Schedule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <DataTable
            data={upcomingInterviews}
            columns={columns}
            filters={filters}
            searchPlaceholder="Search interviews..."
          />
        </TabsContent>
        <TabsContent value="completed">
          <DataTable
            data={completedInterviews}
            columns={columns}
            filters={filters}
            searchPlaceholder="Search interviews..."
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
