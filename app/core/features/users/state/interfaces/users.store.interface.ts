import { initIUserExtended } from "@/core/features/users/interfaces/user.interface";
import { CORE_DEFAULT_PAGE_INDEX, CORE_DEFAULT_PAGE_SIZE } from "@/core/consts/consts";
import type { IUserExtended, IUserChangePassword } from "@/core/features/users/interfaces/user.interface";


export interface IUseUsersStore {
  user: IUserExtended;
  users: IUserExtended[];
  count: number;
  currentPage: number;
  itemsPerPage: number;
  itemsOrdering: string | undefined;
  profileEdit: boolean;
  loading: boolean;
  fetchUser: (id: number) => void;
  fetchUsers: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => void;
  fetchProfile: () => void;
  setCurrentPage: (page: number) => void;
  setProfileEdit: (edit: boolean) => void;
  handleActive: (id: number, is_active: boolean, userName: string) => void;
  handleEdit: (id: number, data: IUserExtended) => void;
  handleChangeOwnPassword: (id: number, userName: string, data: IUserChangePassword) => void;
  handleChangeUsersPassword: (id: number, userName: string, data: IUserChangePassword, is_superuser?: boolean) => void;
  handleDelete: (id: number) => void;
}

export const initialUsersStoreState = {
  user: initIUserExtended,
  users: [],
  count: 0,
  currentPage: CORE_DEFAULT_PAGE_INDEX,
  itemsPerPage: CORE_DEFAULT_PAGE_SIZE,
  itemsOrdering: 'title',
  profileEdit: false,
  loading: false,
  fetchUser: () => {},
  fetchUsers: () => {},
  fetchProfile: () => {},
  setCurrentPage: () => {},
  setProfileEdit: () => {},
  handleActive: () => {},
  handleEdit: () => {},
  handleChangeOwnPassword: () => {},
  handleChangeUsersPassword: () => {},
  handleDelete: () => {}
}