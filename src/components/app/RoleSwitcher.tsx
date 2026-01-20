import { useState, useEffect } from "react";
import { ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { getRoles } from "@/services/roleService";
import { Role } from "@/data/roles";

export function RoleSwitcher() {
  const { currentRole, setRole } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        const loadedRoles = await getRoles();
        setRoles(loadedRoles);
      } catch (error) {
        console.error("Failed to load roles:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadRoles();
  }, []);

  const handleRoleChange = (roleId: string) => {
    setRole(roleId);
  };

  if (isLoading) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 h-8">
          <ShieldCheck className="h-4 w-4 text-primary" />
          <span className="hidden sm:inline text-xs font-medium">
            {currentRole?.name || "Select Role"}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="flex items-center gap-2">
          <span>Switch Role</span>
          <Badge variant="secondary" className="text-[10px]">Demo Mode</Badge>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            onClick={() => handleRoleChange(role.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex flex-col">
              <span className={currentRole?.id === role.id ? "font-medium text-primary" : ""}>
                {role.name}
              </span>
              <span className="text-xs text-muted-foreground">{role.description}</span>
            </div>
            {currentRole?.id === role.id && (
              <Badge variant="default" className="text-[10px]">Active</Badge>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5">
          <p className="text-[10px] text-muted-foreground">
            Role switching is for demo purposes. In production, roles are assigned by admins.
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
