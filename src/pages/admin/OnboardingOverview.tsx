import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Edit, Eye, CheckCircle2, UserPlus, Clock, ClipboardList, Users } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface OnboardingRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  department: string;
  designation: string;
  joiningDate: string;
  status: "Not Started" | "In Progress" | "Completed";
  progress: number;
  assignedHR: string;
  tasksCompleted: number;
  totalTasks: number;
}

const initialOnboardings: OnboardingRecord[] = [
  {
    id: "1",
    employeeId: "EMP-2026-001",
    employeeName: "Rahul Verma",
    department: "Engineering",
    designation: "Senior Developer",
    joiningDate: "2026-01-15",
    status: "In Progress",
    progress: 65,
    assignedHR: "Priya Sharma",
    tasksCompleted: 7,
    totalTasks: 11,
  },
  {
    id: "2",
    employeeId: "EMP-2026-002",
    employeeName: "Sneha Reddy",
    department: "Marketing",
    designation: "Marketing Executive",
    joiningDate: "2026-01-10",
    status: "Completed",
    progress: 100,
    assignedHR: "Amit Patel",
    tasksCompleted: 10,
    totalTasks: 10,
  },
  {
    id: "3",
    employeeId: "EMP-2026-003",
    employeeName: "Amit Patel",
    department: "Operations",
    designation: "Operations Manager",
    joiningDate: "2026-01-20",
    status: "Not Started",
    progress: 0,
    assignedHR: "Neha Singh",
    tasksCompleted: 0,
    totalTasks: 12,
  },
  {
    id: "4",
    employeeId: "EMP-2026-004",
    employeeName: "Priya Sharma",
    department: "HR",
    designation: "HR Coordinator",
    joiningDate: "2026-01-08",
    status: "Completed",
    progress: 100,
    assignedHR: "Vikram Rao",
    tasksCompleted: 9,
    totalTasks: 9,
  },
  {
    id: "5",
    employeeId: "EMP-2026-005",
    employeeName: "Vikram Rao",
    department: "Finance",
    designation: "Financial Analyst",
    joiningDate: "2026-01-18",
    status: "In Progress",
    progress: 35,
    assignedHR: "Priya Sharma",
    tasksCompleted: 4,
    totalTasks: 11,
  },
];

const departments = ["Engineering", "Marketing", "Operations", "HR", "Finance", "Sales"];
const hrList = ["Priya Sharma", "Amit Patel", "Neha Singh", "Vikram Rao"];

