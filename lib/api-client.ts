// Centralized API client for candidate evaluation system
// Replace API_BASE_URL with your actual backend URL

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

interface ApiRequestOptions extends RequestInit {
  timeout?: number
}

async function apiRequest<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const { timeout = 30000, ...fetchOptions } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeout)

  try {
    const url = `${API_BASE_URL}${endpoint}`
    console.log("[v0] API Request:", url)

    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`)
    }

    const data: T = await response.json()
    return data
  } catch (error) {
    if (error instanceof Error) {
      console.error("[v0] API Error:", error.message)
    }
    throw error
  } finally {
    clearTimeout(timeoutId)
  }
}

export const apiClient = {
  get: <T,>(endpoint: string, options?: ApiRequestOptions) => apiRequest<T>(endpoint, { ...options, method: "GET" }),

  post: <T,>(endpoint: string, data?: unknown, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T,>(endpoint: string, data?: unknown, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T,>(endpoint: string, options?: ApiRequestOptions) =>
    apiRequest<T>(endpoint, { ...options, method: "DELETE" }),
}
