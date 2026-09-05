import { api } from './client';

export const getCategories = async (userId, year, month, day) => {
  const response = await api.get(`/users/${userId}/calendars/${year}/dailies/${month}/${day}/category`);
  return response.data;
};

export const getCategory = async (userId, year, month, day, categoryId) => {
  const response = await api.get(`/users/${userId}/calendars/${year}/dailies/${month}/${day}/category/${categoryId}`);
  return response.data;
};

export const createCategory = async (userId, year, month, day, categoryData) => {
  const response = await api.post(`/users/${userId}/calendars/${year}/dailies/${month}/${day}/category`, categoryData);
  return response.data;
};

export const updateCategory = async (userId, year, month, day, categoryId, categoryData) => {
  const response = await api.patch(`/users/${userId}/calendars/${year}/dailies/${month}/${day}/category/${categoryId}`, categoryData);
  return response.data;
};

export const deleteCategory = async (userId, year, month, day, categoryId) => {
  const response = await api.delete(`/users/${userId}/calendars/${year}/dailies/${month}/${day}/category/${categoryId}`);
  return response.data;
};

export const deleteCategories = async (userId, year, month, day) => {
  const response = await api.delete(`/users/${userId}/calendars/${year}/dailies/${month}/${day}/category`);
  return response.data;
};