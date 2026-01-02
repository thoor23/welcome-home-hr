import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Clock,
  CheckCircle,
  XCircle,
  IndianRupee,
  Eye,
  Check,
  X,
  MessageSquare,
  Receipt,
} from "lucide-react";
import type { Column, Filter } from "@/components/ui/data-table";

interface PendingExpense {
  id: string;
  type: "Expense" | "Claim";
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  category: string;
  description: string;
  amount: number;
  submittedDate: string;
  daysPending: number;
  receiptAttached: boolean;
}

const samplePendingExpenses: PendingExpense[] = [
  {
    id: "EXP001",
    type: "Expense",
    employeeId: "EMP001",
    employeeName: "Rahul Sharma",
    employeeAvatar: "",
    department: "Engineering",
    category: "Travel",
    description: "Flight to Delhi for client meeting",
    amount: 12500,
    submittedDate: "2025-12-16",
    daysPending: 3,
    receiptAttached: true,
  },
  {
    id: "CLM002",
    type: "Claim",
    employeeId: "EMP002",
    employeeName: "Priya Patel",
    employeeAvatar: "",
    department: "Sales",
    category: "Multiple",
    description: "December expense claim (4 items)",
    amount: 18500,
    submittedDate: "2025-12-18",
    daysPending: 1,
    receiptAttached: true,
  },
  {
    id: "EXP003",
    type: "Expense",
    employeeId: "EMP003",
    employeeName: "Amit Kumar",
    employeeAvatar: "",
    department: "Marketing",
    category: "Client Entertainment",
    description: "Client dinner meeting",
    amount: 6500,
    submittedDate: "2025-12-15",
    daysPending: 4,
    receiptAttached: true,
  },
  {
    id: "EXP004",
    type: "Expense",
    employeeId: "EMP006",
    employeeName: "Kavita Nair",
    employeeAvatar: "",
    department: "Finance",
    category: "Travel",
    description: "Uber rides for office commute",
    amount: 850,
    submittedDate: "2025-12-12",
    daysPending: 7,
    receiptAttached: true,
  },
  {
    id: "EXP005",
    type: "Expense",
    employeeId: "EMP007",
    employeeName: "Rajesh Menon",
    employeeAvatar: "",
    department: "Operations",
    category: "Office Supplies",
    description: "Printer cartridges and paper",
    amount: 3200,
    submittedDate: "2025-12-17",
    daysPending: 2,
    receiptAttached: false,
  },
];

