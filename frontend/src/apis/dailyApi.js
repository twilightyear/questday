import { api } from './client';

export const getDailies = async (year) => {
  const response = await api.get(`/calendar/${year}/daily`);
  return response.data;
};

export const getDaily = async (year, month, day) => {
  const response = await api.get(`/calendar/${year}/daily/${month}/${day}`);
  return response.data;
};

export const createDaily = async (year, dailyData) => {
  const response = await api.post(`/calendar/${year}/daily`, dailyData);
  return response.data;
};

export const deleteDaily = async (year, month, day) => {
  const response = await api.delete(`/calendar/${year}/daily/${month}/${day}`);
  return response.data;
};

export const deleteDailies = async (year) => {
  const response = await api.delete(`/calendar/${year}/daily`);
  return response.data;
};

export const updateDaily = async (year, month, day, dailyData) => {
  const response = await api.patch(`/calendar/${year}/daily/${month}/${day}`, dailyData);
  return response.data;
};