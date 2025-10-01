import { initIDeviceMark } from "@/features/settings/inventory/interfaces/deviceMarks.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type IDeviceMarks from "@/features/settings/inventory/interfaces/deviceMarks.interface";


export interface IUseDeviceMarksStore {
  deviceMark: IDeviceMarks;
  deviceMarks: IDeviceMarks[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  fetchDeviceMark: (id: number) => void;
  fetchDeviceMarks: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  handleDeprecated: (id: number, is_deprecated: boolean, title: string) => void;
  handleStatus: (id: number, status: number, title: string) => void;
  handleCreate: (data: IDeviceMarks) => void;
  handleEdit: (id: number, data: IDeviceMarks) => void;
  handleDelete: (id: number) => void;
}

export const initialDeviceMarksStoreState = {
  deviceMark: initIDeviceMark,
  deviceMarks: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'title',
  loading: false,
  fetchDeviceMark: () => {},
  fetchDeviceMarks: () => {},
  setCurrentPage: () => {},
  handleDeprecated: () => {},
  handleStatus: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {}
}