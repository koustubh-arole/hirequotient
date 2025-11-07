import { type NextRequest, NextResponse } from "next/server"

// Mock user database (in production, store in database)
const mockUsers = [
  {
    id: "1",
    name: "Demo Recruiter",
    email: "demo@example.com",
    password: "demo123",
    companyName: "TechCorp",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { name, email, companyName, password } = await request.json()

    // Validate input
    if (!name || !email || !companyName || !password) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    if (mockUsers.some((u) => u.email === email)) {
      return NextResponse.json({ message: "Email already registered" }, { status: 409 })
    }

    // Create new user
    const newUser = {
      id: String(mockUsers.length + 1),
      name,
      email,
      companyName,
      password,
    }

    mockUsers.push(newUser)

    // Create mock token
    const token = Buffer.from(JSON.stringify({ userId: newUser.id, email: newUser.email })).toString("base64")

    return NextResponse.json(
      {
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          companyName: newUser.companyName,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
