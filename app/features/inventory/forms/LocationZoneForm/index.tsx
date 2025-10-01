import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Select, SelectItem, Textarea, type Selection } from "@heroui/react";

import { useFormManager } from "@/core/hooks/useFormManager";
import {
  isEmailValidator,
  isNumberValidator,
  maxLengthValidator,
  minLengthValidator,
  requiredValidator
} from "@/core/utils/FormsValidators";
import {
  CORE_ITEMS_MIN_TITLE_LENGTH,
  CORE_ITEMS_MAX_TITLE_LENGTH,
  CORE_ITEMS_MIN_CODE_NAME_LENGTH,
  CORE_ITEMS_MAX_CODE_NAME_LENGTH,
  CORE_USERS_MIN_EMAIL_LENGTH,
  CORE_USERS_MAX_EMAIL_LENGTH,
  CORE_USERS_MIN_NAME_LENGTH,
  CORE_USERS_MAX_NAME_LENGTH
} from "@/core/consts/consts";
import type { ILocationZoneCreate } from "@/features/inventory/interfaces/locationZones.interface";


type LocationZoneFormProps<T extends ILocationZoneCreate> = {
  id?: number;
  item: T;
  handleCreate?: (data: T) => void;
  handleEdit?: (id: number, data: T) => void;
  onCloseModal?: () => void;
  handleRefresh: (value: boolean) => void;
};

