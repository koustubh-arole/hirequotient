export interface Candidate {
  id: string
  name: string
  email: string
  yearsOfExperience: number
  skills: string[]
  technicalScore: number
  interviewScore: number
  cultureFitScore: number
  overallScore: number
  status: "pending" | "interviewed" | "hired" | "rejected"
}
