import { requireSupabase } from '../lib/supabase.ts'
import type { Vehicle, VehiclePayload } from '../types.ts'

const vehicleColumns =
  'id,title,brand,category,origin,engine,price,image_query,created_at' as const

export async function getVehicles(): Promise<Vehicle[]> {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('vehicles')
    .select(vehicleColumns)
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as Vehicle[]
}

export async function getLatestVehicles(limit = 4): Promise<Vehicle[]> {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('vehicles')
    .select(vehicleColumns)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    throw new Error(error.message)
  }

  return (data ?? []) as Vehicle[]
}

export async function getVehicleById(id: number | string): Promise<Vehicle> {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('vehicles')
    .select(vehicleColumns)
    .eq('id', id)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as Vehicle
}

export async function createVehicle(
  vehiclePayload: VehiclePayload,
): Promise<Vehicle> {
  const supabase = requireSupabase()
  const { data, error } = await supabase
    .from('vehicles')
    .insert(vehiclePayload)
    .select(vehicleColumns)
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data as Vehicle
}

export async function deleteVehicle(id: number | string): Promise<void> {
  const supabase = requireSupabase()
  const { error } = await supabase.from('vehicles').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}
