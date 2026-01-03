import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Tag, Copy, Trash2, Edit } from "lucide-react";

const coupons = [
  { id: 1, code: "WELCOME20", discount: "20%", type: "percentage", usageLimit: 100, used: 45, expiresAt: "2024-12-31", status: "active" },
  { id: 2, code: "ENTERPRISE50", discount: "$50", type: "fixed", usageLimit: 50, used: 12, expiresAt: "2024-09-30", status: "active" },
  { id: 3, code: "SUMMER2024", discount: "30%", type: "percentage", usageLimit: 200, used: 200, expiresAt: "2024-08-31", status: "exhausted" },
  { id: 4, code: "STARTUP10", discount: "10%", type: "percentage", usageLimit: null, used: 89, expiresAt: null, status: "active" },
];

export default function Coupons() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Coupons</h1>
            <p className="text-muted-foreground">Manage discount codes and promotions</p>
          </div>
          <Button className="bg-superadmin hover:bg-superadmin/90">
            <Plus className="h-4 w-4 mr-2" />
            Create Coupon
          </Button>
        </div>

        <div className="grid gap-4">
          {coupons.map((coupon) => (
            <Card key={coupon.id} className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-superadmin/10 flex items-center justify-center">
                      <Tag className="h-6 w-6 text-superadmin" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-bold text-lg text-foreground bg-muted px-2 py-0.5 rounded">
                          {coupon.code}
                        </code>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {coupon.discount} off • Used {coupon.used}{coupon.usageLimit ? `/${coupon.usageLimit}` : ""} times
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <Badge className={`${
                        coupon.status === "active" ? "bg-green-500/10 text-green-500" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {coupon.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {coupon.expiresAt ? `Expires: ${coupon.expiresAt}` : "No expiration"}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SuperAdminLayout>
  );
}
