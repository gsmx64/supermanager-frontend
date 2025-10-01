import { initIDeviceType } from "@/features/settings/inventory/interfaces/deviceTypes.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type IDeviceTypes from "@/features/settings/inventory/interfaces/deviceTypes.interface";


export interface IUseDeviceTypesStore {
  deviceType: IDeviceTypes;
  deviceTypes: IDeviceTypes[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  fetchDeviceType: (id: number) => void;
  fetchDeviceTypes: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  handleDeprecated: (id: number, is_deprecated: boolean, title: string) => void;
  handleStatus: (id: number, status: number, title: string) => void;
  handleCreate: (data: IDeviceTypes) => void;
  handleEdit: (id: number, data: IDeviceTypes) => void;
  handleDelete: (id: number) => void;
}

export const initialDeviceTypesStoreState = {
  deviceType: initIDeviceType,
  deviceTypes: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'title',
  loading: false,
  fetchDeviceType: () => {},
  fetchDeviceTypes: () => {},
  setCurrentPage: () => {},
  handleDeprecated: () => {},
  handleStatus: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {}
}