const ExpenseApprovals = () => {
  const [expenses, setExpenses] = useState<PendingExpense[]>(samplePendingExpenses);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const pendingCount = expenses.length;
  const totalPendingAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(expenses.map((exp) => exp.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
  };

  const handleApprove = (id: string) => {
    setExpenses(expenses.filter((exp) => exp.id !== id));
    toast.success("Expense approved successfully");
  };

  const handleBulkApprove = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select expenses to approve");
      return;
    }
    setExpenses(expenses.filter((exp) => !selectedIds.includes(exp.id)));
    toast.success(`${selectedIds.length} expenses approved`);
    setSelectedIds([]);
  };

  const handleReject = (id: string) => {
    setRejectingId(id);
    setRejectDialogOpen(true);
  };

  const confirmReject = () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    if (rejectingId) {
      setExpenses(expenses.filter((exp) => exp.id !== rejectingId));
      toast.success("Expense rejected");
    }
    setRejectDialogOpen(false);
    setRejectingId(null);
    setRejectReason("");
  };

  const handleBulkReject = () => {
    if (selectedIds.length === 0) {
      toast.error("Please select expenses to reject");
      return;
    }
    setRejectDialogOpen(true);
  };

  const confirmBulkReject = () => {
    if (!rejectReason.trim()) {
      toast.error("Please provide a reason for rejection");
      return;
    }
    setExpenses(expenses.filter((exp) => !selectedIds.includes(exp.id)));
    toast.success(`${selectedIds.length} expenses rejected`);
    setSelectedIds([]);
    setRejectDialogOpen(false);
    setRejectReason("");
  };

  const columns: Column<PendingExpense>[] = [
    {
      key: "select" as keyof PendingExpense,
      header: "Select",
      render: (expense) => (
        <Checkbox
          checked={selectedIds.includes(expense.id)}
          onCheckedChange={(checked) => handleSelectOne(expense.id, checked as boolean)}
        />
      ),
    },
    {
      key: "id",
      header: "ID",
      sortable: true,
      render: (expense) => (
        <div className="flex items-center gap-2">
          <span>{expense.id}</span>
          <Badge variant="secondary" className="text-xs">
            {expense.type}
          </Badge>
        </div>
      ),
    },
    {
      key: "employeeName",
      header: "Employee",
      sortable: true,
      render: (expense) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={expense.employeeAvatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {expense.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{expense.employeeName}</p>
            <p className="text-xs text-muted-foreground">{expense.department}</p>
          </div>
        </div>
      ),
    },
    { key: "category", header: "Category", sortable: true },
    {
      key: "description",
      header: "Description",
      render: (expense) => (
        <span className="max-w-[200px] truncate block">{expense.description}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      render: (expense) => (
        <span className="font-medium">₹{expense.amount.toLocaleString()}</span>
      ),
    },
    { key: "submittedDate", header: "Submitted", sortable: true },
    {
      key: "daysPending",
      header: "Days Pending",
      sortable: true,
      render: (expense) => (
        <Badge
          variant="outline"
          className={
            expense.daysPending > 5
              ? "bg-red-500/10 text-red-500 border-red-500/20"
              : expense.daysPending > 3
              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
              : "bg-green-500/10 text-green-500 border-green-500/20"
          }
        >
          {expense.daysPending} days
        </Badge>
      ),
    },
    {
      key: "receiptAttached",
      header: "Receipt",
      render: (expense) =>
        expense.receiptAttached ? (
          <Receipt className="h-4 w-4 text-green-500" />
        ) : (
          <span className="text-xs text-muted-foreground">Missing</span>
        ),
    },
    {
      key: "actions" as keyof PendingExpense,
      header: "Actions",
      render: (expense) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-green-500 hover:text-green-600"
            onClick={() => handleApprove(expense.id)}
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-500 hover:text-red-600"
            onClick={() => handleReject(expense.id)}
          >
            <X className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MessageSquare className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "type",
      label: "Type",
      options: [
        { label: "Expense", value: "Expense" },
        { label: "Claim", value: "Claim" },
      ],
    },
    {
      key: "category",
      label: "Category",
      options: [
        { label: "Travel", value: "Travel" },
        { label: "Client Entertainment", value: "Client Entertainment" },
        { label: "Office Supplies", value: "Office Supplies" },
        { label: "Multiple", value: "Multiple" },
      ],
    },
    {
      key: "department",
      label: "Department",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Sales", value: "Sales" },
        { label: "Marketing", value: "Marketing" },
        { label: "Finance", value: "Finance" },
        { label: "Operations", value: "Operations" },
      ],
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-foreground">Expense Approvals</h1>
              <p className="text-muted-foreground">
                Review and approve pending expense requests
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <StatsCard
                title="Pending Approvals"
                value={pendingCount.toString()}
                icon={Clock}
              />
              <StatsCard
                title="Total Pending Amount"
                value={`₹${totalPendingAmount.toLocaleString()}`}
                icon={IndianRupee}
              />
              <StatsCard
                title="Approved Today"
                value="8"
                icon={CheckCircle}
              />
              <StatsCard
                title="Rejected Today"
                value="2"
                icon={XCircle}
              />
            </div>

            {selectedIds.length > 0 && (
              <div className="mb-4 p-4 bg-muted rounded-lg flex items-center justify-between">
                <span className="text-sm font-medium">
                  {selectedIds.length} item(s) selected
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-green-500 border-green-500/20 hover:bg-green-500/10"
                    onClick={handleBulkApprove}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Approve Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 border-red-500/20 hover:bg-red-500/10"
                    onClick={handleBulkReject}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Reject Selected
                  </Button>
                </div>
              </div>
            )}

            <DataTable
              data={expenses}
              columns={columns}
              filters={filters}
              searchPlaceholder="Search by employee..."
            />

            <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reject Expense</DialogTitle>
                  <DialogDescription>
                    Please provide a reason for rejecting this expense request
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <Label>Rejection Reason</Label>
                  <Textarea
                    className="mt-2"
                    placeholder="Enter reason for rejection..."
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setRejectDialogOpen(false);
                      setRejectingId(null);
                      setRejectReason("");
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={rejectingId ? confirmReject : confirmBulkReject}
                  >
                    Reject
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ExpenseApprovals;