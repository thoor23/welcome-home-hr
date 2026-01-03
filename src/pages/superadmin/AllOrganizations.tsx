import { SuperAdminLayout } from "@/components/layout/SuperAdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreHorizontal, Building2, Users, Eye, Ban, Edit } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const organizations = [
  { id: 1, name: "TechCorp Inc.", email: "admin@techcorp.com", plan: "Enterprise", status: "active", users: 450, created: "2024-01-15" },
  { id: 2, name: "StartupXYZ", email: "hello@startupxyz.io", plan: "Pro", status: "pending", users: 25, created: "2024-06-20" },
  { id: 3, name: "MegaCorp Ltd.", email: "contact@megacorp.com", plan: "Enterprise", status: "active", users: 1200, created: "2023-11-08" },
  { id: 4, name: "SmallBiz Co.", email: "info@smallbiz.co", plan: "Starter", status: "active", users: 8, created: "2024-05-10" },
  { id: 5, name: "Innovation Labs", email: "team@innovationlabs.dev", plan: "Pro", status: "trial", users: 45, created: "2024-06-25" },
  { id: 6, name: "GlobalTech Solutions", email: "admin@globaltech.com", plan: "Enterprise", status: "suspended", users: 890, created: "2023-08-12" },
];

export default function AllOrganizations() {
  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">All Organizations</h1>
            <p className="text-muted-foreground">Manage all registered organizations</p>
          </div>
          <Button className="bg-superadmin hover:bg-superadmin/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Organization
          </Button>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search organizations..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="trial">Trial</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Plans</SelectItem>
                    <SelectItem value="starter">Starter</SelectItem>
                    <SelectItem value="pro">Pro</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {organizations.map((org) => (
                <div key={org.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-superadmin/10 text-superadmin font-semibold">
                        {org.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{org.name}</p>
                      <p className="text-sm text-muted-foreground">{org.email}</p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">{org.users}</p>
                      <p className="text-xs text-muted-foreground">Users</p>
                    </div>
                    <div className="text-center">
                      <Badge variant="outline" className="border-superadmin/30 text-superadmin">
                        {org.plan}
                      </Badge>
                    </div>
                    <div className="text-center">
                      <Badge className={`${
                        org.status === "active" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" :
                        org.status === "pending" ? "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20" :
                        org.status === "trial" ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20" :
                        "bg-destructive/10 text-destructive hover:bg-destructive/20"
                      }`}>
                        {org.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem><Eye className="h-4 w-4 mr-2" /> View Details</DropdownMenuItem>
                      <DropdownMenuItem><Edit className="h-4 w-4 mr-2" /> Edit</DropdownMenuItem>
                      <DropdownMenuItem><Users className="h-4 w-4 mr-2" /> Impersonate Admin</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive"><Ban className="h-4 w-4 mr-2" /> Suspend</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
}
