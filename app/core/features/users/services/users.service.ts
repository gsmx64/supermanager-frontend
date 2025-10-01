import { GenericService } from "@/core/services/GenericService";
import type {
  IUserActive,
  IUserExtended,
  IUserChangePassword,
  IUserRegister
} from "@/core/features/users/interfaces/user.interface";


const create = async (data: IUserRegister) => {
  const endpoint = '/users';
  const service = new GenericService<IUserRegister>(endpoint);

  return await service.save(data);
};

const update = async (id: number, data: IUserExtended) => {
  const endpoint = `users/${id}/`;
  const service = new GenericService<IUserExtended>(endpoint);

  return await service.patch(data);
};

const updateActive = async (id: number, data: IUserActive) => {
  const endpoint = `users/${id}/`;
  const service = new GenericService<IUserActive>(endpoint);

  return await service.update(data);
};

const updateOwnPassword = async (data: IUserChangePassword) => {
  const endpoint = `auth/change-password`;
  const service = new GenericService<IUserChangePassword>(endpoint);

  return await service.save(data);
};

const updateUsersPassword = async (data: IUserChangePassword) => {
  const endpoint = `auth/admin/change-password`;
  const service = new GenericService<IUserChangePassword>(endpoint);

  return await service.save(data);
};

const remove = async (id: number) => {
  const endpoint = '/users';
  const service = new GenericService<IUserExtended>(endpoint);

  return await service.remove(id);
};

const get = async (id: number) => {
  const endpoint = 'users';
  const service = new GenericService<IUserExtended>(endpoint);

  return await service.getById(id);
};

const getProfile = async () => {
  const endpoint = '/profile/';
  const service = new GenericService<IUserExtended>(endpoint);
  return await service.get();
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

  const endpoint = `users/${queryString}`;
  const service = new GenericService<IUserExtended[]>(endpoint);
  return await service.getList();
};

const UsersService = {
  create,
  update,
  updateActive,
  updateOwnPassword,
  updateUsersPassword,
  remove,
  get,
  getProfile,
  getAll
};

export default UsersService;