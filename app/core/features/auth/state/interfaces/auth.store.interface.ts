import { initIUser } from "@/core/features/users/interfaces/user.interface";
import type IUser from "@/core/features/users/interfaces/user.interface";
import type {
  IUserForgotPassword,
  IUserLogin,
  IUserRegister
} from "@/core/features/users/interfaces/user.interface";


export interface IUseAuthStore {
  userData: IUser;
  accessToken: string | null;
  refreshToken: string | null;
  expToken: number | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  loading: boolean;
  registerHoldApproval: boolean;
  forgotEmailLinkSent: boolean;
  handleRegister: (data: IUserRegister) => void;
  handleLogin: (data: IUserLogin) => void;
  handleLogout: () => void;
  handleForgotPassword: (data: IUserForgotPassword) => void;
  setRegisterHoldApproval: (isHolding: boolean) => void;
  setForgotEmailLinkSent: (isLinkSent: boolean) => void;
}

export const initialAuthStoreState = {
  userData: initIUser,
  accessToken: null,
  refreshToken: null,
  expToken: null,
  isAuthenticated: false,
  isAdmin: false,
  isStaff: false,
  loading: false,
  registerHoldApproval: false,
  forgotEmailLinkSent: false,
  handleRegister: () => {},
  handleLogin: () => {},
  handleLogout: () => {},
  handleForgotPassword: () => {},
  setRegisterHoldApproval: () => {},
  setForgotEmailLinkSent: () => {}
}
