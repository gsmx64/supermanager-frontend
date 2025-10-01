import { useTranslation } from "react-i18next";

import SectionCardError from "@/core/components/ui/UnderDevelopment";
import { Spinner } from "@/core/components/ui/Spinner";
import type { Route } from "./+types/index";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('reports.title') },
    { name: 'description', content: t('reports.description') },
  ];
}


export function HydrateFallback() {
  return <Spinner />;
}


export default function Reports() {
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