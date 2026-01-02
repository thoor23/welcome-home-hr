import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MoreHorizontal, Edit, Trash2, History, Users, UserMinus, Clock, Repeat } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { toast } from "sonner";

interface ShiftAssignment {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  profilePic?: string;
  department: string;
  location: string;
  currentShift: string;
  shiftType: "Fixed" | "Rotational" | "Flexible";
  effectiveFrom: string;
  effectiveTo?: string;
  status: "Active" | "Upcoming" | "Expired";
  remarks?: string;
}

const shifts = ["General Shift", "Morning Shift", "Evening Shift", "Night Shift", "Flexible Shift"];
const departments = ["Engineering", "Operations", "Security", "Customer Support", "HR", "Sales"];
const locations = ["Head Office", "Branch A", "Branch B", "Warehouse"];

const initialAssignments: ShiftAssignment[] = [
  {
    id: "1",
    employeeId: "EMP001",
    employeeName: "Rajesh Kumar",
    employeeEmail: "rajesh.kumar@company.com",
    department: "Engineering",
    location: "Head Office",
    currentShift: "General Shift",
    shiftType: "Fixed",
    effectiveFrom: "2024-01-01",
    status: "Active",
  },
  {
    id: "2",
    employeeId: "EMP002",
    employeeName: "Priya Sharma",
    employeeEmail: "priya.sharma@company.com",
    department: "Operations",
    location: "Branch A",
    currentShift: "Morning Shift",
    shiftType: "Rotational",
    effectiveFrom: "2024-01-15",
    effectiveTo: "2024-06-30",
    status: "Active",
  },
  {
    id: "3",
    employeeId: "EMP003",
    employeeName: "Amit Patel",
    employeeEmail: "amit.patel@company.com",
    department: "Security",
    location: "Warehouse",
    currentShift: "Night Shift",
    shiftType: "Fixed",
    effectiveFrom: "2024-02-01",
    status: "Active",
  },
  {
    id: "4",
    employeeId: "EMP004",
    employeeName: "Sneha Reddy",
    employeeEmail: "sneha.reddy@company.com",
    department: "Customer Support",
    location: "Head Office",
    currentShift: "Evening Shift",
    shiftType: "Rotational",
    effectiveFrom: "2024-03-01",
    status: "Upcoming",
  },
  {
    id: "5",
    employeeId: "EMP005",
    employeeName: "Vikram Singh",
    employeeEmail: "vikram.singh@company.com",
    department: "Engineering",
    location: "Branch B",
    currentShift: "Flexible Shift",
    shiftType: "Flexible",
    effectiveFrom: "2023-06-01",
    effectiveTo: "2024-01-31",
    status: "Expired",
  },
];

