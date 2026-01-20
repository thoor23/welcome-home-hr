// Auth Context - Provides authentication state and permission checking throughout the app

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { User } from "@/data/users";
import { Role, getMockRoles } from "@/data/roles";
import { roleHasPermission } from "@/services/roleService";
import * as authService from "@/services/authService";

interface AuthContextType {
  // State
  currentUser: User | null;
  currentRole: Role | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  permissions: string[];
  
  // Actions
  setRole: (roleId: string) => void;
  switchUser: (userId: string) => void;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
  
  // Permission helpers
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  hasRole: (roleId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load auth state on mount
  useEffect(() => {
    const loadAuth = async () => {
      try {
        const authState = await authService.getAuthState();
        setCurrentUser(authState.user);
        setCurrentRole(authState.role);
      } catch (error) {
        console.error("Failed to load auth state:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAuth();
  }, []);

  // Refresh auth state
  const refreshAuth = useCallback(async () => {
    setIsLoading(true);
    try {
      const authState = await authService.getAuthState();
      setCurrentUser(authState.user);
      setCurrentRole(authState.role);
    } catch (error) {
      console.error("Failed to refresh auth state:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Switch role (for demo mode)
  const setRole = useCallback((roleId: string) => {
    authService.overrideRole(roleId);
    const roles = getMockRoles();
    const newRole = roles.find((r) => r.id === roleId);
    if (newRole) {
      setCurrentRole(newRole);
    }
  }, []);

  // Switch user
  const switchUser = useCallback((userId: string) => {
    authService.setCurrentUser(userId);
    refreshAuth();
  }, [refreshAuth]);

  // Logout
  const logout = useCallback(async () => {
    await authService.logout();
    setCurrentUser(null);
    setCurrentRole(null);
  }, []);

  // Permission checking
  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!currentRole) return false;
      return roleHasPermission(currentRole, permission);
    },
    [currentRole]
  );

  const hasAnyPermission = useCallback(
    (permissions: string[]): boolean => {
      return permissions.some((p) => hasPermission(p));
    },
    [hasPermission]
  );

  const hasAllPermissions = useCallback(
    (permissions: string[]): boolean => {
      return permissions.every((p) => hasPermission(p));
    },
    [hasPermission]
  );

  const hasRole = useCallback(
    (roleId: string): boolean => {
      return currentRole?.id === roleId;
    },
    [currentRole]
  );

  // Get current permissions list
  const permissions = currentRole?.permissions || [];

  const value: AuthContextType = {
    currentUser,
    currentRole,
    isLoading,
    isAuthenticated: !!currentUser,
    permissions,
    setRole,
    switchUser,
    logout,
    refreshAuth,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Higher-order component for permission-based rendering
interface RequirePermissionProps {
  permission: string | string[];
  children: ReactNode;
  fallback?: ReactNode;
  requireAll?: boolean;
}

export function RequirePermission({
  permission,
  children,
  fallback = null,
  requireAll = false,
}: RequirePermissionProps) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

  const hasAccess = Array.isArray(permission)
    ? requireAll
      ? hasAllPermissions(permission)
      : hasAnyPermission(permission)
    : hasPermission(permission);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
