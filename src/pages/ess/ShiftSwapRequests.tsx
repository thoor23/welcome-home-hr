import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRightLeft, Calendar as CalendarIcon, Clock, User, Check, X, Plus, Send, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const mySwapRequests = [
  {
    id: 1,
    myShift: { date: "2026-01-07", time: "14:00 - 22:00", type: "Evening" },
    requestedShift: { date: "2026-01-08", time: "06:00 - 14:00", type: "Morning" },
    swapWith: { name: "Sarah Wilson", avatar: "", department: "Engineering" },
    reason: "Personal appointment",
    status: "pending",
    createdAt: "2026-01-03",
  },
  {
    id: 2,
    myShift: { date: "2026-01-12", time: "06:00 - 14:00", type: "Morning" },
    requestedShift: { date: "2026-01-13", time: "14:00 - 22:00", type: "Evening" },
    swapWith: { name: "Mike Johnson", avatar: "", department: "Operations" },
    reason: "Family event",
    status: "approved",
    createdAt: "2026-01-02",
  },
  {
    id: 3,
    myShift: { date: "2025-12-28", time: "14:00 - 22:00", type: "Evening" },
    requestedShift: { date: "2025-12-29", time: "06:00 - 14:00", type: "Morning" },
    swapWith: { name: "Emma Davis", avatar: "", department: "Sales" },
    reason: "Doctor's appointment",
    status: "rejected",
    createdAt: "2025-12-26",
  },
];

const incomingRequests = [
  {
    id: 4,
    requestFrom: { name: "John Smith", avatar: "", department: "Marketing" },
    theirShift: { date: "2026-01-10", time: "06:00 - 14:00", type: "Morning" },
    myShift: { date: "2026-01-09", time: "14:00 - 22:00", type: "Evening" },
    reason: "Need morning slot for training",
    status: "pending",
    createdAt: "2026-01-03",
  },
];

const availableColleagues = [
  { id: 1, name: "Sarah Wilson", department: "Engineering", availableShifts: 3 },
  { id: 2, name: "Mike Johnson", department: "Operations", availableShifts: 2 },
  { id: 3, name: "Emma Davis", department: "Sales", availableShifts: 4 },
  { id: 4, name: "John Smith", department: "Marketing", availableShifts: 2 },
];

const myShifts = [
  { id: 1, date: "2026-01-07", time: "14:00 - 22:00", type: "Evening" },
  { id: 2, date: "2026-01-08", time: "14:00 - 22:00", type: "Evening" },
  { id: 3, date: "2026-01-09", time: "06:00 - 14:00", type: "Morning" },
];

