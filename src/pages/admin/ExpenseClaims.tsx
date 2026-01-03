import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { toast } from "sonner";
import { Plus, Eye, FileText, Send } from "lucide-react";
import type { Column, Filter } from "@/components/ui/data-table";

interface ExpenseClaim {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeAvatar: string;
  department: string;
  claimPeriod: string;
  totalAmount: number;
  expenseCount: number;
  submittedDate: string;
  status: "Draft" | "Submitted" | "Under Review" | "Approved" | "Partially Approved" | "Rejected" | "Reimbursed";
  reviewedBy: string;
}

const sampleClaims: ExpenseClaim[] = [
  {
    id: "CLM001",
    employeeId: "EMP001",
    employeeName: "Rahul Sharma",
    employeeAvatar: "",
    department: "Engineering",
    claimPeriod: "Dec 2025",
    totalAmount: 25600,
    expenseCount: 5,
    submittedDate: "2025-12-20",
    status: "Submitted",
    reviewedBy: "",
  },
  {
    id: "CLM002",
    employeeId: "EMP002",
    employeeName: "Priya Patel",
    employeeAvatar: "",
    department: "Sales",
    claimPeriod: "Dec 2025",
    totalAmount: 18500,
    expenseCount: 4,
    submittedDate: "2025-12-18",
    status: "Under Review",
    reviewedBy: "Manager",
  },
  {
    id: "CLM003",
    employeeId: "EMP003",
    employeeName: "Amit Kumar",
    employeeAvatar: "",
    department: "Marketing",
    claimPeriod: "Nov 2025",
    totalAmount: 12300,
    expenseCount: 3,
    submittedDate: "2025-11-28",
    status: "Approved",
    reviewedBy: "Finance Head",
  },
  {
    id: "CLM004",
    employeeId: "EMP004",
    employeeName: "Sneha Reddy",
    employeeAvatar: "",
    department: "HR",
    claimPeriod: "Nov 2025",
    totalAmount: 8500,
    expenseCount: 2,
    submittedDate: "2025-11-25",
    status: "Reimbursed",
    reviewedBy: "Finance Head",
  },
  {
    id: "CLM005",
    employeeId: "EMP005",
    employeeName: "Vikram Singh",
    employeeAvatar: "",
    department: "Engineering",
    claimPeriod: "Dec 2025",
    totalAmount: 5200,
    expenseCount: 2,
    submittedDate: "",
    status: "Draft",
    reviewedBy: "",
  },
  {
    id: "CLM006",
    employeeId: "EMP006",
    employeeName: "Kavita Nair",
    employeeAvatar: "",
    department: "Finance",
    claimPeriod: "Nov 2025",
    totalAmount: 3500,
    expenseCount: 1,
    submittedDate: "2025-11-20",
    status: "Rejected",
    reviewedBy: "Finance Head",
  },
];

const ExpenseClaims = () => {
  const [claims] = useState<ExpenseClaim[]>(sampleClaims);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newClaim, setNewClaim] = useState({
    claimPeriod: "",
    description: "",
  });

  const getStatusBadge = (status: ExpenseClaim["status"]) => {
    const styles: Record<ExpenseClaim["status"], string> = {
      Draft: "bg-gray-500/10 text-gray-500 border-gray-500/20",
      Submitted: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      "Under Review": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      Approved: "bg-green-500/10 text-green-500 border-green-500/20",
      "Partially Approved": "bg-orange-500/10 text-orange-500 border-orange-500/20",
      Rejected: "bg-red-500/10 text-red-500 border-red-500/20",
      Reimbursed: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    };
    return (
      <Badge variant="outline" className={styles[status]}>
        {status}
      </Badge>
    );
  };

  const columns: Column<ExpenseClaim>[] = [
    { key: "id", header: "Claim ID", sortable: true },
    {
      key: "employeeName",
      header: "Employee",
      sortable: true,
      render: (claim) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={claim.employeeAvatar} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {claim.employeeName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{claim.employeeName}</p>
            <p className="text-xs text-muted-foreground">{claim.department}</p>
          </div>
        </div>
      ),
    },
    { key: "claimPeriod", header: "Period", sortable: true },
    {
      key: "totalAmount",
      header: "Total Amount",
      sortable: true,
      render: (claim) => (
        <span className="font-medium">₹{claim.totalAmount.toLocaleString()}</span>
      ),
    },
    {
      key: "expenseCount",
      header: "Expenses",
      render: (claim) => (
        <Badge variant="secondary">{claim.expenseCount} items</Badge>
      ),
    },
    {
      key: "submittedDate",
      header: "Submitted",
      sortable: true,
      render: (claim) => claim.submittedDate || "-",
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (claim) => getStatusBadge(claim.status),
    },
    {
      key: "reviewedBy",
      header: "Reviewed By",
      render: (claim) => claim.reviewedBy || "-",
    },
    {
      key: "actions" as keyof ExpenseClaim,
      header: "Actions",
      render: (claim) => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Eye className="h-4 w-4" />
          </Button>
          {claim.status === "Draft" && (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-500">
              <Send className="h-4 w-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <FileText className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const filters: Filter[] = [
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Draft", value: "Draft" },
        { label: "Submitted", value: "Submitted" },
        { label: "Under Review", value: "Under Review" },
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

  const myClaims = claims.filter((c) => c.employeeId === "EMP001");
  const teamClaims = claims.filter((c) => c.department === "Engineering");
  const allClaims = claims;

  const handleCreateClaim = () => {
    if (!newClaim.claimPeriod) {
      toast.error("Please select a claim period");
      return;
    }
    toast.success("Claim created successfully");
    setNewClaim({ claimPeriod: "", description: "" });
    setIsCreateDialogOpen(false);
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Expense Claims</h1>
          <p className="text-muted-foreground">
            Submit and manage expense reimbursement claims
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Claim
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Claim</DialogTitle>
              <DialogDescription>
                Group your expenses into a claim for reimbursement
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Claim Period</Label>
                <Input
                  type="month"
                  value={newClaim.claimPeriod}
                  onChange={(e) =>
                    setNewClaim({ ...newClaim, claimPeriod: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label>Description (Optional)</Label>
                <Input
                  placeholder="e.g., December business expenses"
                  value={newClaim.description}
                  onChange={(e) =>
                    setNewClaim({ ...newClaim, description: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateClaim}>Create Claim</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="my-claims" className="space-y-6">
        <TabsList>
          <TabsTrigger value="my-claims">My Claims</TabsTrigger>
          <TabsTrigger value="team-claims">Team Claims</TabsTrigger>
          <TabsTrigger value="all-claims">All Claims</TabsTrigger>
        </TabsList>

        <TabsContent value="my-claims">
          <DataTable
            data={myClaims}
            columns={columns}
            filters={filters}
            searchPlaceholder="Search claims..."
          />
        </TabsContent>

        <TabsContent value="team-claims">
          <DataTable
            data={teamClaims}
            columns={columns}
            filters={filters}
            searchPlaceholder="Search by employee..."
          />
        </TabsContent>

        <TabsContent value="all-claims">
          <DataTable
            data={allClaims}
            columns={columns}
            filters={filters}
            searchPlaceholder="Search by employee..."
          />
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default ExpenseClaims;