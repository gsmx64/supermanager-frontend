import axios, { AxiosError } from "axios";

import { defaultApiConfig, getApiConfig, setApiConfig } from "@/core/api/config";
import TokenService from "@/core/features/auth/services/token.service";
import toToast from "@/core/utils/toToast";


type ProblemErrorItem = {
  Property?: string;
  Errors?: string[];
  code?: string;
  name?: string;
};

const config = defaultApiConfig();
setApiConfig(config)
const apiConfig = getApiConfig();
const api = axios.create({ ...apiConfig });

let isRefreshing = false;

type FailedRequest<TError = unknown> = {
  resolve: (token: string | null) => void;
  reject: (error: TError) => void;
};

let failedQueue: FailedRequest<AxiosError | Error>[] = [];

const processQueue = (
  error: AxiosError | Error | null,
  token: string | null = null
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = TokenService.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // If the token has expired and has not been retried
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string | null) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = TokenService.getRefreshToken();
        if (!refreshToken) {
          TokenService.clearToken();
          window.location.href = '/auth/login';
          toToast({
            description: `No refresh token available.`,
            title: "Error: ",
            color: "danger",
          });
          return Promise.reject(new Error('No refresh token available'));
        }

        const response = await axios.post('/auth/token/refresh/', {
          refresh: refreshToken,
        });

        const { access: accessToken, refresh: newRefreshToken, exp: newExp, user: user } = response.data;
        TokenService.setToken(accessToken, newRefreshToken, newExp, user);
        processQueue(null, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError | Error | null, null);
        TokenService.clearToken();
        window.location.href = '/auth/login';
        toToast({
          description: `No refresh token available. Error: ${refreshError}`,
          title: "Error: ",
          color: "danger",
        });
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    } else if (err.response?.status === 400) {
      handle400Error(err.response.data);
      return err.response;
      //return Promise.resolve(undefined);
    }

    return Promise.reject(err);
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handle400Error(data: any) {
  if (Array.isArray(data?.Errors)) {
    (data.Errors as ProblemErrorItem[]).forEach((item) => {
      (item.Errors ?? []).forEach(
        (msg) => 
        toToast({
          description: `${msg}`,
          title: "Error: ",
          color: "danger",
        })
      );
    });
    return;
  }

  if (Array.isArray(data)) {
    data.forEach((res: { code: string; name: string }) => {
      toToast({
        description: `${res.code}: ${res.name}`,
        title: "Error: ",
        color: "danger",
      });
    });
  } else if (data?.errors && Array.isArray(data.errors)) {
    data.errors.forEach((res: { code: string; name: string }) => {
      toToast({
        description: `${res.code}: ${res.name}`,
        title: "Error: ",
        color: "danger",
      });
    });
  } else if (typeof data?.errors === "object" && data.errors !== null) {
    const entries = Object.entries(data.errors) as [string, string[]][];
    entries.forEach(([field, messages]) => {
      messages.forEach((msg) => {
        toToast({
          description: `${field}: ${msg}`,
          title: "Error: ",
          color: "danger",
        });
      });
    });
    return;
  } else if (data?.code && data?.name) {
    toToast({
      description: `${data.code}: ${data.name}`,
      title: "Error: ",
      color: "danger",
    });
  } else if (data?.detail) {
    toToast({
      description: data.detail,
      title: "Error: ",
      color: "danger",
    });
  } else {
    toToast({
      description: "Invalid request. Please check your information.",
      title: "Error: ",
      color: "danger",
    });
    console.error("Unhandled 400 error structure:", data);
  }
}

export default api;
