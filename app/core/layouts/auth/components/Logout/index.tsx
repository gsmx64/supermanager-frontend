import { useTranslation } from "react-i18next";

import { Spinner } from "@/core/components/ui/Spinner";
import Logout from "@/core/features/auth/pages/Logout";


export function meta() {
  const { t } = useTranslation();
  return [
    { title: t('auth.logout') },
    { name: 'description', content: t('auth.logout-description') },
  ];
}


export function HydrateFallback() {
  return <Spinner />;
}


export default function LogoutComponent() {
  return (
    <Logout />
  );
}
