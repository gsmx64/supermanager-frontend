import { create } from "zustand";
import i18n from "i18next";

import toToast from "@/core/utils/toToast";
import DevicesService from "@/features/inventory/services/devices.service";
import { statusNumberToName } from "@/core/utils/statusNumberToName";
import { initialDevicesStoreState } from "@/features/inventory/state/interfaces/devices.store.interface";
import type IDevice from "@/features/inventory/interfaces/devices.interface";
import type { IUseDevicesStore } from "@/features/inventory/state/interfaces/devices.store.interface";
import type { PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";


const useDevicesStore = create<IUseDevicesStore>((set, get) => ({
  ...initialDevicesStoreState,
  fetchDevice: (id: number) => {
    try {
      set(() => ({ loading: true }));

      return DevicesService.get(id)
      .then((response: ISingleResponse<IDevice>) => {
        set(() => ({ device: response.data }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('inventory.service-devices-fetch-single-error', { id: id, message: error.message }),
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
  fetchDevices: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true }));

      return DevicesService
      .getAll(currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<IDevice[]>) => {
        set(() => ({
          devices: data.results,
          count: data?.count
        }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('inventory.service-devices-fetch-all-error', { message: error.message }),
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
  fetchDevicesByLocation: (locationId: number, currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true }));

      return DevicesService
      .getByLocation(locationId, currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<IDevice[]>) => {
        set(() => ({
          devices: data.results,
          count: data?.count,
        }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('inventory.service-devices-fetch-by-location-error', { locationId: locationId, message: error?.message }),
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
  handleStatus: (id: number, status: number, hostname: string) => {
    try {
      const data = { hostname: hostname, status: status };
      set(() => ({ loading: true }));

      return DevicesService
      .update(id, data)
      .then((response: ISingleResponse<IDevice>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('inventory.service-devices-status-success', { status: statusNumberToName(status), hostname: data?.hostname }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-devices-status-error', { hostname: hostname, message: error?.message }),
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
  handleCreate: (model: IDevice) => {
    try {
      set(() => ({ loading: true }));
      if (!model?.hostname) {
        toToast({
          description: i18n.t('inventory.service-devices-create-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DevicesService
      .create(model)
      .then((response: ISingleResponse<IDevice>) => {
        if (response.status === 201) {
          toToast({
            description: i18n.t('inventory.service-devices-create-success', { hostname: model?.hostname }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-devices-create-error', { hostname: model?.hostname, message: error?.message }),
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
  handleEdit: (id: number, data: IDevice) => {
    try {
      set(() => ({ loading: true }));
      if(!data.hostname) {
        toToast({
          description: i18n.t('inventory.service-devices-edit-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return DevicesService
      .update(id, data)
      .then((response: ISingleResponse<IDevice>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('inventory.service-devices-edit-success', { hostname: data.hostname }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-devices-edit-error', { hostname: data.hostname, message: error.message }),
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

      return DevicesService
      .remove(id)
      .then((response: ISingleResponse<IDevice>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('inventory.service-devices-delete-success'),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-devices-delete-error', { message: error.message }),
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

export default useDevicesStore;