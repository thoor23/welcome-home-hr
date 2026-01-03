import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "@/components/ui/data-table";
import { Package, TrendingDown, Wrench, IndianRupee } from "lucide-react";
import { Pie, PieChart, Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const categoryData = [
  { category: "laptops", value: 45, fill: "hsl(var(--chart-1))" },
  { category: "desktops", value: 30, fill: "hsl(var(--chart-2))" },
  { category: "monitors", value: 60, fill: "hsl(var(--chart-3))" },
  { category: "phones", value: 85, fill: "hsl(var(--chart-4))" },
  { category: "furniture", value: 200, fill: "hsl(var(--chart-5))" },
  { category: "vehicles", value: 10, fill: "hsl(var(--primary))" },
];

const categoryConfig = {
  value: { label: "Assets" },
  laptops: { label: "Laptops", color: "hsl(var(--chart-1))" },
  desktops: { label: "Desktops", color: "hsl(var(--chart-2))" },
  monitors: { label: "Monitors", color: "hsl(var(--chart-3))" },
  phones: { label: "Phones", color: "hsl(var(--chart-4))" },
  furniture: { label: "Furniture", color: "hsl(var(--chart-5))" },
  vehicles: { label: "Vehicles", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

const locationData = [
  { location: "Mumbai HQ", assets: 180 },
  { location: "Delhi Branch", assets: 95 },
  { location: "Bangalore Branch", assets: 120 },
  { location: "Chennai Store", assets: 45 },
  { location: "Pune Warehouse", assets: 60 },
];

const locationConfig = {
  assets: { label: "Assets", color: "hsl(var(--primary))" },
} satisfies ChartConfig;

const acquisitionTrend = [
  { month: "Jan", acquired: 12, retired: 3 },
  { month: "Feb", acquired: 8, retired: 2 },
  { month: "Mar", acquired: 15, retired: 5 },
  { month: "Apr", acquired: 6, retired: 1 },
  { month: "May", acquired: 20, retired: 4 },
  { month: "Jun", acquired: 10, retired: 2 },
  { month: "Jul", acquired: 14, retired: 6 },
  { month: "Aug", acquired: 9, retired: 3 },
  { month: "Sep", acquired: 18, retired: 2 },
  { month: "Oct", acquired: 11, retired: 4 },
  { month: "Nov", acquired: 16, retired: 3 },
  { month: "Dec", acquired: 22, retired: 5 },
];

const trendConfig = {
  acquired: { label: "Acquired", color: "hsl(var(--chart-1))" },
  retired: { label: "Retired", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

interface CategorySummary {
  id: string;
  category: string;
  totalAssets: number;
  purchaseValue: number;
  currentValue: number;
  depreciation: number;
  assigned: number;
  available: number;
}

const categorySummary: CategorySummary[] = [
  { id: "1", category: "Laptops", totalAssets: 45, purchaseValue: 6750000, currentValue: 5400000, depreciation: 1350000, assigned: 42, available: 3 },
  { id: "2", category: "Desktops", totalAssets: 30, purchaseValue: 2400000, currentValue: 1920000, depreciation: 480000, assigned: 28, available: 2 },
  { id: "3", category: "Monitors", totalAssets: 60, purchaseValue: 2400000, currentValue: 2040000, depreciation: 360000, assigned: 58, available: 2 },
  { id: "4", category: "Mobile Phones", totalAssets: 85, purchaseValue: 8500000, currentValue: 5950000, depreciation: 2550000, assigned: 80, available: 5 },
  { id: "5", category: "Furniture", totalAssets: 200, purchaseValue: 10000000, currentValue: 9000000, depreciation: 1000000, assigned: 195, available: 5 },
  { id: "6", category: "Vehicles", totalAssets: 10, purchaseValue: 15000000, currentValue: 12000000, depreciation: 3000000, assigned: 10, available: 0 },
];

const columns: Column<CategorySummary>[] = [
  { key: "category", header: "Category", sortable: true },
  { key: "totalAssets", header: "Total Assets", sortable: true },
  {
    key: "purchaseValue",
    header: "Purchase Value",
    sortable: true,
    render: (row) => `₹${(row.purchaseValue / 100000).toFixed(1)}L`,
  },
  {
    key: "currentValue",
    header: "Current Value",
    sortable: true,
    render: (row) => `₹${(row.currentValue / 100000).toFixed(1)}L`,
  },
  {
    key: "depreciation",
    header: "Depreciation",
    render: (row) => (
      <span className="text-destructive">-₹{(row.depreciation / 100000).toFixed(1)}L</span>
    ),
  },
  { key: "assigned", header: "Assigned" },
  { key: "available", header: "Available" },
];

export default function AssetReport() {
  const totalAssets = categoryData.reduce((acc, c) => acc + c.value, 0);
  const totalCurrentValue = categorySummary.reduce((acc, c) => acc + c.currentValue, 0);
  const totalDepreciation = categorySummary.reduce((acc, c) => acc + c.depreciation, 0);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground font-display">Asset Report</h1>
        <p className="text-muted-foreground mt-1">Analytics and insights for your asset portfolio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Total Assets" value={String(totalAssets)} icon={Package} />
        <StatsCard title="Total Value" value={`₹${(totalCurrentValue / 10000000).toFixed(1)}Cr`} icon={IndianRupee} />
        <StatsCard title="Depreciation" value={`₹${(totalDepreciation / 10000000).toFixed(2)}Cr`} icon={TrendingDown} />
        <StatsCard title="Maintenance Costs" value="₹4.2L" icon={Wrench} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Assets by Category</CardTitle>
            <CardDescription>Distribution across asset types</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={categoryConfig} className="mx-auto aspect-square max-h-[300px]">
              <PieChart>
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Pie data={categoryData} dataKey="value" nameKey="category" outerRadius={100} strokeWidth={5} />
                <ChartLegend content={<ChartLegendContent nameKey="category" />} className="-translate-y-2 flex-wrap gap-2" />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assets by Location</CardTitle>
            <CardDescription>Distribution across office locations</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={locationConfig} className="h-[300px] w-full">
              <BarChart accessibilityLayer data={locationData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="location" tickLine={false} tickMargin={10} axisLine={false} tick={{ fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="assets" fill="var(--color-assets)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Asset Acquisition & Retirement Trend</CardTitle>
          <CardDescription>Monthly asset lifecycle activity</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={trendConfig} className="h-[300px] w-full">
            <LineChart accessibilityLayer data={acquisitionTrend}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line type="monotone" dataKey="acquired" stroke="var(--color-acquired)" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="retired" stroke="var(--color-retired)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category-wise Summary</CardTitle>
          <CardDescription>Detailed asset information by category</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={categorySummary} columns={columns} searchPlaceholder="Search categories..." />
        </CardContent>
      </Card>
    </AdminLayout>
  );
}