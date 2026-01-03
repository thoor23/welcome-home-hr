import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Users, Check } from "lucide-react";

const plans = [
  { 
    id: 1, 
    name: "Starter", 
    price: 29, 
    billing: "monthly",
    activeOrgs: 45,
    features: ["Up to 10 employees", "Basic HR features", "Email support", "5GB storage"]
  },
  { 
    id: 2, 
    name: "Pro", 
    price: 79, 
    billing: "monthly",
    activeOrgs: 98,
    popular: true,
    features: ["Up to 100 employees", "Advanced HR features", "Priority support", "25GB storage", "API access"]
  },
  { 
    id: 3, 
    name: "Enterprise", 
    price: 199, 
    billing: "monthly",
    activeOrgs: 43,
    features: ["Unlimited employees", "All features", "24/7 support", "Unlimited storage", "Custom integrations", "SSO"]
  },
];

export default function Plans() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Subscription Plans</h1>
            <p className="text-muted-foreground">Manage pricing plans and features</p>
          </div>
          <Button className="bg-superadmin hover:bg-superadmin/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Plan
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className={`bg-card border-border relative ${plan.popular ? "ring-2 ring-superadmin" : ""}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-superadmin">Most Popular</Badge>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">${plan.price}</span>
                  <span className="text-muted-foreground">/{plan.billing}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{plan.activeOrgs} active organizations</span>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SuperAdminLayout>
  );
}
