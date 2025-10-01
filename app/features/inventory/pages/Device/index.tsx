import { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next"

import { AuthContext } from "@/core/features/auth/contexts/auth.context";
import useDevicesStore from "@/features/inventory/state/stores/devices.store";
import SectionTitle from "@/core/components/ui/SectionTitle";
import DeviceIcon from "@/features/inventory/components/icons/DeviceIcon";
import TypeInfo from "@/features/inventory/pages/Device/components/TypeInfo";
import TitleInfo from "@/features/inventory/pages/Device/components/TitleInfo";
import StorageStatus from "@/features/inventory/pages/Device/components/StorageStatus";
import SoftwareStatus from "@/features/inventory/pages/Device/components/SoftwareStatus";
import NetworkConectivity from "@/core/components/buttons/NetworkConectivity";
import CreatorCard from "@/core/components/cards/CreatorCard";
import EditButton from "@/core/components/buttons/EditButton";
import DeleteButton from "@/core/components/buttons/DeleteButton";
import ActionButton from "@/core/components/buttons/ActionButton";
import DeviceForm from "@/features/inventory/forms/DeviceForm";
import { dateTimeFormat } from "@/core/utils/dateFormat";
import type { IDeviceEdit } from "@/features/inventory/interfaces/devices.interface";
import type { Route } from ".react-router/types/app/features/inventory/pages/Device/+types";
import StatusButton from "@/core/components/buttons/StatusButton";
import { Divider } from "@heroui/react";


interface DeviceParams {
  deviceId: string | number;
}

const Device = ({
  params,
}: Route.ComponentProps & { params: DeviceParams }) => {
  const { t } = useTranslation();
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const authData = useContext(AuthContext);
  const { isAdmin, isStaff } = authData;

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const device = useDevicesStore((state) => state.device);
  const fetchDevice = useDevicesStore((state) => state.fetchDevice);
  const handleStatus = useDevicesStore((state) => state.handleStatus);
  const handleEdit = useDevicesStore((state) => state.handleEdit);
  const handleDelete = useDevicesStore((state) => state.handleDelete);

  useEffect(() => {
    fetchDevice(Number(params.deviceId));
  }, [isRefreshing]);

  return (
    <div className="min-h-screen transition-colors">
      <SectionTitle
        title={t('inventory.device-title', { internalId: device.internal_id ? device.internal_id : device.hostname })}
        description={t('inventory.device-description', { location: device.location })}
      />

      <div className="flex flex-col lg:flex-row gap-8 mt-6">

        {/* Left Side */}
        <div className="flex flex-col items-center lg:w-1/3 w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-4 border border-indigo-100 dark:border-indigo-900">
          <div className="flex justify-between items-start w-full">
            <div id="top_left" className="flex items-center">
              <NetworkConectivity
                ipv4={device.network_ipv4}
              />
            </div>
            <div id="top_right" className="flex items-center">
              <StatusButton
                id={device.id}
                title={device.hostname}
                status={device.status}
                handleStatus={handleStatus != null ? handleStatus : () => {}}
                handleRefresh={handleRefresh}
              />
              <Divider orientation="vertical" className="mx-1" />
              {(isStaff || isAdmin) && (
                <EditButton<IDeviceEdit>
                  title={t('common.edit-modal-title', { title: device.hostname})}
                  form={DeviceForm}
                  formProps={{
                    id: device.id,
                    device,
                    handleEdit,
                    handleRefresh
                  }}
                />
              )}  
              {(isStaff || isAdmin) && (
                <DeleteButton
                  id={device.id}
                  title={device.hostname}
                  handleDelete={handleDelete}
                  handleRefresh={handleRefresh}
                />
              )}
              <ActionButton
                id={device.id}
                color={"#0078d4"}
              />
            </div>
          </div>

          <div className="mb-6">
            <DeviceIcon className="w-28 h-28 text-indigo-400 dark:text-indigo-300 drop-shadow-lg" />
          </div>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-400">{device.internal_id}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{device.hostname}</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">{device.location.title}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            <TitleInfo title={
              (device.updater?.id !== undefined && device.updater?.id !== null)
              ? t('inventory.device-info-updater')
              : t('inventory.device-info-creator')}
            />
            {(device.updater?.id !== undefined && device.updater?.id !== null) ? (
              <CreatorCard
                user={device.updater}
                date={t('common.table-updated-at-date', { date: dateTimeFormat(device.updated_at, t('locale')) })}
                profileRedirect={true}
                containerClassName="mt-2"
              />
            ) : (
              <CreatorCard
                user={device.creator}
                date={t('common.table-created-at-date', { date: dateTimeFormat(device.created_at, t('locale')) })}
                profileRedirect={true}
                containerClassName="mt-2"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-6">
            <TitleInfo title={t('inventory.device-info-user')} />
            <TypeInfo title={t('inventory.owner')} item={device.user_owner} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-6">
            <TitleInfo title={t('inventory.device-info-notes')} />
            <TypeInfo item={device.notes} />
          </div>
        </div>

        {/* Center Side */}
        <div className="lg:w-1/3 w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 border border-indigo-100 dark:border-indigo-900">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            <TitleInfo title={t('inventory.device-info-device')} />
            <TypeInfo title={t('inventory.type')} item={device.type.title} />
            <TypeInfo title={t('inventory.mark')} item={device.mark.title} />
            <TypeInfo title={t('inventory.model')} item={device.model.title} />
            <TypeInfo title={t('inventory.processor')} item={device.processor.title} />
            <TypeInfo title={t('inventory.ram')} item={device.ram.title} />
            <TypeInfo title={t('inventory.serial')} item={device.serial} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-6">
            <TitleInfo title={t('inventory.device-info-storage')} />
            <TypeInfo title={t('inventory.disk')} item={device.disk.title} />
            <TypeInfo title={t('inventory.disk-internal-id')} item={device.disk_internal_id} />
            <TypeInfo title={t('inventory.disk-serial')} item={device.disk_serial} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-6">
            <TitleInfo title={t('inventory.device-info-system')} />
            <TypeInfo title={t('inventory.system')} item={device.system.title} />
            <TypeInfo title={t('inventory.build')} item={device.build.title} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-6">
            <TitleInfo title={t('inventory.device-info-network')} />
            <TypeInfo title={t('inventory.ipv4')} item={device.network_ipv4} />
            <TypeInfo title={t('inventory.ipv6')} item={device.network_ipv6} />
            <TypeInfo title={t('inventory.mac')} item={device.network_mac} />
            <TypeInfo title={t('inventory.remote-id')} item={device.remote_id} />
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/3 w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 border border-indigo-100 dark:border-indigo-900 flex flex-col items-center justify-top">
          
          {/* Modules */}
          <StorageStatus />
          <SoftwareStatus />
          
        </div>
      </div>
    </div>
  );
}

export default Device;