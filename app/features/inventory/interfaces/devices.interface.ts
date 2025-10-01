import { initIUser } from "@/core/features/users/interfaces/user.interface";
import { initIDeviceType } from "@/features/settings/inventory/interfaces/deviceTypes.interface";
import { initIDeviceMark } from "@/features/settings/inventory/interfaces/deviceMarks.interface";
import { initIDeviceModel } from "@/features/settings/inventory/interfaces/deviceModels.interface";
import { initIDeviceSystem } from "@/features/settings/inventory/interfaces/deviceSystems.interface";
import { initIDeviceBuild } from "@/features/settings/inventory/interfaces/deviceBuilds.interface";
import { initIDeviceProcessor } from "@/features/settings/inventory/interfaces/deviceProcessors.interface";
import { initIDeviceRAM } from "@/features/settings/inventory/interfaces/deviceRAMs.interface";
import { initIDeviceDisk } from "@/features/settings/inventory/interfaces/deviceDisks.interface";
import { initILocation } from "@/features/inventory/interfaces/locations.interface";
import type IUser from "@/core/features/users/interfaces/user.interface";
import type IDeviceBuild from "@/features/settings/inventory/interfaces/deviceBuilds.interface";
import type IDeviceDisk from "@/features/settings/inventory/interfaces/deviceDisks.interface";
import type IDeviceMark from "@/features/settings/inventory/interfaces/deviceMarks.interface";
import type IDeviceModel from "@/features/settings/inventory/interfaces/deviceModels.interface";
import type IDeviceProcessor from "@/features/settings/inventory/interfaces/deviceProcessors.interface";
import type IDeviceRAM from "@/features/settings/inventory/interfaces/deviceRAMs.interface";
import type IDeviceSystem from "@/features/settings/inventory/interfaces/deviceSystems.interface";
import type IDeviceType from "@/features/settings/inventory/interfaces/deviceTypes.interface";
import type ILocation from "@/features/inventory/interfaces/locations.interface";


export default interface IDevice extends IDeviceCreate,IDeviceEdit {
  creator: IUser;
  updater: IUser;
  created_at: string;
  updated_at: string;
  devices_count: number;
}

export interface IDeviceCreate  {
  internal_id: string;
  hostname: string;
  status: number;
  type: IDeviceType;
  type_id: number;
  mark: IDeviceMark;
  mark_id: number;
  model: IDeviceModel;
  model_id: number;
  system: IDeviceSystem;
  system_id: number;
  build: IDeviceBuild;
  build_id: number;
  processor: IDeviceProcessor;
  processor_id: number;
  ram: IDeviceRAM;
  ram_id: number;
  disk: IDeviceDisk;
  disk_id: number;
  disk_internal_id: string;
  disk_serial: string;
  network_ipv4: string;
  network_ipv6: string;
  network_mac: string;
  remote_id: string;
  serial: string;
  location: ILocation;
  location_id: number;
  user_owner: string;
  notes: string;
  sort_order: number;
}

export interface IDeviceEdit extends IDeviceCreate {
  id: number;
}

export const initIDevice: IDevice = {
  id: 0,
  internal_id: '',
  hostname: '',
  status: 0,
  type: initIDeviceType,
  type_id: 0,
  mark: initIDeviceMark,
  mark_id: 0,
  model: initIDeviceModel,
  model_id: 0,
  system: initIDeviceSystem,
  system_id: 0,
  build: initIDeviceBuild,
  build_id: 0,
  processor: initIDeviceProcessor,
  processor_id: 0,
  ram: initIDeviceRAM,
  ram_id: 0,
  disk: initIDeviceDisk,
  disk_id: 0,
  disk_internal_id: '',
  disk_serial: '',
  network_ipv4: '',
  network_ipv6: '',
  network_mac: '',
  remote_id: '',
  serial: '',
  location: initILocation,
  location_id: 0,
  user_owner: '',
  notes: '',
  sort_order: 0,
  creator: initIUser,
  updater: initIUser,
  created_at: '',
  updated_at: '',
  devices_count: 0
}

export const DeviceColumns = [
  { title: 'table-id', align: 'center', dataIndex: 'id', key: 'id' },
  { title: 'table-internal-id', align: 'center', dataIndex: 'internal_id', key: 'internal_id' },
  { title: 'table-hostname', align: 'start', dataIndex: 'hostname', key: 'hostname' },
  { title: 'table-mark', align: 'start', dataIndex: 'mark', key: 'mark' },
  { title: 'table-model', align: 'start', dataIndex: 'model', key: 'model' },
  { title: 'table-system', align: 'start', dataIndex: 'system', key: 'system' },
  { title: 'table-build', align: 'start', dataIndex: 'build', key: 'build' },
  { title: 'table-processor', align: 'start', dataIndex: 'processor', key: 'processor' },
  { title: 'table-ram', align: 'start', dataIndex: 'ram', key: 'ram' },
  { title: 'table-disk', align: 'start', dataIndex: 'disk', key: 'disk' },
  { title: 'table-network-ipv4', align: 'start', dataIndex: 'network_ipv4', key: 'network_ipv4' },
  //{ title: 'table-network-ipv6', align: 'start', dataIndex: 'network_ipv6', key: 'network_ipv6' },
  { title: 'table-network-mac', align: 'start', dataIndex: 'network_mac', key: 'network_mac' },
  { title: 'table-remote-id', align: 'start', dataIndex: 'remote_id', key: 'remote_id' },
  { title: 'table-serial', align: 'start', dataIndex: 'serial', key: 'serial' },
  { title: 'table-user-owner', align: 'start', dataIndex: 'user_owner', key: 'user_owner' },
  { title: 'table-creator', align: 'start', dataIndex: 'creator', key: 'creator' },
  //{ title: 'table-created-at', align: 'center', dataIndex: 'created_at', key: 'created_at' },
  //{ title: 'table-updater', align: 'start', dataIndex: 'updater', key: 'updater' },
  //{ title: 'table-updated-at', align: 'center', dataIndex: 'updated_at', key: 'updated_at' },
  //{ title: 'table-sort-order', align: 'center', dataIndex: 'sort_order', key: 'sort_order' },
  { title: 'table-status', align: 'center', dataIndex: 'status', key: 'status' },
  { title: 'table-is-core', align: 'center', dataIndex: 'is_core', key: 'is_core' },
];

