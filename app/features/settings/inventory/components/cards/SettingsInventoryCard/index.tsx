import { useContext } from "react";
import { Tooltip } from "@heroui/react";
import { useTranslation } from "react-i18next";

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import DeprecatedButton from "@/core/components/buttons/DeprecatedButton";
import StatusButton from "@/core/components/buttons/StatusButton";
import EditButton from "@/core/components/buttons/EditButton";
import DeleteButton from "@/core/components/buttons/DeleteButton";
import SettingsInventoryForm from "@/features/settings/inventory/forms/SettingsInventoryForm";
import OptionsLogo from "@/features/inventory/components/logos/OptionsLogo";
import type { SettingsInventoryFormTypes } from "@/features/settings/inventory/forms/SettingsInventoryForm";


export interface SettingsInventoryCardProps<T extends SettingsInventoryFormTypes> {
  item: T & { id: number }; // Ensure id is always present and is a number
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  handleDeprecated?: (id: number, deprecated: boolean, title: string) => void;
  handleStatus?: (id: number, status: number, title: string) => void;
  handleEdit: (id: number, data: T) => void;
  handleDelete: (id: number) => void;
  handleRefresh: (value: boolean) => void;
}

const SettingsInventoryCard = <T extends SettingsInventoryFormTypes>({
  item,
  style,
  containerClassName,
  containerStyle,
  handleDeprecated,
  handleStatus,
  handleEdit,
  handleDelete,
  handleRefresh
}: SettingsInventoryCardProps<T>) => {
  const { t } = useTranslation();
  const authData = useContext(AuthContext);
  const { isAdmin } = authData;

  return (
    <>
      <div
        className={containerClassName ? containerClassName : "relative flex min-w-2xs max-w-2xs border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow transition hover:shadow-2xl"}
        style={{ ...containerStyle }}
      >
        <div className="flex flex-col flex-1 justify-between px-2 py-2" style={{ ...style }}>
          <div className="flex justify-between items-start w-full mb-2">
            <div id="top_left" className="flex items-center"></div>
            <div id="top_right" className="flex items-center">
              <DeprecatedButton
              id={item.id}
              title={item.title}
              is_deprecated={Boolean(item.is_deprecated)}
              handleDeprecated={handleDeprecated != null ? handleDeprecated : () => {}}
              handleRefresh={handleRefresh}
              />
              {/* Aquí se usa undefined si item.id o item.status son undefined, por ejemplo: id={item.id ?? 0} */}
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <Tooltip
              color="primary"
              content={item.description ? item.description : item.title}
              showArrow={true}
            >
              <div id="link_container" className="flex flex-col items-center">
                <OptionsLogo color="#0078d4" />
                <span
                  className="font-semibold text-lg text-gray-900 dark:text-gray-100 text-center line-clamp-2 max-h-[2.8em] overflow-hidden"
                >
                  {item.title}
                </span>
                {(item.code_name) && (
                  <span
                    className="text-xs text-gray-700 dark:text-gray-200 text-center line-clamp-2 max-h-[2.8em] overflow-hidden"
                  >
                    {item.code_name}
                  </span>
                )}
              </div>
            </Tooltip>
          </div>

          <div className="flex justify-between items-end w-full mt-2">
            <div id="bottom_left" className="flex items-center">
              <StatusButton
                id={item.id}
                title={item.title}
                status={item.status ?? 0}
                handleStatus={handleStatus != null ? handleStatus : () => {}}
                handleRefresh={handleRefresh}
              />
            </div>
            <div id="bottom_right" className="flex items-center">
              {(!item.is_core || ( item.is_core && isAdmin)) && (
                <EditButton<T>
                  title={t('common.edit-modal-title', { title: item.title})}
                  form={SettingsInventoryForm}
                  formProps={{
                    id: item.id,
                    item,
                    handleEdit,
                    handleRefresh
                  }}
                />
              )}  
              {(!item.is_core || ( item.is_core && isAdmin)) && (
                <DeleteButton
                  id={item.id}
                  title={item.title}
                  handleDelete={handleDelete}
                  handleRefresh={handleRefresh}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettingsInventoryCard;