import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { IndianRupee, Users, TrendingUp, Clock, Download } from "lucide-react";
import { Pie, PieChart, Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import type { Column } from "@/components/ui/data-table";

const monthlyExpenseData = [
  { month: "Jul", amount: 125000 },
  { month: "Aug", amount: 145000 },
  { month: "Sep", amount: 132000 },
  { month: "Oct", amount: 168000 },
  { month: "Nov", amount: 152000 },
  { month: "Dec", amount: 142000 },
];

const monthlyConfig = {
  amount: { label: "Amount", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

const categoryData = [
  { category: "travel", value: 245000, fill: "hsl(var(--chart-1))" },
  { category: "food", value: 85000, fill: "hsl(var(--chart-2))" },
  { category: "accommodation", value: 120000, fill: "hsl(var(--chart-3))" },
  { category: "client", value: 95000, fill: "hsl(var(--chart-4))" },
  { category: "supplies", value: 45000, fill: "hsl(var(--chart-5))" },
  { category: "training", value: 75000, fill: "hsl(var(--primary))" },
];

const categoryConfig = {
  value: { label: "Amount" },
  travel: { label: "Travel", color: "hsl(var(--chart-1))" },
  food: { label: "Food & Meals", color: "hsl(var(--chart-2))" },
  accommodation: { label: "Accommodation", color: "hsl(var(--chart-3))" },
  client: { label: "Client Entertainment", color: "hsl(var(--chart-4))" },
  supplies: { label: "Office Supplies", color: "hsl(var(--chart-5))" },
  training: { label: "Training", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

const departmentData = [
  { department: "Engineering", amount: 185000 },
  { department: "Sales", amount: 245000 },
  { department: "Marketing", amount: 125000 },
  { department: "HR", amount: 65000 },
  { department: "Finance", amount: 85000 },
  { department: "Operations", amount: 95000 },
];

const departmentConfig = {
  amount: { label: "Amount", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;

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

const yoyConfig = {
  current: { label: "2025", color: "hsl(var(--primary))" },
  previous: { label: "2024", color: "hsl(var(--muted-foreground))" },
} satisfies ChartConfig;

interface CategorySummary {
  category: string;
  totalExpenses: number;
  totalAmount: number;
  approved: number;
  pending: number;
  avgAmount: number;
}

const categorySummaryData: CategorySummary[] = [
  { category: "Travel", totalExpenses: 45, totalAmount: 245000, approved: 38, pending: 7, avgAmount: 5444 },
  { category: "Food & Meals", totalExpenses: 85, totalAmount: 85000, approved: 78, pending: 7, avgAmount: 1000 },
  { category: "Accommodation", totalExpenses: 18, totalAmount: 120000, approved: 15, pending: 3, avgAmount: 6667 },
  { category: "Client Entertainment", totalExpenses: 25, totalAmount: 95000, approved: 22, pending: 3, avgAmount: 3800 },
  { category: "Office Supplies", totalExpenses: 42, totalAmount: 45000, approved: 40, pending: 2, avgAmount: 1071 },
  { category: "Training", totalExpenses: 12, totalAmount: 75000, approved: 10, pending: 2, avgAmount: 6250 },
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
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground font-display">Expense Report</h1>
          <p className="text-muted-foreground mt-1">Analytics and insights on expense spending</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatsCard title="Total Expenses (Year)" value={`₹${totalExpenses.toLocaleString()}`} icon={IndianRupee} />
        <StatsCard title="Avg per Employee" value={`₹${avgPerEmployee.toLocaleString()}`} icon={Users} />
        <StatsCard title="Top Category" value="Travel" icon={TrendingUp} />
        <StatsCard title="Pending Reimbursements" value={`₹${pendingReimbursements.toLocaleString()}`} icon={Clock} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expense Trend</CardTitle>
            <CardDescription>Expense spending over the months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={monthlyConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={monthlyExpenseData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => `₹${Number(value).toLocaleString()}`} />} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
            <CardDescription>Distribution across expense categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={categoryConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel formatter={(value) => `₹${Number(value).toLocaleString()}`} />} />
                <Pie data={categoryData} dataKey="value" nameKey="category" innerRadius={60} outerRadius={100} strokeWidth={5} />
                <ChartLegend content={<ChartLegendContent nameKey="category" />} className="-translate-y-2 flex-wrap gap-2" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expenses by Department</CardTitle>
            <CardDescription>Department-wise expense distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={departmentConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={departmentData} layout="vertical">
                <CartesianGrid horizontal={false} />
                <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                <YAxis dataKey="department" type="category" tickLine={false} axisLine={false} width={80} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => `₹${Number(value).toLocaleString()}`} />} />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Year-over-Year Comparison</CardTitle>
            <CardDescription>Expense trends compared to last year</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={yoyConfig} className="h-[300px] w-full">
              <LineChart accessibilityLayer data={yearOverYearData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`} />
                <ChartTooltip content={<ChartTooltipContent formatter={(value) => `₹${Number(value).toLocaleString()}`} />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="current" stroke="var(--color-current)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="previous" stroke="var(--color-previous)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category-wise Summary</CardTitle>
          <CardDescription>Detailed breakdown by expense category</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={categorySummaryData} columns={columns} searchPlaceholder="Search categories..." />
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ExpenseReport;