import { type NextRequest, NextResponse } from "next/server"

// Mock recruiter credentials for demo
const MOCK_RECRUITERS = [
  {
    id: "rec-001",
    name: "Sarah Johnson",
    email: "sarah@hirequotient.com",
    password: "password123",
    company: "HireQuotient",
    role: "recruiter" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "rec-002",
    name: "Michael Chen",
    email: "michael@hirequotient.com",
    password: "password123",
    company: "HireQuotient",
    role: "recruiter" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: "rec-003",
    name: "Emma Wilson",
    email: "emma@hirequotient.com",
    password: "password123",
    company: "HireQuotient",
    role: "admin" as const,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Find recruiter with matching credentials
    const recruiter = MOCK_RECRUITERS.find((r) => r.email === email && r.password === password)

    if (!recruiter) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Generate mock JWT token
    const token = Buffer.from(
      JSON.stringify({
        id: recruiter.id,
        email: recruiter.email,
        iat: Date.now(),
      }),
    ).toString("base64")

    const { password: _, ...user } = recruiter

    return NextResponse.json({
      user,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
