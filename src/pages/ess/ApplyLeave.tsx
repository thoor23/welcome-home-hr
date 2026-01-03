import { useState } from "react";
import { ESSLayout } from "@/components/layout/ESSLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
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
import { Checkbox } from "@/components/ui/checkbox";
import { 
  CalendarIcon, 
  CalendarDays,
  Clock,
  User,
  AlertCircle,
  Send
} from "lucide-react";
import { format, differenceInDays, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function ApplyLeave() {
  const [leaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [halfDayPeriod, setHalfDayPeriod] = useState("");
  const [reason, setReason] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [handoverTo, setHandoverTo] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Calculate leave days
  const leaveDays = startDate && endDate 
    ? differenceInDays(endDate, startDate) + 1 
    : startDate && !endDate 
      ? 1 
      : 0;

  const effectiveDays = isHalfDay ? 0.5 : leaveDays;

  // Leave balance (mock data)
  const leaveBalances = [
    { type: "casual", label: "Casual Leave", available: 7, color: "text-blue-500" },
    { type: "sick", label: "Sick Leave", available: 8, color: "text-red-500" },
    { type: "earned", label: "Earned Leave", available: 8, color: "text-green-500" },
    { type: "vacation", label: "Vacation Leave", available: 7, color: "text-purple-500" },
    { type: "study", label: "Study Leave", available: 4, color: "text-orange-500" },
  ];

  const selectedLeaveBalance = leaveBalances.find(l => l.type === leaveType);

  // Team members for handover
  const teamMembers = [
    { id: "1", name: "Sarah Johnson" },
    { id: "2", name: "Mike Chen" },
    { id: "3", name: "Emily Davis" },
    { id: "4", name: "Alex Wilson" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!leaveType || !startDate || !reason) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (selectedLeaveBalance && effectiveDays > selectedLeaveBalance.available) {
      toast({
        title: "Insufficient Balance",
        description: `You only have ${selectedLeaveBalance.available} days available for ${selectedLeaveBalance.label}`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Leave Request Submitted",
      description: "Your leave request has been sent for approval",
    });
    navigate("/ess/leaves/requests");
  };

  return (
    <ESSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-foreground">Apply for Leave</h1>
          <p className="text-muted-foreground">Submit a new leave request</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leave Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Leave Application</CardTitle>
                <CardDescription>Fill in the details for your leave request</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Leave Type */}
                  <div className="space-y-2">
                    <Label>Leave Type *</Label>
                    <Select value={leaveType} onValueChange={setLeaveType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select leave type" />
                      </SelectTrigger>
                      <SelectContent>
                        {leaveBalances.map((leave) => (
                          <SelectItem key={leave.type} value={leave.type}>
                            <div className="flex items-center justify-between w-full">
                              <span>{leave.label}</span>
                              <Badge variant="outline" className="ml-2">
                                {leave.available} days
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !startDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, "PPP") : "Select date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={(date) => {
                              setStartDate(date);
                              if (date && endDate && date > endDate) {
                                setEndDate(undefined);
                              }
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>End Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !endDate && "text-muted-foreground"
                            )}
                            disabled={isHalfDay}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, "PPP") : "Same as start"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            disabled={(date) => 
                              date < (startDate || new Date()) || 
                              date < new Date()
                            }
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Half Day Option */}
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="halfDay" 
                      checked={isHalfDay}
                      onCheckedChange={(checked) => {
                        setIsHalfDay(checked as boolean);
                        if (checked) {
                          setEndDate(undefined);
                        }
                      }}
                    />
                    <Label htmlFor="halfDay" className="font-normal">
                      Apply for half day
                    </Label>
                  </div>

                  {isHalfDay && (
                    <div className="space-y-2">
                      <Label>Half Day Period</Label>
                      <Select value={halfDayPeriod} onValueChange={setHalfDayPeriod}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="first-half">First Half (Morning)</SelectItem>
                          <SelectItem value="second-half">Second Half (Afternoon)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {/* Reason */}
                  <div className="space-y-2">
                    <Label>Reason *</Label>
                    <Textarea 
                      placeholder="Please provide a reason for your leave request..."
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={3}
                    />
                  </div>

                  {/* Contact During Leave */}
                  <div className="space-y-2">
                    <Label>Emergency Contact Number</Label>
                    <Input 
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                    />
                  </div>

                  {/* Handover To */}
                  <div className="space-y-2">
                    <Label>Handover Work To</Label>
                    <Select value={handoverTo} onValueChange={setHandoverTo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select team member" />
                      </SelectTrigger>
                      <SelectContent>
                        {teamMembers.map((member) => (
                          <SelectItem key={member.id} value={member.id}>
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              {member.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex items-center gap-3 pt-4">
                    <Button type="submit" className="gap-2">
                      <Send className="h-4 w-4" />
                      Submit Request
                    </Button>
                    <Button type="button" variant="outline" onClick={() => navigate("/ess/leaves/balance")}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Summary & Balance */}
          <div className="space-y-6">
            {/* Leave Summary */}
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Leave Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Leave Type</span>
                  <span className="font-medium text-foreground">
                    {selectedLeaveBalance?.label || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium text-foreground">
                    {effectiveDays > 0 ? `${effectiveDays} day(s)` : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">From</span>
                  <span className="font-medium text-foreground">
                    {startDate ? format(startDate, "MMM d, yyyy") : "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">To</span>
                  <span className="font-medium text-foreground">
                    {endDate ? format(endDate, "MMM d, yyyy") : startDate ? format(startDate, "MMM d, yyyy") : "-"}
                  </span>
                </div>
                {selectedLeaveBalance && (
                  <>
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Available Balance</span>
                        <Badge className={selectedLeaveBalance.color.replace("text-", "bg-") + "/10 " + selectedLeaveBalance.color}>
                          {selectedLeaveBalance.available} days
                        </Badge>
                      </div>
                    </div>
                    {effectiveDays > selectedLeaveBalance.available && (
                      <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                        <div className="flex items-center gap-2 text-red-500">
                          <AlertCircle className="h-4 w-4" />
                          <span className="text-sm font-medium">Insufficient Balance</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Available Balances */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Leave Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaveBalances.map((leave) => (
                    <div key={leave.type} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{leave.label}</span>
                      <Badge variant="outline" className={leave.color}>
                        {leave.available} days
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="border-orange-500/20 bg-orange-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground">Guidelines</p>
                    <ul className="text-sm text-muted-foreground mt-2 space-y-1 list-disc list-inside">
                      <li>Apply 3 days in advance for planned leaves</li>
                      <li>Medical certificate needed for sick leave {">"} 2 days</li>
                      <li>Ensure work handover before going on leave</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ESSLayout>
  );
}
