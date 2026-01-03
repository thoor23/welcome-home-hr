import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Plus, 
  CalendarIcon, 
  Clock, 
  FileText,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Eye
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function AttendanceRegularization() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [requestType, setRequestType] = useState("");
  const [clockInTime, setClockInTime] = useState("");
  const [clockOutTime, setClockOutTime] = useState("");
  const [reason, setReason] = useState("");
  const { toast } = useToast();

  // Mock regularization requests
  const regularizationRequests = [
    {
      id: 1,
      date: "2025-12-30",
      requestType: "Missing Clock Out",
      originalTime: "09:00 AM - Missing",
      requestedTime: "09:00 AM - 06:00 PM",
      reason: "Forgot to clock out due to urgent client meeting",
      status: "pending",
      submittedOn: "2025-12-31",
      approver: "John Manager",
    },
    {
      id: 2,
      date: "2025-12-28",
      requestType: "Wrong Clock In",
      originalTime: "10:30 AM - 06:00 PM",
      requestedTime: "09:00 AM - 06:00 PM",
      reason: "System glitch caused late clock in registration",
      status: "approved",
      submittedOn: "2025-12-28",
      approver: "John Manager",
      approvedOn: "2025-12-29",
    },
    {
      id: 3,
      date: "2025-12-20",
      requestType: "Missing Attendance",
      originalTime: "No Record",
      requestedTime: "09:00 AM - 06:00 PM",
      reason: "Was working from home, forgot to mark attendance",
      status: "rejected",
      submittedOn: "2025-12-21",
      approver: "John Manager",
      rejectedReason: "No prior approval for work from home",
    },
    {
      id: 4,
      date: "2025-12-15",
      requestType: "Missing Clock In",
      originalTime: "Missing - 06:30 PM",
      requestedTime: "08:45 AM - 06:30 PM",
      reason: "Attended morning meeting, biometric was not working",
      status: "approved",
      submittedOn: "2025-12-15",
      approver: "John Manager",
      approvedOn: "2025-12-16",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleSubmit = () => {
    if (!selectedDate || !requestType || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Request Submitted",
      description: "Your regularization request has been submitted for approval",
    });
    setIsDialogOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedDate(undefined);
    setRequestType("");
    setClockInTime("");
    setClockOutTime("");
    setReason("");
  };

  // Stats
  const stats = {
    total: regularizationRequests.length,
    pending: regularizationRequests.filter(r => r.status === "pending").length,
    approved: regularizationRequests.filter(r => r.status === "approved").length,
    rejected: regularizationRequests.filter(r => r.status === "rejected").length,
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Attendance Regularization</h1>
            <p className="text-muted-foreground">Request corrections for attendance records</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>New Regularization Request</DialogTitle>
                <DialogDescription>
                  Submit a request to correct your attendance record
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* Date Selection */}
                <div className="space-y-2">
                  <Label>Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Request Type */}
                <div className="space-y-2">
                  <Label>Request Type *</Label>
                  <Select value={requestType} onValueChange={setRequestType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select request type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="missing-clock-in">Missing Clock In</SelectItem>
                      <SelectItem value="missing-clock-out">Missing Clock Out</SelectItem>
                      <SelectItem value="wrong-clock-in">Wrong Clock In Time</SelectItem>
                      <SelectItem value="wrong-clock-out">Wrong Clock Out Time</SelectItem>
                      <SelectItem value="missing-attendance">Missing Full Day Attendance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time Inputs */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Correct Clock In</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="time" 
                        value={clockInTime}
                        onChange={(e) => setClockInTime(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Correct Clock Out</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        type="time" 
                        value={clockOutTime}
                        onChange={(e) => setClockOutTime(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className="space-y-2">
                  <Label>Reason *</Label>
                  <Textarea 
                    placeholder="Explain why you need this regularization..."
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Requests</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-foreground">{stats.approved}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-2xl font-bold text-foreground">{stats.rejected}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-red-500/10 flex items-center justify-center">
                  <XCircle className="h-5 w-5 text-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">My Requests</CardTitle>
            <CardDescription>View and track your regularization requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Request Type</TableHead>
                    <TableHead>Original Time</TableHead>
                    <TableHead>Requested Time</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {regularizationRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">
                            {format(new Date(request.date), "MMM d, yyyy")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Submitted: {format(new Date(request.submittedOn), "MMM d")}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{request.requestType}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{request.originalTime}</TableCell>
                      <TableCell className="font-medium">{request.requestedTime}</TableCell>
                      <TableCell>
                        <p className="max-w-[200px] truncate text-sm text-muted-foreground">
                          {request.reason}
                        </p>
                      </TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Guidelines for Regularization</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                  <li>Regularization requests must be submitted within 7 days of the attendance date</li>
                  <li>Provide accurate and honest reasons for your request</li>
                  <li>Frequent regularization requests may require additional documentation</li>
                  <li>Your manager will review and approve/reject the request</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ESSLayout>
  );
}
