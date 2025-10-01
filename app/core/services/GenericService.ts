
import api from "@/core/api/axios";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import type { MainResponse, PaginatedResponse } from "@/core/api/responses/PaginatedResponse";
import type { IGenericService } from "@/core/services/IGenericService";

export class GenericService<TModel, TModel2 = TModel> implements IGenericService<TModel> {
  private basePath: string;
  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async save(model: TModel): Promise<ISingleResponse<TModel>> {
    const response = await api.post(`${this.basePath}/`, model);
    return response;
  }

  async postWithResponse<T2 = TModel2>(model: TModel): Promise<ISingleResponse<T2>> {
    const response = await api.post(`${this.basePath}/`, model);
    return response;
  }

  async patch(model: TModel): Promise<ISingleResponse<TModel>> {
    const response = await api.patch(`${this.basePath}`, model);
    return response;
  }

  async update(model: TModel): Promise<ISingleResponse<TModel>> {
    const response = await api.put(`${this.basePath}`, model);
    return response;
  }

  async remove(id: number): Promise<ISingleResponse<TModel>> {
    const response = await api.delete(`${this.basePath}/${id}/`);
    return response;
  }

  async get(): Promise<ISingleResponse<TModel>> {
    const response = await api.get(`${this.basePath}`);
    return response;
  }

  async getById(id: number): Promise<ISingleResponse<TModel>> {
    const response = await api.get(`${this.basePath}/${id}/`);
    return response;
  }

  async getList(): Promise<PaginatedResponse<TModel>> {
    const response = await api.get(this.basePath);
    return response.data;
  }

  async getByFilter(
    parentId: string | undefined,
    parentParameterName: string | undefined,
    page: number,
    pageSize: number,
    search: string,
    isAll: boolean,
  ): Promise<MainResponse<TModel>> {
    const query = new URLSearchParams();
    query.append("pageIndex", page.toString());
    query.append("pageSize", pageSize.toString());
    query.append("search", search);
    query.append("IsAllItems", isAll ? "true" : "false");
    if (parentParameterName) {
      query.append(parentParameterName, parentId!);
    }
    const response = await api.get<MainResponse<TModel>>(
      `${this.basePath}/list?${query.toString()}`
    );
    return response.data;
  }
}
