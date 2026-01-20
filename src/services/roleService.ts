// Role Service - API-ready with mock data
// TODO: Replace mock implementations with actual API calls

import { Role, getMockRoles, setMockRoles } from "@/data/roles";

export interface CreateRoleInput {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateRoleInput {
  name?: string;
  description?: string;
  permissions?: string[];
}

// Generate unique ID
const generateId = (): string => {
  return `role_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get all roles
export const getRoles = async (): Promise<Role[]> => {
  // TODO: Replace with API call
  // return await fetch('/api/roles').then(res => res.json());
  
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 100));
  return getMockRoles();
};

// Get role by ID
export const getRoleById = async (id: string): Promise<Role | undefined> => {
  // TODO: Replace with API call
  // return await fetch(`/api/roles/${id}`).then(res => res.json());
  
  await new Promise((resolve) => setTimeout(resolve, 50));
  const roles = getMockRoles();
  return roles.find((r) => r.id === id);
};

// Create new role
export const createRole = async (input: CreateRoleInput): Promise<Role> => {
  // TODO: Replace with API call
  // return await fetch('/api/roles', { 
  //   method: 'POST', 
  //   body: JSON.stringify(input) 
  // }).then(res => res.json());
  
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const roles = getMockRoles();
  const newRole: Role = {
    id: generateId(),
    name: input.name,
    description: input.description,
    permissions: input.permissions,
    isDefault: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  setMockRoles([...roles, newRole]);
  return newRole;
};

// Update role
export const updateRole = async (
  id: string,
  input: UpdateRoleInput
): Promise<Role> => {
  // TODO: Replace with API call
  // return await fetch(`/api/roles/${id}`, { 
  //   method: 'PATCH', 
  //   body: JSON.stringify(input) 
  // }).then(res => res.json());
  
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const roles = getMockRoles();
  const roleIndex = roles.findIndex((r) => r.id === id);
  
  if (roleIndex === -1) {
    throw new Error("Role not found");
  }
  
  const updatedRole: Role = {
    ...roles[roleIndex],
    ...input,
    updatedAt: new Date(),
  };
  
  roles[roleIndex] = updatedRole;
  setMockRoles(roles);
  return updatedRole;
};

// Update role permissions
export const updateRolePermissions = async (
  id: string,
  permissions: string[]
): Promise<Role> => {
  return updateRole(id, { permissions });
};

// Delete role
export const deleteRole = async (id: string): Promise<void> => {
  // TODO: Replace with API call
  // return await fetch(`/api/roles/${id}`, { method: 'DELETE' });
  
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const roles = getMockRoles();
  const role = roles.find((r) => r.id === id);
  
  if (!role) {
    throw new Error("Role not found");
  }
  
  if (role.isDefault) {
    throw new Error("Cannot delete default roles");
  }
  
  setMockRoles(roles.filter((r) => r.id !== id));
};

// Check if role has permission
export const roleHasPermission = (role: Role, permission: string): boolean => {
  // Wildcard check - admin has all permissions
  if (role.permissions.includes("*")) {
    return true;
  }
  
  // Direct permission check
  if (role.permissions.includes(permission)) {
    return true;
  }
  
  // Category wildcard check (e.g., "employees.*" matches "employees.view")
  const category = permission.split(".")[0];
  if (role.permissions.includes(`${category}.*`)) {
    return true;
  }
  
  return false;
};
