import axios from 'axios';

const BASE_URL = 'http://10.10.1.5:8000';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
