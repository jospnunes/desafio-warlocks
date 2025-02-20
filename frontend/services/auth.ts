import { api } from './api';

export interface LoginResponse {
  token?: string;
  message?: string;
}
export interface RegisterResponse {
    token?: string;
    message?: string;
}
export interface LogoutResponse {
    message: string;
}

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Erro ao fazer login. Tente novamente.');
  }
}

export async function registerApi(email: string, password: string, confirmPassword: string): Promise<RegisterResponse> {
    try {
      const response = await api.post('/auth/register', { email, password, confirmPassword });
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Erro ao registrar. Tente novamente.');
    }
}

export async function logoutApi(): Promise<LogoutResponse> {
  try {
    const response = await api.post('/auth/logout', {});
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error('Erro ao fazer logout. Tente novamente.');
  }
}
