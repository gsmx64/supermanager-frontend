import { GenericService } from "@/core/services/GenericService";
import type ILocation from "@/features/inventory/interfaces/locations.interface";


const create = async (data: ILocation) => {
  const endpoint = `locations`;
  const service = new GenericService<ILocation>(endpoint);

  return await service.save(data);
};

const update = async (id: number, data: any) => {
  const endpoint = `locations/${id}/`;
  const service = new GenericService<ILocation>(endpoint);

  return await service.patch(data);
};

const remove = async (id: number) => {
  const endpoint = `/locations`;
  const service = new GenericService<ILocation>(endpoint);

  return await service.remove(id);
};

const get = async (id: number) => {
  const endpoint = `locations`;
  const service = new GenericService<ILocation>(endpoint);

  return await service.getById(id);
};

const getAll = async (
    currentPage: number,
    itemsPerPage: number,
    itemsOrdering: string | undefined = undefined
) => {
  let queryParams: string[] = [];
  if (currentPage) queryParams.push(`page=${currentPage}`);
  if (itemsPerPage) queryParams.push(`limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`);
  if (itemsOrdering != undefined) queryParams.push(`ordering=${itemsOrdering}`);
  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  const endpoint = `locations/${queryString}`;
  const service = new GenericService<ILocation[]>(endpoint);
  return await service.getList();
};

const getByLocationZone = async (
    locationZoneId: number,
    currentPage: number,
    itemsPerPage: number,
    itemsOrdering: string | undefined = undefined
) => {
  let queryParams: string[] = [];
  if (currentPage) queryParams.push(`page=${currentPage}`);
  if (itemsPerPage) queryParams.push(`limit=${itemsPerPage}`);
  if (itemsOrdering != undefined) queryParams.push(`ordering=${itemsOrdering}`);
  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  const endpoint = `location-zones/${locationZoneId}/locations/${queryString}`;
  const service = new GenericService<ILocation[]>(endpoint);
  return await service.getList();
};

const LocationsService = {
  create,
  update,
  remove,
  get,
  getAll,
  getByLocationZone
};

export default LocationsService;