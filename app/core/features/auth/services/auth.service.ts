import { GenericService } from "@/core/services/GenericService";
import TokenService from "@/core/features/auth/services/token.service";
import type { IUserForgotPassword, IUserLogin, IUserRegister } from "@/core/features/users/interfaces/user.interface";
import type { ISingleResponse } from "@/core/api/responses/ISingleResponse";
import type { IToken } from "@/core/features/auth/interfaces/auth.interface";


const register = async (data: IUserRegister) => {
  const endpoint = `/auth/register`;
  const service = new GenericService<IUserRegister>(endpoint);
  return await service.save(data);
};

const login = async (data: IUserLogin) => {
  const endpoint = `/auth/login`;
  const service = new GenericService<IUserLogin, ISingleResponse<IToken>>(endpoint);
  return await service.postWithResponse(data);
};

const logout = () => {
  TokenService.clearToken();
};

const forgotPassword = async (data: IUserForgotPassword) => {
  const endpoint = `/auth/forgot-password`;
  const service = new GenericService<IUserForgotPassword>(endpoint);
  return await service.save(data);
};

const AuthService = {
  register,
  login,
  logout,
  forgotPassword
};

export default AuthService;