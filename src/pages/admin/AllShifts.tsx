import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Edit, Trash2, Users, Clock, MapPin, CheckCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { toast } from "sonner";

interface Shift {
  id: string;
  name: string;
  code: string;
  startTime: string;
  endTime: string;
  breakDuration: number;
  workingHours: number;
  gracePeriod: number;
  applicableDays: string[];
  isNightShift: boolean;
  description: string;
  status: "Active" | "Inactive";
  employeeCount: number;
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const initialShifts: Shift[] = [
  {
    id: "1",
    name: "General Shift",
    code: "GS-001",
    startTime: "09:00",
    endTime: "18:00",
    breakDuration: 60,
    workingHours: 8,
    gracePeriod: 15,
    applicableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    isNightShift: false,
    description: "Standard office hours",
    status: "Active",
    employeeCount: 45,
  },
  {
    id: "2",
    name: "Morning Shift",
    code: "MS-001",
    startTime: "06:00",
    endTime: "14:00",
    breakDuration: 30,
    workingHours: 7,
    gracePeriod: 10,
    applicableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    isNightShift: false,
    description: "Early morning operations shift",
    status: "Active",
    employeeCount: 20,
  },
  {
    id: "3",
    name: "Evening Shift",
    code: "ES-001",
    startTime: "14:00",
    endTime: "22:00",
    breakDuration: 30,
    workingHours: 7,
    gracePeriod: 10,
    applicableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    isNightShift: false,
    description: "Afternoon to evening operations",
    status: "Active",
    employeeCount: 18,
  },
  {
    id: "4",
    name: "Night Shift",
    code: "NS-001",
    startTime: "22:00",
    endTime: "06:00",
    breakDuration: 45,
    workingHours: 7,
    gracePeriod: 15,
    applicableDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    isNightShift: true,
    description: "Overnight security and operations",
    status: "Active",
    employeeCount: 12,
  },
  {
    id: "5",
    name: "Flexible Shift",
    code: "FS-001",
    startTime: "10:00",
    endTime: "19:00",
    breakDuration: 60,
    workingHours: 8,
    gracePeriod: 30,
    applicableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    isNightShift: false,
    description: "Flexible timing for senior employees",
    status: "Inactive",
    employeeCount: 8,
  },
];

const AllShifts = () => {
  const [shifts, setShifts] = useState<Shift[]>(initialShifts);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<Shift | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    startTime: "09:00",
    endTime: "18:00",
    breakDuration: 60,
    gracePeriod: 15,
    applicableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"] as string[],
    isNightShift: false,
    description: "",
    status: "Active" as "Active" | "Inactive",
  });

  const activeShifts = shifts.filter((s) => s.status === "Active").length;
  const totalEmployeesOnShift = shifts.reduce((acc, s) => acc + s.employeeCount, 0);
  const locationsCount = 4; // Mock data

  const resetForm = () => {
    setFormData({
      name: "",
      code: "",
      startTime: "09:00",
      endTime: "18:00",
      breakDuration: 60,
      gracePeriod: 15,
      applicableDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      isNightShift: false,
      description: "",
      status: "Active",
    });
    setEditingShift(null);
  };

  const calculateWorkingHours = (start: string, end: string, breakDuration: number, isNight: boolean) => {
    const [startH, startM] = start.split(":").map(Number);
    const [endH, endM] = end.split(":").map(Number);
    let startMinutes = startH * 60 + startM;
    let endMinutes = endH * 60 + endM;
    if (isNight && endMinutes < startMinutes) {
      endMinutes += 24 * 60;
    }
    const totalMinutes = endMinutes - startMinutes - breakDuration;
    return Math.round(totalMinutes / 60 * 10) / 10;
  };

  const handleSubmit = () => {
    const workingHours = calculateWorkingHours(
      formData.startTime,
      formData.endTime,
      formData.breakDuration,
      formData.isNightShift
    );

    if (editingShift) {
      setShifts((prev) =>
        prev.map((s) =>
          s.id === editingShift.id
            ? { ...s, ...formData, workingHours }
            : s
        )
      );
      toast.success("Shift updated successfully");
    } else {
      const newShift: Shift = {
        id: String(Date.now()),
        ...formData,
        workingHours,
        employeeCount: 0,
      };
      setShifts((prev) => [...prev, newShift]);
      toast.success("Shift created successfully");
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (shift: Shift) => {
    setEditingShift(shift);
    setFormData({
      name: shift.name,
      code: shift.code,
      startTime: shift.startTime,
      endTime: shift.endTime,
      breakDuration: shift.breakDuration,
      gracePeriod: shift.gracePeriod,
      applicableDays: shift.applicableDays,
      isNightShift: shift.isNightShift,
      description: shift.description,
      status: shift.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setShifts((prev) => prev.filter((s) => s.id !== id));
    toast.success("Shift deleted successfully");
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      applicableDays: prev.applicableDays.includes(day)
        ? prev.applicableDays.filter((d) => d !== day)
        : [...prev.applicableDays, day],
    }));
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      Inactive: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
    };
    return (
      <Badge variant="outline" className={colors[status]}>
        {status}
      </Badge>
    );
  };

  const columns: Column<Shift>[] = [
    {
      key: "name",
      header: "Shift Name",
      searchable: true,
      sortable: true,
      render: (shift) => (
        <div>
          <p className="font-medium text-foreground">{shift.name}</p>
          <p className="text-sm text-muted-foreground">{shift.code}</p>
        </div>
      ),
    },
    {
      key: "startTime",
      header: "Start Time",
      sortable: true,
      className: "whitespace-nowrap",
      render: (shift) => shift.startTime,
    },
    {
      key: "endTime",
      header: "End Time",
      sortable: true,
      className: "whitespace-nowrap",
      render: (shift) => shift.endTime,
    },
    {
      key: "breakDuration",
      header: "Break (mins)",
      sortable: true,
      className: "text-center whitespace-nowrap",
    },
    {
      key: "workingHours",
      header: "Working Hours",
      sortable: true,
      className: "whitespace-nowrap",
      render: (shift) => `${shift.workingHours} hrs`,
    },
    {
      key: "gracePeriod",
      header: "Grace Period",
      sortable: true,
      className: "whitespace-nowrap",
      render: (shift) => `${shift.gracePeriod} mins`,
    },
    {
      key: "applicableDays",
      header: "Applicable Days",
      className: "whitespace-nowrap",
      render: (shift) => (
        <div className="flex gap-1 flex-wrap">
          {shift.applicableDays.map((day) => (
            <Badge key={day} variant="secondary" className="text-xs">
              {day}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      key: "isNightShift",
      header: "Night Shift",
      className: "text-center whitespace-nowrap",
      render: (shift) => (shift.isNightShift ? "Yes" : "No"),
    },
    {
      key: "employeeCount",
      header: "Employees",
      sortable: true,
      className: "text-center whitespace-nowrap",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (shift) => getStatusBadge(shift.status),
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      headerClassName: "w-[50px]",
      sticky: "right",
      render: (shift) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(shift)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info(`${shift.employeeCount} employees on this shift`)}>
              <Users className="h-4 w-4 mr-2" />
              View Employees
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(shift.id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Inactive", value: "Inactive" },
      ],
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader />
          <main className="flex-1 p-6 overflow-auto min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-display">All Shifts</h1>
                <p className="text-muted-foreground mt-1">Manage shift types and schedules</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Shift
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingShift ? "Edit Shift" : "Add New Shift"}</DialogTitle>
                    <DialogDescription>
                      {editingShift ? "Update shift details" : "Create a new shift type"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Shift Name</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g., Morning Shift"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="code">Shift Code</Label>
                        <Input
                          id="code"
                          value={formData.code}
                          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                          placeholder="e.g., MS-001"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startTime">Start Time</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={formData.startTime}
                          onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endTime">End Time</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={formData.endTime}
                          onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="breakDuration">Break Duration (mins)</Label>
                        <Input
                          id="breakDuration"
                          type="number"
                          value={formData.breakDuration}
                          onChange={(e) => setFormData({ ...formData, breakDuration: Number(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gracePeriod">Grace Period (mins)</Label>
                        <Input
                          id="gracePeriod"
                          type="number"
                          value={formData.gracePeriod}
                          onChange={(e) => setFormData({ ...formData, gracePeriod: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Applicable Days</Label>
                      <div className="flex flex-wrap gap-2">
                        {daysOfWeek.map((day) => (
                          <div key={day} className="flex items-center gap-2">
                            <Checkbox
                              id={`day-${day}`}
                              checked={formData.applicableDays.includes(day)}
                              onCheckedChange={() => toggleDay(day)}
                            />
                            <Label htmlFor={`day-${day}`} className="text-sm cursor-pointer">{day}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="nightShift">Night Shift</Label>
                        <p className="text-xs text-muted-foreground">Enable for overnight shifts</p>
                      </div>
                      <Switch
                        id="nightShift"
                        checked={formData.isNightShift}
                        onCheckedChange={(checked) => setFormData({ ...formData, isNightShift: checked })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Brief description of this shift"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="status">Status</Label>
                      <Switch
                        id="status"
                        checked={formData.status === "Active"}
                        onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? "Active" : "Inactive" })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                      {editingShift ? "Update Shift" : "Create Shift"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Total Shifts"
                value={String(shifts.length)}
                icon={Clock}
              />
              <StatsCard
                title="Active Shifts"
                value={String(activeShifts)}
                icon={CheckCircle}
              />
              <StatsCard
                title="Employees on Shift"
                value={String(totalEmployeesOnShift)}
                icon={Users}
              />
              <StatsCard
                title="Locations"
                value={String(locationsCount)}
                icon={MapPin}
              />
            </div>

            <DataTable
              data={shifts}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search shifts..."
              selectable
              pageSize={10}
              pageSizeOptions={[10, 25, 50]}
              getRowId={(shift) => shift.id}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AllShifts;
