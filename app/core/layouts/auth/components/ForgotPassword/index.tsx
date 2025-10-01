import { useTranslation } from "react-i18next";

import { Spinner } from "@/core/components/ui/Spinner";
import ForgotPassword from "@/core/features/auth/pages/ForgotPassword";


export function meta() {
  const { t } = useTranslation();
  return [
    { title: t('auth.forgot-password-title') },
    { name: 'description', content: t('auth.forgot-password-description') },
  ];
}


export function HydrateFallback() {
  return <Spinner />;
}


export default function ForgotPasswordComponent() {
  return (
    <ForgotPassword />
  );
}
