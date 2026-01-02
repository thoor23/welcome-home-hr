import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Edit, Trash2, Copy, ClipboardList, CheckCircle, Clock, TrendingUp } from "lucide-react";
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

interface OnboardingTask {
  id: string;
  name: string;
  category: string;
  description: string;
  assignedTo: string;
  dueDays: number;
  priority: "High" | "Medium" | "Low";
  mandatory: boolean;
  status: "Active" | "Inactive";
}

const categories = ["Documents", "IT Setup", "Training", "HR Formalities", "Admin"];
const assignees = ["Employee", "HR Team", "IT Team", "Reporting Manager", "Admin"];
const priorities = ["High", "Medium", "Low"];

const initialTasks: OnboardingTask[] = [
  {
    id: "1",
    name: "Submit ID Proof",
    category: "Documents",
    description: "Upload government-issued ID proof",
    assignedTo: "Employee",
    dueDays: 3,
    priority: "High",
    mandatory: true,
    status: "Active",
  },
  {
    id: "2",
    name: "Bank Account Details",
    category: "Documents",
    description: "Submit bank account details for salary",
    assignedTo: "Employee",
    dueDays: 5,
    priority: "High",
    mandatory: true,
    status: "Active",
  },
  {
    id: "3",
    name: "Laptop/PC Provisioning",
    category: "IT Setup",
    description: "Provision and configure work device",
    assignedTo: "IT Team",
    dueDays: 2,
    priority: "High",
    mandatory: true,
    status: "Active",
  },
  {
    id: "4",
    name: "Email Account Creation",
    category: "IT Setup",
    description: "Create corporate email account",
    assignedTo: "IT Team",
    dueDays: 1,
    priority: "High",
    mandatory: true,
    status: "Active",
  },
  {
    id: "5",
    name: "Policy Acknowledgment",
    category: "HR Formalities",
    description: "Review and acknowledge company policies",
    assignedTo: "Employee",
    dueDays: 7,
    priority: "Medium",
    mandatory: true,
    status: "Active",
  },
  {
    id: "6",
    name: "Orientation Training",
    category: "Training",
    description: "Complete company orientation program",
    assignedTo: "HR Team",
    dueDays: 5,
    priority: "Medium",
    mandatory: true,
    status: "Active",
  },
  {
    id: "7",
    name: "ID Card Issuance",
    category: "Admin",
    description: "Issue employee ID card",
    assignedTo: "HR Team",
    dueDays: 7,
    priority: "Medium",
    mandatory: true,
    status: "Active",
  },
  {
    id: "8",
    name: "Assign Reporting Manager",
    category: "HR Formalities",
    description: "Assign and introduce reporting manager",
    assignedTo: "HR Team",
    dueDays: 1,
    priority: "High",
    mandatory: true,
    status: "Active",
  },
  {
    id: "9",
    name: "Workspace Allocation",
    category: "Admin",
    description: "Allocate desk/workspace",
    assignedTo: "Admin",
    dueDays: 2,
    priority: "Medium",
    mandatory: false,
    status: "Active",
  },
  {
    id: "10",
    name: "Introduce to Team",
    category: "HR Formalities",
    description: "Introduce new hire to team members",
    assignedTo: "Reporting Manager",
    dueDays: 3,
    priority: "Low",
    mandatory: false,
    status: "Active",
  },
];

