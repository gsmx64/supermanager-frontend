import { useContext } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import { Spinner } from "@/core/components/ui/Spinner";
import SectionTitle from "@/core/components/ui/SectionTitle";
import type { Route } from ".react-router/types/app/features/settings/pages/Settings/+types";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('settings.title') },
    { name: 'description', content: t('settings.description') },
  ];
}

export function HydrateFallback() {
  return <Spinner />;
}

export default function Settings() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const authData = useContext(AuthContext);
  const { isAdmin, isStaff } = authData;

  const settings = [
    {
      title: t('settings.settings-user-title'),
      description: t('settings.settings-user-description'),
      onClick: () => redirectTo('user'),
    },
  ];

  const settingsAdmin = [
    {
      title: t('settings.settings-app-title'),
      description: t('settings.settings-app-description'),
      onClick: () => redirectTo('app'),
    },
    {
      title: t('settings.settings-users-title'),
      description: t('settings.settings-users-description'),
      onClick: () => redirectTo('users'),
    },
  ];

  const settingsStaff = [
    {
      title: t('settings.settings-inventory-title'),
      description: t('settings.settings-inventory-description'),
      onClick: () => redirectTo('inventory'),
    },
    {
      title: t('settings.settings-deploys-title'),
      description: t('settings.settings-deploys-description'),
      onClick: () => redirectTo('deploys'),
    },
    {
      title: t('settings.settings-reports-title'),
      description: t('settings.settings-reports-description'),
      onClick: () => redirectTo('reports'),
    },
    {
      title: t('settings.settings-stocks-title'),
      description: t('settings.settings-stocks-description'),
      onClick: () => redirectTo('stocks'),
    }
  ];

  if (isAdmin) {
    settings.push(...settingsAdmin);
  }

  if (isStaff) {
    settings.push(...settingsStaff);
  }


  function redirectTo(url: string) {
    navigate(url, { replace: true });
  }

  return (
    <>
      <SectionTitle
      title={t('settings.title')}
      description={t('settings.description')}
      />
      {settings.map((setting, idx) => (
        <div
          key={idx}
          className="rounded-xl shadow-lg p-6 mt-6 transition hover:shadow-2xl border cursor-pointer bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-600"
          onClick={setting.onClick}
        >
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            {setting.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {setting.description}
          </p>
        </div>
      ))}
    </>
  );
}