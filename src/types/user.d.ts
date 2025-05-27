// src/types/user.d.ts
export type Role = 'USER' | 'ADMIN';

export interface AuthUser {
  id: number;
  role: Role;
}
