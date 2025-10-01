import api from "@/core/api/axios";
import { useTranslation } from "react-i18next";

import type { IUserExtended } from "@/core/features/users/interfaces/user.interface";
import { ProfileCardItems } from "@/core/features/users/components/cards/ProfileCard/components/ProfileCardItems";
import { dateFormat } from "@/core/utils/dateFormat";
import { Avatar, Button } from "@heroui/react";
import DefaultAvatar from "@/core/components/icons/DefaultAvatar";
import { CORE_STORAGE_URL } from "@/core/consts/consts";
import { useTheme } from "@/core/hooks/useTheme";


type ProfileCardProps = {
  user: IUserExtended,
  setProfileEdit: (value: boolean) => void
  handleRefresh: () => void;
};

export const ProfileCard = ({ user, setProfileEdit, handleRefresh }: ProfileCardProps) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className="relative bg-gray-100 dark:bg-gray-700 rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center md:items-start gap-8">
      <div className="flex-shrink-0">
        <div className="relative group">
          {(user?.avatar && user?.avatar !== null && user?.avatar !== '/media/null') ? (
            <Avatar
              alt={user.username}
              className="w-32 h-32 rounded-full border-4 border-primary-500 dark:border-primary-600 object-cover shadow"
              size="lg"
              src={`${CORE_STORAGE_URL}${user.avatar}`}
              isBordered
            />
          ) : (
            <DefaultAvatar
              className="rounded-full border-2 border-default-500 dark:border-default-600 object-cover shadow"
              color={(theme === 'dark' ? 'white' : 'black')}
              width={130}
              height={130}
            />
          )}
            <label
            htmlFor="avatar-upload"
            className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-0 group-hover:bg-black group-hover:bg-opacity-50 rounded-full cursor-pointer transition"
            title="Cambiar avatar"
            >
            <span className="opacity-0 group-hover:opacity-100 text-primary-500 dark:text-primary-500 font-semibold">
              {t('profile.change-avatar', 'Cambiar')}
            </span>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              // Subir imagen al backend
              const formData = new FormData();
                formData.append('avatar', file);
                // Usar axios para subir la imagen
                await api.post('/profile/upload-avatar/', formData, {
                withCredentials: true,
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
                });
              handleRefresh();
              }}
            />
            </label>
        </div>
      </div>
      <div className="flex-1 w-full">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {user?.username}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {
                t('profile.role',
                { role: (user.is_superuser) ? 'Admin' : (user.is_staff) ? 'Staff' :  'User' })
              }
            </p>
            {
              (user?.title) &&
              <p className="text-gray-500 dark:text-gray-400">
                {user?.title}
              </p>
            }
            {
              (user?.date_joined) &&
              <p className="text-gray-500 dark:text-gray-400">
                {t('profile.member-since', {
                    dateJoined: dateFormat(user?.date_joined, t('locale'))
                })}
              </p>
            }
          </div>
          <Button
            size="md"
            color="primary"
            variant="ghost"
            onPress={() => { setProfileEdit(true); handleRefresh(); }}
          >
            {t('profile.edit')}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileCardItems field={t('profile.firstname')} item={user?.first_name} />
          <ProfileCardItems field={t('profile.lastname')} item={user?.last_name} />
          <ProfileCardItems field={t('profile.email')} item={user?.email} />
          <ProfileCardItems field={t('profile.birth')} item={dateFormat(user?.birth ?? '', t('locale'))} />
          <ProfileCardItems field={t('profile.phone')} item={user?.phone} />
          <ProfileCardItems field={t('profile.mobile')} item={user?.mobile} isWhatsApp={true} />
          <ProfileCardItems field={t('profile.address')} item={user?.address} />
          <ProfileCardItems field={t('profile.city')} item={user?.city} />
          <ProfileCardItems field={t('profile.state')} item={user?.state} />
          <ProfileCardItems field={t('profile.zip-code')} item={user?.zip_code} />
          <ProfileCardItems field={t('profile.country')} item={user?.country} />
        </div>
        <div className="grid grid-cols-1 mt-4 md:grid-cols-1 gap-4">
          <ProfileCardItems field={t('profile.about')} item={user?.about} />
        </div>
      </div>
    </div>
  );
};