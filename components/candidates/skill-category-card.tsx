"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { LucideIcon } from "lucide-react"

interface SkillCategoryProps {
  title: string
  icon: LucideIcon
  skills: any[]
  category: "must" | "should" | "bonus"
}

export function SkillCategoryCard({ title, icon: Icon, skills, category }: SkillCategoryProps) {
  const getColors = () => {
    switch (category) {
      case "must":
        return {
          bg: "bg-emerald-900/30",
          border: "border-emerald-500/30",
          icon: "text-emerald-400",
          badge: "bg-emerald-900/40 text-emerald-300",
        }
      case "should":
        return {
          bg: "bg-blue-900/30",
          border: "border-blue-500/30",
          icon: "text-blue-400",
          badge: "bg-blue-900/40 text-blue-300",
        }
      case "bonus":
        return {
          bg: "bg-purple-900/30",
          border: "border-purple-500/30",
          icon: "text-purple-400",
          badge: "bg-purple-900/40 text-purple-300",
        }
      default:
        return {
          bg: "bg-slate-700/30",
          border: "border-slate-600/30",
          icon: "text-slate-400",
          badge: "bg-slate-700/40 text-slate-300",
        }
    }
  }

  const colors = getColors()
  const foundCount = skills.filter((s: any) => s.found).length

  return (
    <Card className={`border-slate-700/50 ${colors.bg} backdrop-blur overflow-hidden`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${colors.icon}`} />
            <div>
              <p className="font-semibold text-white text-sm">{title}</p>
              <p className="text-xs text-slate-400">
                {foundCount} of {skills.length} found
              </p>
            </div>
          </div>
          <Badge className={`${colors.badge} border-0`}>{Math.round((foundCount / skills.length) * 100)}%</Badge>
        </div>
        <div className="space-y-2">
          {skills.map((skill: any, idx: number) => (
            <div key={idx} className="flex items-center gap-2 text-sm">
              <div className={`w-1.5 h-1.5 rounded-full ${skill.found ? colors.icon : "bg-slate-600"}`}></div>
              <span className={skill.found ? "text-white" : "text-slate-500 line-through"}>{skill.skill}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
