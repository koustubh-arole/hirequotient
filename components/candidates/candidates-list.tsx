"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react"

interface CandidatesListProps {
  topCandidates: any[]
}

export function CandidatesList({ topCandidates }: CandidatesListProps) {
  const getRankColor = (score: number) => {
    if (score >= 90) return "from-emerald-500 to-emerald-600"
    if (score >= 80) return "from-blue-500 to-blue-600"
    if (score >= 70) return "from-yellow-500 to-yellow-600"
    return "from-slate-500 to-slate-600"
  }

  const getRankBadge = (score: number) => {
    if (score >= 90) return "bg-emerald-900/30 text-emerald-300 border-emerald-500/30"
    if (score >= 80) return "bg-blue-900/30 text-blue-300 border-blue-500/30"
    if (score >= 70) return "bg-yellow-900/30 text-yellow-300 border-yellow-500/30"
    return "bg-slate-700/30 text-slate-300 border-slate-600/30"
  }

  return (
    <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <ArrowUpRight className="w-5 h-5 text-emerald-400" />
          Top 5 Ranked Candidates
        </CardTitle>
        <CardDescription className="text-slate-400">
          Candidates ranked by MoSCoW prioritization and skill match
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topCandidates.map((candidate, index) => (
            <div
              key={candidate.id}
              className="p-4 rounded-lg bg-slate-900/40 border border-slate-700/30 hover:border-slate-600/50 transition-all hover:bg-slate-900/60 cursor-pointer group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Rank and Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${getRankColor(candidate.score)} flex items-center justify-center text-white font-bold text-sm`}
                    >
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{candidate.name}</h3>
                      <p className="text-xs text-slate-400">Candidate ID: #{candidate.id}</p>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400">Must-Have Match</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-white">{candidate.mustHaveMatch}%</span>
                      </div>
                      <Progress value={candidate.mustHaveMatch} className="h-1 bg-slate-700" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400">Hands-On Usage</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-white">{candidate.hoursOnUsage}%</span>
                      </div>
                      <Progress value={candidate.hoursOnUsage} className="h-1 bg-slate-700" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400">Experience</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-white">{candidate.experience}%</span>
                      </div>
                      <Progress value={candidate.experience} className="h-1 bg-slate-700" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-slate-400">Bonus Skills</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-sm font-semibold text-white">{candidate.bonusSkills}%</span>
                      </div>
                      <Progress value={candidate.bonusSkills} className="h-1 bg-slate-700" />
                    </div>
                  </div>

                  {/* Matched Skills */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-400">Matched Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {candidate.matchedSkills.map((skill: string, idx: number) => (
                        <Badge
                          key={idx}
                          className="bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Skill Gaps */}
                  {candidate.gap.length > 0 && (
                    <div className="space-y-2 mt-3 pt-3 border-t border-slate-700/30">
                      <p className="text-xs font-medium text-slate-400">Skill Gaps</p>
                      <div className="flex flex-wrap gap-2">
                        {candidate.gap.map((skill: string, idx: number) => (
                          <Badge
                            key={idx}
                            className="bg-slate-700/40 text-slate-300 border border-slate-600/30 flex items-center gap-1"
                          >
                            <AlertCircle className="w-3 h-3" />
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Side - Overall Score */}
                <div className="text-right flex flex-col items-end justify-between h-full">
                  <Badge className={`${getRankBadge(candidate.score)} border`}>
                    {candidate.score >= 90 ? "Excellent" : candidate.score >= 80 ? "Good" : "Potential"}
                  </Badge>
                  <div className="mt-4">
                    <p className="text-xs text-slate-400 mb-1">Overall Score</p>
                    <div className="text-3xl font-bold text-white">{candidate.score}</div>
                    <p className="text-xs text-slate-400">/100</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-slate-700/30 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border-0">
                  View Profile
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 bg-slate-700 hover:bg-slate-600 border-slate-600 text-white"
                >
                  Shortlist
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
