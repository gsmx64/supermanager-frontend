import { create } from "zustand";
import i18n from "i18next";

import toToast from "@/core/utils/toToast";
import LocationsService from "@/features/inventory/services/locations.service";
import { statusNumberToName } from "@/core/utils/statusNumberToName";
import { initialLocationsStoreState } from "@/features/inventory/state/interfaces/locations.store.interface";
import type ILocation from "@/features/inventory/interfaces/locations.interface";
import type { IUseLocationsStore } from "@/features/inventory/state/interfaces/locations.store.interface";
import type { PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";


const useLocationsStore = create<IUseLocationsStore>((set, get) => ({
  ...initialLocationsStoreState,
  fetchLocation: (id: number) => {
    try {
      set(() => ({ loading: true }));

      return LocationsService.get(id)
      .then((response: ISingleResponse<ILocation>) => {
        set(() => ({ location: response.data }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('inventory.service-locations-fetch-single-error', { id: id, message: error.message }),
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
  fetchLocations: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true }));

      return LocationsService
      .getAll(currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<ILocation[]>) => {
        set(() => ({
          locations: data.results,
          count: data?.count
        }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('inventory.service-locations-fetch-all-error', { message: error.message }),
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
  fetchLocationsByLocationZone: (locationZoneId: number, currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true }));

      return LocationsService
      .getByLocationZone(locationZoneId, currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<ILocation[]>) => {
        set(() => ({
          locations: data.results,
          count: data?.count,
        }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('inventory.service-location-fetch-by-location-zone-error', { locationZoneId: locationZoneId, message: error?.message }),
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

      return LocationsService
      .update(id, data)
      .then((response: ISingleResponse<ILocation>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('inventory.service-locations-status-success', { status: statusNumberToName(status), title: title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-locations-status-error', { title: title, message: error.message }),
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
  handleCreate: (model: ILocation) => {
    try {
      set(() => ({ loading: true }));
      if (!model.title) {
        toToast({
          description: i18n.t('inventory.service-locations-create-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return LocationsService
      .create(model)
      .then((response: ISingleResponse<ILocation>) => {
        if (response.status === 201) {
          toToast({
            description: i18n.t('inventory.service-locations-create-success', { title: model.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-locations-create-error', { title: model.title, message: error.message }),
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
  handleEdit: (id: number, data: ILocation) => {
    try {
      set(() => ({ loading: true }));
      if(!data.title) {
        toToast({
          description: i18n.t('inventory.service-locations-edit-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return LocationsService
      .update(id, data)
      .then((response: ISingleResponse<ILocation>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('inventory.service-locations-edit-success', { title: data.title }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-locations-edit-error', { title: data.title, message: error.message }),
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

      return LocationsService
      .remove(id)
      .then((response: ISingleResponse<ILocation>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('inventory.service-locations-delete-success'),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('inventory.service-locations-delete-error', { message: error.message }),
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

export default useLocationsStore;