import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import type { MainResponse, PaginatedResponse } from "@/core/api/responses/PaginatedResponse";


export interface IGenericService<T>{
    save: (model: T) =>  Promise<ISingleResponse<T>>;
    postWithResponse: <T2>(model: T) => Promise<ISingleResponse<T2>>;
    update: (model: T) => Promise<ISingleResponse<T>>;
    remove: (id: number) =>  Promise<ISingleResponse<T>>;
    getById: (id: number) =>  Promise<ISingleResponse<T>>;
    getList: () => Promise<PaginatedResponse<T>>;
    getByFilter:(
        parentId: string | undefined,
        parentParameterName: string | undefined,
        page: number,
        pageSize: number,
        search: string | "",
        isAll: boolean
    ) => Promise<MainResponse<T>>;
}
