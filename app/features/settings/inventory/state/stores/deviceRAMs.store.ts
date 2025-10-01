import { create } from "zustand";
import i18n from "i18next";

import toToast from "@/core/utils/toToast";
import { statusNumberToName } from "@/core/utils/statusNumberToName";
import DeviceRAMsService from "@/features/settings/inventory/services/deviceRAMs.service";
import { initialDeviceRAMsStoreState } from "@/features/settings/inventory/state/interfaces/deviceRAMs.store.interface";
import type { IUseDeviceRAMsStore } from "@/features/settings/inventory/state/interfaces/deviceRAMs.store.interface";
import type IDeviceRAM from "@/features/settings/inventory/interfaces/deviceRAMs.interface";
import type { PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";


const useDeviceRAMsStore = create<IUseDeviceRAMsStore>((set, get) => ({
  ...initialDeviceRAMsStoreState,
  fetchDeviceRAM: (id: number) => {
    try {
      set(() => ({ loading: true }));

      return DeviceRAMsService.get(id)
      .then((response: ISingleResponse<IDeviceRAM>) => {
        set(() => ({ deviceRAM: response.data }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('settings.service-devicerams-fetch-single-error', { id: id, message: error.message }),
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
  fetchDeviceRAMs: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true }));

      return DeviceRAMsService
      .getAll(currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<IDeviceRAM[]>) => {
        set(() => ({
          deviceRAMs: data.results,
          count: data?.count
        }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('settings.service-devicerams-fetch-all-error', { message: error.message }),
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

      return DeviceRAMsService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceRAM>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicerams-deprecated-success', {
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
          description: i18n.t('settings.service-devicerams-deprecated-error', { title: title, message: error.message }),
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

      return DeviceRAMsService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceRAM>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicerams-status-success', { status: statusNumberToName(status), title: title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicerams-status-error', { title: title, message: error.message }),
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
  handleCreate: (model: IDeviceRAM) => {
    try {
      set(() => ({ loading: true }));
      if (!model.title) {
        toToast({
          description: i18n.t('settings.service-devicerams-create-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DeviceRAMsService
      .create(model)
      .then((response: ISingleResponse<IDeviceRAM>) => {
        if (response.status === 201) {
          toToast({
            description: i18n.t('settings.service-devicerams-create-success', { title: model.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicerams-create-error', { title: model.title, message: error.message }),
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
  handleEdit: (id: number, data: IDeviceRAM) => {
    try {
      set(() => ({ loading: true }));
      if(!data.title) {
        toToast({
          description: i18n.t('settings.service-devicerams-edit-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DeviceRAMsService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceRAM>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicerams-edit-success', { title: data.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicerams-edit-error', { title: data.title, message: error.message }),
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

      return DeviceRAMsService
      .remove(id)
      .then((response: ISingleResponse<IDeviceRAM>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicerams-delete-success'),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicerams-delete-error', { message: error.message }),
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

export default useDeviceRAMsStore;