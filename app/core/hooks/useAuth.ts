import { useContext } from "react";
import type { AuthContextType } from "@/core/features/auth/interfaces/auth.interface";
import { AuthContext } from "@/core/features/auth/contexts/auth.context";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
