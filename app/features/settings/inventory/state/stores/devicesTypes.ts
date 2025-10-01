import { create } from "zustand";
import i18n from "i18next";

import toToast from "@/core/utils/toToast";
import { statusNumberToName } from "@/core/utils/statusNumberToName";
import DeviceTypesService from "@/features/settings/inventory/services/deviceTypes.service";
import { initialDeviceTypesStoreState } from "@/features/settings/inventory/state/interfaces/deviceTypes.store.interface";
import type { IUseDeviceTypesStore } from "@/features/settings/inventory/state/interfaces/deviceTypes.store.interface";
import type IDeviceTypes from "@/features/settings/inventory/interfaces/deviceTypes.interface";
import type { PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";


const useDeviceTypesStore = create<IUseDeviceTypesStore>((set, get) => ({
  ...initialDeviceTypesStoreState,
  fetchDeviceType: (id: number) => {
    try {
      set(() => ({ loading: true }));

      return DeviceTypesService.get(id)
      .then((response: ISingleResponse<IDeviceTypes>) => {
        set(() => ({ deviceType: response.data }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('settings.service-devicetypes-fetch-single-error', { id: id, message: error.message }),
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
  fetchDeviceTypes: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true }));

      return DeviceTypesService
      .getAll(currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<IDeviceTypes[]>) => {
        set(() => ({
          deviceTypes: data.results,
          count: data?.count
        }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('settings.service-devicetypes-fetch-all-error', { message: error.message }),
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

      return DeviceTypesService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceTypes>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicetypes-deprecated-success', {
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
          description: i18n.t('settings.service-devicetypes-deprecated-error', { title: title, message: error.message }),
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

      return DeviceTypesService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceTypes>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicetypes-status-success', { status: statusNumberToName(status), title: title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicetypes-status-error', { title: title, message: error.message }),
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
  handleCreate: (model: IDeviceTypes) => {
    try {
      set(() => ({ loading: true }));
      if (!model.title) {
        toToast({
          description: i18n.t('settings.service-devicetypes-create-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DeviceTypesService
      .create(model)
      .then((response: ISingleResponse<IDeviceTypes>) => {
        if (response.status === 201) {
          toToast({
            description: i18n.t('settings.service-devicetypes-create-success', { title: model.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicetypes-create-error', { title: model.title, message: error.message }),
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
  handleEdit: (id: number, data: IDeviceTypes) => {
    try {
      set(() => ({ loading: true }));
      if(!data.title) {
        toToast({
          description: i18n.t('settings.service-devicetypes-edit-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DeviceTypesService
      .update(id, data)
      .then((response: ISingleResponse<IDeviceTypes>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicetypes-edit-success', { title: data.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicetypes-edit-error', { title: data.title, message: error.message }),
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

      return DeviceTypesService
      .remove(id)
      .then((response: ISingleResponse<IDeviceTypes>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('settings.service-devicetypes-delete-success'),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('settings.service-devicetypes-delete-error', { message: error.message }),
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

export default useDeviceTypesStore;