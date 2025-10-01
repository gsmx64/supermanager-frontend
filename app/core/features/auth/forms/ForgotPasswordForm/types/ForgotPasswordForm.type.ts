import type { IUserForgotPassword } from "@/core/features/users/interfaces/user.interface";


export type ForgotPasswordFormProps = {
  handleForgotPassword: (data: IUserForgotPassword) => void;
};
