import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Edit, Eye, CheckCircle2, UserMinus, Clock, ClipboardList, Wallet } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface OffboardingRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar?: string;
  department: string;
  exitType: "Resignation" | "Termination" | "Retirement" | "Contract End" | "Absconding";
  lastWorkingDay: string;
  noticePeriod: number;
  clearanceStatus: "Not Started" | "In Progress" | "Completed";
  fnfStatus: "Pending" | "Processed" | "Paid";
  reason: string;
}

const exitTypes = ["Resignation", "Termination", "Retirement", "Contract End", "Absconding"];
const departments = ["Engineering", "Marketing", "Operations", "HR", "Finance", "Sales"];

const initialOffboardings: OffboardingRecord[] = [
  {
    id: "1",
    employeeId: "EMP-2024-045",
    employeeName: "Neha Singh",
    department: "Marketing",
    exitType: "Resignation",
    lastWorkingDay: "2026-01-31",
    noticePeriod: 15,
    clearanceStatus: "In Progress",
    fnfStatus: "Pending",
    reason: "Better opportunity",
  },
  {
    id: "2",
    employeeId: "EMP-2020-012",
    employeeName: "Vikram Rao",
    department: "Operations",
    exitType: "Retirement",
    lastWorkingDay: "2026-02-28",
    noticePeriod: 60,
    clearanceStatus: "Not Started",
    fnfStatus: "Pending",
    reason: "Retirement",
  },
  {
    id: "3",
    employeeId: "EMP-2023-078",
    employeeName: "Sanjay Kumar",
    department: "Engineering",
    exitType: "Termination",
    lastWorkingDay: "2026-01-15",
    noticePeriod: 0,
    clearanceStatus: "Completed",
    fnfStatus: "Paid",
    reason: "Policy violation",
  },
  {
    id: "4",
    employeeId: "EMP-2022-034",
    employeeName: "Anita Desai",
    department: "HR",
    exitType: "Resignation",
    lastWorkingDay: "2026-01-25",
    noticePeriod: 5,
    clearanceStatus: "In Progress",
    fnfStatus: "Processed",
    reason: "Relocation",
  },
  {
    id: "5",
    employeeId: "EMP-2021-056",
    employeeName: "Rajesh Menon",
    department: "Finance",
    exitType: "Contract End",
    lastWorkingDay: "2026-01-20",
    noticePeriod: 0,
    clearanceStatus: "Completed",
    fnfStatus: "Paid",
    reason: "Contract expiry",
  },
];

