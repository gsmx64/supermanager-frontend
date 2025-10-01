import { useMemo } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Alert, Button, cn } from "@heroui/react";

import type { AlertsItemProps, AlertsType } from "@/core/features/notifications/types/alerts.type";


const AlertsItem = ({ item, handleUpdateStatusNotification }: AlertsItemProps) => {
  const { t } = useTranslation();
  const notificationVariant = "faded";

  const allowedTypes: AlertsType[] = ["default", "primary", "secondary", "success", "warning", "danger"];
  const notificationType: AlertsType =
    allowedTypes.includes(item.type as AlertsType)
      ? (item.type as AlertsType)
      : "default";
  const navigate = useNavigate();

  function redirectTo(url: string, id: number) {
    navigate(`/${url}${id}`);
  }

  function setmarkAsRead(id: number) {
    handleUpdateStatusNotification(item.id, 0, item.title);
  }

  const colorClass = useMemo(() => {
    switch (notificationType) {
      case "default":
        return "before:bg-default-300";
      case "primary":
        return "before:bg-primary";
      case "secondary":
        return "before:bg-secondary";
      case "success":
        return "before:bg-success";
      case "warning":
        return "before:bg-warning";
      case "danger":
        return "before:bg-danger";
      default:
        return "before:bg-default-200";
    }
  }, []);

  return (
    <>
      <Alert
        classNames={{
          base: cn(
            [
              "bg-default-50 dark:bg-background shadow-sm",
              "border-1 border-default-200 dark:border-default-100",
              "relative before:content-[''] before:absolute before:z-10",
              "before:left-0 before:top-[-1px] before:bottom-[-1px] before:w-1",
              "rounded-l-none border-l-0",
              colorClass,
            ],
          ),
        }}
        color={notificationType}
        title={item.title}
        variant={notificationVariant}
      >
        <div className="flex items-center gap-1 mt-3">
          <span className="font-medium">{item.description}</span>
        </div>
        <div className="flex items-center gap-1 mt-3">
          <Button
            className="bg-background text-default-700 font-medium border-1 shadow-small"
            size="sm"
            variant="bordered"
            onPress={() => redirectTo(item.module, item.module_id)}
          >
            {t("notifications.view-now")}
          </Button>
          <Button
            className="text-default-500 font-medium underline underline-offset-4"
            size="sm"
            variant="light"
            onPress={() => setmarkAsRead(item.id)}
          >
            {t("notifications.mark-as-read")}
          </Button>
          </div>
      </Alert>
    </>
  );
};

export default AlertsItem;