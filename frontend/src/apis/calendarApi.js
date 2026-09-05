import { api } from './client';

export const getCalendars = async (userId) => {
  const response = await api.get(`/users/${userId}/calendars`);
  return response.data;
};

export const getCalendar = async (userId, year) => {
  const response = await api.get(`/users/${userId}/calendars/${year}`);
  return response.data;
};

export const createCalendar = async (userId, calendarData) => {
  const response = await api.post(`/users/${userId}/calendars`, calendarData);
  return response.data;
};

export const deleteCalendar = async (userId, year) => {
  const response = await api.delete(`/users/${userId}/calendars/${year}`);
  return response.data;
};

export const deleteCalendars = async (userId) => {
  const response = await api.delete(`/users/${userId}/calendars`);
  return response.data;
};