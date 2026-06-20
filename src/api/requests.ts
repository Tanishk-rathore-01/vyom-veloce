import { requireSupabase } from '../lib/supabase.ts'
import type { ModificationRequest, ListingRequest } from '../types.ts'

export async function createModificationRequest(
  payload: Omit<ModificationRequest, 'id' | 'created_at'>,
): Promise<void> {
  const supabase = requireSupabase()
  const { error } = await supabase.from('modification_requests').insert(payload)
  if (error) {
    throw new Error(error.message)
  }
}

export async function createListingRequest(
  payload: Omit<ListingRequest, 'id' | 'created_at'>,
): Promise<void> {
  const supabase = requireSupabase()
  const { error } = await supabase.from('listing_requests').insert(payload)
  if (error) {
    throw new Error(error.message)
  }
}

export async function getModificationRequests(): Promise<ModificationRequest[]> {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('modification_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as ModificationRequest[]
}

export async function getListingRequests(): Promise<ListingRequest[]> {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('listing_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as ListingRequest[]
}
