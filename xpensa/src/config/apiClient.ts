import axios from 'axios';

const BASE_URL = 'https://xpensaapi.luxdryft.com'; // http://192.168.18.16:8000

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
