'use client';

import { createContext } from "react";

import type { AuthContextType } from "@/core/features/auth/interfaces/auth.interface";


export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isAdmin: false,
  isStaff: false,
  userId: null,
  userData: null,
});
