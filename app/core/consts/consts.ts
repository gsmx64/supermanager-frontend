//# CORE CONSTANTS #//

//# BRANDING #//
export const CORE_BRAND = import.meta.env.VITE_APP_NAME || "SuperManager";

//# API #//
export const CORE_API_URL = import.meta.env.VITE_API_URL;
export const CORE_API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 5000; // Default to 5 seconds if not set
export const CORE_CORS_ORIGIN = import.meta.env.VITE_CORS_ORIGIN || '*';
export const CORE_CORS_WITH_CREDENTIALS = (import.meta.env.VITE_CORS_WITH_CREDS === 'true') || true;
export const CORE_CORS_WITH_XSRF_TOKEN = (import.meta.env.VITE_CORS_WITH_XSRF_TOKE === 'true') || true;

//# STORAGE #//
export const CORE_STORAGE_URL = import.meta.env.VITE_STORAGE_URL || '';

//# ALERTS #//
export const CORE_NOTIFICATIONS_ALERTS_MAX = 10;

//# TOASTS #//
export const CORE_TOAST_DEFAULT_TIMEOUT = import.meta.env.VITE_TOAST_TIMEOUT || 3500;

//# ITEMS #//
export const CORE_ITEMS_MIN_TITLE_LENGTH = 4;
export const CORE_ITEMS_MAX_TITLE_LENGTH = 120;
export const CORE_ITEMS_MIN_CODE_NAME_LENGTH = 2;
export const CORE_ITEMS_MAX_CODE_NAME_LENGTH = 50;

//# USERS #//
export const CORE_USERS_CAN_CHANGE_USERNAME = false;
export const CORE_USERS_MIN_USERNAME_LENGTH = 5;
export const CORE_USERS_MAX_USERNAME_LENGTH = 20;
export const CORE_USERS_MIN_PASSWORD_LENGTH = 8;
export const CORE_USERS_MAX_PASSWORD_LENGTH = 128;
export const CORE_USERS_MIN_EMAIL_LENGTH = 4;
export const CORE_USERS_MAX_EMAIL_LENGTH = 120;
export const CORE_USERS_MIN_NAME_LENGTH = 4;
export const CORE_USERS_MAX_NAME_LENGTH = 120;

//# TODO: GET FROM USER CONFIG #//
export const CORE_USER_DEFAULT_LANGUAGE = 'en'; // en or es
export const CORE_USER_DATE_FORMAT = '2-digit'; // numeric or 2-digit
export const CORE_USER_MONTH_FORMAT = '2-digit'; // numeric or 2-digit
export const CORE_USER_YEAR_FORMAT = 'numeric'; // numeric or 2-digit
export const CORE_USER_TIMEZONE = 'America/New_York';
export const CORE_USER_24H_TIME = false;

//# PAGINATION #//
export const CORE_DEFAULT_PAGE_INDEX = 1;
export const CORE_DEFAULT_PAGE_SIZE = 10;
export const CORE_DEFAULT_ORDERING_COLUMN = 'created_at';
export const CORE_DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];

//# SEARCH #//
export const CORE_SEARCH_MIN_INPUT_LENGTH = 4;
export const CORE_SEARCH_MAX_INPUT_LENGTH = 120;