import { initIDeviceDisk } from "@/features/settings/inventory/interfaces/deviceDisks.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type IDeviceDisk from "@/features/settings/inventory/interfaces/deviceDisks.interface";


export interface IUseDeviceDisksStore {
  deviceDisk: IDeviceDisk;
  deviceDisks: IDeviceDisk[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  fetchDeviceDisk: (id: number) => void;
  fetchDeviceDisks: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  handleDeprecated: (id: number, is_deprecated: boolean, title: string) => void;
  handleStatus: (id: number, status: number, title: string) => void;
  handleCreate: (data: IDeviceDisk) => void;
  handleEdit: (id: number, data: IDeviceDisk) => void;
  handleDelete: (id: number) => void;
}

export const initialDeviceDisksStoreState = {
  deviceDisk: initIDeviceDisk,
  deviceDisks: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'title',
  loading: false,
  fetchDeviceDisk: () => {},
  fetchDeviceDisks: () => {},
  setCurrentPage: () => {},
  handleDeprecated: () => {},
  handleStatus: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {}
}