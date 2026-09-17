import { api } from './client';

//모든 Calendar 조회 API HTTP Handler
export const getCalendars = async () => {
  const response = await api.get(`/calendar`);
  return response.data;
};

//단일 Calendar 조회 API HTTP Handler
export const getCalendar = async (year) => {
  const response = await api.get(`/calendar/${year}`);
  return response.data;
};

//단일 Calendar 생성 API HTTP Handler
export const createCalendar = async (calendarData) => {
  const response = await api.post(`/calendar`, calendarData);
  return response.data;
};

//단일 Calendar 삭제 API HTTP Handler
export const deleteCalendar = async (year) => {
  const response = await api.delete(`/calendar/${year}`);
  return response.data;
};

//모든 Calendar 삭제 API HTTP Handler
export const deleteCalendars = async () => {
  const response = await api.delete(`/calendar`);
  return response.data;
};