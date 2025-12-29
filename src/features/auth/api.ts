import { supabase } from '@/shared/api/supabase'
import type { User } from './types'

export const authApi = {
  async login(nickname: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert({ nickname })
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getCurrentUser(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) return null
    return data
  },
}
