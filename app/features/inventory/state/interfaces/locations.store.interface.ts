import { initILocation } from "@/features/inventory/interfaces/locations.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type ILocation from "@/features/inventory/interfaces/locations.interface";


export interface IUseLocationsStore {
  location: ILocation;
  locations: ILocation[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  loading: boolean;
  fetchLocation: (id: number) => void;
  fetchLocations: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  fetchLocationsByLocationZone: (locationZoneId: number, currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  setCurrentPage: (page: number) => void;
  handleStatus: (id: number, status: number, title: string) => void;
  handleCreate: (data: ILocation) => void;
  handleEdit: (id: number, data: ILocation) => void;
  handleDelete: (id: number) => void;
}

export const initialLocationsStoreState = {
  location: initILocation,
  locations: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'title',
  loading: false,
  fetchLocation: () => {},
  fetchLocations: () => {},
  fetchLocationsByLocationZone: () => {},
  setCurrentPage: () => {},
  handleStatus: () => {},
  handleCreate: () => {},
  handleEdit: () => {},
  handleDelete: () => {}
}