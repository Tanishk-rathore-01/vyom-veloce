export type VehicleCategory = 'car' | 'motorcycle'

export type VehicleOrigin = 'indian' | 'international'

export interface Vehicle {
  id: number
  title: string
  brand: string
  category: VehicleCategory
  origin: VehicleOrigin
  engine: string | null
  price: number
  image_query: string | null
  created_at: string
}

export interface VehiclePayload {
  title: string
  brand: string
  category: VehicleCategory
  origin: VehicleOrigin
  engine?: string
  price: number
  image_query?: string
}

export interface Buyer {
  name: string
  email: string
  phone: string
}

export interface RazorpaySuccessResponse {
  razorpay_payment_id: string
  razorpay_order_id?: string
  razorpay_signature?: string
}

export interface ModificationRequest {
  id?: number
  name: string
  email: string
  phone: string
  vehicle_model: string
  modification_type: string
  budget_range: string
  message?: string
  created_at?: string
}

export interface ListingRequest {
  id?: number
  name: string
  email: string
  phone: string
  vehicle_details: string
  asking_price: number
  location?: string
  created_at?: string
}