const OnboardingOverview = () => {
  const [onboardings, setOnboardings] = useState<OnboardingRecord[]>(initialOnboardings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    department: "",
    designation: "",
    joiningDate: "",
    assignedHR: "",
    notes: "",
  });

  const newHiresThisMonth = onboardings.filter((o) => {
    const date = new Date(o.joiningDate);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
  const inProgress = onboardings.filter((o) => o.status === "In Progress").length;
  const completed = onboardings.filter((o) => o.status === "Completed").length;
  const pendingTasks = onboardings.reduce((acc, o) => acc + (o.totalTasks - o.tasksCompleted), 0);

  const resetForm = () => {
    setFormData({
      employeeName: "",
      employeeId: "",
      department: "",
      designation: "",
      joiningDate: "",
      assignedHR: "",
      notes: "",
    });
  };

  const handleSubmit = () => {
    const newOnboarding: OnboardingRecord = {
      id: String(Date.now()),
      employeeId: formData.employeeId,
      employeeName: formData.employeeName,
      department: formData.department,
      designation: formData.designation,
      joiningDate: formData.joiningDate,
      status: "Not Started",
      progress: 0,
      assignedHR: formData.assignedHR,
      tasksCompleted: 0,
      totalTasks: 11,
    };
    setOnboardings((prev) => [...prev, newOnboarding]);
    toast.success("Onboarding initiated successfully");
    setIsDialogOpen(false);
    resetForm();
  };

  const handleMarkComplete = (id: string) => {
    setOnboardings((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, status: "Completed" as const, progress: 100, tasksCompleted: o.totalTasks } : o
      )
    );
    toast.success("Onboarding marked as complete");
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      "Not Started": "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
      "In Progress": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      Completed: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };
    return (
      <Badge variant="outline" className={colors[status]}>
        {status}
      </Badge>
    );
  };

  const columns: Column<OnboardingRecord>[] = [
    {
      key: "employeeName",
      header: "Employee",
      searchable: true,
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={row.employeeAvatar} alt={row.employeeName} />
            <AvatarFallback className="text-xs">
              {row.employeeName.split(" ").map((n) => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-foreground">{row.employeeName}</p>
            <p className="text-sm text-muted-foreground">{row.employeeId}</p>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      header: "Department",
      sortable: true,
    },
    {
      key: "designation",
      header: "Designation",
      sortable: true,
    },
    {
      key: "joiningDate",
      header: "Joining Date",
      sortable: true,
      render: (row) => new Date(row.joiningDate).toLocaleDateString(),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => getStatusBadge(row.status),
    },
    {
      key: "progress",
      header: "Progress",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-2 min-w-[120px]">
          <Progress value={row.progress} className="h-2 flex-1" />
          <span className="text-sm text-muted-foreground w-10">{row.progress}%</span>
        </div>
      ),
    },
    {
      key: "assignedHR",
      header: "Assigned HR",
      sortable: true,
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      headerClassName: "w-[50px]",
      sticky: "right",
      render: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => toast.info("View details coming soon")}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast.info("Edit coming soon")}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            {row.status !== "Completed" && (
              <DropdownMenuItem onClick={() => handleMarkComplete(row.id)}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Mark Complete
              </DropdownMenuItem>
            )}
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
        { label: "Not Started", value: "Not Started" },
        { label: "In Progress", value: "In Progress" },
        { label: "Completed", value: "Completed" },
      ],
    },
    {
      key: "department",
      label: "Department",
      options: departments.map((d) => ({ label: d, value: d })),
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
                <h1 className="text-3xl font-bold text-foreground font-display">Onboarding Overview</h1>
                <p className="text-muted-foreground mt-1">Track and manage new employee onboarding</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    New Onboarding
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Initiate Onboarding</DialogTitle>
                    <DialogDescription>Start onboarding process for a new employee</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="employeeName">Employee Name</Label>
                        <Input
                          id="employeeName"
                          value={formData.employeeName}
                          onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                          placeholder="Full name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="employeeId">Employee ID</Label>
                        <Input
                          id="employeeId"
                          value={formData.employeeId}
                          onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                          placeholder="e.g., EMP-2026-001"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Select
                          value={formData.department}
                          onValueChange={(value) => setFormData({ ...formData, department: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                          <SelectContent>
                            {departments.map((dept) => (
                              <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="designation">Designation</Label>
                        <Input
                          id="designation"
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          placeholder="Job title"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="joiningDate">Joining Date</Label>
                        <Input
                          id="joiningDate"
                          type="date"
                          value={formData.joiningDate}
                          onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assignedHR">Assign HR</Label>
                        <Select
                          value={formData.assignedHR}
                          onValueChange={(value) => setFormData({ ...formData, assignedHR: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select HR" />
                          </SelectTrigger>
                          <SelectContent>
                            {hrList.map((hr) => (
                              <SelectItem key={hr} value={hr}>{hr}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Additional notes..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Start Onboarding</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard title="New Hires This Month" value={String(newHiresThisMonth)} icon={UserPlus} />
              <StatsCard title="Onboarding In Progress" value={String(inProgress)} icon={Clock} />
              <StatsCard title="Completed This Month" value={String(completed)} icon={Users} />
              <StatsCard title="Pending Tasks" value={String(pendingTasks)} icon={ClipboardList} />
            </div>

            {/* Data Table */}
            <DataTable
              data={onboardings}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search employees..."
              pageSize={10}
              getRowId={(row) => row.id}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OnboardingOverview;
