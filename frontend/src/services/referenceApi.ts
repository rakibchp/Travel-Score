import { api } from '@/services/apiClient'
import type { Category, District, Division, OverviewStats } from '@/types/api'

export const referenceApi = {
  getOverview: () => api.get<OverviewStats>('/stats/overview'),
  getDivisions: () => api.get<Division[]>('/divisions'),
  getDistricts: (division?: string) => api.get<District[]>('/districts', { query: { division } }),
  getCategories: () => api.get<Category[]>('/categories'),
}
