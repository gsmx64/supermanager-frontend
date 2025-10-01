import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Form, Input } from "@heroui/react";

import { useFormManager } from "@/core/hooks/useFormManager";
import { CORE_USERS_MAX_EMAIL_LENGTH, CORE_USERS_MIN_EMAIL_LENGTH } from "@/core/consts/consts";
import {
  isEmailValidator,
  maxLengthValidator,
  minLengthValidator,
  requiredValidator
} from "@/core/utils/FormsValidators";
import type { ForgotPasswordFormProps } from "@/core/features/auth/forms/ForgotPasswordForm/types/ForgotPasswordForm.type";


const ForgotPasswordForm = ({ handleForgotPassword }: ForgotPasswordFormProps) => {
  const { t } = useTranslation();
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
      forgot_email: '',
    },
    {
      forgot_email: [
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
    }
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!onPressButton) {
      setOnPressButton(true);
      return;
    }

    const model = {
      forgot_email: form.forgot_email,
    };

    const isFormValid = validate();
    if (!isFormValid) return;
    await Promise.resolve();

    handleForgotPassword(model);
  };

  return (
    <Form
      validationBehavior="aria"
      onSubmit={onSubmit}
      className="justify-center items-center place-items-center"
    >

        <h2 className="text-2xl font-semibold items-center text-center mb-5">
          {t('auth.forgot-password-title')}
        </h2>

        <Input
          isRequired
          name="forgot_email"
          label={t('common.table-email')}
          placeholder={t('common.form-enter-field', { field: t('common.table-email') })}
          type="text"
          variant="bordered"
          autoComplete="forgot_email"
          classNames={fieldClases}
          onValueChange={(value) => setFieldValue('forgot_email', value)}
          onError={() => {
            return getFieldErrors('forgot_email');
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

export default ForgotPasswordForm;
