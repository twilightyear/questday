import { api } from './client';

//전체 Daily 조회 API HTTP Handler
export const getDailies = async (year) => {
  const response = await api.get(`/calendar/${year}/daily`);
  return response.data;
};

//단일 Daily 조회 API HTTP Handler
export const getDaily = async (year, month, day) => {
  const response = await api.get(`/calendar/${year}/daily/${month}/${day}`);
  return response.data;
};

//단일 Daily 생성 API HTTP Handler
export const createDaily = async (year, dailyData) => {
  const response = await api.post(`/calendar/${year}/daily`, dailyData);
  return response.data;
};

//단일 Daily 삭제 API HTTP Handler
export const deleteDaily = async (year, month, day) => {
  const response = await api.delete(`/calendar/${year}/daily/${month}/${day}`);
  return response.data;
};

//전체 Daily 조회 API HTTP Handler
export const deleteDailies = async (year) => {
  const response = await api.delete(`/calendar/${year}/daily`);
  return response.data;
};

//단일 Daily 수정 API HTTP Handler
export const updateDaily = async (year, month, day, dailyData) => {
  const response = await api.patch(`/calendar/${year}/daily/${month}/${day}`, dailyData);
  return response.data;
};