import { Link } from "react-router";
import { useTranslation } from "react-i18next";

import FaceFrownIcon  from "@heroicons/react/24/solid/FaceFrownIcon";
import { Spinner } from "@/core/components/ui/Spinner";
import type { Route } from ".react-router/types/app/core/layouts/default/components/NotFound/+types";


export function meta() {
  const { t } = useTranslation();
  return [
    { title: t('error.404-title') },
    { name: 'description', content: t('error.404-description') },
  ];
}


export function HydrateFallback() {
  return <Spinner />;
}


export async function loader() {
  //throw new Response("Page not found", { status: 404 });
}


export function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="not-found-container">
      <div className="flex items-center justify-center min-h-[80vh] bg-brand-100 dark:bg-gray-800">
        <div className="text-center text-gray-700 dark:text-gray-100">
          <div className="max-w-md mx-auto">
            <FaceFrownIcon className="h-48 w-48 inline-block text-blue-500 dark:text-blue-600" />
            <h1 className="text-5xl font-bold mt-4">{t('error.404-title')}</h1>
            <p>{t('error.404-description')}</p>
            <div className="not-found-actions">
              <Link to="/" className="home-link">
                {t('error.404-action')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}