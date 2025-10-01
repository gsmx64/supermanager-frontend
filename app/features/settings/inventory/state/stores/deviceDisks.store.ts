import { create } from "zustand";
import i18n from "i18next";

import toToast from "@/core/utils/toToast";
import { statusNumberToName } from "@/core/utils/statusNumberToName";
import DeviceDisksService from "@/features/settings/inventory/services/deviceDisks.service";
import { initialDeviceDisksStoreState } from "@/features/settings/inventory/state/interfaces/deviceDisks.store..interface";
import type { IUseDeviceDisksStore } from "@/features/settings/inventory/state/interfaces/deviceDisks.store..interface";
import type IDeviceDisk from "@/features/settings/inventory/interfaces/deviceDisks.interface";
import type { PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";


const useDeviceDisksStore = create<IUseDeviceDisksStore>((set, get) => ({
  ...initialDeviceDisksStoreState,
  fetchDeviceDisk: (id: number) => {
    try {
      set(() => ({ loading: true }));

      return DeviceDisksService.get(id)
      .then((response: ISingleResponse<IDeviceDisk>) => {
        set(() => ({ deviceDisk: response.data }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('settings.service-devicedisks-fetch-single-error', { id: id, message: error.message }),
          title: i18n.t('error.error'),
          color: "danger",
        });
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  },
  fetchDeviceDisks: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true }));

      return DeviceDisksService
      .getAll(currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<IDeviceDisk[]>) => {
        set(() => ({
          deviceDisks: data.results,
          count: data?.count
        }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('settings.service-devicedisks-fetch-all-error', { message: error.message }),
          title: i18n.t('error.error'),
          color: "danger",
        });
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
  handleDeprecated: (id: number, is_deprecated: boolean, title: string) => {
    try {
      const data = { title: title, is_deprecated: is_deprecated };
      set(() => ({ loading: true }));

      return DeviceDisksService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceDisk>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicedisks-deprecated-success', {
              deprecated: is_deprecated ? i18n.t('common.is-deprecated') : i18n.t('common.not-deprecated'),
              title: title
            }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicedisks-deprecated-error', { title: title, message: error.message }),
          title: i18n.t('error.error'),
          color: "danger",
        });
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  },
  handleStatus: (id: number, status: number, title: string) => {
    try {
      const data = { title: title, status: status };
      set(() => ({ loading: true }));

      return DeviceDisksService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceDisk>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicedisks-status-success', { status: statusNumberToName(status), title: title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicedisks-status-error', { title: title, message: error.message }),
          title: i18n.t('error.error'),
          color: "danger",
        });
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  },
  handleCreate: (model: IDeviceDisk) => {
    try {
      set(() => ({ loading: true }));
      if (!model.title) {
        toToast({
          description: i18n.t('settings.service-devicedisks-create-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DeviceDisksService
      .create(model)
      .then((response: ISingleResponse<IDeviceDisk>) => {
        if (response.status === 201) {
          toToast({
            description: i18n.t('settings.service-devicedisks-create-success', { title: model.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicedisks-create-error', { title: model.title, message: error.message }),
          title: i18n.t('error.error'),
          color: "danger",
        });
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  },
  handleEdit: (id: number, data: IDeviceDisk) => {
    try {
      set(() => ({ loading: true }));
      if(!data.title) {
        toToast({
          description: i18n.t('settings.service-devicedisks-edit-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DeviceDisksService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceDisk>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicedisks-edit-success', { title: data.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicedisks-edit-error', { title: data.title, message: error.message }),
          title: i18n.t('error.error'),
          color: "danger",
        });
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  },
  handleDelete: (id: number) => {
    try {
      set(() => ({ loading: true }));

      return DeviceDisksService
      .remove(id)
      .then((response: ISingleResponse<IDeviceDisk>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicedisks-delete-success'),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicedisks-delete-error', { message: error.message }),
          title: i18n.t('error.error'),
          color: "danger",
        });
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      console.log(error.toString());
    }
  }
}));

export default useDeviceDisksStore;