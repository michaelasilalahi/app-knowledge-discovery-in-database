import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  id: string;
  email: string;
  name: string | null;
  photo: string | null;
  idToken: string | null; // token untuk dikirim ke fast api
}

interface AuthState {
  user: UserData | null;
  isLoggedIn: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      // fungsi login: simpan data user & ubah status state true
      login: (userData) =>
        set({
          user: userData,
          isLoggedIn: true,
        }),

      // fungsi logout: hapus data user & ubah status state false
      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
