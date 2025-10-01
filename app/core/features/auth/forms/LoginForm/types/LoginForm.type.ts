import type { IUserLogin } from "@/core/features/users/interfaces/user.interface";


export type LoginFormProps = {
  handleLogin: (data: IUserLogin) => void;
};
