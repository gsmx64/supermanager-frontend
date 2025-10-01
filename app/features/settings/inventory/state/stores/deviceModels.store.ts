import { create } from "zustand";
import i18n from "i18next";

import toToast from "@/core/utils/toToast";
import { statusNumberToName } from "@/core/utils/statusNumberToName";
import DeviceModelsService from "@/features/settings/inventory/services/deviceModels.service";
import { initialDeviceModelsStoreState } from "@/features/settings/inventory/state/interfaces/deviceModels.store.interface";
import type { IUseDeviceModelsStore } from "@/features/settings/inventory/state/interfaces/deviceModels.store.interface";
import type IDeviceModels from "@/features/settings/inventory/interfaces/deviceModels.interface";
import type { PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";


const useDeviceModelsStore = create<IUseDeviceModelsStore>((set, get) => ({
  ...initialDeviceModelsStoreState,
  fetchDeviceModel: (id: number) => {
    try {
      set(() => ({ loading: true }));

      return DeviceModelsService.get(id)
      .then((response: ISingleResponse<IDeviceModels>) => {
        set(() => ({ deviceModel: response.data }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('settings.service-devicemodels-fetch-single-error', { id: id, message: error.message }),
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
  fetchDeviceModels: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true }));

      return DeviceModelsService
      .getAll(currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<IDeviceModels[]>) => {
        set(() => ({
          deviceModels: data.results,
          count: data?.count
        }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('settings.service-devicemodels-fetch-all-error', { message: error.message }),
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

      return DeviceModelsService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceModels>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicemodels-deprecated-success', {
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
          description: i18n.t('settings.service-devicemodels-deprecated-error', { title: title, message: error.message }),
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

      return DeviceModelsService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceModels>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicemodels-status-success', { status: statusNumberToName(status), title: title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicemodels-status-error', { title: title, message: error.message }),
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
  handleCreate: (model: IDeviceModels) => {
    try {
      set(() => ({ loading: true }));
      if (!model.title) {
        toToast({
          description: i18n.t('settings.service-devicemodels-create-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DeviceModelsService
      .create(model)
      .then((response: ISingleResponse<IDeviceModels>) => {
        if (response.status === 201) {
          toToast({
            description: i18n.t('settings.service-devicemodels-create-success', { title: model.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicemodels-create-error', { title: model.title, message: error.message }),
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
  handleEdit: (id: number, data: IDeviceModels) => {
    try {
      set(() => ({ loading: true }));
      if(!data.title) {
        toToast({
          description: i18n.t('settings.service-devicemodels-edit-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DeviceModelsService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceModels>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicemodels-edit-success', { title: data.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicemodels-edit-error', { title: data.title, message: error.message }),
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

      return DeviceModelsService
      .remove(id)
      .then((response: ISingleResponse<IDeviceModels>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicemodels-delete-success'),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicemodels-delete-error', { message: error.message }),
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

export default useDeviceModelsStore;