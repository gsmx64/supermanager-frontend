import React from "react";

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import useAuthStore from "@/core/features/auth/state/store/auth.store";


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const isStaff = useAuthStore((state) => state.isStaff);
  const userId = useAuthStore((state) => state.userData.id);
  const userData = useAuthStore((state) => state.userData);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAdmin,
        isStaff,
        userId,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
