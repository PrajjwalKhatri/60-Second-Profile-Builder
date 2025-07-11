"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../context/ProfileContext"
import { Sparkles, CheckCircle } from "lucide-react"

export default function ProcessingPage() {
  const navigate = useNavigate()
  const { state, dispatch } = useProfile()
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Analyzing your data...",
    "Extracting brand information...",
    "Processing product catalog...",
    "Generating profile...",
    "Almost ready!",
  ]

  useEffect(() => {
    // Simulate AI processing
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Simulate extracted data
          dispatch({
            type: "SET_EXTRACTED_DATA",
            payload: {
              brandName: "Sample Brand",
              description: "A premium lifestyle brand focused on sustainable products.",
              logo: "/placeholder.svg?height=100&width=100",
              instagram: "@samplebrand",
              website: "https://samplebrand.com",
              tags: ["Sustainable", "Premium", "Lifestyle"],
            },
          })
          setTimeout(() => navigate("/review"), 1000)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(timer)
  }, [dispatch, navigate])

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length)
    }, 1200)

    return () => clearInterval(stepTimer)
  }, [steps.length])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Sparkles className="w-12 h-12 text-white animate-spin" />
          </div>
          <div className="absolute inset-0 w-24 h-24 border-4 border-blue-200 rounded-full animate-ping mx-auto"></div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI is Working Its Magic</h1>

        <p className="text-gray-600 mb-8">{steps[currentStep]}</p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="text-2xl font-bold text-gray-900 mb-8">{progress}%</div>

        {/* Processing Steps */}
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 transition-all duration-300 ${
                index <= currentStep ? "opacity-100" : "opacity-30"
              }`}
            >
              {index < currentStep ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : index === currentStep ? (
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
              )}
              <span className={`text-sm ${index <= currentStep ? "text-gray-900" : "text-gray-400"}`}>{step}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm text-gray-500">This usually takes 30-60 seconds</div>
      </div>
    </div>
  )
}
