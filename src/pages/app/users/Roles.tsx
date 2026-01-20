import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Pencil, Trash2, ShieldCheck, Users, ChevronRight, Check } from "lucide-react";
import { Role } from "@/data/roles";
import { getRoles, createRole, updateRole, deleteRole, CreateRoleInput } from "@/services/roleService";
import { getUsersByRole } from "@/services/userService";
import { PERMISSION_CATEGORIES, Permission } from "@/data/permissions";
import { useAuth, RequirePermission } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Roles() {
  const { hasPermission } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleCounts, setRoleCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<CreateRoleInput>({
    name: "",
    description: "",
    permissions: [],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const rolesData = await getRoles();
      setRoles(rolesData);
      
      // Get user counts for each role
      const counts: Record<string, number> = {};
      for (const role of rolesData) {
        const users = await getUsersByRole(role.id);
        counts[role.id] = users.length;
      }
      setRoleCounts(counts);
    } catch (error) {
      toast.error("Failed to load roles");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRole = async () => {
    if (!formData.name.trim()) {
      toast.error("Role name is required");
      return;
    }
    try {
      await createRole(formData);
      toast.success("Role created successfully");
      setIsAddDialogOpen(false);
      resetForm();
      loadData();
    } catch (error: any) {
      toast.error(error.message || "Failed to create role");
    }
  };

  const handleEditRole = async () => {
    if (!selectedRole) return;
    if (!formData.name.trim()) {
      toast.error("Role name is required");
      return;
    }
    try {
      await updateRole(selectedRole.id, formData);
      toast.success("Role updated successfully");
      setIsEditDialogOpen(false);
      resetForm();
      loadData();
    } catch (error: any) {
      toast.error(error.message || "Failed to update role");
    }
  };

  const handleDeleteRole = async () => {
    if (!selectedRole) return;
    try {
      await deleteRole(selectedRole.id);
      toast.success("Role deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedRole(null);
      loadData();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete role");
    }
  };

  const openEditDialog = (role: Role) => {
    setSelectedRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions],
    });
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      permissions: [],
    });
    setSelectedRole(null);
  };

  const togglePermission = (permissionKey: string) => {
    setFormData((prev) => {
      const hasPermission = prev.permissions.includes(permissionKey);
      return {
        ...prev,
        permissions: hasPermission
          ? prev.permissions.filter((p) => p !== permissionKey)
          : [...prev.permissions, permissionKey],
      };
    });
  };

  const toggleCategoryPermissions = (categoryKey: string) => {
    const category = PERMISSION_CATEGORIES.find((c) => c.key === categoryKey);
    if (!category) return;
    
    const categoryPermissions = category.permissions.map((p) => p.key);
    const allSelected = categoryPermissions.every((p) => formData.permissions.includes(p));
    
    setFormData((prev) => {
      if (allSelected) {
        return {
          ...prev,
          permissions: prev.permissions.filter((p) => !categoryPermissions.includes(p)),
        };
      } else {
        const newPermissions = new Set([...prev.permissions, ...categoryPermissions]);
        return {
          ...prev,
          permissions: Array.from(newPermissions),
        };
      }
    });
  };

  const isCategoryFullySelected = (categoryKey: string) => {
    const category = PERMISSION_CATEGORIES.find((c) => c.key === categoryKey);
    if (!category) return false;
    return category.permissions.every((p) => formData.permissions.includes(p.key));
  };

  const isCategoryPartiallySelected = (categoryKey: string) => {
    const category = PERMISSION_CATEGORIES.find((c) => c.key === categoryKey);
    if (!category) return false;
    const selected = category.permissions.filter((p) => formData.permissions.includes(p.key));
    return selected.length > 0 && selected.length < category.permissions.length;
  };

  const getPermissionCount = (role: Role) => {
    if (role.permissions.includes("*")) return "All";
    return role.permissions.length;
  };

  const PermissionSelector = () => (
    <ScrollArea className="h-[400px] pr-4">
      <div className="space-y-4">
        {PERMISSION_CATEGORIES.map((category) => (
          <div key={category.key} className="space-y-2">
            <div
              className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-muted"
              onClick={() => toggleCategoryPermissions(category.key)}
            >
              <Checkbox
                checked={isCategoryFullySelected(category.key)}
                className={isCategoryPartiallySelected(category.key) ? "data-[state=checked]:bg-primary/50" : ""}
              />
              <span className="font-medium text-sm">{category.label}</span>
              <Badge variant="secondary" className="ml-auto text-xs">
                {category.permissions.filter((p) => formData.permissions.includes(p.key)).length}/{category.permissions.length}
              </Badge>
            </div>
            <div className="ml-6 space-y-1">
              {category.permissions.map((permission) => (
                <div
                  key={permission.key}
                  className="flex items-center gap-2 cursor-pointer p-1.5 rounded hover:bg-muted/50"
                  onClick={() => togglePermission(permission.key)}
                >
                  <Checkbox checked={formData.permissions.includes(permission.key)} />
                  <div className="flex-1">
                    <span className="text-sm">{permission.label}</span>
                    <p className="text-xs text-muted-foreground">{permission.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Roles</h1>
            <p className="text-muted-foreground">Manage roles and their permissions</p>
          </div>
          <RequirePermission permission="roles.create">
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Role
            </Button>
          </RequirePermission>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <Card className="col-span-full">
              <CardContent className="flex items-center justify-center py-8">
                Loading...
              </CardContent>
            </Card>
          ) : (
            roles.map((role) => (
              <Card key={role.id} className="relative overflow-hidden">
                {role.isDefault && (
                  <div className="absolute top-0 right-0">
                    <Badge className="rounded-none rounded-bl-lg">System</Badge>
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{role.name}</CardTitle>
                      <CardDescription className="mt-1">{role.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{roleCounts[role.id] || 0} users</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <Check className="h-4 w-4" />
                        <span>{getPermissionCount(role)} permissions</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 pt-4 border-t">
                    {hasPermission("roles.edit") && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => openEditDialog(role)}
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1.5" />
                        Edit
                      </Button>
                    )}
                    {hasPermission("roles.delete") && !role.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRole(role);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Add Role Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>Define a new role with specific permissions</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Role Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., HR Manager"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Selected Permissions</Label>
                  <div className="h-9 flex items-center">
                    <Badge variant="secondary">{formData.permissions.length} selected</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this role"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="border rounded-lg p-4">
                  <PermissionSelector />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddRole}>Create Role</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Role Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Role</DialogTitle>
              <DialogDescription>Update role details and permissions</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Role Name</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={selectedRole?.isDefault}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Selected Permissions</Label>
                  <div className="h-9 flex items-center">
                    <Badge variant="secondary">
                      {formData.permissions.includes("*") ? "All" : formData.permissions.length} selected
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                {formData.permissions.includes("*") ? (
                  <div className="border rounded-lg p-4 bg-muted/50">
                    <p className="text-sm text-muted-foreground text-center">
                      This role has full access (all permissions)
                    </p>
                  </div>
                ) : (
                  <div className="border rounded-lg p-4">
                    <PermissionSelector />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditRole}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Role</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete the "{selectedRole?.name}" role? 
                {roleCounts[selectedRole?.id || ""] > 0 && (
                  <span className="text-destructive">
                    {" "}This will affect {roleCounts[selectedRole?.id || ""]} users.
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteRole}>
                Delete Role
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
}
