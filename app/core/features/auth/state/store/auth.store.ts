import { create } from "zustand";
import { devtools, persist } from 'zustand/middleware';
import i18n from "i18next";

import AuthService from "@/core/features/auth/services/auth.service";
import TokenService from "@/core/features/auth/services/token.service";
import { initialAuthStoreState } from "@/core/features/auth/state/interfaces/auth.store.interface";
import toToast from "@/core/utils/toToast";
import type { IUseAuthStore } from "@/core/features/auth/state/interfaces/auth.store.interface";
import type { IUserForgotPassword, IUserLogin, IUserRegister } from "@/core/features/users/interfaces/user.interface";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";


const useAuthStore = create<IUseAuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialAuthStoreState,
        handleRegister: (model: IUserRegister) => {
          try {
            set(() => ({ loading: true }));
            if (!model.username) {
              toToast({
                description: i18n.t('auth.service-auth-register-required'),
                title: i18n.t('error.error'),
                color: "danger",
              });
              return Promise.reject();
            }

            return AuthService
            .register(model)
            .then((response: ISingleResponse<IUserRegister>) => {
              if (response?.data?.username && response?.data?.username[0] === 'Username already exists.') {
                toToast({
                  description: i18n.t('auth.service-auth-register-user-exists'),
                  title: i18n.t('error.error'),
                  color: "danger",
                });
              } else if (response?.data?.email && response?.data?.email[0] === 'Email already exists.') {
                toToast({
                  description: i18n.t('auth.service-auth-register-email-exists'),
                  title: i18n.t('error.error'),
                  color: "danger",
                });
              } else if (response?.status === 201) {
                toToast({
                  description: i18n.t('auth.service-auth-register-success', { username: model.username }),
                  title: i18n.t('error.success'),
                  color: "success",
                });
                set(() => ({ registerHoldApproval: true }));
              }
            })
            .catch((error: any) => {
              toToast({
                description: i18n.t('auth.service-auth-register-error', { username: model.username, message: error.message }),
                title: i18n.t('error.error'),
                color: "danger",
              });
            })
            .finally(() => {
              set(() => ({ loading: false }));
            });
          } catch (error: any) {
            console.log(error.toString());
          }
        },
        handleLogin: (model: IUserLogin) => {
          try {
            set(() => ({ loading: true }));

            return AuthService
            .login({username: model.username, password: model.password})
            .then((response) => {
              const tokenData = response?.data as any;
              const accessToken = tokenData.access;
              const refreshToken = tokenData.refresh;
              const expToken = tokenData.exp;
              const user = tokenData.user;

              if (
                response.status === 200 &&
                response.data &&
                accessToken !== null &&
                accessToken !== undefined &&
                user.username
              ) {
                TokenService.setToken(accessToken, refreshToken, expToken, user);
                set(() => ({
                  userData: user,
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                  expToken: expToken,
                  isAuthenticated: true,
                  isAdmin: true,
                  isStaff: Boolean(user.is_staff),
                  loading: false
                }));

                window.location.href = "/";
              } else {
                throw new Error("Invalid response from server");
              }
            })
            .catch((error: any) => {
              if (error.status === 400) {
                toToast({
                  description: i18n.t('auth.service-auth-login-wrong-credentials'),
                  title: i18n.t('error.error'),
                  color: "danger",
                });
              } else {
                toToast({
                  description: i18n.t('auth.service-auth-login-error', { status: error.status, message: error.message }),
                  title: i18n.t('error.error'),
                  color: "danger",
                });
              }
            })
            .finally(() => {
              set(() => ({ loading: false }));
            });
          } catch (error: any) {
            console.log(error.toString());
          }
        },
        handleLogout: () => {
          try {
            set(() => ({ loading: true }));
            AuthService.logout();
            TokenService.clearToken();
            set(() => ({
              userData: initialAuthStoreState.userData,
              accessToken: null,
              refreshToken: null,
              expToken: null,
              isAuthenticated: false,
              isAdmin: false,
              isStaff: false,
              loading: false
            }));
            window.location.href = "/auth/login";
          } catch (error: any) {
            console.log(error.toString());
          }
        },
        handleForgotPassword: (model: IUserForgotPassword) => {
          try {
            set(() => ({ loading: true }));
            if (!model.forgot_email) {
              toToast({
                description: i18n.t('auth.service-auth-forgot-password-required'),
                title: i18n.t('error.error'),
                color: "danger",
              });
              return Promise.reject();
            }

            return AuthService
            .forgotPassword(model)
            .then((response: ISingleResponse<IUserForgotPassword>) => {
              if (response.status === 200) {
                toToast({
                  description: i18n.t('auth.service-auth-forgot-password-success', { email: model.forgot_email }),
                  title: i18n.t('error.success'),
                  color: "success",
                });
                set(() => ({ forgotEmailLinkSent: true }));
              }
            })
            .finally(() => {
              set(() => ({ loading: false }));
            });
          } catch (error: any) {}
        },
        setRegisterHoldApproval: (isHolding: boolean) => {
          set(() => ({ registerHoldApproval: isHolding }));
        },
        setForgotEmailLinkSent: (isLinkSent: boolean) => {
          set(() => ({ forgotEmailLinkSent: isLinkSent }));
        },
      }),  
      {
        name: 'auth-storage',
        // Optional: sessionStorage instead of localStorage
        // storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);

export default useAuthStore;