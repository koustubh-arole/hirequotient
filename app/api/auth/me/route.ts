import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const mockUsers = [
  {
    id: "1",
    name: "Demo Recruiter",
    email: "demo@example.com",
    password: "demo123",
    companyName: "TechCorp",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    companyName: "Acme Inc",
  },
]

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)

    // Decode mock token
    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString())
      const user = mockUsers.find((u) => u.id === decoded.userId)

      if (!user) {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }

      return NextResponse.json({
        id: user.id,
        name: user.name,
        email: user.email,
        companyName: user.companyName,
      })
    } catch (error) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }
  } catch (error) {
    console.error("[v0] Auth check error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
