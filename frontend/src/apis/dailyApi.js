import { api } from './client';

export const getDailies = async (userId, year) => {
  const response = await api.get(`/users/${userId}/calendars/${year}/dailies`);
  return response.data;
};

export const getDaily = async (userId, year, month, day) => {
  const response = await api.get(`/users/${userId}/calendars/${year}/dailies/${month}/${day}`);
  return response.data;
};

export const createDaily = async (userId, year, dailyData) => {
  const response = await api.post(`/users/${userId}/calendars/${year}/dailies`, dailyData);
  return response.data;
};

export const deleteDaily = async (userId, year, month, day) => {
  const response = await api.delete(`/users/${userId}/calendars/${year}/dailies/${month}/${day}`);
  return response.data;
};

export const deleteDailies = async (userId, year) => {
  const response = await api.delete(`/users/${userId}/calendars/${year}/dailies`);
  return response.data;
};

export const updateDaily = async (userId, year, month, day, dailyData) => {
  const response = await api.patch(`/users/${userId}/calendars/${year}/dailies/${month}/${day}`, dailyData);
  return response.data;
};