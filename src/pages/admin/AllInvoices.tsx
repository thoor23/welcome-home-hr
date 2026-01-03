import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable, Column } from "@/components/ui/data-table";
import { Link } from "react-router-dom";
import { Plus, FileText, Clock, CheckCircle, AlertTriangle, XCircle, Eye, Download, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface Invoice { id: string; invoiceNo: string; branch: string; invoiceDate: string; dueDate: string; totalAmount: number; status: "Draft" | "Sent" | "Paid" | "Overdue" | "Cancelled"; createdBy: string; }

const mockInvoices: Invoice[] = [
  { id: "1", invoiceNo: "INV-2026-001", branch: "Delhi Branch", invoiceDate: "2026-01-02", dueDate: "2026-01-15", totalAmount: 2245000, status: "Sent", createdBy: "Admin User" },
  { id: "2", invoiceNo: "INV-2026-002", branch: "Bangalore Hub", invoiceDate: "2025-12-28", dueDate: "2026-01-10", totalAmount: 1875000, status: "Paid", createdBy: "HR Manager" },
  { id: "3", invoiceNo: "INV-2026-003", branch: "Pune Warehouse", invoiceDate: "2025-12-20", dueDate: "2026-01-05", totalAmount: 550000, status: "Overdue", createdBy: "Finance Admin" },
  { id: "4", invoiceNo: "INV-2026-004", branch: "Mumbai Store", invoiceDate: "2025-12-25", dueDate: "2026-01-08", totalAmount: 1200000, status: "Draft", createdBy: "Admin User" },
];

const AllInvoices = () => {
  const getStatusBadge = (status: Invoice["status"]) => {
    switch (status) {
      case "Draft": return <Badge variant="secondary"><FileText className="h-3 w-3 mr-1" />Draft</Badge>;
      case "Sent": return <Badge variant="secondary" className="bg-blue-500/10 text-blue-600"><Clock className="h-3 w-3 mr-1" />Sent</Badge>;
      case "Paid": return <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600"><CheckCircle className="h-3 w-3 mr-1" />Paid</Badge>;
      case "Overdue": return <Badge variant="secondary" className="bg-rose-500/10 text-rose-600"><AlertTriangle className="h-3 w-3 mr-1" />Overdue</Badge>;
      case "Cancelled": return <Badge variant="secondary" className="bg-muted text-muted-foreground"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
    }
  };

  const handleMarkAsPaid = (invoiceNo: string) => toast.success(`Invoice ${invoiceNo} marked as paid`);

  const columns: Column<Invoice>[] = [
    { key: "invoiceNo", header: "Invoice No.", render: (row) => <span className="font-medium text-primary">{row.invoiceNo}</span> },
    { key: "branch", header: "Branch/Location" },
    { key: "invoiceDate", header: "Invoice Date", render: (row) => new Date(row.invoiceDate).toLocaleDateString("en-IN") },
    { key: "dueDate", header: "Due Date", render: (row) => <span className={row.status === "Overdue" ? "text-destructive font-medium" : ""}>{new Date(row.dueDate).toLocaleDateString("en-IN")}</span> },
    { key: "totalAmount", header: "Total Amount", render: (row) => `₹${row.totalAmount.toLocaleString("en-IN")}` },
    { key: "status", header: "Status", render: (row) => getStatusBadge(row.status) },
    { key: "createdBy", header: "Created By" },
    { key: "actions", header: "Actions", render: (row) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild><Button variant="ghost" size="sm"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem><Eye className="h-4 w-4 mr-2" />View Invoice</DropdownMenuItem>
          <DropdownMenuItem><Download className="h-4 w-4 mr-2" />Download PDF</DropdownMenuItem>
          {row.status === "Sent" && <DropdownMenuItem onClick={() => handleMarkAsPaid(row.invoiceNo)}><CheckCircle className="h-4 w-4 mr-2" />Mark as Paid</DropdownMenuItem>}
        </DropdownMenuContent>
      </DropdownMenu>
    )}
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">All Invoices</h1>
          <p className="text-muted-foreground mt-1">View and manage all generated invoices</p>
        </div>
        <Button asChild><Link to="/admin/billing/generate-invoice"><Plus className="h-4 w-4 mr-2" />Generate Invoice</Link></Button>
      </div>
      
      <DataTable columns={columns} data={mockInvoices} />
    </AdminLayout>
  );
};

export default AllInvoices;