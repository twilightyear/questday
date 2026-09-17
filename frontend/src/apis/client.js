import axios from 'axios';

//API Handler 클라이언트
export const api = axios.create({
  baseURL: 'https://improved-capybara-jgggj56j7462jj54-8000.app.github.dev',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});