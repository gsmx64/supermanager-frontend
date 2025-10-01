import { create } from "zustand";
import type { AxiosResponse } from "axios";

import NotificationsService from "@/core/features/notifications/services/notifications.service";
import { initialNotificationsStoreState } from "@/core/features/notifications/state/interfaces/notifications.interface";
import type { IUseNotificationsStore } from "@/core/features/notifications/state/interfaces/notifications.interface";
import type { INotificationResponse } from "@/core/features/notifications/interfaces/notifications.interface";
import type INotification from "@/core/features/notifications/interfaces/notifications.interface";
import type { PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";


const useNotificationsStore = create<IUseNotificationsStore>((set, get) => ({
  ...initialNotificationsStoreState,
  setOpenNotificationsPanel: (open: boolean) => set(() => ({ openNotificationsPanel: open })),
  fetchNotification: (notificationId: number) => {
    try {
      set(() => ({ loading: true, errorMessage: '' }));

      return NotificationsService.get(notificationId)
      .then((response: ISingleResponse<INotification>) => {
        set(() => ({ notification: response.data }));
      })
      .catch((error: Error | null | any) => {
        set(() => ({ errorMessage: `Error getting notification: "${notificationId}". Error: ${error.message}` }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  },
  fetchNotifications: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true, errorMessage: '' }));

      return NotificationsService
      .getAll(currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<INotification[]>) => {
        set(() => ({
          notifications: data.results,
          count: data?.count,
          next: data?.next,
          previous: data?.previous,
          loading: false
        }));
      })
      .catch((error: Error | null | any) => {
        set(() => ({ errorMessage: `Error getting notifications. Error: ${error.message}` }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  },
  fetchAlerts: () => {
    try {
      set(() => ({ loading: true, errorMessage: '' }));

      return NotificationsService
      .getAlerts()
      .then((data: PaginatedResponse<INotification[]>) => {
        set(() => ({
          alerts: data?.results,
          actives: data?.count,
          loading: false
        }));
      })
      .catch((error: Error | null | any) => {
        set(() => ({ errorMessage: `Error getting alerts. Error: ${error.message}` }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  },
  setCurrentPage: (page: number) => {
    set(() => ({ currentPage: page }));
  },
  handleUpdateStatusNotification: (id: number, status: number, title: string) => {
    try {
      const data = { title: title, status: status };
      set(() => ({ loading: true, alertMessage: null, errorMessage: '' }));

      return NotificationsService
      .update(id, data)
      .then((response: ISingleResponse<INotification>) => {
        if (response.status === 200) {
          set(() => ({ alertMessage: `Status changed successfully to "${status}" for notification: "${title}".` }));
          get().fetchAlerts();
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: `Error changing status to notification: "${title}". Error: ${error.message}` }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  },
  handleDeleteNotification: (id: number) => {
    try {
      set(() => ({ loading: true, alertMessage: null, errorMessage: '' }));

      return NotificationsService
      .remove(id)
      .then((response: ISingleResponse<INotification>) => {
        if (response.status === 200) {
          set(() => ({ alertMessage: `Deleted notification successfully.` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: `Error deleting notification. Error: ${error.message}` }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  }
}));

export default useNotificationsStore;