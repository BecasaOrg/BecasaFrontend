/* Tipos de las respuestas del backend (Laravel · BecasaBackend). */

export type ApiUser = {
  id: number
  name: string
  last_name: string
  email: string
  avatar?: string | null
  birth_date?: string | null
  birth_country_id?: number | null
  city_id?: number | null
  sport?: string | null
  phone?: string | null
  gender?: 'M' | 'F' | 'Other' | null
  graduation_year?: number | null
  role?: string
}

export type ApiPlace = { id: number; name: string; phone_code?: string }

export type ApiCamp = {
  id: number
  name: string
  description?: string | null
  start_date?: string | null
  end_date?: string | null
  registration_start_date?: string | null
  registration_end_date?: string | null
  price: string | number
  extraordinary_price?: string | number | null
  capacity?: number | null
  sport_type?: string | null
  is_active?: boolean
  city?: { id: number; name: string; state?: { name: string; country?: { name: string } } } | null
  available_spots?: number
  user_is_registered?: boolean
  user_payment_status?: boolean
  registration_id?: number | null
}

export type ApiRegistration = {
  id: number
  user_id: number
  camp_id: number
  identification_number?: string | null
  position?: string | null
  years_experience?: number | null
  skill_level?: string | null
  shirt_size?: string | null
  club_name?: string | null
  school_name?: string | null
  health_insurance_path?: string | null
  dietary_restrictions?: string | null
  medical_conditions?: string | null
  guardian_name?: string | null
  guardian_phone?: string | null
  guardian_email?: string | null
  payment_status?: string | null
  total_price?: string | number | null
  installments_count?: number | null
  created_at?: string
  camp?: ApiCamp | null
}

export type Coupon = {
  id: number
  code: string
  discount_percentage: string | number
  max_installments: string | number
  valid_until?: string | null
  is_active: boolean
}

/** Resultado estándar de una acción del servidor. */
export type Result<T = undefined> =
  | ({ ok: true } & (T extends undefined ? object : { data: T }))
  | { ok: false; error: string; fields?: Record<string, string> }
