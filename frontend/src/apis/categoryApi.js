import { api } from './client';

//전체 Category 조회 API HTTP Handler
export const getCategories = async (year, month, day) => {
  const response = await api.get(`/calendar/${year}/daily/${month}/${day}/category`);
  return response.data;
};

//단일 Category 조회 API HTTP Handler
export const getCategory = async (year, month, day, categoryId) => {
  const response = await api.get(`/calendar/${year}/daily/${month}/${day}/category/${categoryId}`);
  return response.data;
};

//단일 Category 생성 API HTTP Handler
export const createCategory = async (year, month, day, categoryData) => {
  const response = await api.post(`/calendar/${year}/daily/${month}/${day}/category`, categoryData);
  return response.data;
};

//단일 Category 수정 API HTTP Handler
export const updateCategory = async (year, month, day, categoryId, categoryData) => {
  const response = await api.patch(`/calendar/${year}/daily/${month}/${day}/category/${categoryId}`, categoryData);
  return response.data;
};

//단일 Category 삭제 API HTTP Handler
export const deleteCategory = async (year, month, day, categoryId) => {
  const response = await api.delete(`/calendar/${year}/daily/${month}/${day}/category/${categoryId}`);
  return response.data;
};

//전체 Category 삭제 API HTTP Handler
export const deleteCategories = async (year, month, day) => {
  const response = await api.delete(`/calendar/${year}/daily/${month}/${day}/category`);
  return response.data;
};