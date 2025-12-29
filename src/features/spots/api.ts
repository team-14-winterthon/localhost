import { supabase } from '@/shared/api/supabase'
import type { Spot, Visit } from './types'

export const spotsApi = {
  async getAll(): Promise<Spot[]> {
    const { data, error } = await supabase
      .from('spots')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getById(id: string): Promise<Spot | null> {
    const { data, error } = await supabase
      .from('spots')
      .select('*')
      .eq('id', id)
      .single()

    if (error) return null
    return data
  },

  async create(spot: Omit<Spot, 'id' | 'created_at'>): Promise<Spot> {
    const { data, error } = await supabase
      .from('spots')
      .insert(spot)
      .select()
      .single()

    if (error) throw error
    return data
  },
}

export const visitsApi = {
  async create(visit: Omit<Visit, 'id' | 'created_at'>): Promise<Visit> {
    const { data, error } = await supabase
      .from('visits')
      .insert(visit)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getByUser(userId: string): Promise<Visit[]> {
    const { data, error } = await supabase
      .from('visits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },
}