export default function ShiftSwapRequests() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedShift, setSelectedShift] = useState("");
  const [selectedColleague, setSelectedColleague] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [reason, setReason] = useState("");

  const handleSubmitRequest = () => {
    if (!selectedShift || !selectedColleague || !reason) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Swap request submitted successfully!");
    setIsDialogOpen(false);
    setSelectedShift("");
    setSelectedColleague("");
    setSelectedDate(undefined);
    setReason("");
  };

  const handleApproveRequest = (id: number) => {
    toast.success("Swap request approved!");
  };

  const handleRejectRequest = (id: number) => {
    toast.success("Swap request rejected");
  };

  const handleCancelRequest = (id: number) => {
    toast.success("Swap request cancelled");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Approved</Badge>;
      case "pending":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getShiftBadge = (type: string) => {
    switch (type) {
      case "Morning":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Morning</Badge>;
      case "Evening":
        return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">Evening</Badge>;
      case "Night":
        return <Badge className="bg-indigo-500/10 text-indigo-600 border-indigo-500/20">Night</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/ess/shifts">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Schedule
                </Link>
              </Button>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Shift Swap Requests</h1>
            <p className="text-muted-foreground">Request and manage shift swaps with colleagues</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Swap Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Request Shift Swap</DialogTitle>
                <DialogDescription>
                  Submit a request to swap your shift with a colleague
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="my-shift">My Shift to Swap *</Label>
                  <Select value={selectedShift} onValueChange={setSelectedShift}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your shift" />
                    </SelectTrigger>
                    <SelectContent>
                      {myShifts.map((shift) => (
                        <SelectItem key={shift.id} value={shift.id.toString()}>
                          {shift.date} - {shift.type} ({shift.time})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="colleague">Swap With *</Label>
                  <Select value={selectedColleague} onValueChange={setSelectedColleague}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a colleague" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableColleagues.map((colleague) => (
                        <SelectItem key={colleague.id} value={colleague.id.toString()}>
                          {colleague.name} ({colleague.department}) - {colleague.availableShifts} shifts available
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Preferred Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
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
                <div className="grid gap-2">
                  <Label htmlFor="reason">Reason *</Label>
                  <Textarea
                    id="reason"
                    placeholder="Why do you need to swap this shift?"
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
                <Button onClick={handleSubmitRequest}>
                  <Send className="mr-2 h-4 w-4" />
                  Submit Request
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Requests</CardTitle>
              <ArrowRightLeft className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mySwapRequests.length}</div>
              <p className="text-xs text-muted-foreground">Total submitted</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <Clock className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">
                {mySwapRequests.filter(r => r.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Incoming</CardTitle>
              <User className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{incomingRequests.length}</div>
              <p className="text-xs text-muted-foreground">Needs your response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
              <Check className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">
                {mySwapRequests.filter(r => r.status === "approved").length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="my-requests" className="space-y-4">
          <TabsList>
            <TabsTrigger value="my-requests">My Requests</TabsTrigger>
            <TabsTrigger value="incoming" className="relative">
              Incoming Requests
              {incomingRequests.filter(r => r.status === "pending").length > 0 && (
                <span className="ml-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {incomingRequests.filter(r => r.status === "pending").length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-requests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Swap Requests</CardTitle>
                <CardDescription>Track the status of your shift swap requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>My Shift</TableHead>
                      <TableHead>Requested Shift</TableHead>
                      <TableHead>Swap With</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mySwapRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{request.myShift.date}</div>
                            <div className="flex items-center gap-2">
                              {getShiftBadge(request.myShift.type)}
                              <span className="text-xs text-muted-foreground">{request.myShift.time}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{request.requestedShift.date}</div>
                            <div className="flex items-center gap-2">
                              {getShiftBadge(request.requestedShift.type)}
                              <span className="text-xs text-muted-foreground">{request.requestedShift.time}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={request.swapWith.avatar} />
                              <AvatarFallback>{request.swapWith.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">{request.swapWith.name}</div>
                              <div className="text-xs text-muted-foreground">{request.swapWith.department}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <p className="text-sm text-muted-foreground truncate">{request.reason}</p>
                        </TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell className="text-right">
                          {request.status === "pending" && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleCancelRequest(request.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="incoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Incoming Swap Requests</CardTitle>
                <CardDescription>Requests from colleagues who want to swap shifts with you</CardDescription>
              </CardHeader>
              <CardContent>
                {incomingRequests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No incoming swap requests
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Request From</TableHead>
                        <TableHead>Their Shift</TableHead>
                        <TableHead>Your Shift</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {incomingRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={request.requestFrom.avatar} />
                                <AvatarFallback>{request.requestFrom.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-sm">{request.requestFrom.name}</div>
                                <div className="text-xs text-muted-foreground">{request.requestFrom.department}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{request.theirShift.date}</div>
                              <div className="flex items-center gap-2">
                                {getShiftBadge(request.theirShift.type)}
                                <span className="text-xs text-muted-foreground">{request.theirShift.time}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{request.myShift.date}</div>
                              <div className="flex items-center gap-2">
                                {getShiftBadge(request.myShift.type)}
                                <span className="text-xs text-muted-foreground">{request.myShift.time}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px]">
                            <p className="text-sm text-muted-foreground truncate">{request.reason}</p>
                          </TableCell>
                          <TableCell>{getStatusBadge(request.status)}</TableCell>
                          <TableCell className="text-right">
                            {request.status === "pending" && (
                              <div className="flex items-center justify-end gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-emerald-600 hover:text-emerald-700"
                                  onClick={() => handleApproveRequest(request.id)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="text-red-600 hover:text-red-700"
                                  onClick={() => handleRejectRequest(request.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ESSLayout>
  );
}
