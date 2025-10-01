import { Suspense } from "react";
import { Outlet } from "react-router";

import { Spinner } from "@/core/components/ui/Spinner";
import { Header } from "@/core/layouts/default/components/Header";
import { Left } from "@/core/layouts/default/components/Left";
import { Right } from "@/core/layouts/default/components/Right";


export function DashboardLayout(){
  return(
    <div className="flex flex-col h-screen bg-white dark:bg-gray-800">
      <Header />
      <div className="flex flex-1 overflow-hidden ">
        <Left />
        <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6 bg-gray-100 dark:bg-gray-800 ">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
          <div className="h-16"></div>
        </main>
        <Right />
      </div>
    </div>
  )
}