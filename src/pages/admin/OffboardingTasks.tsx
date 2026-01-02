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

interface OffboardingTask {
  id: string;
  name: string;
  category: string;
  description: string;
  assignedTo: string;
  dueDays: string;
  mandatory: boolean;
  status: "Active" | "Inactive";
}

const categories = ["Assets", "IT", "Finance", "HR", "Admin"];
const assignees = ["Employee", "HR Team", "IT Team", "Finance Team", "Reporting Manager", "Admin"];

const initialTasks: OffboardingTask[] = [
  {
    id: "1",
    name: "Return Laptop/PC",
    category: "Assets",
    description: "Return company-issued laptop or PC",
    assignedTo: "IT Team",
    dueDays: "LWD",
    mandatory: true,
    status: "Active",
  },
  {
    id: "2",
    name: "Return ID Card",
    category: "Assets",
    description: "Return employee ID card",
    assignedTo: "HR Team",
    dueDays: "LWD",
    mandatory: true,
    status: "Active",
  },
  {
    id: "3",
    name: "Return Access Cards",
    category: "Assets",
    description: "Return all access cards and keys",
    assignedTo: "Admin",
    dueDays: "LWD",
    mandatory: true,
    status: "Active",
  },
  {
    id: "4",
    name: "Revoke Email Access",
    category: "IT",
    description: "Disable corporate email account",
    assignedTo: "IT Team",
    dueDays: "LWD",
    mandatory: true,
    status: "Active",
  },
  {
    id: "5",
    name: "Revoke System Access",
    category: "IT",
    description: "Remove access to all internal systems",
    assignedTo: "IT Team",
    dueDays: "LWD",
    mandatory: true,
    status: "Active",
  },
  {
    id: "6",
    name: "Knowledge Transfer",
    category: "HR",
    description: "Complete knowledge transfer to team",
    assignedTo: "Reporting Manager",
    dueDays: "LWD-7",
    mandatory: true,
    status: "Active",
  },
  {
    id: "7",
    name: "Exit Interview",
    category: "HR",
    description: "Conduct exit interview",
    assignedTo: "HR Team",
    dueDays: "LWD-3",
    mandatory: true,
    status: "Active",
  },
  {
    id: "8",
    name: "Clear Pending Expenses",
    category: "Finance",
    description: "Submit and clear all pending expense claims",
    assignedTo: "Finance Team",
    dueDays: "LWD-5",
    mandatory: true,
    status: "Active",
  },
  {
    id: "9",
    name: "Full & Final Settlement",
    category: "Finance",
    description: "Process final settlement",
    assignedTo: "Finance Team",
    dueDays: "LWD+15",
    mandatory: true,
    status: "Active",
  },
  {
    id: "10",
    name: "Experience Letter",
    category: "HR",
    description: "Issue experience letter",
    assignedTo: "HR Team",
    dueDays: "LWD+7",
    mandatory: true,
    status: "Active",
  },
  {
    id: "11",
    name: "Relieving Letter",
    category: "HR",
    description: "Issue relieving letter",
    assignedTo: "HR Team",
    dueDays: "LWD",
    mandatory: true,
    status: "Active",
  },
  {
    id: "12",
    name: "Gratuity Processing",
    category: "Finance",
    description: "Process gratuity payment if applicable",
    assignedTo: "Finance Team",
    dueDays: "LWD+30",
    mandatory: false,
    status: "Active",
  },
];

const OffboardingTasks = () => {
  const [tasks, setTasks] = useState<OffboardingTask[]>(initialTasks);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<OffboardingTask | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    assignedTo: "",
    dueDays: "LWD",
    mandatory: true,
    status: "Active" as "Active" | "Inactive",
  });

  const totalTasks = tasks.length;
  const activeTasks = tasks.filter((t) => t.status === "Active").length;
  const avgClearanceTime = 5;
  const pendingApprovals = 3;

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      assignedTo: "",
      dueDays: "LWD",
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
      const newTask: OffboardingTask = {
        id: String(Date.now()),
        ...formData,
      };
      setTasks((prev) => [...prev, newTask]);
      toast.success("Task created successfully");
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (task: OffboardingTask) => {
    setEditingTask(task);
    setFormData({
      name: task.name,
      category: task.category,
      description: task.description,
      assignedTo: task.assignedTo,
      dueDays: task.dueDays,
      mandatory: task.mandatory,
      status: task.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    toast.success("Task deleted successfully");
  };

  const handleDuplicate = (task: OffboardingTask) => {
    const duplicatedTask: OffboardingTask = {
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

  const getCategoryBadge = (category: string) => {
    const colors: Record<string, string> = {
      Assets: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      IT: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Finance: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      HR: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      Admin: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
    };
    return (
      <Badge variant="outline" className={colors[category] || "bg-secondary"}>
        {category}
      </Badge>
    );
  };

  const columns: Column<OffboardingTask>[] = [
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
      render: (row) => getCategoryBadge(row.category),
    },
    {
      key: "assignedTo",
      header: "Assigned To",
      sortable: true,
    },
    {
      key: "dueDays",
      header: "Due",
      sortable: true,
      className: "text-center",
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
                <h1 className="text-3xl font-bold text-foreground font-display">Offboarding Tasks</h1>
                <p className="text-muted-foreground mt-1">Manage exit clearance task templates</p>
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
                      {editingTask ? "Update exit task template details" : "Create a new offboarding task template"}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Task Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Return Laptop"
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
                    <div className="space-y-2">
                      <Label htmlFor="dueDays">Due (relative to LWD)</Label>
                      <Input
                        id="dueDays"
                        value={formData.dueDays}
                        onChange={(e) => setFormData({ ...formData, dueDays: e.target.value })}
                        placeholder="e.g., LWD, LWD-7, LWD+15"
                      />
                      <p className="text-xs text-muted-foreground">
                        Use LWD for last working day, LWD-7 for 7 days before, LWD+15 for 15 days after
                      </p>
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
                        <p className="text-xs text-muted-foreground">Required for clearance completion</p>
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
              <StatsCard title="Total Exit Tasks" value={String(totalTasks)} icon={ClipboardList} />
              <StatsCard title="Active Templates" value={String(activeTasks)} icon={CheckCircle} />
              <StatsCard title="Avg Clearance Time" value={`${avgClearanceTime} days`} icon={Clock} />
              <StatsCard title="Pending Approvals" value={String(pendingApprovals)} icon={TrendingUp} />
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

export default OffboardingTasks;
