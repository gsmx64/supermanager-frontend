import { initILocationZone } from "@/features/inventory/interfaces/locationZones.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type ILocationZone from "@/features/inventory/interfaces/locationZones.interface";


export interface IUseLocationZonesStore {
  locationZone: ILocationZone;
  locationZones: ILocationZone[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  fetchLocationZone: (id: number) => void;
  fetchLocationZones: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  handleStatus: (id: number, status: number, title: string) => void;
  handleCreate: (data: ILocationZone) => void;
  handleEdit: (id: number, data: ILocationZone) => void;
  handleDelete: (id: number) => void;
}

export const initialLocationZonesStoreState = {
  locationZone: initILocationZone,
  locationZones: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'title',
  loading: false,
  fetchLocationZone: () => {},
  fetchLocationZones: () => {},
  setCurrentPage: () => {},
  handleStatus: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {}
}