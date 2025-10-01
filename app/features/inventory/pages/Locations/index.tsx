import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "@heroui/react";

import useLocationsStore from "@/features/inventory/state/stores/locations.store";
import SectionTitle from "@/core/components/ui/SectionTitle";
import TableLocations from "@/features/inventory/components/tables/TableLocations";
import SectionToolbar from "@/core/components/ui/SectionToolbar";
import CreateButton from "@/core/components/buttons/CreateButton";
import LocationForm from "@/features/inventory/forms/LocationForm";
import LocationCard from "@/features/inventory/components/cards/LocationCard";
import { LocationColumns } from "@/features/inventory/interfaces/locations.interface";
import type ILocation from "@/features/inventory/interfaces/locations.interface";
import type { ILocationCreate } from "@/features/inventory/interfaces/locations.interface";


const Locations = () => {
  const { t } = useTranslation();
  const [swapView, setSwapView] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);

    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  }, []);

  const locations = useLocationsStore((state) => state.locations);
  const fetchLocations = useLocationsStore((state) => state.fetchLocations);
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
    fetchLocations(currentPage, itemsPerPage, itemsOrdering);
  }, [isRefreshing, currentPage]);

  return (
    <>
      <SectionTitle
        title={t('inventory.locations-title')}
        description={t('inventory.locations-description')}
      />

      <SectionToolbar
        count={count}
        swapView={swapView}
        setSwapView={setSwapView}
        CreateButton={CreateButton<ILocationCreate>}
        CreateButtonProps={{
          title: t('inventory.new-location'),
          form: LocationForm,
          formProps: {
            item: {} as ILocation,
            handleCreate,
            handleRefresh
          }
        }}
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

export default Locations;