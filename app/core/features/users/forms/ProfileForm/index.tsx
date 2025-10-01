import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea
} from "@heroui/react";
import { today, getLocalTimeZone, fromDate } from "@internationalized/date";
import { I18nProvider } from "@react-aria/i18n";
import CountryList from "country-list-with-dial-code-and-flag";
import type { Selection } from "@heroui/react";

import { useFormManager } from "@/core/hooks/useFormManager";
import { formatDateFromModel, formatDateToModel } from "@/core/utils/dateFormat";
import {
  CORE_USERS_CAN_CHANGE_USERNAME,
  CORE_USERS_MAX_EMAIL_LENGTH,
  CORE_USERS_MAX_NAME_LENGTH,
  CORE_USERS_MAX_USERNAME_LENGTH,
  CORE_USERS_MIN_EMAIL_LENGTH,
  CORE_USERS_MIN_NAME_LENGTH,
  CORE_USERS_MIN_USERNAME_LENGTH
} from "@/core/consts/consts";
import {
  isEmailValidator,
  maxLengthValidator,
  minLengthValidator,
  requiredValidator
} from "@/core/utils/FormsValidators";
import type { IUserExtended } from "@/core/features/users/interfaces/user.interface";


type ProfileFormProps = {
  item: IUserExtended;
  onCloseModal?: (value: boolean) => void;
  setProfileEdit?: (value: boolean) => void;
  handleEdit: (id: number, data: IUserExtended) => void;
  handleRefresh: () => void;
};

