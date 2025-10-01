import { Spinner } from "@heroui/react";
import { useTranslation } from "react-i18next";

import SectionCardError from "@/core/components/ui/UnderDevelopment";
import type { Route } from ".react-router/types/app/features/deploys/pages/DeploysDevice/+types";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('deploys.title') },
    { name: 'description', content: t('deploys.description') },
  ];
}


export function HydrateFallback() {
  return <Spinner className="w-6 h-6" />;
}


export default function DeploysDevice() {
  const { t } = useTranslation();

  return (
    <>
      <SectionCardError
        title={t('deploys.title')}
        description={t('common.under-development')}
      />
    </>
  );
}