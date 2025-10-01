import type INotification from "@/core/features/notifications/interfaces/notifications.interface";


export type NotificationsType = "default" | "primary" | "secondary" | "success" | "warning" | "danger";

export type NotificationsItemProps = {
  item: INotification;
  containerStyle?: React.CSSProperties;
  handleUpdateStatusNotification: (
    id: number,
    status: number,
    title: string
  ) => void;
  handleDeleteNotification: (id: number) => void;
};

export type NotificationsListProps = {
  items: INotification[];
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  handleUpdateStatusNotification: (
    id: number,
    status: number,
    title: string
  ) => void;
  handleDeleteNotification: (id: number) => void;
};
