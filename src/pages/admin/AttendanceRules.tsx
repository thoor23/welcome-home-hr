import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { toast } from "sonner";

interface AttendanceRule {
  id: string;
  ruleName: string;
  ruleType: "shift" | "grace_period" | "overtime" | "penalty" | "holiday";
  description: string;
  appliesTo: string;
  value: string;
  status: "active" | "inactive";
  createdAt: string;
}

const initialRules: AttendanceRule[] = [
  {
    id: "1",
    ruleName: "Standard Shift Timing",
    ruleType: "shift",
    description: "Regular office hours from 9 AM to 6 PM",
    appliesTo: "All Departments",
    value: "09:00 AM - 06:00 PM",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    ruleName: "Grace Period",
    ruleType: "grace_period",
    description: "15 minutes grace period for check-in",
    appliesTo: "All Departments",
    value: "15 minutes",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: "3",
    ruleName: "Overtime Calculation",
    ruleType: "overtime",
    description: "Overtime calculated after 9 working hours",
    appliesTo: "All Departments",
    value: "After 9 hours",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: "4",
    ruleName: "Late Penalty",
    ruleType: "penalty",
    description: "Half day deduction after 3 late arrivals per month",
    appliesTo: "All Departments",
    value: "3 lates = 0.5 day",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: "5",
    ruleName: "Weekend Holiday",
    ruleType: "holiday",
    description: "Saturday and Sunday are weekly offs",
    appliesTo: "All Departments",
    value: "Sat, Sun",
    status: "active",
    createdAt: "2024-01-01",
  },
  {
    id: "6",
    ruleName: "Night Shift Timing",
    ruleType: "shift",
    description: "Night shift hours from 10 PM to 7 AM",
    appliesTo: "Engineering",
    value: "10:00 PM - 07:00 AM",
    status: "inactive",
    createdAt: "2024-01-05",
  },
];

const AttendanceRules = () => {
  const [rules, setRules] = useState<AttendanceRule[]>(initialRules);

  const handleDeleteRule = (rule: AttendanceRule) => {
    setRules(rules.filter((r) => r.id !== rule.id));
    toast.success(`Rule "${rule.ruleName}" deleted`);
  };

  const getStatusBadge = (status: AttendanceRule["status"]) => {
    const variants = {
      active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      inactive: "bg-muted text-muted-foreground border-border",
    };

    const dots = {
      active: "bg-emerald-500",
      inactive: "bg-muted-foreground",
    };

    return (
      <Badge variant="outline" className={`${variants[status]} gap-1.5`}>
        <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} />
        {status === "active" ? "Active" : "Inactive"}
      </Badge>
    );
  };

  const getRuleTypeBadge = (type: AttendanceRule["ruleType"]) => {
    const colors = {
      shift: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      grace_period: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      overtime: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      penalty: "bg-red-500/10 text-red-500 border-red-500/20",
      holiday: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };

    const labels = {
      shift: "Shift",
      grace_period: "Grace Period",
      overtime: "Overtime",
      penalty: "Penalty",
      holiday: "Holiday",
    };

    return (
      <Badge variant="outline" className={`${colors[type]} whitespace-nowrap`}>
        {labels[type]}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const columns: Column<AttendanceRule>[] = [
    {
      key: "ruleName",
      header: "Rule Name",
      searchable: true,
      sortable: true,
      className: "text-foreground font-medium whitespace-nowrap",
    },
    {
      key: "ruleType",
      header: "Type",
      sortable: true,
      render: (rule) => getRuleTypeBadge(rule.ruleType),
    },
    {
      key: "description",
      header: "Description",
      searchable: true,
      sortable: false,
      className: "text-muted-foreground max-w-[250px]",
      render: (rule) => (
        <span className="truncate block max-w-[250px]" title={rule.description}>
          {rule.description}
        </span>
      ),
    },
    {
      key: "appliesTo",
      header: "Applies To",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "value",
      header: "Value",
      sortable: false,
      className: "text-foreground whitespace-nowrap font-medium",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      className: "whitespace-nowrap",
      render: (rule) => getStatusBadge(rule.status),
    },
    {
      key: "createdAt",
      header: "Created",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
      render: (rule) => formatDate(rule.createdAt),
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      headerClassName: "w-[50px]",
      sticky: "right",
      render: (rule) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                toast.info(`Editing rule "${rule.ruleName}"`);
              }}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit Rule
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteRule(rule);
              }}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Rule
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
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
    },
    {
      key: "ruleType",
      label: "Rule Type",
      options: [
        { label: "Shift", value: "shift" },
        { label: "Grace Period", value: "grace_period" },
        { label: "Overtime", value: "overtime" },
        { label: "Penalty", value: "penalty" },
        { label: "Holiday", value: "holiday" },
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
                <h1 className="text-3xl font-bold text-foreground font-display">Attendance Rules</h1>
                <p className="text-muted-foreground mt-1">Configure attendance policies and rules</p>
              </div>
            </div>

            <DataTable
              data={rules}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search rules..."
              selectable
              toolbarActions={
                <Button onClick={() => toast.info("Add Rule form coming soon")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              }
              pageSize={10}
              pageSizeOptions={[10, 25, 50, 100]}
              getRowId={(rule) => rule.id}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AttendanceRules;
