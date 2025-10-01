import type { ApiConfig } from "@/core/api/ApiConfig";
import {
  CORE_API_URL,
  CORE_CORS_WITH_CREDENTIALS,
  CORE_CORS_WITH_XSRF_TOKEN,
  CORE_API_TIMEOUT,
  CORE_CORS_ORIGIN
} from "@/core/consts/consts";

let config: ApiConfig;

export const defaultApiConfig = () => {
  const conf = {
    baseURL: CORE_API_URL,
    withCredentials: CORE_CORS_WITH_CREDENTIALS,
    withXSRFToken: CORE_CORS_WITH_XSRF_TOKEN,
    timeout: CORE_API_TIMEOUT,
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json;charset=utf-8",
      "Access-Control-Allow-Headers": "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method",
      "Access-Control-Allow-Origin": `${CORE_CORS_ORIGIN}`,
      "Access-Control-Allow-Credentials": "true",
    }
  }
  return conf;
}

export const setApiConfig = (conf: ApiConfig) => {
  config = conf;
};

export const getApiConfig = (): ApiConfig => {
  if (!config) {
    throw new Error("ApiConfig has not been set. Call setApiConfig() first.");
  }
  return config;
};