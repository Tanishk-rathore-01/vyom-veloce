import { requireSupabase } from '../lib/supabase.js'

const vehicleColumns =
  'id,title,brand,category,origin,engine,price,image_query,created_at'

export async function getVehicles() {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('vehicles')
    .select(vehicleColumns)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

export async function getLatestVehicles(limit = 4) {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('vehicles')
    .select(vehicleColumns)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(error.message)
  }

  return data ?? []
}

export async function getVehicleById(id) {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('vehicles')
    .select(vehicleColumns)
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function createVehicle(vehiclePayload) {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('vehicles')
    .insert(vehiclePayload)
    .select(vehicleColumns)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function deleteVehicle(id) {
  const supabase = requireSupabase()
  const { error } = await supabase.from('vehicles').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}
