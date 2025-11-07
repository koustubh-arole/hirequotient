"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, Sparkles } from "lucide-react"
import { useCandidateEvaluation } from "@/hooks/use-candidate-evaluation"

interface AnalyzeSectionProps {
  onAnalyzeComplete: (data: any) => void
}

export function AnalyzeSection({ onAnalyzeComplete }: AnalyzeSectionProps) {
  const [jd, setJd] = useState("")
  const [resume, setResume] = useState("")
  const [fileName, setFileName] = useState("")
  const { evaluate, loading, error } = useCandidateEvaluation()

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        setResume(event.target?.result as string)
      }
      reader.readAsText(file)
    }
  }

  const handleAnalyze = async () => {
    if (!jd.trim() || !resume.trim()) {
      alert("Please provide both JD and Resume")
      return
    }

    const result = await evaluate({
      jd,
      resume,
    })

    if (result) {
      onAnalyzeComplete(result)
    } else if (error) {
      alert(`Evaluation failed: ${error}`)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Job Description Card */}
      <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            Job Description
          </CardTitle>
          <CardDescription className="text-slate-400">Paste the complete job description here</CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Backend Engineer — B2B SaaS (3–5 yrs, Python, PostgreSQL, REST APIs; bonus: AWS, Docker, FastAPI; fintech preferred)"
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            className="min-h-64 bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
          />
        </CardContent>
      </Card>

      {/* Resume Card */}
      <Card className="border-slate-700/50 bg-slate-800/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Upload className="w-5 h-5 text-emerald-400" />
            Resume/Profile
          </CardTitle>
          <CardDescription className="text-slate-400">Upload or paste resume content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-white">Upload File</Label>
            <Input
              type="file"
              accept=".pdf,.txt,.docx"
              onChange={handleFileUpload}
              className="bg-slate-900/50 border-slate-600 text-white"
            />
            {fileName && <p className="text-sm text-emerald-400">Loaded: {fileName}</p>}
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800/30 text-slate-400">or</span>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white">Paste Content</Label>
            <Textarea
              placeholder="Senior Backend Engineer with 5+ years of experience in Python, PostgreSQL, and building REST APIs..."
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="min-h-64 bg-slate-900/50 border-slate-600 text-white placeholder-slate-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Analyze Button */}
      <div className="lg:col-span-2">
        <Button
          onClick={handleAnalyze}
          disabled={loading || !jd.trim() || !resume.trim()}
          className="w-full py-6 text-lg bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white border-0 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 mr-2" />
              Analyze Match
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
