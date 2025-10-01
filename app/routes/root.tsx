import { useTranslation } from "react-i18next";

import Dashboard from "@/features/dashboard/pages/Dashboard";
import type { Route } from ".react-router/types/app/features/dashboard/pages/Dashboard/+types";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation('dashboard');

  return [
    { title: t('title') },
    { name: t('meta_name'), content: t('meta_content') },
  ];
}

export default function Component() {
  return (
    <>
      <Dashboard />
    </>
  );
}