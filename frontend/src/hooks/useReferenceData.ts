import { useQuery } from '@tanstack/react-query'
import { referenceApi } from '@/services/referenceApi'

/** Query keys live in one place so later mutations can invalidate them precisely. */
export const referenceKeys = {
  overview: ['stats', 'overview'] as const,
  divisions: ['divisions'] as const,
  districts: (division?: string) => ['districts', division ?? 'all'] as const,
  categories: ['categories'] as const,
}

const TEN_MINUTES = 10 * 60 * 1000

export function useOverviewStats() {
  return useQuery({ queryKey: referenceKeys.overview, queryFn: referenceApi.getOverview, staleTime: 60_000 })
}

export function useDivisions() {
  return useQuery({ queryKey: referenceKeys.divisions, queryFn: referenceApi.getDivisions, staleTime: TEN_MINUTES })
}

export function useDistricts(division?: string) {
  return useQuery({
    queryKey: referenceKeys.districts(division),
    queryFn: () => referenceApi.getDistricts(division),
    staleTime: TEN_MINUTES,
  })
}

export function useCategories() {
  return useQuery({ queryKey: referenceKeys.categories, queryFn: referenceApi.getCategories, staleTime: TEN_MINUTES })
}
