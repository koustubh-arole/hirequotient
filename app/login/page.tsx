"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Mail, Lock, LogIn } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const { login, isAuthenticated } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already logged in
  if (isAuthenticated) {
    router.push("/dashboard")
    return null
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword("password123")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">HireQuotient</h1>
          <p className="text-slate-400">AI-Powered Candidate Evaluation</p>
        </div>

        {/* Login Card */}
        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader className="space-y-2">
            <CardTitle className="text-white text-2xl">Recruiter Login</CardTitle>
            <CardDescription className="text-slate-400">
              Sign in to your HireQuotient account to evaluate candidates
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-slate-200">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-slate-200">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <Alert className="bg-red-950 border-red-700">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-200">{error}</AlertDescription>
                </Alert>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading || !email || !password}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-semibold py-2"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-slate-800 text-slate-400">Demo Credentials</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                  onClick={() => handleDemoLogin("sarah@hirequotient.com")}
                >
                  Sarah Johnson
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                  onClick={() => handleDemoLogin("michael@hirequotient.com")}
                >
                  Michael Chen
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600"
                  onClick={() => handleDemoLogin("emma@hirequotient.com")}
                >
                  Emma Wilson (Admin)
                </Button>
              </div>

              <p className="text-xs text-slate-400 text-center">Password: password123</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-slate-400 text-sm mt-6">
          Secure AI-powered recruitment platform for modern hiring teams
        </p>
      </div>
    </div>
  )
}
