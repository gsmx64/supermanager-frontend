import { initIUser } from "@/core/features/users/interfaces/user.interface";
import type IUser from "@/core/features/users/interfaces/user.interface";


export default interface INotification {
  id: number;
  title: string;
  description: string;
  status: number;
  type: string;
  module: string;
  module_id: number;
  creator: IUser;
  updater: IUser;
  createAt: string;
  updateAt: string;
}

export interface INotificationCreate {
  title: string;
  description: string;
  type: string;
  module: string;
  module_id: number;
}

export interface INotificationResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: INotification[];
}

export const initINotification: INotification = {
  id: 0,
  title: '',
  description: '',
  status: 0,
  type: '',
  module: '',
  module_id: 0,
  creator: initIUser,
  updater: initIUser,
  createAt: '',
  updateAt: '',
}

export const initINotificationResponse = {
  count: 0,
  next: null,
  previous: null,
  results: []
}

export const initINotificationCreate: INotificationCreate = {
  title: '',
  description: '',
  type: '',
  module: '',
  module_id: 0,
}
