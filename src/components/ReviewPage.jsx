"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProfile } from "../context/ProfileContext"
import { ArrowLeft, Edit3, Save, Plus, X } from "lucide-react"

export default function ReviewPage() {
  const navigate = useNavigate()
  const { state, dispatch } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(state.extractedData || {})
  const [newTag, setNewTag] = useState("")

  const handleSave = () => {
    dispatch({ type: "UPDATE_PROFILE", payload: editData })
    setIsEditing(false)
  }

  const addTag = () => {
    if (newTag.trim() && !editData.tags?.includes(newTag.trim())) {
      setEditData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove) => {
    setEditData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }))
  }

  const handleContinue = () => {
    if (!isEditing) {
      dispatch({ type: "UPDATE_PROFILE", payload: editData })
    }
    navigate("/preview")
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/data-input")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="text-sm text-gray-600">Step 3 of 4</div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review & Edit Your Profile</h1>
          <p className="text-gray-600">AI has extracted your information. Make any adjustments needed.</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8">
            <div className="flex items-start space-x-6">
              <div className="w-24 h-24 bg-white rounded-2xl border-2 border-white shadow-lg flex items-center justify-center overflow-hidden">
                {editData.logo ? (
                  <img src={editData.logo || "/placeholder.svg"} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-2xl font-bold text-gray-400">{editData.brandName?.charAt(0) || "?"}</div>
                )}
              </div>
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.brandName || ""}
                    onChange={(e) => setEditData((prev) => ({ ...prev, brandName: e.target.value }))}
                    className="text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-300 focus:border-blue-500 outline-none w-full"
                    placeholder="Brand Name"
                  />
                ) : (
                  <h2 className="text-3xl font-bold text-gray-900">{editData.brandName || "Brand Name"}</h2>
                )}
                <div className="flex items-center space-x-4 mt-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.instagram || ""}
                      onChange={(e) => setEditData((prev) => ({ ...prev, instagram: e.target.value }))}
                      className="text-blue-600 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                      placeholder="@instagram"
                    />
                  ) : (
                    <span className="text-blue-600">{editData.instagram || "@instagram"}</span>
                  )}
                  {isEditing ? (
                    <input
                      type="url"
                      value={editData.website || ""}
                      onChange={(e) => setEditData((prev) => ({ ...prev, website: e.target.value }))}
                      className="text-gray-600 bg-transparent border-b border-gray-300 focus:border-blue-500 outline-none"
                      placeholder="website.com"
                    />
                  ) : (
                    <span className="text-gray-600">{editData.website || "website.com"}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className="flex items-center space-x-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8">
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              {isEditing ? (
                <textarea
                  value={editData.description || ""}
                  onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Describe your brand..."
                />
              ) : (
                <p className="text-gray-600 leading-relaxed">{editData.description || "No description provided."}</p>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {editData.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    {isEditing && (
                      <button onClick={() => removeTag(tag)} className="ml-2 text-blue-600 hover:text-blue-800">
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add a tag..."
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleContinue}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Continue to Preview
          </button>
        </div>
      </div>
    </div>
  )
}
