import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input } from "@heroui/react";

import { useFormManager } from "@/core/hooks/useFormManager";
import {
  CORE_USERS_MAX_EMAIL_LENGTH,
  CORE_USERS_MAX_NAME_LENGTH,
  CORE_USERS_MAX_PASSWORD_LENGTH,
  CORE_USERS_MAX_USERNAME_LENGTH,
  CORE_USERS_MIN_EMAIL_LENGTH,
  CORE_USERS_MIN_NAME_LENGTH,
  CORE_USERS_MIN_PASSWORD_LENGTH,
  CORE_USERS_MIN_USERNAME_LENGTH
} from "@/core/consts/consts";
import {
  isEmailValidator,
  matchPasswordsValidator,
  maxLengthValidator,
  minLengthValidator,
  requiredValidator
} from "@/core/utils/FormsValidators";
import EyeButton from "@/core/components/buttons/EyeButton";
import type { RegisterFormProps } from "@/core/features/auth/forms/RegisterForm/types/RegisterForm.type";


const RegisterForm = ({ handleRegister }: RegisterFormProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [onPressButton, setOnPressButton] = useState(false);

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
      username: '',
      password: '',
      repeat_password: '',
      email: '',
      first_name: '',
      last_name: ''
    },
    {
      username: [
        (val: string | number | boolean) => requiredValidator(
          t('common.form-validation-required')
        )(String(val)),
        (val: string | number | boolean) => minLengthValidator(
          CORE_USERS_MIN_USERNAME_LENGTH,
          t('common.form-validation-min-length', { min: CORE_USERS_MIN_USERNAME_LENGTH })
        )(String(val)),
        (val: string | number | boolean) => maxLengthValidator(
          CORE_USERS_MAX_USERNAME_LENGTH,
          t('common.form-validation-max-length', { max: CORE_USERS_MAX_USERNAME_LENGTH })
        )(String(val)),
      ],
      password: [
        (val: string | number | boolean) => requiredValidator(
          t('common.form-validation-required')
        )(String(val)),
        (val: string | number | boolean) => minLengthValidator(
          CORE_USERS_MIN_PASSWORD_LENGTH,
          t('common.form-validation-min-length', { min: CORE_USERS_MIN_PASSWORD_LENGTH })
        )(String(val)),
        (val: string | number | boolean) => maxLengthValidator(
          CORE_USERS_MAX_PASSWORD_LENGTH,
          t('common.form-validation-max-length', { max: CORE_USERS_MAX_PASSWORD_LENGTH })
        )(String(val)),
      ],
      repeat_password: [
        (val: string | number | boolean) => requiredValidator(
          t('common.form-validation-required')
        )(String(val)),
        (val: string | number | boolean) => minLengthValidator(
          CORE_USERS_MIN_PASSWORD_LENGTH,
          t('common.form-validation-min-length', { min: CORE_USERS_MIN_PASSWORD_LENGTH })
        )(String(val)),
        (val: string | number | boolean) => maxLengthValidator(
          CORE_USERS_MAX_PASSWORD_LENGTH,
          t('common.form-validation-max-length', { max: CORE_USERS_MAX_PASSWORD_LENGTH })
        )(String(val)),
        (val: string | number | boolean): string | null => matchPasswordsValidator(
          form.password,
          t('common.form-validation-passwords-must-match')
        )(String(val)),
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
      username: form.username,
      password: form.password,
      repeat_password: form.repeat_password,
      email: form.email,
      first_name: form.first_name,
      last_name: form.last_name,
    };

    const isFormValid = validate();
    if (!isFormValid) return;
    await Promise.resolve();

    handleRegister(model);
  };

  return (
    <Form
      validationBehavior="aria"
      onSubmit={onSubmit}
      className=" justify-center items-center place-items-center"
    >

        <h2 className="text-2xl font-semibold items-center text-center mb-5">
          {t('auth.register-title')}
        </h2>

        <Input
          isRequired
          name="username"
          label={t('common.table-username')}
          placeholder={t('common.form-enter-field', { field: t('common.table-username') })}
          type="text"
          variant="bordered"
          classNames={fieldClases}
          onChange={
            (e) => setFieldValue('username', e.currentTarget.value)
          }
          onError={() => {
            return getFieldErrors('username');
          }}
          validate={
            (value) => {
              const validators = [
                onPressButton ? requiredValidator(t('common.form-validation-required')) : () => '',
                onPressButton ? minLengthValidator(
                  CORE_USERS_MIN_USERNAME_LENGTH,
                  t('common.form-validation-min-length',
                    {
                      min: CORE_USERS_MIN_USERNAME_LENGTH,
                      field: t('common.form-username-field')
                    }
                  )
                ) : () => '',
                onPressButton ? maxLengthValidator(
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
          name="password"
          label={t('common.form-new-password')}
          placeholder={t('common.form-enter-new-password')}
          type={isVisible ? "text" : "password"}
          variant="bordered"
          classNames={fieldClases}
          endContent={<EyeButton isVisible={isVisible} setIsVisible={setIsVisible} />}
          onChange={
            (e) => setFieldValue('password', e.currentTarget.value)
          }
          onError={() => {
            return getFieldErrors('password');
          }}
          validate={
            (value) => {
              const validators = [
                onPressButton ? requiredValidator(t('common.form-validation-required')) : () => '',
                onPressButton ? minLengthValidator(
                  CORE_USERS_MIN_PASSWORD_LENGTH,
                  t('common.form-validation-min-length',
                    {
                      min: CORE_USERS_MIN_PASSWORD_LENGTH,
                      field: t('common.form-password-field')
                    }
                  )
                ) : () => '',
                onPressButton ? maxLengthValidator(
                  CORE_USERS_MAX_PASSWORD_LENGTH,
                  t('common.form-validation-max-length',
                    {
                      max: CORE_USERS_MAX_PASSWORD_LENGTH,
                      field: t('common.form-password-field')
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
          name="repeat_password"
          label={t('common.form-repeat-password')}
          placeholder={t('common.form-enter-repeat-password')}
          type={isVisible ? "text" : "password"}
          variant="bordered"
          classNames={fieldClases}
          endContent={<EyeButton isVisible={isVisible} setIsVisible={setIsVisible} />}
          onChange={
            (e) => setFieldValue('repeat_password', e.currentTarget.value)
          }
          onError={() => {
            return getFieldErrors('repeat_password');
          }}
          validate={
            (value) => {
              const validators = [
                onPressButton ? requiredValidator(t('common.form-validation-required')) : () => '',
                onPressButton ? minLengthValidator(
                  CORE_USERS_MIN_PASSWORD_LENGTH,
                  t('common.form-validation-min-length',
                    {
                      min: CORE_USERS_MIN_PASSWORD_LENGTH,
                      field: t('common.form-password-field')
                    }
                  )
                ) : () => '',
                onPressButton ? maxLengthValidator(
                  CORE_USERS_MAX_PASSWORD_LENGTH,
                  t('common.form-validation-max-length',
                    {
                      max: CORE_USERS_MAX_PASSWORD_LENGTH,
                      field: t('common.form-password-field')
                    }
                  )
                ) : () => '',
                onPressButton ? matchPasswordsValidator(
                  form.password,
                  t('common.form-validation-passwords-must-match')
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

        <Button
          type="submit"
          color="primary"
          variant="ghost"
          onPress={() => setOnPressButton(true)}
        >
          {t('common.form-submit')}
        </Button>
    </Form>
  );
}

export default RegisterForm;
