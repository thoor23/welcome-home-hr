import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Receipt, TrendingUp, CheckCircle, Download, FileBarChart } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from "recharts";

const monthlyData = [{ month: "Jul", requests: 45 }, { month: "Aug", requests: 52 }, { month: "Sep", requests: 48 }, { month: "Oct", requests: 61 }, { month: "Nov", requests: 55 }, { month: "Dec", requests: 68 }];
const categoryData = [{ name: "Salary", value: 45, color: "hsl(var(--primary))" }, { name: "IT", value: 18, color: "hsl(var(--chart-2))" }, { name: "Utilities", value: 15, color: "hsl(var(--chart-3))" }, { name: "Others", value: 22, color: "hsl(var(--chart-4))" }];
const locationData = [{ location: "Delhi", allocated: 50, disbursed: 32 }, { location: "Bangalore", allocated: 45, disbursed: 21 }, { location: "Mumbai", allocated: 30, disbursed: 28 }];
const yearlyComparison = [{ month: "Jan", current: 95, previous: 80 }, { month: "Feb", current: 88, previous: 75 }, { month: "Mar", current: 102, previous: 85 }, { month: "Apr", current: 110, previous: 90 }];

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
      <div className="max-w-7xl mx-auto space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div><h1 className="text-2xl font-bold text-foreground">Billing Report</h1><p className="text-muted-foreground">Analytics and insights for internal billing</p></div>
                <div className="flex items-center gap-2"><Select defaultValue="fy2025"><SelectTrigger className="w-[140px]"><SelectValue placeholder="Financial Year" /></SelectTrigger><SelectContent><SelectItem value="fy2025">FY 2025-26</SelectItem><SelectItem value="fy2024">FY 2024-25</SelectItem></SelectContent></Select><Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Requests</CardTitle><Receipt className="h-4 w-4 text-primary" /></CardHeader><CardContent><div className="text-2xl font-bold">101</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Allocated</CardTitle><FileBarChart className="h-4 w-4 text-blue-500" /></CardHeader><CardContent><div className="text-2xl font-bold">₹1.6Cr</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Disbursed</CardTitle><TrendingUp className="h-4 w-4 text-emerald-500" /></CardHeader><CardContent><div className="text-2xl font-bold">₹1.4Cr</div></CardContent></Card>
                <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Approval Rate</CardTitle><CheckCircle className="h-4 w-4 text-emerald-500" /></CardHeader><CardContent><div className="text-2xl font-bold">88%</div></CardContent></Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle>Monthly Request Trends</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><BarChart data={monthlyData}><CartesianGrid strokeDasharray="3 3" className="stroke-muted" /><XAxis dataKey="month" /><YAxis /><Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} /><Bar dataKey="requests" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
                <Card><CardHeader><CardTitle>Requests by Category</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>{categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></CardContent></Card>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card><CardHeader><CardTitle>Allocations by Location (₹ Lakhs)</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><BarChart data={locationData} layout="vertical"><CartesianGrid strokeDasharray="3 3" className="stroke-muted" /><XAxis type="number" /><YAxis type="category" dataKey="location" width={80} /><Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} /><Legend /><Bar dataKey="allocated" fill="hsl(var(--primary))" name="Allocated" radius={[0, 4, 4, 0]} /><Bar dataKey="disbursed" fill="hsl(var(--chart-2))" name="Disbursed" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></CardContent></Card>
                <Card><CardHeader><CardTitle>Year-over-Year Comparison</CardTitle></CardHeader><CardContent><ResponsiveContainer width="100%" height={300}><LineChart data={yearlyComparison}><CartesianGrid strokeDasharray="3 3" className="stroke-muted" /><XAxis dataKey="month" /><YAxis /><Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} /><Legend /><Line type="monotone" dataKey="current" stroke="hsl(var(--primary))" name="FY 2025-26" strokeWidth={2} /><Line type="monotone" dataKey="previous" stroke="hsl(var(--muted-foreground))" name="FY 2024-25" strokeWidth={2} strokeDasharray="5 5" /></LineChart></ResponsiveContainer></CardContent></Card>
              </div>
              <Card><CardHeader><CardTitle>Location-wise Summary</CardTitle></CardHeader><CardContent><DataTable columns={columns} data={locationSummary} /></CardContent></Card>
      </div>
    </AdminLayout>
  );
};

export default BillingReport;
