import { create } from "zustand";
import i18n from "i18next";

import toToast from "@/core/utils/toToast";
import { statusBooleanToName } from "@/core/utils/statusBooleanToName";
import { initialUsersStoreState } from "@/core/features/users/state/interfaces/users.store.interface";
import UsersService from "@/core/features/users/services/users.service";
import type { IUserActive, IUserExtended, IUserChangePassword } from "@/core/features/users/interfaces/user.interface";
import type { IUseUsersStore } from "@/core/features/users/state/interfaces/users.store.interface";
import type { PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";


const useUsersStore = create<IUseUsersStore>((set, get) => ({
  ...initialUsersStoreState,
  fetchUser: (id: number) => {
    try {
      set(() => ({ loading: true }));

      return UsersService.get(id)
      .then((response: ISingleResponse<IUserExtended>) => {
        set(() => ({ user: response.data }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('users.service-users-fetch-single-error', { id: id, message: error.message }),
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
  fetchUsers: (currentPage: number, itemsPerPage: number, itemsOrdering: string | undefined) => {
    try {
      set(() => ({ loading: true }));

      return UsersService
      .getAll(currentPage, itemsPerPage, itemsOrdering)
      .then((data: PaginatedResponse<IUserExtended[]>) => {
        set(() => ({
          users: data.results,
          count: data?.count
        }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('users.service-users-fetch-all-error', { message: error.message }),
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
  fetchProfile: () => {
    try {
      set(() => ({ loading: true }));

      return UsersService.getProfile()
      .then((response: ISingleResponse<IUserExtended>) => {
        set(() => ({ user: response.data }));
      })
      .catch((error: Error | null | any) => {
        toToast({
          description: i18n.t('users.service-users-fetch-profile-error', { message: error.message }),
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
  setCurrentPage: (page: number) => {
    set(() => ({ currentPage: page }));
  },
  setProfileEdit: (edit: boolean) => {
    set(() => ({ profileEdit: edit }));
  },
  handleActive: (id: number, is_active: boolean, userName: string) => {
    try {
      const data = { username: userName, is_active: is_active };
      set(() => ({ loading: true }));

      return UsersService
      .updateActive(id, data)
      .then((response: ISingleResponse<IUserActive>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('users.service-users-status-success', { is_active: statusBooleanToName(is_active), username: userName }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('users.service-users-status-error', { username: userName, message: error.message }),
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
  handleEdit: (id: number, data: IUserExtended) => {
    try {
      set(() => ({ loading: true }));
      if(!data.username) {
        toToast({
          description: i18n.t('users.service-users-edit-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return UsersService
      .update(id, data)
      .then((response: ISingleResponse<IUserExtended>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('users.service-users-edit-success', { username: data.username }),
            title: i18n.t('error.success'),
            color: "success",
          });
          set(() => ({ profileEdit: false }));
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('users.service-users-edit-error', { username: data.username, message: error.message }),
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
  handleChangeOwnPassword: (id: number, userName: string, data: IUserChangePassword) => {
    try {
      set(() => ({ loading: true }));
      if(!userName ||!data.password || !data.repeat_password) {
        toToast({
          description: i18n.t('users.service-users-change-password-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      if(id !== data.id) {
        toToast({
          description: i18n.t('users.service-users-change-password-unauthorized'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return UsersService
      .updateOwnPassword(data)
      .then((response: ISingleResponse<IUserChangePassword>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('users.service-users-change-own-password-success', { username: userName }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        if (error.status === 403) {
          toToast({
            description: i18n.t('users.service-users-current-own-password-error'),
            title: i18n.t('error.error'),
            color: "danger",
          });
        } else {
          toToast({
            description: i18n.t('users.service-users-change-own-password-error', { username: userName, message: error.message }),
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
  handleChangeUsersPassword: (id: number, userName: string, data: IUserChangePassword, is_superuser: boolean = false) => {
    try {
      set(() => ({ loading: true }));
      if(!id || !userName || !data.password || !data.repeat_password) {
        toToast({
          description: i18n.t('users.service-users-change-password-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      if(!is_superuser) {
        toToast({
          description: i18n.t('users.service-users-change-password-admin-required'),
          title: i18n.t('error.error'),
          color: "danger",
        });
        return Promise.reject();
      }

      return UsersService
      .updateUsersPassword(data)
      .then((response: ISingleResponse<IUserChangePassword>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('users.service-users-change-password-success', { username: userName }),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('users.service-users-change-password-error', { username: userName, message: error.message }),
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
  handleDelete: (id: number) => {
    try {
      set(() => ({ loading: true }));

      return UsersService
      .remove(id)
      .then((response: ISingleResponse<IUserExtended>) => {
        if (response.status === 200) {
          toToast({
            description: i18n.t('users.service-users-delete-success'),
            title: i18n.t('error.success'),
            color: "success",
          });
        }
      })
      .catch((error: any) => {
        toToast({
          description: i18n.t('users.service-users-delete-error', { message: error.message }),
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
  }
}));

export default useUsersStore;