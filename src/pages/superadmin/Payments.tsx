import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const stats = [
  { title: "Total Revenue", value: "$48,250", change: "+15.3%", icon: TrendingUp },
  { title: "Successful Payments", value: "186", change: "+8%", icon: CheckCircle },
  { title: "Failed Payments", value: "3", change: "-2", icon: AlertTriangle },
];

const recentPayments = [
  { id: 1, org: "TechCorp Inc.", amount: 199, method: "Visa •••• 4242", status: "success", date: "2024-06-28 14:30" },
  { id: 2, org: "StartupXYZ", amount: 79, method: "Mastercard •••• 5555", status: "failed", date: "2024-06-28 12:15" },
  { id: 3, org: "MegaCorp Ltd.", amount: 199, method: "Visa •••• 1234", status: "success", date: "2024-06-27 16:45" },
  { id: 4, org: "SmallBiz Co.", amount: 29, method: "PayPal", status: "success", date: "2024-06-27 10:20" },
  { id: 5, org: "Innovation Labs", amount: 79, method: "Visa •••• 9876", status: "success", date: "2024-06-26 09:30" },
];

export default function Payments() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments</h1>
          <p className="text-muted-foreground">Monitor payment transactions and revenue</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-sm text-green-500 mt-1">{stat.change}</p>
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-superadmin/10 flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-superadmin" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentPayments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div className="flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                      payment.status === "success" ? "bg-green-500/10" : "bg-destructive/10"
                    }`}>
                      <CreditCard className={`h-5 w-5 ${payment.status === "success" ? "text-green-500" : "text-destructive"}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{payment.org}</p>
                      <p className="text-sm text-muted-foreground">{payment.method}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-medium text-foreground">${payment.amount}</p>
                      <p className="text-xs text-muted-foreground">{payment.date}</p>
                    </div>
                    <Badge className={payment.status === "success" ? "bg-green-500/10 text-green-500" : "bg-destructive/10 text-destructive"}>
                      {payment.status}
                    </Badge>
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
