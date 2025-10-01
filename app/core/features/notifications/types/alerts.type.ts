import type INotification from "@/core/features/notifications/interfaces/notifications.interface";


export type AlertsType = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

export type AlertsItemProps = {
  item: INotification;
  handleUpdateStatusNotification: (
    id: number,
    status: number,
    title: string
  ) => void;
};
