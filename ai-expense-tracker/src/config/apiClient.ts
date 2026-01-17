import axios from 'axios';

// Ganti IP sesuai IP Laptop Anda saat ini
const BASE_URL = 'http://192.168.18.16:8000';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Error jika server tidak balas dalam 10 detik
  headers: {
    'Content-Type': 'application/json',
  },
});
