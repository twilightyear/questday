import { api } from './client';

export const getTodos = async (year, month, day, categoryId) => {
  const response = await api.get(`/calendar/${year}/daily/${month}/${day}/category/${categoryId}/todo`);
  return response.data;
};

export const createTodo = async (year, month, day, categoryId, todoData) => {
  const response = await api.post(`/calendar/${year}/daily/${month}/${day}/category/${categoryId}/todo`, todoData);
  return response.data;
};

export const updateTodo = async (year, month, day, categoryId, todoId, todoData) => {
  const response = await api.patch(`/calendar/${year}/daily/${month}/${day}/category/${categoryId}/todo/${todoId}`, todoData);
  return response.data;
};

export const deleteTodo = async (year, month, day, categoryId, todoId) => {
  const response = await api.delete(`/calendar/${year}/daily/${month}/${day}/category/${categoryId}/todo/${todoId}`);
  return response.data;
};

export const deleteTodos = async (year, month, day, categoryId) => {
  const response = await api.delete(`/calendar/${year}/daily/${month}/${day}/category/${categoryId}/todo`);
  return response.data;
};
