import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import AuthBranding from "@/core/components/branding/AuthBranding";
import LoginForm from "@/core/features/auth/forms/LoginForm";
import useAuthStore from "@/core/features/auth/state/store/auth.store";


const Login = () => {
  const { t } = useTranslation();
  const handleLogin = useAuthStore((state) => state.handleLogin);

  return (
    <div className="min-h-screen flex items-center">
      <div className="mx-auto w-full max-w-5xl shadow-xl rounded-xl bg-brand-200 dark:bg-gray-900">
        <div className="grid md:grid-cols-2 grid-cols-1 rounded-xl">
          <div className="">
            <AuthBranding />
          </div>
          <div className="py-24 px-10">
            <h2 className="text-2xl font-semibold mb-2 items-center text-center">
              {t('auth.login-title')}
            </h2>
            <LoginForm
              handleLogin={handleLogin}
            />
            <div className="text-center mt-4">
              {t('auth.dont-have-account')}{" "}
              <Link to="../auth/register">
                <span className="inline-block hover:text-blue-700 hover:underline cursor-pointer transition duration-200">
                  {t('auth.register-title')}
                </span>
              </Link>
            </div>
            <div className="text-center text-blue-600 dark:text-blue-400">
                <Link to="../auth/forgot-password">
                  <span className="text-sm inline-block text-blue-600 dark:text-blue-400 hover:text-blue-700 hover:underline cursor-pointer transition duration-200">
                    {t('auth.forgot-password-title')}
                  </span>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
