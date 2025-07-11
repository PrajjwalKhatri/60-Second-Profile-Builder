"use client"

import { useNavigate } from "react-router-dom"
import { useProfile } from "../context/ProfileContext"
import { Globe, ShoppingBag, FileText, Upload, ArrowLeft } from "lucide-react"

export default function InputSelection() {
  const navigate = useNavigate()
  const { dispatch } = useProfile()

  const inputOptions = [
    {
      id: "website",
      title: "Website URL",
      description: "Paste your website URL and let AI extract your brand info",
      icon: Globe,
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "shopify",
      title: "Shopify Store",
      description: "Connect your Shopify store for instant product import",
      icon: ShoppingBag,
      color: "green",
      gradient: "from-green-500 to-green-600",
    },
    {
      id: "csv",
      title: "CSV / Excel",
      description: "Upload your product catalog in CSV or Excel format",
      icon: FileText,
      color: "orange",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      id: "pdf",
      title: "PDF Line Sheet",
      description: "Upload your PDF line sheet or product catalog",
      icon: Upload,
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
    },
  ]

  const handleInputSelect = (inputType) => {
    dispatch({ type: "SET_INPUT_TYPE", payload: inputType })
    navigate("/data-input")
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="text-sm text-gray-600">Step 1 of 4</div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Input Method</h1>
          <p className="text-xl text-gray-600">Select how you'd like to provide your business information</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {inputOptions.map((option) => {
            const Icon = option.icon
            return (
              <button
                key={option.id}
                onClick={() => handleInputSelect(option.id)}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 hover:shadow-lg text-left"
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${option.gradient} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-gray-700">
                      {option.title}
                    </h3>
                    <p className="text-gray-600 group-hover:text-gray-500">{option.description}</p>
                  </div>
                </div>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                    <ArrowLeft className="w-4 h-4 text-gray-600 rotate-180" />
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
