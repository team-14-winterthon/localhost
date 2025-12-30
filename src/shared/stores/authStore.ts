import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  nickname: string
  email?: string
}

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean

  // Actions
  setAuth: (token: string, user?: User) => void
  setUser: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (token, user) => {
        // Also set to localStorage for apiClient compatibility
        localStorage.setItem('authToken', token)
        set({
          token,
          user: user ?? null,
          isAuthenticated: true,
          isLoading: false
        })
      },

      setUser: (user) => set({ user }),

      logout: () => {
        localStorage.removeItem('authToken')
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        })
      },

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
      onRehydrateStorage: () => (state) => {
        // Sync token with localStorage on rehydration
        if (state?.token) {
          localStorage.setItem('authToken', state.token)
        }
        state?.setLoading(false)
      },
    }
  )
)
