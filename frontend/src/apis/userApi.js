import { api } from './client';

export const userLogin = async (userData) => {
  const response = await api.post(`/user/login`, userData);
  return response.data;
};

export const userLogout = async () => {
  const response = await api.post(`/user/logout`);
  return response.data;
};

export const userSignup = async (userData) => {
  const response = await api.post('/user/signup', userData);
  return response.data;
};

export const getUserPoint = async () => {
  const response = await api.get('/user/point');
  return response.data;
};

export const getUserXp = async () => {
  const response = await api.get('/user/xp');
  return response.data;
};

export const getUserEmail = async () => {
  const response = await api.get('/user/email');
  return response.data;
};