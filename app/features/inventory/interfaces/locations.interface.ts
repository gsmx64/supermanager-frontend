import { initIUser } from "@/core/features/users/interfaces/user.interface";
import type IUser from "@/core/features/users/interfaces/user.interface";
import type ILocationZone from "./locationZones.interface";
import { initILocationZone } from "./locationZones.interface";


export default interface ILocation extends ILocationCreate,ILocationEdit {
  is_core: boolean;
  creator: IUser;
  updater: IUser;
  created_at: string;
  updated_at: string;
  devices_count: number;
}

export interface ILocationCreate  {
  title: string;
  description: string;
  code_name: string;
  status: number;
  sort_order: number;
  location_zone: ILocationZone;
  manager: string;
  manager_email: string;
  manager_phone: string;
  manager_mobile: string;
  collaborator: string;
  collaborator_email: string;
  collaborator_phone: string;
  collaborator_mobile: string;
  phone: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export interface ILocationEdit extends ILocationCreate {
  id: number;
}

export const initILocation: ILocation = {
  id: 0,
  title: '',
  description: '',
  code_name: '',
  status: 0,
  is_core: false,
  sort_order: 0,
  location_zone: initILocationZone,
  manager: '',
  manager_email: '',
  manager_phone: '',
  manager_mobile: '',
  collaborator: '',
  collaborator_email: '',
  collaborator_phone: '',
  collaborator_mobile: '',
  phone: '',
  mobile: '',
  address: '',
  city: '',
  state: '',
  zip_code: '',
  country: '',
  latitude: 0,
  longitude: 0,
  creator: initIUser,
  updater: initIUser,
  created_at: '',
  updated_at: '',
  devices_count: 0
}

export const LocationColumns = [
  { title: 'table-id', align: 'center', dataIndex: 'id', key: 'id' },
  { title: 'table-title', align: 'start', dataIndex: 'title', key: 'title' },
  { title: 'table-code-name', align: 'start', dataIndex: 'code_name', key: 'code_name' },
  { title: 'table-address', align: 'center', dataIndex: 'address', key: 'address' },
  { title: 'table-city', align: 'center', dataIndex: 'city', key: 'city' },
  { title: 'table-state', align: 'center', dataIndex: 'state', key: 'state' },
  { title: 'table-zipcode', align: 'center', dataIndex: 'zip_code', key: 'zip_code' },
  { title: 'table-country', align: 'center', dataIndex: 'country', key: 'country' },
  { title: 'table-manager', align: 'start', dataIndex: 'manager', key: 'manager' },
  //{ title: 'table-manager-email', align: 'start', dataIndex: 'manager_email', key: 'manager_email' },
  { title: 'table-creator', align: 'start', dataIndex: 'creator', key: 'creator' },
  //{ title: 'table-created-at', align: 'center', dataIndex: 'created_at', key: 'created_at' },
  //{ title: 'table-updater', align: 'start', dataIndex: 'updater', key: 'updater' },
  //{ title: 'table-updated-at', align: 'center', dataIndex: 'updated_at', key: 'updated_at' },
  //{ title: 'table-sort-order', align: 'center', dataIndex: 'sort_order', key: 'sort_order' },
  { title: 'table-status', align: 'center', dataIndex: 'status', key: 'status' },
  { title: 'table-is-core', align: 'center', dataIndex: 'is_core', key: 'is_core' },
];