const ProfileForm = ({ item, onCloseModal, setProfileEdit, handleEdit, handleRefresh }: ProfileFormProps) => {
  const { t, i18n } = useTranslation();
  const [onPressButton, setOnPressButton] = useState(false);

  const [touched, setTouched] = useState(false);
  const [countrySelected, setCountrySelected] = useState<Set<string>>(new Set([]));
  const countries = CountryList.getAll();

  let defaultDate = today(getLocalTimeZone())
  const [touched2, setTouched2] = useState(false);
  const [BirthValue, setBirthValue] = useState(
    (item.birth) ? formatDateFromModel(item.birth) : defaultDate
  );

  const fieldClases = {
    label: "text-black/50 dark:text-white/90",
    input: [
      "bg-transparent",
      "text-black/90 dark:text-white/90",
      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
    ],
    innerWrapper: "bg-transparent",
    inputWrapper: [
      "shadow-sm",
      "bg-default-200/50",
      "dark:bg-default/60",
      "backdrop-blur-xl",
      "backdrop-saturate-200",
      "hover:bg-default-200/70",
      "dark:hover:bg-default/70",
      "group-data-[focus=true]:bg-default-200/50",
      "dark:group-data-[focus=true]:bg-default/60",
      "cursor-text!",
    ],
    trigger: [
      "bg-transparent",
      "text-black/90 dark:text-white/90",
      "placeholder:text-default-700/50 dark:placeholder:text-white/60",
      "shadow-sm",
      "bg-default-200/50",
      "dark:bg-default/60",
      "backdrop-blur-xl",
      "backdrop-saturate-200",
      "hover:bg-default-200/70",
      "dark:hover:bg-default/70",
      "group-data-[focus=true]:bg-default-200/50",
      "dark:group-data-[focus=true]:bg-default/60",
      "cursor-pointer!",
    ],
  }

  const { setFieldValue, validate, getFieldErrors, form } = useFormManager(
    {
      username: item.username ?? '',
      email: item.email ?? '',
      first_name: item.first_name ?? '',
      last_name: item.last_name ?? '',
      phone: item.phone ?? '',
      mobile: item.mobile ?? '',
      address: item.address ?? '',
      city: item.city ?? '',
      state: item.state ?? '',
      zip_code: item.zip_code ?? '',
      country: item.country ?? '',
      birth: item.birth ?? '',
      title: item.title ?? '',
      about: item.about ?? ''
    },
    {
      username: [
        (val: string | number | boolean) => (CORE_USERS_CAN_CHANGE_USERNAME)
          ? requiredValidator(t('common.form-validation-required'))(String(val))
          : null,
        (val: string | number | boolean) => (CORE_USERS_CAN_CHANGE_USERNAME)
          ? minLengthValidator(
              CORE_USERS_MIN_USERNAME_LENGTH,
              t('common.form-validation-min-length', { min: CORE_USERS_MIN_USERNAME_LENGTH })
            )(String(val))
          : null,
        (val: string | number | boolean) => (CORE_USERS_CAN_CHANGE_USERNAME)
          ? maxLengthValidator(
              CORE_USERS_MAX_USERNAME_LENGTH,
              t('common.form-validation-max-length', { max: CORE_USERS_MAX_USERNAME_LENGTH })
            )(String(val))
          : null,
      ],
      email: [
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
      first_name: [
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
      last_name: [
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
    }
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!onPressButton) {
      setOnPressButton(true);
      return;
    }

    const model = {
      id: item.id,
      username: form.username,
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
      phone: form.phone,
      mobile: form.mobile,
      address: form.address,
      city: form.city,
      state: form.state,
      zip_code: form.zip_code,
      country: form.country,
      birth: formatDateToModel(form?.birth),
      title: form.title,
      about: form.about,
    };

    const isFormValid = validate();
    if (!isFormValid) return;
    await Promise.resolve();

    handleEdit(item.id, model);
    handleRefresh();
  };

  return (
    <Form
      validationBehavior="aria"
      onSubmit={onSubmit}
      className="w-full justify-center items-center place-items-center"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">

        <Input
          isReadOnly={!CORE_USERS_CAN_CHANGE_USERNAME}
          isRequired={!CORE_USERS_CAN_CHANGE_USERNAME}
          name="username"
          label={t('common.table-username')}
          placeholder={t('common.form-enter-field', { field: t('common.table-username') })}
          type="text"
          variant="bordered"
          classNames={fieldClases}
          defaultValue={form.username ? form.username : item.username}
          onChange={
            (e) => setFieldValue('username', e.currentTarget.value)
          }
          onError={() => {
            return getFieldErrors('username');
          }}
          validate={
            (value) => {
              const validators = [
                (CORE_USERS_CAN_CHANGE_USERNAME) && onPressButton ? requiredValidator(t('common.form-validation-required')) : () => '',
                (CORE_USERS_CAN_CHANGE_USERNAME) && onPressButton ? minLengthValidator(
                  CORE_USERS_MIN_USERNAME_LENGTH,
                  t('common.form-validation-min-length',
                    {
                      min: CORE_USERS_MIN_USERNAME_LENGTH,
                      field: t('common.form-username-field')
                    }
                  )
                ) : () => '',
                (CORE_USERS_CAN_CHANGE_USERNAME) && onPressButton ? maxLengthValidator(
                  CORE_USERS_MAX_USERNAME_LENGTH,
                  t('common.form-validation-max-length',
                    {
                      max: CORE_USERS_MAX_USERNAME_LENGTH,
                      field: t('common.form-username-field')
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
          name="email"
          label={t('common.table-email')}
          placeholder={t('common.form-enter-field', { field: t('common.table-email') })}
          type="text"
          variant="bordered"
          classNames={fieldClases}
          defaultValue={form.email ? form.email : item.email}
          onChange={
            (e) => setFieldValue('email', e.currentTarget.value)
          }
          onError={() => {
            return getFieldErrors('email');
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
                      field: t('common.form-email-field')
                    }
                  )
                ) : () => '',
                onPressButton ? maxLengthValidator(
                  CORE_USERS_MAX_EMAIL_LENGTH,
                  t('common.form-validation-max-length',
                    {
                      max: CORE_USERS_MAX_EMAIL_LENGTH,
                      field: t('common.form-email-field')
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
          name="first_name"
          label={t('common.table-firstname')}
          placeholder={t('common.form-enter-field', { field: t('common.table-firstname') })}
          type="text"
          variant="bordered"
          classNames={fieldClases}
          defaultValue={form.first_name ? form.first_name : item.first_name}
          onChange={
            (e) => setFieldValue('first_name', e.currentTarget.value)
          }
          onError={() => {
            return getFieldErrors('first_name');
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
                      field: t('common.form-firstname-field')
                    }
                  )
                ) : () => '',
                onPressButton ? maxLengthValidator(
                  CORE_USERS_MAX_NAME_LENGTH,
                  t('common.form-validation-max-length',
                    {
                      max: CORE_USERS_MAX_NAME_LENGTH,
                      field: t('common.form-firstname-field')
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
          name="last_name"
          label={t('common.table-lastname')}
          placeholder={t('common.form-enter-field', { field: t('common.table-lastname') })}
          type="text"
          variant="bordered"
          classNames={fieldClases}
          defaultValue={form.last_name ? form.last_name : item.last_name}
          onChange={
            (e) => setFieldValue('last_name', e.currentTarget.value)
          }
          onError={() => {
            return getFieldErrors('last_name');
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
                      field: t('common.form-lastname-field')
                    }
                  )
                ) : () => '',
                onPressButton ? maxLengthValidator(
                  CORE_USERS_MAX_NAME_LENGTH,
                  t('common.form-validation-max-length',
                    {
                      max: CORE_USERS_MAX_NAME_LENGTH,
                      field: t('common.form-lastname-field')
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
          name="phone"
          label={t('common.table-phone')}
          placeholder={t('common.form-enter-field', { field: t('common.table-phone') })}
          type="text"
          variant="bordered"
          classNames={fieldClases}
          defaultValue={form.phone ? form.phone : item.phone}
          onChange={
            (e) => setFieldValue('phone', e.currentTarget.value)
          }
          onError={() => {
            return getFieldErrors('phone');
          }}
        />
        
        <Input
          isRequired
          name="mobile"
          label={t('common.table-mobile')}
          placeholder={t('common.form-enter-field', { field: t('common.table-mobile') })}
          type="text"
          variant="bordered"
          classNames={fieldClases}
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
          type="text"
          variant="bordered"
          classNames={fieldClases}
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
          type="text"
          variant="bordered"
          classNames={fieldClases}
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
          type="text"
          variant="bordered"
          classNames={fieldClases}
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
          type="text"
          variant="bordered"
          classNames={fieldClases}
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
          errorMessage={!touched ? '' : t('common.form-field-error-select-a-field', { field: t('common.table-country') })}
          isInvalid={!touched && getFieldErrors('country').length > 0}
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
          classNames={fieldClases}
          onClose={() => setTouched(true)}
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

        <div className="flex flex-col gap-4 w-full max-w-sm">
          <I18nProvider locale={i18n.language}>
            <DatePicker
              showMonthAndYearPickers
              name="birth"
              label={t('common.table-birthdate')}
              description={t('common.form-select-birthdate-description')}
              dir={t('locale-dir')}
              variant="bordered"
              classNames={fieldClases}
              selectorButtonPlacement="end"
              granularity="day"
              defaultValue={BirthValue as any}
              errorMessage={!touched2 ? '' : t('common.form-field-error-select-a-birthdate')}
              isInvalid={!touched2 && getFieldErrors('birth').length > 0}
              onError={() => {
                return getFieldErrors('birth');
              }}
              onChange={(date: any) => {
                setBirthValue(date);
                setFieldValue('birth', date);
                setTouched2(false);
              }}
            />
          </I18nProvider>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 gap-6 mb-4">
        <Input
          name="title"
          label={t('common.table-title')}
          placeholder={t('common.form-enter-field', { field: t('common.table-title') })}
          type="text"
          variant="bordered"
          classNames={fieldClases}
          defaultValue={form.title ? form.title : item.title}
          onChange={
            (e) => setFieldValue('title', e.currentTarget.value)
          }
        />
      </div>
      <div className="w-full grid grid-cols-1 gap-6 mb-4">
        <Textarea
          isInvalid={false}
          fullWidth={true}
          name="about"
          label={t('common.table-about')}
          placeholder={t('common.form-enter-about')}
          variant="bordered"
          classNames={fieldClases}
          defaultValue={form.about ? form.about : item.about}
          size="lg"
          errorMessage={t('common.form-validation-min-length', { field: t('common.table-about'), min: 255 })}
          onError={() => {
            return getFieldErrors('about');
          }}
          onChange={
            (e) => setFieldValue('about', e.currentTarget.value)
          }
          
        />
      </div>

      <div className="flex justify-end mt-4">
        <Button
          color="secondary"
          variant="ghost"
          onPress={() => {
            onCloseModal && onCloseModal(false);
            setProfileEdit && setProfileEdit(false);
            setOnPressButton(true);
          }}
        >
          {t('common.form-cancel')}
        </Button>
        <div className="inline-block mx-2" />
        <Button
          type="submit"
          color="primary"
          variant="ghost"
        >
          {t('common.form-submit')}
        </Button>
      </div>
    </Form>
  );
}

export default ProfileForm;