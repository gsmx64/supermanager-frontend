import { Spinner } from "@heroui/react";
import { useTranslation } from "react-i18next";

import SectionCardError from "@/core/components/ui/UnderDevelopment";
import type { Route } from ".react-router/types/app/features/reports/pages/ReportsDevice/+types";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('reports.title') },
    { name: 'description', content: t('reports.description') },
  ];
}


export function HydrateFallback() {
  return <Spinner className="w-6 h-6" />;
}


export default function ReportsDevice() {
  const { t } = useTranslation();

  return (
    <>
      <SectionCardError
        title={t('reports.title')}
        description={t('common.under-development')}
      />
    </>
  );
}