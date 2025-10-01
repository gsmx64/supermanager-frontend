import { GenericService } from "@/core/services/GenericService";
import type ILocationZone from "@/features/inventory/interfaces/locationZones.interface";


const create = async (data: ILocationZone) => {
  const endpoint = `location-zones`;
  const service = new GenericService<ILocationZone>(endpoint);

  return await service.save(data);
};

const update = async (id: number, data: any) => {
  const endpoint = `location-zones/${id}/`;
  const service = new GenericService<ILocationZone>(endpoint);

  return await service.update(data);
};

const remove = async (id: number) => {
  const endpoint = `/location-zones`;
  const service = new GenericService<ILocationZone>(endpoint);

  return await service.remove(id);
};

const get = async (id: number) => {
  const endpoint = `location-zones`;
  const service = new GenericService<ILocationZone>(endpoint);

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

  const endpoint = `location-zones/${queryString}`;
  const service = new GenericService<ILocationZone[]>(endpoint);
  return await service.getList();
};

const LocationZonesService = {
  create,
  update,
  remove,
  get,
  getAll
};

export default LocationZonesService;