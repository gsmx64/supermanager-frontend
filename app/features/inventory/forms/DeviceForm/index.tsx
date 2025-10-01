import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
  type Selection
} from "@heroui/react";

import { useFormManager } from "@/core/hooks/useFormManager";
import {
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
} from "@/core/consts/consts";
import { SelectInput, SelectInputValidation } from "@/core/components/atoms/SelectInput";
import useDeviceTypesStore from "@/features/settings/inventory/state/stores/devicesTypes";
import useDeviceMarksStore from "@/features/settings/inventory/state/stores/deviceMarks.store";
import useDeviceModelsStore from "@/features/settings/inventory/state/stores/deviceModels.store";
import useDeviceSystemsStore from "@/features/settings/inventory/state/stores/deviceSystems.store";
import useDeviceBuildsStore from "@/features/settings/inventory/state/stores/deviceBuilds.store";
import useDeviceProcessorsStore from "@/features/settings/inventory/state/stores/deviceProcessors.store";
import useDeviceRAMsStore from "@/features/settings/inventory/state/stores/deviceRAMs.store";
import useDeviceDisksStore from "@/features/settings/inventory/state/stores/deviceDisks.store";
import useLocationsStore from "@/features/inventory/state/stores/locations.store";
import OptionsIcon from "@/features/inventory/components/icons/OptionsIcon";
import LocationIcon from "@/features/inventory/components/icons/LocationIcon";
import type { IDeviceCreate, IDeviceEdit } from "@/features/inventory/interfaces/devices.interface";


type DeviceFormProps<T extends IDeviceCreate | IDeviceEdit> = {
  id?: number;
  item: T;
  handleCreate?: (data: T) => void;
  handleEdit?: (id?: number, data?: T) => void;
  onCloseModal?: () => void;
  handleRefresh: (value: boolean) => void;
};

