export interface ApiConfig {
  baseURL: string;
  withCredentials: boolean;
  withXSRFToken: boolean;
  timeout: number;
  headers: Record<string, string>;
}