import { api } from './client';

export const getCategories = async (year, month, day) => {
  const response = await api.get(`/calendar/${year}/daily/${month}/${day}/category`);
  return response.data;
};

export const getCategory = async (year, month, day, categoryId) => {
  const response = await api.get(`/calendar/${year}/daily/${month}/${day}/category/${categoryId}`);
  return response.data;
};

export const createCategory = async (year, month, day, categoryData) => {
  const response = await api.post(`/calendar/${year}/daily/${month}/${day}/category`, categoryData);
  return response.data;
};

export const updateCategory = async (year, month, day, categoryId, categoryData) => {
  const response = await api.patch(`/calendar/${year}/daily/${month}/${day}/category/${categoryId}`, categoryData);
  return response.data;
};

export const deleteCategory = async (year, month, day, categoryId) => {
  const response = await api.delete(`/calendar/${year}/daily/${month}/${day}/category/${categoryId}`);
  return response.data;
};

export const deleteCategories = async (year, month, day) => {
  const response = await api.delete(`/calendar/${year}/daily/${month}/${day}/category`);
  return response.data;
};