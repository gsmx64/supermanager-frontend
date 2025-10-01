import { useContext } from "react";
import { Link } from "react-router";
import { Tooltip } from "@heroui/react";
import { useTranslation } from "react-i18next";

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import ChildCounter from "@/core/components/cards/ChildCounter/ChildCounter";
import LocationIcon from "@/features/inventory/components/icons/LocationIcon";
import LocationZoneLogo from "@/features/inventory/components/logos/LocationZoneLogo";
import LocationZoneForm from "@/features/inventory/forms/LocationZoneForm";
import StatusButton from "@/core/components/buttons/StatusButton";
import EditButton from "@/core/components/buttons/EditButton";
import DeleteButton from "@/core/components/buttons/DeleteButton";
import type ILocationZone from "@/features/inventory/interfaces/locationZones.interface";
import type { ILocationZoneEdit } from "@/features/inventory/interfaces/locationZones.interface";


export interface LocationZoneCardProps {
  item: ILocationZone;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  handleStatus?: (id: number, status: number, title: string) => void;
    handleEdit: (id: number, data: ILocationZone) => void;
    handleDelete: (id: number) => void;
    handleRefresh: (value: boolean) => void;
}

const LocationZoneCard = ({
  item,
  style,
  containerClassName,
  containerStyle,
  handleStatus,
  handleEdit,
  handleDelete,
  handleRefresh
}: LocationZoneCardProps) => {
  const { t } = useTranslation();
  const authData = useContext(AuthContext);
  const { isAdmin } = authData;

  return (
    <Tooltip
      color="primary"
      content={item.description ? item.description : t('inventory.location-zones-description')}
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
                counter={item.locations_count}
                CustomIcon={
                  <LocationIcon
                    width="1.0rem"
                    height="1.0rem"
                  />
                }
                color={item.locations_count > 0 ? "#0078d4" : "#bbb"}
                tooltip={`${t('inventory.locations')}: ${item.locations_count}`}
                containerClassName="border-gray-200 dark:border-gray-600"
              />
            </div>
          </div>

          <div className="flex flex-1 items-center justify-center">
            <Link
              key={item.id}
              to={`/inventory/locationzone/${item.id}`}
              className="flex flex-col items-center gap-2 no-underline"
            >
              <div id="link_container" className="flex flex-col items-center">
                <LocationZoneLogo color="#0078d4" />
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
                <EditButton<ILocationZoneEdit>
                  title={t('common.edit-modal-title', { title: item.title})}
                  form={LocationZoneForm}
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

export default LocationZoneCard;