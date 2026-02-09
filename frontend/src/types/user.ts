export type UserRole = "admin" | "super-admin";

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export interface PaginatedUserResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}
