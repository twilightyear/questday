import { api } from './client';

//User 로그인 API HTTP Handler
export const userLogin = async (userData) => {
  const response = await api.post(`/user/login`, userData);
  return response.data;
};

//User 로그아웃 API HTTP Handler
export const userLogout = async () => {
  const response = await api.post(`/user/logout`);
  return response.data;
};

//User 회원가입 API HTTP Handler
export const userSignup = async (userData) => {
  const response = await api.post('/user/signup', userData);
  return response.data;
};

//User 데이터 조회 API HTTP Handler
export const getUserData = async () => {
  const response = await api.get('/user/data');
  return response.data;
};