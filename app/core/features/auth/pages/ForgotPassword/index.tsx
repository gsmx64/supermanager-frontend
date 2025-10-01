import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import useAuthStore from "@/core/features/auth/state/store/auth.store";
import AuthBranding from "@/core/components/branding/AuthBranding";
import ForgotPasswordForm from "@/core/features/auth/forms/ForgotPasswordForm";
import CheckCircleIcon from "@heroicons/react/24/solid/CheckCircleIcon";


const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleForgotPassword = useAuthStore((state) => state.handleForgotPassword);
  const forgotEmailLinkSent = useAuthStore((state) => state.forgotEmailLinkSent);
  const setForgotEmailLinkSent = useAuthStore((state) => state.setForgotEmailLinkSent);

  useEffect(() => {
    if (!forgotEmailLinkSent) return;
    setForgotEmailLinkSent(false);
    const timer = setTimeout(() => {
      navigate("/auth/login", { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const redirectToLogin = () => {
    setForgotEmailLinkSent(false);
    navigate("/auth/login", { replace: true });
  }

  return (
    <div className="min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-5xl shadow-xl rounded-xl bg-brand-200 dark:bg-gray-900">
        <div className="grid md:grid-cols-2 grid-cols-1 rounded-xl">
          <div className="">
            <AuthBranding />
          </div>
          <div className="text-center vertical-align: middle py-24 px-10">
            {(forgotEmailLinkSent) ? (
              <div className="text-center vertical-align: middle py-24 px-10">
                <CheckCircleIcon className="mx-auto mb-4 h-16 w-16 text-green-500 dark:text-green-400" />
                <h2 className="text-2xl font-semibold mb-2">
                  {t('auth.forgot-password-sent-successfully')}
                </h2>
              </div>
            ) : (
              <ForgotPasswordForm
                handleForgotPassword={handleForgotPassword}
              />
            )}
            <div className="text-center mt-4">
              <span
                onClick={() => redirectToLogin()}
                className="inline-block hover:text-blue-700 hover:underline cursor-pointer transition duration-200"
              >
                {t('auth.login-title')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