const DeviceForm = <T extends IDeviceCreate | IDeviceEdit>({ id, item, handleCreate, handleEdit, onCloseModal, handleRefresh }: DeviceFormProps<T>) => {
  const { t } = useTranslation();
  const [onPressButton, setOnPressButton] = useState(false);

  const deviceTypes = useDeviceTypesStore((state) => state.deviceTypes);
  const fetchDeviceTypes = useDeviceTypesStore((state) => state.fetchDeviceTypes);

  const deviceMarks = useDeviceMarksStore((state) => state.deviceMarks);
  const fetchDeviceMarks = useDeviceMarksStore((state) => state.fetchDeviceMarks);

  const deviceModels = useDeviceModelsStore((state) => state.deviceModels);
  const fetchDeviceModels = useDeviceModelsStore((state) => state.fetchDeviceModels);

  const deviceSystems = useDeviceSystemsStore((state) => state.deviceSystems);
  const fetchDeviceSystems = useDeviceSystemsStore((state) => state.fetchDeviceSystems);

  const deviceBuilds = useDeviceBuildsStore((state) => state.deviceBuilds);
  const fetchDeviceBuilds = useDeviceBuildsStore((state) => state.fetchDeviceBuilds);

  const deviceProcessors = useDeviceProcessorsStore((state) => state.deviceProcessors);
  const fetchDeviceProcessors = useDeviceProcessorsStore((state) => state.fetchDeviceProcessors);

  const deviceRAMs = useDeviceRAMsStore((state) => state.deviceRAMs);
  const fetchDeviceRAMs = useDeviceRAMsStore((state) => state.fetchDeviceRAMs);

  const deviceDisks = useDeviceDisksStore((state) => state.deviceDisks);
  const fetchDeviceDisks = useDeviceDisksStore((state) => state.fetchDeviceDisks);

  const locations = useLocationsStore((state) => state.locations);
  const fetchLocations = useLocationsStore((state) => state.fetchLocations);

  const [touched, setTouched] = useState(false);
  const [statusSelected, setStatusSelected] = useState<Set<string>>(new Set([]));

  useEffect(() => {
    fetchDeviceTypes(1, 999, 'title');
    fetchDeviceMarks(1, 999, 'title');
    fetchDeviceModels(1, 999, 'title');
    fetchDeviceSystems(1, 999, 'title');
    fetchDeviceBuilds(1, 999, 'title');
    fetchDeviceProcessors(1, 999, 'title');
    fetchDeviceRAMs(1, 999, 'title');
    fetchDeviceDisks(1, 999, 'title');
    fetchLocations(1, 999, 'title');
  }, [
    fetchDeviceTypes,
    fetchDeviceMarks,
    fetchDeviceModels,
    fetchDeviceSystems,
    fetchDeviceBuilds,
    fetchDeviceProcessors,
    fetchDeviceRAMs,
    fetchDeviceDisks,
    fetchLocations,
  ]);

  const { setFieldValue, validate, getFieldErrors, form } = useFormManager(
    {
      internal_id: item.internal_id ?? '',
      status: item.status ?? 1,
      hostname: item.hostname ?? '',
      type_id: item.type.id ?? '',
      mark_id: item.mark.id ?? '',
      model_id: item.model.id ?? '',
      system_id: item.system.id ?? '',
      build_id: item.build.id ?? '',
      processor_id: item.processor.id ?? '',
      ram_id: item.ram.id ?? '',
      disk_id: item.disk.id ?? '',
      disk_internal_id: item.disk_internal_id ?? '',
      disk_serial: item.disk_serial ?? '',
      network_ipv4: item.network_ipv4 ?? '',
      network_ipv6: item.network_ipv6 ?? '',
      network_mac: item.network_mac ?? '',
      remote_id: item.remote_id ?? '',
      serial: item.serial ?? '',
      location_id: item.location.id ?? '',
      user_owner: item.user_owner ?? '',
      notes: item.notes ?? '',
      sort_order: item.sort_order ?? 0,
    },
    {
      internal_id: [
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
      hostname: [
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
      type_id: [
        (val: string | number | boolean) =>
          SelectInputValidation({
            value: val,
            validatorArray: ['required'],
            onPressButton
          })
      ],
      mark_id: [
        (val: string | number | boolean) =>
          SelectInputValidation({
            value: val,
            validatorArray: ['required'],
            onPressButton
          })
      ],
      model_id: [
        (val: string | number | boolean) =>
          SelectInputValidation({
            value: val,
            validatorArray: ['required'],
            onPressButton
          })
      ],
      system_id: [
        (val: string | number | boolean) =>
          SelectInputValidation({
            value: val,
            validatorArray: ['required'],
            onPressButton
          })
      ],
      build_id: [
        (val: string | number | boolean) =>
          SelectInputValidation({
            value: val,
            validatorArray: ['required'],
            onPressButton
          })
      ],
      processor_id: [
        (val: string | number | boolean) =>
          SelectInputValidation({
            value: val,
            validatorArray: ['required'],
            onPressButton
          })
      ],
      ram_id: [
        (val: string | number | boolean) =>
          SelectInputValidation({
            value: val,
            validatorArray: ['required'],
            onPressButton
          })
      ],
      disk_id: [
        (val: string | number | boolean) =>
          SelectInputValidation({
            value: val,
            validatorArray: ['required'],
            onPressButton
          })
      ],
      disk_internal_id: [],
      disk_serial: [],
      network_ipv4: [],
      network_ipv6: [],
      network_mac: [],
      remote_id: [],
      serial: [],
      location_id: [
        (val: string | number | boolean) =>
          SelectInputValidation({
            value: val,
            validatorArray: ['required'],
            onPressButton
          })
      ],
      user_owner: [],
      notes: [],
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
      internal_id: form.internal_id,
      hostname: form.hostname,
      status: form.status,
      type_id: form.type_id,
      mark_id: form.mark_id,
      model_id: form.model_id,
      system_id: form.system_id,
      build_id: form.build_id,
      processor_id: form.processor_id,
      ram_id: form.ram_id,
      disk_id: form.disk_id,
      disk_internal_id: form.disk_internal_id,
      disk_serial: form.disk_serial,
      network_ipv4: form.network_ipv4,
      network_ipv6: form.network_ipv6,
      network_mac: form.network_mac,
      remote_id: form.remote_id,
      serial: form.serial,
      location_id: form.location_id,
      user_owner: form.user_owner,
      notes: form.notes,
      sort_order: form.sort_order,
    } as T;

    const isFormValid = validate();
    if (!isFormValid) return;
    await Promise.resolve();

    if (id === undefined) {
      handleCreate?.(model);
    } else {
      handleEdit?.(id, model);
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
        name="internal_id"
        label={t('inventory.table-internal-id')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-internal-id') })}
        type="text"
        variant="bordered"
        className="w-sm"
        defaultValue={form.internal_id ? form.internal_id : item.internal_id}
        onChange={
          (e) => setFieldValue('internal_id', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('internal_id');
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
                    field: t('inventory.table-internal-id')
                  }
                )
              ) : () => '',
              onPressButton ? maxLengthValidator(
                CORE_ITEMS_MAX_TITLE_LENGTH,
                t('common.form-validation-max-length',
                  {
                    max: CORE_ITEMS_MAX_TITLE_LENGTH,
                    field: t('inventory.table-internal-id')
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
        name="hostname"
        label={t('inventory.table-hostname')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-hostname') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.hostname ? form.hostname : item.hostname}
        onChange={
          (e) => setFieldValue('hostname', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('hostname');
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
                    field: t('inventory.table-hostname')
                  }
                )
              ) : () => '',
              onPressButton ? maxLengthValidator(
                CORE_ITEMS_MAX_CODE_NAME_LENGTH,
                t('common.form-validation-max-length',
                  {
                    max: CORE_ITEMS_MAX_CODE_NAME_LENGTH,
                    field: t('inventory.table-hostname')
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
        items={deviceTypes}
        itemFieldname="type_id"
        currentValue={item.type.id}
        label={t('inventory.table-type')}
        placeholder={t('common.form-select-field', { field: t('inventory.table-type') })}
        description={t('inventory.form-select-type-description')}
        validatorArray={['required']}
        errorMessage={t('common.form-field-error-select-a-field', { field: t('inventory.table-type') })}
        isRequired={true}
        startIcon={<OptionsIcon width="1.2rem" height="1.2rem" className="ml-1" />}
        startIconAllItems={true}
        setFieldValue={setFieldValue}
        getFieldErrors={getFieldErrors}
        onPressButton={onPressButton}
        className="w-sm"
      />

      <SelectInput
        items={deviceMarks}
        itemFieldname="mark_id"
        currentValue={item.mark.id}
        label={t('inventory.table-mark')}
        placeholder={t('common.form-select-field', { field: t('inventory.table-mark') })}
        description={t('inventory.form-select-mark-description')}
        validatorArray={['required']}
        errorMessage={t('common.form-field-error-select-a-field', { field: t('inventory.table-mark') })}
        isRequired={true}
        startIcon={<OptionsIcon width="1.2rem" height="1.2rem" className="ml-1" />}
        startIconAllItems={true}
        setFieldValue={setFieldValue}
        getFieldErrors={getFieldErrors}
        onPressButton={onPressButton}
        className="w-sm"
      />

      <SelectInput
        items={deviceModels}
        itemFieldname="model_id"
        currentValue={item.model.id}
        label={t('inventory.table-model')}
        placeholder={t('common.form-select-field', { field: t('inventory.table-model') })}
        description={t('inventory.form-select-model-description')}
        validatorArray={['required']}
        errorMessage={t('common.form-field-error-select-a-field', { field: t('inventory.table-model') })}
        isRequired={true}
        startIcon={<OptionsIcon width="1.2rem" height="1.2rem" className="ml-1" />}
        startIconAllItems={true}
        setFieldValue={setFieldValue}
        getFieldErrors={getFieldErrors}
        onPressButton={onPressButton}
        className="w-sm"
      />

      <SelectInput
        items={deviceSystems}
        itemFieldname="system_id"
        currentValue={item.system.id}
        label={t('inventory.table-system')}
        placeholder={t('common.form-select-field', { field: t('inventory.table-system') })}
        description={t('inventory.form-select-system-description')}
        validatorArray={['required']}
        errorMessage={t('common.form-field-error-select-a-field', { field: t('inventory.table-system') })}
        isRequired={true}
        startIcon={<OptionsIcon width="1.2rem" height="1.2rem" className="ml-1" />}
        startIconAllItems={true}
        setFieldValue={setFieldValue}
        getFieldErrors={getFieldErrors}
        onPressButton={onPressButton}
        className="w-sm"
      />

      <SelectInput
        items={deviceBuilds}
        itemFieldname="build_id"
        currentValue={item.build.id}
        label={t('inventory.table-build')}
        placeholder={t('common.form-select-field', { field: t('inventory.table-build') })}
        description={t('inventory.form-select-build-description')}
        validatorArray={['required']}
        errorMessage={t('common.form-field-error-select-a-field', { field: t('inventory.table-build') })}
        isRequired={true}
        startIcon={<OptionsIcon width="1.2rem" height="1.2rem" className="ml-1" />}
        startIconAllItems={true}
        setFieldValue={setFieldValue}
        getFieldErrors={getFieldErrors}
        onPressButton={onPressButton}
        className="w-sm"
      />

      <SelectInput
        items={deviceProcessors}
        itemFieldname="processor_id"
        currentValue={item.processor.id}
        label={t('inventory.table-processor')}
        placeholder={t('common.form-select-field', { field: t('inventory.table-processor') })}
        description={t('inventory.form-select-processor-description')}
        validatorArray={['required']}
        errorMessage={t('common.form-field-error-select-a-field', { field: t('inventory.table-processor') })}
        isRequired={true}
        startIcon={<OptionsIcon width="1.2rem" height="1.2rem" className="ml-1" />}
        startIconAllItems={true}
        setFieldValue={setFieldValue}
        getFieldErrors={getFieldErrors}
        onPressButton={onPressButton}
        className="w-sm"
      />

      <SelectInput
        items={deviceRAMs}
        itemFieldname="ram_id"
        currentValue={item.ram.id}
        label={t('inventory.table-ram')}
        placeholder={t('common.form-select-field', { field: t('inventory.table-ram') })}
        description={t('inventory.form-select-ram-description')}
        validatorArray={['required']}
        errorMessage={t('common.form-field-error-select-a-field', { field: t('inventory.table-ram') })}
        isRequired={true}
        startIcon={<OptionsIcon width="1.2rem" height="1.2rem" className="ml-1" />}
        startIconAllItems={true}
        setFieldValue={setFieldValue}
        getFieldErrors={getFieldErrors}
        onPressButton={onPressButton}
        className="w-sm"
      />

      <SelectInput
        items={deviceDisks}
        itemFieldname="disk_id"
        currentValue={item.disk.id}
        label={t('inventory.table-disk')}
        placeholder={t('common.form-select-field', { field: t('inventory.table-disk') })}
        description={t('inventory.form-select-disk-description')}
        validatorArray={['required']}
        errorMessage={t('common.form-field-error-select-a-field', { field: t('inventory.table-disk') })}
        isRequired={true}
        startIcon={<OptionsIcon width="1.2rem" height="1.2rem" className="ml-1" />}
        startIconAllItems={true}
        setFieldValue={setFieldValue}
        getFieldErrors={getFieldErrors}
        onPressButton={onPressButton}
        className="w-sm"
      />

      <Input
        name="disk_internal_id"
        label={t('inventory.table-disk-internal-id')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-disk-internal-id') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.disk_internal_id ? form.disk_internal_id : item.disk_internal_id}
        onChange={
          (e) => setFieldValue('disk_internal_id', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('disk_internal_id');
        }}
      />

      <Input
        name="disk_serial"
        label={t('inventory.table-disk-serial')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-disk-serial') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.disk_serial ? form.disk_serial : item.disk_serial}
        onChange={
          (e) => setFieldValue('disk_serial', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('disk_serial');
        }}
      />

      <Input
        name="network_ipv4"
        label={t('inventory.table-network-ipv4')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-network-ipv4') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.network_ipv4 ? form.network_ipv4 : item.network_ipv4}
        onChange={
          (e) => setFieldValue('network_ipv4', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('network_ipv4');
        }}
      />

      <Input
        name="network_ipv6"
        label={t('inventory.table-network-ipv6')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-network-ipv6') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.network_ipv6 ? form.network_ipv6 : item.network_ipv6}
        onChange={
          (e) => setFieldValue('network_ipv6', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('network_ipv6');
        }}
      />

      <Input
        name="network_mac"
        label={t('inventory.table-network-mac')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-network-mac') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.network_mac ? form.network_mac : item.network_mac}
        onChange={
          (e) => setFieldValue('network_mac', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('network_mac');
        }}
      />

      <Input
        name="remote_id"
        label={t('inventory.table-remote-id')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-remote-id') })}
        variant="bordered"
        type="text"
        className="sm"
        defaultValue={form.remote_id ? form.remote_id : item.remote_id}
        onChange={
          (e) => setFieldValue('remote_id', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('remote_id');
        }}
      />

      <Input
        name="serial"
        label={t('inventory.table-serial')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-serial') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.serial ? form.serial : item.serial}
        onChange={
          (e) => setFieldValue('serial', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('serial');
        }}
      />

      <SelectInput
        items={locations}
        itemFieldname="location_id"
        currentValue={item.location.id}
        label={t('inventory.table-location')}
        placeholder={t('common.form-select-field', { field: t('inventory.table-location') })}
        description={t('inventory.form-select-location-description')}
        validatorArray={['required']}
        errorMessage={t('common.form-field-error-select-a-field', { field: t('inventory.table-location') })}
        isRequired={true}
        startIcon={<LocationIcon width="1.2rem" height="1.2rem" className="ml-1" />}
        startIconAllItems={true}
        setFieldValue={setFieldValue}
        getFieldErrors={getFieldErrors}
        onPressButton={onPressButton}
        className="w-sm"
      />

      <Input
        name="user_owner"
        label={t('inventory.table-user-owner')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-user-owner') })}
        variant="bordered"
        type="text"
        className="w-sm"
        defaultValue={form.user_owner ? form.user_owner : item.user_owner}
        onChange={
          (e) => setFieldValue('user_owner', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('user_owner');
        }}
      />

      <Textarea
        isInvalid={false}
        label={t('inventory.table-notes')}
        placeholder={t('common.form-enter-field', { field: t('inventory.table-notes') })}
        variant="bordered"
        className="w-sm"
        defaultValue={form.hostname ? form.notes : item.notes}
        onChange={
          (e) => setFieldValue('notes', e.currentTarget.value)
        }
        errorMessage={t('common.form-validation-min-length', { field: t('common.table-notes'), min: 255 })}
        onError={() => {
          return getFieldErrors('notes');
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

export default DeviceForm;