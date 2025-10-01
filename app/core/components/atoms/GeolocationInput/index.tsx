import { Input } from "@heroui/react";
import { useTranslation } from "react-i18next";

import MarkerIcon from "@/core/components/icons/MarkerIcon";
import { isNumberValidator, requiredValidator } from "@/core/utils/FormsValidators";


type GeolocationInputProps = {
  latitudeFieldname: string;
  latitudeValue: number;
  latitudeLabel?: string;
  latitudePlaceholder?: string;
  longitudeFieldname: string;
  longitudeValue: number;
  longitudeLabel?: string;
  longitudePlaceholder?: string;
  validatorArray?: Array<'required' | 'number'>;
  isRequired?: boolean;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  className?: string;
  containerClassName?: string;
  setFieldValue: (field: any, value: any) => void;
  getFieldErrors: (field: any) => Array<string>;
  onPressButton?: boolean;
};

export const GeolocationInput = ({
  latitudeFieldname,
  latitudeValue,
  latitudeLabel,
  latitudePlaceholder,
  longitudeFieldname,
  longitudeValue,
  longitudeLabel,
  longitudePlaceholder,
  validatorArray,
  isRequired = false,
  isReadOnly = false,
  isDisabled = false,
  className,
  containerClassName,
  setFieldValue,
  getFieldErrors,
  onPressButton = false
}: GeolocationInputProps) => {
  const { t } = useTranslation();

  return (
  <div className={
    containerClassName ?
    containerClassName :
    "flex items-center gap-2"}
  >
    <span className="text-2xl text-red-600">
      <MarkerIcon />
    </span>

    <Input
      isRequired={isRequired ? true : false}
      isReadOnly={isReadOnly ? true : false}
      isDisabled={isDisabled ? true : false}
      name={latitudeFieldname}
      label={latitudeLabel ? latitudeLabel : t('common.latitude')}
      placeholder={latitudePlaceholder ? latitudePlaceholder : ''}
      type="number"
      variant="bordered"
      className={className ? className : "w-36 px-2 py-1"}
      defaultValue={String(latitudeValue)}
      onChange={(e) => {
        setFieldValue(
          latitudeFieldname,
          Number(e.currentTarget.value)
        );
      }}
      onError={() => {
        return getFieldErrors(latitudeFieldname);
      }}
      // Example for validator array: ['required', 'number'] or []
      validate={(value) => GeolocationInputValidation({value, validatorArray, onPressButton})}
    />

    <Input
      isRequired={isRequired ? true : false}
      isReadOnly={isReadOnly ? true : false}
      isDisabled={isDisabled ? true : false}
      name={longitudeFieldname}
      label={longitudeLabel ? longitudeLabel : t('common.longitude')}
      placeholder={longitudePlaceholder ? longitudePlaceholder : ''}
      type="number"
      variant="bordered"
      className={className ? className : "w-36 px-2 py-1"}
      defaultValue={String(longitudeValue)}
      onChange={(e) => {
        setFieldValue(
          longitudeFieldname,
          Number(e.currentTarget.value)
        );
      }}
      onError={() => {
        return getFieldErrors(longitudeFieldname);
      }}
      // Example for validator array: ['required', 'number'] or []
      validate={(value) => GeolocationInputValidation({value, validatorArray, onPressButton})}
    />
  </div>
  );
};

type GeolocationInputValidationProps = {
  value: string | number | boolean;
  validatorArray?: Array<'required' | 'number'>;
  onPressButton?: boolean;
};

export const GeolocationInputValidation = ({
  value,
  validatorArray,
  onPressButton
}: GeolocationInputValidationProps) => {
  if (
    validatorArray &&
    Array.isArray(validatorArray) &&
    validatorArray.length > 0
  ) {
    const validators = [
      onPressButton && validatorArray?.includes('required')
        ? requiredValidator(useTranslation().t('common.form-validation-required'))
        : null,
      onPressButton && validatorArray?.includes('number')
        ? isNumberValidator(
            useTranslation().t('common.form-validation-is-number', {
              field: useTranslation().t('common.longitude')
            })
          )
        : null,
    ].filter((v): v is ((val: string | number | boolean) => string | null) => typeof v === 'function');
    for (const validator of validators) {
      const error = validator(String(value));
      if (error) return error;
    }
    return null;
  } else {
    return null;
  }
}
