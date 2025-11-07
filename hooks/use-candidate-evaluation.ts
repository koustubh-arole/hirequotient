"use client"

import { useState } from "react"

interface EvaluationRequest {
  jd: string
  resume: string
}

interface EvaluationResponse {
  jobDescription: string
  resume: string
  mustHaveSkills: Array<{ skill: string; found: boolean; evidence: string }>
  shouldHaveSkills: Array<{ skill: string; found: boolean; evidence: string }>
  bonusSkills: Array<{ skill: string; found: boolean; evidence: string }>
  overallScore: number
  recommendation: string
  topCandidates: Array<{
    id: number
    name: string
    score: number
    mustHaveMatch: number
    hoursOnUsage: number
    experience: number
    bonusSkills: number
    matchedSkills: string[]
    gap: string[]
  }>
}

export function useCandidateEvaluation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const evaluate = async (data: EvaluationRequest): Promise<EvaluationResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      console.log("[v0] Evaluation request started with JD and resume")

      const response = await fetch("/api/evaluate-candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.log("[v0] Error response:", errorText)
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType?.includes("application/json")) {
        console.log("[v0] Invalid content type:", contentType)
        throw new Error(`Invalid response type: expected JSON, got ${contentType}`)
      }

      const result: EvaluationResponse = await response.json()
      console.log("[v0] Evaluation successful:", result.overallScore)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to evaluate candidates"
      setError(errorMessage)
      console.error("[v0] Evaluation error:", errorMessage)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { evaluate, loading, error }
}
