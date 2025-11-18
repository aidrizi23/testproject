import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from './api';
import { User, AuthResponse, Cart, Product } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

interface CartState {
  cart: Cart | null;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateCartItem: (cartItemId: number, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const response = await api.post<AuthResponse>('/auth/login', { email, password });
          const { token, ...user } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          set({ user, token, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      register: async (data: any) => {
        try {
          const response = await api.post<AuthResponse>('/auth/register', data);
          const { token, ...user } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          set({ user, token, isAuthenticated: true });
        } catch (error) {
          throw error;
        }
      },
      logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ user: null, token: null, isAuthenticated: false });
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get<Cart>('/cart');
      set({ cart: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
  addToCart: async (productId: number, quantity: number) => {
    try {
      const response = await api.post<Cart>('/cart/items', { productId, quantity });
      set({ cart: response.data });
    } catch (error) {
      throw error;
    }
  },
  updateCartItem: async (cartItemId: number, quantity: number) => {
    try {
      const response = await api.put<Cart>(`/cart/items/${cartItemId}`, { quantity });
      set({ cart: response.data });
    } catch (error) {
      throw error;
    }
  },
  removeFromCart: async (cartItemId: number) => {
    try {
      const response = await api.delete<Cart>(`/cart/items/${cartItemId}`);
      set({ cart: response.data });
    } catch (error) {
      throw error;
    }
  },
  clearCart: async () => {
    try {
      await api.delete('/cart');
      set({ cart: null });
    } catch (error) {
      throw error;
    }
  },
}));
