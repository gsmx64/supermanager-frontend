import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "@heroui/react";

import useLocationZonesStore from "@/features/inventory/state/stores/locationZones.store";
import SectionTitle from "@/core/components/ui/SectionTitle";
import TableLocationZones from "@/features/inventory/components/tables/TableLocationZones";
import SectionToolbar from "@/core/components/ui/SectionToolbar";
import CreateButton from "@/core/components/buttons/CreateButton";
import LocationZoneForm from "@/features/inventory/forms/LocationZoneForm";
import LocationZoneCard from "@/features/inventory/components/cards/LocationZoneCard";
import { LocationZoneColumns } from "@/features/inventory/interfaces/locationZones.interface";
import type ILocationZone from "@/features/inventory/interfaces/locationZones.interface";
import type { ILocationZoneCreate } from "@/features/inventory/interfaces/locationZones.interface";


const LocationZones = () => {
  const { t } = useTranslation();
  const [swapView, setSwapView] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const locationZones = useLocationZonesStore((state) => state.locationZones);
  const fetchLocationZones = useLocationZonesStore((state) => state.fetchLocationZones);
  const currentPage = useLocationZonesStore((state) => state.currentPage);
  const itemsPerPage = useLocationZonesStore((state) => state.itemsPerPage);
  const itemsOrdering = useLocationZonesStore((state) => state.itemsOrdering);
  const pageCount = useLocationZonesStore((state) => Math.ceil(state.count / state.itemsPerPage));
  const count = useLocationZonesStore((state) => state.count);
  const setCurrentPage = useLocationZonesStore((state) => state.setCurrentPage);
  const handleStatus = useLocationZonesStore((state) => state.handleStatus);
  const handleCreate = useLocationZonesStore((state) => state.handleCreate);
  const handleEdit = useLocationZonesStore((state) => state.handleEdit);
  const handleDelete = useLocationZonesStore((state) => state.handleDelete);

  useEffect(() => {
    fetchLocationZones(currentPage, itemsPerPage, itemsOrdering);
  }, [isRefreshing, currentPage]);

  return (
    <>
      <SectionTitle
        title={t('inventory.location-zones-title')}
        description={t('inventory.location-zones-description')}
      />

      <SectionToolbar
        count={count}
        swapView={swapView}
        setSwapView={setSwapView}
        CreateButton={CreateButton<ILocationZoneCreate>}
        CreateButtonProps={{
          title: t('inventory.new-location-zone'),
          form: LocationZoneForm,
          formProps: {
            item: {} as ILocationZone,
            handleCreate,
            handleRefresh
          }
        }}
      />

      {(swapView) ?
      (
        <TableLocationZones
          columns={LocationZoneColumns}
          data={locationZones}
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
            {(locationZones && locationZones.length === 0) ? (
              <div className="w-full text-center p-4 italic text-gray-500">
                {t('common.table-no-data')}
              </div>
            ) : 
            locationZones.map((item: ILocationZone, idx: number) => (
              <LocationZoneCard
                key={idx}
                item={item as ILocationZone}
                handleStatus={handleStatus}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleRefresh={handleRefresh}
              />
            ))}
          </div>
          <div className="flex justify-center items-center mt-4 flex-wrap gap-4">
            {(locationZones && locationZones.length > 0) && (
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

export default LocationZones;