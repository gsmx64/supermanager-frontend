import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input, Select, SelectItem, Textarea, type Selection } from "@heroui/react";
import CountryList from "country-list-with-dial-code-and-flag";

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
import useLocationZonesStore from "@/features/inventory/state/stores/locationZones.store";
import type { ILocationCreate } from "@/features/inventory/interfaces/locations.interface";
import { GeolocationInput, GeolocationInputValidation } from "@/core/components/atoms/GeolocationInput";
import { geolocationFormat, parseGeolocationToDB } from "@/core/utils/geolocationFormat";
import { SelectInput, SelectInputValidation } from "@/core/components/atoms/SelectInput";
import LocationZoneIcon from "../../components/icons/LocationZoneIcon";


type LocationFormProps<T extends ILocationCreate> = {
  id?: number;
  item: T;
  handleCreate?: (data: T) => void;
  handleEdit?: (id: number, data: T) => void;
  onCloseModal?: () => void;
  handleRefresh: (value: boolean) => void;
};

const LocationForm = <T extends ILocationCreate>({ id, item, handleCreate, handleEdit, onCloseModal, handleRefresh }: LocationFormProps<T>) => {
  const { t } = useTranslation();
  const [onPressButton, setOnPressButton] = useState(false);

  const [touchedLocationZone, setTouchedLocationZone] = useState(false);
  const [locationZoneSelected, setLocationZoneSelected] = useState<Set<string>>(new Set([]));
  const locationZones = useLocationZonesStore((state) => state.locationZones);
  const fetchLocationZones = useLocationZonesStore((state) => state.fetchLocationZones);

  const [touchedCountry, setTouchedCountry] = useState(false);
  const [countrySelected, setCountrySelected] = useState<Set<string>>(new Set([]));
  const countries = CountryList.getAll();

  const [touched, setTouched] = useState(false);
  const [statusSelected, setStatusSelected] = useState<Set<string>>(new Set([]));

  useEffect(() => {
    fetchLocationZones(1, 999, 'title');
  }, [fetchLocationZones]);

  const { setFieldValue, validate, getFieldErrors, form } = useFormManager(
    {
      title: item.title ?? '',
      description: item.description ?? '',
      code_name: item.code_name ?? '',
      status: item.status ?? 1,
      sort_order: item.sort_order ?? 0,
      location_zone: item.location_zone ?? '',
      manager: item.manager ?? '',
      manager_email: item.manager_email ?? '',
      manager_phone: item.manager_phone ?? '',
      manager_mobile: item.manager_mobile ?? '',
      collaborator: item.collaborator ?? '',
      collaborator_email: item.collaborator_email ?? '',
      collaborator_phone: item.collaborator_phone ?? '',
      collaborator_mobile: item.collaborator_mobile ?? '',
      phone: item.phone ?? '',
      mobile: item.mobile ?? '',
      address: item.address ?? '',
      city: item.city ?? '',
      state: item.state ?? '',
      zip_code: item.zip_code ?? '',
      country: item.country ?? '',
      latitude: item.latitude ?? 0,
      longitude: item.longitude ?? 0,
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
          CORE_ITEMS_MIN_CODE_NAME_LENGTH,
          t('common.form-validation-min-length', { min: CORE_ITEMS_MIN_CODE_NAME_LENGTH })
        )(String(val)),
        (val: string | number | boolean) => maxLengthValidator(
          CORE_ITEMS_MAX_CODE_NAME_LENGTH,
          t('common.form-validation-max-length', { max: CORE_ITEMS_MAX_CODE_NAME_LENGTH })
        )(String(val)),
      ],
      location_zone: [
        (val: string | number | boolean) =>
          SelectInputValidation({
            value: val,
            validatorArray: ['required'],
            onPressButton
          })
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
      collaborator: [],
      collaborator_email: [],
      collaborator_phone: [],
      collaborator_mobile: [],
      phone: [],
      mobile: [],
      address: [],
      city: [],
      state: [],
      zip_code: [],
      country: [],
      latitude: [
        (val: string | number | boolean) =>
          GeolocationInputValidation({
            value: val,
            validatorArray: [],
            onPressButton
          })
      ],
      longitude: [
        (val: string | number | boolean) =>
          GeolocationInputValidation({
            value: val,
            validatorArray: [],
            onPressButton
          })
      ],
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
      console.log('setOnPressButton(true) - onPressButton',onPressButton);
      return;
    }

    const model = {
      title: form.title,
      description: form.description,
      code_name: form.code_name,
      status: form.status,
      sort_order: form.sort_order,
      location_zone: form.location_zone,
      manager: form.manager,
      manager_email: form.manager_email,
      manager_phone: form.manager_phone,
      manager_mobile: form.manager_mobile,
      collaborator: form.collaborator,
      collaborator_email: form.collaborator_email,
      collaborator_phone: form.collaborator_phone,
      collaborator_mobile: form.collaborator_mobile,
      phone: form.phone,
      mobile: form.mobile,
      address: form.address,
      city: form.city,
      state: form.state,
      zip_code: form.zip_code,
      country: form.country,
      latitude: parseGeolocationToDB(form.latitude),
      longitude: parseGeolocationToDB(form.longitude),
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
        className="w-sm"
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
        className="w-sm"
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

      <SelectInput
        items={locationZones}
        itemFieldname="location_zone"
        currentValue={item.location_zone.id}
        label={t('inventory.table-location-zone')}
        placeholder={t('common.form-select-field', { field: t('inventory.table-location-zone') })}
        description={t('inventory.form-select-location-zone-description')}
        validatorArray={['required']}
        errorMessage={t('common.form-field-error-select-a-field', { field: t('inventory.table-location-zone') })}
        isRequired={true}
        startIcon={<LocationZoneIcon width="1.2rem" height="1.2rem" className="ml-1" />}
        startIconAllItems={true}
        setFieldValue={setFieldValue}
        getFieldErrors={getFieldErrors}
        onPressButton={onPressButton}
        className="w-sm"
      />

      <Input
        isRequired
        name="manager"
        label={t('inventory.table-manager')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-manager') })}
        variant="bordered"
        type="text"
        className="w-sm"
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
        className="w-sm"
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
        className="w-sm"
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
        className="w-sm"
        defaultValue={form.manager_mobile ? form.manager_mobile : item.manager_mobile}
        onChange={
          (e) => setFieldValue('manager_mobile', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('manager_mobile');
        }}
      />

      <Input
        name="collaborator"
        label={t('inventory.table-collaborator')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-collaborator') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.collaborator ? form.collaborator : item.collaborator}
        onChange={
          (e) => setFieldValue('collaborator', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('collaborator');
        }}
      />

      <Input
        name="collaborator_email"
        label={t('inventory.table-collaborator-email')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-collaborator-email') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.collaborator_email ? form.collaborator_email : item.collaborator_email}
        onChange={
          (e) => setFieldValue('collaborator_email', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('collaborator_email');
        }}
      />

      <Input
        name="collaborator_phone"
        label={t('inventory.table-collaborator-phone')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-collaborator-phone') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.collaborator_phone ? form.collaborator_phone : item.collaborator_phone}
        onChange={
          (e) => setFieldValue('collaborator_phone', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('collaborator_phone');
        }}
      />

      <Input
        name="collaborator_mobile"
        label={t('inventory.table-collaborator-mobile')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-collaborator-mobile') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.collaborator_mobile ? form.collaborator_mobile : item.collaborator_mobile}
        onChange={
          (e) => setFieldValue('collaborator_mobile', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('collaborator_mobile');
        }}
      />

      <Input
        name="phone"
        label={t('common.table-phone')}
        placeholder={t('common.form-enter-field', { field: t('common.table-phone') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.phone ? form.phone : item.phone}
        onChange={
          (e) => setFieldValue('phone', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('phone');
        }}
      />

      <Input
        name="mobile"
        label={t('common.table-mobile')}
        placeholder={t('common.form-enter-field', { field: t('common.table-mobile') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.mobile ? form.mobile : item.mobile}
        onChange={
          (e) => setFieldValue('mobile', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('mobile');
        }}
      />

      <Input
        name="address"
        label={t('common.table-address')}
        placeholder={t('common.form-enter-field', { field: t('common.table-address') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.address ? form.address : item.address}
        onChange={
          (e) => setFieldValue('address', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('address');
        }}
      />

      <Input
        name="city"
        label={t('common.table-city')}
        placeholder={t('common.form-enter-field', { field: t('common.table-city') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.city ? form.city : item.city}
        onChange={
          (e) => setFieldValue('city', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('city');
        }}
      />

      <Input
        name="state"
        label={t('common.table-state')}
        placeholder={t('common.form-enter-field', { field: t('common.table-state') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.state ? form.state : item.state}
        onChange={
          (e) => setFieldValue('state', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('state');
        }}
      />

      <Input
        name="zip_code"
        label={t('common.table-zipcode')}
        placeholder={t('common.form-enter-field', { field: t('common.table-zipcode') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.zip_code ? form.zip_code : item.zip_code}
        onChange={
          (e) => setFieldValue('zip_code', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('zip_code');
        }}
      />

      <Select
        name="country"
        description={t('common.form-select-country-description')}
        errorMessage={!touchedCountry ? '' : t('common.form-field-error-select-a-field', { field: t('common.table-country') })}
        isInvalid={!touchedCountry && getFieldErrors('country').length > 0}
        label={t('common.table-country')}
        placeholder={t('common.form-select-field', { field: t('common.table-country') })}
        selectedKeys={
          countrySelected.size === 0 && item.country
            ? new Set([
                countries.find(c => c.name === item.country)?.code ?? ""
              ])
            : countrySelected
        }
        variant="bordered"
        onClose={() => setTouchedCountry(true)}
        onSelectionChange={(keys) => {
          const selectedKey = Array.from(keys)[0];
          setCountrySelected(new Set(Array.from(keys as Selection).map(String)));
            
          // Get the selected country value (name) instead of the key (code)
          const selectedCountry = countries.find(
            (country) => String(country.code) === String(selectedKey)
          );
          if (selectedCountry) {
            setFieldValue('country', selectedCountry.name);
          }
        }}
        onError={() => {
          return getFieldErrors('country');
        }}
      >
        {countries.map((country) => (
          <SelectItem
            key={country.code}
            startContent={country.flag}
          >
            {country.name}
          </SelectItem>
        ))}
      </Select>

      <GeolocationInput
        latitudeFieldname="latitude"
        latitudeValue={geolocationFormat(form.latitude)}
        longitudeFieldname="longitude"
        longitudeValue={geolocationFormat(form.longitude)}
        setFieldValue={setFieldValue}
        getFieldErrors={getFieldErrors}
        validatorArray={[]}
        onPressButton={onPressButton}
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

export default LocationForm;