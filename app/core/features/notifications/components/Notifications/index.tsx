import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "@heroui/react";

import useNotificationsStore from "@/core/features/notifications/state/stores/notifications";
import toToast from "@/core/utils/toToast";
import SectionTitle from "@/core/components/ui/SectionTitle";
import NotificationsItem from "@/core/features/notifications/components/NotificationsItem";
import NotificationsList from "@/core/features/notifications/components/NotificationsList";
import type INotification from "@/core/features/notifications/interfaces/notifications.interface";


const Notifications = () => {
  const { t } = useTranslation();
  const [isListMode, setIsListMode] = useState(true);

  const notifications = useNotificationsStore((state) => state.notifications);
  const actives = useNotificationsStore((state) => state.actives);
  const count = useNotificationsStore((state) => state.count);
  const currentPage = useNotificationsStore((state) => state.currentPage);
  const itemsPerPage = useNotificationsStore((state) => state.itemsPerPage);
  const itemsOrdering = useNotificationsStore((state) => state.itemsOrdering);
  const alertMessage = useNotificationsStore((state) => state.alertMessage);
  const errorMessage = useNotificationsStore((state) => state.errorMessage);
  const fetchNotifications = useNotificationsStore((state) => state.fetchNotifications);
  const handleUpdateStatusNotification = useNotificationsStore((state) => state.handleUpdateStatusNotification);
  const handleDeleteNotification = useNotificationsStore((state) => state.handleDeleteNotification);

  useEffect(() => {
    fetchNotifications(currentPage, itemsPerPage, itemsOrdering);
  }, [handleUpdateStatusNotification, handleDeleteNotification]);

  if (alertMessage) {
    toToast({
      description: alertMessage,
      title: t('error.success'),
      color: "success",
    });
  }
  if (errorMessage) {
    toToast({
      description: typeof errorMessage === "string" ? errorMessage : String(errorMessage),
      title: t('error.error'),
      color: "danger",
    });
  }

  return (
    (notifications != undefined && notifications.length > 0) ?
    (
      <div className="notifications-container">
        <div className="notifications-container-inner">
          <div>
            <SectionTitle
              title={t('notifications.title')}
              description={t('notifications.description', { count: actives })}
            />
            <div className="mb-2" style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", gap: "0.5rem" }}>
              <div>{isListMode ? t('common.table') : t('common.cards')}</div>
              <Switch
                defaultSelected
                isSelected={isListMode}
                onValueChange={setIsListMode}
                size="md"
                aria-label="Switch between list and card view"
              />
              {count && (
                <span className="notifications-container-counter">
                  {t('common.total', { count: count })}
                </span>
              )}
            </div>
          </div>
          {isListMode ? (
            <div className="notifications-container-items" >
              <NotificationsList
                items={notifications}
                handleUpdateStatusNotification={handleUpdateStatusNotification}
                handleDeleteNotification={handleDeleteNotification}
              />
            </div>
          ) : (
            <div className="notifications-container-items">
              {
                notifications.map((item: INotification, idx: number) => (
                  <NotificationsItem
                    key={idx}
                    item={item}
                    containerStyle={{ minWidth: "18rem", maxWidth: "24rem" }}
                    handleUpdateStatusNotification={handleUpdateStatusNotification}
                    handleDeleteNotification={handleDeleteNotification}
                  />
                ))
              }
            </div>
          )}
        </div>
      </div>
    ) : (
      <div className="notifications-container">
        <div className="notifications-container-inner">
          <div>
            <SectionTitle
              title={t('notifications.title')}
            />
            <span className="text-gray-500 dark:text-gray-300">
              {t('notifications.no-notifications')}
            </span>
          </div>
        </div>
      </div>
    )
  );
};

export default Notifications;