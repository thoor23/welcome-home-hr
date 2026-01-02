import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit2, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTable, Column, Filter } from "@/components/ui/data-table";
import { toast } from "sonner";

interface LeaveRule {
  id: string;
  ruleName: string;
  leaveType: string;
  daysAllowed: number;
  carryForward: boolean;
  maxCarryForward: number;
  applicableTo: string;
  status: "active" | "inactive";
  description: string;
}

const initialRules: LeaveRule[] = [
  {
    id: "1",
    ruleName: "Annual Leave Policy",
    leaveType: "Annual Leave",
    daysAllowed: 21,
    carryForward: true,
    maxCarryForward: 5,
    applicableTo: "All Employees",
    status: "active",
    description: "Standard annual leave for all permanent employees",
  },
  {
    id: "2",
    ruleName: "Sick Leave Policy",
    leaveType: "Sick Leave",
    daysAllowed: 12,
    carryForward: false,
    maxCarryForward: 0,
    applicableTo: "All Employees",
    status: "active",
    description: "Paid sick leave with medical certificate",
  },
  {
    id: "3",
    ruleName: "Casual Leave Policy",
    leaveType: "Casual Leave",
    daysAllowed: 6,
    carryForward: false,
    maxCarryForward: 0,
    applicableTo: "All Employees",
    status: "active",
    description: "Casual leave for personal emergencies",
  },
  {
    id: "4",
    ruleName: "Maternity Leave",
    leaveType: "Maternity Leave",
    daysAllowed: 180,
    carryForward: false,
    maxCarryForward: 0,
    applicableTo: "Female Employees",
    status: "active",
    description: "Paid maternity leave as per labor law",
  },
  {
    id: "5",
    ruleName: "Paternity Leave",
    leaveType: "Paternity Leave",
    daysAllowed: 15,
    carryForward: false,
    maxCarryForward: 0,
    applicableTo: "Male Employees",
    status: "active",
    description: "Paid paternity leave for new fathers",
  },
  {
    id: "6",
    ruleName: "Bereavement Leave",
    leaveType: "Special Leave",
    daysAllowed: 5,
    carryForward: false,
    maxCarryForward: 0,
    applicableTo: "All Employees",
    status: "inactive",
    description: "Leave for family bereavement",
  },
];

const LeaveRules = () => {
  const [rules, setRules] = useState<LeaveRule[]>(initialRules);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      inactive: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    };
    return (
      <Badge variant="outline" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleDelete = (id: string) => {
    setRules((prev) => prev.filter((r) => r.id !== id));
    toast.success("Leave rule deleted");
  };

  const columns: Column<LeaveRule>[] = [
    {
      key: "ruleName",
      header: "Rule Name",
      searchable: true,
      sortable: true,
      className: "font-medium text-foreground whitespace-nowrap",
    },
    {
      key: "leaveType",
      header: "Leave Type",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "daysAllowed",
      header: "Days Allowed",
      sortable: true,
      className: "text-foreground font-medium whitespace-nowrap",
    },
    {
      key: "carryForward",
      header: "Carry Forward",
      sortable: true,
      className: "whitespace-nowrap",
      render: (record) => (
        <span className={record.carryForward ? "text-emerald-500" : "text-muted-foreground"}>
          {record.carryForward ? `Yes (Max ${record.maxCarryForward})` : "No"}
        </span>
      ),
    },
    {
      key: "applicableTo",
      header: "Applicable To",
      sortable: true,
      className: "text-muted-foreground whitespace-nowrap",
    },
    {
      key: "description",
      header: "Description",
      className: "text-muted-foreground max-w-[250px] truncate",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      className: "whitespace-nowrap",
      render: (record) => getStatusBadge(record.status),
    },
    {
      key: "actions",
      header: "",
      sortable: false,
      headerClassName: "w-[50px]",
      sticky: "right",
      render: (record) => (
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
                toast.info(`Editing ${record.ruleName}`);
              }}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Edit Rule
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(record.id);
              }}
              className="text-red-500 focus:text-red-500"
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
      key: "leaveType",
      label: "Leave Type",
      options: [
        { label: "Annual Leave", value: "Annual Leave" },
        { label: "Sick Leave", value: "Sick Leave" },
        { label: "Casual Leave", value: "Casual Leave" },
        { label: "Maternity Leave", value: "Maternity Leave" },
        { label: "Paternity Leave", value: "Paternity Leave" },
        { label: "Special Leave", value: "Special Leave" },
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
                <h1 className="text-3xl font-bold text-foreground font-display">Leave Rules</h1>
                <p className="text-muted-foreground mt-1">Configure leave policies and rules</p>
              </div>
            </div>

            <DataTable
              data={rules}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search rules..."
              selectable
              toolbarActions={
                <Button onClick={() => toast.info("Add rule drawer coming soon")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Rule
                </Button>
              }
              pageSize={10}
              pageSizeOptions={[10, 25, 50]}
              getRowId={(record) => record.id}
            />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LeaveRules;