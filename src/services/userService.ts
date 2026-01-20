// User Service - API-ready with mock data
// TODO: Replace mock implementations with actual API calls

import { User, getMockUsers, setMockUsers, getMockUserById } from "@/data/users";

export interface CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
  department?: string;
  designation?: string;
  phone?: string;
}

export interface UpdateUserInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  roleId?: string;
  status?: "active" | "inactive" | "pending";
  department?: string;
  designation?: string;
  phone?: string;
}

// Generate unique ID
const generateId = (): string => {
  return `usr_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;
};

// Generate employee ID
const generateEmployeeId = (): string => {
  const users = getMockUsers();
  const maxNum = users.reduce((max, u) => {
    const num = parseInt(u.employeeId?.replace("EMP", "") || "0");
    return num > max ? num : max;
  }, 0);
  return `EMP${String(maxNum + 1).padStart(3, "0")}`;
};

// Get all users
export const getUsers = async (): Promise<User[]> => {
  // TODO: Replace with API call
  // return await fetch('/api/users').then(res => res.json());
  
  await new Promise((resolve) => setTimeout(resolve, 100));
  return getMockUsers();
};

// Get user by ID
export const getUserById = async (id: string): Promise<User | undefined> => {
  // TODO: Replace with API call
  // return await fetch(`/api/users/${id}`).then(res => res.json());
  
  await new Promise((resolve) => setTimeout(resolve, 50));
  return getMockUserById(id);
};

// Get users by role
export const getUsersByRole = async (roleId: string): Promise<User[]> => {
  // TODO: Replace with API call
  
  await new Promise((resolve) => setTimeout(resolve, 100));
  const users = getMockUsers();
  return users.filter((u) => u.roleId === roleId);
};

// Create new user
export const createUser = async (input: CreateUserInput): Promise<User> => {
  // TODO: Replace with API call
  // return await fetch('/api/users', { 
  //   method: 'POST', 
  //   body: JSON.stringify(input) 
  // }).then(res => res.json());
  
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const users = getMockUsers();
  
  // Check if email already exists
  if (users.some((u) => u.email === input.email)) {
    throw new Error("User with this email already exists");
  }
  
  const newUser: User = {
    id: generateId(),
    email: input.email,
    firstName: input.firstName,
    lastName: input.lastName,
    roleId: input.roleId,
    status: "pending",
    department: input.department,
    designation: input.designation,
    phone: input.phone,
    employeeId: generateEmployeeId(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  
  setMockUsers([...users, newUser]);
  return newUser;
};

// Update user
export const updateUser = async (
  id: string,
  input: UpdateUserInput
): Promise<User> => {
  // TODO: Replace with API call
  // return await fetch(`/api/users/${id}`, { 
  //   method: 'PATCH', 
  //   body: JSON.stringify(input) 
  // }).then(res => res.json());
  
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const users = getMockUsers();
  const userIndex = users.findIndex((u) => u.id === id);
  
  if (userIndex === -1) {
    throw new Error("User not found");
  }
  
  // Check email uniqueness if updating email
  if (input.email && input.email !== users[userIndex].email) {
    if (users.some((u) => u.email === input.email)) {
      throw new Error("User with this email already exists");
    }
  }
  
  const updatedUser: User = {
    ...users[userIndex],
    ...input,
    updatedAt: new Date(),
  };
  
  users[userIndex] = updatedUser;
  setMockUsers(users);
  return updatedUser;
};

// Assign role to user
export const assignUserRole = async (
  userId: string,
  roleId: string
): Promise<User> => {
  return updateUser(userId, { roleId });
};

// Delete user
export const deleteUser = async (id: string): Promise<void> => {
  // TODO: Replace with API call
  // return await fetch(`/api/users/${id}`, { method: 'DELETE' });
  
  await new Promise((resolve) => setTimeout(resolve, 200));
  
  const users = getMockUsers();
  const user = users.find((u) => u.id === id);
  
  if (!user) {
    throw new Error("User not found");
  }
  
  setMockUsers(users.filter((u) => u.id !== id));
};

// Activate user
export const activateUser = async (id: string): Promise<User> => {
  return updateUser(id, { status: "active" });
};

// Deactivate user
export const deactivateUser = async (id: string): Promise<User> => {
  return updateUser(id, { status: "inactive" });
};
