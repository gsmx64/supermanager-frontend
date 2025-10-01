import { initIUser } from "@/core/features/users/interfaces/user.interface";
import type IUser from "@/core/features/users/interfaces/user.interface";


export default interface IDeviceProcessor {
  id: number;
  title: string;
  description?: string;
  code_name?: string;
  status?: number;
  is_core?: boolean;
  is_deprecated?: boolean;
  sort_order?: number;
  creator?: IUser;
  updater?: IUser;
  created_at?: string;
  updated_at?: string;
}

export const initIDeviceProcessor: IDeviceProcessor = {
  id: 0,
  title: '',
  description: '',
  code_name: '',
  status: 1,
  is_core: false,
  is_deprecated: false,
  sort_order: 0,
  creator: initIUser,
  updater: initIUser,
  created_at: '',
  updated_at: ''
};

export const DeviceProcessorColumns = [
  { title: 'table-id', align: 'center', dataIndex: 'id', key: 'id' },
  { title: 'table-title', align: 'start', dataIndex: 'title', key: 'title' },
  { title: 'table-code-name', align: 'start', dataIndex: 'code_name', key: 'code_name' },
  { title: 'table-creator', align: 'start', dataIndex: 'creator', key: 'creator' },
  //{ title: 'table-created-at', align: 'center', dataIndex: 'created_at', key: 'created_at' },
  //{ title: 'table-updater', align: 'start', dataIndex: 'updater', key: 'updater' },
  //{ title: 'table-updated-at', align: 'center', dataIndex: 'updated_at', key: 'updated_at' },
  //{ title: 'table-sort-order', align: 'center', dataIndex: 'sort_order', key: 'sort_order' },
  { title: 'table-is-deprecated', align: 'center', dataIndex: 'is_deprecated', key: 'is_deprecated' },
  { title: 'table-status', align: 'center', dataIndex: 'status', key: 'status' },
  { title: 'table-is-core', align: 'center', dataIndex: 'is_core', key: 'is_core' }
];
