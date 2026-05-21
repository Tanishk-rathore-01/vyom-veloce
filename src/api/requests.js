import { requireSupabase } from '../lib/supabase.js'

export async function createModificationRequest(payload) {
  const supabase = requireSupabase()
  const { error } = await supabase.from('modification_requests').insert(payload)
  if (error) {
    throw new Error(error.message)
  }
}

export async function createListingRequest(payload) {
  const supabase = requireSupabase()
  const { error } = await supabase.from('listing_requests').insert(payload)
  if (error) {
    throw new Error(error.message)
  }
}

export async function getModificationRequests() {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('modification_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

export async function getListingRequests() {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('listing_requests')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}
