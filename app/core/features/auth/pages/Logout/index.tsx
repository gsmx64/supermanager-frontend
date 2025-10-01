import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import useAuthStore from "@/core/features/auth/state/store/auth.store";


const Logout = () => {
  const { t } = useTranslation();
  const handleLogout = useAuthStore((state) => state.handleLogout);
  const navigate = useNavigate();

  useEffect(() => {
    handleLogout();
    const timer = setTimeout(() => {
      navigate("/auth/login", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-200 dark:bg-gray-900">
      <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
        {t('auth.logout-signing-out')}
      </div>
    </div>
  );
}

export default Logout;