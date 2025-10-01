import { Suspense } from "react";
import { Outlet } from "react-router";

import LanguageSwitcher from "@/core/components/buttons/LanguageSwitcher";
import { ThemeSwitcher } from "@/core/components/buttons/ThemeSwitcher";
import { Spinner } from "@/core/components/ui/Spinner";


export function AuthLayout() {
  return (
    <main className="flex flex-col h-screen bg-brand-100 dark:bg-gray-800">
      <div className="fixed top-4 right-4 z-10">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </main>
  );
};
