import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  FileText,
  HardDrive,
  Upload,
  Users,
  Download,
  TrendingUp,
  FolderOpen,
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
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

const categoryData = [
  { name: "Payslips", count: 890, storage: 156 },
  { name: "Invoices", count: 234, storage: 89 },
  { name: "ID Proofs", count: 156, storage: 78 },
  { name: "Photos", count: 234, storage: 567 },
  { name: "Certificates", count: 89, storage: 34 },
  { name: "Contracts", count: 67, storage: 45 },
  { name: "Offer Letters", count: 45, storage: 12 },
];

const storageByCategory = [
  { name: "Photos", value: 567, color: "#8b5cf6" },
  { name: "Payslips", value: 156, color: "#3b82f6" },
  { name: "Invoices", value: 89, color: "#10b981" },
  { name: "ID Proofs", value: 78, color: "#f59e0b" },
  { name: "Contracts", value: 45, color: "#ef4444" },
  { name: "Others", value: 104, color: "#6b7280" },
];

const uploadTrends = [
  { month: "Jul", uploads: 120, downloads: 89 },
  { month: "Aug", uploads: 145, downloads: 112 },
  { month: "Sep", uploads: 167, downloads: 134 },
  { month: "Oct", uploads: 189, downloads: 156 },
  { month: "Nov", uploads: 210, downloads: 178 },
  { month: "Dec", uploads: 156, downloads: 145 },
  { month: "Jan", uploads: 234, downloads: 198 },
];

const moduleData = [
  { name: "Payroll", count: 890 },
  { name: "Employees", count: 450 },
  { name: "Billing", count: 234 },
  { name: "Recruitment", count: 89 },
  { name: "General", count: 58 },
];

const recentUploads = [
  { name: "Payslip_Jan_2026.pdf", category: "Payslips", size: "120 KB", uploadedBy: "System", date: "Jan 2, 2026" },
  { name: "Invoice_INV-2026-001.pdf", category: "Invoices", size: "380 KB", uploadedBy: "Finance", date: "Jan 2, 2026" },
  { name: "New_Hire_Photo.jpg", category: "Photos", size: "2.1 MB", uploadedBy: "HR Admin", date: "Jan 1, 2026" },
  { name: "Q4_Report.pdf", category: "Reports", size: "1.5 MB", uploadedBy: "Manager", date: "Jan 1, 2026" },
  { name: "Offer_Letter_JS.pdf", category: "Offer Letters", size: "245 KB", uploadedBy: "HR Admin", date: "Dec 31, 2025" },
];

const topUploaders = [
  { name: "System", count: 890, storage: "156 MB" },
  { name: "HR Admin", count: 234, storage: "89 MB" },
  { name: "Finance", count: 189, storage: "67 MB" },
  { name: "John Smith", count: 45, storage: "23 MB" },
  { name: "Sarah Johnson", count: 34, storage: "18 MB" },
];

const largeFiles = [
  { name: "Team_Photo_2025.jpg", size: "15.2 MB", category: "Photos", date: "Dec 15, 2025" },
  { name: "Annual_Report_2025.pdf", size: "12.8 MB", category: "Reports", date: "Dec 31, 2025" },
  { name: "Training_Video.mp4", size: "45.6 MB", category: "Training", date: "Nov 20, 2025" },
  { name: "Company_Presentation.pptx", size: "8.9 MB", category: "General", date: "Dec 10, 2025" },
];

export default function DocumentReport() {
  const [period, setPeriod] = useState("month");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-6">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Document Report</h1>
                <p className="text-muted-foreground">
                  Analytics and insights for document management
                </p>
              </div>
              <div className="flex gap-3">
                <Select value={period} onValueChange={setPeriod}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                    <SelectItem value="quarter">This Quarter</SelectItem>
                    <SelectItem value="year">This Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <StatsCard
                title="Total Documents"
                value="1,721"
                icon={FileText}
              />
              <StatsCard
                title="Storage Used"
                value="1.04 GB"
                icon={HardDrive}
              />
              <StatsCard
                title="Uploads This Month"
                value="234"
                icon={Upload}
              />
              <StatsCard
                title="Active Users"
                value="45"
                icon={Users}
              />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Documents by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FolderOpen className="h-5 w-5 text-primary" />
                    Documents by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="name" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Storage by Category */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardDrive className="h-5 w-5 text-primary" />
                    Storage by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={storageByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {storageByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value: number) => [`${value} MB`, "Storage"]}
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
            </div>

            {/* Upload/Download Trends */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Upload & Download Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={uploadTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="uploads"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="downloads"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: "#10b981" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Recent Uploads */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Uploads</CardTitle>
                  <CardDescription>Latest files added to the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>File</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentUploads.map((file, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-muted-foreground">{file.uploadedBy}</p>
                            </div>
                          </TableCell>
                          <TableCell>{file.size}</TableCell>
                          <TableCell>{file.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Top Uploaders */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Uploaders</CardTitle>
                  <CardDescription>Users with most uploads</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Files</TableHead>
                        <TableHead>Storage</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {topUploaders.map((user, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.count}</TableCell>
                          <TableCell>{user.storage}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Large Files */}
            <Card>
              <CardHeader>
                <CardTitle>Large Files ({">"}5 MB)</CardTitle>
                <CardDescription>Files consuming significant storage</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>File Name</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {largeFiles.map((file, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{file.name}</TableCell>
                        <TableCell className="text-orange-500 font-medium">{file.size}</TableCell>
                        <TableCell>{file.category}</TableCell>
                        <TableCell>{file.date}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
