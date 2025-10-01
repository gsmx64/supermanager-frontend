
import { useTranslation } from "react-i18next";

import SectionCardError from "@/core/components/ui/UnderDevelopment";
import { Spinner } from "@/core/components/ui/Spinner";
import type { Route } from ".react-router/types/app/features/stocks/+types/index";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('stocks.title') },
    { name: 'description', content: t('stocks.description') },
  ];
}


export function HydrateFallback() {
  return <Spinner />;
}


export default function Stocks() {
  const { t } = useTranslation();

  return (
    <>
      <SectionCardError
        title={t('stocks.title')}
        description={t('common.under-development')}
      />
    </>
  );
}