const OnboardingTasks = () => {
  const [tasks, setTasks] = useState<OnboardingTask[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<OnboardingTask | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    assignedTo: "",
    dueDays: 3,
    priority: "Medium" as "High" | "Medium" | "Low",
    mandatory: true,
    status: "Active" as "Active" | "Inactive",
  });

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((t) => t.status === "Active").length;
  const avgTasksPerOnboarding = 11;
  const completionRate = 87;

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      assignedTo: "",
      dueDays: 3,
      priority: "Medium",
      mandatory: true,
      status: "Active",
    });
    setEditingTask(null);
  };

  const handleSubmit = () => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((t) => (t.id === editingTask.id ? { ...t, ...formData } : t))
      );
      toast.success("Task updated successfully");
    } else {
      const newTask: OnboardingTask = {
        id: String(Date.now()),
        ...formData,
      };
      setTasks((prev) => [...prev, newTask]);
      toast.success("Task created successfully");
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (task: OnboardingTask) => {
    setEditingTask(task);
    setFormData({
      name: task.name,
      category: task.category,
      description: task.description,
      assignedTo: task.assignedTo,
      dueDays: task.dueDays,
      priority: task.priority,
      mandatory: task.mandatory,
      status: task.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success("Task deleted successfully");
  };

  const handleDuplicate = (task: OnboardingTask) => {
    const duplicatedTask: OnboardingTask = {
      ...task,
      id: String(Date.now()),
      name: `${task.name} (Copy)`,
    };
    setTasks((prev) => [...prev, duplicatedTask]);
    toast.success("Task duplicated successfully");
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

  const getPriorityBadge = (priority: string) => {
    const colors: Record<string, string> = {
      High: "bg-red-500/10 text-red-500 border-red-500/20",
      Medium: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      Low: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };
    return (
      <Badge variant="outline" className={colors[priority]}>
        {priority}
      </Badge>
    );
  };

  const columns: Column<OnboardingTask>[] = [
    {
      key: "name",
      header: "Task Name",
      searchable: true,
      sortable: true,
      render: (row) => <span className="font-medium text-foreground">{row.name}</span>,
    },
    {
      key: "category",
      header: "Category",
      sortable: true,
      render: (row) => (
        <Badge variant="secondary">{row.category}</Badge>
      ),
    },
    {
      key: "assignedTo",
      header: "Assigned To",
      sortable: true,
    },
    {
      key: "dueDays",
      header: "Due Days",
      sortable: true,
      className: "text-center",
      render: (row) => `${row.dueDays} days`,
    },
    {
      key: "priority",
      header: "Priority",
      sortable: true,
      render: (row) => getPriorityBadge(row.priority),
    },
    {
      key: "mandatory",
      header: "Mandatory",
      className: "text-center",
      render: (row) => (row.mandatory ? "Yes" : "No"),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => getStatusBadge(row.status),
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
            <DropdownMenuItem onClick={() => handleEdit(row)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDuplicate(row)}>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.id)} className="text-destructive">
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
      key: "category",
      label: "Category",
      options: categories.map((c) => ({ label: c, value: c })),
    },
    {
      key: "priority",
      label: "Priority",
      options: priorities.map((p) => ({ label: p, value: p })),
    },
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
                <h1 className="text-3xl font-bold text-foreground font-display">Onboarding Tasks</h1>
                <p className="text-muted-foreground mt-1">Manage onboarding task templates</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>{editingTask ? "Edit Task" : "Add New Task"}</DialogTitle>
                    <DialogDescription>
                      {editingTask ? "Update task template details" : "Create a new onboarding task template"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Task Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Submit ID Proof"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="assignedTo">Assigned To</Label>
                        <Select
                          value={formData.assignedTo}
                          onValueChange={(value) => setFormData({ ...formData, assignedTo: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select assignee" />
                          </SelectTrigger>
                          <SelectContent>
                            {assignees.map((a) => (
                              <SelectItem key={a} value={a}>{a}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dueDays">Due Days (from joining)</Label>
                        <Input
                          id="dueDays"
                          type="number"
                          value={formData.dueDays}
                          onChange={(e) => setFormData({ ...formData, dueDays: Number(e.target.value) })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                          value={formData.priority}
                          onValueChange={(value) => setFormData({ ...formData, priority: value as "High" | "Medium" | "Low" })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            {priorities.map((p) => (
                              <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Task description..."
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="mandatory">Mandatory Task</Label>
                        <p className="text-xs text-muted-foreground">Required for onboarding completion</p>
                      </div>
                      <Switch
                        id="mandatory"
                        checked={formData.mandatory}
                        onCheckedChange={(checked) => setFormData({ ...formData, mandatory: checked })}
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
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>{editingTask ? "Update" : "Add Task"}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard title="Total Task Templates" value={String(totalTasks)} icon={ClipboardList} />
              <StatsCard title="Active Templates" value={String(activeTasks)} icon={CheckCircle} />
              <StatsCard title="Avg Tasks per Onboarding" value={String(avgTasksPerOnboarding)} icon={Clock} />
              <StatsCard title="Completion Rate" value={`${completionRate}%`} icon={TrendingUp} />
            </div>

            {/* Data Table */}
            <DataTable
              data={tasks}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search tasks..."
              pageSize={10}
              getRowId={(row) => row.id}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default OnboardingTasks;
