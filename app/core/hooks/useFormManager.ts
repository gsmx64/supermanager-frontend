import { useState } from "react";
import { useDebouncedForFunc } from "./useDebouncedForFunc";

type Validator<T> = (value: string | number | boolean , form: T) => string | null;
type ValidationSchema<T> = { [K in keyof T]?: Validator<T>[] }; // Iterates over all properties of the object of type T (the form).
// Assigns to the K value. Can be thought of like a foreach. It's optional, doesn't have to work for every field.
// Validator<T>[] allows you to add multiple validators for each property.


export function useFormManager<T>(initialForm: T, schema: ValidationSchema<T>) {
  const [form, setForm] = useState<T>(initialForm);
  const [isValid, setIsValid] = useState(true);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string[]>>>({}); // Partial wraps all properties and makes them optional.
  // Record<keyof T, string[]>: Assigns all properties of the object of type T as string arrays, since the returned messages will be strings.
  const [touchedFields, setTouchedFields] = useState<
    Partial<Record<keyof T, boolean>>
  >({});

  const setFieldValue = <K extends keyof T>(field: K, value: T[K]) => {
    // <K extends keyof T> ensures that the given K value must belong to T (type-safe)
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  useDebouncedForFunc(
    () => {
      if (Object.values(touchedFields).some(Boolean)) {
        validate();
      }
    },
    [form],
    300
  );

  const validate = () => {
    const currentErrors: Partial<Record<keyof T, string[]>> = {};

    for (const key in schema) {
      if (!touchedFields[key as keyof T]) continue;

      const validators = schema[key];
      if (!validators) continue;

      const fieldErrors: string[] = [];

      for (const validator of validators) {
        const result = validator(form[key] as string | number | boolean, form);
        if (result) {
          fieldErrors.push(result);
        }
      }

      if (fieldErrors.length > 0) {
        currentErrors[key as keyof T] = fieldErrors;
      }
    }

    setErrors(currentErrors);
    const isValidNow = Object.keys(currentErrors).length === 0;
    setIsValid(isValidNow);
    return isValidNow;
  };

  return {
    form,
    setForm,
    setFieldValue,
    validate,
    errors,
    getFieldErrors: (field: keyof T) => errors[field] ?? [],
    getFirstError: (field: keyof T) => errors[field]?.[0] ?? null,
    isValid,
    reset: () => {
      setForm(initialForm);
      setErrors({});
      setTouchedFields({});
    },
  };
}