const OffboardingOverview = () => {
  const [offboardings, setOffboardings] = useState<OffboardingRecord[]>(initialOffboardings);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    employeeName: "",
    employeeId: "",
    department: "",
    exitType: "" as OffboardingRecord["exitType"] | "",
    lastWorkingDay: "",
    noticePeriod: 30,
    reason: "",
  });

  const exitsThisMonth = offboardings.filter((o) => {
    const date = new Date(o.lastWorkingDay);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
  const inProgress = offboardings.filter((o) => o.clearanceStatus === "In Progress").length;
  const completed = offboardings.filter((o) => o.clearanceStatus === "Completed").length;
  const pendingFnF = offboardings.filter((o) => o.fnfStatus === "Pending").length;

  const resetForm = () => {
    setFormData({
      employeeName: "",
      employeeId: "",
      department: "",
      exitType: "",
      lastWorkingDay: "",
      noticePeriod: 30,
      reason: "",
    });
  };

  const handleSubmit = () => {
    if (!formData.exitType) return;
    const newOffboarding: OffboardingRecord = {
      id: String(Date.now()),
      employeeId: formData.employeeId,
      employeeName: formData.employeeName,
      department: formData.department,
      exitType: formData.exitType as OffboardingRecord["exitType"],
      lastWorkingDay: formData.lastWorkingDay,
      noticePeriod: formData.noticePeriod,
      clearanceStatus: "Not Started",
      fnfStatus: "Pending",
      reason: formData.reason,
    };
    setOffboardings((prev) => [...prev, newOffboarding]);
    toast.success("Exit initiated successfully");
    setIsDialogOpen(false);
    resetForm();
  };

  const handleMarkComplete = (id: string) => {
    setOffboardings((prev) =>
      prev.map((o) =>
        o.id === id ? { ...o, clearanceStatus: "Completed" as const } : o
      )
    );
    toast.success("Clearance marked as complete");
  };

  const getClearanceStatusBadge = (status: string) => {
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

  const getFnFStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Pending: "bg-red-500/10 text-red-500 border-red-500/20",
      Processed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Paid: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };
    return (
      <Badge variant="outline" className={colors[status]}>
        {status}
      </Badge>
    );
  };

  const getExitTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      Resignation: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Termination: "bg-red-500/10 text-red-500 border-red-500/20",
      Retirement: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "Contract End": "bg-amber-500/10 text-amber-500 border-amber-500/20",
      Absconding: "bg-zinc-500/10 text-zinc-500 border-zinc-500/20",
    };
    return (
      <Badge variant="outline" className={colors[type]}>
        {type}
      </Badge>
    );
  };

  const columns: Column<OffboardingRecord>[] = [
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
      key: "exitType",
      header: "Exit Type",
      sortable: true,
      render: (row) => getExitTypeBadge(row.exitType),
    },
    {
      key: "lastWorkingDay",
      header: "Last Working Day",
      sortable: true,
      render: (row) => new Date(row.lastWorkingDay).toLocaleDateString(),
    },
    {
      key: "noticePeriod",
      header: "Notice Period",
      sortable: true,
      className: "text-center",
      render: (row) => `${row.noticePeriod} days`,
    },
    {
      key: "clearanceStatus",
      header: "Clearance",
      sortable: true,
      render: (row) => getClearanceStatusBadge(row.clearanceStatus),
    },
    {
      key: "fnfStatus",
      header: "F&F Status",
      sortable: true,
      render: (row) => getFnFStatusBadge(row.fnfStatus),
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
            {row.clearanceStatus !== "Completed" && (
              <DropdownMenuItem onClick={() => handleMarkComplete(row.id)}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Complete Clearance
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "clearanceStatus",
      label: "Clearance Status",
      options: [
        { label: "Not Started", value: "Not Started" },
        { label: "In Progress", value: "In Progress" },
        { label: "Completed", value: "Completed" },
      ],
    },
    {
      key: "exitType",
      label: "Exit Type",
      options: exitTypes.map((t) => ({ label: t, value: t })),
    },
    {
      key: "fnfStatus",
      label: "F&F Status",
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Processed", value: "Processed" },
        { label: "Paid", value: "Paid" },
      ],
    },
  ];
  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground font-display">Offboarding Overview</h1>
                <p className="text-muted-foreground mt-1">Track and manage employee exits</p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
                <DialogTrigger asChild>
                  <Button className="gap-2">
                    <Plus className="h-4 w-4" />
                    Initiate Exit
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Initiate Employee Exit</DialogTitle>
                    <DialogDescription>Start the offboarding process for an employee</DialogDescription>
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
                          placeholder="e.g., EMP-2024-001"
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
                        <Label htmlFor="exitType">Exit Type</Label>
                        <Select
                          value={formData.exitType}
                          onValueChange={(value) => setFormData({ ...formData, exitType: value as OffboardingRecord["exitType"] })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {exitTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lastWorkingDay">Last Working Day</Label>
                        <Input
                          id="lastWorkingDay"
                          type="date"
                          value={formData.lastWorkingDay}
                          onChange={(e) => setFormData({ ...formData, lastWorkingDay: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="noticePeriod">Notice Period (days)</Label>
                        <Input
                          id="noticePeriod"
                          type="number"
                          value={formData.noticePeriod}
                          onChange={(e) => setFormData({ ...formData, noticePeriod: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Exit Reason</Label>
                      <Textarea
                        id="reason"
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder="Reason for exit..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmit}>Initiate Exit</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatsCard title="Exits This Month" value={String(exitsThisMonth)} icon={UserMinus} />
              <StatsCard title="Offboarding In Progress" value={String(inProgress)} icon={Clock} />
              <StatsCard title="Completed This Month" value={String(completed)} icon={ClipboardList} />
              <StatsCard title="Pending F&F" value={String(pendingFnF)} icon={Wallet} />
            </div>

            {/* Data Table */}
            <DataTable
              data={offboardings}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search employees..."
              pageSize={10}
              getRowId={(row) => row.id}
            />
    </AdminLayout>
  );
};

export default OffboardingOverview;
