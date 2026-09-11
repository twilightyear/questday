import { api } from './client';

export const getCalendars = async () => {
  const response = await api.get(`/calendar`);
  return response.data;
};

export const getCalendar = async (year) => {
  const response = await api.get(`/calendar/${year}`);
  return response.data;
};

export const createCalendar = async (calendarData) => {
  const response = await api.post(`/calendar`, calendarData);
  return response.data;
};

export const deleteCalendar = async (year) => {
  const response = await api.delete(`/calendar/${year}`);
  return response.data;
};

export const deleteCalendars = async () => {
  const response = await api.delete(`/calendar`);
  return response.data;
};