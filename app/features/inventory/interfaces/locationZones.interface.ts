import { initIUser } from "@/core/features/users/interfaces/user.interface";
import type IUser from "@/core/features/users/interfaces/user.interface";

export default interface ILocationZone extends ILocationZoneCreate,ILocationZoneEdit {
  is_core: boolean;
  creator: IUser;
  updater: IUser;
  created_at: string;
  updated_at: string;
  locations_count: number;
}

export interface ILocationZoneCreate  {
  id: number;
  title: string;
  description?: string;
  code_name?: string;
  status: number;
  is_core: boolean;
  manager: string;
  manager_email: string;
  manager_phone: string;
  manager_mobile: string;
  sort_order?: number;
  creator: IUser;
  updater: IUser;
  created_at: string;
  updated_at: string;
}

export interface ILocationZoneEdit extends ILocationZoneCreate {
  id: number;
}

export const initILocationZone: ILocationZone = {
  id: 0,
  title: '',
  description: '',
  code_name: '',
  status: 1,
  is_core: false,
  manager: '',
  manager_email: '',
  manager_phone: '',
  manager_mobile: '',
  sort_order: 0,
  creator: initIUser,
  updater: initIUser,
  created_at: '',
  updated_at: '',
  locations_count: 0,
};

export const LocationZoneColumns = [
  { title: 'table-id', align: 'center', dataIndex: 'id', key: 'id' },
  { title: 'table-title', align: 'start', dataIndex: 'title', key: 'title' },
  { title: 'table-code-name', align: 'start', dataIndex: 'code_name', key: 'code_name' },
  { title: 'table-manager', align: 'center', dataIndex: 'manager', key: 'manager' },
  { title: 'table-manager-email', align: 'center', dataIndex: 'manager_email', key: 'manager_email' },
  { title: 'table-manager-phone', align: 'center', dataIndex: 'manager_phone', key: 'manager_phone' },
  { title: 'table-manager-mobile', align: 'center', dataIndex: 'manager_mobile', key: 'manager_mobile' },
  { title: 'table-creator', align: 'start', dataIndex: 'creator', key: 'creator' },
  //{ title: 'table-created-at', align: 'center', dataIndex: 'created_at', key: 'created_at' },
  //{ title: 'table-updater', align: 'start', dataIndex: 'updater', key: 'updater' },
  //{ title: 'table-updated-at', align: 'center', dataIndex: 'updated_at', key: 'updated_at' },
  //{ title: 'table-sort-order', align: 'center', dataIndex: 'sort_order', key: 'sort_order' },
  { title: 'table-status', align: 'center', dataIndex: 'status', key: 'status' },
  { title: 'table-is-core', align: 'center', dataIndex: 'is_core', key: 'is_core' }
];
