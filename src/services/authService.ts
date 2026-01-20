// Auth Service - API-ready with mock data
// TODO: Replace mock implementations with actual API calls

import { User, getMockUsers } from "@/data/users";
import { Role, getMockRoles } from "@/data/roles";
import { roleHasPermission } from "./roleService";

const STORAGE_KEY = "nexhr_current_user";
const ROLE_OVERRIDE_KEY = "nexhr_role_override";

export interface AuthState {
  user: User | null;
  role: Role | null;
  isAuthenticated: boolean;
}

// Get current user from storage (for demo purposes)
export const getCurrentUser = async (): Promise<User | null> => {
  // TODO: Replace with actual auth check
  // return await fetch('/api/auth/me').then(res => res.json());
  
  await new Promise((resolve) => setTimeout(resolve, 50));
  
  // Check for stored user ID
  const storedUserId = localStorage.getItem(STORAGE_KEY);
  
  if (storedUserId) {
    const users = getMockUsers();
    return users.find((u) => u.id === storedUserId) || null;
  }
  
  // Default to admin for demo
  const users = getMockUsers();
  return users.find((u) => u.roleId === "admin") || users[0] || null;
};

// Get current user's role
export const getCurrentRole = async (): Promise<Role | null> => {
  // Check for role override (for demo switching)
  const overrideRoleId = localStorage.getItem(ROLE_OVERRIDE_KEY);
  
  if (overrideRoleId) {
    const roles = getMockRoles();
    return roles.find((r) => r.id === overrideRoleId) || null;
  }
  
  const user = await getCurrentUser();
  
  if (!user) {
    return null;
  }
  
  const roles = getMockRoles();
  return roles.find((r) => r.id === user.roleId) || null;
};

// Set current user (for demo purposes)
export const setCurrentUser = (userId: string): void => {
  localStorage.setItem(STORAGE_KEY, userId);
  // Clear role override when switching users
  localStorage.removeItem(ROLE_OVERRIDE_KEY);
};

// Override role (for demo switching without changing user)
export const overrideRole = (roleId: string): void => {
  localStorage.setItem(ROLE_OVERRIDE_KEY, roleId);
};

// Clear role override
export const clearRoleOverride = (): void => {
  localStorage.removeItem(ROLE_OVERRIDE_KEY);
};

// Check if current user has a permission
export const hasPermission = async (permission: string): Promise<boolean> => {
  const role = await getCurrentRole();
  
  if (!role) {
    return false;
  }
  
  return roleHasPermission(role, permission);
};

// Check if current user has any of the permissions
export const hasAnyPermission = async (permissions: string[]): Promise<boolean> => {
  for (const permission of permissions) {
    if (await hasPermission(permission)) {
      return true;
    }
  }
  return false;
};

// Check if current user has all of the permissions
export const hasAllPermissions = async (permissions: string[]): Promise<boolean> => {
  for (const permission of permissions) {
    if (!(await hasPermission(permission))) {
      return false;
    }
  }
  return true;
};

// Login (mock)
export const login = async (email: string, _password: string): Promise<User> => {
  // TODO: Replace with actual login
  // return await fetch('/api/auth/login', { 
  //   method: 'POST', 
  //   body: JSON.stringify({ email, password }) 
  // }).then(res => res.json());
  
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  const users = getMockUsers();
  const user = users.find((u) => u.email === email);
  
  if (!user) {
    throw new Error("Invalid email or password");
  }
  
  if (user.status !== "active") {
    throw new Error("Account is not active");
  }
  
  setCurrentUser(user.id);
  return user;
};

// Logout
export const logout = async (): Promise<void> => {
  // TODO: Replace with actual logout
  // return await fetch('/api/auth/logout', { method: 'POST' });
  
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ROLE_OVERRIDE_KEY);
};

// Get auth state
export const getAuthState = async (): Promise<AuthState> => {
  const user = await getCurrentUser();
  const role = await getCurrentRole();
  
  return {
    user,
    role,
    isAuthenticated: !!user,
  };
};
