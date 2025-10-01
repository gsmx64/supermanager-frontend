import { GenericService } from "@/core/services/GenericService";
import type IDeviceModels from "@/features/settings/inventory/interfaces/deviceModels.interface";


const create = async (data: IDeviceModels) => {
  const endpoint = `device-models`;
  const service = new GenericService<IDeviceModels>(endpoint);

  return await service.save(data);
};

const update = async (id: number, data: any) => {
  const endpoint = `device-models/${id}/`;
  const service = new GenericService<IDeviceModels>(endpoint);

  return await service.update(data);
};

const remove = async (id: number) => {
  const endpoint = `/device-models`;
  const service = new GenericService<IDeviceModels>(endpoint);

  return await service.remove(id);
};

const get = async (id: number) => {
  const endpoint = `device-models`;
  const service = new GenericService<IDeviceModels>(endpoint);

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

  const endpoint = `device-models/${queryString}`;
  const service = new GenericService<IDeviceModels[]>(endpoint);
  return await service.getList();
};

const DeviceModelsService = {
  create,
  update,
  remove,
  get,
  getAll
};

export default DeviceModelsService;