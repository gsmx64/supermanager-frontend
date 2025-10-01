import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import XMarkIcon  from "@heroicons/react/24/solid/XMarkIcon";

import useNotificationsStore from "@/core/features/notifications/state/stores/notifications";
import AlertsItem from "@/core/features/notifications/components/AlertsItem";
import type INotification from "@/core/features/notifications/interfaces/notifications.interface";


const Alerts = () => {
  const { t } = useTranslation();

  const alerts = useNotificationsStore((state) => state.alerts);
  const alertMessage = useNotificationsStore((state) => state.alertMessage);
  const errorMessage = useNotificationsStore((state) => state.errorMessage);
  const openNotificationsPanel = useNotificationsStore((state) => state.openNotificationsPanel);
  const fetchAlerts = useNotificationsStore((state) => state.fetchAlerts);
  const setOpenNotificationsPanel = useNotificationsStore((state) => state.setOpenNotificationsPanel);
  const handleUpdateStatusNotification = useNotificationsStore((state) => state.handleUpdateStatusNotification);

  useEffect(() => {
    fetchAlerts();
  }, []);


  const closePanel = (e: any) => {
      e.preventDefault();
      setOpenNotificationsPanel(false);
  }
  
  if(alertMessage) {
    /*toToast({
      description: alertMessage,
      title: t('error.success'),
      color: "success",
    });*/
  }
  if(errorMessage) {
    /*toToast({
      description: typeof errorMessage === "string" ? errorMessage : String(errorMessage),
      title: t('error.error'),
      color: "danger",
    });*/
  }

  return (
    <div
      className={
        "fixed overflow-hidden z-20 bg-opacity-25 inset-0 transform ease-in-out bg-white dark:bg-gray-900" +
        (openNotificationsPanel
          ? " transition-opacity opacity-100 duration-500 translate-x-0"
          : " transition-all delay-500 opacity-0 translate-x-full")
      }
    >
      <div
        className={
          "w-80 md:w-96 right-0 absolute bg-white dark:bg-gray-900 h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform" +
          (openNotificationsPanel ? " translate-x-0" : " translate-x-full")
        }
      >
        <div className="relative pb-5 flex flex-col h-full">
          <div className="flex items-center pl-4 pr-4 h-16 shadow-md bg-white dark:bg-gray-900">
            <button
              className="flex items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={(e) => closePanel(e)}
              aria-label="Close"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <span className="ml-2 font-bold text-xl">{t('notifications.title')}</span>
          </div>
          <div className="overflow-y-scroll pl-4 pr-4 flex-1">
            <div className="flex flex-col w-full">
              <div className="flex flex-col w-full gap-y-6">
                {
                  ((alerts != undefined) && (alerts.length > 0)) ? (
                    alerts.map((item: INotification) => (
                      <AlertsItem
                        key={item.id}
                        item={item}
                        handleUpdateStatusNotification={handleUpdateStatusNotification}
                      />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-500 dark: text-gray-300">
                        {t('notifications.no-notifications')}
                      </span>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*<div
        className="w-screen h-full cursor-pointer"
        onClick={(e) => closePanel(e)}
      >
        Test
      </div>*/}
    </div>  
  );
};

export default Alerts;