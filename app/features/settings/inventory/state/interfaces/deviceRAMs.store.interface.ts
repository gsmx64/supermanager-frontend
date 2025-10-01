import { initIDeviceRAM } from "@/features/settings/inventory/interfaces/deviceRAMs.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type IDeviceRAM from "@/features/settings/inventory/interfaces/deviceRAMs.interface";


export interface IUseDeviceRAMsStore {
  deviceRAM: IDeviceRAM;
  deviceRAMs: IDeviceRAM[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  fetchDeviceRAM: (id: number) => void;
  fetchDeviceRAMs: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  handleDeprecated: (id: number, is_deprecated: boolean, title: string) => void;
  handleStatus: (id: number, status: number, title: string) => void;
  handleCreate: (data: IDeviceRAM) => void;
  handleEdit: (id: number, data: IDeviceRAM) => void;
  handleDelete: (id: number) => void;
}

export const initialDeviceRAMsStoreState = {
  deviceRAM: initIDeviceRAM,
  deviceRAMs: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'title',
  loading: false,
  fetchDeviceRAM: () => {},
  fetchDeviceRAMs: () => {},
  setCurrentPage: () => {},
  handleDeprecated: () => {},
  handleStatus: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {}
}