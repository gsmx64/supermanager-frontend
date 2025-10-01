import { Spinner } from "@heroui/react";
import { useTranslation } from "react-i18next";

import SectionCardError from "@/core/components/ui/UnderDevelopment";
import type { Route } from ".react-router/types/app/core/features/settings/pages/UserSettings/+types";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('settings.settings-user-title') },
    { name: 'description', content: t('settings.settings-user-description') },
  ];
}


export function HydrateFallback() {
  return <Spinner className="w-6 h-6" />;
}


export default function DeploysSettings() {
  const { t } = useTranslation();

  return (
    <>
      <SectionCardError
        title={t('settings.settings-user-title')}
        description={t('common.under-development')}
      />
    </>
  );
}