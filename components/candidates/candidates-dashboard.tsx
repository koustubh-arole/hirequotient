"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalyzeSection } from "./analyze-section"
import { EvaluationResults } from "./evaluation-results"
import { CandidatesList } from "./candidates-list"
import { Zap } from "lucide-react"

export function CandidatesDashboard() {
  const [activeTab, setActiveTab] = useState("analyze")
  const [evaluationData, setEvaluationData] = useState(null)
  const [topCandidates, setTopCandidates] = useState([])

  const handleAnalyzeComplete = (data: any) => {
    setEvaluationData(data)
    setActiveTab("results")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-blue-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-emerald-500/10 via-transparent to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white">HireQuotient</h1>
                  <p className="text-sm text-slate-400">AI-Powered Candidate Evaluation</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-12">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-800/50 border border-slate-700/50">
              <TabsTrigger
                value="analyze"
                className="text-slate-200 data-[state=active]:text-white data-[state=active]:bg-slate-700"
              >
                Analyze
              </TabsTrigger>
              <TabsTrigger
                value="results"
                disabled={!evaluationData}
                className="text-slate-200 data-[state=active]:text-white data-[state=active]:bg-slate-700 disabled:opacity-50"
              >
                Results
              </TabsTrigger>
            </TabsList>

            {/* Analyze Tab */}
            <TabsContent value="analyze" className="mt-8">
              <AnalyzeSection onAnalyzeComplete={handleAnalyzeComplete} />
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="mt-8 space-y-8">
              {evaluationData && (
                <>
                  <EvaluationResults data={evaluationData} />
                  <CandidatesList topCandidates={evaluationData.topCandidates} />
                </>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
