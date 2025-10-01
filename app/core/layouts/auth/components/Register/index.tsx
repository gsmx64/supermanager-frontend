import { useTranslation } from "react-i18next";

import { Spinner } from "@/core/components/ui/Spinner";
import Register from "@/core/features/auth/pages/Register";


export function meta() {
  const { t } = useTranslation();
  return [
    { title: t('auth.register-title') },
    { name: 'description', content: t('auth.register-description') },
  ];
}


export function HydrateFallback() {
  return <Spinner />;
}


export default function RegisterComponent() {
  return (
    <Register />
  );
}
