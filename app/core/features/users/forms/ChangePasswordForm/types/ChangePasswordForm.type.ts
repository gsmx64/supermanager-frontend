import type { IUserChangePassword } from "@/core/features/users/interfaces/user.interface";


export type ChangePasswordFormProps = {
  userId: number;
  userName: string;
  handleChangePassword: (id: number, userName: string, data: IUserChangePassword) => void;
  onCloseModal?: () => void;
};
