import { useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import i18n from "i18next";

import { requiredValidator } from "@/core/utils/FormsValidators";

type SelectInputGenericType = { id: number; title: string; description?: string };

type SelectInputProps = {
  items: SelectInputGenericType[];
  itemFieldname: string;
  currentValue: number;
  label?: string;
  placeholder?: string;
  description?: string;
  validatorArray?: Array<'required'>;
  errorMessage?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
  containerClassName?: string;
  startIcon?: React.ReactNode;
  startIconAllItems?: boolean;
  setFieldValue: (field: any, value: any) => void;
  getFieldErrors: (field: any) => Array<string>;
  onPressButton?: boolean;
};

export const SelectInput = ({
  items,
  itemFieldname,
  currentValue,
  label,
  placeholder,
  description,
  validatorArray,
  errorMessage,
  isRequired = false,
  isDisabled = false,
  className,
  containerClassName,
  startIcon,
  startIconAllItems = false,
  setFieldValue,
  getFieldErrors,
  onPressButton = false
}: SelectInputProps) => {
  const [touched, setTouched] = useState(false);
  const [isSelected, setIsSelected] = useState<Set<string>>(new Set([]));

  return (
  <div className={
    containerClassName ?
    containerClassName :
    "flex items-center gap-2"}
  >
    <Select
      isRequired={isRequired ? true : false}
      isDisabled={isDisabled ? true : false}
      name={itemFieldname}
      label={label ? label : ''}
      placeholder={placeholder ? placeholder : ''}
      description={description ? description : ''}
      variant="bordered"
      className={className ? className : 'min-w-3xs max-w-sm'}
      errorMessage={!touched ? '' : errorMessage}
      isInvalid={!touched && getFieldErrors(itemFieldname).length > 0}
      selectedKeys={
        isSelected.size === 0
          ? currentValue
            ? new Set([String(currentValue)])
            : new Set([])
          : isSelected
      }
      startContent={startIcon ? startIcon : undefined}
      onClose={() => setTouched(true)}
      onSelectionChange={(keys) => {
        const selectedKey = Array.from(keys)[0];
        console.log('selectedKey', selectedKey);
        setIsSelected(new Set([String(selectedKey)]));
        setFieldValue(itemFieldname, selectedKey ? Number(selectedKey) : currentValue);
      }}
      onError={() => {
        return getFieldErrors(itemFieldname);
      }}
      // Example for validator array: ['required'] or []
      validate={(value) => SelectInputValidation({value: String(value), validatorArray, onPressButton})}
    >
      {items.map((item: SelectInputGenericType) => (
        <SelectItem
          key={item.id}
          textValue={item.title}
        >
          {(startIconAllItems) ? (
            <div className="flex gap-2 items-center">
              {startIcon ? startIcon : null}
              {item.title}
            </div>
          ) : item.title}
        </SelectItem>
      ))}
    </Select>
  </div>
  );
};

type SelectInputValidationProps = {
  value: string | number | boolean;
  validatorArray?: Array<'required'>;
  onPressButton?: boolean;
};

export const SelectInputValidation = ({
  value,
  validatorArray,
  onPressButton
}: SelectInputValidationProps) => {
  if (
    Array.isArray(validatorArray) &&
    validatorArray && validatorArray.length > 0
  ) {
    const validators = [
      onPressButton && validatorArray?.includes('required')
        ? requiredValidator(i18n.t('common.form-validation-required'))
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
