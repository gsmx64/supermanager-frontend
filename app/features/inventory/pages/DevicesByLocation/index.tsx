import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "@heroui/react";

import useLocationsStore from "@/features/inventory/state/stores/locations.store";
import useDevicesStore from "@/features/inventory/state/stores/devices.store";
import SectionTitle from "@/core/components/ui/SectionTitle";
import TableDevices from "@/features/inventory/components/tables/TableDevices";
import { Spinner } from "@/core/components/ui/Spinner";
import { DeviceColumns } from "@/features/inventory/interfaces/devices.interface";
import SectionToolbar from "@/core/components/ui/SectionToolbar";
import CreateButton from "@/core/components/buttons/CreateButton";
import DeviceForm from "@/features/inventory/forms/DeviceForm";
import DeviceCard from "@/features/inventory/components/cards/DeviceCard";
import type IDevice from "@/features/inventory/interfaces/devices.interface";
import type { IDeviceCreate } from "@/features/inventory/interfaces/devices.interface";
import type { Route } from ".react-router/types/app/features/inventory/pages/DevicesByLocation/+types/index";


export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation();
  return [
    { title: t('inventory.location') },
    { name: 'description', content: t('inventory.location-description') },
  ];
}


export function HydrateFallback() {
  return <Spinner />;
}


interface DevicesByLocationParams {
  locationId: string | number;
}

const DevicesByLocation = ({
  params,
}: Route.ComponentProps & { params: DevicesByLocationParams }) => {
  const { t } = useTranslation();
  const [swapView, setSwapView] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const location = useLocationsStore((state) => state.location);
  const fetchLocation = useLocationsStore((state) => state.fetchLocation);
  const devices = useDevicesStore((state) => state.devices);
  const fetchDevicesByLocation = useDevicesStore((state) => state.fetchDevicesByLocation);
  const currentPage = useDevicesStore((state) => state.currentPage);
  const itemsPerPage = useDevicesStore((state) => state.itemsPerPage);
  const itemsOrdering = useDevicesStore((state) => state.itemsOrdering);
  const pageCount = useDevicesStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const count = useDevicesStore((state) => state.count);
  const setCurrentPage = useDevicesStore((state) => state.setCurrentPage);
  const handleStatus = useDevicesStore((state) => state.handleStatus);
  const handleCreate = useDevicesStore((state) => state.handleCreate);
  const handleEdit = useDevicesStore((state) => state.handleEdit);
  const handleDelete = useDevicesStore((state) => state.handleDelete);

  useEffect(() => {
    fetchLocation(Number(params.locationId));
    fetchDevicesByLocation(Number(params.locationId), currentPage, itemsPerPage, itemsOrdering);
  }, [isRefreshing, currentPage]);

  return (
    <>
      <SectionTitle
        title={t('inventory.devices-at-location-title', { location: location?.title })}
        description={t('inventory.devices-at-location-description', { location: location?.title })}
      />

      <SectionToolbar
        count={count}
        swapView={swapView}
        setSwapView={setSwapView}
        CreateButton={CreateButton<IDeviceCreate>}
        CreateButtonProps={{
          title: t('inventory.new-device'),
          form: DeviceForm,
          formProps: {
            item: {} as IDevice,
            handleCreate,
            handleRefresh
          }
        }}
      />

      {(swapView) ?
      (
        <TableDevices
          columns={DeviceColumns}
          data={devices}
          currentPage={currentPage}
          pageCount={pageCount}
          setCurrentPage={setCurrentPage}
          handleStatus={handleStatus}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleRefresh={handleRefresh}
        />
      ) : (
        <>
          <div className="flex justify-start items-stretch flex-wrap gap-4 mt-4">
            {(devices && devices.length === 0) ? (
              <div className="w-full text-center p-4 italic text-gray-500">
                {t('common.table-no-data')}
              </div>
            ) : 
            devices.map((item: IDevice, idx: number) => (
              <DeviceCard
                key={idx}
                item={item as IDevice}
                handleStatus={handleStatus}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleRefresh={handleRefresh}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
            {(devices && devices.length > 0) && (
              <Pagination
                isCompact
                showControls
                page={currentPage}
                total={pageCount}
                onChange={(page) => {
                  setCurrentPage(page);
                }}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default DevicesByLocation;