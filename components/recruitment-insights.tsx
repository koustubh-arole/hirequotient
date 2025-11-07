"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, Users, Clock, Zap, ChevronDown, ChevronUp } from "lucide-react"

// Conversion rate trend data
const conversionRateTrend = [
  { month: "Jan", rate: 35.2 },
  { month: "Feb", rate: 37.8 },
  { month: "Mar", rate: 39.1 },
  { month: "Apr", rate: 40.5 },
  { month: "May", rate: 41.2 },
  { month: "Jun", rate: 42.8 },
]

// Top skills data
const topSkillsData = [
  { skill: "React", score: 88 },
  { skill: "Python", score: 85 },
  { skill: "TypeScript", score: 82 },
  { skill: "Node.js", score: 80 },
  { skill: "AWS", score: 78 },
]

export function RecruitmentInsights() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Conversion Rate Trend */}
      <Card
        className="border border-slate-800 bg-slate-900/50 backdrop-blur cursor-pointer hover:border-blue-500/50 transition-all"
        onClick={() => setExpandedCard(expandedCard === "conversion" ? null : "conversion")}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Conversion Rate
            </CardTitle>
            {expandedCard === "conversion" ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-1">42.8%</div>
          <p className="text-xs text-green-400 flex items-center gap-1 mb-3">
            <span>↑ 7.6% from Jan</span>
          </p>
          {expandedCard === "conversion" && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={conversionRateTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="month" stroke="rgba(148, 163, 184, 0.5)" style={{ fontSize: "12px" }} />
                  <YAxis stroke="rgba(148, 163, 184, 0.5)" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(15, 23, 42)",
                      border: "1px solid rgba(148, 163, 184, 0.2)",
                      borderRadius: "0.5rem",
                      color: "white",
                    }}
                    formatter={(value) => `${value}%`}
                  />
                  <Line type="monotone" dataKey="rate" stroke="#3b82f6" dot={false} strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Skills */}
      <Card
        className="border border-slate-800 bg-slate-900/50 backdrop-blur cursor-pointer hover:border-green-500/50 transition-all"
        onClick={() => setExpandedCard(expandedCard === "skills" ? null : "skills")}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-green-400" />
              Top Skills
            </CardTitle>
            {expandedCard === "skills" ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-lg font-bold text-white mb-1">React + Python</div>
          <p className="text-xs text-slate-400 mb-3">Score highest overall</p>
          {expandedCard === "skills" && (
            <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
              {topSkillsData.map((skill) => (
                <div key={skill.skill} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: `${skill.score}%` }} />
                    </div>
                    <span className="text-xs font-semibold text-white w-6">{skill.score}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Average Time-to-Hire */}
      <Card
        className="border border-slate-800 bg-slate-900/50 backdrop-blur cursor-pointer hover:border-orange-500/50 transition-all"
        onClick={() => setExpandedCard(expandedCard === "time-to-hire" ? null : "time-to-hire")}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              Time-to-Hire
            </CardTitle>
            {expandedCard === "time-to-hire" ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-1">18 days</div>
          <p className="text-xs text-green-400 flex items-center gap-1 mb-3">
            <span>↓ 4 days from 22 days</span>
          </p>
          {expandedCard === "time-to-hire" && (
            <div className="mt-4 pt-4 border-t border-slate-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Previous Average</span>
                <span className="text-slate-200 font-semibold">22 days</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Current Average</span>
                <span className="text-green-400 font-semibold">18 days</span>
              </div>
              <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-700 mt-2">
                <span className="text-slate-400">Improvement</span>
                <span className="text-green-400 font-semibold">18.2% faster</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* High Performers */}
      <Card
        className="border border-slate-800 bg-slate-900/50 backdrop-blur cursor-pointer hover:border-purple-500/50 transition-all"
        onClick={() => setExpandedCard(expandedCard === "performers" ? null : "performers")}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              High Performers
            </CardTitle>
            {expandedCard === "performers" ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-1">40%</div>
          <p className="text-xs text-slate-400 mb-3">Scored 80+ (12 candidates)</p>
          {expandedCard === "performers" && (
            <div className="mt-4 pt-4 border-t border-slate-700">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">80-89</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 rounded-full" style={{ width: "60%" }} />
                    </div>
                    <span className="text-slate-200 font-semibold w-4">7</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">90-99</span>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 rounded-full" style={{ width: "40%" }} />
                    </div>
                    <span className="text-slate-200 font-semibold w-4">5</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