const LocationZoneForm = <T extends ILocationZoneCreate>({ id, item, handleCreate, handleEdit, onCloseModal, handleRefresh }: LocationZoneFormProps<T>) => {
  const { t } = useTranslation();
  const [onPressButton, setOnPressButton] = useState(false);

  const [touched, setTouched] = useState(false);
  const [statusSelected, setStatusSelected] = useState<Set<string>>(new Set([]));

  const { setFieldValue, validate, getFieldErrors, form } = useFormManager(
    {
      title: item.title ?? '',
      description: item.description ?? '',
      code_name: item.code_name ?? '',
      status: item.status ?? 1,
      sort_order: item.sort_order ?? 0,
      manager: item.manager ?? '',
      manager_email: item.manager_email ?? '',
      manager_phone: item.manager_phone ?? '',
      manager_mobile: item.manager_mobile ?? '',
    },
    {
      title: [
        (val: string | number | boolean) => requiredValidator(
          t('common.form-validation-required')
        )(String(val)),
        (val: string | number | boolean) => minLengthValidator(
          CORE_ITEMS_MIN_TITLE_LENGTH,
          t('common.form-validation-min-length', { min: CORE_ITEMS_MIN_TITLE_LENGTH })
        )(String(val)),
        (val: string | number | boolean) => maxLengthValidator(
          CORE_ITEMS_MAX_TITLE_LENGTH,
          t('common.form-validation-max-length', { max: CORE_ITEMS_MAX_TITLE_LENGTH })
        )(String(val)),
      ],
      description: [],
      code_name: [
        (val: string | number | boolean) => requiredValidator(
          t('common.form-validation-required')
        )(String(val)),
        (val: string | number | boolean) => minLengthValidator(
          CORE_ITEMS_MIN_TITLE_LENGTH,
          t('common.form-validation-min-length', { min: CORE_ITEMS_MIN_CODE_NAME_LENGTH })
        )(String(val)),
        (val: string | number | boolean) => maxLengthValidator(
          CORE_ITEMS_MAX_TITLE_LENGTH,
          t('common.form-validation-max-length', { max: CORE_ITEMS_MAX_CODE_NAME_LENGTH })
        )(String(val)),
      ],
      manager: [
        (val: string | number | boolean) => requiredValidator(
              t('common.form-validation-required')
            )(String(val)),
        (val: string | number | boolean) => minLengthValidator(
              CORE_USERS_MIN_NAME_LENGTH,
              t('common.form-validation-min-length', { min: CORE_USERS_MIN_NAME_LENGTH })
            )(String(val)),
        (val: string | number | boolean) => maxLengthValidator(
              CORE_USERS_MAX_NAME_LENGTH,
              t('common.form-validation-max-length', { max: CORE_USERS_MAX_NAME_LENGTH })
            )(String(val)),
      ],
      manager_email: [
        (val: string | number | boolean) => requiredValidator(
              t('common.form-validation-required')
            )(String(val)),
        (val: string | number | boolean) => minLengthValidator(
              CORE_USERS_MIN_EMAIL_LENGTH,
              t('common.form-validation-min-length', { min: CORE_USERS_MIN_EMAIL_LENGTH })
            )(String(val)),
      (val: string | number | boolean) => maxLengthValidator(
              CORE_USERS_MAX_EMAIL_LENGTH,
              t('common.form-validation-max-length', { max: CORE_USERS_MAX_EMAIL_LENGTH })
            )(String(val)),
      (val: string | number | boolean) => isEmailValidator(
              t('common.form-validation-min-length', { min: 2 })
            )(String(val)),
      ],
      manager_phone: [],
      manager_mobile: [],
      status: [
        (val: string | number | boolean) => requiredValidator(
          t('common.form-validation-required')
        )(String(val)),
        (val: string | number | boolean) => isNumberValidator(
            t('common.form-validation-is-number',
            {
              field: t('common.table-sort-order')
            }),
          )(String(val)),
        (val: string | number | boolean) => minLengthValidator(
          1,
          t('common.form-validation-min-length', { min: 1 })
        )(String(val)),
      ],
      sort_order: [
        (val: string | number | boolean) => requiredValidator(
          t('common.form-validation-required')
        )(String(val)),
        (val: string | number | boolean) => isNumberValidator(
            t('common.form-validation-is-number',
            {
              field: t('common.table-sort-order')
            }),
          )(String(val)),
        (val: string | number | boolean) => minLengthValidator(
          1,
          t('common.form-validation-min-length', { min: 1 })
        )(String(val)),
      ],
    }
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!onPressButton) {
      setOnPressButton(true);
      return;
    }

    const model = {
      title: form.title,
      description: form.description,
      code_name: form.code_name,
      status: form.status,
      sort_order: form.sort_order,
      manager: form.manager,
      manager_email: form.manager_email,
      manager_phone: form.manager_phone,
      manager_mobile: form.manager_mobile,
    };

    const isFormValid = validate();
    if (!isFormValid) return;
    await Promise.resolve();

    if (id === undefined) {
      handleCreate?.(model as T)
    } else {
      handleEdit?.(id, model as T);
    }

    if (onCloseModal) {
      onCloseModal();
      handleRefresh(true);
    }
  };

  return (
    <Form
      className="w-full items-center"
      validationBehavior="aria"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        name="title"
        label={t('common.table-title')}
        placeholder={t('common.form-enter-field', { field: t('common.table-title') })}
        type="text"
        variant="bordered"
        className="w-full"
        defaultValue={form.title ? form.title : item.title}
        onChange={
          (e) => setFieldValue('title', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('title');
        }}
        validate={
          (value) => {
            const validators = [
              onPressButton ? requiredValidator(t('common.form-validation-required')) : () => '',
              onPressButton ? minLengthValidator(
                CORE_ITEMS_MIN_TITLE_LENGTH,
                t('common.form-validation-min-length',
                  {
                    min: CORE_ITEMS_MIN_TITLE_LENGTH,
                    field: t('common.table-title')
                  }
                )
              ) : () => '',
              onPressButton ? maxLengthValidator(
                CORE_ITEMS_MAX_TITLE_LENGTH,
                t('common.form-validation-max-length',
                  {
                    max: CORE_ITEMS_MAX_TITLE_LENGTH,
                    field: t('common.table-title')
                  }
                )
              ) : () => '',
            ];
            for (const validator of validators) {
              const error = validator(String(value));
              if (error) return error;
            }
            return null;
          }
        }
      />

      <Textarea
        isInvalid={false}
        label={t('common.table-description')}
        placeholder={t('common.form-enter-field', { field: t('common.table-description') })}
        variant="bordered"
        className="w-full"
        defaultValue={form.description ? form.description : item.description}
        onChange={
          (e) => setFieldValue('description', e.currentTarget.value)
        }
        errorMessage={t('common.form-validation-min-length', { field: t('common.table-description'), min: 255 })}
        onError={() => {
          return getFieldErrors('description');
        }}
      />

      <Input
        isRequired
        name="code_name"
        label={t('common.table-code-name')}
        placeholder={t('common.form-enter-field', { field: t('common.table-code-name') })}
        variant="bordered"
        type="text"
        className="w-full"
        defaultValue={form.code_name ? form.code_name : item.code_name}
        onChange={
          (e) => setFieldValue('code_name', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('code_name');
        }}
        validate={
          (value) => {
            const validators = [
              onPressButton ? requiredValidator(t('common.form-validation-required')) : () => '',
              onPressButton ? minLengthValidator(
                CORE_ITEMS_MIN_CODE_NAME_LENGTH,
                t('common.form-validation-min-length',
                  {
                    min: CORE_ITEMS_MIN_CODE_NAME_LENGTH,
                    field: t('common.table-code-name')
                  }
                )
              ) : () => '',
              onPressButton ? maxLengthValidator(
                CORE_ITEMS_MAX_CODE_NAME_LENGTH,
                t('common.form-validation-max-length',
                  {
                    max: CORE_ITEMS_MAX_CODE_NAME_LENGTH,
                    field: t('common.table-code-name')
                  }
                )
              ) : () => '',
            ];
            for (const validator of validators) {
              const error = validator(String(value));
              if (error) return error;
            }
            return null;
          }
        }
      />

      <Input
        isRequired
        name="manager"
        label={t('inventory.table-manager')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-manager') })}
        variant="bordered"
        type="text"
        className="w-full"
        defaultValue={form.manager ? form.manager : item.manager}
        onChange={
          (e) => setFieldValue('manager', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('manager');
        }}
        validate={
          (value) => {
            const validators = [
              onPressButton ? requiredValidator(t('common.form-validation-required')) : () => '',
              onPressButton ? minLengthValidator(
                CORE_USERS_MIN_NAME_LENGTH,
                t('common.form-validation-min-length',
                  {
                    min: CORE_USERS_MIN_NAME_LENGTH,
                    field: t('inventory.table-manager')
                  }
                )
              ) : () => '',
              onPressButton ? maxLengthValidator(
                CORE_USERS_MAX_NAME_LENGTH,
                t('common.form-validation-max-length',
                  {
                    max: CORE_USERS_MAX_NAME_LENGTH,
                    field: t('inventory.table-manager')
                  }
                )
              ) : () => '',
            ];
            for (const validator of validators) {
              const error = validator(String(value));
              if (error) return error;
            }
            return null;
          }
        }
      />

      <Input
        isRequired
        name="manager_email"
        label={t('inventory.table-manager-email')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-manager-email') })}
        variant="bordered"
        type="text"
        className="w-full"
        defaultValue={form.manager_email ? form.manager_email : item.manager_email}
        onChange={
          (e) => setFieldValue('manager_email', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('manager_email');
        }}
        validate={
          (value) => {
            const validators = [
              onPressButton ? requiredValidator(t('common.form-validation-required')) : () => '',
              onPressButton ? isEmailValidator(t('common.form-validation-email', { value: value })) : () => '',
              onPressButton ? minLengthValidator(
                CORE_USERS_MIN_EMAIL_LENGTH,
                t('common.form-validation-min-length',
                  {
                    min: CORE_USERS_MIN_EMAIL_LENGTH,
                    field: t('inventory.table-manager-email')
                  }
                )
              ) : () => '',
              onPressButton ? maxLengthValidator(
                CORE_USERS_MAX_EMAIL_LENGTH,
                t('common.form-validation-max-length',
                  {
                    max: CORE_USERS_MAX_EMAIL_LENGTH,
                    field: t('inventory.table-manager-email')
                  }
                )
              ) : () => '',
            ];
            for (const validator of validators) {
              const error = validator(String(value));
              if (error) return error;
            }
            return null;
          }
        }
      />

      <Input
        name="manager_phone"
        label={t('inventory.table-manager-phone')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-manager-phone') })}
        variant="bordered"
        type="text"
        className="w-full"
        defaultValue={form.manager_phone ? form.manager_phone : item.manager_phone}
        onChange={
          (e) => setFieldValue('manager_phone', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('manager_phone');
        }}
      />

      <Input
        name="manager_mobile"
        label={t('inventory.table-manager-mobile')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-manager-mobile') })}
        variant="bordered"
        type="text"
        className="w-full"
        defaultValue={form.manager_mobile ? form.manager_mobile : item.manager_mobile}
        onChange={
          (e) => setFieldValue('manager_mobile', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('manager_mobile');
        }}
      />

      <Select
        name="status"
        label={t('common.table-status')}
        placeholder={t('common.form-select-field', { field: t('common.table-status') })}
        description={t('common.form-select-status-description', { field: t('common.table-status') })}
        selectedKeys={statusSelected.size === 0 && item.status !== undefined ? new Set([String(item.status)]) : statusSelected}
        variant="bordered"
        className="max-w-3xs"
        onClose={() => setTouched(true)}
        onSelectionChange={(keys) => {
          const selectedKey = Array.from(keys)[0];
          setStatusSelected(new Set(Array.from(keys as Selection).map(String)));
          setFieldValue("status", Number(selectedKey));
          setTouched(false);
        }}
        isInvalid={!touched && getFieldErrors('status').length > 0}
        errorMessage={!touched ? '' : t('common.form-field-error-select-a-field', { field: t('common.table-status') })}
        onError={() => {
          return getFieldErrors('status');
        }}
        validate={
          (value) => {
            const validators = [
              onPressButton ? requiredValidator(t('common.form-validation-required')) : () => '',
              onPressButton ? isNumberValidator(
                t('common.form-validation-is-number',
                  {
                    field: t('common.table-status')
                  }
                )
              ) : () => '',
              onPressButton ? minLengthValidator(
                  1,
                  t('common.form-validation-min-length',
                    {
                      min: 1,
                      field: t('common.table-status')
                    }
                  )
                ) : () => '',
            ];
            for (const validator of validators) {
              const error = validator(String(value));
              if (error) return error;
            }
            return null;
          }
        }
      >
        <SelectItem key="1">{t('common.active')}</SelectItem>
        <SelectItem key="0">{t('common.disabled')}</SelectItem>
        <SelectItem key="2">{t('common.archived')}</SelectItem>
      </Select>
      <Input
        name="sort_order"
        label={t('common.table-sort-order')}
        placeholder="0"
        type="number"
        variant="bordered"
        className="max-w-[5rem]"
        min={0}
        defaultValue={String(
          form.sort_order !== undefined
        ? form.sort_order
        : item.sort_order !== undefined
          ? item.sort_order
          : 0
        )}
        onChange={(e) => {
          const value = Number(e.currentTarget.value);
          if (value >= 0) {
            setFieldValue("sort_order", value);
          }
        }}
        onError={() => {
          return getFieldErrors('sort_order');
        }}
        validate={
          (value) => {
            const validators = [
              onPressButton ? requiredValidator(t('common.form-validation-required')) : () => '',
              onPressButton ? isNumberValidator(
                t('common.form-validation-is-number',
                  {
                    field: t('common.table-sort-order')
                  }
                )
              ) : () => '',
              onPressButton ? minLengthValidator(
                  1,
                  t('common.form-validation-min-length',
                    {
                      min: 1,
                      field: t('common.table-sort-order')
                    }
                  )
                ) : () => '',
            ];
            for (const validator of validators) {
              const error = validator(String(value));
              if (error) return error;
            }
            return null;
          }
        }
      />
      <div className="flex gap-2 mt-4 mb-4">
        <Button
          type="submit"
          color="primary"
          variant="ghost"
          onPress={() => setOnPressButton(true)}
        >
          {t('common.form-submit')}
        </Button>
        <Button
          color="secondary"
          variant="ghost"
          onPress={onCloseModal}
        >
          {t('common.form-cancel')}
        </Button>
      </div>
    </Form>
  );
}

export default LocationZoneForm;