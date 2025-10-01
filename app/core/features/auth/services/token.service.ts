import type IUser from "@/core/features/users/interfaces/user.interface";

export const getAccessToken = () : string | null  => (typeof window !== 'undefined') ? window.localStorage.getItem('token') : '';
export const getRefreshToken = () : string | null => (typeof window !== 'undefined') ? window.localStorage.getItem('refresh_token') : '';
export const getExp = () : number | null => {
  let expLS = (typeof window !== 'undefined') ? window.localStorage.getItem('exp') : null;
  if (expLS === null) return null;

  return Number(expLS);
};

export const setToken = (
  accessToken: string | null,
  refreshToken: string | null,
  exp: number | null,
  user: IUser
) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('token', accessToken ? accessToken : '');
    window.localStorage.setItem('refresh_token', refreshToken ? refreshToken : '');
    window.localStorage.setItem('exp', exp ? exp.toString() : '');
    window.localStorage.setItem('user', JSON.stringify(user));
  }
};

export const clearToken = () => {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('refresh_token');
    window.localStorage.removeItem('exp');
    window.localStorage.removeItem('user');
  }
}

const TokenService = {
  getAccessToken,
  getRefreshToken,
  getExp,
  setToken,
  clearToken
};

export default TokenService;