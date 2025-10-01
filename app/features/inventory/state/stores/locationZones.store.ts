import { create } from "zustand";
import i18n from "i18next";

import toToast from "@/core/utils/toToast";
import { statusNumberToName } from "@/core/utils/statusNumberToName";
import LocationZonesService from "@/features/inventory/services/locationZones.service";
import { initialLocationZonesStoreState } from "@/features/inventory/state/interfaces/locationZones.store.interface";
import type ILocationZone from "@/features/inventory/interfaces/locationZones.interface";
import type { IUseLocationZonesStore } from "@/features/inventory/state/interfaces/locationZones.store.interface";
import type { PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";


const useLocationZonesStore = create<IUseLocationZonesStore>((set, get) => ({
  ...initialLocationZonesStoreState,
  fetchLocationZone: (id: number) => {
    try {
      set(() => ({ loading: true }));

      return LocationZonesService.get(id)
      .then((response: ISingleResponse<ILocationZone>) => {
        set(() => ({ locationZone: response.data }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('inventory.service-locationzones-fetch-single-error', { id: id, message: error.message }),
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
  fetchLocationZones: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true }));

      return LocationZonesService
      .getAll(currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<ILocationZone[]>) => {
        set(() => ({
          locationZones: data.results,
          count: data?.count
        }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('inventory.service-locationzones-fetch-all-error', { message: error.message }),
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
  handleStatus: (id: number, status: number, title: string) => {
    try {
      const data = { title: title, status: status };
      set(() => ({ loading: true }));

      return LocationZonesService
      .update(id, data)
      .then((response: ISingleResponse<ILocationZone>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('inventory.service-locationzones-status-success', { status: statusNumberToName(status), title: title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-locationzones-status-error', { title: title, message: error.message }),
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
  handleCreate: (model: ILocationZone) => {
    try {
      set(() => ({ loading: true }));
      if (!model.title) {
        toToast({
          description: i18n.t('inventory.service-locationzones-create-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return LocationZonesService
      .create(model)
      .then((response: ISingleResponse<ILocationZone>) => {
        if (response.status === 201) {
          toToast({
            description: i18n.t('inventory.service-locationzones-create-success', { title: model.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-locationzones-create-error', { title: model.title, message: error.message }),
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
  handleEdit: (id: number, data: ILocationZone) => {
    try {
      set(() => ({ loading: true }));
      if(!data.title) {
        toToast({
          description: i18n.t('inventory.service-locationzones-edit-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return LocationZonesService
      .update(id, data)
      .then((response: ISingleResponse<ILocationZone>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('inventory.service-locationzones-edit-success', { title: data.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-locationzones-edit-error', { title: data.title, message: error.message }),
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

      return LocationZonesService
      .remove(id)
      .then((response: ISingleResponse<ILocationZone>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('inventory.service-locationzones-delete-success'),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-locationzones-delete-error', { message: error.message }),
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

export default useLocationZonesStore;