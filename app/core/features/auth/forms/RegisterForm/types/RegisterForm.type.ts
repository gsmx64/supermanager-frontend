import type { IUserRegister } from "@/core/features/users/interfaces/user.interface";

export type RegisterFormProps = {
  handleRegister: (data: IUserRegister) => void;
};
