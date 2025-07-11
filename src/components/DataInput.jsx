"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../context/ProfileContext"
import { ArrowLeft, Upload, Link, ShoppingBag, FileText, X } from "lucide-react"

export default function DataInput() {
  const navigate = useNavigate()
  const { state, dispatch } = useProfile()
  const [inputValue, setInputValue] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [files, setFiles] = useState([])

  const inputConfig = {
    website: {
      title: "Enter Website URL",
      placeholder: "https://your-website.com",
      icon: Link,
      type: "url",
    },
    shopify: {
      title: "Connect Shopify Store",
      placeholder: "your-store.myshopify.com",
      icon: ShoppingBag,
      type: "shopify",
    },
    csv: {
      title: "Upload CSV/Excel File",
      placeholder: "Drop your file here or click to browse",
      icon: FileText,
      type: "file",
    },
    pdf: {
      title: "Upload PDF Line Sheet",
      placeholder: "Drop your PDF here or click to browse",
      icon: Upload,
      type: "file",
    },
  }

  const config = inputConfig[state.inputType] || inputConfig.website

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList)
    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    if (config.type === "file") {
      if (files.length === 0) return
      dispatch({ type: "SET_INPUT_DATA", payload: files })
    } else {
      if (!inputValue.trim()) return
      dispatch({ type: "SET_INPUT_DATA", payload: inputValue })
    }

    navigate("/processing")
  }

  const isValid = config.type === "file" ? files.length > 0 : inputValue.trim().length > 0

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/input-selection")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="text-sm text-gray-600">Step 2 of 4</div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <config.icon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{config.title}</h1>
          <p className="text-gray-600">Provide your data and let AI do the magic</p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
          {config.type === "file" ? (
            <div>
              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                  dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">{config.placeholder}</p>
                <p className="text-gray-500 mb-4">
                  Supports {state.inputType === "csv" ? "CSV, Excel" : "PDF"} files up to 10MB
                </p>
                <input
                  type="file"
                  multiple
                  accept={state.inputType === "csv" ? ".csv,.xlsx,.xls" : ".pdf"}
                  onChange={(e) => handleFiles(e.target.files)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
                >
                  Choose Files
                </label>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Selected Files:</h3>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-900">{file.name}</span>
                          <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {state.inputType === "website" ? "Website URL" : "Store URL"}
              </label>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={config.placeholder}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
              {state.inputType === "shopify" && (
                <p className="mt-2 text-sm text-gray-500">
                  We'll need your Shopify API credentials to access your store data
                </p>
              )}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className={`w-full mt-8 py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 ${
              isValid
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Process with AI
          </button>
        </div>
      </div>
    </div>
  )
}
