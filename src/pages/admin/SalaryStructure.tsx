import { useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, MoreHorizontal, Pencil, Trash2, IndianRupee, Percent, Calculator } from "lucide-react";
import type { Column } from "@/components/ui/data-table";

interface SalaryComponent {
  id: string;
  name: string;
  type: "earning" | "deduction";
  calculationType: "fixed" | "percentage";
  value: number;
  applicableTo: string;
  status: "active" | "inactive";
}

const mockComponents: SalaryComponent[] = [
  { id: "1", name: "Basic Salary", type: "earning", calculationType: "percentage", value: 50, applicableTo: "All Employees", status: "active" },
  { id: "2", name: "House Rent Allowance", type: "earning", calculationType: "percentage", value: 20, applicableTo: "All Employees", status: "active" },
  { id: "3", name: "Dearness Allowance", type: "earning", calculationType: "percentage", value: 10, applicableTo: "All Employees", status: "active" },
  { id: "4", name: "Conveyance Allowance", type: "earning", calculationType: "fixed", value: 1600, applicableTo: "All Employees", status: "active" },
  { id: "5", name: "Medical Allowance", type: "earning", calculationType: "fixed", value: 1250, applicableTo: "All Employees", status: "active" },
  { id: "6", name: "Provident Fund", type: "deduction", calculationType: "percentage", value: 12, applicableTo: "All Employees", status: "active" },
  { id: "7", name: "Professional Tax", type: "deduction", calculationType: "fixed", value: 200, applicableTo: "All Employees", status: "active" },
  { id: "8", name: "ESI", type: "deduction", calculationType: "percentage", value: 1.75, applicableTo: "Salary < 21000", status: "active" },
  { id: "9", name: "TDS", type: "deduction", calculationType: "percentage", value: 10, applicableTo: "Taxable Employees", status: "active" },
];

const SalaryStructure = () => {
  const [components] = useState<SalaryComponent[]>(mockComponents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const earnings = components.filter(c => c.type === "earning" && c.status === "active");
  const deductions = components.filter(c => c.type === "deduction" && c.status === "active");

  const columns: Column<SalaryComponent>[] = [
    {
      key: "name",
      header: "Component Name",
      render: (row) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${row.type === "earning" ? "bg-emerald-500" : "bg-rose-500"}`} />
          <span className="font-medium">{row.name}</span>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (row) => (
        <Badge variant={row.type === "earning" ? "default" : "destructive"}>
          {row.type === "earning" ? "Earning" : "Deduction"}
        </Badge>
      ),
    },
    {
      key: "calculationType",
      header: "Calculation",
      render: (row) => (
        <div className="flex items-center gap-1">
          {row.calculationType === "percentage" ? (
            <Percent className="h-4 w-4 text-muted-foreground" />
          ) : (
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="capitalize">{row.calculationType}</span>
        </div>
      ),
    },
    {
      key: "value",
      header: "Value",
      render: (row) => (
        <span className="font-medium">
          {row.calculationType === "percentage" ? `${row.value}%` : `₹${row.value.toLocaleString()}`}
        </span>
      ),
    },
    {
      key: "applicableTo",
      header: "Applicable To",
      render: (row) => <span className="text-muted-foreground">{row.applicableTo}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => (
        <Badge variant={row.status === "active" ? "outline" : "secondary"}>{row.status}</Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      sortable: false,
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Pencil className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Salary Structure</h1>
          <p className="text-muted-foreground mt-1">Manage salary components and structure</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Component
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Salary Component</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Component Name</Label>
                <Input placeholder="e.g., Special Allowance" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="earning">Earning</SelectItem>
                      <SelectItem value="deduction">Deduction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Calculation Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select calculation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                      <SelectItem value="percentage">Percentage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input type="number" placeholder="Enter value" />
              </div>
              <div className="space-y-2">
                <Label>Applicable To</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select applicability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Employees</SelectItem>
                    <SelectItem value="department">Specific Department</SelectItem>
                    <SelectItem value="designation">Specific Designation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
                Add Component
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <DataTable columns={columns} data={components} />
    </AdminLayout>
  );
};

export default SalaryStructure;
