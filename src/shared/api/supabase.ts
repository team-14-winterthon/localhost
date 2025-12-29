import { createClient } from '@supabase/supabase-js'
import { env } from '../utils/env'

const supabaseUrl = env.supabase.url
const supabaseAnonKey = env.supabase.anonKey

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
