import { Link } from "react-router";
import { Tooltip } from "@heroui/react";
import { useTranslation } from "react-i18next";

import ChildCounter from "@/core/components/cards/ChildCounter/ChildCounter";
import DeviceIcon from "@/features/inventory/components/icons/DeviceIcon";
import LocationLogo from "@/features/inventory/components/logos/LocationLogo";
import type ILocation from "@/features/inventory/interfaces/locations.interface";
import EditButton from "@/core/components/buttons/EditButton";
import type { ILocationEdit } from "@/features/inventory/interfaces/locations.interface";
import LocationForm from "@/features/inventory/forms/LocationForm";
import DeleteButton from "@/core/components/buttons/DeleteButton";
import StatusButton from "@/core/components/buttons/StatusButton";
import { useContext } from "react";
import { AuthContext } from "@/core/features/auth/contexts/auth.context";


export interface LocationCardProps {
  item: ILocation;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  handleStatus?: (id: number, status: number, title: string) => void;
  handleEdit: (id: number, data: ILocation) => void;
  handleDelete: (id: number) => void;
  handleRefresh: (value: boolean) => void;
}

const LocationCard = ({
  item,
  style,
  containerClassName,
  containerStyle,
  handleStatus,
  handleEdit,
  handleDelete,
  handleRefresh
}: LocationCardProps) => {
  const { t } = useTranslation();
  const authData = useContext(AuthContext);
  const { isAdmin } = authData;

  return (
    <Tooltip
      color="primary"
      content={item.description ? item.description : t('inventory.location-zone-title')}
      showArrow={true}
    >
      <div
        className={containerClassName ? containerClassName : "relative flex min-w-2xs max-w-2xs border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow transition hover:shadow-2xl"}
        style={{ ...containerStyle }}
      >
        <div className="flex flex-col flex-1 justify-between px-2 py-2" style={{ ...style }}>
          <div className="flex justify-between items-start w-full mb-2">
            <div id="top_left" className="flex items-center"></div>
            <div id="top_right" className="flex items-center">
              <ChildCounter
                counter={item.devices_count}
                CustomIcon={
                  <DeviceIcon
                    width="1.0rem"
                    height="1.0rem"
                  />
                }
                color={item.devices_count > 0 ? "#0078d4" : "#bbb"}
                tooltip="Devices: "
                containerClassName="border-gray-200 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <Link
              key={item.id}
              to={`/inventory/location/${item.id}`}
              className="flex flex-col items-center gap-2 no-underline"
            >
              <div id="link_container" className="flex flex-col items-center">
                <LocationLogo color="#0078d4" />
                <span
                  className="font-semibold text-lg text-gray-900 dark:text-gray-100 text-center line-clamp-2 max-h-[2.8em] overflow-hidden"
                >
                  {item.title}
                </span>
              </div>
            </Link>
          </div>

          <div className="flex justify-between items-end w-full mt-2">
            <div id="bottom_left" className="flex items-center">
              <StatusButton
                id={item.id}
                title={item.title}
                status={item.status}
                handleStatus={handleStatus != null ? handleStatus : () => {}}
                handleRefresh={handleRefresh}
              />
            </div>
            <div id="bottom_right" className="flex items-center">
              {(!item.is_core || ( item.is_core && isAdmin)) && (
                <EditButton<ILocationEdit>
                  title={t('common.edit-modal-title', { title: item.title})}
                  form={LocationForm}
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
    </Tooltip>
  );
}

export default LocationCard;