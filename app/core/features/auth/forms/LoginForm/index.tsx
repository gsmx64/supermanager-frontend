import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input } from "@heroui/react";

import { useFormManager } from "@/core/hooks/useFormManager";
import EyeButton from "@/core/components/buttons/EyeButton";
import UserIcon from "@/core/components/icons/UserIcon";
import {
  maxLengthValidator,
  minLengthValidator,
  requiredValidator
} from "@/core/utils/FormsValidators";
import {
  CORE_USERS_MAX_PASSWORD_LENGTH,
  CORE_USERS_MAX_USERNAME_LENGTH,
  CORE_USERS_MIN_PASSWORD_LENGTH,
  CORE_USERS_MIN_USERNAME_LENGTH
} from "@/core/consts/consts";
import type { LoginFormProps } from "@/core/features/auth/forms/LoginForm/types/LoginForm.type";


const LoginForm = ({ handleLogin }: LoginFormProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [onPressButton, setOnPressButton] = useState(false);

  const { setFieldValue, validate, getFieldErrors, form } = useFormManager(
    {
      username: '',
      password: '',
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
    };

    const isFormValid = validate();
    if (!isFormValid) return;
    await Promise.resolve();

    handleLogin(model);
  };

  return (
    <Form
      className="w-full items-center text-center"
      validationBehavior="aria"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        name="username"
        label={t('common.form-username')}
        placeholder={t('common.form-enter-username')}
        type="text"
        autoComplete="username"
        variant="bordered"
        className="max-w-xs"
        endContent={<UserIcon />}
        onValueChange={(value) => setFieldValue('username', value)}
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
        label={t('common.form-password')}
        placeholder={t('common.form-enter-password')}
        type={isVisible ? "text" : "password"}
        autoComplete="password"
        variant="bordered"
        className="max-w-xs"
        endContent={<EyeButton isVisible={isVisible} setIsVisible={setIsVisible} />}
        onValueChange={(value) => setFieldValue('password', value)}
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

export default LoginForm;