const ShiftAssignments = () => {
  const [assignments, setAssignments] = useState<ShiftAssignment[]>(initialAssignments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<ShiftAssignment | null>(null);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    employeeEmail: "",
    department: "",
    location: "",
    currentShift: "",
    shiftType: "Fixed" as "Fixed" | "Rotational" | "Flexible",
    effectiveFrom: "",
    effectiveTo: "",
    remarks: "",
  });

  const assignedCount = assignments.filter((a) => a.status === "Active").length;
  const unassignedCount = 12; // Mock
  const rotationalCount = assignments.filter((a) => a.shiftType === "Rotational").length;
  const fixedCount = assignments.filter((a) => a.shiftType === "Fixed").length;

  const resetForm = () => {
    setFormData({
      employeeName: "",
      employeeId: "",
      employeeEmail: "",
      department: "",
      location: "",
      currentShift: "",
      shiftType: "Fixed",
      effectiveFrom: "",
      effectiveTo: "",
      remarks: "",
    });
    setEditingAssignment(null);
  };

  const handleSubmit = () => {
    if (editingAssignment) {
      setAssignments((prev) =>
        prev.map((a) =>
          a.id === editingAssignment.id
            ? { ...a, ...formData, status: new Date(formData.effectiveFrom) > new Date() ? "Upcoming" : "Active" }
            : a
        )
      );
      toast.success("Assignment updated successfully");
    } else {
      const newAssignment: ShiftAssignment = {
        id: String(Date.now()),
        ...formData,
        status: new Date(formData.effectiveFrom) > new Date() ? "Upcoming" : "Active",
      };
      setAssignments((prev) => [...prev, newAssignment]);
      toast.success("Shift assigned successfully");
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (assignment: ShiftAssignment) => {
    setEditingAssignment(assignment);
    setFormData({
      employeeName: assignment.employeeName,
      employeeId: assignment.employeeId,
      employeeEmail: assignment.employeeEmail,
      department: assignment.department,
      location: assignment.location,
      currentShift: assignment.currentShift,
      shiftType: assignment.shiftType,
      effectiveFrom: assignment.effectiveFrom,
      effectiveTo: assignment.effectiveTo || "",
      remarks: assignment.remarks || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
    toast.success("Assignment removed successfully");
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      Upcoming: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Expired: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
    };
    return (
      <Badge variant="outline" className={colors[status]}>
        {status}
      </Badge>
    );
  };

  const getShiftTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      Fixed: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      Rotational: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      Flexible: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    };
    return (
      <Badge variant="outline" className={colors[type]}>
        {type}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const columns: Column<ShiftAssignment>[] = [
    {
      key: "employeeName",
      header: "Employee",
      searchable: true,
      sortable: true,
      render: (assignment) => (
        <div className="flex items-center gap-3 whitespace-nowrap">
          <Avatar className="h-9 w-9 flex-shrink-0">
            <AvatarImage src={assignment.profilePic} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {assignment.employeeName.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{assignment.employeeName}</p>
            <p className="text-sm text-muted-foreground">{assignment.employeeId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      header: "Department",
      searchable: true,
      sortable: true,
      className: "whitespace-nowrap",
    },
    {
      key: "location",
      header: "Location",
      sortable: true,
      className: "whitespace-nowrap",
    },
    {
      key: "currentShift",
      header: "Current Shift",
      sortable: true,
      className: "whitespace-nowrap",
    },
    {
      key: "shiftType",
      header: "Shift Type",
      sortable: true,
      render: (assignment) => getShiftTypeBadge(assignment.shiftType),
    },
    {
      key: "effectiveFrom",
      header: "Effective From",
      sortable: true,
      className: "whitespace-nowrap",
      render: (assignment) => formatDate(assignment.effectiveFrom),
    },
    {
      key: "effectiveTo",
      header: "Effective To",
      sortable: true,
      className: "whitespace-nowrap",
      render: (assignment) => assignment.effectiveTo ? formatDate(assignment.effectiveTo) : "-",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (assignment) => getStatusBadge(assignment.status),
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      headerClassName: "w-[50px]",
      sticky: "right",
      render: (assignment) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(assignment)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info("Viewing assignment history")}>
              <History className="h-4 w-4 mr-2" />
              History
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(assignment.id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "department",
      label: "Department",
      options: departments.map((d) => ({ label: d, value: d })),
    },
    {
      key: "location",
      label: "Location",
      options: locations.map((l) => ({ label: l, value: l })),
    },
    {
      key: "currentShift",
      label: "Shift",
      options: shifts.map((s) => ({ label: s, value: s })),
    },
    {
      key: "shiftType",
      label: "Type",
      options: [
        { label: "Fixed", value: "Fixed" },
        { label: "Rotational", value: "Rotational" },
        { label: "Flexible", value: "Flexible" },
      ],
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Active", value: "Active" },
        { label: "Upcoming", value: "Upcoming" },
        { label: "Expired", value: "Expired" },
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
                <h1 className="text-3xl font-bold text-foreground font-display">Shift Assignments</h1>
                <p className="text-muted-foreground mt-1">Assign and manage employee shifts</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Assign Shift
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingAssignment ? "Edit Assignment" : "Assign Shift"}</DialogTitle>
                    <DialogDescription>
                      {editingAssignment ? "Update shift assignment" : "Assign a shift to an employee"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employeeName">Employee Name</Label>
                        <Input
                          id="employeeName"
                          value={formData.employeeName}
                          onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                          placeholder="Enter name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employeeId">Employee ID</Label>
                        <Input
                          id="employeeId"
                          value={formData.employeeId}
                          onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                          placeholder="e.g., EMP001"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeeEmail">Email</Label>
                      <Input
                        id="employeeEmail"
                        type="email"
                        value={formData.employeeEmail}
                        onChange={(e) => setFormData({ ...formData, employeeEmail: e.target.value })}
                        placeholder="email@company.com"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Department</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => setFormData({ ...formData, department: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((d) => (
                              <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Select
                          value={formData.location}
                          onValueChange={(value) => setFormData({ ...formData, location: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map((l) => (
                              <SelectItem key={l} value={l}>{l}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Shift</Label>
                        <Select
                          value={formData.currentShift}
                          onValueChange={(value) => setFormData({ ...formData, currentShift: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select shift" />
                          </SelectTrigger>
                          <SelectContent>
                            {shifts.map((s) => (
                              <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Shift Type</Label>
                        <Select
                          value={formData.shiftType}
                          onValueChange={(value: "Fixed" | "Rotational" | "Flexible") => setFormData({ ...formData, shiftType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Fixed">Fixed</SelectItem>
                            <SelectItem value="Rotational">Rotational</SelectItem>
                            <SelectItem value="Flexible">Flexible</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="effectiveFrom">Effective From</Label>
                        <Input
                          id="effectiveFrom"
                          type="date"
                          value={formData.effectiveFrom}
                          onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="effectiveTo">Effective To (Optional)</Label>
                        <Input
                          id="effectiveTo"
                          type="date"
                          value={formData.effectiveTo}
                          onChange={(e) => setFormData({ ...formData, effectiveTo: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="remarks">Remarks</Label>
                      <Textarea
                        id="remarks"
                        value={formData.remarks}
                        onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                        placeholder="Any additional notes"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => { setIsDialogOpen(false); resetForm(); }}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                      {editingAssignment ? "Update" : "Assign"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Assigned Employees"
                value={String(assignedCount)}
                icon={Users}
              />
              <StatsCard
                title="Unassigned"
                value={String(unassignedCount)}
                icon={UserMinus}
              />
              <StatsCard
                title="Rotational Shifts"
                value={String(rotationalCount)}
                icon={Repeat}
              />
              <StatsCard
                title="Fixed Shifts"
                value={String(fixedCount)}
                icon={Clock}
              />
            </div>

            <DataTable
              data={assignments}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search assignments..."
              selectable
              pageSize={10}
              pageSizeOptions={[10, 25, 50]}
              getRowId={(assignment) => assignment.id}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ShiftAssignments;
