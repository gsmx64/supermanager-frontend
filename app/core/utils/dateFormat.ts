import {
  fromDate,
  getLocalTimeZone,
  ZonedDateTime
} from "@internationalized/date";
import {
  CORE_USER_DATE_FORMAT,
  CORE_USER_MONTH_FORMAT,
  CORE_USER_YEAR_FORMAT,
  CORE_USER_24H_TIME,
  CORE_USER_TIMEZONE
} from "@/core/consts/consts";


export function dateTimeFormat(
  datetime: string,
  locale: string = 'en-US'
) {
  if (datetime === undefined || datetime === null) return '';
  const date = new Date(datetime);  

  return date.toLocaleString(locale, {
    year: CORE_USER_YEAR_FORMAT,
    month: CORE_USER_MONTH_FORMAT,
    day: CORE_USER_DATE_FORMAT,
    hour: 'numeric',
    minute: 'numeric',
    hour12: CORE_USER_24H_TIME,
    timeZone: CORE_USER_TIMEZONE
  });
};


export function dateFormat(
  date: string,
  locale: string = 'en-US'
) {
  if (!date || date === undefined || date === null) return '';
  const parsedDate = new Date(date);
  parsedDate.setMinutes(parsedDate.getMinutes() + parsedDate.getTimezoneOffset());

  return parsedDate.toLocaleString(locale, {
    year: CORE_USER_YEAR_FORMAT,
    month: CORE_USER_MONTH_FORMAT,
    day: CORE_USER_DATE_FORMAT,
  });
};

export function formatDateFromModel(
  date: string
): ZonedDateTime {
  const newDate = new Date(date + ' 00:00:00.000000');
  newDate.setMinutes(newDate.getMinutes() + newDate.getTimezoneOffset());

  return fromDate(newDate, getLocalTimeZone());
};


export function formatDateToModel(date: string): string {
  return String(date).split('T')[0];
}


export function formatDateToDateTime(date: string): string {
  return formatDateToModel(date) + ' 00:00:00.000000';
}
