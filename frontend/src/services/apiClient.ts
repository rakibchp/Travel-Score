import type { ApiFailure, ApiSuccess } from '@/types/api'

/**
 * Base URL is relative by default: in dev Vite proxies /api to the backend,
 * in production vercel.json rewrites /api to the backend project.
 * Only set VITE_API_BASE_URL to call a backend on another origin directly.
 */
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, '') || '/api/v1'

export class ApiClientError extends Error {
  readonly status: number
  readonly code: string
  readonly details?: unknown

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.code = code
    this.details = details
  }
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
  query?: Record<string, string | number | boolean | undefined | null>
}

function buildUrl(path: string, query?: RequestOptions['query']) {
  const url = `${API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`
  if (!query) return url
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') params.set(key, String(value))
  }
  const qs = params.toString()
  return qs ? `${url}?${qs}` : url
}

/** Fetch wrapper that unwraps { success, data } and throws ApiClientError on failure. */
export async function apiRequest<T>(path: string, { body, query, headers, ...init }: RequestOptions = {}): Promise<T> {
  let response: Response
  try {
    response = await fetch(buildUrl(path, query), {
      ...init,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiClientError(0, 'NETWORK_ERROR', 'Could not reach the server. Check your connection and try again.')
  }

  let payload: ApiSuccess<T> | ApiFailure | null = null
  try {
    payload = (await response.json()) as ApiSuccess<T> | ApiFailure
  } catch {
    // Non-JSON response (e.g. a proxy error page)
  }

  if (!response.ok || !payload || payload.success === false) {
    const err = payload && payload.success === false ? payload.error : null
    throw new ApiClientError(
      response.status,
      err?.code ?? 'UNKNOWN_ERROR',
      err?.message ?? `Request failed (${response.status})`,
      err?.details,
    )
  }

  return payload.data
}

export const api = {
  get: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'GET' }),
  post: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'POST', body }),
  put: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'PUT', body }),
  patch: <T>(path: string, body?: unknown, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'PATCH', body }),
  delete: <T>(path: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    apiRequest<T>(path, { ...options, method: 'DELETE' }),
}
