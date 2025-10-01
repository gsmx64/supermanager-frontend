export default interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  date_joined?: string;
  last_login?: string;
  avatar?: string;
}

export interface IUserExtended extends IUser {
  title?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  birth?: string;
  about?: string;
}

export interface IUserResponse {
  count: number;
  next?: string;
  previous?: string;
  results: IUser[];
}

export interface IUserRegister {
  username: string;
  password: string;
  repeat_password: string;
  first_name: string;
  last_name: string;
  email: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  date_joined?: string;
  last_login?: string;
  phone?: string;
  mobile?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
  birth?: string;
  title?: string;
  about?: string;
}

export interface IUserForgotPassword {
  forgot_email: string;
}

export interface IUserPassword {
  password: string;
}

export interface IUserChangePassword extends IUserAdminChangePassword {
  current_password: string;
}

export interface IUserAdminChangePassword extends IUserPassword {
  id: number;
  repeat_password: string;
}

export interface IUserLogin extends IUserPassword {
  username: string;
}

export interface IUserActive {
  username: string;
  is_active: boolean;
}

export const initIUser: IUser = {
  id: 0,
  username: '',
  first_name: '',
  last_name: '',
  email: '',
  is_active: false,
  is_staff: false,
  is_superuser: false,
  date_joined: '',
  last_login: '',
  avatar: ''
}

export const initIUserExtended: IUserExtended = {
  ...initIUser,
  title: '',
  phone: '',
  mobile: '',
  address: '',
  city: '',
  state: '',
  zip_code: '',
  country: '',
  birth: '',
  about: ''
};

export const UserColumns = [
  { title: 'table-id', align: 'center', dataIndex: 'id', key: 'id' },
  { title: 'table-username', align: 'start', dataIndex: 'username', key: 'username' },
  //{ title: 'table-first-name', align: 'start', dataIndex: 'first_name', key: 'first_name' },
  //{ title: 'table-last-name', align: 'start', dataIndex: 'last_name', key: 'last_name' },
  { title: 'table-email', align: 'start', dataIndex: 'email', key: 'email' },
  { title: 'table-date-joined', align: 'center', dataIndex: 'date_joined', key: 'date_joined' },
  { title: 'table-last-login', align: 'center', dataIndex: 'last_login', key: 'last_login' },
  { title: 'table-active-status', align: 'center', dataIndex: 'is_active', key: 'is_active' },
  { title: 'table-staff', align: 'center', dataIndex: 'is_staff', key: 'is_staff' },
  { title: 'table-admin', align: 'center', dataIndex: 'is_superuser', key: 'is_superuser' },
  { title: 'table-about', align: 'center', dataIndex: 'about', key: 'about' }
];
