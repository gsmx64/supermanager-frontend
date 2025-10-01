import { GenericService } from "@/core/services/GenericService";
import type IDevice from "@/features/inventory/interfaces/devices.interface";


const create = async (data: IDevice) => {
  const endpoint = `devices`;
  const service = new GenericService<IDevice>(endpoint);

  return await service.save(data);
};

const update = async (id: number, data: any) => {
  const endpoint = `devices/${id}/`;
  const service = new GenericService<IDevice>(endpoint);

  return await service.patch(data);
};

const remove = async (id: number) => {
  const endpoint = `/devices`;
  const service = new GenericService<IDevice>(endpoint);

  return await service.remove(id);
};

const get = async (id: number) => {
  const endpoint = `devices`;
  const service = new GenericService<IDevice>(endpoint);

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

  const endpoint = `devices/${queryString}`;
  const service = new GenericService<IDevice[]>(endpoint);
  return await service.getList();
};

const getByLocation = async (
    locationId: number,
    currentPage: number,
    itemsPerPage: number,
    itemsOrdering: string | undefined = undefined
) => {
  let queryParams: string[] = [];
  queryParams.push(`location=${locationId}`);
  if (currentPage) queryParams.push(`page=${currentPage}`);
  if (itemsPerPage) queryParams.push(`limit=${itemsPerPage}`);
  if (itemsOrdering != undefined) queryParams.push(`ordering=${itemsOrdering}`);
  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  const endpoint = `devices/${queryString}`;
  const service = new GenericService<IDevice[]>(endpoint);
  return await service.getList();
};

const DevicesService = {
  create,
  update,
  remove,
  get,
  getAll,
  getByLocation
};

export default DevicesService;