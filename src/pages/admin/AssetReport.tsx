import { AdminLayout } from "@/components/layout/AdminLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "@/components/ui/data-table";
import { Package, TrendingDown, Wrench, IndianRupee } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

const categoryData = [
  { name: "Laptops", value: 45, color: "hsl(var(--chart-1))" },
  { name: "Desktops", value: 30, color: "hsl(var(--chart-2))" },
  { name: "Monitors", value: 60, color: "hsl(var(--chart-3))" },
  { name: "Phones", value: 85, color: "hsl(var(--chart-4))" },
  { name: "Furniture", value: 200, color: "hsl(var(--chart-5))" },
  { name: "Vehicles", value: 10, color: "hsl(var(--primary))" },
];

const locationData = [
  { location: "Mumbai HQ", assets: 180 },
  { location: "Delhi Branch", assets: 95 },
  { location: "Bangalore Branch", assets: 120 },
  { location: "Chennai Store", assets: 45 },
  { location: "Pune Warehouse", assets: 60 },
];

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
  const totalPurchaseValue = categorySummary.reduce((acc, c) => acc + c.purchaseValue, 0);
  const totalCurrentValue = categorySummary.reduce((acc, c) => acc + c.currentValue, 0);
  const totalDepreciation = categorySummary.reduce((acc, c) => acc + c.depreciation, 0);

  return (
    <AdminLayout>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Asset Report</h1>
              <p className="text-muted-foreground">Analytics and insights for your asset portfolio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Total Assets"
                value={String(totalAssets)}
                icon={Package}
              />
              <StatsCard
                title="Total Value"
                value={`₹${(totalCurrentValue / 10000000).toFixed(1)}Cr`}
                icon={IndianRupee}
              />
              <StatsCard
                title="Depreciation"
                value={`₹${(totalDepreciation / 10000000).toFixed(2)}Cr`}
                icon={TrendingDown}
              />
              <StatsCard
                title="Maintenance Costs"
                value="₹4.2L"
                icon={Wrench}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assets by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assets by Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={locationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="location" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="assets" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Asset Acquisition & Retirement Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={acquisitionTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="acquired" stroke="hsl(var(--chart-1))" strokeWidth={2} name="Acquired" />
                    <Line type="monotone" dataKey="retired" stroke="hsl(var(--chart-4))" strokeWidth={2} name="Retired" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category-wise Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable data={categorySummary} columns={columns} searchPlaceholder="Search categories..." />
              </CardContent>
      </Card>
    </AdminLayout>
  );
}