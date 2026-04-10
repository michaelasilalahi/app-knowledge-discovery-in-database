import axios from 'axios';

const BASE_URL = 'https://xpensaapi.luxdryft.com';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
