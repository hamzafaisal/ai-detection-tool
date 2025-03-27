import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { getUserById, loginUser, registerUser } from '@/lib/supabase/users';

interface User {
  id: number;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (username: string, password: string) => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

// Type-safe implementation that matches AuthState
const authStore = (set: any, get: any): AuthState => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  register: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Use API route instead of direct Prisma query
      // const response = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, password }),
      // });

      const result = await registerUser(username, password)
      // const data = await response.json();

      if (!result.success) {
        set({
          isLoading: false,
          error: result.message || 'Registration failed',
        });
        return false;
      }

      if (result.user) {
        set({
          user: {
            id: result.user.id,
            username: result.user.username,
          },
          isAuthenticated: true,
          isLoading: false,
        });
        // Set cookie for session management
        Cookies.set('user_id', String(result.user.id), { expires: 7 });
        return true;
      } else {
        return true;
      }



    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Registration failed',
      });
      return false;
    }
  },

  login: async (username: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      // Use API route instead of direct Prisma query
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ username, password }),
      // });


      const result = await loginUser(username, password)
      // const data = await response.json();

      if (result.success && result.user) {
        set({
          user: {
            id: result.user.id,
            username: result.user.username,
          },
          isAuthenticated: true,
          isLoading: false,
        });
        // Set cookie for session management
        Cookies.set('user_id', String(result.user.id), { expires: 7 });
        return true;
      } else {
        // Handle the case where result.user is null or undefined
        set({
          isLoading: false,
          error: 'Authentication failed',
        });
        return false;
      }
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || 'Authentication failed',
      });
      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      // Call the logout API endpoint
      // await fetch('/api/auth/logout', {
      //   method: 'POST',
      // });

      // Remove client-side cookie
      Cookies.remove('user_id');

      // Clear the store state
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Still clear local state even if API call fails
      Cookies.remove('user_id');
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  },

  checkAuth: async () => {
    const userId = Cookies.get('user_id');

    if (!userId) {
      set({ isAuthenticated: false, user: null });
      return false;
    }

    set({ isLoading: true, error: null });
    try {
      // Call the user API to validate the session
      // const response = await fetch('/api/auth/user', {
      //   method: 'GET',
      // });

      const result = await getUserById(userId);
      if (!result.message) {
        // Clear invalid cookie
        Cookies.remove('user_id');
        set({
          isLoading: false,
          isAuthenticated: false,
          user: null,
        });
        return false;
      }

      // const userData = await response.json();

      // Update user state with verified data
      set({
        user: result.user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    } catch (error) {
      // Clear cookie on error
      Cookies.remove('user_id');

      set({
        isLoading: false,
        isAuthenticated: false,
        user: null,
        error: 'Failed to verify authentication',
      });
      return false;
    }
  },
});

// Create the store with middleware
const useAuthStore = create<AuthState>()(
  devtools(
    persist(authStore, {
      name: 'auth-storage',
      // Only persist non-sensitive data
      partialize: (state: AuthState) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user ? { id: state.user.id, username: state.user.username } : null,
      }),
    })
  )
);

export default useAuthStore;
