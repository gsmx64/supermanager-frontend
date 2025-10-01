import { useTranslation } from "react-i18next";

import { Spinner } from "@/core/components/ui/Spinner";
import Login from "@/core/features/auth/pages/Login";


export function meta() {
  const { t } = useTranslation();
  return [
    { title: t('auth.login-title') },
    { name: 'description', content: t('auth.login-description') },
  ];
}


export function HydrateFallback() {
  return <Spinner />;
}


export default function LoginComponent() {
  return (
    <Login />
  );
}
