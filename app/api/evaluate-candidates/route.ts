import { type NextRequest, NextResponse } from "next/server"

// Mock evaluation data - replace with your AI evaluation logic
function generateMockEvaluation(jd: string, resume: string) {
  const mustHaveSkills = [
    {
      skill: "Python",
      found: resume.toLowerCase().includes("python"),
      evidence: resume.toLowerCase().includes("python") ? "Mentioned in resume" : "Not found",
    },
    {
      skill: "PostgreSQL",
      found: resume.toLowerCase().includes("postgresql") || resume.toLowerCase().includes("postgres"),
      evidence: resume.toLowerCase().includes("postgresql") ? "Mentioned in resume" : "Not found",
    },
    {
      skill: "REST APIs",
      found: resume.toLowerCase().includes("rest") || resume.toLowerCase().includes("api"),
      evidence:
        resume.toLowerCase().includes("rest") || resume.toLowerCase().includes("api")
          ? "Demonstrated in projects"
          : "Not found",
    },
  ]

  const shouldHaveSkills = [
    {
      skill: "AWS",
      found: resume.toLowerCase().includes("aws"),
      evidence: resume.toLowerCase().includes("aws") ? "Cloud experience mentioned" : "No cloud experience specified",
    },
    {
      skill: "Docker",
      found: resume.toLowerCase().includes("docker"),
      evidence: resume.toLowerCase().includes("docker") ? "Containerization experience" : "Not mentioned",
    },
  ]

  const bonusSkills = [
    {
      skill: "FastAPI",
      found: resume.toLowerCase().includes("fastapi"),
      evidence: resume.toLowerCase().includes("fastapi") ? "Framework expertise" : "Not mentioned",
    },
    {
      skill: "Fintech",
      found: resume.toLowerCase().includes("fintech") || resume.toLowerCase().includes("finance"),
      evidence: resume.toLowerCase().includes("fintech") ? "Domain experience" : "Not specified",
    },
  ]

  const mustHaveCount = mustHaveSkills.filter((s) => s.found).length
  const shouldHaveCount = shouldHaveSkills.filter((s) => s.found).length
  const bonusCount = bonusSkills.filter((s) => s.found).length

  const overallScore = Math.round(
    (mustHaveCount / mustHaveSkills.length) * 60 +
      (shouldHaveCount / shouldHaveSkills.length) * 30 +
      (bonusCount / bonusSkills.length) * 10,
  )

  const recommendation =
    mustHaveCount === mustHaveSkills.length
      ? "Strong match - Highly recommended"
      : mustHaveCount >= mustHaveSkills.length - 1
        ? "Good fit - Consider for interview"
        : "Moderate fit - May need training"

  return {
    jobDescription: jd.substring(0, 100) + "...",
    resume: resume.substring(0, 100) + "...",
    mustHaveSkills,
    shouldHaveSkills,
    bonusSkills,
    overallScore,
    recommendation,
    topCandidates: [
      {
        id: 1,
        name: "Alice Johnson",
        score: overallScore + 5,
        mustHaveMatch: mustHaveCount,
        hoursOnUsage: 2400,
        experience: 5,
        bonusSkills: bonusCount,
        matchedSkills: mustHaveSkills.filter((s) => s.found).map((s) => s.skill),
        gap: mustHaveSkills.filter((s) => !s.found).map((s) => s.skill),
      },
      {
        id: 2,
        name: "Bob Smith",
        score: overallScore - 2,
        mustHaveMatch: Math.max(0, mustHaveCount - 1),
        hoursOnUsage: 2000,
        experience: 4,
        bonusSkills: bonusCount - 1,
        matchedSkills: mustHaveSkills
          .slice(0, -1)
          .filter((s) => s.found)
          .map((s) => s.skill),
        gap: mustHaveSkills.filter((s) => !s.found).map((s) => s.skill),
      },
      {
        id: 3,
        name: "Carol White",
        score: overallScore,
        mustHaveMatch: mustHaveCount,
        hoursOnUsage: 2300,
        experience: 5,
        bonusSkills: bonusCount,
        matchedSkills: mustHaveSkills.filter((s) => s.found).map((s) => s.skill),
        gap: mustHaveSkills.filter((s) => !s.found).map((s) => s.skill),
      },
      {
        id: 4,
        name: "David Lee",
        score: overallScore - 5,
        mustHaveMatch: Math.max(0, mustHaveCount - 2),
        hoursOnUsage: 1800,
        experience: 3,
        bonusSkills: Math.max(0, bonusCount - 1),
        matchedSkills: mustHaveSkills
          .slice(0, 1)
          .filter((s) => s.found)
          .map((s) => s.skill),
        gap: mustHaveSkills.filter((s) => !s.found).map((s) => s.skill),
      },
      {
        id: 5,
        name: "Emma Davis",
        score: overallScore + 2,
        mustHaveMatch: mustHaveCount,
        hoursOnUsage: 2200,
        experience: 4,
        bonusSkills: bonusCount,
        matchedSkills: mustHaveSkills.filter((s) => s.found).map((s) => s.skill),
        gap: mustHaveSkills.filter((s) => !s.found).map((s) => s.skill),
      },
    ],
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { jd, resume } = body

    if (!jd || !resume) {
      return NextResponse.json({ error: "Missing JD or resume" }, { status: 400 })
    }

    // Generate mock evaluation
    // TODO: Replace with actual AI evaluation logic from your backend
    const evaluation = generateMockEvaluation(jd, resume)

    return NextResponse.json(evaluation)
  } catch (error) {
    console.error("[v0] API error:", error)
    return NextResponse.json({ error: "Failed to evaluate candidates" }, { status: 500 })
  }
}
