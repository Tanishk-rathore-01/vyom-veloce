import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Vehicle, ModificationRequest, ListingRequest } from '../types.ts'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const hasSupabaseCredentials = Boolean(supabaseUrl && supabaseAnonKey)

export type TypedSupabaseClient = SupabaseClient<
  {
    vehicles: {
      Row: Vehicle
      Insert: Omit<Vehicle, 'id' | 'created_at'>
      Update: Partial<Omit<Vehicle, 'id' | 'created_at'>>
    }
    modification_requests: {
      Row: Required<ModificationRequest>
      Insert: Omit<ModificationRequest, 'id' | 'created_at'>
      Update: Partial<Omit<ModificationRequest, 'id' | 'created_at'>>
    }
    listing_requests: {
      Row: Required<ListingRequest>
      Insert: Omit<ListingRequest, 'id' | 'created_at'>
      Update: Partial<Omit<ListingRequest, 'id' | 'created_at'>>
    }
  },
  'public',
  {
    auth: {
      persistSession: true
      autoRefreshToken: true
    }
  }
>

export const supabase: TypedSupabaseClient | null = hasSupabaseCredentials
  ? (createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    }) as TypedSupabaseClient)
  : null

export function requireSupabase(): TypedSupabaseClient {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.',
    )
  }
  return supabase
}
