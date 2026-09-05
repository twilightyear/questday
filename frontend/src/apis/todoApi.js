import { api } from './client';

export const getTodos = async (userId, year, month, day, categoryId) => {
  const response = await api.get(`/users/${userId}/calendars/${year}/dailies/${month}/${day}/category/${categoryId}/todo`);
  return response.data;
};

export const createTodo = async (userId, year, month, day, categoryId, todoData) => {
  const response = await api.post(`/users/${userId}/calendars/${year}/dailies/${month}/${day}/category/${categoryId}/todo`, todoData);
  return response.data;
};

export const updateTodo = async (userId, year, month, day, categoryId, todoId, todoData) => {
  const response = await api.patch(`/users/${userId}/calendars/${year}/dailies/${month}/${day}/category/${categoryId}/todo/${todoId}`, todoData);
  return response.data;
};

export const deleteTodo = async (userId, year, month, day, categoryId, todoId) => {
  const response = await api.delete(`/users/${userId}/calendars/${year}/dailies/${month}/${day}/category/${categoryId}/todo/${todoId}`);
  return response.data;
};

export const deleteTodos = async (userId, year, month, day, categoryId) => {
  const response = await api.delete(`/users/${userId}/calendars/${year}/dailies/${month}/${day}/category/${categoryId}/todo`);
  return response.data;
};
