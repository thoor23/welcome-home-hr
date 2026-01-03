import { AdminLayout } from "@/components/layout/AdminLayout";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";

interface LocationSummary { location: string; totalRequests: number; approvedAmount: number; disbursedAmount: number; approvalRate: number; }
const locationSummary: LocationSummary[] = [
  { location: "Delhi Branch", totalRequests: 24, approvedAmount: 3500000, disbursedAmount: 3200000, approvalRate: 92 },
  { location: "Bangalore Hub", totalRequests: 18, approvedAmount: 2800000, disbursedAmount: 2100000, approvalRate: 88 },
  { location: "Mumbai Store", totalRequests: 15, approvedAmount: 2200000, disbursedAmount: 2200000, approvalRate: 85 },
];

const BillingReport = () => {
  const columns: Column<LocationSummary>[] = [
    { key: "location", header: "Location" },
    { key: "totalRequests", header: "Total Requests" },
    { key: "approvedAmount", header: "Approved Amount", render: (row) => `₹${(row.approvedAmount / 100000).toFixed(1)}L` },
    { key: "disbursedAmount", header: "Disbursed Amount", render: (row) => `₹${(row.disbursedAmount / 100000).toFixed(1)}L` },
    { key: "approvalRate", header: "Approval Rate", render: (row) => <span className={row.approvalRate >= 90 ? "text-emerald-600 font-medium" : ""}>{row.approvalRate}%</span> },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Billing Report</h1>
          <p className="text-muted-foreground mt-1">Analytics and insights for internal billing</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="fy2025">
            <SelectTrigger className="w-[140px]"><SelectValue placeholder="Financial Year" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fy2025">FY 2025-26</SelectItem>
              <SelectItem value="fy2024">FY 2024-25</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
        </div>
      </div>
      
      <DataTable columns={columns} data={locationSummary} />
    </AdminLayout>
  );
};

export default BillingReport;