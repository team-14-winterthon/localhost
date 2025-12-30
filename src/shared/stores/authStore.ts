import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/features/auth/types'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthActions {
  login: (token: string, user: User) => void
  logout: () => void
  setUser: (user: User) => void
  setLoading: (loading: boolean) => void
  initialize: () => void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // State
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: true,

      // Actions
      login: (token, user) => {
        set({
          token,
          user,
          isAuthenticated: true,
          isLoading: false,
        })
      },

      logout: () => {
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      },

      setUser: (user) => {
        set({ user })
      },

      setLoading: (loading) => {
        set({ isLoading: loading })
      },

      initialize: () => {
        const { token, user } = get()
        set({
          isAuthenticated: !!token && !!user,
          isLoading: false,
        })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        token: state.token,
        user: state.user,
      }),
    }
  )
)
