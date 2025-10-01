import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "@heroui/react";

import useLocationZonesStore from "@/features/inventory/state/stores/locationZones.store";
import useLocationsStore from "@/features/inventory/state/stores/locations.store";
import SectionTitle from "@/core/components/ui/SectionTitle";
import TableLocations from "@/features/inventory/components/tables/TableLocations";
import { Spinner } from "@/core/components/ui/Spinner";
import { LocationColumns } from "@/features/inventory/interfaces/locations.interface";
import SectionToolbar from "@/core/components/ui/SectionToolbar";
import LocationCard from "@/features/inventory/components/cards/LocationCard";
import type ILocation from "@/features/inventory/interfaces/locations.interface";
import type { Route } from ".react-router/types/app/features/inventory/pages/LocationsByLocationZone/+types/index";


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


interface LocationsByLocationZoneParams {
  locationZoneId: string | number;
}

const LocationsByLocationZone = ({
  params,
}: Route.ComponentProps & { params: LocationsByLocationZoneParams }) => {
  const { t } = useTranslation();
  const [swapView, setSwapView] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const locationZone = useLocationZonesStore((state) => state.locationZone);
  const fetchLocationZone = useLocationZonesStore((state) => state.fetchLocationZone);
  const locations = useLocationsStore((state) => state.locations);
  const fetchLocationsByLocationZone = useLocationsStore((state) => state.fetchLocationsByLocationZone);
  const currentPage = useLocationsStore((state) => state.currentPage);
  const itemsPerPage = useLocationsStore((state) => state.itemsPerPage);
  const itemsOrdering = useLocationsStore((state) => state.itemsOrdering);
  const pageCount = useLocationsStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const count = useLocationsStore((state) => state.count);
  const setCurrentPage = useLocationsStore((state) => state.setCurrentPage);
  const handleStatus = useLocationsStore((state) => state.handleStatus);
  const handleCreate = useLocationsStore((state) => state.handleCreate);
  const handleEdit = useLocationsStore((state) => state.handleEdit);
  const handleDelete = useLocationsStore((state) => state.handleDelete);

  useEffect(() => {
    fetchLocationZone(Number(params.locationZoneId));
    fetchLocationsByLocationZone(Number(params.locationZoneId), currentPage, itemsPerPage, itemsOrdering);
  }, [isRefreshing, currentPage]);

  return (
    <>
      <SectionTitle
        title={t('inventory.devices-at-location-zone-title', { locationZone: locationZone?.title })}
        description={t('inventory.devices-at-location-zone-description', { locationZone: locationZone?.title })}
      />

      <SectionToolbar
        count={count}
        swapView={swapView}
        setSwapView={setSwapView}
      />

      {(swapView) ?
      (
        <TableLocations
          columns={LocationColumns}
          data={locations}
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
            {(locations && locations.length === 0) ? (
              <div className="w-full text-center p-4 italic text-gray-500">
                {t('common.table-no-data')}
              </div>
            ) : 
            locations.map((item: ILocation, idx: number) => (
              <LocationCard
                key={idx}
                item={item as ILocation}
                handleStatus={handleStatus}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleRefresh={handleRefresh}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
            {(locations && locations.length > 0) && (
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

export default LocationsByLocationZone;