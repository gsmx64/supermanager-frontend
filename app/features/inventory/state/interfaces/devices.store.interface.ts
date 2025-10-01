import { initIDevice } from "@/features/inventory/interfaces/devices.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type IDevice from "@/features/inventory/interfaces/devices.interface";


export interface IUseDevicesStore {
  device: IDevice;
  devices: IDevice[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  fetchDevice: (id: number) => void;
  fetchDevices: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  fetchDevicesByLocation: (locationId: number, currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  handleStatus: (id: number, status: number, title: string) => void;
  handleCreate: (data: IDevice) => void;
  handleEdit: (id: number, data: IDevice) => void;
  handleDelete: (id: number) => void;
}

export const initialDevicesStoreState = {
  device: initIDevice,
  devices: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'internal_id',
  loading: false,
  fetchDevice: () => {},
  fetchDevices: () => {},
  fetchDevicesByLocation: () => {},
  setCurrentPage: () => {},
  handleStatus: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {}
}