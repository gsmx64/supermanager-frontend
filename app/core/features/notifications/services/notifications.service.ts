import { GenericService } from "@/core/services/GenericService";
import type INotification from "@/core/features/notifications/interfaces/notifications.interface";
import { CORE_NOTIFICATIONS_ALERTS_MAX } from "@/core/consts/consts";


const create = async (data: INotification) => {
  const endpoint = `notifications`;
  const service = new GenericService<INotification>(endpoint);

  return await service.save(data);
};

const update = async (id: number, data: any) => {
  const endpoint = `notifications/${id}/`;
  const service = new GenericService<INotification>(endpoint);

  return await service.update(data);
};

const remove = async (id: number) => {
  const endpoint = `/notifications`;
  const service = new GenericService<INotification>(endpoint);

  return await service.remove(id);
};

const get = async (id: number) => {
  const endpoint = `notifications`;
  const service = new GenericService<INotification>(endpoint);

  return await service.getById(id);
};

const getAll = async (
    currentPage: number,
    itemsPerPage: number,
    itemsOrdering: string | undefined
) => {
  let queryParams: string[] = [];
  if (currentPage) queryParams.push(`page=${currentPage}`);
  if (itemsPerPage) queryParams.push(`limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`);
  if (itemsOrdering != undefined) queryParams.push(`ordering=${itemsOrdering}`);
  const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

  const endpoint = `notifications/${queryString}`;
  const service = new GenericService<INotification[]>(endpoint);
  return await service.getList();
};

const getAlerts = async () => {
  const queryString = `?page=1&limit=${CORE_NOTIFICATIONS_ALERTS_MAX}&status=1&ordering=-created_at`;
  const endpoint = `notifications/${queryString}`;
  const service = new GenericService<INotification[]>(endpoint);

  return await service.getList();
};

const NotificationsService = {
  create,
  update,
  remove,
  get,
  getAll,
  getAlerts
};

export default NotificationsService;