import { create } from "zustand";
import i18n from "i18next";

import toToast from "@/core/utils/toToast";
import { statusNumberToName } from "@/core/utils/statusNumberToName";
import DeviceProcessorsService from "@/features/settings/inventory/services/deviceProcessors.service";
import { initialDeviceProcessorsStoreState } from "@/features/settings/inventory/state/interfaces/deviceProcessors.store.interface";
import type { IUseDeviceProcessorsStore } from "@/features/settings/inventory/state/interfaces/deviceProcessors.store.interface";
import type IDeviceProcessor from "@/features/settings/inventory/interfaces/deviceProcessors.interface";
import type { PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";


const useDeviceProcessorsStore = create<IUseDeviceProcessorsStore>((set, get) => ({
  ...initialDeviceProcessorsStoreState,
  fetchDeviceProcessor: (id: number) => {
    try {
      set(() => ({ loading: true }));

      return DeviceProcessorsService.get(id)
      .then((response: ISingleResponse<IDeviceProcessor>) => {
        set(() => ({ deviceProcessor: response.data }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('settings.service-deviceprocessors-fetch-single-error', { id: id, message: error.message }),
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
  fetchDeviceProcessors: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true }));

      return DeviceProcessorsService
      .getAll(currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<IDeviceProcessor[]>) => {
        set(() => ({
          deviceProcessors: data.results,
          count: data?.count
        }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('settings.service-deviceprocessors-fetch-all-error', { message: error.message }),
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

      return DeviceProcessorsService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceProcessor>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-deviceprocessors-deprecated-success', {
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
          description: i18n.t('settings.service-deviceprocessors-deprecated-error', { title: title, message: error.message }),
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

      return DeviceProcessorsService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceProcessor>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-deviceprocessors-status-success', { status: statusNumberToName(status), title: title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-deviceprocessors-status-error', { title: title, message: error.message }),
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
  handleCreate: (model: IDeviceProcessor) => {
    try {
      set(() => ({ loading: true }));
      if (!model.title) {
        toToast({
          description: i18n.t('settings.service-deviceprocessors-create-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DeviceProcessorsService
      .create(model)
      .then((response: ISingleResponse<IDeviceProcessor>) => {
        if (response.status === 201) {
          toToast({
            description: i18n.t('settings.service-deviceprocessors-create-success', { title: model.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-deviceprocessors-create-error', { title: model.title, message: error.message }),
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
  handleEdit: (id: number, data: IDeviceProcessor) => {
    try {
      set(() => ({ loading: true }));
      if(!data.title) {
        toToast({
          description: i18n.t('settings.service-deviceprocessors-edit-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DeviceProcessorsService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceProcessor>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-deviceprocessors-edit-success', { title: data.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-deviceprocessors-edit-error', { title: data.title, message: error.message }),
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

      return DeviceProcessorsService
      .remove(id)
      .then((response: ISingleResponse<IDeviceProcessor>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-deviceprocessors-delete-success'),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-deviceprocessors-delete-error', { message: error.message }),
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

export default useDeviceProcessorsStore;