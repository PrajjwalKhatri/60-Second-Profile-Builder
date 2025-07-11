"use client"

import { createContext, useContext, useReducer } from "react"

const ProfileContext = createContext()

const initialState = {
  inputType: null,
  inputData: null,
  extractedData: null,
  profileData: {
    brandName: "",
    description: "",
    logo: "",
    instagram: "",
    website: "",
    tags: [],
  },
  products: [],
  isProcessing: false,
  currentStep: 0,
}

function profileReducer(state, action) {
  switch (action.type) {
    case "SET_INPUT_TYPE":
      return { ...state, inputType: action.payload }
    case "SET_INPUT_DATA":
      return { ...state, inputData: action.payload }
    case "SET_EXTRACTED_DATA":
      return { ...state, extractedData: action.payload }
    case "UPDATE_PROFILE":
      return { ...state, profileData: { ...state.profileData, ...action.payload } }
    case "UPDATE_PRODUCTS":
      return { ...state, products: action.payload }
    case "SET_PROCESSING":
      return { ...state, isProcessing: action.payload }
    case "SET_STEP":
      return { ...state, currentStep: action.payload }
    case "RESET":
      return initialState
    default:
      return state
  }
}

export function ProfileProvider({ children }) {
  const [state, dispatch] = useReducer(profileReducer, initialState)

  return <ProfileContext.Provider value={{ state, dispatch }}>{children}</ProfileContext.Provider>
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider")
  }
  return context
}
