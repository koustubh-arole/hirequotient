"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import type { AuthUser } from "@/lib/auth-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Users, TrendingUp, CheckCircle, XCircle, Award, Target, LogOut, Star, FileText } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Candidate {
  id: string
  name: string
  email: string
  position: string
  yearsOfExperience: number
  skills: string[]
  overallScore: number
  status: "pending" | "interviewed" | "hired" | "rejected"
}

// Mock candidates data
const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "1",
    name: "Alex Kumar",
    email: "alex.kumar@email.com",
    position: "Senior React Developer",
    yearsOfExperience: 5,
    skills: ["React", "TypeScript", "Node.js", "AWS"],
    overallScore: 95,
    status: "pending",
  },
  {
    id: "2",
    name: "Jessica Lee",
    email: "jessica.lee@email.com",
    position: "Full Stack Developer",
    yearsOfExperience: 4,
    skills: ["React", "Python", "PostgreSQL", "Docker"],
    overallScore: 88,
    status: "interviewed",
  },
  {
    id: "3",
    name: "David Martinez",
    email: "david.martinez@email.com",
    position: "Backend Developer",
    yearsOfExperience: 6,
    skills: ["Node.js", "Java", "Kubernetes", "MongoDB"],
    overallScore: 92,
    status: "pending",
  },
  {
    id: "4",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    position: "Frontend Developer",
    yearsOfExperience: 3,
    skills: ["React", "Vue.js", "CSS", "JavaScript"],
    overallScore: 85,
    status: "interviewed",
  },
  {
    id: "5",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    position: "DevOps Engineer",
    yearsOfExperience: 7,
    skills: ["Kubernetes", "Docker", "AWS", "Terraform"],
    overallScore: 90,
    status: "hired",
  },
  {
    id: "6",
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    position: "Data Engineer",
    yearsOfExperience: 4,
    skills: ["Python", "Spark", "SQL", "ETL"],
    overallScore: 87,
    status: "pending",
  },
  {
    id: "7",
    name: "James Wilson",
    email: "james.wilson@email.com",
    position: "QA Engineer",
    yearsOfExperience: 3,
    skills: ["Selenium", "Jest", "Python", "CI/CD"],
    overallScore: 82,
    status: "rejected",
  },
  {
    id: "8",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    position: "Product Manager",
    yearsOfExperience: 5,
    skills: ["Product Strategy", "Analytics", "Agile", "User Research"],
    overallScore: 89,
    status: "interviewed",
  },
]

interface RecruiterDashboardProps {
  user: AuthUser
}

export function RecruiterDashboard({ user }: RecruiterDashboardProps) {
  const router = useRouter()
  const { logout } = useAuth()
  const [candidates] = useState<Candidate[]>(MOCK_CANDIDATES)

  const topFiveCandidates = useMemo(() => {
    return candidates.sort((a, b) => b.overallScore - a.overallScore).slice(0, 5)
  }, [candidates])

  const kpis = useMemo(() => {
    const total = candidates.length
    const avgScore = Math.round(candidates.reduce((sum, c) => sum + c.overallScore, 0) / total || 0)
    const hired = candidates.filter((c) => c.status === "hired").length
    const rejected = candidates.filter((c) => c.status === "rejected").length
    const pending = candidates.filter((c) => c.status === "pending").length
    const conversionRate = total > 0 ? Math.round((hired / total) * 100) : 0

    return { total, avgScore, hired, rejected, pending, conversionRate }
  }, [candidates])

  const scoreDistribution = useMemo(() => {
    const ranges = [
      { range: "90-100", count: 0, fill: "#10b981" },
      { range: "80-89", count: 0, fill: "#3b82f6" },
      { range: "70-79", count: 0, fill: "#f59e0b" },
      { range: "<70", count: 0, fill: "#ef4444" },
    ]

    candidates.forEach((c) => {
      if (c.overallScore >= 90) ranges[0].count++
      else if (c.overallScore >= 80) ranges[1].count++
      else if (c.overallScore >= 70) ranges[2].count++
      else ranges[3].count++
    })

    return ranges
  }, [candidates])

  const statusData = useMemo(() => {
    return [
      { name: "Pending", value: candidates.filter((c) => c.status === "pending").length },
      { name: "Interviewed", value: candidates.filter((c) => c.status === "interviewed").length },
      { name: "Hired", value: candidates.filter((c) => c.status === "hired").length },
      { name: "Rejected", value: candidates.filter((c) => c.status === "rejected").length },
    ]
  }, [candidates])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleAnalyzeCandidates = () => {
    router.push("/")
  }

  const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">HireQuotient</h1>
              <p className="text-slate-400 text-xs">Recruitment Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAnalyzeCandidates}
              className="bg-blue-600/20 border-blue-500/30 text-blue-200 hover:bg-blue-600/30"
            >
              <FileText className="w-4 h-4 mr-2" />
              Analyze Candidates
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-200 hover:bg-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-sm">{user.name}</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                <DropdownMenuItem disabled className="text-slate-400 text-xs">
                  {user.email}
                </DropdownMenuItem>
                <DropdownMenuItem disabled className="text-slate-400 text-xs">
                  Role: {user.role}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-400 cursor-pointer">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}!</h2>
          <p className="text-slate-400">
            Here's your recruitment dashboard overview. Monitor candidate progress and make data-driven hiring
            decisions.
          </p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center gap-2">
                <Users className="w-4 h-4" /> Total
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{kpis.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Avg Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{kpis.avgScore}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center gap-2">
                <Award className="w-4 h-4" /> Pending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-400">{kpis.pending}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Hired
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{kpis.hired}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center gap-2">
                <XCircle className="w-4 h-4" /> Rejected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-400">{kpis.rejected}</div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs font-medium text-slate-400 flex items-center gap-2">
                <Target className="w-4 h-4" /> Conversion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">{kpis.conversionRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-white">Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={scoreDistribution} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                  <XAxis dataKey="range" stroke="rgba(148,163,184,0.5)" />
                  <YAxis stroke="rgba(148,163,184,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30,41,59,0.8)",
                      border: "1px solid rgba(148,163,184,0.2)",
                      borderRadius: "0.5rem",
                      color: "#e2e8f0",
                    }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold text-white">Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(30,41,59,0.8)",
                      border: "1px solid rgba(148,163,184,0.2)",
                      borderRadius: "0.5rem",
                      color: "#e2e8f0",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top 5 Candidates */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="pb-6">
            <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Top 5 Candidates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topFiveCandidates.map((candidate, idx) => (
                <div
                  key={candidate.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 border border-slate-600 hover:border-slate-500 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-sm font-bold text-blue-400">
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white truncate">{candidate.name}</p>
                        <p className="text-xs text-slate-400 truncate">{candidate.email}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-slate-600/50 text-slate-200 px-2 py-1 rounded">
                        {candidate.yearsOfExperience} yrs exp
                      </span>
                      <span className="bg-slate-600/50 text-slate-200 px-2 py-1 rounded">{candidate.position}</span>
                      <span className="bg-slate-600/50 text-slate-200 px-2 py-1 rounded">{candidate.skills[0]}</span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right ml-4">
                    <div className="text-2xl font-bold text-blue-400 mb-2">{candidate.overallScore}</div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600 text-xs"
                    >
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
