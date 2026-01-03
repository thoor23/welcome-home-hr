import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Download, Eye, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const invoices = [
  { id: "INV-001", org: "TechCorp Inc.", amount: 199, status: "paid", date: "2024-06-01", dueDate: "2024-06-15" },
  { id: "INV-002", org: "StartupXYZ", amount: 79, status: "pending", date: "2024-06-15", dueDate: "2024-06-30" },
  { id: "INV-003", org: "MegaCorp Ltd.", amount: 199, status: "paid", date: "2024-06-01", dueDate: "2024-06-15" },
  { id: "INV-004", org: "SmallBiz Co.", amount: 29, status: "overdue", date: "2024-05-15", dueDate: "2024-05-30" },
  { id: "INV-005", org: "Innovation Labs", amount: 79, status: "paid", date: "2024-06-20", dueDate: "2024-07-05" },
];

export default function Invoices() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Invoices</h1>
          <p className="text-muted-foreground">View and manage all platform invoices</p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search invoices..." className="pl-10" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-superadmin/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-superadmin" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{invoice.id}</p>
                      <p className="text-sm text-muted-foreground">{invoice.org}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-medium text-foreground">${invoice.amount}</p>
                      <p className="text-xs text-muted-foreground">Due: {invoice.dueDate}</p>
                    </div>
                    <Badge className={`${
                      invoice.status === "paid" ? "bg-green-500/10 text-green-500" :
                      invoice.status === "pending" ? "bg-yellow-500/10 text-yellow-500" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {invoice.status}
                    </Badge>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
