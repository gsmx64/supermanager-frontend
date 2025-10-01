import { useContext } from "react";
import { Avatar, Divider, Tooltip } from "@heroui/react";
import { useTranslation } from "react-i18next";

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import { CORE_STORAGE_URL } from "@/core/consts/consts";
import { CheckIcon } from "@/core/components/icons/CheckIcon";
import EditButton from "@/core/components/buttons/EditButton";
import DeleteButton from "@/core/components/buttons/DeleteButton";
import ActiveButton from "@/core/components/buttons/ActiveButton";
import ProfileForm from "@/core/features/users/forms/ProfileForm";
import DefaultAvatar from "@/core/components/icons/DefaultAvatar";
import type { IUserExtended } from "@/core/features/users/interfaces/user.interface";
import { dateTimeFormat } from "@/core/utils/dateFormat";


export interface UsersCardProps {
  item: IUserExtended;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  handleActive?: (id: number, is_active: boolean, username: string) => void;
  handleEdit: (id: number, data: IUserExtended) => void;
  handleDelete: (id: number) => void;
  handleRefresh: (value: boolean) => void;
}

const UsersCard = ({
  item,
  style,
  containerClassName,
  containerStyle,
  handleActive,
  handleEdit,
  handleDelete,
  handleRefresh
}: UsersCardProps) => {
  const { t } = useTranslation();
  const authData = useContext(AuthContext);
  const { isAdmin, isStaff } = authData;

  return (
    <div
      className={containerClassName ? containerClassName : "relative flex min-w-2xs max-w-2xs border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow transition hover:shadow-2xl"}
      style={{ ...containerStyle }}
    >
      <div className="flex flex-col flex-1 justify-between px-2 py-2" style={{ ...style }}>
        <div className="flex justify-between items-start w-full mb-2">
          <div id="top_left" className="flex items-center"></div>
          <div id="top_right" className="flex items-center">
            {(item.is_staff) && (
              <Tooltip
                content={t('common.is-staff')}
                color="primary"
                showArrow={true}
              >  
                <div className="flex flex-row items-center gap-1">
                  {t('common.is-staff')}: <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                </div>
              </Tooltip>
            )}
            <Divider orientation="vertical" className="mx-1" />
            {(item.is_superuser) && (
              <Tooltip
                content={t('common.is-admin')}
                color="primary"
                showArrow={true}
              >  
                <div className="flex flex-row items-center gap-1">
                  {t('common.is-admin')}: <CheckIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                </div>
              </Tooltip>
            )}
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <Tooltip
            color="primary"
            content={`${t('common.table-username')}: ${item.username}`}
            showArrow={true}
          >
            <div id="link_container" className="flex flex-col items-center">
              {(item?.avatar && item?.avatar !== null && item?.avatar !== '/media/null') ? (
                <Avatar
                  alt={item.username}
                  className="shrink-0"
                  size="lg"
                  style={{ width: '6rem', height: '6rem' }}
                  src={`${CORE_STORAGE_URL}${item.avatar}`}
                  isBordered
                />
              ) : (
                <DefaultAvatar
                  className="rounded-full border-2 border-default-500 dark:border-default-600 object-cover shadow"
                  color="currentColor"
                  width="6rem"
                  height="6rem"
                />
              )}
              <span
                className="font-semibold text-lg text-gray-900 dark:text-gray-100 text-center line-clamp-2 max-h-[2.8em] overflow-hidden"
              >
                {item.first_name} {item.last_name}
              </span>
              {(item.email) && (
                <span
                  className="text-xs text-gray-700 dark:text-gray-200 text-center line-clamp-2 max-h-[2.8em] overflow-hidden"
                >
                  {item.email}
                </span>
              )}
              <span
                className="text-xs text-gray-700 dark:text-gray-200 text-center line-clamp-2 max-h-[2.8em] overflow-hidden"
              >
                {t('common.table-date-joined')}: {(item.date_joined) && dateTimeFormat(item.date_joined, t('locale'))}
              </span>
              <span
                className="text-xs text-gray-700 dark:text-gray-200 text-center line-clamp-2 max-h-[2.8em] overflow-hidden"
              >
                {t('common.table-last-login')}: {(item.last_login) ? dateTimeFormat(item.last_login, t('locale')) : t('common.never-logged-in')}
              </span>
            </div>
          </Tooltip>
        </div>

        <div className="flex justify-between items-end w-full mt-2">
          <div id="bottom_left" className="flex items-center">
            {(isAdmin && item.username != 'admin') && (
              <ActiveButton
                id={item.id}
                username={item.username}
                active={item.is_active ?? false}
                handleActive={handleActive != null ? handleActive : () => {}}
                handleRefresh={handleRefresh}
              />
            )}
          </div>
          <div id="bottom_right" className="flex items-center">
            {((isAdmin) || (isStaff && !isAdmin && !item.is_superuser)) && (
              <EditButton<IUserExtended>
                title={t('common.edit-modal-title', { title: item.username})}
                form={ProfileForm}
                formProps={{
                  id: item.id,
                  item,
                  handleEdit,
                  handleRefresh
                }}
              />
            )}  
            {(isAdmin && item.username != 'admin') && (
              <DeleteButton
                id={item.id}
                title={item.username}
                handleDelete={handleDelete}
                handleRefresh={handleRefresh}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersCard;