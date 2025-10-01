import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input } from "@heroui/react";

import { useFormManager } from "@/core/hooks/useFormManager";
import EyeButton from "@/core/components/buttons/EyeButton";
import {
  matchPasswordsValidator,
  maxLengthValidator,
  minLengthValidator,
  requiredValidator
} from "@/core/utils/FormsValidators";
import { CORE_USERS_MAX_PASSWORD_LENGTH, CORE_USERS_MIN_PASSWORD_LENGTH } from "@/core/consts/consts";
import type { ChangePasswordFormProps } from "@/core/features/users/forms/ChangePasswordForm/types/ChangePasswordForm.type";
import type { IUserChangePassword } from "@/core/features/users/interfaces/user.interface";


const ChangePasswordForm = ({ userId, userName, handleChangePassword, onCloseModal }: ChangePasswordFormProps) => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [onPressButton, setOnPressButton] = useState(false);

  const { setFieldValue, validate, getFieldErrors, form } = useFormManager(
    {
      current_password: '',
      password: '',
      repeat_password: '',
    },
    {
      current_password: [
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
    }
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!onPressButton) {
      setOnPressButton(true);
      return;
    }

    const model: IUserChangePassword = {
      id: userId,
      current_password: form.current_password,
      password: form.password,
      repeat_password: form.repeat_password,
    };

    const isFormValid = validate();
    if (!isFormValid) return;
    await Promise.resolve();

    handleChangePassword(userId, userName, model);
  
    if (onCloseModal) {
      onCloseModal();
    }
  };

  return (
    <Form
      className="w-full max-w-xs"
      validationBehavior="aria"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        name="current_password"
        label={t('common.form-current-password')}
        placeholder={t('common.form-enter-current-password')}
        type={isVisible ? "text" : "password"}
        variant="bordered"
        className="max-w-xs"
        endContent={<EyeButton isVisible={isVisible} setIsVisible={setIsVisible} />}
        onChange={
          (e) => setFieldValue('current_password', e.currentTarget.value)
        }
        onError={() => {
          return getFieldErrors('current_password');
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
                    field: t('common.table-current-password')
                  }
                )
              ) : () => '',
              onPressButton ? maxLengthValidator(
                CORE_USERS_MAX_PASSWORD_LENGTH,
                t('common.form-validation-max-length',
                  {
                    max: CORE_USERS_MAX_PASSWORD_LENGTH,
                    field: t('common.table-current-password')
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
        className="max-w-xs"
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
        className="max-w-xs"
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

export default ChangePasswordForm;