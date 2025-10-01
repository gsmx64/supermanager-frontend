export interface ISingleResponse<T>{
  data?: T;
  errors?: string[];
  message?: string;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}