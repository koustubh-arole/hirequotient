"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { CandidatesDashboard } from "@/components/candidates/candidates-dashboard"
import { RecruitmentInsights } from "@/components/recruitment-insights"

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"]

const scoreData = [
  { range: "80-100", count: 12 },
  { range: "60-80", count: 8 },
  { range: "40-60", count: 5 },
  { range: "20-40", count: 3 },
  { range: "0-20", count: 2 },
]

const statusData = [
  { name: "Active", value: 12 },
  { name: "Pending", value: 8 },
  { name: "Rejected", value: 5 },
  { name: "Archived", value: 3 },
]

const topCandidates = [
  { id: 1, name: "Alice Johnson", score: 95, experience: "5 years" },
  { id: 2, name: "Bob Smith", score: 88, experience: "4 years" },
  { id: 3, name: "Carol Davis", score: 82, experience: "6 years" },
  { id: 4, name: "David Wilson", score: 78, experience: "3 years" },
  { id: 5, name: "Eve Martinez", score: 75, experience: "7 years" },
]

const kpiCards = [
  { label: "Total Candidates", value: "28", color: "bg-blue-500/10 text-blue-400" },
  { label: "Avg Score", value: "82.5", color: "bg-green-500/10 text-green-400" },
  { label: "Top Score", value: "95", color: "bg-purple-500/10 text-purple-400" },
  { label: "Selected", value: "12", color: "bg-emerald-500/10 text-emerald-400" },
  { label: "Rejected", value: "5", color: "bg-red-500/10 text-red-400" },
  { label: "Conversion Rate", value: "42.8%", color: "bg-orange-500/10 text-orange-400" },
]

const DashboardPage = () => {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Recruiter Dashboard</h1>
            <p className="text-sm text-slate-400 mt-1">Welcome back, {user?.companyName || "Recruiter"}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-900 border border-slate-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-blue-600">
              Overview
            </TabsTrigger>
            <TabsTrigger value="candidates" className="data-[state=active]:bg-blue-600">
              Analyze Candidates
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {kpiCards.map((card, index) => (
                <Card key={index} className="border border-slate-800 bg-slate-900/50 backdrop-blur">
                  <CardContent className="p-6">
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${card.color}`}>
                      {card.label}
                    </div>
                    <div className="text-3xl font-bold text-white">{card.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recruitment Insights Section */}
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Recruitment Insights</h2>
              <RecruitmentInsights />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Score Distribution Chart */}
              <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white">Score Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={scoreData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                      <XAxis dataKey="range" stroke="rgba(148, 163, 184, 0.5)" />
                      <YAxis stroke="rgba(148, 163, 184, 0.5)" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgb(15, 23, 42)",
                          border: "1px solid rgba(148, 163, 184, 0.2)",
                          borderRadius: "0.5rem",
                          color: "white",
                        }}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Status Overview Chart */}
              <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white">Status Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, value }) => {
                          const total = statusData.reduce((sum, item) => sum + item.value, 0)
                          const percent = total > 0 ? ((value / total) * 100).toFixed(0) : 0
                          return `${name} (${percent}%)`
                        }}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgb(15, 23, 42)",
                          border: "1px solid rgba(148, 163, 184, 0.2)",
                          borderRadius: "0.5rem",
                          color: "white",
                        }}
                        formatter={(value) => [`${value} candidate${value !== 1 ? "s" : ""}`, "Count"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Top Candidates */}
            <Card className="border border-slate-800 bg-slate-900/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-white">Top 5 Candidates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCandidates.map((candidate, index) => (
                    <div
                      key={candidate.id}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{candidate.name}</p>
                          <p className="text-sm text-slate-400">{candidate.experience}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-400">{candidate.score}</p>
                        <p className="text-xs text-slate-400">Score</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Candidates Tab */}
          <TabsContent value="candidates">
            <CandidatesDashboard />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default DashboardPage
