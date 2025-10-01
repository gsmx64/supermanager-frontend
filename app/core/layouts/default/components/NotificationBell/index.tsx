import { useEffect } from "react";
import { Badge, Button } from "@heroui/react";
import BellIcon  from "@heroicons/react/24/outline/BellIcon";

import useNotificationsStore from "@/core/features/notifications/state/stores/notifications";


export const NotificationBell = () => {
  const alerts = useNotificationsStore((state) => state.alerts);
  const actives = useNotificationsStore((state) => state.actives);
  const fetchAlerts = useNotificationsStore((state) => state.fetchAlerts);
  const setOpenNotificationsPanel = useNotificationsStore((state) => state.setOpenNotificationsPanel);

  const openNotificationPanel = () => {
    setOpenNotificationsPanel(true);
  }

  useEffect(() => {
    fetchAlerts();
  }, []);

  return (
    <Button variant="light" isIconOnly onPress={() => openNotificationPanel()}>
      <div className="relative">
        {
          ((alerts != undefined) && (alerts.length > 0)) ? (
            <Badge color="danger" content={alerts.length} shape="circle">
              <BellIcon className="h-6 w-6" />
            </Badge>
          ) : (
            <BellIcon className="h-6 w-6" />
          )
        }
      </div>
    </Button>
  )
};