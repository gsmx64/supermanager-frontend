export const requiredValidator = (
  message = 'This field is required.'
) => (val: string | number | boolean) =>
  !val || val.toString().trim() === '' || val.toString().trim() === undefined || val.toString().trim() === null ? message : null;

export const isNumberValidator = (
  message = 'This field must be a number.'
) => (val: string | number | boolean) =>
  isNaN(Number(val)) ? message : null;

export const minLengthValidator = (
  min: number,
  message?: string
) => (val: string) =>
  val.length < min ? message ?? `Cannot be shorter than ${min} characters.` : null;

export const maxLengthValidator = (
  max: number,
  message?: string
) => (val: string) =>
  val.length > max ? message ?? `Cannot be longer than ${max} characters.` : null;

export const isEmailValidator = (
  message = 'Please enter a valid email.'
) => (val: string) =>
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ? message : null;

export const matchPasswordsValidator = (
  theOtherValue: string | number | boolean,
  message = 'Passwords do not match.'
) => (val: string | number | boolean): string | null =>
  !val || !theOtherValue || val !== theOtherValue ? message : null;

export const adminUsernameTakenValidator = (
  message = 'This username is already taken.'
) => (val: string | number | boolean): string | null =>
  !val || val !== 'admin' ? message : null;
