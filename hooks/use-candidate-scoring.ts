"use client"

import { useState, useCallback } from "react"

interface ScoringRequest {
  candidateId: string
  skillsMatched: string[]
  experienceYears: number
  educationLevel: string
}

interface ScoringResponse {
  candidateId: string
  score: number
  breakdown: {
    skills: number
    experience: number
    education: number
  }
}

export function useCandidateScoring() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const score = useCallback(async (data: ScoringRequest): Promise<ScoringResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/score-candidate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Scoring API error: ${response.statusText}`)
      }

      const result: ScoringResponse = await response.json()
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to score candidate"
      setError(errorMessage)
      console.error("[v0] Scoring error:", errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { score, loading, error }
}
