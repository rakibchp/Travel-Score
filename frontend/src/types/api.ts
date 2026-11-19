/** Response envelope used by every backend endpoint. */
export type ApiSuccess<T> = {
  success: true
  data: T
  meta?: PaginationMeta
}

export type ApiFailure = {
  success: false
  error: { code: string; message: string; details?: unknown }
}

export type PaginationMeta = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type OverviewStats = {
  totalDestinations: number
  totalDistricts: number
  totalDivisions: number
  totalCategories: number
}

export type Image = { url: string; publicId?: string; alt?: string }

export type Division = {
  id: string
  name: string
  nameBn: string
  slug: string
  description: string | null
  image: Image | null
  districtCount: number
  destinationCount: number
}

export type District = {
  id: string
  name: string
  nameBn: string
  slug: string
  division: { id: string; name: string; nameBn: string; slug: string }
  location: { type: 'Point'; coordinates: [number, number] } | null
  destinationCount: number
}

export type Category = {
  id: string
  name: string
  nameBn: string
  slug: string
  icon: string | null
  destinationCount: number
}
