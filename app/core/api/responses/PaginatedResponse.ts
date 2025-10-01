export interface PaginatedResponse<T> {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: T;
}

export interface MainResponse<T>{
  data?: PaginatedResponse<T>;
  errors?: string[];
  message?: string;
  status: number;
  statusText: string;
  headers: any;
  config: any;
  request?: any;
}
  