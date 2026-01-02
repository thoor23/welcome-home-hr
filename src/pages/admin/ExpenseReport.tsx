import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import {
  IndianRupee,
  Users,
  TrendingUp,
  Clock,
  Download,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";
import type { Column } from "@/components/ui/data-table";

const monthlyExpenseData = [
  { month: "Jul", amount: 125000 },
  { month: "Aug", amount: 145000 },
  { month: "Sep", amount: 132000 },
  { month: "Oct", amount: 168000 },
  { month: "Nov", amount: 152000 },
  { month: "Dec", amount: 142000 },
];

const categoryData = [
  { name: "Travel", value: 245000, color: "hsl(var(--chart-1))" },
  { name: "Food & Meals", value: 85000, color: "hsl(var(--chart-2))" },
  { name: "Accommodation", value: 120000, color: "hsl(var(--chart-3))" },
  { name: "Client Entertainment", value: 95000, color: "hsl(var(--chart-4))" },
  { name: "Office Supplies", value: 45000, color: "hsl(var(--chart-5))" },
  { name: "Training", value: 75000, color: "hsl(var(--primary))" },
];

const departmentData = [
  { department: "Engineering", amount: 185000 },
  { department: "Sales", amount: 245000 },
  { department: "Marketing", amount: 125000 },
  { department: "HR", amount: 65000 },
  { department: "Finance", amount: 85000 },
  { department: "Operations", amount: 95000 },
];

const yearOverYearData = [
  { month: "Jan", current: 120000, previous: 95000 },
  { month: "Feb", current: 135000, previous: 110000 },
  { month: "Mar", current: 128000, previous: 105000 },
  { month: "Apr", current: 142000, previous: 115000 },
  { month: "May", current: 155000, previous: 125000 },
  { month: "Jun", current: 148000, previous: 130000 },
  { month: "Jul", current: 125000, previous: 120000 },
  { month: "Aug", current: 145000, previous: 135000 },
  { month: "Sep", current: 132000, previous: 118000 },
  { month: "Oct", current: 168000, previous: 145000 },
  { month: "Nov", current: 152000, previous: 140000 },
  { month: "Dec", current: 142000, previous: 125000 },
];

interface CategorySummary {
  category: string;
  totalExpenses: number;
  totalAmount: number;
  approved: number;
  pending: number;
  avgAmount: number;
}

const categorySummaryData: CategorySummary[] = [
  {
    category: "Travel",
    totalExpenses: 45,
    totalAmount: 245000,
    approved: 38,
    pending: 7,
    avgAmount: 5444,
  },
  {
    category: "Food & Meals",
    totalExpenses: 85,
    totalAmount: 85000,
    approved: 78,
    pending: 7,
    avgAmount: 1000,
  },
  {
    category: "Accommodation",
    totalExpenses: 18,
    totalAmount: 120000,
    approved: 15,
    pending: 3,
    avgAmount: 6667,
  },
  {
    category: "Client Entertainment",
    totalExpenses: 25,
    totalAmount: 95000,
    approved: 22,
    pending: 3,
    avgAmount: 3800,
  },
  {
    category: "Office Supplies",
    totalExpenses: 42,
    totalAmount: 45000,
    approved: 40,
    pending: 2,
    avgAmount: 1071,
  },
  {
    category: "Training",
    totalExpenses: 12,
    totalAmount: 75000,
    approved: 10,
    pending: 2,
    avgAmount: 6250,
  },
];

const ExpenseReport = () => {
  const totalExpenses = 864000;
  const avgPerEmployee = 14400;
  const pendingReimbursements = 42500;

  const columns: Column<CategorySummary>[] = [
    { key: "category", header: "Category", sortable: true },
    { key: "totalExpenses", header: "Total Expenses", sortable: true },
    {
      key: "totalAmount",
      header: "Total Amount",
      sortable: true,
      render: (row) => `₹${row.totalAmount.toLocaleString()}`,
    },
    { key: "approved", header: "Approved", sortable: true },
    { key: "pending", header: "Pending", sortable: true },
    {
      key: "avgAmount",
      header: "Avg Amount",
      sortable: true,
      render: (row) => `₹${row.avgAmount.toLocaleString()}`,
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Expense Report</h1>
                <p className="text-muted-foreground">
                  Analytics and insights on expense spending
                </p>
              </div>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <StatsCard
                title="Total Expenses (Year)"
                value={`₹${totalExpenses.toLocaleString()}`}
                icon={IndianRupee}
              />
              <StatsCard
                title="Avg per Employee"
                value={`₹${avgPerEmployee.toLocaleString()}`}
                icon={Users}
              />
              <StatsCard
                title="Top Category"
                value="Travel"
                icon={TrendingUp}
              />
              <StatsCard
                title="Pending Reimbursements"
                value={`₹${pendingReimbursements.toLocaleString()}`}
                icon={Clock}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Expense Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyExpenseData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis
                        className="text-xs"
                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="amount"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Expenses by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                        labelLine={false}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Expenses by Department</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={departmentData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis
                        type="number"
                        className="text-xs"
                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                      />
                      <YAxis dataKey="department" type="category" className="text-xs" width={80} />
                      <Tooltip
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, "Amount"]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="amount"
                        fill="hsl(var(--chart-2))"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Year-over-Year Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={yearOverYearData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis
                        className="text-xs"
                        tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="current"
                        name="2025"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="previous"
                        name="2024"
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "hsl(var(--muted-foreground))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Category-wise Summary</CardTitle>
              </CardHeader>
              <CardContent>
              <DataTable
                  data={categorySummaryData}
                  columns={columns}
                  searchPlaceholder="Search categories..."
                />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ExpenseReport;