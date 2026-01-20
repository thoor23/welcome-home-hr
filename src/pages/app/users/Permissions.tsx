import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Save, RotateCcw, ShieldCheck, Lock, Info } from "lucide-react";
import { Role } from "@/data/roles";
import { getRoles, updateRolePermissions } from "@/services/roleService";
import { PERMISSION_CATEGORIES } from "@/data/permissions";
import { useAuth, RequirePermission } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Permissions() {
  const { hasPermission } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalPermissions, setOriginalPermissions] = useState<Record<string, string[]>>({});
  const [currentPermissions, setCurrentPermissions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const rolesData = await getRoles();
      setRoles(rolesData);
      
      // Initialize permissions state
      const perms: Record<string, string[]> = {};
      rolesData.forEach((role) => {
        perms[role.id] = [...role.permissions];
      });
      setOriginalPermissions(perms);
      setCurrentPermissions(perms);
      setHasChanges(false);
    } catch (error) {
      toast.error("Failed to load permissions");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePermission = (roleId: string, permissionKey: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (!role || role.permissions.includes("*")) return; // Can't modify admin
    
    setCurrentPermissions((prev) => {
      const rolePerms = prev[roleId] || [];
      const hasPermission = rolePerms.includes(permissionKey);
      const newPerms = hasPermission
        ? rolePerms.filter((p) => p !== permissionKey)
        : [...rolePerms, permissionKey];
      
      const updated = { ...prev, [roleId]: newPerms };
      
      // Check if there are changes
      const changed = Object.keys(updated).some((rId) => {
        const orig = originalPermissions[rId] || [];
        const curr = updated[rId] || [];
        return JSON.stringify(orig.sort()) !== JSON.stringify(curr.sort());
      });
      setHasChanges(changed);
      
      return updated;
    });
  };

  const hasRolePermission = (roleId: string, permissionKey: string): boolean => {
    const role = roles.find((r) => r.id === roleId);
    if (!role) return false;
    if (role.permissions.includes("*")) return true;
    return currentPermissions[roleId]?.includes(permissionKey) || false;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Find changed roles and update them
      for (const roleId of Object.keys(currentPermissions)) {
        const orig = originalPermissions[roleId] || [];
        const curr = currentPermissions[roleId] || [];
        if (JSON.stringify(orig.sort()) !== JSON.stringify(curr.sort())) {
          await updateRolePermissions(roleId, curr);
        }
      }
      toast.success("Permissions saved successfully");
      setOriginalPermissions({ ...currentPermissions });
      setHasChanges(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save permissions");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setCurrentPermissions({ ...originalPermissions });
    setHasChanges(false);
  };

  const editableRoles = roles.filter((r) => !r.permissions.includes("*"));

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Permission Matrix</h1>
            <p className="text-muted-foreground">Configure permissions for each role</p>
          </div>
          <RequirePermission permission="roles.edit">
            <div className="flex items-center gap-2">
              {hasChanges && (
                <Button variant="outline" onClick={handleReset} disabled={isSaving}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
              )}
              <Button onClick={handleSave} disabled={!hasChanges || isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </RequirePermission>
        </div>

        {hasChanges && (
          <div className="bg-warning/10 border border-warning/30 rounded-lg p-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-warning" />
            <span className="text-sm text-warning">
              You have unsaved changes. Click "Save Changes" to apply them.
            </span>
          </div>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>Permissions by Role</CardTitle>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Check/uncheck boxes to grant or revoke permissions. Administrator role has full access and cannot be modified.
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <CardDescription>
              Configure which permissions each role has access to
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                Loading...
              </div>
            ) : (
              <ScrollArea className="w-full">
                <div className="min-w-[800px]">
                  {/* Header with role names */}
                  <div className="sticky top-0 z-10 bg-card border-b flex">
                    <div className="w-64 shrink-0 p-4 font-medium border-r bg-muted/30">
                      Permission
                    </div>
                    {roles.map((role) => (
                      <div
                        key={role.id}
                        className="flex-1 min-w-[120px] p-4 text-center border-r last:border-r-0 bg-muted/30"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">{role.name}</span>
                        </div>
                        {role.permissions.includes("*") && (
                          <Badge variant="secondary" className="mt-1 text-[10px]">
                            <Lock className="h-2.5 w-2.5 mr-1" />
                            Full Access
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Permission rows by category */}
                  <Accordion type="multiple" defaultValue={PERMISSION_CATEGORIES.map((c) => c.key)}>
                    {PERMISSION_CATEGORIES.map((category) => (
                      <AccordionItem key={category.key} value={category.key} className="border-b">
                        <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/30">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{category.label}</span>
                            <Badge variant="outline" className="text-xs">
                              {category.permissions.length}
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pb-0">
                          {category.permissions.map((permission) => (
                            <div
                              key={permission.key}
                              className="flex border-t hover:bg-muted/20 transition-colors"
                            >
                              <div className="w-64 shrink-0 p-3 border-r">
                                <p className="text-sm font-medium">{permission.label}</p>
                                <p className="text-xs text-muted-foreground">{permission.description}</p>
                              </div>
                              {roles.map((role) => (
                                <div
                                  key={`${role.id}-${permission.key}`}
                                  className="flex-1 min-w-[120px] p-3 flex items-center justify-center border-r last:border-r-0"
                                >
                                  {role.permissions.includes("*") ? (
                                    <Checkbox checked disabled className="opacity-50" />
                                  ) : hasPermission("roles.edit") ? (
                                    <Checkbox
                                      checked={hasRolePermission(role.id, permission.key)}
                                      onCheckedChange={() => togglePermission(role.id, permission.key)}
                                    />
                                  ) : (
                                    <Checkbox
                                      checked={hasRolePermission(role.id, permission.key)}
                                      disabled
                                      className="opacity-50"
                                    />
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <Card>
          <CardContent className="py-4">
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Checkbox checked disabled className="opacity-100" />
                <span className="text-muted-foreground">Permission granted</span>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox disabled className="opacity-50" />
                <span className="text-muted-foreground">Permission not granted</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Administrator - cannot be modified</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
