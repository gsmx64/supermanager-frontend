import { initIDeviceSystem } from "@/features/settings/inventory/interfaces/deviceSystems.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type IDeviceSystem from "@/features/settings/inventory/interfaces/deviceSystems.interface";


export interface IUseDeviceSystemsStore {
  deviceSystem: IDeviceSystem;
  deviceSystems: IDeviceSystem[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  fetchDeviceSystem: (id: number) => void;
  fetchDeviceSystems: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  handleDeprecated: (id: number, is_deprecated: boolean, title: string) => void;
  handleStatus: (id: number, status: number, title: string) => void;
  handleCreate: (data: IDeviceSystem) => void;
  handleEdit: (id: number, data: IDeviceSystem) => void;
  handleDelete: (id: number) => void;
}

export const initialDeviceSystemsStoreState = {
  deviceSystem: initIDeviceSystem,
  deviceSystems: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'title',
  loading: false,
  fetchDeviceSystem: () => {},
  fetchDeviceSSystems: () => {},
  setCurrentPage: () => {},
  handleDeprecated: () => {},
  handleStatus: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {}
}