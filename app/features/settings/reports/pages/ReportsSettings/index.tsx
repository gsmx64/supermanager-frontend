import { useContext } from "react";
import { useTranslation } from "react-i18next";

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import AccessDenied from "@/core/features/auth/components/AccessDenied";
import { Spinner } from "@/core/components/ui/Spinner";
import SectionCardError from "@/core/components/ui/UnderDevelopment";
import type { Route } from ".react-router/types/app/features/settings/reports/pages/ReportsSettings/+types";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('settings.settings-reports-title') },
    { name: 'description', content: t('settings.settings-reports-description') },
  ];
}


export function HydrateFallback() {
  return <Spinner />;
}


export default function ReportsSettings() {
  const { t } = useTranslation();
  const authData = useContext(AuthContext);
  const { isAdmin, isStaff } = authData;

  return (
    (isAdmin || isStaff) ?
    (
      <>
        <SectionCardError
          title={t('settings.settings-reports-title')}
          description={t('common.under-development')}
        />
      </>
    ) : (
      <AccessDenied />
    )
  );
}
