import { initIDeviceProcessor } from "@/features/settings/inventory/interfaces/deviceProcessors.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type IDeviceProcessor from "@/features/settings/inventory/interfaces/deviceProcessors.interface";


export interface IUseDeviceProcessorsStore {
  deviceProcessor: IDeviceProcessor;
  deviceProcessors: IDeviceProcessor[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  fetchDeviceProcessor: (id: number) => void;
  fetchDeviceProcessors: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  handleDeprecated: (id: number, is_deprecated: boolean, title: string) => void;
  handleStatus: (id: number, status: number, title: string) => void;
  handleCreate: (data: IDeviceProcessor) => void;
  handleEdit: (id: number, data: IDeviceProcessor) => void;
  handleDelete: (id: number) => void;
}

export const initialDeviceProcessorsStoreState = {
  deviceProcessor: initIDeviceProcessor,
  deviceProcessors: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'title',
  loading: false,
  fetchDeviceProcessor: () => {},
  fetchDeviceProcessors: () => {},
  setCurrentPage: () => {},
  handleDeprecated: () => {},
  handleStatus: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {}
}