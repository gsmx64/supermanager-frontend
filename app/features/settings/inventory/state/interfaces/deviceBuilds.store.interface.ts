import { initIDeviceBuild } from "@/features/settings/inventory/interfaces/deviceBuilds.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type IDeviceBuild from "@/features/settings/inventory/interfaces/deviceBuilds.interface";


export interface IUseDeviceBuildsStore {
  deviceBuild: IDeviceBuild;
  deviceBuilds: IDeviceBuild[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  fetchDeviceBuild: (id: number) => void;
  fetchDeviceBuilds: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  handleDeprecated: (id: number, is_deprecated: boolean, title: string) => void;
  handleStatus: (id: number, status: number, title: string) => void;
  handleCreate: (data: IDeviceBuild) => void;
  handleEdit: (id: number, data: IDeviceBuild) => void;
  handleDelete: (id: number) => void;
}

export const initialDeviceBuildsStoreState = {
  deviceBuild: initIDeviceBuild,
  deviceBuilds: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'title',
  loading: false,
  fetchDeviceBuild: () => {},
  fetchDeviceBuilds: () => {},
  setCurrentPage: () => {},
  handleDeprecated: () => {},
  handleStatus: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {}
}