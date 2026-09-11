import { api } from './client';

export const userLogin = async (userData) => {
  const response = await api.post(`/user/login`, userData);
  return response.data;
};

export const userLogout = async () => {
  const response = await api.post(`/user/logout`);
  return response.data;
};