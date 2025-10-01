import { initIDeviceModel } from "@/features/settings/inventory/interfaces/deviceModels.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type IDeviceModel from "@/features/settings/inventory/interfaces/deviceModels.interface";


export interface IUseDeviceModelsStore {
  deviceModel: IDeviceModel;
  deviceModels: IDeviceModel[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  fetchDeviceModel: (id: number) => void;
  fetchDeviceModels: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  handleDeprecated: (id: number, is_deprecated: boolean, title: string) => void;
  handleStatus: (id: number, status: number, title: string) => void;
  handleCreate: (data: IDeviceModel) => void;
  handleEdit: (id: number, data: IDeviceModel) => void;
  handleDelete: (id: number) => void;
}

export const initialDeviceModelsStoreState = {
  deviceModel: initIDeviceModel,
  deviceModels: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'title',
  loading: false,
  fetchDeviceModel: () => {},
  fetchDeviceModels: () => {},
  setCurrentPage: () => {},
  handleDeprecated: () => {},
  handleStatus: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {}
}