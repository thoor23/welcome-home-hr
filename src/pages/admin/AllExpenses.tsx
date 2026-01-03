import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { toast } from "sonner";
import {
  CreditCard,
  IndianRupee,
  Clock,
  CheckCircle,
  Plus,
  Eye,
  Check,
  X,
  Receipt,
} from "lucide-react";
import type { Column, Filter } from "@/components/ui/data-table";

interface Expense {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  category: string;
  description: string;
  amount: number;
  receiptAttached: boolean;
  expenseDate: string;
  submittedDate: string;
  status: "Pending" | "Approved" | "Rejected" | "Reimbursed";
}

const sampleExpenses: Expense[] = [
  {
    id: "EXP001",
    employeeId: "EMP001",
    employeeName: "Rahul Sharma",
    employeeAvatar: "",
    department: "Engineering",
    category: "Travel",
    description: "Flight to Delhi for client meeting",
    amount: 12500,
    receiptAttached: true,
    expenseDate: "2025-12-15",
    submittedDate: "2025-12-16",
    status: "Pending",
  },
  {
    id: "EXP002",
    employeeId: "EMP002",
    employeeName: "Priya Patel",
    employeeAvatar: "",
    department: "Sales",
    category: "Client Entertainment",
    description: "Team lunch with client",
    amount: 4500,
    receiptAttached: true,
    expenseDate: "2025-12-14",
    submittedDate: "2025-12-14",
    status: "Approved",
  },
  {
    id: "EXP003",
    employeeId: "EMP003",
    employeeName: "Amit Kumar",
    employeeAvatar: "",
    department: "Marketing",
    category: "Office Supplies",
    description: "Office stationery and supplies",
    amount: 1200,
    receiptAttached: false,
    expenseDate: "2025-12-13",
    submittedDate: "2025-12-13",
    status: "Rejected",
  },
  {
    id: "EXP004",
    employeeId: "EMP004",
    employeeName: "Sneha Reddy",
    employeeAvatar: "",
    department: "HR",
    category: "Training",
    description: "Online training course subscription",
    amount: 5000,
    receiptAttached: true,
    expenseDate: "2025-12-10",
    submittedDate: "2025-12-11",
    status: "Reimbursed",
  },
  {
    id: "EXP005",
    employeeId: "EMP005",
    employeeName: "Vikram Singh",
    employeeAvatar: "",
    department: "Engineering",
    category: "Accommodation",
    description: "Hotel stay for conference",
    amount: 8000,
    receiptAttached: true,
    expenseDate: "2025-12-08",
    submittedDate: "2025-12-09",
    status: "Approved",
  },
  {
    id: "EXP006",
    employeeId: "EMP006",
    employeeName: "Kavita Nair",
    employeeAvatar: "",
    department: "Finance",
    category: "Travel",
    description: "Uber rides for office commute",
    amount: 850,
    receiptAttached: true,
    expenseDate: "2025-12-12",
    submittedDate: "2025-12-12",
    status: "Pending",
  },
];

const categories = [
  "Travel",
  "Food & Meals",
  "Accommodation",
  "Office Supplies",
  "Client Entertainment",
  "Training",
  "Communication",
  "Fuel",
  "Medical",
  "Other",
];

const AllExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>(sampleExpenses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    category: "",
    description: "",
    amount: "",
    expenseDate: "",
  });

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const pendingAmount = expenses
    .filter((exp) => exp.status === "Pending")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const approvedAmount = expenses
    .filter((exp) => exp.status === "Approved")
    .reduce((sum, exp) => sum + exp.amount, 0);
  const reimbursedAmount = expenses
    .filter((exp) => exp.status === "Reimbursed")
    .reduce((sum, exp) => sum + exp.amount, 0);

  const getStatusBadge = (status: Expense["status"]) => {
    const styles = {
      Pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      Approved: "bg-green-500/10 text-green-500 border-green-500/20",
      Rejected: "bg-red-500/10 text-red-500 border-red-500/20",
      Reimbursed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status}
      </Badge>
    );
  };

  const columns: Column<Expense>[] = [
    { key: "id", header: "Expense ID", sortable: true },
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
            <p className="text-xs text-muted-foreground">{expense.employeeId}</p>
          </div>
        </div>
      ),
    },
    { key: "department", header: "Department", sortable: true },
    { key: "category", header: "Category", sortable: true },
    { key: "description", header: "Description" },
    {
      key: "amount",
      header: "Amount",
      sortable: true,
      render: (expense) => (
        <span className="font-medium">₹{expense.amount.toLocaleString()}</span>
      ),
    },
    {
      key: "receiptAttached",
      header: "Receipt",
      render: (expense) =>
        expense.receiptAttached ? (
          <Receipt className="h-4 w-4 text-green-500" />
        ) : (
          <span className="text-muted-foreground text-xs">No receipt</span>
        ),
    },
    { key: "expenseDate", header: "Expense Date", sortable: true },
    { key: "submittedDate", header: "Submitted", sortable: true },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (expense) => getStatusBadge(expense.status),
    },
    {
      key: "actions" as keyof Expense,
      header: "Actions",
      render: (expense) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          {expense.status === "Pending" && (
            <>
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
            </>
          )}
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "category",
      label: "Category",
      options: categories.map((cat) => ({ label: cat, value: cat })),
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Pending", value: "Pending" },
        { label: "Approved", value: "Approved" },
        { label: "Rejected", value: "Rejected" },
        { label: "Reimbursed", value: "Reimbursed" },
      ],
    },
    {
      key: "department",
      label: "Department",
      options: [
        { label: "Engineering", value: "Engineering" },
        { label: "Sales", value: "Sales" },
        { label: "Marketing", value: "Marketing" },
        { label: "HR", value: "HR" },
        { label: "Finance", value: "Finance" },
      ],
    },
  ];

  const handleApprove = (id: string) => {
    setExpenses(
      expenses.map((exp) =>
        exp.id === id ? { ...exp, status: "Approved" as const } : exp
      )
    );
    toast.success("Expense approved successfully");
  };

  const handleReject = (id: string) => {
    setExpenses(
      expenses.map((exp) =>
        exp.id === id ? { ...exp, status: "Rejected" as const } : exp
      )
    );
    toast.success("Expense rejected");
  };

  const handleAddExpense = () => {
    if (!newExpense.category || !newExpense.description || !newExpense.amount) {
      toast.error("Please fill all required fields");
      return;
    }

    const expense: Expense = {
      id: `EXP${String(expenses.length + 1).padStart(3, "0")}`,
      employeeId: "EMP001",
      employeeName: "Current User",
      employeeAvatar: "",
      department: "Engineering",
      category: newExpense.category,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      receiptAttached: false,
      expenseDate: newExpense.expenseDate || new Date().toISOString().split("T")[0],
      submittedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({ category: "", description: "", amount: "", expenseDate: "" });
    setIsAddDialogOpen(false);
    toast.success("Expense submitted successfully");
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Expenses</h1>
          <p className="text-muted-foreground">
            Manage and track all expense submissions
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Expense
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit New Expense</DialogTitle>
              <DialogDescription>
                Add a new expense for reimbursement
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select
                  value={newExpense.category}
                  onValueChange={(value) =>
                    setNewExpense({ ...newExpense, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Expense description"
                  value={newExpense.description}
                  onChange={(e) =>
                    setNewExpense({ ...newExpense, description: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Amount (₹)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Expense Date</Label>
                  <Input
                    type="date"
                    value={newExpense.expenseDate}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, expenseDate: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddExpense}>Submit Expense</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatsCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString()}`}
          icon={CreditCard}
        />
        <StatsCard
          title="Pending Approval"
          value={`₹${pendingAmount.toLocaleString()}`}
          icon={Clock}
        />
        <StatsCard
          title="Approved"
          value={`₹${approvedAmount.toLocaleString()}`}
          icon={CheckCircle}
        />
        <StatsCard
          title="Reimbursed"
          value={`₹${reimbursedAmount.toLocaleString()}`}
          icon={IndianRupee}
        />
      </div>

      <DataTable
        data={expenses}
        columns={columns}
        filters={filters}
        searchPlaceholder="Search by employee name..."
      />
    </AdminLayout>
  );
};

export default AllExpenses;