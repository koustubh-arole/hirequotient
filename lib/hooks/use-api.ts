"use client"

import { useState, useCallback } from "react"

interface UseApiOptions {
  onError?: (error: Error) => void
  onSuccess?: <T>(data: T) => void
}

export function useApi<T>(options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(
    async (request: () => Promise<T>): Promise<T | null> => {
      setLoading(true)
      setError(null)

      try {
        const result = await request()
        setData(result)
        options.onSuccess?.(result)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err))
        setError(error)
        options.onError?.(error)
        return null
      } finally {
        setLoading(false)
      }
    },
    [options],
  )

  return { data, loading, error, execute }
}
