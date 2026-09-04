import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://improved-capybara-jgggj56j7462jj54-8000.app.github.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});