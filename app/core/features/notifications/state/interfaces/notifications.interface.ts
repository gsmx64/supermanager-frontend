import { initINotification } from "@/core/features/notifications/interfaces/notifications.interface";

import type Error from "@/core/features/notifications/interfaces/error.interface";
import type INotification from "@/core/features/notifications/interfaces/notifications.interface";
import {
  CORE_DEFAULT_PAGE_INDEX,
  CORE_DEFAULT_PAGE_SIZE,
  CORE_DEFAULT_ORDERING_COLUMN
} from "@/core/consts/consts";


export interface IUseNotificationsStore {
  alerts: INotification[];
  notification: INotification;
  notifications: INotification[];
  actives: number;
  count: number;
  next: string | null;
  previous: string | null;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  alertMessage: string | null;
  errorMessage: Error | null | unknown;
  openNotificationsPanel: boolean;
  fetchNotification: (notificationId: number) => void;
  fetchNotifications: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  fetchAlerts: () => void;
  setCurrentPage: (page: number) => void;
  setOpenNotificationsPanel: (open: boolean) => void;
  handleUpdateStatusNotification: (id: number, status: number, title: string) => void;
  handleDeleteNotification: (id: number) => void;
}

export const initialNotificationsStoreState = {
  alerts: [],
  notification: initINotification,
  notifications: [],
  actives: 0,
  count: 0,
  next: null,
  previous: null,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: CORE_DEFAULT_ORDERING_COLUMN,
  loading: false,
  alertMessage: '',
  errorMessage: '',
  openNotificationsPanel: false,
  setCurrentPage: () => {},
  setOpenNotificationsPanel: () => {},
  handleUpdateStatusNotification: () => {},
  handleDeleteNotification: () => {}
}