"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, AlertCircle, XCircle, TrendingUp } from "lucide-react"
import { SkillCategoryCard } from "./skill-category-card"

interface EvaluationResultsProps {
  data: any
}

export function EvaluationResults({ data }: EvaluationResultsProps) {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "STRONG MATCH":
        return "bg-emerald-900/20 text-emerald-300 border-emerald-500/30"
      case "GOOD MATCH":
        return "bg-blue-900/20 text-blue-300 border-blue-500/30"
      case "PARTIAL MATCH":
        return "bg-yellow-900/20 text-yellow-300 border-yellow-500/30"
      default:
        return "bg-slate-700/20 text-slate-300 border-slate-600/30"
    }
  }

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-emerald-500/5 pointer-events-none"></div>
        <CardContent className="relative p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-2">Overall Match Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">{data.overallScore}</span>
                <span className="text-2xl text-slate-400">/100</span>
              </div>
            </div>
            <div className="text-right space-y-2">
              <Badge className={`${getRecommendationColor(data.recommendation)} border text-sm py-1.5 px-3`}>
                {data.recommendation}
              </Badge>
              <div className="flex items-center gap-2 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Strong Potential</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <SkillCategoryCard title="Must-Have Skills" icon={CheckCircle2} skills={data.mustHaveSkills} category="must" />
        <SkillCategoryCard
          title="Should-Have Skills"
          icon={TrendingUp}
          skills={data.shouldHaveSkills}
          category="should"
        />
        <SkillCategoryCard title="Bonus Skills" icon={AlertCircle} skills={data.bonusSkills} category="bonus" />
      </div>

      {/* Detailed Breakdown */}
      <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white">Skills Breakdown</CardTitle>
          <CardDescription className="text-slate-400">Detailed analysis of candidate fit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Must-Have Analysis */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Must-Have Skills (Critical)
            </h3>
            <div className="grid gap-2 ml-6">
              {data.mustHaveSkills.map((skill: any, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  {skill.found ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium">{skill.skill}</p>
                    <p className="text-sm text-slate-400">{skill.evidence}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Should-Have Analysis */}
          <div className="space-y-3 pt-4 border-t border-slate-700/50">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              Should-Have Skills (Nice to Have)
            </h3>
            <div className="grid gap-2 ml-6">
              {data.shouldHaveSkills.map((skill: any, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  {skill.found ? (
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium">{skill.skill}</p>
                    <p className="text-sm text-slate-400">{skill.evidence}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
