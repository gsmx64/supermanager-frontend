import { useContext } from "react";
import { Link } from "react-router";
import { Chip, Tooltip } from "@heroui/react";
import { useTranslation } from "react-i18next";

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import DeviceLogo from "@/features/inventory/components/logos/DeviceLogo";
import SerialIcon from "@/features/inventory/components/icons/SerialIcon";
import NetworkConectivity from "@/core/components/buttons/NetworkConectivity";
import ActionButton from "@/core/components/buttons/ActionButton";
import EditButton from "@/core/components/buttons/EditButton";
import DeviceForm from "@/features/inventory/forms/DeviceForm";
import type IDevice from "@/features/inventory/interfaces/devices.interface";
import type { IDeviceEdit } from "@/features/inventory/interfaces/devices.interface";
import DeleteButton from "@/core/components/buttons/DeleteButton";
import StatusButton from "@/core/components/buttons/StatusButton";


export interface DeviceCardProps {
  item: IDevice;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  handleStatus?: (id: number, status: number, title: string) => void;
    handleEdit: (id: number, data: IDevice) => void;
    handleDelete: (id: number) => void;
    handleRefresh: (value: boolean) => void;
}

const DeviceCard = ({
  item,
  style,
  containerClassName,
  containerStyle,
  handleStatus,
  handleEdit,
  handleDelete,
  handleRefresh
}: DeviceCardProps) => {
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
          <div id="top_left" className="flex items-center">
            <div
              className="flex items-center px-2 py-1 rounded-full text-blue-700 dark:text-blue-500 text-md font-semibold border-2 border-blue-700 dark:border-blue-500 font-extrabold"
            >
              {item.internal_id}
            </div>
            <NetworkConectivity
              ipv4={item.network_ipv4}
              style={style}
            />
          </div>
          <div id="top_right" className="flex items-center">
            <StatusButton
              id={item.id}
              title={item.hostname}
              status={item.status}
              handleStatus={handleStatus != null ? handleStatus : () => {}}
              handleRefresh={handleRefresh}
            />
          </div>
        </div>

        <Tooltip
          color="primary"
          content={item.notes ? item.notes : t('inventory.devices-title')}
          showArrow={true}
        >
          <div className="flex flex-1 items-center justify-center">
            <Link
              key={item.id}
              to={`/inventory/device/${item.id}`}
              className="flex flex-col items-center gap-2 no-underline"
            >
              <div id="link_container" className="flex flex-col items-center">
                <DeviceLogo />
                <span
                  className="font-semibold text-lg text-gray-900 dark:text-gray-100 text-center line-clamp-2 max-h-[2.8em] overflow-hidden"
                >
                  {item.type.title} {item.hostname}
                </span>
                <span
                  className="font-semibold text-lg text-gray-900 dark:text-gray-100 text-center line-clamp-2 max-h-[2.8em] overflow-hidden"
                >
                  {item.mark.title} {item.model.title}
                </span>
              </div>
            </Link>
          </div>
        </Tooltip>

        <div className="flex justify-between items-end w-full mt-2">
          <div id="bottom_left" className="flex items-center">
            <Chip
              avatar={<SerialIcon color="#000000" />}
              variant="flat"
              className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-300"
            >
              {item.serial}
            </Chip>
          </div>
          <div id="bottom_right" className="flex items-center">
            {(isStaff || isAdmin) && (
              <EditButton<IDeviceEdit>
                title={t('common.edit-modal-title', { title: item.hostname})}
                form={DeviceForm}
                formProps={{
                  id: item.id,
                  item,
                  handleEdit,
                  handleRefresh
                }}
              />
            )}  
            {(isStaff || isAdmin) && (
              <DeleteButton
                id={item.id}
                title={item.hostname}
                handleDelete={handleDelete}
                handleRefresh={handleRefresh}
              />
            )}
            <ActionButton
              id={item.id}
              color={"#0078d4"}
              style={style}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeviceCard;