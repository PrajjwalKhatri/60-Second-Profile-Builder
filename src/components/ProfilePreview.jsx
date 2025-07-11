"use client"

import { useNavigate } from "react-router-dom"
import { useProfile } from "../context/ProfileContext"
import { ArrowLeft, ExternalLink, Instagram, Globe, CheckCircle, Download } from "lucide-react"

export default function ProfilePreview() {
  const navigate = useNavigate()
  const { state } = useProfile()
  const profileData = state.profileData || state.extractedData || {}

  const mockProducts = [
    {
      id: 1,
      title: "Premium T-Shirt",
      price: "$29.99",
      image: "/placeholder.svg?height=200&width=200",
      description: "Soft cotton blend t-shirt with premium finish",
      variants: ["S", "M", "L", "XL"],
      moq: 50,
    },
    {
      id: 2,
      title: "Eco Tote Bag",
      price: "$19.99",
      image: "/placeholder.svg?height=200&width=200",
      description: "Sustainable canvas tote bag for everyday use",
      variants: ["Natural", "Black"],
      moq: 25,
    },
    {
      id: 3,
      title: "Wireless Earbuds",
      price: "$89.99",
      image: "/placeholder.svg?height=200&width=200",
      description: "High-quality wireless earbuds with noise cancellation",
      variants: ["White", "Black", "Blue"],
      moq: 10,
    },
  ]

  const handleGoLive = () => {
    // Simulate going live
    alert("🎉 Profile is now live! Exhibitors can now discover your brand.")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/review")}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Edit
            </button>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Step 4 of 4</div>
              <button
                onClick={handleGoLive}
                className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Go Live</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Banner */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="text-lg font-semibold text-green-900">Profile Ready!</h3>
              <p className="text-green-700">
                Your exhibitor profile has been generated successfully in under 60 seconds.
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden sticky top-24">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center overflow-hidden">
                    {profileData.logo ? (
                      <img
                        src={profileData.logo || "/placeholder.svg"}
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-xl font-bold text-gray-600">{profileData.brandName?.charAt(0) || "?"}</div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{profileData.brandName || "Brand Name"}</h2>
                    <div className="flex items-center space-x-2 mt-1">
                      <Instagram className="w-4 h-4" />
                      <span className="text-sm">{profileData.instagram || "@brand"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-6">
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">About</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {profileData.description || "No description available."}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Website</h3>
                  <a
                    href={profileData.website || "#"}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Globe className="w-4 h-4" />
                    <span>{profileData.website || "website.com"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-1">
                    {profileData.tags?.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        {tag}
                      </span>
                    )) || <span className="text-gray-400 text-sm">No tags</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Catalog */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Product Catalog</h2>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mockProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-gray-100 flex items-center justify-center">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{product.title}</h3>
                      <span className="text-lg font-bold text-blue-600">{product.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>

                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-gray-500">VARIANTS:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {product.variants.map((variant, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                              {variant}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>MOQ: {product.moq} units</span>
                        <span>In Stock</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add More Products */}
            <div className="mt-8 text-center">
              <button className="px-6 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
                + Add More Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
