const numberFormatter = new Intl.NumberFormat('en-US')

export function formatNumber(value: number) {
  return numberFormatter.format(value)
}

/** Percentage with one decimal, never NaN when the total is zero. */
export function percentage(part: number, total: number) {
  if (total <= 0) return 0
  return Math.round((part / total) * 1000) / 10
}
