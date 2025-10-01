import type IUser from "@/core/features/users/interfaces/user.interface";

export interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  userId: number | null;
  userData: IUser | null;
}

export interface IToken {
  access: string | null;
  refresh: string | null;
  user: IUser;
  exp: number | null;
}
